import db from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  console.log('Cleaning up events...')

  const now = new Date()

  const eventDates = await db.eventDate.findMany({
    where: {
      date: {
        lt: now,
      },
    },
  })

  return NextResponse.json({ data: eventDates })
}
