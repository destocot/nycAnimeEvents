"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@/generated/prisma/client";

export async function deleteEventAction(eventId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = session?.user.role;

  if (role !== UserRole.ADMIN && role !== UserRole.MODERATOR) {
    return { error: "Unauthorized" };
  }

  await prisma.event.delete({ where: { id: eventId } });
  return { success: true };
}
