import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { EventStatus } from "@/generated/prisma/enums";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_BETTER_AUTH_URL ?? "http://localhost:3000";

  const events = await prisma.event.findMany({
    where: { status: EventStatus.APPROVED, passed: false },
    select: { slug: true, updatedAt: true },
  });

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${base}/events`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/past-events`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.5 },
    { url: `${base}/submit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  const eventRoutes: MetadataRoute.Sitemap = events.map((e) => ({
    url: `${base}/events/${e.slug}`,
    lastModified: e.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...eventRoutes];
}
