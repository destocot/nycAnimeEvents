import Link from "next/link";

import { EventList } from "@/components/event-list";
import { Header } from "@/components/header";
import { PrintButton } from "@/components/print-button";
import { Button } from "@/components/ui/button";
import { TAKE_EVENTS_LIMIT } from "@/lib/constants";
import db from "@/lib/db";

const HomePage = async () => {
  const initialEvents = await db.event.findMany({
    where: { isApproved: true },
    include: {
      eventDates: {
        orderBy: { date: "asc" },
      },
    },
    orderBy: { earliestDate: "asc" },
    take: TAKE_EVENTS_LIMIT,
  });

  return (
    <>
      <Header>
        <Button asChild>
          <Link href="/events/new">Submit Event</Link>
        </Button>
        <PrintButton />
      </Header>
      <main className="px-2 py-4 container mx-auto max-w-4xl">
        <EventList initialEvents={initialEvents} />
      </main>
    </>
  );
};

export default HomePage;
