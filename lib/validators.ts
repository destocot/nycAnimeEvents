import * as v from "valibot";

const TitleSchema = v.pipe(
  v.string("Your title must be a string."),
  v.nonEmpty("Please enter your title."),
  v.minLength(6, "Your title must have 6 characters or more.")
);

const SourceSchema = v.pipe(
  v.string("Your source must be a string."),
  v.nonEmpty("Please enter your source."),
  v.minLength(6, "Your source must have 6 characters or more.")
);

const ImageSchema = v.union([
  v.pipe(
    v.literal(""),
    v.transform(() => undefined)
  ),
  v.optional(
    v.pipe(
      v.string("Your image must be a string."),
      v.nonEmpty("Please enter your image."),
      v.minLength(6, "Your image must have 6 characters or more.")
    )
  ),
]);

const DescriptionSchema = v.union([
  v.pipe(
    v.literal(""),
    v.transform(() => undefined)
  ),
  v.optional(
    v.pipe(
      v.string("Your description must be a string."),
      v.nonEmpty("Please enter your description."),
      v.minLength(6, "Your description must have 6 characters or more.")
    )
  ),
]);

const DatesSchema = v.pipe(
  v.array(v.union([v.date(), v.string()])),
  v.transform((dates) => {
    return dates.map((d) => {
      if (d instanceof Date) return d;
      return new Date(d);
    });
  }),
  v.minLength(1, "Please enter at least one date.")
);

const EventIdSchema = v.pipe(
  v.string("Your eventId must be a string."),
  v.nonEmpty("Please enter your eventId."),
  v.cuid2("Your eventId must be a string.")
);

export const ParseEventIdSchema = v.object({
  eventId: EventIdSchema,
});
export type ParseEventIdInput = v.InferInput<typeof ParseEventIdSchema>;
export type ParseEventIdOutput = v.InferOutput<typeof ParseEventIdSchema>;

export const CreateEventSchema = v.object({
  title: TitleSchema,
  source: SourceSchema,
  image: ImageSchema,
  description: DescriptionSchema,
  dates: DatesSchema,
  contact: v.pipe(
    v.string("Your contact must be a string."),
    v.nonEmpty("Please enter your contact."),
    v.minLength(6, "Your contact must have 6 characters or more.")
  ),
});
export type CreateEventInput = v.InferInput<typeof CreateEventSchema>;
export type CreateEventOutput = v.InferOutput<typeof CreateEventSchema>;

export const UpdateEventSchema = v.object({
  title: v.optional(TitleSchema),
  source: v.optional(SourceSchema),
  image: ImageSchema,
  description: DescriptionSchema,
  dates: DatesSchema,
  eventId: EventIdSchema,
});
export type UpdateEventInput = v.InferInput<typeof UpdateEventSchema>;
export type UpdateEventOutput = v.InferOutput<typeof UpdateEventSchema>;

// export const CreateQueuedEventSchema = v.object({
//   ...EventSchema,
//   contact: v.pipe(
//     v.string("Your contact must be a string."),
//     v.nonEmpty("Please enter your contact."),
//     v.minLength(6, "Your contact must have 6 characters or more.")
//   ),
// });

// export type CreateQueuedEventInput = v.InferInput<
//   typeof CreateQueuedEventSchema
// >;
// export type CreateQueuedEventOutput = v.InferOutput<
//   typeof CreateQueuedEventSchema
// >;
