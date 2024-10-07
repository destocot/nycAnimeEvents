import { auth } from "@/auth";
// import { DeleteEventButton } from "@/components/delete-event-button";
// import { DeleteQueuedEventButton } from "@/components/delete-queued-event";
import { Header } from "@/components/header";
import { LinkButton } from "@/components/link-button";
import { Button } from "@/components/ui/button";
import db from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

const Page = async () => {
  const authenticated = await auth();

  if (!authenticated?.user?.name) {
    throw new Error("Unauthorized");
  }

  const [queuedEvents, events] = await db.$transaction([
    db.event.findMany({
      where: { isApproved: false },
      include: {
        eventDates: {
          orderBy: { date: "asc" },
        },
      },
      orderBy: { earliestDate: "asc" },
    }),
    db.event.findMany({
      where: { isApproved: true },
      include: {
        eventDates: {
          orderBy: { date: "asc" },
        },
      },
      orderBy: { earliestDate: "asc" },
    }),
  ]);

  return (
    <Fragment>
      <Header>
        <LinkButton href="/" label="Home" leftIcon={HomeIcon} />
      </Header>

      <main className="px-2 py-4 container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight capitalize">
          {authenticated.user.name}
        </h1>

        <div className="mt-4 space-y-2">
          <h2 className="w-fit text-2xl font-bold tracking-tight px-1.5 rounded text-black bg-yellow-500">
            Queued Events
          </h2>
          {queuedEvents.length > 0 ? (
            <table className="border-collapse table-auto w-full text-sm">
              <thead>
                <tr>
                  <th className="border-b flex-1 font-medium p-4 pl-8 pt-0 pb-3 text-neutral-400 text-left">
                    Title
                  </th>
                  <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-neutral-400 text-left">
                    Source
                  </th>
                  <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-neutral-400 text-left">
                    Contact
                  </th>
                  <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-neutral-400 text-left">
                    Description
                  </th>
                  <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-neutral-400">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {queuedEvents.map((event) => (
                  <tr key={event.eventId}>
                    <td className="border-b align-top border-muted p-4 pl-8">
                      {event.title}
                    </td>
                    <td className="border-b align-top border-muted p-4 pl-8">
                      {event.source}
                    </td>
                    <td className="border-b align-top border-muted p-4 pl-8">
                      {event.contact}
                    </td>
                    <td className="border-b align-top border-muted p-4 pl-8">
                      {event.description}
                    </td>
                    <td className="border-b align-top border-muted p-4 pl-8">
                      <div className="flex gap-2 justify-center">
                        <Button className="h-6" variant="success">
                          Approve
                        </Button>
                        DeleteQueuedEventButton
                        {/* <DeleteQueuedEventButton
                          eventId={event.queuedEventId}
                        /> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No queued events</p>
          )}
        </div>

        <div className="mt-4 space-y-2">
          <h2 className="w-fit text-2xl font-bold tracking-tight px-1.5 rounded text-black bg-green-500">
            Approved Events
          </h2>
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
                  <td className="border-b align-top border-muted p-4 pl-8 text-neutral-500">
                    <Link href={`/event/${event.eventId}`}>{event.title}</Link>
                  </td>
                  <td className="border-b border-muted py-4 pr-2 pl-8 text-neutral-500">
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
                  <td className="border-b border-muted p-4 pl-2 text-neutral-500">
                    <ul className="space-y-0.5">
                      {event.eventDates.map((eventDate) => (
                        <li key={eventDate.dateId}>
                          DeleteEventButton
                          {/* <DeleteEventButton eventDateId={eventDate.dateId} /> */}
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
