import { projects } from "@/content/projects";
import { Reveal } from "@/components/Reveal";
import { Chip, Section } from "@/components/Section";
import { ProjectArchive } from "@/components/sections/ProjectArchive";

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <Section id="projects" index="03" title="Selected work">
      <div className="grid gap-5 sm:grid-cols-2">
        {featured.map((project) => (
          <Reveal key={project.name}>
            <article className="flex h-full flex-col rounded-xl border border-line bg-card p-6 transition-colors duration-200 hover:border-accent/50">
              <div className="flex items-center justify-between gap-3 font-mono text-xs text-subtle">
                <span>{project.company ?? project.role}</span>
                <span>{project.timeline}</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold tracking-tight">{project.name}</h3>
              {project.metric && (
                <p className="mt-3 w-fit rounded-md bg-accent-soft px-2 py-1 font-mono text-xs font-medium text-accent">
                  {project.metric}
                </p>
              )}
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>
              {project.stack && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <Chip key={s}>{s}</Chip>
                  ))}
                </div>
              )}
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16">
        <h3 className="mb-6 text-sm font-medium text-subtle">More projects</h3>
        <ProjectArchive projects={rest} />
      </Reveal>
    </Section>
  );
}
