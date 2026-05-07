export const categoryLabel: Record<string, string> = {
  CONVENTION: "Convention",
  SCREENING: "Screening",
  MEETUP: "Meetup",
  SALE: "Sale",
  PERFORMANCE: "Performance",
  OTHER: "Other",
};

export const HIDDEN_CATEGORIES = new Set(["MEETUP", "SALE"]);

export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return m === 0 ? `${h12} ${period}` : `${h12}:${String(m).padStart(2, "0")} ${period}`;
}

// Compact numeric format for cards: "5/6", "5/6–5/9", "5/6, 5/8–5/10, 6/2"
// Consecutive dates are merged into ranges. Year suffix added only when needed.
export function formatEventDates(
  dates: Array<{ date: Date }>,
  currentYear = new Date().getFullYear()
): string {
  if (!dates.length) return "";

  const sorted = [...dates].map((d) => d.date).sort((a, b) => a.getTime() - b.getTime());
  const needsYear = sorted.some((d) => d.getUTCFullYear() !== currentYear);

  const fmt = (d: Date) => {
    const base = `${d.getUTCMonth() + 1}/${d.getUTCDate()}`;
    return needsYear ? `${base}/${String(d.getUTCFullYear()).slice(2)}` : base;
  };

  const ranges: [Date, Date][] = [];
  let s = sorted[0], e = sorted[0];
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i].getTime() - sorted[i - 1].getTime() <= 25 * 3_600_000) {
      e = sorted[i];
    } else {
      ranges.push([s, e]);
      s = e = sorted[i];
    }
  }
  ranges.push([s, e]);

  return ranges
    .map(([s, e]) => (s.getTime() === e.getTime() ? fmt(s) : `${fmt(s)}–${fmt(e)}`))
    .join(", ");
}

// Long format for the event detail page.
// Single date: "Saturday, May 6, 2026" + optional time
// Multiple dates: compact + optional time
export function formatEventDatesFull(
  dates: Array<{ date: Date }>,
  startTime?: string | null,
  endTime?: string | null
): string {
  if (!dates.length) return "";

  const sorted = [...dates].sort((a, b) => a.date.getTime() - b.date.getTime());

  let dateStr: string;
  if (sorted.length === 1) {
    dateStr = sorted[0].date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
  } else {
    dateStr = formatEventDates(sorted);
  }

  if (!startTime) return dateStr;

  const [sh] = startTime.split(":").map(Number);
  let timeStr = formatTime(startTime);
  if (endTime) {
    const [eh] = endTime.split(":").map(Number);
    timeStr += ` – ${formatTime(endTime)}${eh < sh ? " (next day)" : ""}`;
  }

  return `${dateStr}, ${timeStr}`;
}
