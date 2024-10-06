import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button";
import db from "@/lib/db";

type RejectQueuedEventButtonProps = { eventId: string };

export const DeleteQueuedEventButton = ({
  eventId,
}: RejectQueuedEventButtonProps) => {
  async function deleteEvent({ queuedEventId }: { queuedEventId: string }) {
    "use server";
    const input = { queuedEventId };

    const deletedEvent = await db.queuedEvent.delete({
      where: { queuedEventId: input.queuedEventId },
      select: {
        queuedEventId: true,
        queuedEventDates: { select: { queuedDateId: true } },
      },
    });

    console.log("delete.event.id", deletedEvent.queuedEventId);

    // await db.queuedEventDate.deleteMany({
    //   where: { queuedEventId: deletedEvent.queuedEventId },
    // });

    // console.log("delete.event.dates", deletedEvent.queuedEventDates);

    revalidatePath("/");
  }

  return (
    <form action={deleteEvent.bind(null, { queuedEventId: eventId })}>
      <Button className="h-6" variant="destructive">
        Delete
      </Button>
    </form>
  );
};
