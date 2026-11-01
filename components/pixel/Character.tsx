"use client";

import { useEffect, useState } from "react";
import { type Frame, type OutfitId, SPRITE_HEIGHT, SPRITE_WIDTH, spriteGrid } from "@/components/pixel/characterArt";

interface CharacterProps {
  outfit: OutfitId;
  // Size of one art pixel in CSS pixels.
  scale: number;
  walking?: boolean;
  // Optional AI-made sprite sheet: one row of 3 frames (idle, walkA, walkB),
  // see docs/character-art.md. When set it replaces the code-drawn sprite.
  sheet?: string;
  className?: string;
}

const FRAME_INDEX: Record<Frame, number> = { idle: 0, walkA: 1, walkB: 2 };

export function Character({ outfit, scale, walking = false, sheet, className = "" }: CharacterProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!walking || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setStep((s) => 1 - s), 150);
    return () => clearInterval(id);
  }, [walking]);

  const frame: Frame = walking ? (step ? "walkB" : "walkA") : "idle";
  const width = SPRITE_WIDTH * scale;
  const height = SPRITE_HEIGHT * scale;

  if (sheet) {
    return (
      <div
        role="img"
        aria-label="Pixel-art Hien"
        className={className}
        style={{
          width,
          height,
          backgroundImage: `url(${sheet})`,
          backgroundSize: "300% 100%",
          backgroundPosition: `${FRAME_INDEX[frame] * 50}% 0`,
          imageRendering: "pixelated",
        }}
      />
    );
  }

  return <PixelSprite outfit={outfit} frame={frame} width={width} height={height} className={className} />;
}

function PixelSprite({
  outfit,
  frame,
  width,
  height,
  className,
}: {
  outfit: OutfitId;
  frame: Frame;
  width: number;
  height: number;
  className: string;
}) {
  const { grid, palette } = spriteGrid(outfit, frame);
  const rects: React.ReactNode[] = [];

  // One rect per horizontal run of same-coloured pixels keeps the SVG small.
  grid.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const key = row[x];
      let run = 1;
      while (row[x + run] === key) run++;
      if (key !== ".") rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={run} height={1} fill={palette[key]} />);
      x += run;
    }
  });

  return (
    <svg
      role="img"
      aria-label="Pixel-art Hien"
      viewBox={`0 0 ${SPRITE_WIDTH} ${SPRITE_HEIGHT}`}
      width={width}
      height={height}
      shapeRendering="crispEdges"
      className={className}
    >
      {rects}
    </svg>
  );
}
