import { headers } from "next/headers";
import { faker } from "@faker-js/faker";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { EventCategory, EventStatus, UserRole } from "@/generated/prisma/client";

const CATEGORIES = Object.values(EventCategory);
const NYC_VENUES = [
  { location: "Javits Center", address: "429 11th Ave, New York, NY 10001" },
  { location: "Brooklyn Expo Center", address: "72 Noble St, Brooklyn, NY 11222" },
  { location: "Penn Plaza Pavilion", address: "401 7th Ave, New York, NY 10001" },
  { location: "Midtown Comics", address: "200 W 40th St, New York, NY 10018" },
  { location: "Anime Jungle", address: "36 W 32nd St, New York, NY 10001" },
  { location: "Japan Village", address: "934 3rd Ave, Brooklyn, NY 11232" },
  { location: "SVA Theatre", address: "333 W 23rd St, New York, NY 10011" },
  { location: "Alamo Drafthouse Brooklyn", address: "445 Albee Square W, Brooklyn, NY 11201" },
];

const ANIME_EVENT_TITLES = [
  "AnimeNYC Fan Meetup",
  "Shonen Showdown at the Expo",
  "Isekai Immersion Convention",
  "Manga Swap Meet",
  "Voice Actor Spotlight Panel",
  "Cosplay Runway Competition",
  "Studio Ghibli Film Marathon",
  "NYC Otaku Market",
  "Attack on Titan Screening Night",
  "Dragon Ball Super Tournament Watch Party",
  "Demon Slayer Art Exhibition",
  "Jujutsu Kaisen Fan Convention",
  "One Piece Anniversary Celebration",
  "Sailor Moon Tribute Night",
  "Naruto Legacy Panel Discussion",
  "Bleach Thousand-Year Blood War Screening",
  "Hunter x Hunter Rewatch Club",
  "Chainsaw Man Premiere Party",
  "Spy x Family Family Fun Night",
  "Dungeon Meshi Food & Anime Festival",
];

const TIMES = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];
const DURATIONS = [1, 2, 3, 4]; // hours

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replaceAll(/[^\w\s-]/g, "")
    .replaceAll(/[\s_-]+/g, "-")
    .replaceAll(/^-+|-+$/g, "");
}

function addHours(hhmm: string, hours: number): string {
  const [h, m] = hhmm.split(":").map(Number);
  const total = h + hours;
  return `${String(total % 24).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function dateOnly(d: Date): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

function addDays(d: Date, n: number): Date {
  return new Date(d.getTime() + n * 86_400_000);
}

export async function GET(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session?.user.role !== UserRole.ADMIN) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const empty = new URL(request.url).searchParams.get("empty") === "true";

  const result = await prisma.$transaction(async (tx) => {
    if (empty) await tx.event.deleteMany();
    const count = await tx.event.count();
    if (count > 0) return null;

    const events = await Promise.all(
      ANIME_EVENT_TITLES.map((title, index) => {
        const slug = `${slugify(title)}-${faker.string.nanoid(6).toLowerCase()}`;
        const venue = faker.helpers.arrayElement(NYC_VENUES);
        const category = faker.helpers.arrayElement(CATEGORIES);

        const firstDate = dateOnly(
          faker.date.between({ from: new Date(), to: new Date(Date.now() + 180 * 86_400_000) })
        );

        // ~40% of events span multiple days (2–4)
        const spanDays = faker.datatype.boolean(0.4)
          ? faker.number.int({ min: 2, max: 4 })
          : 1;

        const dates = Array.from({ length: spanDays }, (_, i) => ({
          date: addDays(firstDate, i),
        }));

        // ~60% have a start time
        const hasTime = faker.datatype.boolean(0.6);
        const startTime = hasTime ? faker.helpers.arrayElement(TIMES) : null;
        // ~50% of timed events also have an end time
        const endTime =
          hasTime && faker.datatype.boolean(0.5)
            ? addHours(startTime!, faker.helpers.arrayElement(DURATIONS))
            : null;

        return tx.event.create({
          data: {
            title,
            slug,
            description: faker.lorem.paragraphs({ min: 1, max: 3 }, "\n\n"),
            startDate: firstDate,
            startTime,
            endTime,
            location: venue.location,
            address: venue.address,
            websiteUrl: faker.internet.url(),
            category,
            status: EventStatus.APPROVED,
            featured: index < 4,
            dates: { create: dates },
          },
        });
      })
    );

    return events.length;
  });

  if (result === null) {
    const count = await prisma.event.count();
    return Response.json(
      { error: `Seed aborted — ${count} event(s) already exist in the database.` },
      { status: 409 }
    );
  }

  return Response.json({ seeded: result });
}
