import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Journey />
        <Projects />
        <Skills />
      </main>
      <Footer />
    </>
  );
}
