import { FiArrowUpRight } from "react-icons/fi";
import { site } from "@/content/site";
import { author } from "@/content/author";
import { Reveal } from "@/components/Reveal";
import { SocialLinks } from "@/components/layout/SocialLinks";

export function Footer() {
  return (
    <footer id="contact" className="mx-auto max-w-5xl px-6">
      <div className="border-t border-line py-20 sm:py-24">
        <Reveal>
          <p className="font-mono text-xs text-accent">06</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Building something with ML or LLMs? Let&apos;s talk.
          </h2>
          <a
            href={`mailto:${author.contactInfo.email}`}
            className="mt-8 inline-flex min-h-11 items-center gap-2 text-lg font-medium text-accent underline-offset-4 hover:underline"
          >
            {author.contactInfo.email} <FiArrowUpRight size={18} aria-hidden />
          </a>
        </Reveal>
        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-4 text-sm text-subtle sm:flex-row sm:items-center">
          <p>{site.copyright}</p>
          <SocialLinks className="-ml-3 sm:ml-0 sm:-mr-3" />
        </div>
      </div>
    </footer>
  );
}
