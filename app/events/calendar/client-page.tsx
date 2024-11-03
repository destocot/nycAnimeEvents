'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  parseISO,
} from 'date-fns'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

type Event = {
  eventId: string
  title: string
  image: string | null
}

type CalendarDate = {
  dateId: number
  date: Date | string
  event: Event
}

interface CalendarProps {
  events: CalendarDate[]
}

export default function Component({ events }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => {
      const eventDate =
        event.date instanceof Date ? event.date : parseISO(event.date)
      return isSameDay(eventDate, date)
    })
  }

  const EventPreview = ({ event }: { event: Event }) => (
    <Link
      href={`/event/${event.eventId}`}
      className='flex w-full items-center space-x-2 rounded p-1 hover:bg-gray-100'
    >
      <div className='aspect-[2/3] w-1/3 flex-shrink-0 overflow-hidden rounded'>
        <img
          src={event.image || '/placeholder.jpg'}
          alt={event.title}
          className='h-full w-full object-cover'
        />
      </div>
      <span className='flex-grow truncate text-xs'>{event.title}</span>
    </Link>
  )

  return (
    <div className='container mx-auto p-4'>
      <div className='mb-4 flex items-center justify-between'>
        <h2 className='text-2xl font-bold'>
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <div>
          <Button
            onClick={prevMonth}
            variant='outline'
            size='icon'
            className='mr-2'
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <Button onClick={nextMonth} variant='outline' size='icon'>
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
      </div>
      <div className='grid grid-cols-7 gap-2'>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className='p-2 text-center font-bold'>
            {day}
          </div>
        ))}
        {monthDays.map((day) => {
          const dayEvents = getEventsForDate(day)
          return (
            <div
              key={day.toISOString()}
              className={`h-48 border p-2 ${isSameMonth(day, currentDate) ? '' : 'bg-gray-100'}`}
            >
              <div className='mb-2 text-right'>{format(day, 'd')}</div>
              <div className='flex h-36 flex-col space-y-1 overflow-hidden'>
                {dayEvents.slice(0, 1).map((event) => (
                  <EventPreview key={event.dateId} event={event.event} />
                ))}
                {dayEvents.length > 1 ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant='outline'
                        className='flex h-8 w-full justify-center text-xs'
                      >
                        <MoreHorizontal className='mr-1 size-4' />
                        {dayEvents.length - 1} more
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{format(day, 'MMMM d, yyyy')}</DialogTitle>
                      </DialogHeader>
                      <div className='flex flex-col space-y-2'>
                        {dayEvents.map((event) => (
                          <EventPreview
                            key={event.dateId}
                            event={event.event}
                          />
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                ) : null}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
