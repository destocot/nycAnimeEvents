import { EventList } from "@/components/event-list";
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

  return <EventList events={sortedEvents} />;
};

export default HomePage;
