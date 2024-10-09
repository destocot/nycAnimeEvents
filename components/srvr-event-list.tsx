import { TAKE_EVENTS_LIMIT } from '@/lib/constants'
import db from '@/lib/db'
import { EventList } from '@/components/event-list'

export const SrvrEventList = async () => {
  const initialEvents = await db.event.findMany({
    where: { isApproved: true },
    include: {
      eventDates: {
        orderBy: { date: 'asc' },
      },
    },
    orderBy: { earliestDate: 'asc' },
    take: TAKE_EVENTS_LIMIT,
  })

  return <EventList initialEvents={initialEvents} />
}
