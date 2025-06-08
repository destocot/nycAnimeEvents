import { Card, CardContent, CardHeader, CardTitle } from '@ui/card'
import { cn } from '@/lib/utils'
import { DatesAggregator } from '@/components/dates-aggregator'
import { ExternalLinkIcon } from 'lucide-react'
import { Prisma } from '@prisma/client'
import { Button } from '@ui/button'

type EventCardProps = {
  event: Prisma.EventGetPayload<{ include: { dates: true } }>
}

export const EventCard = ({ event }: EventCardProps) => {
  return (
    <Card key={event.id} className='group relative shadow'>
      <div className='sm:flex'>
        <div
          className={cn(
            'relative aspect-[16/6] w-full overflow-hidden rounded-t-lg sm:aspect-video sm:flex-1 sm:rounded-l-lg sm:rounded-tr-none',
          )}
        >
          <img
            src={event.image ?? '/placeholder.jpg'}
            alt={event.title}
            className='h-full w-full object-cover object-[50%_10%] transition group-hover:scale-105'
            loading='lazy'
          />
        </div>

        <div className='flex flex-col p-4 sm:flex-1'>
          <CardHeader className='flex-row items-center justify-between gap-1.5 space-y-0 p-0'>
            <CardTitle className='line-clamp-1 text-lg'>
              <a href={event.source} target='_blank'>
                {event.title}
                <span className='absolute inset-0 z-10' />
              </a>
            </CardTitle>
            <Button size='icon' className='size-8 rounded-full'>
              <ExternalLinkIcon />
            </Button>
          </CardHeader>

          <CardContent className='flex-grow p-0'>
            <DatesAggregator dates={event.dates} />

            <p className='line-clamp-3 text-sm'>{event.description}</p>
          </CardContent>
        </div>
      </div>
    </Card>
  )
}
