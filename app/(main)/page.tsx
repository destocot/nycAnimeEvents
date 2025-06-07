import { EventList } from '@/components/events/event-list'
import { EventListSkeleton } from '@/components/skeletons/event-list-skeleton'
import { TAKE_EVENTS_LIMIT } from '@/lib/constants'
import db from '@/lib/db'
import { Suspense } from 'react'

export default function Page() {
  return <div>UNDER CONSTRUCTION WILL RETURN JUNE 2025</div>

  return (
    <div className='container mx-auto h-full max-w-4xl px-4 py-8'>
      <Suspense fallback={<EventListSkeleton />}>
        <ServerEventList />
      </Suspense>
    </div>
  )
}

const ServerEventList = async () => {
  const events = await db.event.findMany({
    where: { isApproved: true },
    include: { dates: true },
    take: TAKE_EVENTS_LIMIT,
    // orderBy: { earliestAt: 'asc' },
  })

  console.log('events', events)

  return <EventList initialEvents={events} />
}
