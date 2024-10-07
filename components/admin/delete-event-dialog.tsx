import { Trash2Icon } from "lucide-react";

import { auth } from "@/auth";
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
import { deleteEventAction } from "@/actions/delete-event-action";

export const DeleteEventDialog = async ({ eventId }: { eventId: string }) => {
  const session = await auth();
  if (!session?.user) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">
          Delete
          <Trash2Icon size={16} className="ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95%] sm:w-full">
        <DialogHeader>
          <DialogTitle>Delete Event</DialogTitle>
          <DialogDescription>Are you sure?</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col gap-2">
          <form
            action={deleteEventAction.bind(null, { eventId })}
            className="flex-1"
          >
            <Button variant="destructive" className="w-full">
              Delete
              <Trash2Icon size={16} className="ml-2" />
            </Button>
          </form>
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="flex-1">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
