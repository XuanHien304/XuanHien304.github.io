import { roles } from "@/content/experience";
import { Reveal } from "@/components/Reveal";
import { Chip, Section } from "@/components/Section";

export function Experience() {
  return (
    <Section id="experience" index="02" title="Experience">
      <ol className="divide-y divide-line">
        {roles.map((role) => (
          <li key={`${role.company}-${role.start}`} className="py-10 first:pt-0 last:pb-0">
            <Reveal className="grid gap-4 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-3">
                <p className="font-mono text-xs text-subtle">
                  {role.start} — {role.end}
                </p>
                <p className="mt-1 text-xs text-subtle">{role.location}</p>
              </div>
              <div className="md:col-span-9">
                <h3 className="text-lg font-semibold tracking-tight">
                  {role.title}
                  <span className="text-subtle"> · </span>
                  {role.companyUrl ? (
                    <a
                      href={role.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent underline-offset-4 hover:underline"
                    >
                      {role.company}
                    </a>
                  ) : (
                    <span className="text-accent">{role.company}</span>
                  )}
                </h3>
                <p className="mt-1 text-sm text-subtle">{role.context}</p>
                <ul className="mt-5 space-y-3">
                  {role.highlights.map((h) => (
                    <li key={h} className="relative pl-5 text-[15px] leading-relaxed text-muted">
                      <span className="absolute left-0 top-[0.7em] h-px w-2.5 bg-subtle" aria-hidden />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {role.stack.map((s) => (
                    <Chip key={s}>{s}</Chip>
                  ))}
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
