"use client";

import { useTransitionRouter } from "next-view-transitions";
import { useMutation } from "@tanstack/react-query";
import { CalendarDays, MapPin, ExternalLink, Check, X, Trash2, Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { updateEventStatusAction } from "@/resources/events/actions/update-event-status-action";
import { updateEventFeaturedAction } from "@/resources/events/actions/update-event-featured-action";
import { deleteEventAction } from "@/resources/events/actions/delete-event-action";
import { categoryLabel, formatEventDates } from "@/lib/event-utils";
import type { EventWithDates } from "@/resources/events/queries";
import { EventStatus } from "@/generated/prisma/enums";

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  PENDING: "outline",
  APPROVED: "default",
  REJECTED: "destructive",
};

export const AdminEventCard = ({ event }: { event: EventWithDates }) => {
  const router = useTransitionRouter();

  const mutation = useMutation({
    mutationFn: (status: EventStatus) => updateEventStatusAction(event.id, { status }),
    onSuccess: () => router.refresh(),
  });

  const featuredMutation = useMutation({
    mutationFn: () => updateEventFeaturedAction(event.id, !event.featured),
    onSuccess: () => router.refresh(),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteEventAction(event.id),
    onSuccess: () => router.refresh(),
  });

  const busy = mutation.isPending || featuredMutation.isPending || deleteMutation.isPending;

  return (
    <Card className="overflow-hidden py-0! gap-0!">
      <div className="flex gap-4 p-4">
        {event.image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={event.image.url}
            alt={event.image.alt ?? event.title}
            className="w-24 h-24 object-cover rounded-md shrink-0"
          />
        ) : (
          <div className="w-24 h-24 bg-muted rounded-md shrink-0 flex items-center justify-center text-muted-foreground text-xs">
            No image
          </div>
        )}

        <div className="flex-1 min-w-0">
          <CardHeader className="p-0 pb-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold leading-snug">{event.title}</h3>
              <div className="flex items-center gap-1.5 shrink-0">
                <Badge variant="secondary" className="text-xs">
                  {categoryLabel[event.category]}
                </Badge>
                <Badge variant={statusVariant[event.status]} className="text-xs">
                  {event.status}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0 space-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <CalendarDays className="size-3.5 shrink-0" />
              <span>
                {event.dates.length > 0
                  ? formatEventDates(event.dates)
                  : (event.archivedDates ?? "—")}
              </span>
              {event.passed && (
                <Badge variant="secondary" className="text-xs ml-1">Passed</Badge>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="size-3.5 shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
            {event.websiteUrl && (
              <div className="flex items-center gap-1.5">
                <ExternalLink className="size-3.5 shrink-0" />
                <a
                  href={event.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline truncate"
                >
                  {event.websiteUrl}
                </a>
              </div>
            )}
          </CardContent>
        </div>
      </div>

      {event.description && (
        <div className="px-4 pb-3">
          <p className="text-xs text-muted-foreground line-clamp-2">{event.description}</p>
        </div>
      )}

      {event.status === EventStatus.PENDING && (
        <div className="px-4 py-2 border-t flex gap-2 bg-muted/30">
          <Button
            size="sm"
            onClick={() => mutation.mutate(EventStatus.APPROVED)}
            disabled={busy}
            className="gap-1.5"
          >
            <Check className="size-3.5" />
            Approve
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => mutation.mutate(EventStatus.REJECTED)}
            disabled={busy}
            className="gap-1.5"
          >
            <X className="size-3.5" />
            Reject
          </Button>
        </div>
      )}

      <div className="px-4 py-2 border-t flex items-center justify-between bg-muted/10">
        <button
          onClick={() => featuredMutation.mutate()}
          disabled={busy}
          className="flex items-center gap-1.5 text-xs transition-colors disabled:opacity-50"
          style={{ color: event.featured ? "oklch(0.72 0.18 85)" : undefined }}
        >
          <Star
            className="size-3.5"
            fill={event.featured ? "currentColor" : "none"}
            strokeWidth={1.5}
          />
          <span className={event.featured ? "font-medium" : "text-muted-foreground"}>
            {event.featured ? "Featured" : "Feature"}
          </span>
        </button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              disabled={busy}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
            >
              <Trash2 className="size-3.5" />
              <span>Delete</span>
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete event?</AlertDialogTitle>
              <AlertDialogDescription>
                &ldquo;{event.title}&rdquo; will be permanently deleted. This cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteMutation.mutate()}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Card>
  );
};
