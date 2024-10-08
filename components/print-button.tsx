'use client'

import { PrinterIcon } from 'lucide-react'
import { Button } from './ui/button'

export const PrintButton = () => {
  const handlePrint = () => {
    window.print()
  }

  return (
    <Button size='sm' onClick={handlePrint} className='print:hidden'>
      <PrinterIcon size={16} />
      <span className='sr-only'>Print</span>
    </Button>
  )
}
