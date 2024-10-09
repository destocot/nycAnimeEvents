import { EventCardSkeleton } from '@/components/skeletons/event-card-skeleton'

export const EventListSkeleton = () => {
  return (
    <div className='mx-auto max-w-3xl space-y-4'>
      <EventCardSkeleton />
      <EventCardSkeleton />
      <EventCardSkeleton />
      <EventCardSkeleton />
      <EventCardSkeleton />
      <EventCardSkeleton />
      <EventCardSkeleton />
    </div>
  )
}
