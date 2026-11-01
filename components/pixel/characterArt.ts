// Pixel art for the character, drawn from the avatar (messy black hair, tan
// skin, black eyes). Each grid is 16 x 20; every character is one pixel and
// maps to a colour in the palette ("." is transparent).

export type Grid = string[];
export type Palette = Record<string, string>;
export type Frame = "idle" | "walkA" | "walkB";

export interface OutfitArt {
  palette: Palette;
  // Rows that replace the base rows for this outfit (hats, scarves, coats).
  overlay?: Record<number, string>;
}

export const SPRITE_WIDTH = 16;
export const SPRITE_HEIGHT = 20;

const BASE_PALETTE: Palette = {
  K: "#141414", // outline
  H: "#2f2f33", // hair
  h: "#4b4b52", // hair highlight
  S: "#f1c38e", // skin
  s: "#d9a26a", // skin shade
  W: "#ffffff", // eye highlight
};

const HEAD: Grid = [
  "....KK.KKKK.....",
  "...KHHKHHHHKK...",
  "..KHHHHHHhHHHK..",
  ".KHHhHHHHHHHHHK.",
  ".KHHHHHHHHHHHHK.",
  ".KHHHSHHHHSHHHK.",
  ".KHSSSSSSSSSSHK.",
  ".KHSKKSSSSKKSHK.",
  ".KSSKWSSSSKWSSK.",
  ".KSSSSSSSSSSSSK.",
  "..KSSSSSSSSSSK..",
  "...KKSSSSSSKK...",
];

const BODY: Grid = [
  "....KTTSSTTK....",
  "...KTTTTTTTTK...",
  "..KTTTTTTTTTTK..",
  "..KtTTTTTTTTtK..",
  "..KSTTTTTTTTSK..",
  "...KPPPPPPPPK...",
];

const LEGS: Record<Frame, Grid> = {
  idle: ["...KPPK..KPPK...", "...KBBK..KBBK..."],
  walkA: ["...KPPK..KBBK...", "...KBBK........."],
  walkB: ["...KBBK..KPPK...", ".........KBBK..."],
};

export const outfits = {
  tee: {
    palette: { T: "#6b7280", t: "#4b5563", P: "#1f2937", B: "#111827" },
  },
  labCoat: {
    palette: { T: "#f1f5f9", t: "#cbd5e1", A: "#0ea5e9", P: "#334155", B: "#1e293b" },
    overlay: {
      13: "...KTTTAATTTK...",
      14: "..KTTTTAATTTTK..",
      15: "..KtTTTAATTTtK..",
      16: "..KSTTTAATTTSK..",
      17: "...KTTPPPPTTK...",
    },
  },
  hoodie: {
    palette: { T: "#f97316", t: "#c2410c", A: "#fef3c7", P: "#1e3a8a", B: "#e2e8f0" },
    overlay: {
      11: "...KTSSSSSSTK...",
      12: "...KTTTSSTTTK...",
      13: "...KTTATTATTK...",
      14: "..KTTTATTATTTK..",
    },
  },
  shirtTie: {
    palette: { T: "#dbeafe", t: "#93c5fd", A: "#b91c1c", P: "#1e293b", B: "#3f2a1d" },
    overlay: {
      12: "....KTTAATTK....",
      13: "...KTTTAATTTK...",
      14: "..KTTTTAATTTTK..",
      15: "..KtTTTAATTTtK..",
    },
  },
  coatScarf: {
    palette: { T: "#6b5bb5", t: "#4c3d91", A: "#dc2626", a: "#991b1b", P: "#1f2937", B: "#111827" },
    overlay: {
      11: "...KKAAAAAAKK...",
      12: "...KAAAAAAAAK...",
      13: "...KTTaATTTTK...",
      14: "..KTTTaATTTTTK..",
      17: "...KTTTTTTTTK...",
    },
  },
  hardHat: {
    palette: { Y: "#facc15", y: "#ca8a04", T: "#fb923c", t: "#ea580c", A: "#e5e7eb", P: "#1e3a8a", B: "#111827" },
    overlay: {
      0: ".....KKKKKK.....",
      1: "....KYYYYYYK....",
      2: "...KYYYYYYYYK...",
      3: ".KKyyyyyyyyyyKK.",
      15: "..KAAAAAAAAAAK..",
    },
  },
  training: {
    palette: { T: "#22c55e", t: "#15803d", A: "#ef4444", P: "#111827", B: "#ef4444" },
    overlay: {
      5: ".KAAAAAAAAAAAAK.",
      13: "...KSTTTTTTSK...",
      14: "..KSSTTTTTTSSK..",
      15: "..KSsTTTTTTsSK..",
    },
  },
} satisfies Record<string, OutfitArt>;

export type OutfitId = keyof typeof outfits;

export function spriteGrid(outfitId: OutfitId, frame: Frame): { grid: Grid; palette: Palette } {
  const outfit: OutfitArt = outfits[outfitId];
  const rows = [...HEAD, ...BODY, ...LEGS[frame]];
  const grid = rows.map((row, i) => outfit.overlay?.[i] ?? row);
  return { grid, palette: { ...BASE_PALETTE, ...outfit.palette } };
}
