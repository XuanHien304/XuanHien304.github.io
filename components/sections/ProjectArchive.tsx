"use client";

import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { type Project, projectFilters } from "@/content/projects";

export function ProjectArchive({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState("all");
  const visible = projects.filter((p) => active === "all" || p.tags.includes(active));

  return (
    <>
      <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
        {projectFilters.map((f) => (
          <button
            key={f.filter}
            type="button"
            aria-pressed={active === f.filter}
            onClick={() => setActive(f.filter)}
            className={`min-h-9 cursor-pointer rounded-full px-4 text-sm font-medium transition-colors duration-200 ${
              active === f.filter ? "bg-fg text-canvas" : "border border-line text-muted hover:text-fg"
            }`}
          >
            {f.name}
          </button>
        ))}
      </div>
      <ul className="divide-y divide-line border-y border-line">
        {visible.map((project) => (
          <li key={project.name} className="grid gap-2 py-5 md:grid-cols-12 md:gap-8">
            <p className="font-mono text-xs text-subtle md:col-span-2 md:pt-1">{project.timeline}</p>
            <div className="md:col-span-7">
              <h4 className="font-medium">{project.name}</h4>
              <p className="mt-1 text-sm leading-relaxed text-muted">{project.summary}</p>
            </div>
            <div className="flex items-start text-sm md:col-span-3 md:justify-end">
              {project.repo ? (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted transition-colors duration-200 hover:text-fg"
                >
                  <FaGithub size={15} aria-hidden /> Repository
                </a>
              ) : (
                project.metric && <span className="font-mono text-xs text-accent">{project.metric}</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
