import Image from "next/image";
import { FiAward } from "react-icons/fi";
import { certifications, degrees } from "@/content/education";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

export function Education() {
  return (
    <Section id="education" index="05" title="Education">
      <div className="divide-y divide-line">
        {degrees.map((degree) => (
          <Reveal key={degree.name} className="grid gap-4 py-8 first:pt-0 md:grid-cols-12 md:gap-8">
            <p className="font-mono text-xs text-subtle md:col-span-3 md:pt-1">{degree.timeframe}</p>
            <div className="flex gap-4 md:col-span-9">
              <Image
                src={degree.institution.logo}
                alt=""
                width={44}
                height={44}
                className="shrink-0 rounded-lg border border-line bg-white p-1"
                style={{ width: 44, height: 44, objectFit: "contain" }}
              />
              <div>
                <h3 className="font-semibold tracking-tight">
                  {degree.name}
                  {degree.honours && (
                    <span className="ml-2 align-middle rounded-md bg-accent-soft px-2 py-0.5 font-mono text-xs font-medium text-accent">
                      {degree.honours}
                    </span>
                  )}
                </h3>
                <a
                  href={degree.institution.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted underline-offset-4 hover:underline"
                >
                  {degree.institution.name}
                </a>
                {degree.focus && <p className="mt-3 text-sm text-fg">{degree.focus}</p>}
                {degree.courses && (
                  <p className="mt-2 text-sm leading-relaxed text-subtle">{degree.courses.join(" · ")}</p>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-14 grid gap-4 md:grid-cols-12 md:gap-8">
        <h3 className="text-sm font-medium md:col-span-3">Certifications</h3>
        <ul className="space-y-3 md:col-span-9">
          {certifications.map((cert) => (
            <li key={cert.name} className="flex items-start gap-3 text-sm">
              <FiAward size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />
              <span>
                <span className="font-medium">{cert.name}</span>
                <span className="text-subtle">
                  {" "}
                  · {cert.issuer}
                  {cert.year && `, ${cert.year}`}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
