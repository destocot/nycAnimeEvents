"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminEventCard } from "@/components/admin-event-card";
import type { EventWithDates } from "@/resources/events/queries";

type Props = {
  pending: EventWithDates[];
  approved: EventWithDates[];
  rejected: EventWithDates[];
};

const EmptyState = ({ label }: { label: string }) => (
  <div className="py-16 text-center text-muted-foreground text-sm">{label}</div>
);

export const AdminEventTabs = ({ pending, approved, rejected }: Props) => {
  return (
    <Tabs defaultValue="pending" className="w-full">
      <TabsList>
        <TabsTrigger value="pending">
          Pending
          {pending.length > 0 && (
            <span className="ml-1.5 text-xs bg-primary text-primary-foreground rounded-full px-1.5 py-0.5 leading-none">
              {pending.length}
            </span>
          )}
        </TabsTrigger>
        <TabsTrigger value="approved">Approved</TabsTrigger>
        <TabsTrigger value="rejected">Rejected</TabsTrigger>
      </TabsList>

      <TabsContent value="pending" className="mt-6 space-y-4">
        {pending.length === 0 ? (
          <EmptyState label="No pending submissions — you're all caught up." />
        ) : (
          pending.map((event) => <AdminEventCard key={event.id} event={event} />)
        )}
      </TabsContent>

      <TabsContent value="approved" className="mt-6 space-y-4">
        {approved.length === 0 ? (
          <EmptyState label="No approved events yet." />
        ) : (
          approved.map((event) => <AdminEventCard key={event.id} event={event} />)
        )}
      </TabsContent>

      <TabsContent value="rejected" className="mt-6 space-y-4">
        {rejected.length === 0 ? (
          <EmptyState label="No rejected events." />
        ) : (
          rejected.map((event) => <AdminEventCard key={event.id} event={event} />)
        )}
      </TabsContent>
    </Tabs>
  );
};
