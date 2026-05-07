"use server";

import { headers } from "next/headers";
import * as v from "valibot";
import { auth } from "@/lib/auth";
import { UserRole } from "@/generated/prisma/client";
import { UpdateEventStatusSchema } from "../validators";
import { updateEvent } from "../queries";

export async function updateEventStatusAction(eventId: string, formData: unknown) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || (session.user.role !== UserRole.ADMIN && session.user.role !== UserRole.MODERATOR)) {
    return { error: "Unauthorized" };
  }

  const result = v.safeParse(UpdateEventStatusSchema, formData);
  if (!result.success) {
    return { error: v.flatten(result.issues) };
  }

  const event = await updateEvent(eventId, { status: result.output.status });
  return { data: event };
}
