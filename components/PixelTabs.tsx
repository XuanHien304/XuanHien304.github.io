"use client";

import { useRef } from "react";

interface Tab {
  id: string;
  label: string;
  // Shown after the label, e.g. how many items a bag holds.
  count?: number;
}

interface PixelTabsProps {
  label: string;
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
}

// A row of game-menu tabs. Arrow keys move between tabs, as in a native
// tablist.
export function PixelTabs({ label, tabs, active, onChange }: PixelTabsProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (index + step + tabs.length) % tabs.length;
    onChange(tabs[next].id);
    refs.current[next]?.focus();
  };

  return (
    <div role="tablist" aria-label={label} className="flex flex-wrap gap-3">
      {tabs.map((tab, i) => {
        const selected = tab.id === active;
        return (
          <button
            key={tab.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(event) => onKeyDown(event, i)}
            className={`pixel-border min-h-11 px-3 font-pixel text-[10px] ${
              selected ? "bg-accent text-on-accent" : "bg-canvas hover:text-accent"
            }`}
          >
            {tab.label}
            {tab.count !== undefined && <span className="ml-2 opacity-70">{tab.count}</span>}
          </button>
        );
      })}
    </div>
  );
}
