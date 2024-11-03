import * as v from 'valibot'

const EventIdSchema = v.pipe(
  v.string('Your eventId must be a string.'),
  v.nonEmpty('Please enter your eventId.'),
  v.cuid2('Your eventId must be a string.'),
)

export const ParseEventIdSchema = v.object({
  eventId: EventIdSchema,
})

const BaseEventSchema = v.object({
  title: v.optional(
    v.pipe(
      v.string('Your title must be a string.'),
      v.nonEmpty('Please enter your title.'),
      v.minLength(6, 'Your title must have 6 characters or more.'),
    ),
  ),
  source: v.optional(
    v.pipe(
      v.string('Your source must be a string.'),
      v.nonEmpty('Please enter your source.'),
      v.minLength(6, 'Your source must have 6 characters or more.'),
    ),
  ),
  image: v.optional(
    v.union([
      v.pipe(
        v.literal(''),
        v.transform(() => undefined),
      ),
      v.pipe(
        v.string('Your image must be a string.'),
        v.nonEmpty('Please enter your image.'),
        v.minLength(6, 'Your image must have 6 characters or more.'),
      ),
    ]),
  ),
  description: v.optional(
    v.union([
      v.pipe(
        v.literal(''),
        v.transform(() => undefined),
      ),
      v.pipe(
        v.string('Your description must be a string.'),
        v.nonEmpty('Please enter your description.'),
        v.minLength(6, 'Your description must have 6 characters or more.'),
      ),
    ]),
  ),
  dates: v.optional(
    v.pipe(
      v.array(v.union([v.date(), v.string()])),
      v.transform((dates) => {
        return dates.map((d) => {
          if (d instanceof Date) return d
          return new Date(d)
        })
      }),
      v.minLength(1, 'Please enter at least one date.'),
    ),
  ),
  eventId: v.optional(EventIdSchema),
})

export const CreateEventSchema = v.omit(
  v.required(BaseEventSchema, ['title', 'source', 'dates']),
  ['eventId'],
)

export const UpdateEventSchema = v.required(BaseEventSchema, [
  'eventId',
  'dates',
])

const EventDateIdSchema = v.pipe(
  v.number('Your dateId must be a number.'),
  v.integer('Your dateId must be an integer.'),
  v.minValue(1, 'Your dateId must be greater than 0.'),
)

export const ParseEventDateIdSchema = v.object({
  dateId: EventDateIdSchema,
})

export type ParseEventIdInput = v.InferInput<typeof ParseEventIdSchema>
export type ParseEventIdOutput = v.InferOutput<typeof ParseEventIdSchema>
export type CreateEventInput = v.InferInput<typeof CreateEventSchema>
export type CreateEventOutput = v.InferOutput<typeof CreateEventSchema>
export type UpdateEventInput = v.InferInput<typeof UpdateEventSchema>
export type UpdateEventOutput = v.InferOutput<typeof UpdateEventSchema>
export type ParseEventDateIdInput = v.InferInput<typeof ParseEventDateIdSchema>
export type ParseEventDateIdOutput = v.InferOutput<
  typeof ParseEventDateIdSchema
>
