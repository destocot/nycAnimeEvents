import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function EventCardSkeleton() {
  return (
    <Card className='group shadow'>
      <div className='sm:flex'>
        <div className='relative aspect-[16/6] w-full overflow-hidden rounded-t-lg sm:aspect-video sm:w-1/3 sm:rounded-l-lg sm:rounded-tr-none'>
          <Skeleton className='h-full w-full' />
        </div>

        <div className='p-4 sm:w-2/3'>
          <CardHeader className='flex-row items-center justify-between gap-1.5 space-y-0 p-0 pb-2'>
            <Skeleton className='h-6 w-[250px]' />
            <div className='flex items-center gap-x-2'>
              <Skeleton className='h-8 w-[70px]' />
              <Skeleton className='h-8 w-[80px]' />
            </div>
          </CardHeader>

          <CardContent className='p-0'>
            <Skeleton className='mb-2 h-4 w-[200px]' />
            <div className='space-y-2'>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-3/4' />
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  )
}
