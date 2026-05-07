export type ParsedDate = { date: string }; // YYYY-MM-DD

export type ParseResult = { dates: ParsedDate[] };

const MONTH_MAP: Record<string, number> = {
  jan: 1, january: 1, feb: 2, february: 2, mar: 3, march: 3,
  apr: 4, april: 4, may: 5, jun: 6, june: 6, jul: 7, july: 7,
  aug: 8, august: 8, sep: 9, sept: 9, september: 9,
  oct: 10, october: 10, nov: 11, november: 11, dec: 12, december: 12,
};

const MONTH_RE =
  "Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?";

function monthN(name: string): number {
  return MONTH_MAP[name.toLowerCase()] ?? 0;
}

function iso(y: number, mo: number, d: number): string {
  return `${y}-${String(mo).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function daysIn(y: number, mo: number): number {
  return new Date(y, mo, 0).getDate();
}

function expand(y1: number, m1: number, d1: number, y2: number, m2: number, d2: number): string[] {
  const out: string[] = [];
  let [y, mo, d] = [y1, m1, d1];
  for (let i = 0; i < 400; i++) {
    out.push(iso(y, mo, d));
    if (y === y2 && mo === m2 && d === d2) break;
    if (++d > daysIn(y, mo)) { d = 1; if (++mo > 12) { mo = 1; y++; } }
  }
  return out;
}

function parseSegment(text: string, year: number): string[] {
  const s = text.trim();
  if (!s) return [];
  const MO = MONTH_RE;
  let m: RegExpExecArray | null;

  // Cross-month range: May 30 – June 2
  m = new RegExp(`(${MO})\\s+(\\d{1,2})\\s*[-–]\\s*(${MO})\\s+(\\d{1,2})`, "i").exec(s);
  if (m) {
    const [sm, sd, em, ed] = [monthN(m[1]), parseInt(m[2]), monthN(m[3]), parseInt(m[4])];
    if (sm && em) return expand(year, sm, sd, em < sm ? year + 1 : year, em, ed);
  }

  // Same-month range: May 6–9
  m = new RegExp(`(${MO})\\s+(\\d{1,2})\\s*[-–]\\s*(\\d{1,2})`, "i").exec(s);
  if (m) {
    const [mo, sd, ed] = [monthN(m[1]), parseInt(m[2]), parseInt(m[3])];
    if (mo) return expand(year, mo, sd, year, mo, ed);
  }

  // Single date: May 6
  m = new RegExp(`(${MO})\\s+(\\d{1,2})`, "i").exec(s);
  if (m) {
    const mo = monthN(m[1]);
    if (mo) return [iso(year, mo, parseInt(m[2]))];
  }

  return [];
}

export function parseSchedule(input: string, year?: number): ParseResult {
  const y = year ?? new Date().getFullYear();
  if (!input.trim()) return { dates: [] };

  const seen = new Set<string>();
  const dates: ParsedDate[] = [];

  for (const seg of input.split(",").map((s) => s.trim()).filter(Boolean)) {
    for (const date of parseSegment(seg, y)) {
      if (!seen.has(date)) {
        seen.add(date);
        dates.push({ date });
      }
    }
  }

  return { dates: dates.sort((a, b) => (a.date < b.date ? -1 : 1)) };
}
