import { EventCard } from '@/components/event-card'
import { Header } from '@/components/header'
import { LinkButton } from '@/components/link-button'
import { PrintButton } from '@/components/print-button'
import { SearchForm } from '@/components/search-form'
import db from '@/lib/db'
import { EventWithDate } from '@/lib/types'
import { PencilIcon } from 'lucide-react'

type PageProps = {
  searchParams: { query: string }
}

export default async function Page({ searchParams }: PageProps) {
  const query = searchParams.query ?? ''

  let events: Array<EventWithDate> = []

  if (query) {
    events = await db.event.findMany({
      where: {
        isApproved: true,
        OR: [
          { title: { contains: query } },
          { description: { contains: query } },
        ],
      },
      include: { eventDates: { orderBy: { date: 'asc' } } },
      orderBy: { earliestDate: 'asc' },
    })
  }

  return (
    <>
      <Header>
        <LinkButton
          size='sm'
          href='/events/new'
          label='Submit Event'
          leftIcon={PencilIcon}
        />
        <PrintButton />
      </Header>

      <main className='container mx-auto max-w-4xl px-2 py-4'>
        <div className='mt-4'>
          <div className='mx-auto max-w-3xl space-y-4'>
            <h1 className='text-2xl font-bold tracking-tight sm:text-3xl'>
              Search{' '}
              {query ? (
                <span>
                  Results for <span className='italic'>{`"${query}"`}</span>
                </span>
              ) : (
                'Events'
              )}
            </h1>
            <SearchForm initialQuery={query} />
            {events.length > 0 ? (
              <div className='space-y-3.5'>
                {events.map((event) => (
                  <EventCard key={event.eventId} event={event} />
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
      </main>
    </>
  )
}
