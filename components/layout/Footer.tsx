import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { site } from "@/content/site";
import { about } from "@/content/about";

const ICONS = { email: FaEnvelope, github: FaGithub, linkedin: FaLinkedin };

export function Footer() {
  return (
    <footer className="border-t border-black/10 py-10 dark:border-white/10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 text-sm text-black/60 dark:text-white/60">
        <div className="flex gap-5">
          {about.socialLinks.map((link) => {
            const Icon = ICONS[link.icon];
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="hover:text-black dark:hover:text-white"
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>
        <p>{site.copyright}</p>
      </div>
    </footer>
  );
}
