"use client";

import { useState } from "react";
import { type Skill, skillGroups } from "@/content/skills";
import { chapters } from "@/content/journey";
import { PixelTabs } from "@/components/PixelTabs";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

// Slots per row from `sm` up. Each bag is padded with empty slots to fill its
// last row, like a game inventory.
const COLUMNS = 6;

export function Skills() {
  const [bag, setBag] = useState(skillGroups[0].name);
  const [selected, setSelected] = useState(0);
  const group = skillGroups.find((g) => g.name === bag) ?? skillGroups[0];
  const item = group.items[selected] ?? group.items[0];
  const empty = (COLUMNS - (group.items.length % COLUMNS)) % COLUMNS;

  return (
    <Section id="skills" kicker="INVENTORY" title="Skills & tools">
      <Reveal className="pixel-card bg-card p-5 sm:p-8">
        <PixelTabs
          label="Skill bags"
          tabs={skillGroups.map((g) => ({ id: g.name, label: g.tab, count: g.items.length }))}
          active={group.name}
          onChange={(id) => {
            setBag(id);
            setSelected(0);
          }}
        />
        <div className="mt-8 grid gap-8 md:grid-cols-[auto_1fr] md:items-start">
          <ul role="tabpanel" aria-label={group.name} className="grid grid-cols-4 gap-3 sm:grid-cols-6">
            {group.items.map((skill, i) => (
              <li key={skill.name}>
                <button
                  type="button"
                  aria-label={skill.name}
                  aria-pressed={i === selected}
                  onClick={() => setSelected(i)}
                  onFocus={() => setSelected(i)}
                  onMouseEnter={() => setSelected(i)}
                  className={`pixel-border flex size-14 items-center justify-center sm:size-16 ${
                    i === selected ? "bg-accent-soft text-accent" : "bg-canvas hover:text-accent"
                  }`}
                >
                  <ItemIcon skill={skill} />
                </button>
              </li>
            ))}
            {Array.from({ length: empty }, (_, i) => (
              <li key={`empty-${i}`} aria-hidden className="pixel-border hidden size-16 bg-canvas opacity-40 sm:block" />
            ))}
          </ul>
          <ItemCard skill={item} bag={group.name} />
        </div>
      </Reveal>
    </Section>
  );
}

function ItemIcon({ skill, large }: { skill: Skill; large?: boolean }) {
  const Icon = skill.icon;
  if (Icon) return <Icon aria-hidden className={large ? "size-9" : "size-7 sm:size-8"} />;
  return <span className="font-pixel text-[10px] leading-none">{skill.short ?? skill.name.slice(0, 3)}</span>;
}

// The item description panel. It updates as slots are hovered, focused or
// clicked, so it's announced politely to screen readers.
function ItemCard({ skill, bag }: { skill: Skill; bag: string }) {
  const levels = chapters.flatMap((chapter, i) => (skill.foundIn?.includes(chapter.id) ? [{ chapter, level: i + 1 }] : []));

  return (
    <div aria-live="polite" className="pixel-border bg-canvas p-5">
      <div className="flex items-center gap-4">
        <div className="pixel-border flex size-16 shrink-0 items-center justify-center bg-card text-fg">
          <ItemIcon skill={skill} large />
        </div>
        <div className="min-w-0">
          <p className="font-pixel text-xs leading-relaxed">{skill.name}</p>
          <p className="font-term text-lg leading-none text-subtle">{bag}</p>
        </div>
      </div>
      <p className="mt-4 leading-relaxed text-muted text-pretty">{skill.note}</p>
      {levels.length > 0 && (
        <div className="mt-5">
          <p className="font-pixel text-[8px] text-subtle">FOUND IN</p>
          <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 font-term text-lg leading-tight">
            {levels.map(({ chapter, level }) => (
              <li key={chapter.id} className="flex items-center gap-2">
                <span aria-hidden className="size-3 shrink-0" style={{ background: chapter.color }} />
                LV {level} · {chapter.place}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
