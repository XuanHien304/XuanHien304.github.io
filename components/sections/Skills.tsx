import { skillGroups } from "@/content/skills";
import { Reveal } from "@/components/Reveal";
import { Chip, Section } from "@/components/Section";

export function Skills() {
  return (
    <Section id="skills" kicker="INVENTORY" title="Skills & tools">
      <dl className="space-y-8">
        {skillGroups.map((group) => (
          <Reveal key={group.name} className="grid gap-4 md:grid-cols-12 md:gap-8">
            <dt className="font-pixel text-[10px] leading-relaxed md:col-span-3 md:pt-2">{group.name}</dt>
            <dd className="flex flex-wrap gap-3 md:col-span-9">
              {group.items.map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </dd>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
