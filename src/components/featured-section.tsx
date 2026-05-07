"use client";

import { useState } from "react";
import { Link } from "next-view-transitions";
import { CalendarDays, MapPin } from "lucide-react";
import { categoryLabel, formatEventDates } from "@/lib/event-utils";
import type { EventWithDates } from "@/resources/events/queries";

const IMG_TRANSITION = "transform 500ms cubic-bezier(0.4, 0, 0.2, 1), filter 500ms cubic-bezier(0.4, 0, 0.2, 1)";
const SHINE_TRANSITION = "opacity 400ms ease";

type PanelProps = {
  event: EventWithDates;
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
};

const FeaturedPanel = ({ event, active, onEnter, onLeave }: PanelProps) => (
  <Link
    href={`/events/${event.slug}`}
    className="relative flex-1 h-full overflow-hidden"
    style={{ transform: "skewX(-6deg)" }}
    onMouseEnter={onEnter}
    onMouseLeave={onLeave}
  >
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src={event.image?.url ?? "/placeholder.jpg"}
      alt={event.image?.alt ?? event.title}
      className="absolute inset-0 w-full h-full object-cover"
      style={{
        transform: `skewX(6deg) scale(${active ? 1.1 : 1.05})`,
        filter: `brightness(${active ? 1.1 : 1.0})`,
        transition: IMG_TRANSITION,
      }}
    />

    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

    {/* shine overlay — light catches the surface on hover */}
    <div
      className="absolute inset-0 bg-linear-to-br from-white/25 via-white/5 to-transparent pointer-events-none"
      style={{ opacity: active ? 1 : 0, transition: SHINE_TRANSITION }}
    />

    <div
      className="absolute bottom-0 left-0 right-0 px-8 py-3"
      style={{ transform: "skewX(6deg)" }}
    >
      <p className="text-[9px] font-semibold uppercase tracking-widest text-white/50 mb-0.5">
        {categoryLabel[event.category]}
      </p>
      <h3 className="font-bold text-sm leading-snug text-white line-clamp-1">
        {event.title}
      </h3>
      <div className="flex items-center gap-3 mt-1 text-xs text-white/60">
        <span className="flex items-center gap-1">
          <CalendarDays className="size-3 shrink-0" />
          {formatEventDates(event.dates)}
        </span>
        <span className="flex items-center gap-1 min-w-0 truncate">
          <MapPin className="size-3 shrink-0" />
          {event.location}
        </span>
      </div>
    </div>
  </Link>
);

type RowProps = { events: EventWithDates[] };

const FeaturedRow = ({ events }: RowProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex gap-2 h-30 overflow-hidden">
      {events.map((event, i) => (
        <FeaturedPanel
          key={event.id}
          event={event}
          active={hovered === i}
          onEnter={() => setHovered(i)}
          onLeave={() => setHovered(null)}
        />
      ))}
    </div>
  );
};

type Props = { events: EventWithDates[] };

export const FeaturedSection = ({ events }: Props) => {
  if (events.length < 2) return null;

  return (
    <section className="max-w-6xl mx-auto w-full px-4 pt-8 pb-2 overflow-hidden">
      <h2 className="text-lg font-semibold mb-4">Featured Events</h2>
      <div className="space-y-3 -mx-8">
        <FeaturedRow events={events.slice(0, 2)} />
        {events.length >= 4 && <FeaturedRow events={events.slice(2, 4)} />}
      </div>
    </section>
  );
};
