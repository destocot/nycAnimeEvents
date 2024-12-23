import Link from 'next/link'
import { Button } from '../ui/button'
import { ShieldIcon } from 'lucide-react'

export const SubHeader = () => {
  return (
    <div className='container mx-auto flex h-12 max-w-4xl items-center px-4'>
      <div className='flex w-full items-center justify-between'>
        <Link
          href='/admin'
          className='text-balance text-xl font-bold tracking-tight sm:text-2xl'
        >
          Admin
        </Link>

        <nav className='flex items-center gap-x-4'>
          <Button
            size='sm'
            className='font-semibold'
            variant='secondary'
            asChild
          >
            <Link href='/admin/manager'>
              Manager
              <ShieldIcon />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  )
}
