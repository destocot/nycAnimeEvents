import { after } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { formatEventDates } from "@/lib/event-utils";
import { EventStatus } from "@/generated/prisma/client";
import type { EventWithDates } from "./queries";

export function scheduleArchivalIfPassed(event: EventWithDates): void {
  if (event.passed) return;

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  if (!event.dates.length || !event.dates.every((d) => d.date < today)) return;

  const archivedDates = formatEventDates(event.dates);

  after(async () => {
    await prisma.event.update({
      where: { id: event.id },
      data: { passed: true, archivedDates, dates: { deleteMany: {} } },
    });
    revalidatePath("/");
    revalidatePath("/past-events");
  });
}

export function scheduleBatchArchival(): void {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  after(async () => {
    const stale = await prisma.event.findMany({
      where: {
        status: EventStatus.APPROVED,
        passed: false,
        dates: { every: { date: { lt: today } } },
      },
      include: { dates: { orderBy: { date: "asc" } } },
    });

    const toArchive = stale.filter((e) => e.dates.length > 0);
    for (const event of toArchive) {
      await prisma.event.update({
        where: { id: event.id },
        data: {
          passed: true,
          archivedDates: formatEventDates(event.dates),
          dates: { deleteMany: {} },
        },
      });
    }
    if (toArchive.length > 0) {
      revalidatePath("/");
      revalidatePath("/past-events");
    }
  });
}
