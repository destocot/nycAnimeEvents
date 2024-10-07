import { DeleteEventDialog } from "@/components/admin/delete-event-dialog";
import { EditEventDialog } from "@/components/admin/edit-event-dialog";
import { Header } from "@/components/header";
import { LinkButton } from "@/components/link-button";
import { PrintButton } from "@/components/print-button";
import { Badge } from "@/components/ui/badge";
import db from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { ExternalLinkIcon } from "lucide-react";
import { notFound } from "next/navigation";

type EventPageProps = { params: { id: string } };

export async function generateStaticParams() {
  const events = await db.event.findMany({
    select: { eventId: true },
  });

  return events.map((event) => ({ params: { id: event.eventId } }));
}

const CreateEventPage = async ({ params }: EventPageProps) => {
  const eventId = params.id;

  const event = await db.event.findUnique({
    where: { eventId },
    include: { eventDates: { orderBy: { date: "asc" } } },
  });

  if (!event) notFound();

  return (
    <>
      <Header>
        <PrintButton />
      </Header>

      <main className="px-2 py-4 container mx-auto max-w-4xl">
        <div className="mt-4">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">{event.title}</h1>
            <div>
              <img
                src={event.image ?? "/placeholder.jpg"}
                alt={event.title}
                className="w-full aspect-[16/7] rounded object-cover object-top"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <p className="leading-relaxed opacity-80 w-full max-w-prose text-justify">
                {event.description}
              </p>
              <div className="flex sm:flex-col gap-2">
                <LinkButton
                  href={event.source}
                  label="Source"
                  rightIcon={ExternalLinkIcon}
                  external
                  variant="secondary"
                />
                <EditEventDialog event={event} />
                <DeleteEventDialog eventId={event.eventId} />
              </div>
            </div>
            <div className="h-1 bg-muted" />
            <h3 className="text-xl font-bold tracking-tight">Upcoming Dates</h3>
            <ul className="flex flex-wrap gap-2">
              {event.eventDates.map((date, i) => (
                <li key={date.dateId}>
                  <Badge
                    key={date.dateId}
                    variant={i === 0 ? "default" : "secondary"}
                    className="text-sm"
                  >
                    {formatDate(date.date)}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
};

export default CreateEventPage;
