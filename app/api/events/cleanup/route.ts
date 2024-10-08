import db from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  console.log('Cleaning up events...')

  const isFromVercelCron = req.headers
    .get('user-agent')
    ?.startsWith('vercel-cron')

  const now = new Date()
  const yesterdayMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 1,
  )

  const eventDates = await db.eventDate.findMany({
    where: {
      date: {
        lt: yesterdayMidnight,
      },
    },
    select: { dateId: true, date: true, eventId: true },
  })

  return NextResponse.json({
    data: eventDates,
    isFromVercelCron,
  })
}
