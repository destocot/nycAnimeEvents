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
      <DialogContent className="top-[25%]">
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
          <DialogDescription>{event.eventId}</DialogDescription>
        </DialogHeader>
        <div></div>
        {/* <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};
