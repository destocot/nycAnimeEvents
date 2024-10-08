"use client";

import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import type { EventWithDate } from "@/lib/types";
import { EventCard } from "@/components/event-card";
import { EventListSkeleton } from "@/components/skeletons/event-list-skeleton";

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
    <div className="space-y-3.5 max-w-3xl mx-auto">
      {events.map((event) => (
        <EventCard key={event.eventId} event={event} />
      ))}
      {isFetchingNextPage && <EventListSkeleton />}
      <div className="mx-auto flex max-w-6xl justify-center" ref={ref} />
    </div>
  );
}
