import { after } from "next/server";
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

    for (const event of stale.filter((e) => e.dates.length > 0)) {
      await prisma.event.update({
        where: { id: event.id },
        data: {
          passed: true,
          archivedDates: formatEventDates(event.dates),
          dates: { deleteMany: {} },
        },
      });
    }
  });
}
