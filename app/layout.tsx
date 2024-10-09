import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

import Providers from '@/providers'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://nyc-anime-events.vercel.app'),
  keywords: ['anime', 'events', 'NYC', 'Japanese culture'],
  title: {
    template: '%s | NYC Anime Events',
    default: 'NYC Anime Events',
  },
  openGraph: {
    images: ['opengraph-image.png'],
    description:
      'A site showcasing upcoming anime events and Japanese culture in NYC.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className='flex min-h-screen flex-col'>
            <div className='flex-1'>{children}</div>
            <footer>
              <div className='container mx-auto max-w-4xl px-2 py-4'>
                <span className='text-sm opacity-50'>
                  © 2024 Khurram Ali. All rights reserved.
                </span>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  )
}
