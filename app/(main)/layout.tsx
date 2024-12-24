import { DisplayEventCount } from '@/components/events/display-event-count'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <main className='min-h-[calc(100vh-5rem)]'>{children}</main>
      <Footer />
      <DisplayEventCount />
    </>
  )
}
