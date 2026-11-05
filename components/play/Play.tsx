import { type Clip, clips } from "@/content/play";

// Highlight clips. Renders nothing until content/play.ts has some.
export function Highlights({ limit }: { limit?: number }) {
  const shown = limit ? clips.slice(0, limit) : clips;
  if (shown.length === 0) return null;
  return (
    <div>
      <p className="font-pixel text-[10px] text-subtle">HIGHLIGHTS</p>
      <ul className={`mt-4 grid gap-8 md:grid-cols-2 ${shown.length === 3 ? "lg:grid-cols-3" : ""}`}>
        {shown.map((clip) => (
          <li key={clip.src}>
            <ClipPlayer clip={clip} />
          </li>
        ))}
      </ul>
    </div>
  );
}

// preload="none" keeps the page light: nothing downloads until play.
function ClipPlayer({ clip }: { clip: Clip }) {
  return (
    <figure>
      <video
        src={clip.src}
        poster={clip.poster}
        controls
        preload="none"
        playsInline
        className="pixel-border aspect-video w-full bg-black"
      />
      <figcaption className="mt-3 font-term text-lg leading-tight text-muted">
        {clip.title} · {clip.game}
      </figcaption>
    </figure>
  );
}
