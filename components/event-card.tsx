import type { EventWithDate } from '@/lib/types'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { DatesAggregator } from '@/components/dates-aggregator'
import { LinkButton } from './link-button'
import { ExternalLinkIcon } from 'lucide-react'

type EventCardProps = { event: EventWithDate }

export const EventCard = ({ event }: EventCardProps) => {
  return (
    <Card key={event.eventId} className='shadow transition hover:scale-[1.02]'>
      <div className='sm:flex'>
        <div
          className={cn(
            'relative aspect-[16/6] w-full overflow-hidden rounded-t-lg sm:aspect-video sm:w-1/3 sm:rounded-l-lg sm:rounded-tr-none',
          )}
        >
          <img
            src={event.image ?? '/placeholder.jpg'}
            alt={event.title}
            className='hover:animate-panImageToBottom h-full w-full object-cover object-[0_20%]'
          />
        </div>

        <div className='p-4 sm:w-2/3'>
          <CardHeader className='flex-row items-center justify-between space-y-0 p-0 pb-2'>
            <CardTitle className='line-clamp-1 text-lg'>
              {event.title}
            </CardTitle>

            <CardDescription className='flex items-center gap-4'>
              <LinkButton
                href={`/event/${event.eventId}`}
                size='sm'
                label='Details'
                className='h-6 rounded-md px-1.5 text-xs'
              />
              <LinkButton
                href={event.source}
                label='Source'
                srOnlyLabel
                variant='outline'
                size='icon'
                className='size-6'
                rightIcon={ExternalLinkIcon}
                external
              />
            </CardDescription>
          </CardHeader>

          <CardContent className='p-0'>
            <DatesAggregator dates={event.eventDates} />
            <p className='line-clamp-2 text-xs'>{event.description}</p>
          </CardContent>
        </div>
      </div>
    </Card>
  )
}
