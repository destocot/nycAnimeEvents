import { formatDate } from '@/lib/utils'
import { EventDate } from '@prisma/client'

export const DatesAggregator = ({ dates }: { dates: Array<EventDate> }) => {
  let isSequential = true

  for (let i = 0; i < dates.length - 1; i++) {
    const current = new Date(dates[i].date)
    const next = new Date(dates[i + 1].date)

    const timeDiff = next.getTime() - current.getTime()
    const dayDiff = timeDiff / (1000 * 60 * 60 * 24)

    if (dayDiff !== 1) {
      isSequential = false
      break
    }
  }

  if (isSequential && dates.length > 1) {
    return (
      <p className='mb-1 line-clamp-4 text-xs text-muted-foreground'>
        {formatDate(dates[0].date)}
        {' - '}
        {formatDate(dates[dates.length - 1].date)}
      </p>
    )
  }

  return (
    <p className='mb-1 line-clamp-4 text-xs text-muted-foreground'>
      {dates.map((date) => formatDate(date.date)).join(', ')}
    </p>
  )
}
