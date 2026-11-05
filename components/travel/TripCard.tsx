import type { Trip } from "@/content/travel";
import { PhotoGrid } from "@/components/PhotoGrid";
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
        <PhotoGrid photos={compact ? trip.photos.slice(0, COMPACT_PHOTOS) : trip.photos} className="mt-5" />
      )}
    </article>
  );
}
