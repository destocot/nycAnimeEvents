import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { auth } from "@/auth";
import type { EventWithDate } from "@/lib/types";
import { EventForm } from "../event-form";

type EditEventDialogProps = {
  event: EventWithDate;
};

export const EditEventDialog = async ({ event }: EditEventDialogProps) => {
  const session = await auth();
  if (!session?.user) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Edit
          <PencilIcon size={16} className="ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95%] sm:w-full">
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
          <DialogDescription>{event.eventId}</DialogDescription>
        </DialogHeader>
        <EventForm defaultEvent={event}>
          <DialogClose asChild>
            <Button
              id="closeEditEventDialogBtn"
              type="button"
              variant="secondary"
              className="w-full"
            >
              Close
            </Button>
          </DialogClose>
        </EventForm>
      </DialogContent>
    </Dialog>
  );
};
