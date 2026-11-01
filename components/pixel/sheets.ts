import type { OutfitId } from "@/components/pixel/characterArt";

export interface SpriteSheet {
  src: string;
  // Square frames laid out left to right: frame 0 is the standing pose, and
  // all frames together loop as the walk cycle.
  frames: number;
  frameSize: number;
}

// PixelLab-made art (see docs/character-art.md). Outfits missing here fall
// back to the code-drawn sprite in characterArt.ts.
export const sheets: Partial<Record<OutfitId, SpriteSheet>> = {
  tee: { src: "/images/journey/base.png", frames: 6, frameSize: 80 },
  labCoat: { src: "/images/journey/student.png", frames: 6, frameSize: 80 },
  hoodie: { src: "/images/journey/fpt.png", frames: 6, frameSize: 80 },
  shirtTie: { src: "/images/journey/datanest.png", frames: 6, frameSize: 80 },
  gown: { src: "/images/journey/birmingham.png", frames: 6, frameSize: 80 },
  hardHat: { src: "/images/journey/gevernova.png", frames: 6, frameSize: 80 },
  training: { src: "/images/journey/offline.png", frames: 6, frameSize: 80 },
};
