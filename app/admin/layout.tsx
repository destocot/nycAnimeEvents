import { Header } from '@/components/layout/header'
import { SubHeader } from '@/components/admin/sub-header'
import { Footer } from '@/components/layout/footer'

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <SubHeader />
      <main className='min-h-[calc(100vh-8rem)]'>{children}</main>
      <Footer />
    </>
  )
}
