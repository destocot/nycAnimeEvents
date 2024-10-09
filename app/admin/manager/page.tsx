import { auth } from '@/auth'
import { Header } from '@/components/header'
import { LinkButton } from '@/components/link-button'
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
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn, formatDate } from '@/lib/utils'
import { deleteEventDateAction } from '@/actions/delete-event-date-action'
import { EditEventDialog } from '@/components/admin/edit-event-dialog'
import { approveEventAction } from '@/actions/approve-event'
import { deleteEventAction } from '@/actions/delete-event-action'
import { DeleteEventDialog } from '@/components/admin/delete-event-dialog'
import { badgeVariants } from '@/components/ui/badge'

const Page = async () => {
  const session = await auth()

  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  const [queuedEvents, events] = await db.$transaction([
    db.event.findMany({
      where: { isApproved: false },
      include: {
        eventDates: {
          orderBy: { date: 'asc' },
        },
      },
      orderBy: { earliestDate: 'asc' },
    }),
    db.event.findMany({
      where: { isApproved: true },
      include: {
        eventDates: {
          orderBy: { date: 'asc' },
        },
      },
      orderBy: { earliestDate: 'asc' },
    }),
  ])

  return (
    <>
      <Header></Header>

      <main className='container mx-auto max-w-4xl px-2 py-4'>
        <div className='mt-4'>
          <div className='mx-auto max-w-3xl space-y-4'>
            <div className='flex items-center justify-between gap-4'>
              <h1 className='text-2xl font-bold tracking-tight sm:text-3xl'>
                Admin Manager
              </h1>
              <LinkButton
                href='/admin'
                label='Back'
                leftIcon={ArrowLeftFromLineIcon}
              />
            </div>
            <div className='h-1 bg-muted' />
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
                      <TableRow key={event.eventId}>
                        <TableCell>
                          <div className='space-y-2'>
                            <div className='flex flex-col'>
                              <span className='text-sm font-medium'>Title</span>
                              {event.title}
                            </div>

                            <div className='flex flex-col'>
                              <span className='text-sm font-medium'>
                                Contact
                              </span>
                              {event.contact}
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
                          {event.eventDates.map((date) => (
                            <div key={date.dateId}>
                              <time>{formatDate(date.date)}</time>
                            </div>
                          ))}
                        </TableCell>
                        <TableCell className='align-top'>
                          <div className='mx-auto flex w-28 flex-col justify-center gap-4'>
                            <form
                              action={approveEventAction.bind(null, {
                                eventId: event.eventId,
                              })}
                            >
                              <button
                                type='submit'
                                className='flex h-9 w-full items-center justify-center gap-2 rounded-md border bg-green-600 px-1.5 text-white shadow transition-colors hover:bg-green-600/80'
                              >
                                Approve
                                <ThumbsUpIcon size={16} />
                              </button>
                            </form>

                            <DeleteEventDialog
                              className='h-9 rounded-md px-1.5'
                              eventId={event.eventId}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className='italic'>No queued events.</p>
              )}
            </div>

            <div className='h-1 bg-muted' />
            <div className='space-y-2'>
              <h2 className='text-2xl font-bold tracking-tight sm:text-xl'>
                Events
              </h2>
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
                    <TableRow key={event.eventId}>
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
                          {event.eventDates.map((date) => (
                            <div key={date.dateId} className='h-6'>
                              <time>{formatDate(date.date)}</time>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className='align-top'>
                        <div className='flex justify-center gap-4'>
                          <div className='space-y-2'>
                            {event.eventDates.map((date) => (
                              <form
                                action={deleteEventDateAction.bind(null, {
                                  dateId: date.dateId,
                                })}
                                key={date.dateId}
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
                          <EditEventDialog
                            event={event}
                            className='h-6 rounded-md px-1.5'
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Page
