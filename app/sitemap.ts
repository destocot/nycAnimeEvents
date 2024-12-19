import db from '@/lib/db'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = 'https://nyc-anime-events.vercel.app'

  const events = await db.event.findMany({
    where: { isApproved: true },
    select: { id: true, updatedAt: true },
  })

  // Switch to slugs in the future
  const eventUrls = events.map((event) => ({
    url: `${BASE_URL}/event/${event.id}`,
    lastModified: event.updatedAt,
  }))

  return [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/events`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/events/new`,
      lastModified: new Date(),
    },
    ...eventUrls,
  ]
}
