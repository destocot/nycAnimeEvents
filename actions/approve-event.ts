'use server'

import { auth } from '@/auth'
import db from '@/lib/db'
import { ParseEventIdSchema } from '@/lib/validators'
import { revalidatePath, revalidateTag } from 'next/cache'
import { flatten, safeParse } from 'valibot'

export async function approveEventAction(values: unknown) {
  const session = await auth()
  if (!session?.user) throw new Error('Unauthorized')

  const parsedValues = safeParse(ParseEventIdSchema, values)

  if (!parsedValues.success) {
    const flatErrors = flatten<typeof ParseEventIdSchema>(parsedValues.issues)
    console.error(flatErrors)
    return
  }

  const eventId = parsedValues.output.eventId

  await db.event.update({
    where: { id: eventId },
    data: { isApproved: true },
  })

  revalidatePath('/')
  revalidateTag('event-count')
}
