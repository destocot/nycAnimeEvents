import type { PropsWithChildren } from 'react'
import Link from 'next/link'
import { HomeIcon } from 'lucide-react'

import { MobileNav } from '@/components/mobile-nav'
import { ThemeToggler } from '@/components/theme-toggler'
import { LinkButton } from '@/components/link-button'
import { DisplayEventCount } from '@/components/display-event-count'

type HeaderProps = PropsWithChildren

export const Header = ({ children }: HeaderProps) => {
  return (
    <header className='sticky top-0 z-10 flex h-16 items-center rounded-b bg-background/10 backdrop-blur-lg print:relative'>
      <div className='container mx-auto flex max-w-4xl items-center justify-between gap-2 px-4 py-4 sm:px-2'>
        <div className='flex items-center gap-2'>
          <Link
            href='/'
            className='text-balance text-xl font-bold tracking-tight sm:text-2xl'
          >
            NYC Anime Events
          </Link>
          <DisplayEventCount />
          <ThemeToggler className='sm:hidden' />
        </div>
        <nav className='hidden items-center gap-2 md:flex print:hidden'>
          <LinkButton size='sm' href='/' label='Home' leftIcon={HomeIcon} />
          {children}
          <ThemeToggler />
        </nav>
        <div className='block md:hidden'>
          <MobileNav>{children}</MobileNav>
        </div>
      </div>
    </header>
  )
}
