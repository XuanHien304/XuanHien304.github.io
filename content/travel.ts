export type Flag = "uk" | "fr" | "de";

export interface Photo {
  // Under /images/travel/<trip id>/, resized to 1600px wide with location
  // metadata stripped.
  src: string;
  alt: string;
  caption?: string;
}

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
  photos: Photo[];
}

// Newest first. Photos and stories still to come.
export const trips: Trip[] = [
  {
    id: "uk",
    country: "United Kingdom",
    flag: "uk",
    when: "2024 – now",
    tag: "Home base",
    places: ["Birmingham"],
    photos: [],
  },
  {
    id: "france",
    country: "France",
    flag: "fr",
    when: "2025",
    places: [],
    photos: [],
  },
  {
    id: "germany",
    country: "Germany",
    flag: "de",
    when: "2025",
    places: [],
    photos: [],
  },
];
