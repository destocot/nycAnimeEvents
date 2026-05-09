import { Link } from "next-view-transitions";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex-1 relative flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/not-found.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center text-white space-y-4 px-4">
        <p className="text-7xl font-bold tracking-tight">404</p>
        <p className="text-lg font-medium">Page not found</p>
        <p className="text-sm text-white/70">This event might have passed, or the link is wrong.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 mt-2 text-sm border border-white/30 rounded-full px-4 py-2 hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          Back to events
        </Link>
      </div>
    </main>
  );
}
