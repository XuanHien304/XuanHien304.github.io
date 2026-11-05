"use client";

import { useRef, useState } from "react";

export interface Photo {
  src: string;
  alt: string;
  caption?: string;
}

interface PhotoGridProps {
  photos: Photo[];
  // "square" crops thumbnails for a tidy strip; "wide" keeps 16:10 frames and
  // shows each caption under its thumbnail, unless `captions` is false.
  variant?: "square" | "wide";
  captions?: boolean;
  className?: string;
}

// Thumbnails that open full size in a dialog, with previous/next.
export function PhotoGrid({ photos, variant = "square", captions = true, className = "" }: PhotoGridProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const photo = photos[index];
  const step = (by: number) => setIndex((i) => (i + by + photos.length) % photos.length);
  const wide = variant === "wide";

  return (
    <>
      <ul className={`grid gap-3 ${wide ? "gap-6 sm:grid-cols-2" : "grid-cols-3"} ${className}`}>
        {photos.map((p, i) => (
          <li key={p.src}>
            <button
              type="button"
              aria-label={`Open photo: ${p.alt}`}
              onClick={() => {
                setIndex(i);
                dialogRef.current?.showModal();
              }}
              className={`pixel-border block w-full overflow-hidden bg-canvas ${wide ? "aspect-[16/10]" : "aspect-square"}`}
            >
              <img src={p.src} alt="" loading="lazy" className="size-full object-cover" />
            </button>
            {wide && captions && p.caption && <p className="mt-3 font-term text-lg leading-tight text-muted">{p.caption}</p>}
          </li>
        ))}
      </ul>
      <dialog
        ref={dialogRef}
        onClick={(e) => e.target === dialogRef.current && dialogRef.current.close()}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="m-auto max-h-[90vh] max-w-[min(92vw,1100px)] bg-transparent p-0 backdrop:bg-black/80"
      >
        <figure className="pixel-border bg-card p-3">
          <img src={photo.src} alt={photo.alt} className="max-h-[72vh] w-auto" />
          <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <span className="font-term text-lg text-muted">{photo.caption ?? photo.alt}</span>
            <span className="flex gap-3">
              {photos.length > 1 && (
                <>
                  <button type="button" onClick={() => step(-1)} className="pixel-btn bg-canvas" aria-label="Previous photo">
                    ◀
                  </button>
                  <button type="button" onClick={() => step(1)} className="pixel-btn bg-canvas" aria-label="Next photo">
                    ▶
                  </button>
                </>
              )}
              <button type="button" onClick={() => dialogRef.current?.close()} className="pixel-btn bg-accent text-on-accent">
                Close
              </button>
            </span>
          </figcaption>
        </figure>
      </dialog>
    </>
  );
}
