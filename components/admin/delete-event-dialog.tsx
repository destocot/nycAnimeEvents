import { Trash2Icon } from 'lucide-react'

import { auth } from '@/auth'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { deleteEventAction } from '@/features/events/actions/delete-event'

type DeleteEventDialogProps = {
  eventId: string
}

export const DeleteEventDialog = async ({
  eventId,
}: DeleteEventDialogProps) => {
  const session = await auth()
  if (!session?.user) return null

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='destructive' size='sm'>
          Delete
          <Trash2Icon />
        </Button>
      </DialogTrigger>
      <DialogContent className='w-[95%] sm:w-full'>
        <DialogHeader>
          <DialogTitle>Delete Event</DialogTitle>
          <DialogDescription>Are you sure?</DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex-col gap-2'>
          <form
            action={deleteEventAction.bind(null, { eventId })}
            className='flex-1'
          >
            <Button variant='destructive' className='w-full'>
              Delete
              <Trash2Icon />
            </Button>
          </form>
          <DialogClose asChild>
            <Button type='button' variant='secondary' className='flex-1'>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
