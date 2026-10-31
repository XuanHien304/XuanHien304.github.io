import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { about } from "@/content/about";

const ICONS = { email: FaEnvelope, github: FaGithub, linkedin: FaLinkedin };

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {about.socialLinks.map((link) => {
        const Icon = ICONS[link.icon];
        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.name}
            className="flex h-11 w-11 items-center justify-center rounded-full text-subtle transition-colors duration-200 hover:text-fg"
          >
            <Icon size={18} />
          </a>
        );
      })}
    </div>
  );
}
