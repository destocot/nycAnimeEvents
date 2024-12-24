import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThemeToggler } from '@/components/layout/theme-toggler'
import { MobileNav } from '@/components/layout/mobile-nav'
import { DisplayEventCount } from '@/components/events/display-event-count'

export const Header = () => {
  return (
    <header className='sticky inset-x-0 top-0 z-10 h-12 border-b bg-background/80 backdrop-blur'>
      <div className='container mx-auto flex h-full max-w-4xl items-center px-4'>
        <div className='flex w-full items-center justify-between'>
          <Link
            href='/'
            className='text-balance text-xl font-bold tracking-tight sm:text-2xl'
          >
            NYC Anime Events
          </Link>

          <div className='flex items-center gap-x-4'>
            <nav className='hidden items-center gap-x-4 sm:flex'>
              <Button size='sm' className='font-semibold' asChild>
                <Link href='/'>Home</Link>
              </Button>

              <Button size='sm' className='font-semibold' asChild>
                <Link href='/events'>Search</Link>
              </Button>

              <Button
                size='sm'
                className='font-semibold'
                variant='secondary'
                asChild
              >
                <Link href='/events/new'>Create Event</Link>
              </Button>
            </nav>

            <DisplayEventCount />

            <div className='sm:hidden'>
              <MobileNav />
            </div>

            <ThemeToggler />
          </div>
        </div>
      </div>
    </header>
  )
}
