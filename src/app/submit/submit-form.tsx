"use client";

import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm, Form, Field, setInput } from "@formisch/react";
import * as v from "valibot";
import { CheckCircle, Clock, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUploader } from "@/components/image-uploader";
import { createEventAction } from "@/resources/events/actions/create-event-action";
import type { UploadedImage } from "@/resources/events/actions/upload-image-action";
import { EventCategory } from "@/generated/prisma/enums";
import { parseSchedule } from "@/lib/schedule-parser";
import { categoryLabel, HIDDEN_CATEGORIES } from "@/lib/event-utils";

const CATEGORIES = Object.entries(categoryLabel)
  .filter(([value]) => !HIDDEN_CATEGORIES.has(value))
  .map(([value, label]) => ({ value: value as EventCategory, label }));

const SubmitFormSchema = v.object({
  title: v.pipe(v.string(), v.minLength(3), v.maxLength(120)),
  schedule: v.pipe(v.string(), v.minLength(1), v.maxLength(500)),
  startTime: v.optional(v.string()),
  endTime: v.optional(v.string()),
  description: v.optional(v.pipe(v.string(), v.maxLength(2000))),
  location: v.pipe(v.string(), v.minLength(2), v.maxLength(120)),
  address: v.optional(v.pipe(v.string(), v.maxLength(200))),
  websiteUrl: v.optional(v.pipe(v.string(), v.url())),
  category: v.enum(EventCategory),
});

type SubmitFormValues = v.InferOutput<typeof SubmitFormSchema>;

