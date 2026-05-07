import { Link } from "next-view-transitions";
import { CalendarDays, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { categoryLabel, formatEventDates } from "@/lib/event-utils";
import type { EventWithDates } from "@/resources/events/queries";

export const EventCard = ({ event }: { event: EventWithDates }) => {
  return (
    <Link href={`/events/${event.slug}`} className="group block">
      <div className="relative aspect-4/5 rounded-2xl overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.image?.url ?? "/placeholder.jpg"}
          alt={event.image?.alt ?? event.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-sm leading-snug line-clamp-2 text-white">
              {event.title}
            </h3>
            <Badge className="shrink-0 text-xs bg-white/15 text-white border-white/20 backdrop-blur-sm">
              {categoryLabel[event.category]}
            </Badge>
          </div>
          <div className="space-y-1 text-xs text-white/70">
            <div className="flex items-center gap-1.5">
              <CalendarDays className="size-3 shrink-0" />
              <span>
                {event.dates.length > 0
                  ? formatEventDates(event.dates)
                  : (event.archivedDates ?? "")}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="size-3 shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
