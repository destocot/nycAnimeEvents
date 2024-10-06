import { auth } from "@/auth";
import { DeleteEventButton } from "@/components/delete-event-button";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import db from "@/lib/db";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { Fragment } from "react";

const Page = async () => {
  const authenticated = await auth();

  if (!authenticated?.user?.name) {
    throw new Error("Unauthorized");
  }

  const events = await db.event.findMany({
    include: {
      eventDates: {
        orderBy: { date: "asc" },
      },
    },
    orderBy: { earliestDate: "asc" },
  });

  return (
    <Fragment>
      <Header>
        <Button asChild>
          <Link href="/">Home</Link>
        </Button>
      </Header>

      <main className="px-2 py-4 container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight capitalize">
          {authenticated.user.name}
        </h1>
        <div className="mt-4">
          <table className="border-collapse table-auto w-full text-sm">
            <thead>
              <tr>
                <th className="border-b flex-1 font-medium p-4 pl-8 pt-0 pb-3 text-neutral-400 text-left">
                  Title
                </th>
                <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-neutral-400 text-left">
                  Event Dates
                </th>
                <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-neutral-400 text-left">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.eventId}>
                  <td className="border-b align-top border-neutral-100 p-4 pl-8 text-neutral-500">
                    <Link href={`/event/${event.eventId}`}>{event.title}</Link>
                  </td>
                  <td className="border-b border-neutral-100 py-4 pr-2 pl-8 text-neutral-500">
                    <ul className="space-y-0.5">
                      {event.eventDates.map((eventDate) => (
                        <li key={eventDate.dateId}>
                          <p className="h-6 whitespace-nowrap">
                            {formatDate(eventDate.date, {
                              includeYear: true,
                            })}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="border-b border-neutral-100 p-4 pl-2 text-neutral-500">
                    <ul className="space-y-0.5">
                      {event.eventDates.map((eventDate) => (
                        <li key={eventDate.dateId}>
                          <DeleteEventButton eventDateId={eventDate.dateId} />
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </Fragment>
  );
};

export default Page;
