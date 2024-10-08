import { ExternalLinkIcon } from 'lucide-react'
import { notFound } from 'next/navigation'

import { DeleteEventDialog } from '@/components/admin/delete-event-dialog'
import { EditEventDialog } from '@/components/admin/edit-event-dialog'
import { Header } from '@/components/header'
import { LinkButton } from '@/components/link-button'
import { PrintButton } from '@/components/print-button'
import { Badge } from '@/components/ui/badge'
import db from '@/lib/db'
import { formatDate } from '@/lib/utils'
import { TAKE_EVENTS_LIMIT } from '@/lib/constants'

type EventPageProps = { params: { id: string } }

export async function generateStaticParams() {
  const events = await db.event.findMany({
    select: { eventId: true },
    where: { isApproved: true },
    orderBy: { earliestDate: 'asc' },
    take: TAKE_EVENTS_LIMIT * 2,
  })

  const staticParams = events.map((event) => ({
    id: event.eventId,
  }))

  return staticParams
}

const CreateEventPage = async ({ params }: EventPageProps) => {
  const eventId = params.id

  const event = await db.event.findUnique({
    where: { eventId, isApproved: true },
    include: { eventDates: { orderBy: { date: 'asc' } } },
  })

  if (!event || !event.isApproved) notFound()

  return (
    <>
      <Header>
        <PrintButton />
      </Header>

      <main className='container mx-auto max-w-4xl px-2 py-4'>
        <div className='mt-4'>
          <div className='mx-auto max-w-3xl space-y-4'>
            <h1 className='text-2xl font-bold tracking-tight sm:text-3xl'>
              {event.title}
            </h1>
            <div>
              <img
                src={event.image ?? '/placeholder.jpg'}
                alt={event.title}
                className='aspect-[16/7] w-full rounded object-cover object-[0_20%]'
              />
            </div>
            <div className='flex flex-col justify-between gap-4 sm:flex-row'>
              <p className='w-full max-w-prose text-justify leading-relaxed opacity-80'>
                {event.description}
              </p>
              <div className='flex gap-2 sm:flex-col print:hidden'>
                <LinkButton
                  href={event.source}
                  label='Source'
                  rightIcon={ExternalLinkIcon}
                  external
                  variant='secondary'
                />
                <EditEventDialog event={event} />
                <DeleteEventDialog eventId={event.eventId} />
              </div>
            </div>
            <div className='h-1 bg-muted' />
            <h3 className='text-xl font-bold tracking-tight'>Upcoming Dates</h3>
            <ul className='flex flex-wrap gap-2'>
              {event.eventDates.map((date, i) => (
                <li key={date.dateId}>
                  <Badge
                    key={date.dateId}
                    variant={i === 0 ? 'default' : 'secondary'}
                    className='text-sm'
                  >
                    {formatDate(date.date)}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  )
}

export default CreateEventPage
