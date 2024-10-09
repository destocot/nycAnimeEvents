import { getEventCount } from '@/queries/events'
import { Button } from '@/components/ui/button'

export const DisplayEventCount = async () => {
  const eventCount = await getEventCount()

  return (
    <Button
      size='sm'
      variant='ghost'
      className='animate-slowPulse gap-1 text-xs'
    >
      {eventCount} <span>Events</span>
    </Button>
  )
}
