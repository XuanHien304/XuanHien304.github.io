import type { IconType } from "react-icons";
import type { Photo } from "@/components/PhotoGrid";
import { GiChessKnight, GiShuttlecock, GiSoccerBall } from "react-icons/gi";
import { SiCounterstrike, SiLeagueoflegends } from "react-icons/si";

export interface Signature {
  name: string;
  kind: "Game" | "Sport";
  // Logo in the slot. Without one, the slot shows `short`.
  icon?: IconType;
  short?: string;
  // One or two sentences, shown in the panel when the card is selected.
  description: string;
  // Optional stat in the panel: rank, rating, a result…
  detail?: string;
  // Screenshot or photo behind the detail, under /images/play/.
  trophy?: Photo;
}

export interface Clip {
  // Under /videos/: H.264 MP4 at 720p, about 2–3 Mbps, ideally under 5MB.
  src: string;
  // Still frame shown before the clip plays.
  poster: string;
  title: string;
  // Name of the signature it belongs to.
  game: string;
}

export const signatures: Signature[] = [
  {
    name: "League of Legends",
    kind: "Game",
    icon: SiLeagueoflegends,
    description: "Two of my teamfights are in the highlights.",
  },
  {
    name: "Teamfight Tactics",
    kind: "Game",
    short: "TFT",
    description: "I don't play every season, but when I do, I climb.",
    detail: "Master in the seasons I play · peak Grandmaster",
    trophy: {
      src: "/images/play/tft-grandmaster.jpg",
      alt: "Teamfight Tactics screen reading Promoted to Grandmaster, Ranked TFT",
      caption: "Promoted to Grandmaster",
    },
  },
  {
    name: "Counter-Strike",
    kind: "Game",
    icon: SiCounterstrike,
    description: "Two AWP plays, on Inferno and Cache, are in the highlights.",
  },
  {
    name: "Overwatch",
    kind: "Game",
    short: "OW",
    description: "One of my Hanzo plays is in the highlights.",
  },
  {
    name: "Chess",
    kind: "Game",
    icon: GiChessKnight,
    description: "I've just started my chess journey. I'll update the rating as it climbs.",
    detail: "800 Elo",
  },
  {
    name: "Football",
    kind: "Sport",
    icon: GiSoccerBall,
    description: "My high school team won the championship in March 2018.",
    detail: "High school champions, 2018",
    trophy: {
      src: "/images/play/football-champions.jpg",
      alt: "Hien and four teammates in school uniform holding the trophy and the first-place pennant",
      caption: "High school champions, Mar 2018",
    },
  },
  {
    name: "Badminton",
    kind: "Sport",
    icon: GiShuttlecock,
    description: "The other sport I play, when I'm not on the pitch.",
  },
];

// Highlight clips, in the order they're shown. The main page shows the first three.
export const clips: Clip[] = [
  {
    src: "/videos/cs-inferno-awp.mp4",
    poster: "/videos/posters/cs-inferno-awp.jpg",
    title: "AWP on Inferno",
    game: "Counter-Strike",
  },
  {
    src: "/videos/lol-teamfight.mp4",
    poster: "/videos/posters/lol-teamfight.jpg",
    title: "Teamfight",
    game: "League of Legends",
  },
  {
    src: "/videos/overwatch-hanzo.mp4",
    poster: "/videos/posters/overwatch-hanzo.jpg",
    title: "Hanzo highlight",
    game: "Overwatch",
  },
  {
    src: "/videos/lol-late-game.mp4",
    poster: "/videos/posters/lol-late-game.jpg",
    title: "Late-game fight",
    game: "League of Legends",
  },
  {
    src: "/videos/cs-cache-awp.mp4",
    poster: "/videos/posters/cs-cache-awp.jpg",
    title: "AWP on Cache",
    game: "Counter-Strike",
  },
];
