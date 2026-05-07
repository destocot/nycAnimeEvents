import { Link } from "next-view-transitions";
import { ArrowLeft } from "lucide-react";
import { EventCard } from "@/components/event-card";
import { findPassedEvents } from "@/resources/events/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Past Events | NYC Anime Events",
};

export default async function PastEventsPage() {
  const events = await findPassedEvents();

  return (
    <main className="flex-1">
      <section className="max-w-6xl mx-auto w-full px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Back to upcoming events"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <h1 className="text-lg font-semibold">Past Events</h1>
        </div>

        {events.length === 0 ? (
          <p className="text-center py-24 text-muted-foreground text-sm">
            No past events yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
