import { auth } from '@/auth'
import db from '@/lib/db'
import {
  ArrowLeftFromLineIcon,
  ExternalLinkIcon,
  ThumbsUpIcon,
} from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn, formatDate } from '@/lib/utils'
// import { deleteEventDateAction } from '@/actions/delete-event-date-action'
// import { EditEventDialog } from '@/components/admin/edit-event-dialog'
// import { approveEventAction } from '@/actions/approve-event'
// import { DeleteEventDialog } from '@/components/admin/delete-event-dialog'
import { badgeVariants } from '@/components/ui/badge'
import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { approveEventAction } from '@/actions/approve-event'
// import { CleanupEventsButton } from '@/components/admin/cleanup-events-button'

export const metadata: Metadata = {
  title: 'Admin Manager',
}

export default async function AdminManagerPage() {
  const session = await auth()

  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  const [queuedEvents, events] = await db.$transaction([
    db.event.findMany({
      where: { isApproved: false },
      include: {
        dates: {
          orderBy: { date: 'asc' },
        },
      },
      // orderBy: { earliestAt: 'asc' },
    }),
    db.event.findMany({
      where: { isApproved: true },
      include: {
        dates: {
          orderBy: { date: 'asc' },
        },
      },
      // orderBy: { earliestAt: 'asc' },
    }),
  ])

  return (
    <div className='container mx-auto h-full max-w-4xl p-4'>
      <div className='space-y-2'>
        <h2 className='text-2xl font-bold tracking-tight sm:text-xl'>
          Queued Events
        </h2>
        {queuedEvents.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead className='text-center'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {queuedEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <div className='space-y-2'>
                      <div className='flex flex-col'>
                        <span className='text-sm font-medium'>Title</span>
                        {event.title}
                      </div>
                      <a
                        className='flex items-center gap-2 text-sm font-medium transition-colors hover:text-blue-500'
                        href={event.source}
                      >
                        Source <ExternalLinkIcon size={16} />
                      </a>
                    </div>
                  </TableCell>
                  <TableCell className='align-top'>
                    {event.dates.map((date) => (
                      <div key={date.id}>
                        <time>{formatDate(date.date)}</time>
                      </div>
                    ))}
                  </TableCell>
                  <TableCell className='align-top'>
                    <form
                      className='flex items-center justify-center'
                      action={approveEventAction.bind(null, {
                        eventId: event.id,
                      })}
                    >
                      <Button
                        type='submit'
                        size='sm'
                        className='bg-green-600 text-white hover:bg-green-600/80'
                      >
                        Approve
                        <ThumbsUpIcon size={16} />
                      </Button>
                    </form>
                    {/* <DeleteEventDialog
                            className='h-9 rounded-md px-1.5'
                            eventId={event.id}
                          /> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : null}
      </div>

      <div className='h-1 bg-muted' />
      <div className='space-y-2'>
        <h2 className='text-2xl font-bold tracking-tight sm:text-xl'>Events</h2>
        {events.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead className='pr-2 text-right'>Dates</TableHead>
                <TableHead className='text-center'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <div className='space-y-2'>
                      <div className='flex flex-col'>
                        <span className='text-sm font-medium'>Title</span>
                        {event.title}
                      </div>
                      <a
                        className='flex items-center gap-2 text-sm font-medium transition-colors hover:text-blue-500'
                        href={event.source}
                      >
                        Source <ExternalLinkIcon size={16} />
                      </a>
                    </div>
                  </TableCell>
                  <TableCell className='pr-2 text-right align-top'>
                    <div className='space-y-1.5'>
                      {event.dates.map((date) => (
                        <div key={date.id} className='h-6'>
                          <time>{formatDate(date.date)}</time>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className='align-top'>
                    <div className='flex justify-center gap-4'>
                      <div className='space-y-2'>
                        {event.dates.map((date) => (
                          <form
                            //  action={deleteEventDateAction.bind(null, {
                            //    dateId: date.dateId,
                            //  })}
                            key={date.id}
                          >
                            <button
                              type='submit'
                              className={cn(
                                badgeVariants({ variant: 'destructive' }),
                              )}
                            >
                              Delete
                            </button>
                          </form>
                        ))}
                      </div>
                      {/* <EditEventDialog
                             event={event}
                             className='h-6 rounded-md px-1.5'
                           /> */}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : null}
      </div>
    </div>
  )
}
