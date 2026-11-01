"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { type Chapter, chapters } from "@/content/journey";
import { Character } from "@/components/pixel/Character";

// Where the character stands, as a fraction of the viewport height. A level
// starts when its node scrolls up to this line.
const CHARACTER_LINE = 0.45;

export function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const nodeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [walking, setWalking] = useState(false);

  useEffect(() => {
    let stopTimer: ReturnType<typeof setTimeout> | undefined;

    // Browsers already deliver scroll events at most once per frame, and this
    // is a handful of rect reads, so it runs directly in the handler.
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;
      const line = window.innerHeight * CHARACTER_LINE;
      const travelled = Math.min(Math.max(line - section.getBoundingClientRect().top, 0), section.offsetHeight);
      section.style.setProperty("--journey-progress", `${travelled}px`);

      let next = 0;
      nodeRefs.current.forEach((node, i) => {
        if (node && node.getBoundingClientRect().top <= line) next = i;
      });
      setActive(next);
    };

    const onScroll = () => {
      update();
      setWalking(true);
      clearTimeout(stopTimer);
      stopTimer = setTimeout(() => setWalking(false), 160);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(stopTimer);
    };
  }, []);

  const current = chapters[active];

  return (
    <section id="journey" ref={sectionRef} aria-label="Career journey" className="mx-auto flex max-w-5xl px-6">
      {/* pb keeps the character and his speech bubble inside the journey when it ends */}
      <div className="relative w-16 shrink-0 pb-28 md:w-48 md:pb-44" aria-hidden>
        <div className="journey-path absolute inset-y-0 left-1/2 w-1 -translate-x-1/2" />
        <div
          className="absolute left-1/2 top-0 w-1 -translate-x-1/2"
          style={{ height: "var(--journey-progress, 0px)", background: current.color }}
        />
        {/* mt lines the resting character up with the first level's node */}
        <div className="sticky mt-[6.5rem] h-0" style={{ top: `${CHARACTER_LINE * 100}vh` }}>
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Player chapter={current} level={active + 1} walking={walking} />
          </div>
        </div>
      </div>

      <ol className="min-w-0 flex-1">
        {chapters.map((chapter, i) => (
          <li key={chapter.id} className="relative min-h-[65vh] pb-16 pl-5 md:pl-10">
            <span
              ref={(el) => {
                nodeRefs.current[i] = el;
              }}
              className="pixel-border absolute -left-8 top-[6.5rem] h-4 w-4 -translate-x-1/2 -translate-y-1/2 md:-left-24"
              style={{ background: i <= active ? chapter.color : "var(--canvas)" }}
              aria-hidden
            />
            <div className="pt-24">
              <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-pixel text-[10px] text-accent">
                  {i === chapters.length - 1 ? "BONUS" : `LEVEL ${i + 1}`}
                </span>
                <span className="font-term text-xl leading-none text-subtle">
                  {chapter.years} · {chapter.place}
                </span>
              </p>
              <h3 className="mt-4 font-pixel text-lg leading-relaxed text-balance md:text-2xl md:leading-relaxed">
                {chapter.title}
              </h3>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted text-pretty">{chapter.story}</p>
              {chapter.highlight && (
                <p className="pixel-card mt-8 inline-flex max-w-xl flex-wrap items-baseline gap-x-3 gap-y-1 bg-card px-4 py-3">
                  <span className="font-pixel text-[10px] text-score">★ REWARD</span>
                  <span className="font-term text-3xl leading-none">{chapter.highlight.value}</span>
                  <span className="text-sm text-subtle">{chapter.highlight.label}</span>
                </p>
              )}
              {chapter.link && (
                <Link href={chapter.link.href} className="pixel-btn mt-8 bg-accent text-on-accent">
                  ▶ {chapter.link.label}
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Player({ chapter, level, walking }: { chapter: Chapter; level: number; walking: boolean }) {
  return (
    <div className="flex flex-col items-center">
      {/* key remounts the sprite so the swap animation replays on every outfit change */}
      <div key={chapter.id} className="journey-swap relative" style={{ "--chapter": chapter.color } as React.CSSProperties}>
        <Character outfit={chapter.outfit.id} sheet={chapter.outfit.sheet} walking={walking} scale={3} className="md:hidden" />
        <Character outfit={chapter.outfit.id} sheet={chapter.outfit.sheet} walking={walking} scale={6} className="hidden md:block" />
      </div>
      <p
        key={`${chapter.id}-says`}
        className="journey-says pixel-border mt-5 hidden w-44 bg-card px-3 py-2 text-center font-term text-xl leading-tight md:block"
      >
        <span className="mb-2 block font-pixel text-[8px] leading-relaxed text-subtle">
          {level > 5 ? "BONUS" : `LV ${level}`} · {chapter.outfit.label.toUpperCase()}
        </span>
        {chapter.outfit.says}
      </p>
    </div>
  );
}
