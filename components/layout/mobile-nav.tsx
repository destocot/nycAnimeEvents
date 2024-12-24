'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export const MobileNav = () => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size='sm' variant='outline'>
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side='top'>
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription className='sr-only'>
            Use the links below to navigate to different sections of the website
          </SheetDescription>
        </SheetHeader>
        <nav className='grid items-center justify-center gap-4 py-4'>
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
      </SheetContent>
    </Sheet>
  )
}
