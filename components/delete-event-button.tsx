import { EventDate } from "@prisma/client";
import { Button } from "@/components/ui/button";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

type DeleteEventButtonProps = { eventDateId: EventDate["dateId"] };

export const DeleteEventButton = ({ eventDateId }: DeleteEventButtonProps) => {
  async function deleteEventDate({ dateId }: { dateId: EventDate["dateId"] }) {
    "use server";
    const input = { dateId };

    const deletedEventDate = await db.eventDate.delete({
      where: { dateId: input.dateId },
      select: { eventId: true, dateId: true },
    });

    console.log("event date deleted", deletedEventDate.dateId);

    const eventDates = await db.eventDate.findMany({
      where: { eventId: deletedEventDate.eventId },
    });
    console.log("event dates", eventDates.length);

    if (eventDates.length > 0) {
      const earliestDate = eventDates.reduce(
        (earliest: Date | null, date: EventDate) => {
          if (earliest === null) return date.date;
          return date.date < earliest ? date.date : earliest;
        },
        null as Date | null
      );

      const updatedEvent = await db.event.update({
        where: { eventId: deletedEventDate.eventId },
        data: { earliestDate },
      });
      console.log("event updated", updatedEvent.eventId);
    } else {
      const deletedEvent = await db.event.delete({
        where: { eventId: deletedEventDate.eventId },
      });

      console.log("event deleted", deletedEvent.eventId);
    }

    revalidatePath("/");
  }

  return (
    <form action={deleteEventDate.bind(null, { dateId: eventDateId })}>
      <Button className="h-6" variant="destructive">
        Delete
      </Button>
    </form>
  );
};
