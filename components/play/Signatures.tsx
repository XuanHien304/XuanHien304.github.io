"use client";

import { useRef, useState } from "react";
import { type Signature, signatures } from "@/content/play";
import { PhotoGrid } from "@/components/PhotoGrid";

const KINDS = [
  { kind: "Game", label: "GAMES" },
  { kind: "Sport", label: "SPORTS" },
] as const;

// Widest the expanded card grows, like a game item tooltip. On narrow screens
// it's capped at the viewport minus the page gutters.
const TOOLTIP_WIDTH = 288;

// Signature games and sports as inventory-style cards. Hovering a card (or
// focusing it: tap on touch screens, Tab on keyboards) expands it into a
// wider tooltip over the content below, with its description, stat and trophy.
export function Signatures() {
  return (
    <div className="grid gap-8">
      {KINDS.map(({ kind, label }) => (
        <div key={kind}>
          <p className="font-pixel text-[10px] text-subtle">{label}</p>
          <ul className="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
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

function SignatureIcon({ signature }: { signature: Signature }) {
  const Icon = signature.icon;
  return (
    <span className="pixel-border flex size-16 shrink-0 items-center justify-center bg-canvas text-fg">
      {Icon ? <Icon aria-hidden className="size-9" /> : <span className="font-pixel text-[10px]">{signature.short}</span>}
    </span>
  );
}

type Align = "left" | "right" | "center";

const ALIGN_CLASS: Record<Align, string> = {
  left: "left-0",
  right: "right-0",
  center: "left-1/2 -translate-x-1/2",
};

function SignatureCard({ signature }: { signature: Signature }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [align, setAlign] = useState<Align>("left");
  const descriptionId = `signature-${signature.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  // Open towards whichever side has room, so the tooltip stays inside the
  // card grid (and so on screen).
  const placeTooltip = () => {
    const card = cardRef.current;
    const grid = card?.closest("ul");
    if (!card || !grid) return;
    const c = card.getBoundingClientRect();
    const g = grid.getBoundingClientRect();
    const width = Math.min(TOOLTIP_WIDTH, window.innerWidth - 48);
    if (c.left + width <= g.right) setAlign("left");
    else if (c.right - width >= g.left) setAlign("right");
    else setAlign("center");
  };

  const header = (
    <>
      <SignatureIcon signature={signature} />
      <span className="mt-4 font-pixel text-[10px] leading-relaxed">{signature.name}</span>
    </>
  );

  return (
    // tabIndex makes the card focusable, so a tap or Tab expands it too.
    <div
      ref={cardRef}
      tabIndex={0}
      aria-describedby={descriptionId}
      onPointerEnter={placeTooltip}
      onFocus={placeTooltip}
      className="group relative h-full"
    >
      <div className="pixel-border flex h-full flex-col items-center bg-card px-3 py-5 text-center">{header}</div>
      <div
        style={{ width: `min(${TOOLTIP_WIDTH}px, calc(100vw - 3rem))` }}
        className={`pixel-card invisible absolute top-0 z-20 flex min-h-full min-w-full flex-col items-center bg-card px-5 py-5 text-center opacity-0 transition-opacity duration-150 ease-[steps(3,end)] group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100 motion-reduce:transition-none ${ALIGN_CLASS[align]}`}
      >
        {header}
        <div id={descriptionId} className="mt-4 w-full text-left">
          <p className="leading-relaxed text-muted text-pretty">{signature.description}</p>
          {signature.detail && <p className="mt-2 font-term text-xl leading-tight text-score">{signature.detail}</p>}
          {signature.trophy && (
            <PhotoGrid photos={[signature.trophy]} variant="wide" captions={false} className="mt-4 !grid-cols-1" />
          )}
        </div>
      </div>
    </div>
  );
}