export const SubmitForm = () => {
  const form = useForm({ schema: SubmitFormSchema });
  const [imageData, setImageData] = useState<UploadedImage | null>(null);

  // Schedule preview state
  const [scheduleValue, setScheduleValue] = useState("");
  const [previewDates, setPreviewDates] = useState<{ date: string }[]>([]);

  // Time state — managed outside formisch
  const [showTime, setShowTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);

  useEffect(() => {
    if (!scheduleValue.trim()) { setPreviewDates([]); return; }
    const t = setTimeout(() => setPreviewDates(parseSchedule(scheduleValue).dates), 300);
    return () => clearTimeout(t);
  }, [scheduleValue]);

  const mutation = useMutation({
    mutationFn: (values: SubmitFormValues) => createEventAction(values, imageData ?? undefined),
    onError: () => toast.error("Something went wrong. Please try again."),
  });

  if (mutation.isSuccess && mutation.data?.data) {
    return (
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-sm">
          <CheckCircle className="size-12 text-primary mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Event submitted!</h2>
          <p className="text-muted-foreground text-sm">
            Thanks for your submission. Our team will review it and publish it shortly.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Submit an Event</h1>
        <p className="mt-2 text-muted-foreground">
          Know about an anime event happening in NYC? Share it with the community. All submissions
          are reviewed before publishing.
        </p>
      </div>

      <Form of={form} onSubmit={(values) => mutation.mutate(values)}>
        <div className="space-y-6">

          <Field of={form} path={["title"]}>
            {(field) => (
              <div className="space-y-1.5">
                <Label htmlFor="title">
                  Event title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="e.g. AnimeNYC Summer Meetup"
                  {...field.props}
                  value={field.input ?? ""}
                />
                {field.errors && <p className="text-xs text-destructive">{field.errors[0]}</p>}
              </div>
            )}
          </Field>

          <Field of={form} path={["category"]}>
            {(field) => (
              <div className="space-y-1.5">
                <Label>
                  Category <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={field.input as string}
                  onValueChange={(val) =>
                    setInput(form, { path: ["category"] as const, input: val as EventCategory })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {field.errors && <p className="text-xs text-destructive">{field.errors[0]}</p>}
              </div>
            )}
          </Field>

          {/* Date + time section */}
          <div className="space-y-3">
            <Label>
              Date(s) <span className="text-destructive">*</span>
            </Label>

            <Field of={form} path={["schedule"]}>
              {(field) => (
                <div className="space-y-1.5">
                  <Input
                    id="schedule"
                    placeholder="e.g. May 6  ·  May 6–9  ·  May 6, May 25, June 4"
                    {...field.props}
                    value={field.input ?? ""}
                    onChange={(e) => {
                      field.props.onChange(e);
                      setScheduleValue(e.target.value);
                    }}
                  />
                  {scheduleValue.trim() && (
                    <div className="space-y-0.5">
                      {previewDates.length > 0 ? (
                        previewDates.map((d) => {
                          const [y, mo, day] = d.date.split("-").map(Number);
                          return (
                            <p key={d.date} className="text-xs text-muted-foreground">
                              {new Date(Date.UTC(y, mo - 1, day)).toLocaleDateString("en-US", {
                                month: "short", day: "numeric", year: "numeric", timeZone: "UTC",
                              })}
                            </p>
                          );
                        })
                      ) : (
                        <p className="text-xs text-muted-foreground">
                          No valid dates. Try: May 6 · May 6–9 · May 6, May 25, June 4
                        </p>
                      )}
                    </div>
                  )}
                  {field.errors && <p className="text-xs text-destructive">{field.errors[0]}</p>}
                </div>
              )}
            </Field>

            {/* Time inputs */}
            {showTime ? (
              <div className="flex flex-wrap items-center gap-2">
                <Field of={form} path={["startTime"]}>
                  {(field) => (
                    <Input
                      type="time"
                      {...field.props}
                      value={field.input ?? ""}
                      className="w-auto"
                    />
                  )}
                </Field>

                {showEndTime ? (
                  <>
                    <span className="text-sm text-muted-foreground">to</span>
                    <Field of={form} path={["endTime"]}>
                      {(field) => (
                        <Input
                          type="time"
                          {...field.props}
                          value={field.input ?? ""}
                          className="w-auto"
                        />
                      )}
                    </Field>
                    <button
                      type="button"
                      onClick={() => {
                        setShowEndTime(false);
                        setInput(form, { path: ["endTime"] as const, input: "" });
                      }}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Remove end time"
                    >
                      <X className="size-4" />
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowEndTime(true)}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Clock className="size-3.5" />
                    Add end time
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setShowTime(false);
                    setShowEndTime(false);
                    setInput(form, { path: ["startTime"] as const, input: "" });
                    setInput(form, { path: ["endTime"] as const, input: "" });
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Remove time"
                >
                  <X className="size-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowTime(true)}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Clock className="size-3.5" />
                Add time
              </button>
            )}
          </div>

          <Field of={form} path={["location"]}>
            {(field) => (
              <div className="space-y-1.5">
                <Label htmlFor="location">
                  Venue name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="location"
                  placeholder="e.g. Javits Center"
                  {...field.props}
                  value={field.input ?? ""}
                />
                {field.errors && <p className="text-xs text-destructive">{field.errors[0]}</p>}
              </div>
            )}
          </Field>

          <Field of={form} path={["address"]}>
            {(field) => (
              <div className="space-y-1.5">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="e.g. 429 11th Ave, New York, NY 10001"
                  {...field.props}
                  value={field.input ?? ""}
                />
                {field.errors && <p className="text-xs text-destructive">{field.errors[0]}</p>}
              </div>
            )}
          </Field>

          <Field of={form} path={["websiteUrl"]}>
            {(field) => (
              <div className="space-y-1.5">
                <Label htmlFor="websiteUrl">Website</Label>
                <Input
                  id="websiteUrl"
                  type="url"
                  placeholder="https://..."
                  {...field.props}
                  value={field.input ?? ""}
                />
                {field.errors && <p className="text-xs text-destructive">{field.errors[0]}</p>}
              </div>
            )}
          </Field>

          <Field of={form} path={["description"]}>
            {(field) => (
              <div className="space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Tell us more about the event..."
                  rows={5}
                  {...field.props}
                  value={field.input ?? ""}
                />
                {field.errors && <p className="text-xs text-destructive">{field.errors[0]}</p>}
              </div>
            )}
          </Field>

          <div className="space-y-1.5">
            <Label>Event image</Label>
            <ImageUploader value={imageData} onChange={setImageData} />
          </div>

          {mutation.data?.error && (
            <p className="text-sm text-destructive">Something went wrong. Please try again.</p>
          )}

          <Button type="submit" disabled={mutation.isPending} className="w-full sm:w-auto">
            {mutation.isPending ? "Submitting…" : "Submit event"}
          </Button>
        </div>
      </Form>
    </main>
  );
}
