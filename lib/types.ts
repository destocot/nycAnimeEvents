import { Prisma } from "@prisma/client";

export type EventWithDate = Prisma.EventGetPayload<{
  include: { eventDates: true };
}>;
