import { buttonVariants } from '@/components/ui/button'
import db from '@/lib/db'

export const DisplayEventCount = async () => {
  const count = await db.event.count({
    where: {
      // isApproved: true,
    },
  })

  return (
    <div
      className={buttonVariants({
        size: 'sm',
        variant: 'outline',
      })}
    >
      {count} <span>Events</span>
    </div>
  )
}
