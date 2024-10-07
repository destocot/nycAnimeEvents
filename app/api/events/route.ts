import { TAKE_EVENTS_LIMIT } from "@/lib/constants";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cursorQuery = req.nextUrl.searchParams.get("cursor") ?? undefined;
  const skip = cursorQuery ? 1 : 0;
  const cursor = cursorQuery ? { eventId: cursorQuery } : undefined;

  const events = await db.event.findMany({
    where: { isApproved: true },
    include: {
      eventDates: {
        orderBy: { date: "asc" },
      },
    },
    orderBy: { earliestDate: "asc" },
    take: TAKE_EVENTS_LIMIT,
    skip,
    cursor,
  });

  const nextId = events.at(-1)?.eventId;

  return NextResponse.json({ data: events, nextId });
}
