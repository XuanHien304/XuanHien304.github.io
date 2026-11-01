"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

// A link to a section like "/#journal". On the page that holds the section it
// scrolls there itself, because a plain hash link does nothing when the URL
// already ends in that hash (click Journal, scroll up, click Journal again).
// From other pages it navigates normally.
export function NavLink({ href, className, onClick, children }: NavLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={className}
      onClick={(event) => {
        onClick?.();
        const [path, id] = href.split("#");
        const target = id && pathname === (path || "/") ? document.getElementById(id) : null;
        if (!target) return;
        event.preventDefault();
        // Follows the CSS scroll-behavior (smooth, or instant under reduced
        // motion) and scroll-padding-top for the sticky header.
        target.scrollIntoView();
        window.history.pushState(null, "", `#${id}`);
      }}
    >
      {children}
    </Link>
  );
}
