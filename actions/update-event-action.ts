'use server'

import { auth } from '@/auth'
// import db from '@/lib/db'
import { UpdateEventSchema } from '@/lib/validators'
// import { revalidatePath } from 'next/cache'
import { flatten, safeParse } from 'valibot'

export const updateEventAction = async (values: unknown) => {
  const session = await auth()
  if (!session?.user) throw new Error('Unauthorized')

  const parsedValues = safeParse(UpdateEventSchema, values)

  if (!parsedValues.success) {
    const flatErrors = flatten<typeof UpdateEventSchema>(parsedValues.issues)
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

  // const updatedEvent = await db.event.update({
  //   where: { eventId: output.eventId },
  //   data: {
  //     ...(output.title ? { title: output.title } : {}),
  //     ...(output.source ? { source: output.source } : {}),
  //     ...(output.image ? { image: output.image } : {}),
  //     ...(output.description ? { description: output.description } : {}),
  //     earliestDate,
  //     eventDates: {
  //       deleteMany: {},
  //       createMany: {
  //         data: output.dates.map((date) => ({ date })),
  //       },
  //     },
  //   },
  //   select: { eventId: true },
  // })

  // revalidatePath(`/event/${updatedEvent.eventId}`)
  return { data: null, error: null }
}
