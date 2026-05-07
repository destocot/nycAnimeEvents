import { after } from "next/server";
import { prisma } from "@/lib/prisma";
import { formatEventDates } from "@/lib/event-utils";
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
