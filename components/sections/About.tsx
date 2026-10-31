import { about } from "@/content/about";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

export function About() {
  return (
    <Section id="about" index="01" title="About">
      <div className="grid gap-12 md:grid-cols-12">
        <Reveal className="space-y-5 text-base leading-relaxed text-muted md:col-span-7">
          {about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>
        <Reveal className="md:col-span-5">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
            {about.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1.5 bg-card p-5">
                <dt className="order-2 text-xs leading-snug text-subtle">{stat.label}</dt>
                <dd className="order-1 text-xl font-semibold tracking-tight tabular-nums">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
