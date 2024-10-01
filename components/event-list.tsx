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

type Event = {
  title: string;
  date: Array<Date>;
  description: string;
  image: string;
  href: string;
};

type EventListProps = { events: Array<Event> };

export function EventList({ events }: EventListProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = () => void window.print();

  return (
    <div className="container mx-auto p-4 max-w-3xl min-h-screen">
      <div className="flex justify-between items-center mb-4 sticky top-0 bg-background/80 z-10 p-2 backdrop-blur">
        <h2 className="text-2xl font-semibold tracking-tight">
          Upcoming NYC Anime Events
        </h2>
        <Button onClick={handlePrint} className="print:hidden">
          <PrinterIcon className="mr-2 h-4 w-4" /> Print
        </Button>
      </div>
      <div ref={contentRef} className="space-y-3">
        {events.map((event, index) => (
          <Card key={index} className="w-full">
            <div className="sm:flex">
              <div className="sm:w-1/3 aspect-video relative overflow-hidden rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none">
                <img
                  src={event.image}
                  alt={event.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="sm:w-2/3 p-4">
                <CardHeader className="p-0 pb-2 flex-row items-center space-y-0 justify-between">
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <CardDescription>
                    <a
                      href={event.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonVariants({
                        size: "sm",
                        variant: "link",
                      })}
                    >
                      More details
                    </a>
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-xs text-muted-foreground mb-1">
                    {event.date
                      .map((date) =>
                        date.toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          timeZone: "UTC",
                        })
                      )
                      .join(", ")}
                  </p>
                  <p className="text-xs">{event.description}</p>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="h-8" />
    </div>
  );
}
