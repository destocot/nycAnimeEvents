import { CreateEventForm } from '@/components/events/create-event-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'New Event',
}

export default function NewEventPage() {
  return (
    <div className='container mx-auto h-full max-w-4xl px-4 pb-8 pt-16'>
      <div className='space-y-4'>
        <h1 className='text-3xl font-bold tracking-tight'>New Event</h1>{' '}
        {/* <h1 className='text-3xl font-bold tracking-tight'>
              Under Construction
            </h1> */}
        <p className='max-w-prose text-sm opacity-50'>
          Please fill out the form below to submit an event to the calendar. All
          events are subject to approval.
        </p>
        <div className='max-w-md'>
          <CreateEventForm />{' '}
        </div>
      </div>
    </div>
  )
}
