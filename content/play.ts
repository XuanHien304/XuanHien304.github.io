import type { IconType } from "react-icons";
import { GiChessKnight, GiShuttlecock, GiSoccerBall } from "react-icons/gi";
import { SiCounterstrike, SiLeagueoflegends } from "react-icons/si";

export interface Signature {
  name: string;
  kind: "Game" | "Sport";
  genre: string;
  // Logo in the slot. Without one, the slot shows `short`.
  icon?: IconType;
  short?: string;
  // Optional line under the name: main role, rank, position…
  detail?: string;
}

export interface Clip {
  // Under /videos/, compressed MP4 (H.264), ideally under 5MB.
  src: string;
  // Still frame shown before the clip plays.
  poster: string;
  title: string;
  // Name of the signature it belongs to.
  game: string;
}

export const signatures: Signature[] = [
  { name: "League of Legends", kind: "Game", genre: "MOBA", icon: SiLeagueoflegends },
  { name: "Teamfight Tactics", kind: "Game", genre: "Auto battler", short: "TFT" },
  { name: "Counter-Strike", kind: "Game", genre: "Tactical FPS", icon: SiCounterstrike },
  { name: "Chess", kind: "Game", genre: "Strategy", icon: GiChessKnight },
  { name: "Football", kind: "Sport", genre: "Team sport", icon: GiSoccerBall },
  { name: "Badminton", kind: "Sport", genre: "Racket sport", icon: GiShuttlecock },
];

// Highlight clips. The highlights row stays hidden until there's one here.
export const clips: Clip[] = [];
