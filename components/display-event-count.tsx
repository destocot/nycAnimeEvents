import { getEventCount } from "@/queries/events";
import { Button } from "@/components/ui/button";

export const DisplayEventCount = async () => {
  const eventCount = await getEventCount();

  return (
    <Button
      size="sm"
      variant="ghost"
      className="gap-1 animate-pulse text-xs duration-[4000]"
    >
      {eventCount} <span>Events</span>
    </Button>
  );
};
