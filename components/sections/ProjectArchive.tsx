"use client";

import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { type Project, projectFilters } from "@/content/projects";

export function ProjectArchive({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState("all");
  const visible = projects.filter((p) => active === "all" || p.tags.includes(active));

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-3" role="group" aria-label="Filter projects">
        {projectFilters.map((f) => (
          <button
            key={f.filter}
            type="button"
            aria-pressed={active === f.filter}
            onClick={() => setActive(f.filter)}
            className={`pixel-btn !px-3 !text-[8px] ${active === f.filter ? "bg-accent text-on-accent" : "bg-card"}`}
          >
            {f.name}
          </button>
        ))}
      </div>
      <ul className="divide-y-2 divide-dashed divide-line">
        {visible.map((project) => {
          const row = (
            <>
              <p className="font-term text-lg leading-none text-subtle md:col-span-2 md:pt-1">{project.timeline}</p>
              <div className="md:col-span-7">
                <h4 className="font-medium transition-colors group-hover:text-accent group-focus-visible:text-accent">
                  {project.name}
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-muted">{project.summary}</p>
              </div>
              <div className="flex items-start gap-4 md:col-span-3 md:justify-end">
                {project.metric && <span className="font-term text-lg leading-none text-score">★ {project.metric}</span>}
                {project.repo && (
                  <FaGithub
                    size={18}
                    aria-hidden
                    className="text-subtle transition-colors group-hover:text-accent group-focus-visible:text-accent"
                  />
                )}
              </div>
            </>
          );
          const layout = "grid gap-2 px-3 py-5 md:grid-cols-12 md:gap-8";
          return (
            <li key={project.name} className="-mx-3">
              {project.repo ? (
                // The whole row links to the repo and lights up on hover or focus.
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group ${layout} transition-colors hover:bg-accent-soft focus-visible:bg-accent-soft`}
                >
                  {row}
                  <span className="sr-only">(GitHub repository, opens in a new tab)</span>
                </a>
              ) : (
                <div className={layout}>{row}</div>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}
