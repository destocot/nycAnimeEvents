"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { UserRole } from "@/generated/prisma/client";
import { updateEvent } from "../queries";

export async function updateEventFeaturedAction(eventId: string, featured: boolean) {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = session?.user.role;

  if (role !== UserRole.ADMIN && role !== UserRole.MODERATOR) {
    return { error: "Unauthorized" };
  }

  const event = await updateEvent(eventId, { featured });
  return { data: event };
}
