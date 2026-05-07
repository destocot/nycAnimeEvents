import { notFound } from "next/navigation";
import { CalendarDays, MapPin, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { findOneEventBySlug } from "@/resources/events/queries";
import { scheduleArchivalIfPassed } from "@/resources/events/archival";
import { categoryLabel, formatEventDatesFull } from "@/lib/event-utils";
import { EventStatus } from "@/generated/prisma/client";
import type { Metadata } from "next";

type Props = Readonly<{ params: Promise<{ slug: string }> }>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await findOneEventBySlug(slug);
  if (!event) return {};
  return {
    title: `${event.title} | NYC Anime Events`,
    description: event.description ?? undefined,
  };
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const event = await findOneEventBySlug(slug);

  if (!event || event.status !== EventStatus.APPROVED) notFound();

  scheduleArchivalIfPassed(event);

  return (
    <main className="flex-1">
      <div className="relative h-64 w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.image?.url ?? "/placeholder.jpg"}
          alt={event.image?.alt ?? event.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent" />
        <div className="absolute bottom-0 w-full max-w-3xl mx-auto px-4 pb-8 left-0 right-0">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h1 className="text-3xl font-bold tracking-tight text-white leading-tight">
              {event.title}
            </h1>
            <Badge className="bg-white/15 text-white border-white/20 backdrop-blur-sm shrink-0">
              {categoryLabel[event.category]}
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 w-full">
        <div className="space-y-3 text-sm text-muted-foreground">
          {event.passed && (
            <p className="text-xs text-muted-foreground italic">This event has passed.</p>
          )}
          <div className="flex items-start gap-2">
            <CalendarDays className="size-4 shrink-0 mt-0.5" />
            <span>
              {event.dates.length > 0
                ? formatEventDatesFull(event.dates, event.startTime, event.endTime)
                : (event.archivedDates ?? "")}
            </span>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="size-4 shrink-0 mt-0.5" />
            <span>
              {event.location}
              {event.address && (
                <span className="block text-xs mt-0.5">{event.address}</span>
              )}
            </span>
          </div>
          {event.websiteUrl && (
            <div className="flex items-center gap-2">
              <ExternalLink className="size-4 shrink-0" />
              <a
                href={event.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline truncate"
              >
                {event.websiteUrl}
              </a>
            </div>
          )}
        </div>

        {event.description && (
          <>
            <Separator className="my-6" />
            <div className="prose prose-sm max-w-none text-foreground">
              <p className="whitespace-pre-wrap leading-relaxed">{event.description}</p>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
