import type { Metadata } from 'next'
import { Titillium_Web } from 'next/font/google'
import './globals.css'

import Providers from '@/providers'

const titilliumWeb = Titillium_Web({
  weight: ['200', '300', '400', '600', '700', '900'],
  subsets: ['latin'],
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
      <body className={`${titilliumWeb.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
