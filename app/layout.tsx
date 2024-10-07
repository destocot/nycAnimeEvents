import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import Providers from "@/providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "NYC Anime Events",
  description:
    "A site showcasing upcoming anime events and Japanese culture in NYC.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="flex flex-col min-h-screen">
            <div className="flex-1">{children}</div>
            <footer>
              <div className="container max-w-4xl mx-auto px-2 py-4">
                <span className="text-sm opacity-50">
                  © 2024 Khurram Ali. All rights reserved.
                </span>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
