"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { EventWithDate } from "@/lib/types";
import Link from "next/link";
import { DatesAggregator } from "./dates-aggregator";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { LoaderIcon } from "lucide-react";

type EventListProps = { initialEvents: Array<EventWithDate> };

export function EventList({ initialEvents }: EventListProps) {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["events"],
      queryFn: async ({
        pageParam = "",
      }: {
        pageParam: string;
      }): Promise<{
        data: Array<EventWithDate>;
        nextId: string | undefined;
      }> => {
        const response = await fetch(`/api/events?cursor=${pageParam}`);
        const json = await response.json();
        return json;
      },
      initialPageParam: "",
      getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
      initialData: {
        pages: [{ data: initialEvents, nextId: undefined }],
        pageParams: [""],
      },
    });

  const { inView, ref } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const events = data.pages.flatMap((page) => page.data);

  return (
    <div className="space-y-3.5">
      {events.map((event) => (
        <Card key={event.eventId}>
          <div className="sm:flex">
            <div
              className={cn(
                "sm:w-1/3 aspect-video w-full relative overflow-hidden rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={event.image ?? "/placeholder.jpg"}
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
                <DatesAggregator dates={event.eventDates} />
                <p className="text-xs line-clamp-3 min-h-[3rem]">
                  {event.description}
                </p>
              </CardContent>
            </div>
          </div>
        </Card>
      ))}
      {isFetchingNextPage && (
        <div className="flex w-full justify-center items-center py-4">
          <LoaderIcon className="animate-spin" />
        </div>
      )}
      <div className="mx-auto flex max-w-6xl justify-center" ref={ref} />
    </div>
  );
}
