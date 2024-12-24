'use server'

import db from '@/lib/db'
import { CreateEventSchema } from '@/lib/validators'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { safeParse, flatten } from 'valibot'

export const createEventAction = async (values: unknown) => {
  const parsedValues = safeParse(CreateEventSchema, values)

  if (!parsedValues.success) {
    const { nested } = flatten<typeof CreateEventSchema>(parsedValues.issues)

    if (!nested) return { error: 'Oops, something went wrong' }

    return { error: nested[Object.keys(nested)[0] as keyof typeof nested]?.[0] }
  }

  const earliestAt = parsedValues.output.dates.reduce((earliest, date) => {
    return date < earliest ? date : earliest
  })

  const { output } = parsedValues

  await db.event.create({
    data: {
      title: output.title,
      source: output.source,
      ...(output.image ? { image: output.image } : {}),
      ...(output.description ? { description: output.description } : {}),
      earliestAt,
      dates: {
        createMany: {
          data: output.dates.map((date) => ({ date })),
        },
      },
    },
    select: { id: true },
  })

  revalidatePath('/')
  redirect('/events/new/success')
}
