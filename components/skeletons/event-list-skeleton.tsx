import { TAKE_EVENTS_LIMIT } from '@/lib/constants'
import { EventCardSkeleton } from '@/components/skeletons/event-card-skeleton'

export const EventListSkeleton = () => {
  return (
    <div className='mx-auto max-w-3xl space-y-3.5'>
      {Array.from({ length: TAKE_EVENTS_LIMIT })
        .fill(0)
        .map((_, index) => {
          return <EventCardSkeleton key={index} />
        })}
    </div>
  )
}
