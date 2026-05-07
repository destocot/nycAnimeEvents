import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";
import { EventStatus } from "@/generated/prisma/client";

const baseInclude = {
  image: true,
  dates: { orderBy: { date: "asc" as const } },
} satisfies Prisma.EventInclude;

export type EventWithDates = Prisma.EventGetPayload<{ include: typeof baseInclude }>;

function todayUtc(): Date {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

export async function findFeaturedEvents() {
  const today = todayUtc();
  return prisma.event.findMany({
    where: {
      status: EventStatus.APPROVED,
      featured: true,
      passed: false,
      dates: { some: { date: { gte: today } } },
    },
    include: baseInclude,
    orderBy: { startDate: "asc" },
    take: 4,
  });
}

export async function findApprovedEvents() {
  return prisma.event.findMany({
    where: { status: EventStatus.APPROVED },
    include: baseInclude,
    orderBy: { startDate: "asc" },
  });
}

export async function findOneEventBySlug(slug: string) {
  return prisma.event.findUnique({
    where: { slug },
    include: { ...baseInclude, submittedBy: { select: { name: true } } },
  });
}

export async function findPendingEvents() {
  return prisma.event.findMany({
    where: { status: EventStatus.PENDING },
    include: baseInclude,
    orderBy: { createdAt: "desc" },
  });
}

export async function findRejectedEvents() {
  return prisma.event.findMany({
    where: { status: EventStatus.REJECTED },
    include: baseInclude,
    orderBy: { updatedAt: "desc" },
  });
}

export async function findPassedEvents() {
  return prisma.event.findMany({
    where: { passed: true, status: EventStatus.APPROVED },
    include: baseInclude,
    orderBy: { updatedAt: "desc" },
  });
}

export async function createEvent(data: Prisma.EventCreateInput) {
  return prisma.event.create({ data, include: baseInclude });
}

export async function updateEvent(id: string, data: Prisma.EventUpdateInput) {
  return prisma.event.update({ where: { id }, data, include: baseInclude });
}
