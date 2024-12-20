import { PencilIcon } from 'lucide-react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { auth } from '@/auth'
import { Prisma } from '@prisma/client'
import { UpdateEventForm } from '../events/update-event-form'

type EditEventDialogProps = {
  event: Prisma.EventGetPayload<{ include: { dates: true } }>
}

export const EditEventDialog = async ({ event }: EditEventDialogProps) => {
  const session = await auth()
  if (!session?.user) return null

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='sm' variant='outline'>
          Edit
          <PencilIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className='w-[95%] sm:w-full'>
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
          <DialogDescription>{event.id}</DialogDescription>
        </DialogHeader>
        <UpdateEventForm defaultEvent={event} />
        {/* <DialogClose asChild>
            <Button
              id='closeEditEventDialogBtn'
              type='button'
              variant='secondary'
              className='w-full'
            >
              Close
            </Button>
          </DialogClose> */}
        {/* </EventForm> */}
      </DialogContent>
    </Dialog>
  )
}
