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
  {
    title: "Howl’s Moving Castle (Studio Ghibli 2024)",
    date: Array.from({ length: 8 }, (_, i) => {
      const date = new Date("2024-09-26");
      date.setDate(date.getDate() + i);
      return date;
    }),
    description:
      "That jumbled piece of architecture, that cacophony of hissing steam and creaking joints, with smoke billowing from it as it moves on its own... That castle is home to the magnificent wizard Howl, infamous for both his magical prowess and for being a womanizer—or so the rumor goes in Sophie Hatter's small town. Sophie, as the plain daughter of a hatmaker, does not expect much from her future and is content with working hard in the shop.",
    image:
      "https://yattatachi.com/wp-content/uploads/2021/06/howls-moving-castle-movie-poster.jpg",
    href: "https://www.jdoqocy.com/click-9117960-10369449?url=https%3A%2F%2Fwww.fandango.com%2Fhowls-moving-castle-20th-anniversary-studio-ghibli-fest-2024-235295%2Fmovie-overview",
  },

  {
    title: "Look Back",
    date: Array.from({ length: 8 }, (_, i) => {
      const date = new Date("2024-10-03");
      date.setDate(date.getDate() + i);
      return date;
    }),
    description:
      "Fourth-grader Ayumu Fujino regularly draws four-panel manga for her school newspaper and is lauded as having the best artwork in her class. One day, she is asked by her teacher to turn over one of her manga slots in the school newspaper to a truant student named Kyomoto. When Kyomoto's manga pops up alongside Fujino's, it receives high praises for its detailed artwork, making Fujino furiously jealous.",
    image:
      "https://yattatachi.com/wp-content/uploads/2024/08/Look-Back-Gkids-Poster-551x768.jpg",
    href: "https://www.fandango.com/look-back-2024-237527/movie-overview",
  },
  {
    title: "Bocchi the Rock! Recap Part 1",
    date: [
      new Date("2024-10-06"),
      new Date("2024-10-07"),
      new Date("2024-10-08"),
    ],
    description:
      'BOCCHI THE ROCK! tells the story of young rocker Hitori Gotoh, also known as "Bocchi-chan," a middle schooler struggling with social anxiety. Amid her silence and solitude, she picks up a guitar and discovers that she is talented, but despite spending hours practicing and uploading popular videos of herself performing, her dreams of joining a band and making friends never materialize.',
    image:
      "https://yattatachi.com/wp-content/uploads/2024/06/bocchi-the-rock-recap-poster-518x768.webp",
    href: "https://www.fandango.com/bocchi-the-rock-2024-237886/movie-overview",
  },
  {
    title: "Bocchi the Rock! Recap Part 2",
    date: [
      new Date("2024-10-06"),
      new Date("2024-10-07"),
      new Date("2024-10-08"),
    ],
    description:
      'BOCCHI THE ROCK! tells the story of young rocker Hitori Gotoh, also known as "Bocchi-chan," a middle schooler struggling with social anxiety. Amid her silence and solitude, she picks up a guitar and discovers that she is talented, but despite spending hours practicing and uploading popular videos of herself performing, her dreams of joining a band and making friends never materialize.',
    image:
      "https://yattatachi.com/wp-content/uploads/2024/06/bocchi-the-rock-recap-poster-518x768.webp",
    href: "https://www.fandango.com/bocchi-the-rock-2024-237886/movie-overview",
  },
  {
    title: "My Hero Academia: You’re Next",
    date: [new Date("2024-10-11")],
    description: "The fourth Boku no Hero Academia movie.",
    image:
      "https://yattatachi.com/wp-content/uploads/2024/07/mha-youre-next-547x768.jpg",
    href: "https://comicbook.com/anime/news/my-hero-academia-youre-next-release-date/",
  },
  {
    title: "Kiki’s Delivery Service (Studio Ghibli Fest 2024)",
    date: [
      new Date("2024-10-26"),
      new Date("2024-10-27"),
      new Date("2024-10-28"),
      new Date("2024-10-29"),
      new Date("2024-10-30"),
    ],
    description:
      "Kiki, a 13-year-old witch-in-training, must spend a year living on her own in a distant town in order to become a full-fledged witch. Leaving her family and friends, Kiki undertakes this tradition when she flies out into the open world atop her broomstick with her black cat Jiji.",
    image:
      "https://yattatachi.com/wp-content/uploads/2019/02/kiki-delivery-service-poster-547x768.jpg",
    href: "https://www.dpbolvw.net/click-9117960-10369449?url=https%3A%2F%2Fwww.fandango.com%2Fkikis-delivery-service-35th-anniversary-studio-ghibli-fest-2024-235296%2Fmovie-overview",
  },
  {
    title: "Metropolis",
    date: [
      new Date("2024-11-04"),
      new Date("2024-11-07"),
      new Date("2024-11-10"),
    ],
    description:
      "In the great city of Metropolis, severe community structures and prejudice dominate a world where humans and robots live together. Unrest and violence increase with each new day.",
    image:
      "https://yattatachi.com/wp-content/uploads/2024/07/Metropolis-poster-545x768.jpg",
    href: "https://www.iconicreleasing.com/ax-cinema-nights/",
  },
  {
    title: "Dragon Ball DAIMA",
    date: [
      new Date("2024-11-10"),
      new Date("2024-11-11"),
      new Date("2024-11-12"),
    ],
    description: "New Dragon Ball series.",
    image:
      "https://yattatachi.com/wp-content/uploads/2024/09/Dragon-Ball-DAIMA-519x768.jpg",
    href: "https://www.fandango.com/dragon-ball-daima-237884/movie-overview",
  },
  {
    title: "Pom Poko – 30th Anniversary (Studio Ghibli Fest 2024)",
    date: [new Date("2024-11-24"), new Date("2024-11-26")],
    description:
      'With the increasing need for Tokyo to expand as one of Japan\'s major cities, inevitable sacrifices must be made so that changes can take place. One of these sacrifices is that the room for nature and wildlife to flourish will decrease significantly over time. As this decline continues, many animal communities experience the brunt of urbanization. One such community known as the "Tanuki," a type of magical shape-shifting mammal, is caught up in a struggle to defend their beloved forest from being absorbed by the looming threat of an expanding Tokyo.',
    image:
      "https://yattatachi.com/wp-content/uploads/2022/01/Pom_Poko-poster.jpg",
    href: "https://www.kqzyfj.com/click-9117960-10369449?url=https%3A%2F%2Fwww.fandango.com%2Fpom-poko-30th-anniversary-studio-ghibli-fest-2024-235297%2Fmovie-overview",
  },
  {
    title: "The Tale of Princess Kaguya (Studio Ghibli Fest 2024)",
    date: [new Date("2024-11-25"), new Date("2024-11-27")],
    description:
      "Deep in the countryside, a man named Okina works as a bamboo cutter in a forest, chopping away at the hollow plants day after day. One day, he discovers a small baby inside a glowing shoot. He immediately takes her home, convinced that she is a princess sent to Earth as a divine blessing from heaven. Okina and his wife Ouna take it upon themselves to raise the infant as their own, watching over her as she quickly grows into an energetic young girl. Given the name Kaguya, she fits right in with the village she has come to call home, going on adventures with the other children and enjoying what youth has to offer.",
    image:
      "https://yattatachi.com/wp-content/uploads/2024/03/The_Tale_of_the_Princess_Kaguya-512x768.webp",
    href: "https://www.jdoqocy.com/click-9117960-10369449?url=https%3A%2F%2Fwww.fandango.com%2Fthe-tale-of-the-princess-kaguya-studio-ghibli-fest-2024-235298%2Fmovie-overview",
  },
  {
    title: "My Neighbor Totoro (Studio Ghibli Fest 2024)",
    date: [
      new Date("2024-12-07"),
      new Date("2024-12-08"),
      new Date("2024-12-09"),
      new Date("2024-12-10"),
      new Date("2024-12-11"),
    ],
    description:
      'In 1950s Japan, Tatsuo Kusakabe relocates himself and his two daughters, Satsuki and Mei, to the countryside to be closer to their mother, who is hospitalized due to long-term illness. As the girls grow acquainted with rural life, Mei encounters a small, bunny-like creature in the yard one day. Chasing it into the forest, she finds "Totoro"—a giant, mystical forest spirit whom she soon befriends. Before long, Satsuki too meets Totoro, and the two girls suddenly find their lives filled with magical adventures in nature and fantastical creatures of the woods.',
    image:
      "https://yattatachi.com/wp-content/uploads/2019/02/My-Neighbor-Totoro-poster-508x768.jpg",
    href: "https://www.kqzyfj.com/click-9117960-10369449?url=https%3A%2F%2Fwww.fandango.com%2Fmy-neighbor-totoro-studio-ghibli-fest-2024-235299%2Fmovie-overview",
  },
  {
    title: "Babymetal Legend-43 Concert Film",
    date: [new Date("2024-12-11"), new Date("2024-12-15")],
    description:
      "BABYMETAL WORLD TOUR 2023 - 2024 TOUR FINAL IN JAPAN LEGEND - 43 was a two-day concert held by BABYMETAL at the Okinawa Convention Center Exhibition Hall on March 23 and 24, 2024.",
    image:
      "https://yattatachi.com/wp-content/uploads/2024/07/babymetal-film.jpg",
    href: "#",
  },
  /* {
    title: "AXCN: Mobile Suit Gundam III: Encounters in Space",
    date: [new Date("2024-10-23"), new Date("2024-10-27")],
    description:
      "Having officially been inducted into the Federation Forces as the 13th Independent Unit, the White Base enters the neutral colony Side 6 to serve as a decoy. There Amuro reunites with his father Tem, and meets a mysterious girl named Lalah Sune.",
    image:
      "https://d2alu56i91c6gw.cloudfront.net/iconicreleasing/GUNDAM3_720x1015_A1.jpg",
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
  {
    title: "AXCN: Mobile Suit Gundam III: Encounters in Space",
    date: [new Date("2024-10-23"), new Date("2024-10-27")],
    description:
      "Having officially been inducted into the Federation Forces as the 13th Independent Unit, the White Base enters the neutral colony Side 6 to serve as a decoy. There Amuro reunites with his father Tem, and meets a mysterious girl named Lalah Sune.",
    image:
      "https://d2alu56i91c6gw.cloudfront.net/iconicreleasing/GUNDAM3_720x1015_A1.jpg",
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
  */
];

// filter if date.at(-1) is before today

const today = new Date();
const filteredEvents = events.filter((event) => {
  const isBeforeToday = event.date[event.date.length - 1] < today;

  if (isBeforeToday) {
    console.log(`Filtered out event: ${event.title}`);
  }

  return !isBeforeToday;
});

filteredEvents.sort((a, b) => a.date[0].getTime() - b.date[0].getTime());

const HomePage = () => {
  return <EventList events={filteredEvents} />;
};

export default HomePage;
