import { CopyrightIcon } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className='h-8 border-t'>
      <div className='container mx-auto flex h-full max-w-4xl items-center px-4'>
        <div className='flex items-center text-sm text-muted-foreground'>
          <CopyrightIcon className='mr-2 size-4' />
          2024 Khurram Ali. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
