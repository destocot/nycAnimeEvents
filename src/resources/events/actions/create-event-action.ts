"use server";

import * as v from "valibot";
import { CreateEventSchema } from "../validators";
import { createEvent } from "../queries";
import { parseSchedule } from "@/lib/schedule-parser";
import type { UploadedImage } from "./upload-image-action";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replaceAll(/[^\w\s-]/g, "")
    .replaceAll(/[\s_-]+/g, "-")
    .replaceAll(/^-+|-+$/g, "");
}

async function generateUniqueSlug(title: string): Promise<string> {
  const base = slugify(title);
  const { prisma } = await import("@/lib/prisma");

  let slug = base;
  let exists = await prisma.event.findUnique({ where: { slug } });
  let suffix = 1;

  while (exists) {
    slug = `${base}-${suffix}`;
    exists = await prisma.event.findUnique({ where: { slug } });
    suffix++;
  }

  return slug;
}

export async function createEventAction(formData: unknown, image?: UploadedImage) {
  const result = v.safeParse(CreateEventSchema, formData);
  if (!result.success) {
    return { error: v.flatten(result.issues) };
  }

  const { title, schedule, startTime, endTime, ...rest } = result.output;

  const parsed = parseSchedule(schedule);
  if (!parsed.dates.length) {
    return { error: { nested: { schedule: ["Please enter at least one valid date."] } } };
  }

  const slug = await generateUniqueSlug(title);
  const startDate = new Date(parsed.dates[0].date + "T00:00:00.000Z");

  const event = await createEvent({
    title,
    slug,
    startDate,
    startTime: startTime || null,
    endTime: endTime || null,
    ...rest,
    dates: {
      create: parsed.dates.map((d) => ({
        date: new Date(d.date + "T00:00:00.000Z"),
      })),
    },
    ...(image ? { image: { create: image } } : {}),
  });

  return { data: event };
}
