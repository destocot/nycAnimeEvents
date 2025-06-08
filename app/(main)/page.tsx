import { EventList } from '@/components/events/event-list'
import { EventListSkeleton } from '@/components/skeletons/event-list-skeleton'
import { TAKE_EVENTS_LIMIT } from '@/lib/constants'
import db from '@/lib/db'
import { Suspense } from 'react'

export default function Page() {
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
  })

  events.sort((a, b) => {
    const da = new Date(a.dates[0]?.date || 0)
    const db = new Date(b.dates[0]?.date || 0)
    return da.getTime() - db.getTime()
  })

  return <EventList initialEvents={events} />
}
