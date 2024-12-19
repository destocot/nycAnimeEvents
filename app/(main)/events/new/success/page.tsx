import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'New Event Success',
}

export default function NewEventSuccessPage() {
  return (
    <div className='container mx-auto h-full max-w-4xl px-4 pb-8 pt-16'>
      <div className='space-y-4'>
        <h1 className='text-3xl font-bold tracking-tight'>
          Event Successfully Submitted
        </h1>
        <p className='max-w-prose text-sm opacity-50'>
          Thank you for submitting an event to the calendar. All events are
          subject to approval.
        </p>
        <div className='flex gap-2'>
          <Button asChild>
            <Link href='/'>Return to Home</Link>
          </Button>

          <Button variant='secondary' asChild>
            <Link href='/events/new'>View All Events</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
