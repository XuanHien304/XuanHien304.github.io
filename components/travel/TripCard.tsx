"use client";

import { useRef, useState } from "react";
import type { Photo, Trip } from "@/content/travel";
import { FlagStamp } from "@/components/travel/FlagStamp";

// How many photos a compact card shows.
const COMPACT_PHOTOS = 3;

export function TripCard({ trip, compact }: { trip: Trip; compact?: boolean }) {
  return (
    <article className="pixel-card flex h-full flex-col bg-card p-5">
      <div className="flex items-start gap-4">
        <FlagStamp flag={trip.flag} />
        <div className="min-w-0">
          <p className="font-term text-lg leading-none text-subtle">
            {trip.when}
            {trip.tag && ` · ${trip.tag}`}
          </p>
          <h3 className="mt-2 font-pixel text-xs leading-relaxed">{trip.country}</h3>
          {trip.places.length > 0 && (
            <p className="font-term text-lg leading-tight text-muted">{trip.places.join(" · ")}</p>
          )}
        </div>
      </div>
      {trip.story && (
        <p className={`mt-4 leading-relaxed text-muted text-pretty ${compact ? "line-clamp-3" : ""}`}>{trip.story}</p>
      )}
      {trip.photos.length > 0 && (
        <PhotoGrid photos={compact ? trip.photos.slice(0, COMPACT_PHOTOS) : trip.photos} />
      )}
    </article>
  );
}

// Thumbnails that open full size in a dialog, with previous/next.
function PhotoGrid({ photos }: { photos: Photo[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const photo = photos[index];
  const step = (by: number) => setIndex((i) => (i + by + photos.length) % photos.length);

  return (
    <>
      <ul className="mt-5 grid grid-cols-3 gap-3">
        {photos.map((p, i) => (
          <li key={p.src}>
            <button
              type="button"
              aria-label={`Open photo: ${p.alt}`}
              onClick={() => {
                setIndex(i);
                dialogRef.current?.showModal();
              }}
              className="pixel-border block aspect-square w-full overflow-hidden bg-canvas"
            >
              <img src={p.src} alt="" loading="lazy" className="size-full object-cover" />
            </button>
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
