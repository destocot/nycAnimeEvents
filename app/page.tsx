import { SrvrEventList } from '@/components/srvr-event-list'
import { Header } from '@/components/header'
import { PrintButton } from '@/components/print-button'
import { Suspense } from 'react'
import { EventListSkeleton } from '@/components/skeletons/event-list-skeleton'
import { LinkButton } from '@/components/link-button'
import { PencilIcon, SearchIcon } from 'lucide-react'

const HomePage = () => {
  return (
    <>
      <Header>
        <LinkButton
          size='sm'
          href='/events'
          label='Search'
          leftIcon={SearchIcon}
        />
        <LinkButton
          size='sm'
          href='/events/new'
          label='Submit Event'
          leftIcon={PencilIcon}
        />
        <PrintButton />
      </Header>

      <main className='container mx-auto max-w-4xl px-2 py-4'>
        <Suspense fallback={<EventListSkeleton />}>
          <SrvrEventList />
        </Suspense>
      </main>
    </>
  )
}

export default HomePage
