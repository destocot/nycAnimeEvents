import { FeaturedSection } from "@/components/featured-section";
import { EventsGrid } from "@/components/events-grid";
import { findFeaturedEvents } from "@/resources/events/queries";

export default async function Page() {
  const featured = await findFeaturedEvents();

  return (
    <main className="flex-1">
      <FeaturedSection events={featured} />

      <section className="max-w-6xl mx-auto w-full px-4 py-10">
        <h2 className="text-lg font-semibold mb-6">Upcoming Events</h2>
        <EventsGrid />
      </section>
    </main>
  );
}
