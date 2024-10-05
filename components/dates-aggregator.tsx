import { EventWithDate } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export const DatesAggregator = ({
  dates,
}: {
  dates: EventWithDate["eventDates"];
}) => {
  let isSequential = true;

  for (let i = 0; i < dates.length - 1; i++) {
    const current = new Date(dates[i].date);
    const next = new Date(dates[i + 1].date);

    const timeDiff = next.getTime() - current.getTime();
    const dayDiff = timeDiff / (1000 * 60 * 60 * 24);

    if (dayDiff !== 1) {
      isSequential = false;
      break;
    }
  }

  if (isSequential && dates.length > 1) {
    return (
      <p className="text-xs text-muted-foreground mb-1 line-clamp-4">
        {formatDate(dates[0].date)}
        {" - "}
        {formatDate(dates[dates.length - 1].date)}
      </p>
    );
  }

  return (
    <p className="text-xs text-muted-foreground mb-1 line-clamp-4">
      {dates.map((date) => formatDate(date.date)).join(", ")}
    </p>
  );
};
