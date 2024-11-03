import { auth } from '@/auth'
import db from '@/lib/db'
import { EventDate } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  console.log('Cleaning up events...')

  const isFromVercelCron = req.headers
    .get('user-agent')
    ?.startsWith('vercel-cron')

  const session = await auth()

  if (!isFromVercelCron && !session?.user) {
    return NextResponse.json({ mssg: 'Unauthorized' })
  }

  const now = new Date()
  const nowMidnight = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  )

  const eventDates = await db.eventDate.findMany({
    where: {
      date: {
        lt: nowMidnight,
      },
    },
    select: { dateId: true, date: true, eventId: true },
  })

  const eventsToResync = Array.from(
    new Set(eventDates.map((eventDate) => eventDate.eventId)),
  )

  await db.eventDate.deleteMany({ where: { date: { lt: nowMidnight } } })

  eventsToResync.forEach(async (eventId) => {
    const event = await db.event.findUniqueOrThrow({
      where: { eventId },
      select: { eventId: true, eventDates: { select: { date: true } } },
    })

    const earliestDate = event.eventDates?.reduce(
      (earliest: Date | null, eventDate: Pick<EventDate, 'date'>) => {
        const date = eventDate.date

        if (!earliest) return date
        return date < earliest ? date : earliest
      },
      null as Date | null,
    )

    if (!earliestDate) {
      await db.event.delete({ where: { eventId } })
    } else {
      await db.event.update({ where: { eventId }, data: { earliestDate } })
    }
  })

  revalidatePath('/')

  return NextResponse.json({
    data: {
      deleteEventsCount: eventsToResync.length,
      deleteEventDatesCount: eventDates.length,
    },
  })
}
