import Link from "next/link";
import { author } from "@/content/author";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { NavLink } from "@/components/layout/NavLink";
import { Character } from "@/components/pixel/Character";

// In page order.
export const NAV_LINKS = [
  { href: "/#journey", label: "Journey" },
  { href: "/#projects", label: "Quests" },
  { href: "/#skills", label: "Skills" },
  { href: "/#journal", label: "Journal" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b-4 border-[var(--pixel)] bg-canvas">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-2" aria-label="Main">
        <Link href="/" className="flex items-center gap-2 font-pixel text-[10px]">
          <Character outfit="tee" scale={2} />
          {author.nickname.toUpperCase()}
        </Link>
        <div className="hidden items-center gap-6 font-pixel text-[10px] md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href} className="py-3 uppercase transition-colors hover:text-accent">
              {link.label}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <MobileMenu links={NAV_LINKS} />
        </div>
      </nav>
    </header>
  );
}
