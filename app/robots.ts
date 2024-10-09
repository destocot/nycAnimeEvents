import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const BASE_URL = 'https://nyc-anime-events.vercel.app'

  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/event'],
      disallow: ['/admin/'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
