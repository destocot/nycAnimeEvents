'use server'

import { auth } from '@/auth'
import db from '@/lib/db'
import { ParseEventDateIdSchema } from '@/lib/validators'
import { EventDate } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { flatten, safeParse } from 'valibot'

export const deleteEventDateAction = async (values: unknown) => {
  const session = await auth()
  if (!session?.user) throw new Error('Unauthorized')

  const parsedValues = safeParse(ParseEventDateIdSchema, values)

  if (!parsedValues.success) {
    const flatErrors = flatten<typeof ParseEventDateIdSchema>(
      parsedValues.issues,
    )
    console.error(flatErrors)
    return
  }

  const dateId = parsedValues.output.dateId

  const deletedEventDate = await db.eventDate.delete({
    where: { dateId },
    select: { eventId: true },
  })

  const event = await db.event.findUniqueOrThrow({
    where: { eventId: deletedEventDate.eventId },
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
    await db.event.delete({ where: { eventId: deletedEventDate.eventId } })
  } else {
    await db.event.update({
      where: { eventId: deletedEventDate.eventId },
      data: { earliestDate },
    })
  }

  revalidatePath('/')
}
