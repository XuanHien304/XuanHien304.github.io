"use client";

import Image from "next/image";
import { useState } from "react";
import { skillFilters, skills } from "@/content/skills";

export function Skills() {
  const [active, setActive] = useState("all");
  const visible = skills.filter((s) => active === "all" || s.categories.includes(active));

  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="mb-6 text-2xl font-semibold">Skills</h2>
      <div className="mb-8 flex flex-wrap gap-2">
        {skillFilters.map((f) => (
          <button
            key={f.filter}
            type="button"
            onClick={() => setActive(f.filter)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              active === f.filter
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "bg-black/5 text-black/70 hover:bg-black/10 dark:bg-white/10 dark:text-white/70 dark:hover:bg-white/20"
            }`}
          >
            {f.name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {visible.map((skill) => {
          const card = (
            <div className="flex h-full flex-col items-center gap-3 rounded-xl border border-black/10 p-4 text-center transition-colors hover:border-black/25 dark:border-white/10 dark:hover:border-white/25">
              <Image src={skill.logo} alt={skill.name} width={40} height={40} className="object-contain" />
              <p className="text-sm font-medium">{skill.name}</p>
              <p className="text-xs text-black/50 dark:text-white/50">{skill.summary}</p>
            </div>
          );
          return skill.url ? (
            <a key={skill.name} href={skill.url} target="_blank" rel="noopener noreferrer">
              {card}
            </a>
          ) : (
            <div key={skill.name}>{card}</div>
          );
        })}
      </div>
    </section>
  );
}
