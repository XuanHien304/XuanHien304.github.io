"use client";

import Image from "next/image";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { projectFilters, projects } from "@/content/projects";

export function Projects() {
  const [active, setActive] = useState("all");
  const visible = projects.filter((p) => active === "all" || p.tags.includes(active));

  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="mb-6 text-2xl font-semibold">Projects</h2>
      <div className="mb-8 flex flex-wrap gap-2">
        {projectFilters.map((f) => (
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {visible.map((project) => (
          <div
            key={project.name}
            className="flex flex-col gap-3 rounded-xl border border-black/10 p-5 dark:border-white/10"
          >
            <div className="flex items-start gap-3">
              <Image
                src={project.logo}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 shrink-0 rounded-lg object-contain"
              />
              <div>
                <h3 className="font-semibold leading-tight">{project.name}</h3>
                <p className="text-xs text-black/50 dark:text-white/50">
                  {project.role} · {project.timeline}
                </p>
              </div>
            </div>
            <p className="flex-1 text-sm text-black/60 dark:text-white/60">{project.summary}</p>
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 text-sm font-medium text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white"
              >
                <FaGithub size={16} /> Repository
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
