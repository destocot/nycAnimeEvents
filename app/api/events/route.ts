import { TAKE_EVENTS_LIMIT } from '@/lib/constants'
import db from '@/lib/db'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const cursorQuery = req.nextUrl.searchParams.get('cursor') ?? undefined
  const skip = cursorQuery ? 1 : 0
  const cursor = cursorQuery ? { id: cursorQuery } : undefined

  const events = await db.event.findMany({
    // where: { isApproved: true },
    include: { dates: true },
    take: TAKE_EVENTS_LIMIT,
    skip,
    cursor,
    orderBy: { earliestAt: 'asc' },
  })

  const nextId = events.at(-1)?.id

  return Response.json({ data: events, nextId })
}
