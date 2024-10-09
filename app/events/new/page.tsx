import { EventForm } from '@/components/event-form'
import { Header } from '@/components/header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Submit Event',
}

const SubmitEventPage = () => {
  return (
    <>
      <Header></Header>

      <main className='container mx-auto max-w-4xl px-2 py-4'>
        <div className='mt-4'>
          <div className='space-y-4'>
            <h1 className='text-3xl font-bold tracking-tight'>Submit Event</h1>{' '}
            {/* <h1 className='text-3xl font-bold tracking-tight'>
              Under Construction
            </h1> */}
            <p className='max-w-prose text-sm opacity-50'>
              Please fill out the form below to submit an event to the calendar.
              All events are subject to approval.
            </p>
            <div className='max-w-md'>
              <EventForm />{' '}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default SubmitEventPage
