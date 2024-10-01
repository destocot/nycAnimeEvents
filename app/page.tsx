import { EventList } from "@/components/event-list";
import React from "react";

const events = [
  {
    title: "AXCN: Mobile Suit Gundam",
    date: [new Date("2024-10-02"), new Date("2024-10-06")],
    description:
      "In Universal Century year 0078, the space colony Side 3 declares itself the Principality of Zeon and launches a war of independence against the Earth Federation. Eight months have passed since the war entered into a deadlock.",
    image:
      "https://d2alu56i91c6gw.cloudfront.net/iconicreleasing/MSG1_720x1015_A1.jpg",
    href: "https://www.iconicreleasing.com/events/mobile-suit-gundam/tickets/",
  },
  {
    title: "Yu-Gi-Oh! Day",
    date: [new Date("2024-10-05")],
    description:
      "Join us 12:00–6:00 p.m. for a celebration of the global phenomenon Yu-Gi-Oh! with a day of can’t-miss events for fans and newcomers alike!",
    image:
      "https://movingimage.org/wp-content/uploads/2024/08/Yu-Gi-Oh-web-1600x900-1.png",
    href: "https://movingimage.org/event/yu-gi-oh-day/",
  },
  {
    title: "Kinokuniya Pop-Up Retail",
    date: Array.from({ length: 23 }, (_, i) => {
      const date = new Date("2024-10-04");
      date.setDate(date.getDate() + i);
      return date.getDay() === 5 || date.getDay() === 6 || date.getDay() === 0
        ? date
        : null;
    }).filter(Boolean) as Array<Date>,
    description:
      "Every Fri-Sun 1 P.M.-8 P.M. Our partners from Kinokuniya will set up shop in Kodansha House with manga volumes and exclusive Kodansha House goods for sale!",
    image:
      "https://imagedelivery.net/gbfTL37HXewiIoqsZv9WzQ/3c3e99ee-716c-4a1e-faa6-2c7cc83e4d00/public",
    href: "https://kodansha.us/manga-meets/#events",
  },
  {
    title: "Manga Movie Night: Akira",
    date: [new Date("2024-10-05")],
    description:
      "6:30 P.M. Welcome to Manga Movie Night: Akira! Join us in our mezanine screening room for this exclusive viewing of the iconic anime motion picture based on Katsuhiro Otomo's epic manga.",
    image:
      "https://imagedelivery.net/gbfTL37HXewiIoqsZv9WzQ/98daad86-cf64-4735-5291-9c1b1d858d00/public",
    href: "https://kodansha.us/manga-meets/#events",
  },
  {
    title: '"Toast of Tardiness" Challenge',
    date: [new Date("2024-10-06")],
    description:
      "3 P.M. A manga-themed scavenger hunt from Midtown Manhattan to Kodansha House!",
    image:
      "https://imagedelivery.net/gbfTL37HXewiIoqsZv9WzQ/78e95134-6954-4428-3c56-acb370767a00/public",
    href: "https://kodansha.us/manga-meets/#events",
  },
  {
    title: "AXCN: Mobile Suit Gundam II: Soldiers of Sorrow",
    date: [new Date("2024-10-16"), new Date("2024-10-20")],
    description:
      "With evacuees from Side 7 onboard, the White Base crosses the Pacific Ocean and heads west towards the continent of Eurasia. Amidst that journey filled with battle, Amuro has a fight with Bright and runs away, suffering from the deaths of Matilda, who he had feelings for, and Ryu, who was like a big brother to him.",
    image:
      "https://d2alu56i91c6gw.cloudfront.net/iconicreleasing/GUNDAM2_720x1015_A1.jpg",
    href: "https://www.iconicreleasing.com/events/mobile-suit-gundam-2/tickets/",
  },
  {
    title: "AXCN: Mobile Suit Gundam III: Encounters in Space",
    date: [new Date("2024-10-23"), new Date("2024-10-27")],
    description:
      "Having officially been inducted into the Federation Forces as the 13th Independent Unit, the White Base enters the neutral colony Side 6 to serve as a decoy. There Amuro reunites with his father Tem, and meets a mysterious girl named Lalah Sune.",
    image:
      "https://d2alu56i91c6gw.cloudfront.net/iconicreleasing/GUNDAM3_720x1015_A1.jpg",
    href: "https://www.iconicreleasing.com/events/mobile-suit-gundam-2/tickets/",
  },
];

// filter if date.at(-1) is before today

const today = new Date();
const filteredEvents = events.filter((event) => {
  const isAfterToday = event.date[event.date.length - 1] > today;

  if (!isAfterToday) {
    console.log(`Filtered out event: ${event.title}`);
  }

  return isAfterToday;
});

filteredEvents.sort((a, b) => a.date[0].getTime() - b.date[0].getTime());

const HomePage = () => {
  return <EventList events={filteredEvents} />;
};

export default HomePage;
