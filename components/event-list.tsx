"use client";

import { useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { PrinterIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { EventWithDate } from "@/lib/types";
import { type Date } from "@prisma/client";

type EventListProps = { events: Array<EventWithDate> };

export function EventList({ events }: EventListProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => void window.print();

  events.forEach((e) => {
    if (e.title.toLowerCase().startsWith("h")) {
      console.log(e);
    }
  });

  return (
    <div className="container mx-auto p-4 max-w-3xl min-h-screen">
      <div className="flex justify-between items-center mb-4 sticky rounded-b top-0 bg-background/10 z-10 p-2 gap-2 backdrop-blur-lg">
        <h2 className="text-xl text-balance sm:text-2xl font-semibold tracking-tight">
          Upcoming NYC Anime Events
        </h2>
        <Button variant="secondary" asChild>
          <span>{events.length} Events</span>
        </Button>

        <Button onClick={handlePrint} className="print:hidden">
          <PrinterIcon className="mr-2 h-4 w-4" /> Print
        </Button>
      </div>
      <div ref={contentRef} className="space-y-3.5">
        {events.map((event, index) => (
          <Card key={index}>
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
                    {event.title}
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
      <div className="h-8 my-4" />
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
