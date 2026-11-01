import Link from "next/link";

interface JournalHeaderProps {
  title: string;
  description: string;
  back: { href: string; label: string };
}

// Page header shared by the journal hub and the static journal areas.
export function JournalHeader({ title, description, back }: JournalHeaderProps) {
  return (
    <header>
      <Link href={back.href} className="font-term text-xl text-subtle hover:text-accent">
        ◀ {back.label}
      </Link>
      <p className="mt-8 font-pixel text-[10px] text-accent">LOGBOOK</p>
      <h1 className="mt-3 font-pixel text-lg leading-relaxed sm:text-2xl sm:leading-relaxed">{title}</h1>
      <p className="mt-3 max-w-xl leading-relaxed text-muted">{description}</p>
    </header>
  );
}
