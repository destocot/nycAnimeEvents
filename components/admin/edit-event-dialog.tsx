import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
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

  if (!session?.user?.name) return null;

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
        <EventForm>
          <div className="grid grid-cols-2 gap-4">
            <Button type="submit">Submit</Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </div>
        </EventForm>
      </DialogContent>
    </Dialog>
  );
};
