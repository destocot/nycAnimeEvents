'use server'

// import { auth } from '@/auth'
import db from '@/lib/db'
import { CreateEventSchema } from '@/lib/validators'
import { revalidatePath } from 'next/cache'
import { flatten, safeParse } from 'valibot'

export const submitEventAction = async (values: unknown) => {
  // const session = await auth()
  // if (!session?.user) throw new Error('Unauthorized')

  const queuedEventsCount = await db.event.count({
    where: { isApproved: false },
  })

  if (queuedEventsCount >= 25) {
    return { data: null, error: 'Too many events are pending approval.' }
  }

  const parsedValues = safeParse(CreateEventSchema, values)

  if (!parsedValues.success) {
    const flatErrors = flatten<typeof CreateEventSchema>(parsedValues.issues)
    return { data: null, error: flatErrors }
  }

  const output = parsedValues.output

  const earliestDate = output.dates?.reduce(
    (earliest: Date | null, date: Date) => {
      if (earliest === null) return date
      return date < earliest ? date : earliest
    },
    null as Date | null,
  )

  if (!earliestDate) {
    throw new Error('Please enter at least one date.')
  }

  const submittedEvent = await db.event.create({
    data: {
      title: output.title,
      source: output.source,
      image: output.image,
      description: output.description,
      earliestDate,
      isApproved: false,
      eventDates: {
        createMany: {
          data: output.dates.map((date) => ({ date })),
        },
      },
    },
    select: { eventId: true },
  })

  revalidatePath('/')
  return { data: null, error: null }
}
