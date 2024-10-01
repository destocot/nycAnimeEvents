"use client";

import { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { GridIcon, PrinterIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [tile, setTile] = useState(false);

  return (
    <div className="container mx-auto p-4 max-w-3xl min-h-screen">
      <div className="flex justify-between items-center mb-4 sticky rounded-b top-0 bg-background/10 z-10 p-2 backdrop-blur-lg">
        <h2 className="text-2xl font-semibold tracking-tight">
          Upcoming NYC Anime Events
        </h2>
        <div className="flex items-center gap-x-2">
          <Button
            onClick={() => setTile((prev) => !prev)}
            className="print:hidden"
          >
            <GridIcon className="size-4" />
          </Button>
          <Button onClick={handlePrint} className="print:hidden">
            <PrinterIcon className="mr-2 h-4 w-4" /> Print
          </Button>
        </div>
      </div>
      <div
        ref={contentRef}
        className={cn("grid grid-col-1 gap-3 px-2.5", {
          "grid-cols-2 md:grid-cols-3": tile,
        })}
      >
        {events.map((event, index) => (
          <Card
            key={index}
            className={cn("w-full h-full", {
              "aspect-square relative": tile,
            })}
          >
            {tile && (
              <div
                style={{ backgroundImage: `url(${event.image})` }}
                className="inset-0 absolute opacity-15 bg-no-repeat bg-cover rounded-lg overflow-hidden"
              />
            )}
            <div className="sm:flex">
              <div
                className={cn(
                  "sm:w-1/3 aspect-video relative overflow-hidden rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none",
                  {
                    hidden: tile,
                  }
                )}
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="object-cover object-top w-full h-full"
                />
              </div>
              <div
                className={cn("sm:w-2/3 p-4", {
                  "sm:w-full": tile,
                })}
              >
                <CardHeader
                  className={cn(
                    "p-0 pb-2 flex-row items-center space-y-0 justify-between",
                    {
                      "flex-col": tile,
                    }
                  )}
                >
                  <CardTitle className="text-lg line-clamp-1">
                    {event.title}
                  </CardTitle>
                  <CardDescription>
                    <a
                      href={event.href}
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
                  <p className="text-xs text-muted-foreground mb-1 line-clamp-4">
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
                  <p
                    className={cn("text-xs line-clamp-4 min-h-[4.05rem]", {
                      "min-h-0 line-clamp-2 sm:line-clamp-4": tile,
                    })}
                  >
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
