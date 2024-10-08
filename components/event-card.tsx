import type { EventWithDate } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DatesAggregator } from "@/components/dates-aggregator";
import { LinkButton } from "./link-button";
import { ExternalLinkIcon } from "lucide-react";

type EventCardProps = { event: EventWithDate };

export const EventCard = ({ event }: EventCardProps) => {
  return (
    <Card key={event.eventId} className="shadow">
      <div className="sm:flex">
        <div
          className={cn(
            "sm:w-1/3 aspect-[16/6] sm:aspect-video w-full relative overflow-hidden rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none"
          )}
        >
          <img
            src={event.image ?? "/placeholder.jpg"}
            alt={event.title}
            className="object-cover object-[0_20%] w-full h-full"
          />
        </div>

        <div className="sm:w-2/3 p-4">
          <CardHeader className="p-0 pb-2 flex-row items-center space-y-0 justify-between">
            <CardTitle className="text-lg line-clamp-1">
              {event.title}
            </CardTitle>

            <CardDescription className="flex gap-4 items-center">
              <LinkButton
                href={`/event/${event.eventId}`}
                size="sm"
                label="Details"
                className="h-6 rounded-md px-1.5 text-xs"
              />
              <LinkButton
                href={event.source}
                label="Source"
                srOnlyLabel
                variant="outline"
                size="icon"
                className="size-6"
                rightIcon={ExternalLinkIcon}
                external
              />
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            <DatesAggregator dates={event.eventDates} />
            <p className="text-xs line-clamp-2">{event.description}</p>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};
