"use client";

import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { EventCard } from "@/components/event-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { EventWithDates } from "@/resources/events/queries";

type SerializedDate = Omit<EventWithDates["dates"][number], "date" | "createdAt"> & {
  date: string;
  createdAt: string;
};

// startTime / endTime are already strings on Event — no conversion needed
type SerializedEvent = Omit<EventWithDates, "startDate" | "createdAt" | "updatedAt" | "dates"> & {
  startDate: string;
  createdAt: string;
  updatedAt: string;
  dates: SerializedDate[];
};

type ApiResponse = {
  events: SerializedEvent[];
  nextCursor?: string;
  hasMore: boolean;
};

async function fetchEvents(q: string, category: string, cursor?: string): Promise<ApiResponse> {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (category) params.set("cat", category);
  if (cursor) params.set("cursor", cursor);
  const res = await fetch(`/api/events?${params}`);
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
}

function deserialize(e: SerializedEvent): EventWithDates {
  return {
    ...e,
    startDate: new Date(e.startDate),
    createdAt: new Date(e.createdAt),
    updatedAt: new Date(e.updatedAt),
    dates: e.dates.map((d) => ({
      ...d,
      date: new Date(d.date),
      createdAt: new Date(d.createdAt),
    })),
  };
}

const EventCardSkeleton = () => (
  <div className="relative aspect-3/4 rounded-2xl overflow-hidden">
    <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
  </div>
);

type Props = { query?: string; category?: string };

export const EventsGrid = ({ query = "", category = "" }: Props) => {
  const sentinelRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ["events", query, category],
    queryFn: ({ pageParam }) => fetchEvents(query, category, pageParam as string | undefined),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "pending") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"].map((k) => (
          <EventCardSkeleton key={k} />
        ))}
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-center py-24 text-muted-foreground text-sm">
        Failed to load events. Please try again.
      </div>
    );
  }

  const events = data.pages.flatMap((p) => p.events.map(deserialize));

  if (events.length === 0) {
    return (
      <div className="text-center py-24 text-muted-foreground text-sm">
        {query ? `No events found for "${query}".` : "No upcoming events yet — check back soon."}
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
        {isFetchingNextPage &&
          ["lsk1", "lsk2", "lsk3"].map((k) => <EventCardSkeleton key={k} />)}
      </div>
      <div ref={sentinelRef} className="h-1" />
    </div>
  );
};
