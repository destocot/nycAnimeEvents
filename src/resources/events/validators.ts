import * as v from "valibot";
import { EventCategory, EventStatus } from "@/generated/prisma/client";

export const CreateEventSchema = v.object({
  title: v.pipe(v.string(), v.minLength(3), v.maxLength(120)),
  schedule: v.pipe(v.string(), v.minLength(1), v.maxLength(500)),
  startTime: v.optional(v.string()),
  endTime: v.optional(v.string()),
  description: v.optional(v.pipe(v.string(), v.maxLength(2000))),
  location: v.pipe(v.string(), v.minLength(2), v.maxLength(120)),
  address: v.optional(v.pipe(v.string(), v.maxLength(200))),
  websiteUrl: v.optional(v.pipe(v.string(), v.url(), v.regex(/^https?:\/\//, "URL must start with http:// or https://"))),
  category: v.enum(EventCategory),
});

export const UpdateEventStatusSchema = v.object({
  status: v.picklist([EventStatus.APPROVED, EventStatus.REJECTED]),
});
