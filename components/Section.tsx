import { Reveal } from "@/components/Reveal";

interface SectionProps {
  id: string;
  // Small game-style label above the title, e.g. "QUEST LOG".
  kicker: string;
  title: string;
  children: React.ReactNode;
}

export function Section({ id, kicker, title, children }: SectionProps) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
      <Reveal>
        <header className="mb-10 sm:mb-12">
          <p className="font-pixel text-[10px] text-accent">{kicker}</p>
          <h2 className="mt-3 font-pixel text-lg leading-relaxed sm:text-2xl sm:leading-relaxed">{title}</h2>
        </header>
      </Reveal>
      {children}
    </section>
  );
}

// An inventory-style slot for tech names.
export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="pixel-border inline-flex items-center bg-card px-2 py-1 font-term text-lg leading-none">
      {children}
    </span>
  );
}
