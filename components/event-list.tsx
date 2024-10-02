"use client";

import { useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EventWithDate } from "@/lib/types";
import { type Date } from "@prisma/client";
import Link from "next/link";

type EventListProps = { events: Array<EventWithDate> };

export function EventList({ events }: EventListProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={contentRef} className="space-y-3.5">
      {events.map((event) => (
        <Card key={event.eventId}>
          <div className="sm:flex">
            <div
              className={cn(
                "sm:w-1/3 aspect-video relative overflow-hidden rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none"
              )}
            >
              <img
                src={event.image ?? ""}
                alt={event.title}
                className="object-cover object-top w-full h-full"
              />
            </div>
            <div className="sm:w-2/3 p-4">
              <CardHeader className="p-0 pb-2 flex-row items-center space-y-0 justify-between">
                <CardTitle className="text-lg line-clamp-1">
                  <Link href={`/event/${event.eventId}`}>{event.title}</Link>
                </CardTitle>
                <CardDescription>
                  <a
                    href={event.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({
                      size: "sm",
                      variant: "link",
                      className: "animate-pulse text-xs",
                    })}
                  >
                    More details
                  </a>
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <GenerateDates dates={event.eventDates} />
                <p className="text-xs line-clamp-3 min-h-[3rem]">
                  {event.description}
                </p>
              </CardContent>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export const GenerateDates = ({ dates }: { dates: Array<Date> }) => {
  let isSequential = true;

  for (let i = 0; i < dates.length - 1; i++) {
    const current = dates[i].date.date;
    const next = dates[i + 1].date.date;

    const timeDiff = next.getTime() - current.getTime();
    const dayDiff = timeDiff / (1000 * 60 * 60 * 24);

    if (dayDiff !== 1) {
      isSequential = false;
      break;
    }
  }

  if (isSequential && dates.length > 1) {
    return (
      <p className="text-xs text-muted-foreground mb-1 line-clamp-4">
        {dates[0].date.date.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          timeZone: "UTC",
        })}{" "}
        -{" "}
        {dates[dates.length - 1].date.date.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          timeZone: "UTC",
        })}
      </p>
    );
  }

  return (
    <p className="text-xs text-muted-foreground mb-1 line-clamp-4">
      {dates
        .map((date) =>
          date.date.date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            timeZone: "UTC",
          })
        )
        .join(", ")}
    </p>
  );
};
