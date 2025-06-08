import { ExternalLinkIcon } from 'lucide-react'
import { notFound } from 'next/navigation'

import { DeleteEventDialog } from '@/components/admin/delete-event-dialog'
import { EditEventDialog } from '@/components/admin/edit-event-dialog'
import { Badge } from '@/components/ui/badge'
import db from '@/lib/db'
import { formatDate } from '@/lib/utils'
import { TAKE_EVENTS_LIMIT } from '@/lib/constants'
import type { Metadata, ResolvingMetadata } from 'next'
import { Button } from '@/components/ui/button'

type EventPageProps = { params: { id: string } }

export async function generateMetadata(
  { params }: EventPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const event = await db.event.findUnique({
    where: {
      id: params.id,
      //  isApproved: true
    },
    select: { title: true, image: true, description: true },
  })

  const previousImages = (await parent).openGraph?.images || []

  return {
    title: event?.title ? event.title : 'Not Found',
    openGraph: {
      description: event?.description
        ? event.description.length > 128
          ? `${event.description.slice(0, 128)}...`
          : event.description
        : 'The page you are looking for does not exist.',
      images: event?.image ? [event.image] : previousImages,
    },
  }
}

export async function generateStaticParams() {
  const events = await db.event.findMany({
    select: { id: true },
    where: { isApproved: true },
    // orderBy: { earliestAt: 'asc' },
    take: TAKE_EVENTS_LIMIT,
  })

  const staticParams = events.map((event) => ({
    id: event.id,
  }))

  return staticParams
}

const EventPage = async ({ params }: EventPageProps) => {
  const event = await db.event.findUnique({
    where: {
      id: params.id,
      isApproved: true,
    },
    include: { dates: true },
  })

  if (!event) notFound()

  return (
    <div className='container mx-auto h-full max-w-4xl px-4 py-8'>
      <div className='space-y-4'>
        <h1 className='text-2xl font-bold tracking-tight sm:text-3xl'>
          {event.title}
        </h1>
        <div>
          <img
            src={event.image ?? '/placeholder.jpg'}
            alt={event.title}
            className='aspect-[16/7] w-full rounded object-cover'
          />
        </div>
        <div className='flex flex-col gap-y-4'>
          <div className='flex items-center justify-end gap-x-2 print:hidden'>
            <EditEventDialog event={event} />

            <DeleteEventDialog eventId={event.id} />

            <Button variant='secondary' size='sm' asChild>
              <a href={event.source} target='_blank' rel='noreferrer'>
                Source <ExternalLinkIcon />
              </a>
            </Button>
          </div>

          <p className='w-full max-w-prose text-justify leading-relaxed opacity-80'>
            {event.description}
          </p>
        </div>
        <div className='h-1 bg-muted' />
        <h3 className='text-xl font-bold tracking-tight'>Upcoming Dates</h3>
        <ul className='flex flex-wrap gap-2'>
          {event.dates.map((date, i) => (
            <li key={date.id}>
              <Badge
                key={date.id}
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
  )
}

export default EventPage
