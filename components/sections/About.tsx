import { about } from "@/content/about";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-3xl px-6 py-16">
      <h2 className="mb-6 text-2xl font-semibold">About</h2>
      <p className="leading-relaxed text-black/70 dark:text-white/70">{about.summary}</p>
      <a
        href={about.resume}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block rounded-full bg-black px-5 py-2 text-sm font-medium text-white hover:opacity-90 dark:bg-white dark:text-black"
      >
        Download Resume
      </a>
    </section>
  );
}
