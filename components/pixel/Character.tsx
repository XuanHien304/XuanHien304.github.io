"use client";

import { useEffect, useState } from "react";
import { type Frame, type OutfitId, SPRITE_HEIGHT, SPRITE_WIDTH, spriteGrid } from "@/components/pixel/characterArt";
import { type SpriteSheet, sheets } from "@/components/pixel/sheets";

interface CharacterProps {
  outfit: OutfitId;
  // Size of one code-sprite pixel in CSS pixels. Sprite sheets are scaled to
  // the same height, rounded so their pixels stay crisp.
  scale: number;
  walking?: boolean;
  className?: string;
}

const WALK_INTERVAL_MS = 120;

export function Character({ outfit, scale, walking = false, className = "" }: CharacterProps) {
  const sheet = sheets[outfit];
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!walking || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setStep((s) => s + 1), WALK_INTERVAL_MS);
    return () => clearInterval(id);
  }, [walking]);

  if (sheet) {
    return <SheetSprite sheet={sheet} frame={walking ? step % sheet.frames : 0} scale={scale} className={className} />;
  }

  const frame: Frame = walking ? (step % 2 ? "walkB" : "walkA") : "idle";
  return <PixelSprite outfit={outfit} frame={frame} scale={scale} className={className} />;
}

function SheetSprite({
  sheet,
  frame,
  scale,
  className,
}: {
  sheet: SpriteSheet;
  frame: number;
  scale: number;
  className: string;
}) {
  // Whole multiples (or halves when shrinking) keep every art pixel square.
  const ratio = (SPRITE_HEIGHT * scale) / sheet.frameSize;
  const k = ratio >= 1 ? Math.round(ratio) : Math.max(0.5, Math.round(ratio * 2) / 2);
  const size = sheet.frameSize * k;

  return (
    <div
      role="img"
      aria-label="Pixel-art Hien"
      className={`pixel-sprite ${className}`}
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${sheet.src})`,
        backgroundSize: `${sheet.frames * 100}% 100%`,
        backgroundPosition: `${sheet.frames > 1 ? (frame / (sheet.frames - 1)) * 100 : 0}% 0`,
        imageRendering: "pixelated",
      }}
    />
  );
}

function PixelSprite({
  outfit,
  frame,
  scale,
  className,
}: {
  outfit: OutfitId;
  frame: Frame;
  scale: number;
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
      width={SPRITE_WIDTH * scale}
      height={SPRITE_HEIGHT * scale}
      shapeRendering="crispEdges"
      className={`pixel-sprite ${className}`}
    >
      {rects}
    </svg>
  );
}
