import { EditEventDialog } from "@/components/admin/edit-event-dialog";
import { Header } from "@/components/header";
import { LinkButton } from "@/components/link-button";
import { PrintButton } from "@/components/print-button";
import db from "@/lib/db";
import { ExternalLinkIcon, HomeIcon } from "lucide-react";
import { notFound } from "next/navigation";

type EventPageProps = { params: { id: string } };

const CreateEventPage = async ({ params }: EventPageProps) => {
  const eventId = params.id;

  const event = await db.event.findUnique({
    where: { eventId },
    include: { eventDates: true },
  });

  if (!event) notFound();

  return (
    <>
      <Header>
        <LinkButton href="/" label="Home" leftIcon={HomeIcon} />
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
            <div className="flex gap-2 justify-between">
              <p className="leading-relaxed opacity-80 w-full max-w-prose text-justify">
                {event.description}
              </p>
              <div className="flex flex-col gap-2">
                <LinkButton
                  href={event.source}
                  label="Source"
                  rightIcon={ExternalLinkIcon}
                  external
                  variant="secondary"
                />
                <EditEventDialog event={event} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CreateEventPage;
