import { skillGroups } from "@/content/skills";
import { Reveal } from "@/components/Reveal";
import { Chip, Section } from "@/components/Section";

export function Skills() {
  return (
    <Section id="skills" index="04" title="Skills">
      <dl className="divide-y divide-line">
        {skillGroups.map((group) => (
          <Reveal key={group.name} className="grid gap-3 py-5 first:pt-0 md:grid-cols-12 md:gap-8">
            <dt className="text-sm font-medium md:col-span-3">{group.name}</dt>
            <dd className="flex flex-wrap gap-2 md:col-span-9">
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
