import * as v from "valibot";

const EventSchema = {
  title: v.pipe(
    v.string("Your title must be a string."),
    v.nonEmpty("Please enter your title."),
    v.minLength(6, "Your title must have 6 characters or more.")
  ),
  source: v.pipe(
    v.string("Your source must be a string."),
    v.nonEmpty("Please enter your source."),
    v.minLength(6, "Your source must have 6 characters or more.")
  ),
  image: v.optional(
    v.pipe(
      v.string("Your image must be a string."),
      v.nonEmpty("Please enter your image."),
      v.minLength(6, "Your image must have 6 characters or more.")
    )
  ),
  description: v.optional(
    v.pipe(
      v.string("Your description must be a string."),
      v.nonEmpty("Please enter your description."),
      v.minLength(6, "Your description must have 6 characters or more.")
    )
  ),
  dates: v.pipe(
    v.array(v.union([v.date(), v.string()])),
    v.transform((dates) => {
      return dates.map((d) => {
        if (d instanceof Date) return d;
        return new Date(d);
      });
    }),
    v.minLength(1, "Please enter at least one date.")
  ),
};

export const CreateEventSchema = v.object({
  ...EventSchema,
});

export type CreateEventInput = v.InferInput<typeof CreateEventSchema>;
export type CreateEventOutput = v.InferOutput<typeof CreateEventSchema>;

export const CreateQueuedEventSchema = v.object({
  ...EventSchema,
  contact: v.pipe(
    v.string("Your contact must be a string."),
    v.nonEmpty("Please enter your contact."),
    v.minLength(6, "Your contact must have 6 characters or more.")
  ),
});

export type CreateQueuedEventInput = v.InferInput<
  typeof CreateQueuedEventSchema
>;
export type CreateQueuedEventOutput = v.InferOutput<
  typeof CreateQueuedEventSchema
>;
