import { auth } from '@/auth'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin',
}

export default async function AdminPage() {
  const session = await auth()

  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  return (
    <div className='container mx-auto h-full max-w-4xl px-4 py-8'>
      <div>
        {!!session.user.email && (
          <div className='flex flex-col'>
            <span className='text-sm font-medium'>Email</span>
            {session.user.email}
          </div>
        )}
        {!!session.user.name && (
          <div className='flex flex-col'>
            <span className='text-sm font-medium'>Name</span>
            {session.user.name}
          </div>
        )}
        {!!session.user.image && (
          <div className='flex flex-col'>
            <span className='text-sm font-medium'>image</span>
            <img src={session.user.image} alt='user image' />
          </div>
        )}
        {!!session.user.id && (
          <div className='flex flex-col'>
            <span className='text-sm font-medium'>ID</span>
            {session.user.id}
          </div>
        )}
      </div>
    </div>
  )
}
