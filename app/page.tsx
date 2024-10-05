import { EventList } from "@/components/event-list";
import { Header } from "@/components/header";
import { PrintButton } from "@/components/print-button";
import { Button } from "@/components/ui/button";
import { TAKE_EVENTS_LIMIT } from "@/lib/constants";
import db from "@/lib/db";
import Link from "next/link";
import { Fragment } from "react";

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
    <Fragment>
      <Header>
        <Button asChild>
          <Link href="/events/new">Create Event</Link>
        </Button>
        <PrintButton />
      </Header>
      <main className="px-2 py-4 container mx-auto max-w-4xl">
        <EventList initialEvents={initialEvents} />
      </main>
    </Fragment>
  );
};

export default HomePage;
