import Image from "next/image";
import { FaGraduationCap, FaMicroscope } from "react-icons/fa";
import { degrees } from "@/content/education";

const ICONS = { microscope: FaMicroscope, "graduation-cap": FaGraduationCap };

export function Education() {
  return (
    <section id="education" className="mx-auto max-w-3xl px-6 py-16">
      <h2 className="mb-6 text-2xl font-semibold">Education</h2>
      <div className="flex flex-col gap-6">
        {degrees.map((degree) => {
          const Icon = ICONS[degree.icon];
          return (
            <div
              key={degree.name}
              className="flex gap-4 rounded-xl border border-black/10 p-5 dark:border-white/10"
            >
              <Image
                src={degree.institution.logo}
                alt={degree.institution.name}
                width={48}
                height={48}
                className="shrink-0 rounded-lg"
                style={{ width: 48, height: 48, objectFit: "contain" }}
              />
              <div>
                <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-black/50 dark:text-white/50">
                  <Icon size={12} /> {degree.timeframe}
                </p>
                <h3 className="font-semibold">{degree.name}</h3>
                <a
                  href={degree.institution.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-black/60 hover:underline dark:text-white/60"
                >
                  {degree.institution.name}
                </a>
                {degree.courses && (
                  <ul className="mt-2 list-inside list-disc text-sm text-black/60 dark:text-white/60">
                    {degree.courses.map((course) => (
                      <li key={course}>{course}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
