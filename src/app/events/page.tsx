import { Link } from "next-view-transitions";
import { History } from "lucide-react";
import { Suspense } from "react";
import { EventSearchBar } from "@/components/event-search-bar";
import { CategoryFilterBar } from "@/components/category-filter-bar";
import { EventsGrid } from "@/components/events-grid";

type Props = Readonly<{ searchParams: Promise<{ q?: string; cat?: string }> }>;

export default async function EventsPage({ searchParams }: Props) {
  const { q, cat } = await searchParams;
  const query = q && q.length >= 3 ? q : "";

  return (
    <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            {query ? `Results for "${query}"` : "All Events"}
          </h1>
          <Link
            href="/past-events"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground border border-border rounded-full px-3 py-1.5 hover:text-foreground hover:border-foreground/25 transition-colors"
          >
            <History className="size-3" />
            Past events
          </Link>
        </div>
        <Suspense>
          <EventSearchBar />
        </Suspense>
        <Suspense>
          <CategoryFilterBar />
        </Suspense>
      </div>
      <EventsGrid query={query} category={cat} />
    </main>
  );
}
