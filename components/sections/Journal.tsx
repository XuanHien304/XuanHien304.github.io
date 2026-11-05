"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { journalAreas } from "@/content/journal";
import { trips } from "@/content/travel";
import { type AreaStats, fetchAreaStats } from "@/lib/journalApi";
import { isSupabaseConfigured } from "@/lib/supabase";
import { PixelTabs } from "@/components/PixelTabs";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { TripCard } from "@/components/travel/TripCard";
import { Highlights } from "@/components/play/Play";
import { Signatures } from "@/components/play/Signatures";

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" });

// A preview of each journal area, one tab each. Every panel stays mounted
// (hidden when inactive), so the study stats load once.
export function Journal() {
  const [area, setArea] = useState(journalAreas[0].slug);
  const current = journalAreas.find((a) => a.slug === area) ?? journalAreas[0];

  return (
    <Section id="journal" kicker="LOGBOOK" title="Journal">
      <Reveal>
        <PixelTabs
          label="Journal areas"
          tabs={journalAreas.map((a) => ({ id: a.slug, label: a.name.toUpperCase() }))}
          active={area}
          onChange={setArea}
        />
        <p className="mt-6 max-w-xl leading-relaxed text-muted">{current.description}</p>

        <Panel slug="travel" active={area}>
          <ul className="grid gap-8 md:grid-cols-3">
            {trips.map((trip) => (
              <li key={trip.id}>
                <TripCard trip={trip} compact />
              </li>
            ))}
          </ul>
        </Panel>
        <Panel slug="game" active={area}>
          <div className="grid gap-12">
            <Signatures />
            <Highlights limit={3} />
          </div>
        </Panel>
        <Panel slug="study" active={area}>
          <StudyPreview />
        </Panel>

        <Link href={`/journal/${area}/`} className="pixel-btn mt-10 bg-accent text-on-accent">
          ▶ Open {current.name}
        </Link>
      </Reveal>
    </Section>
  );
}

function Panel({ slug, active, children }: { slug: string; active: string; children: React.ReactNode }) {
  const area = journalAreas.find((a) => a.slug === slug);
  return (
    <div role="tabpanel" aria-label={area?.name} hidden={slug !== active} className="mt-8">
      {children}
    </div>
  );
}

type StudyState = { status: "loading" } | { status: "ready"; stats: AreaStats } | { status: "error" };

// Study shows progress only, not the entries themselves: the DSA notes live
// on /journal/study.
function StudyPreview() {
  const [state, setState] = useState<StudyState>(isSupabaseConfigured ? { status: "loading" } : { status: "error" });

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let cancelled = false;
    fetchAreaStats("study")
      .then((stats): StudyState => ({ status: "ready", stats }))
      .catch((): StudyState => ({ status: "error" }))
      .then((result) => {
        if (!cancelled) setState(result);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (state.status === "error") return <Note>The logbook couldn&apos;t be loaded right now.</Note>;
  if (state.status === "loading")
    return (
      <Note>
        <span className="motion-safe:animate-[blink_1s_steps(2,start)_infinite]">LOADING…</span>
      </Note>
    );
  const { entries, topics, lastEntry } = state.stats;
  return (
    <dl className="grid gap-6 sm:grid-cols-3">
      <Stat label="★ ENTRIES LOGGED" value={entries} />
      <Stat label="■ TOPICS" value={topics} />
      <Stat label="▶ LAST ENTRY" value={lastEntry ? dateFormat.format(new Date(lastEntry)) : "None yet"} />
    </dl>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="pixel-border bg-card px-5 py-5">
      <dt className="font-pixel text-[8px] leading-relaxed text-subtle">{label}</dt>
      <dd className="mt-3 font-term text-4xl leading-none tabular-nums">{value}</dd>
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return <p className="pixel-border bg-card px-5 py-6 font-term text-xl text-subtle">{children}</p>;
}
