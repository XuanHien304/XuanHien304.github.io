import { projects } from "@/content/projects";
import { Reveal } from "@/components/Reveal";
import { Chip, Section } from "@/components/Section";
import { ProjectArchive } from "@/components/sections/ProjectArchive";

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <Section id="projects" kicker="QUEST LOG" title="Main quests">
      <div className="grid gap-8 sm:grid-cols-2">
        {featured.map((project) => (
          <Reveal key={project.name}>
            <article className="pixel-card flex h-full flex-col bg-card p-6">
              <div className="flex items-center justify-between gap-3 font-term text-lg leading-none text-subtle">
                <span>{project.company ?? project.role}</span>
                <span>{project.timeline}</span>
              </div>
              <h3 className="mt-4 font-pixel text-xs leading-relaxed">{project.name}</h3>
              {project.metric && (
                <p className="mt-4 flex items-baseline gap-2">
                  <span className="font-pixel text-[8px] text-score">★ REWARD</span>
                  <span className="font-term text-2xl leading-none">{project.metric}</span>
                </p>
              )}
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>
              {project.stack && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {project.stack.map((s) => (
                    <Chip key={s}>{s}</Chip>
                  ))}
                </div>
              )}
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-20">
        <h3 className="mb-6 font-pixel text-xs">Side quests</h3>
        <ProjectArchive projects={rest} />
      </Reveal>
    </Section>
  );
}
