import Image from "next/image";
import { author } from "@/content/author";
import { about } from "@/content/about";

export function Hero() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-20 text-center">
      <Image
        src={author.image}
        alt={author.name}
        width={140}
        height={140}
        className="rounded-full border border-black/10 dark:border-white/10"
        style={{ width: 140, height: 140, objectFit: "cover" }}
      />
      <div>
        <p className="text-lg text-black/60 dark:text-white/60">{author.greeting}</p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{author.name}</h1>
        <p className="mt-2 text-lg font-medium text-black/70 dark:text-white/70">{about.designation}</p>
      </div>
      <p className="max-w-2xl text-balance text-black/60 dark:text-white/60">{author.summary.join(" ")}</p>
    </section>
  );
}
