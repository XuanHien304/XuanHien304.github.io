import { author } from "@/content/author";
import { about } from "@/content/about";
import { Character } from "@/components/pixel/Character";
import { SocialLinks } from "@/components/layout/SocialLinks";

const MENU = [
  { href: "#journey", label: "Start journey" },
  { href: about.resume, label: "Download CV", external: true },
  { href: "#contact", label: "Contact" },
];

export function Hero() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center px-6 pb-24 pt-16 text-center sm:pt-24">
      <p className="font-term text-xl text-subtle">{author.tagline}</p>
      <h1 className="mt-5 font-pixel text-2xl leading-snug sm:text-4xl sm:leading-snug">{author.name}</h1>
      <p className="mt-4 font-pixel text-[10px] leading-relaxed text-accent sm:text-xs">
        {about.designation} · {author.location}
      </p>

      <div className="mt-12 flex flex-col items-center">
        <div className="idle-bob">
          <Character outfit="tee" scale={7} />
        </div>
        {/* ground shadow under the character */}
        <div className="mt-1 h-2 w-20 bg-[var(--pixel-shadow)]" aria-hidden />
      </div>

      <p className="mt-10 max-w-xl text-lg leading-relaxed text-muted text-pretty">{author.intro}</p>

      <nav aria-label="Start" className="mt-10 flex flex-col items-start gap-1">
        {MENU.map((item) => (
          <a
            key={item.label}
            href={item.href}
            {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group flex min-h-11 items-center gap-3 font-pixel text-xs uppercase transition-colors hover:text-accent focus-visible:text-accent"
          >
            <span className="invisible text-accent group-hover:visible group-focus-visible:visible" aria-hidden>
              ▶
            </span>
            {item.label}
          </a>
        ))}
      </nav>

      <SocialLinks className="mt-8" />

      <p className="blink mt-12 font-pixel text-[10px] text-subtle" aria-hidden>
        ▼ SCROLL TO PLAY ▼
      </p>
    </section>
  );
}
