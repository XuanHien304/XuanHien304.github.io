import { type Clip, type Signature, clips, signatures } from "@/content/play";

// Signature games and sports as inventory-style cards, grouped by kind.
export function Signatures() {
  return (
    <div className="grid gap-8">
      {(["Game", "Sport"] as const).map((kind) => (
        <div key={kind}>
          <p className="font-pixel text-[10px] text-subtle">{kind === "Game" ? "GAMES" : "SPORTS"}</p>
          <ul className="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {signatures
              .filter((s) => s.kind === kind)
              .map((s) => (
                <li key={s.name}>
                  <SignatureCard signature={s} />
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function SignatureCard({ signature }: { signature: Signature }) {
  const Icon = signature.icon;
  return (
    <div className="pixel-border flex h-full flex-col items-center bg-card px-3 py-5 text-center">
      <span className="pixel-border flex size-16 items-center justify-center bg-canvas">
        {Icon ? (
          <Icon aria-hidden className="size-9" />
        ) : (
          <span className="font-pixel text-[10px]">{signature.short}</span>
        )}
      </span>
      <p className="mt-4 font-pixel text-[10px] leading-relaxed">{signature.name}</p>
      <p className="mt-1 font-term text-lg leading-tight text-subtle">{signature.detail ?? signature.genre}</p>
    </div>
  );
}

// Highlight clips. Renders nothing until content/play.ts has some.
export function Highlights({ limit }: { limit?: number }) {
  const shown = limit ? clips.slice(0, limit) : clips;
  if (shown.length === 0) return null;
  return (
    <div>
      <p className="font-pixel text-[10px] text-subtle">HIGHLIGHTS</p>
      <ul className="mt-4 grid gap-8 md:grid-cols-2">
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
