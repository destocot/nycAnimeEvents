import { prisma } from "@/lib/prisma";
import { EventCategory, EventStatus } from "@/generated/prisma/client";
import type { Prisma } from "@/generated/prisma/client";

const LIMIT = 12;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim();
  const cat = searchParams.get("cat") ?? "";
  const cursor = searchParams.get("cursor") ?? undefined;

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const where: Prisma.EventWhereInput = {
    status: EventStatus.APPROVED,
    passed: false,
    dates: { some: { date: { gte: today } } },
    ...(q.length >= 3 && {
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { location: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ],
    }),
    ...(cat && Object.values(EventCategory).includes(cat as EventCategory) && {
      category: cat as EventCategory,
    }),
  };

  const events = await prisma.event.findMany({
    where,
    include: { image: true, dates: { orderBy: { date: "asc" } } },
    orderBy: { startDate: "asc" },
    take: LIMIT + 1,
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
  });

  const hasMore = events.length > LIMIT;
  const items = hasMore ? events.slice(0, LIMIT) : events;
  const nextCursor = hasMore ? items.at(-1)?.id : undefined;

  return Response.json({ events: items, nextCursor, hasMore });
}
