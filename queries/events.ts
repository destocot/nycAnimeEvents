import 'server-only'

import db from '@/lib/db'
import { unstable_cache as cache } from 'next/cache'

export const getEventCount = cache(
  async () =>
    db.event.count({
      where: { isApproved: true },
    }),
  ['event-count'],
  {
    revalidate: 60 * 60,
  },
)
