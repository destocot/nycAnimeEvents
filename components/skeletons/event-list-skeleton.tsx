import { EventCardSkeleton } from '@/components/skeletons/event-card-skeleton'
import { TAKE_EVENTS_LIMIT } from '@/lib/constants'

export const EventListSkeleton = () => {
  return (
    <div className='space-y-8'>
      {Array.from({ length: TAKE_EVENTS_LIMIT }).map((_, index) => (
        <EventCardSkeleton key={index} />
      ))}
    </div>
  )
}
