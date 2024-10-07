"use client";

import React, { PropsWithChildren, useState } from "react";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import {
  CreateEventSchema,
  UpdateEventSchema,
  type CreateEventInput,
  type UpdateEventInput,
} from "@/lib/validators";
import { EventWithDate } from "@/lib/types";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { XCircleIcon } from "lucide-react";
import { Button } from "./ui/button";
import { updateEventAction } from "@/actions/update-event-action";
import { submitEventAction } from "@/actions/submit-event-action";
import { useRouter } from "next/navigation";

type EventFormProps = PropsWithChildren<{
  defaultEvent?: EventWithDate;
}>;

export const EventForm = ({ children, defaultEvent }: EventFormProps) => {
  const FormSchema = defaultEvent ? UpdateEventSchema : CreateEventSchema;
  const action = defaultEvent ? updateEventAction : submitEventAction;
  const router = useRouter();

  const form = useForm<CreateEventInput | UpdateEventInput>({
    resolver: valibotResolver(FormSchema),
    defaultValues: {
      title: defaultEvent?.title ? defaultEvent.title : "",
      source: defaultEvent?.source ? defaultEvent.source : "",
      image: defaultEvent?.image ? defaultEvent.image : "",
      description: defaultEvent?.description ? defaultEvent.description : "",
      dates: defaultEvent?.eventDates.map((date) => date.date) ?? [],
      eventId: defaultEvent?.eventId,
      contact: defaultEvent?.contact ? defaultEvent.contact : "",
    },
  });

  const { handleSubmit, formState, setValue, register, watch } = form;
  const watchDates = watch("dates");

  const handleRemoveDate = (index: number) => {
    setValue(
      "dates",
      watchDates.filter((_, i) => i !== index)
    );
  };

  const handleAddDate = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(evt.target.value);

    if (watchDates.some((d) => new Date(d).getTime() === date.getTime())) {
      return;
    }

    const newDates = [...watchDates, date].sort((a, b) => {
      return new Date(a).getTime() - new Date(b).getTime();
    });

    setValue("dates", newDates);
    evt.target.value = "";
  };

  const submit = async (values: CreateEventInput | UpdateEventInput) => {
    if (!action) return;

    const { data, error } = await action(values);

    if (error) {
      console.log("error", error);
    } else {
      if (defaultEvent) {
        document.getElementById("closeEditEventDialogBtn")?.click();
      } else {
        router.push("/events/new/success");
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Title <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="source"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Source <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {defaultEvent ? (
          <input type="hidden" {...register("eventId")} />
        ) : (
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Contact <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  For internal use only. This will not be displayed.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="dates"
          render={({ field: { value, onChange, ...rest } }) => (
            <FormItem>
              <FormLabel>Dates</FormLabel>
              <FormControl>
                <Input type="date" onChange={handleAddDate} {...rest} />
              </FormControl>
              <div className="h-1" />
              <div className="flex gap-1 flex-wrap">
                {value.map((date, index) => (
                  <Badge key={index} className="flex-row-reverse">
                    <button
                      type="button"
                      className="ml-2 peer text-destructive"
                      onClick={() => handleRemoveDate(index)}
                    >
                      <XCircleIcon size={16} />
                    </button>
                    <span className="peer-hover:line-through">
                      {formatDate(date instanceof Date ? date : new Date(date))}
                    </span>
                  </Badge>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4 mt-2">
          <Button
            type="submit"
            className="flex-1"
            disabled={formState.isSubmitting}
          >
            {defaultEvent ? "Update" : "Submit"}
          </Button>
          {children && <div className="flex-1">{children}</div>}
        </div>
      </form>
    </Form>
  );
};
