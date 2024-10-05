"use server";

import { safeParse, flatten } from "valibot";

import db from "@/lib/db";
import { CreateEventSchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createEvent = async (values: FormData) => {
  const input = {
    title: values.get("title"),
    source: values.get("source"),
    image: values.get("image"),
    description: values.get("description"),
    dates: values.getAll("dates"),
  };

  const parsedValues = safeParse(CreateEventSchema, {
    title: input.title,
    source: input.source,
    ...(input.image ? { image: input.image } : {}),
    ...(input.description ? { description: input.description } : {}),
    dates: Array.isArray(input.dates) ? input.dates : [input.dates],
  });

  if (!parsedValues.success) {
    const flatErrors = flatten<typeof CreateEventSchema>(parsedValues.issues);
    console.log("validation errors", flatErrors);
    return { success: false };
  }

  const output = parsedValues.output;

  const earliestDate = output.dates.reduce(
    (earliest: Date | null, date: Date) => {
      if (earliest === null) return date;
      return date < earliest ? date : earliest;
    },
    null as Date | null
  );

  const newEvent = await db.event.create({
    data: {
      title: output.title,
      source: output.source,
      ...(output.image ? { image: output.image } : {}),
      ...(output.description ? { description: output.description } : {}),
      earliestDate,
      eventDates: {
        createMany: {
          data: output.dates.map((date) => ({ date })),
        },
      },
    },
  });

  revalidatePath("/");
  redirect(`/event/${newEvent.eventId}`);
};
