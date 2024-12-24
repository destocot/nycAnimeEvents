import db from '@/lib/db'
import { EventCard } from '@/components/events/event-card'
import { SearchForm } from '@/components/events/search-form'
import type { Metadata } from 'next'
import { Prisma } from '@prisma/client'

export const metadata: Metadata = { title: 'Search Events' }

type PageProps = { searchParams: { query: string } }

export default async function Page({ searchParams }: PageProps) {
  const query = searchParams.query ?? ''

  const events: Array<Prisma.EventGetPayload<{ include: { dates: true } }>> =
    query
      ? await db.event.findMany({
          where: {
            isApproved: true,
            OR: [
              { title: { contains: query } },
              { description: { contains: query } },
            ],
          },
          include: { dates: { orderBy: { date: 'asc' } } },
          orderBy: { earliestAt: 'asc' },
        })
      : []

  return (
    <div className='container mx-auto h-full max-w-4xl px-4 py-8'>
      <div className='space-y-4'>
        <h1 className='text-3xl font-bold tracking-tight'>
          Search{' '}
          {query ? (
            <span>
              Results for <span className='italic'>{`"${query}"`}</span>
            </span>
          ) : (
            'Events'
          )}
        </h1>{' '}
        <SearchForm initialQuery={query} />
        {events.length > 0 ? (
          <div className='space-y-8'>
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : query.length > 0 ? (
          <p className='text-sm italic'>No events found.</p>
        ) : (
          <p className='text-sm italic'>
            Search for events by title or description. For example, try
            searching for {'anime'} or {'cosplay'}.
          </p>
        )}
      </div>
    </div>
  )
}
