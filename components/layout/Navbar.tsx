import Image from "next/image";
import Link from "next/link";
import { author } from "@/content/author";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MobileMenu } from "@/components/layout/MobileMenu";

export const NAV_LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#education", label: "Education" },
  { href: "/journal/", label: "Journal" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3" aria-label="Main">
        <Link href="/" className="flex items-center gap-2.5 text-sm font-semibold tracking-tight">
          <Image
            src="/images/site/logo.png"
            alt=""
            width={28}
            height={28}
            className="rounded-full"
            style={{ width: 28, height: 28 }}
          />
          {author.name}
        </Link>
        <div className="hidden items-center gap-6 text-sm text-muted md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors duration-200 hover:text-fg">
              {link.label}
            </Link>
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
