import Image from "next/image";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import { author } from "@/content/author";
import { about } from "@/content/about";
import { Reveal } from "@/components/Reveal";
import { SocialLinks } from "@/components/layout/SocialLinks";

export function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-20 pt-14 sm:pb-28 sm:pt-24">
      <Reveal>
        <div className="flex items-center gap-4">
          <Image
            src={author.image}
            alt={author.name}
            width={56}
            height={56}
            priority
            className="rounded-full border border-line"
            style={{ width: 56, height: 56, objectFit: "cover" }}
          />
          <div>
            <p className="font-semibold">{author.name}</p>
            <p className="font-mono text-xs text-subtle">
              {about.designation} · {author.location}
            </p>
          </div>
        </div>

        <h1 className="mt-10 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl md:text-6xl">
          {author.headline}
        </h1>

        <div className="mt-8 max-w-2xl space-y-3 text-lg leading-relaxed text-muted text-pretty">
          {author.summary.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <p className="mt-8 flex items-start gap-2.5 text-sm text-muted">
          <span className="relative mt-1.5 flex h-2 w-2 shrink-0" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span>
            Currently {author.current.role} at{" "}
            <span className="font-medium text-fg">{author.current.company}</span>
          </span>
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#experience"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-canvas transition-opacity duration-200 hover:opacity-85"
          >
            View experience <FiArrowRight size={15} aria-hidden />
          </a>
          <a
            href={about.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-5 text-sm font-medium transition-colors duration-200 hover:border-fg/40"
          >
            <FiDownload size={15} aria-hidden /> Download CV
          </a>
          <SocialLinks className="ml-1" />
        </div>
      </Reveal>
    </section>
  );
}
