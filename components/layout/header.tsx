import Link from 'next/link'
import { Button } from '../ui/button'
import { ThemeToggler } from '../theme-toggler'

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

          <nav className='flex items-center gap-x-4'>
            <Button size='sm' className='font-semibold' asChild>
              <Link href='/'>Home</Link>
            </Button>

            <Button
              size='sm'
              className='font-semibold'
              variant='secondary'
              asChild
            >
              <Link href='/events/new'>Create Event</Link>
            </Button>

            <ThemeToggler />
          </nav>
        </div>
      </div>
    </header>
  )
}
