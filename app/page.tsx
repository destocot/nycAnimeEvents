import { EventList } from "@/components/event-list";
import { PrintButton } from "@/components/print-button";
import { Button } from "@/components/ui/button";
import { TAKE_EVENTS_LIMIT } from "@/lib/constants";
import db from "@/lib/db";

const HomePage = async () => {
  const initialEvents = await db.event.findMany({
    include: {
      eventDates: {
        orderBy: { date: "asc" },
      },
    },
    orderBy: { earliestDate: "asc" },
    take: TAKE_EVENTS_LIMIT,
  });

  return (
    <div className="container mx-auto p-4 max-w-3xl min-h-screen">
      <div className="flex justify-between items-center mb-4 sticky rounded-b top-0 bg-background/10 z-10 p-2 gap-2 backdrop-blur-lg">
        <h2 className="text-xl text-balance sm:text-2xl font-semibold tracking-tight">
          Upcoming NYC Anime Events
        </h2>
        <Button variant="secondary" asChild></Button>

        <PrintButton />
      </div>
      <EventList initialEvents={initialEvents} />
      <div className="h-8 my-4" />
    </div>
  );
};

export default HomePage;
