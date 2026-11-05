import type { Photo } from "@/components/PhotoGrid";

export type Flag = "uk" | "fr" | "de";

export interface Trip {
  id: string;
  country: string;
  flag: Flag;
  when: string;
  // Short tag on the stamp, e.g. "Home base".
  tag?: string;
  places: string[];
  // A few sentences. Cards hide this until it's written.
  story?: string;
  // Under /images/travel/<trip id>/, resized to 1600px on the long side with
  // metadata (including location) stripped.
  photos: Photo[];
}

// Newest first.
export const trips: Trip[] = [
  {
    id: "uk",
    country: "United Kingdom",
    flag: "uk",
    when: "2024 – now",
    tag: "Home base",
    places: ["Birmingham", "Edinburgh"],
    story:
      "Home since my MSc in Birmingham in 2024. In March 2026 I went up to Edinburgh to see the castle.",
    photos: [
      {
        src: "/images/travel/uk/edinburgh.jpg",
        alt: "Hien smiling in front of the gatehouse of Edinburgh Castle on a grey day",
        caption: "Edinburgh Castle · Mar 2026",
      },
    ],
  },
  {
    id: "france",
    country: "France",
    flag: "fr",
    when: "Apr 2025",
    places: ["Paris"],
    story:
      "Paris, after Berlin: the Eiffel Tower lit up over the Seine at night, and the Louvre pyramid on a sunny afternoon.",
    photos: [
      {
        src: "/images/travel/france/paris-1.jpg",
        alt: "Hien at night by the Seine, with the Eiffel Tower lit up in gold behind him",
        caption: "The Eiffel Tower at night",
      },
      {
        src: "/images/travel/france/paris-2.jpg",
        alt: "Hien standing in front of the glass pyramid at the Louvre under a blue sky",
        caption: "The Louvre pyramid",
      },
    ],
  },
  {
    id: "germany",
    country: "Germany",
    flag: "de",
    when: "Apr 2025",
    places: ["Berlin"],
    story:
      "A spring trip that started in Berlin: the lions at the zoo, the World Clock at Alexanderplatz and the Brandenburg Gate under a grey sky.",
    photos: [
      {
        src: "/images/travel/germany/berlin-1.jpg",
        alt: "Hien smiling in front of the lion enclosure at Berlin Zoo, with two lions behind him",
        caption: "Berlin Zoo",
      },
      {
        src: "/images/travel/germany/berlin-2.jpg",
        alt: "The World Clock at Alexanderplatz, with the Berlin TV Tower behind it",
        caption: "World Clock, Alexanderplatz",
      },
      {
        src: "/images/travel/germany/berlin-3.jpg",
        alt: "The Brandenburg Gate seen from below, with the quadriga on top",
        caption: "Brandenburg Gate",
      },
    ],
  },
];
