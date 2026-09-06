import Image from "next/image";
import Link from "next/link";
import { author } from "@/content/author";
import { ThemeToggle } from "@/components/ThemeToggle";

const SECTION_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#projects", label: "Projects" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur-sm dark:border-white/10 dark:bg-black/60">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image src="/images/site/logo.png" alt="" width={28} height={28} className="rounded-full" />
          {author.nickname}
        </Link>
        <div className="hidden items-center gap-6 text-sm font-medium text-black/70 sm:flex dark:text-white/70">
          {SECTION_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-black dark:hover:text-white">
              {link.label}
            </Link>
          ))}
          <Link href="/journal/" className="hover:text-black dark:hover:text-white">
            Journal
          </Link>
        </div>
        <ThemeToggle />
      </nav>
    </header>
  );
}
