'use client'

import { Button } from '../ui/button'

export const CleanupEventsButton = () => {
  const click = async () => {
    const res = await fetch('/api/events/cleanup')

    if (!res.ok) {
      console.error('Error cleaning up events', res)
    } else {
      const json = await res.json()
      console.log('Cleanup events response', json)
    }
  }

  return (
    <Button variant='outline' onClick={click}>
      Cleanup Events
    </Button>
  )
}
