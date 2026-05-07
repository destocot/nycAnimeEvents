import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import { Toaster } from "sonner";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

const BASE_URL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default: "NYC Anime Events",
    template: "%s | NYC Anime Events",
  },
  description:
    "Discover anime conventions, screenings, performances, and more happening in New York City.",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: "NYC Anime Events",
    description:
      "Discover anime conventions, screenings, performances, and more happening in New York City.",
    url: BASE_URL,
    siteName: "NYC Anime Events",
    images: [{ url: "/opengraph-image.png", width: 1280, height: 720, alt: "NYC Anime Events" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NYC Anime Events",
    description:
      "Discover anime conventions, screenings, performances, and more happening in New York City.",
    images: ["/opengraph-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        className={cn("h-full antialiased font-sans", figtree.variable)}
        suppressHydrationWarning
      >
        <body className="min-h-full flex flex-col">
          <Providers>
            <Navbar />
            {children}
            <Toaster richColors />
          </Providers>
        </body>
      </html>
    </ViewTransitions>
  );
}
