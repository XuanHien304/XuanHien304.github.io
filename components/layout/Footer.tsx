import { site } from "@/content/site";
import { author } from "@/content/author";
import { Reveal } from "@/components/Reveal";
import { SocialLinks } from "@/components/layout/SocialLinks";

export function Footer() {
  return (
    <footer id="contact" className="mx-auto max-w-5xl px-6 pb-16 pt-12">
      <Reveal className="pixel-card bg-card px-6 py-12 text-center sm:px-12">
        <p className="font-pixel text-[10px] text-accent">SAVE POINT</p>
        <h2 className="mt-4 font-pixel text-lg leading-relaxed sm:text-2xl sm:leading-relaxed">Thanks for playing!</h2>
        <p className="mx-auto mt-5 max-w-lg leading-relaxed text-muted">
          Building something with ML or LLMs? I&apos;d love to hear about it.
        </p>
        <a href={`mailto:${author.contactInfo.email}`} className="pixel-btn mt-8 bg-accent text-on-accent">
          ▶ Say hello
        </a>
        <SocialLinks className="mt-6 justify-center" />
      </Reveal>
      <p className="mt-10 text-center font-term text-lg text-subtle">{site.copyright}</p>
    </footer>
  );
}
