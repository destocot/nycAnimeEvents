'use server'

import { auth } from '@/auth'
import db from '@/lib/db'
import { ParseEventIdSchema } from '@/lib/validators'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { flatten, safeParse } from 'valibot'

export const deleteEventAction = async (values: unknown) => {
  const session = await auth()
  if (!session?.user) throw new Error('Unauthorized')

  const parsedValues = safeParse(ParseEventIdSchema, values)

  if (!parsedValues.success) {
    const flatErrors = flatten<typeof ParseEventIdSchema>(parsedValues.issues)
    console.error(flatErrors)
    return
  }

  const eventId = parsedValues.output.eventId

  await db.$transaction([
    db.eventDate.deleteMany({ where: { eventId } }),
    db.event.delete({ where: { eventId } }),
  ])

  revalidatePath('/')
  redirect('/')
}
