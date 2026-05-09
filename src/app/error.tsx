"use client";

import { ArrowLeft, RefreshCw } from "lucide-react";
import { Link } from "next-view-transitions";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="flex-1 relative flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/not-found.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center text-white space-y-4 px-4">
        <p className="text-7xl font-bold tracking-tight">500</p>
        <p className="text-lg font-medium">Something went wrong</p>
        <p className="text-sm text-white/70">An unexpected error occurred. Try again or go back.</p>
        <div className="flex items-center justify-center gap-3 mt-2">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 text-sm border border-white/30 rounded-full px-4 py-2 hover:bg-white/10 transition-colors"
          >
            <RefreshCw className="size-3.5" />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm border border-white/30 rounded-full px-4 py-2 hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            Back to events
          </Link>
        </div>
      </div>
    </main>
  );
}
