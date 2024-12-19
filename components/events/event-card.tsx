// import type { EventWithDate } from '@/lib/types'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { DatesAggregator } from '@/components/dates-aggregator'
import { ExternalLinkIcon } from 'lucide-react'
import { Prisma } from '@prisma/client'
import { Button } from '../ui/button'
import Link from 'next/link'

type EventCardProps = {
  event: Prisma.EventGetPayload<{ include: { dates: true } }>
}

export const EventCard = ({ event }: EventCardProps) => {
  return (
    <Card key={event.id} className='group shadow transition hover:scale-[1.01]'>
      <div className='sm:flex'>
        <div
          className={cn(
            'relative aspect-[16/6] w-full overflow-hidden rounded-t-lg sm:aspect-video sm:w-1/3 sm:rounded-l-lg sm:rounded-tr-none',
          )}
        >
          <img
            src={event.image ?? '/placeholder.jpg'}
            alt={event.title}
            className='h-full w-full object-cover'
            loading='lazy'
          />
        </div>

        <div className='p-4 sm:w-2/3'>
          <CardHeader className='flex-row items-center justify-between gap-1.5 space-y-0 p-0 pb-2'>
            <CardTitle className='line-clamp-1 text-lg'>
              {event.title}
            </CardTitle>

            <CardDescription className='flex items-center gap-x-2'>
              <Button size='xs' asChild>
                <Link href={`/event/${event.id}`}>Details</Link>
              </Button>

              <Button size='xs' asChild>
                <a href={event.source} target='_blank' rel='noreferrer'>
                  Source
                  <ExternalLinkIcon />
                </a>
              </Button>
            </CardDescription>
          </CardHeader>

          <CardContent className='p-0'>
            <DatesAggregator dates={event.dates} />

            <p className='line-clamp-3 text-xs'>{event.description}</p>
          </CardContent>
        </div>
      </div>
    </Card>
  )
}
