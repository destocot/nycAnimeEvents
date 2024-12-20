'use server'

import db from '@/lib/db'
import { UpdateEventSchema } from '@/lib/validators'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { safeParse, flatten } from 'valibot'

export const updateEventAction = async (values: unknown) => {
  const parsedValues = safeParse(UpdateEventSchema, values)

  if (!parsedValues.success) {
    const { nested } = flatten<typeof UpdateEventSchema>(parsedValues.issues)

    if (!nested) return { error: 'Oops, something went wrong' }

    return { error: nested[Object.keys(nested)[0] as keyof typeof nested]?.[0] }
  }

  const earliestAt = parsedValues.output.dates.reduce((earliest, date) => {
    return date < earliest ? date : earliest
  })

  const { output } = parsedValues

  await db.event.update({
    where: { id: output.eventId },
    data: {
      ...(output.title ? { title: output.title } : {}),
      ...(output.source ? { source: output.source } : {}),
      ...(output.image ? { image: output.image } : {}),
      ...(output.description ? { description: output.description } : {}),
      earliestAt,
      dates: {
        deleteMany: { eventId: output.eventId },
        createMany: {
          data: output.dates.map((date) => ({ date })),
        },
      },
    },
    select: { id: true },
  })

  revalidatePath(`/event/${output.eventId}`)
  revalidatePath('/')
}
