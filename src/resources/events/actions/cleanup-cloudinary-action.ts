"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { UserRole } from "@/generated/prisma/client";
import { cloudinary } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";

export async function cleanupCloudinaryAction(): Promise<
  { data: { deleted: number } } | { error: string }
> {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = session?.user.role;
  if (role !== UserRole.ADMIN && role !== UserRole.MODERATOR) {
    return { error: "Unauthorized" };
  }

  try {
    const [cloudinaryRes, dbImages] = await Promise.all([
      cloudinary.api.resources({ type: "upload", prefix: "nycanimeevents/", max_results: 500 }),
      prisma.eventImage.findMany({ select: { cloudinaryId: true } }),
    ]);

    const usedIds = new Set(dbImages.map((i) => i.cloudinaryId));
    const orphans = (cloudinaryRes.resources as { public_id: string }[])
      .map((r) => r.public_id)
      .filter((id) => !usedIds.has(id));

    if (orphans.length === 0) return { data: { deleted: 0 } };

    await cloudinary.api.delete_resources(orphans);
    return { data: { deleted: orphans.length } };
  } catch (e) {
    console.error("[cleanup-cloudinary] failed:", e);
    return { error: "Cleanup failed. Check server logs." };
  }
}
