'use client'

import { PropsWithChildren, useState } from 'react'
import { HomeIcon, MenuIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { LinkButton } from '@/components/link-button'

type MobileNavProps = PropsWithChildren

export const MobileNav = ({ children }: MobileNavProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon'>
          <MenuIcon />
        </Button>
      </SheetTrigger>

      <SheetContent className='w-1/2'>
        <SheetHeader>
          <SheetTitle className='text-left'>Navigation</SheetTitle>
        </SheetHeader>
        <div className='my-2.5 h-1 bg-muted' />
        <div className='flex flex-col gap-2'>
          <LinkButton
            className='w-full'
            href='/'
            label='Home'
            leftIcon={HomeIcon}
          />
          {children}
        </div>
      </SheetContent>
    </Sheet>
  )
}
