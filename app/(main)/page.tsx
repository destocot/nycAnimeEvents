import { EventList } from '@/components/events/event-list'
import { TAKE_EVENTS_LIMIT } from '@/lib/constants'
import db from '@/lib/db'
import { Suspense } from 'react'

export default function Page() {
  return (
    <div className='container mx-auto h-full max-w-4xl px-4 py-8'>
      <Suspense fallback={'Loading...'}>
        <ServerEventList />
      </Suspense>
    </div>
  )
}

const ServerEventList = async () => {
  const events = await db.event.findMany({
    // where: { isApproved: true },
    include: { dates: true },
    take: TAKE_EVENTS_LIMIT,
    orderBy: { earliestAt: 'asc' },
  })

  return <EventList initialEvents={events} />
}
