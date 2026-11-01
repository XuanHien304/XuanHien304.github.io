import Link from "next/link";
import { comingSoonAreas, journalAreas } from "@/content/journal";
import { JournalHeader } from "@/components/journal/JournalHeader";

export default function JournalHubPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-12 pt-16">
      <JournalHeader
        title="Journals"
        description="A running record, by subject."
        back={{ href: "/#journal", label: "Back to the logbook" }}
      />

      <ul className="mt-10 grid gap-6">
        {journalAreas.map((area) => (
          <li key={area.slug}>
            <Link
              href={`/journal/${area.slug}/`}
              className="pixel-card flex items-center justify-between gap-4 bg-card px-5 py-4 transition-colors hover:bg-accent-soft"
            >
              <span>
                <span className="block font-pixel text-xs leading-relaxed">{area.name}</span>
                <span className="mt-1 block text-sm leading-relaxed text-muted">{area.description}</span>
              </span>
              <span aria-hidden className="font-pixel text-xs text-accent">
                ▶
              </span>
            </Link>
          </li>
        ))}
        {comingSoonAreas.map((name) => (
          <li
            key={name}
            className="flex items-center justify-between gap-4 border-4 border-dashed border-line px-5 py-4 text-subtle"
          >
            <span className="font-pixel text-xs leading-relaxed">{name}</span>
            <span className="font-term text-lg">LOCKED</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
