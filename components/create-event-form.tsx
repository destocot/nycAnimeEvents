"use client";

import { createEvent } from "@/lib/actions";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import { XIcon } from "lucide-react";
import Link from "next/link";

export const CreateEventForm = () => {
  const [dates, setDates] = useState<Array<Date>>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  if (isSuccess) {
    return (
      <div className="flex flex-col max-w-sm">
        Event is added to the queue and must be approved.
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <form
      action={async (formData) => {
        dates.forEach((date) => {
          formData.append("dates", date.toISOString());
        });

        // const { success } = await createEvent(formData);

        // console.log(success);
        // if (success) setIsSuccess(true);
      }}
      className="space-y-4 max-w-sm"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="py-2 px-4 rounded bg-background/20 ring ring-muted"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="source" className="text-sm font-medium">
          Source
        </label>
        <input
          type="text"
          id="source"
          name="source"
          className="py-2 px-4 rounded bg-background/20 ring ring-muted"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="image" className="text-sm font-medium">
          Image
        </label>
        <input
          type="text"
          id="image"
          name="image"
          className="py-2 px-4 rounded bg-background/20 ring ring-muted"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="py-2 px-4 rounded bg-background/20 ring ring-muted resize-none"
        ></textarea>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact" className="text-sm font-medium">
          Contact
        </label>
        <input
          type="text"
          id="contact"
          name="contact"
          className="py-2 px-4 rounded bg-background/20 ring ring-muted"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="dates" className="text-sm font-medium">
          Dates
        </label>
        <input
          type="date"
          id="dates"
          className="py-2 px-4 rounded bg-background/20 ring ring-muted"
          onChange={(event) => {
            const date = new Date(event.target.value);
            setDates((prevDates) => [...prevDates, date]);
          }}
        />
        <ul className="flex gap-1 flex-wrap">
          {dates.map((date) => (
            <li
              key={date.toISOString()}
              className="px-3 py-1.5 rounded-full text-xs shadow border flex items-center bg-primary text-secondary dark:"
            >
              {date.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                timeZone: "UTC",
              })}
              <button
                className="ml-2"
                onClick={() => {
                  setDates((prevDates) =>
                    prevDates.filter((prevDate) => prevDate !== date)
                  );
                }}
              >
                <XIcon size={16} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <CreateEventFormSubmitButton />
    </form>
  );
};

const CreateEventFormSubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      Create Event
    </Button>
  );
};
