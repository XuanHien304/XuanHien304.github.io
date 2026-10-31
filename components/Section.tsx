import { Reveal } from "@/components/Reveal";

interface SectionProps {
  id: string;
  index: string;
  title: string;
  children: React.ReactNode;
}

export function Section({ id, index, title, children }: SectionProps) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-6">
      <div className="border-t border-line py-20 sm:py-24">
        <Reveal>
          <header className="mb-10 flex items-baseline gap-3 sm:mb-12">
            <span className="font-mono text-xs text-accent">{index}</span>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-line px-2 py-0.5 font-mono text-xs text-subtle">
      {children}
    </span>
  );
}
