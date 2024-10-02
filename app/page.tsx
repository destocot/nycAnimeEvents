import { EventList } from "@/components/event-list";
import { PrintButton } from "@/components/print-button";
import { Button } from "@/components/ui/button";
import db from "@/lib/db";

const HomePage = async () => {
  const events = await db.event.findMany({
    include: {
      eventDates: {
        orderBy: {
          date: {
            date: "asc",
          },
        },
        include: { date: true },
      },
    },
  });

  const sortedEvents = events.sort((a, b) => {
    const aDate = a.eventDates[0].date.date.getTime();
    const bDate = b.eventDates[0].date.date.getTime();

    return aDate - bDate;
  });

  return (
    <div className="container mx-auto p-4 max-w-3xl min-h-screen">
      <div className="flex justify-between items-center mb-4 sticky rounded-b top-0 bg-background/10 z-10 p-2 gap-2 backdrop-blur-lg">
        <h2 className="text-xl text-balance sm:text-2xl font-semibold tracking-tight">
          Upcoming NYC Anime Events
        </h2>
        <Button variant="secondary" asChild>
          <span>{events.length} Events</span>
        </Button>

        <PrintButton />
      </div>
      <EventList events={sortedEvents} />
      <div className="h-8 my-4" />
    </div>
  );
};

export default HomePage;
