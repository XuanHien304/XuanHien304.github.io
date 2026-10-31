interface RevealProps {
  children: React.ReactNode;
  className?: string;
}

// Subtle fade-up as the block scrolls into view, driven purely by CSS
// scroll timelines (see [data-reveal] in app/globals.css). Content is never
// hidden behind JS: browsers without scroll timelines, or visitors who
// prefer reduced motion, just get the static block.
export function Reveal({ children, className }: RevealProps) {
  return (
    <div data-reveal className={className}>
      {children}
    </div>
  );
}
