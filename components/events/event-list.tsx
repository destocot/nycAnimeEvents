'use client'

import type { Prisma } from '@prisma/client'
import { useInfiniteQuery } from '@tanstack/react-query'
import { EventCard } from '@/components/events/event-card'
import { useInView } from 'react-intersection-observer'
import { useDebouncedCallback } from 'use-debounce'
import { useEffect } from 'react'
import { EventCardSkeleton } from '@/components/skeletons/event-card-skeleton'

type EventListProps = {
  initialEvents: Array<Prisma.EventGetPayload<{ include: { dates: true } }>>
}

export const EventList = ({ initialEvents }: EventListProps) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['events'],
      queryFn: async ({
        pageParam = '',
      }): Promise<{
        data: Array<Prisma.EventGetPayload<{ include: { dates: true } }>>
        nextId: string | undefined
      }> => {
        const res = await fetch(`/api/events?cursor=${pageParam}`)
        return await res.json()
      },
      initialPageParam: '',
      getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
      initialData: {
        pages: [{ data: initialEvents, nextId: undefined }],
        pageParams: [''],
      },
    })

  const { inView, ref } = useInView({ threshold: 0.5 })

  const debouncedFetchNextPage = useDebouncedCallback(() => {
    if (inView && hasNextPage) fetchNextPage()
  }, 200)

  useEffect(() => {
    debouncedFetchNextPage()
  }, [inView, hasNextPage, debouncedFetchNextPage])

  const events = data.pages.flatMap((page) => page.data)

  return (
    <div className='space-y-8'>
      {events.map((e) => (
        <EventCard key={e.id} event={e} />
      ))}

      {isFetchingNextPage && <EventCardSkeleton />}

      <div className='mx-auto flex max-w-6xl justify-center' ref={ref} />
    </div>
  )
}
