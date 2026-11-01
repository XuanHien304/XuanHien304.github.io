import type { OutfitId } from "@/components/pixel/characterArt";

export interface Chapter {
  id: string;
  years: string;
  place: string;
  title: string;
  story: string;
  highlight?: { value: string; label: string };
  link?: { href: string; label: string };
  // Level colour: path, node and the character's outline flash.
  color: string;
  outfit: {
    id: OutfitId;
    label: string;
    // What the character says when this level starts.
    says: string;
    // AI-made sprite sheet, e.g. "/images/journey/student.png". Until it
    // exists, the code-drawn sprite for `id` is used.
    sheet?: string;
  };
}

// The career told as game levels. Keep each story to 2-3 sentences; the CV
// PDF holds the full detail.
export const chapters: Chapter[] = [
  {
    id: "student",
    years: "2018 – 2022",
    place: "Ho Chi Minh City",
    title: "Where it started",
    story:
      "I studied Biomedical Engineering and found machine learning through medicine: an app that listens to coughs to flag respiratory disease, and a chatbot that answers medical questions in Vietnamese.",
    color: "#38bdf8",
    outfit: { id: "labCoat", label: "Lab coat", says: "Can a model hear a cough?" },
  },
  {
    id: "fpt",
    years: "2022 – 2024",
    place: "FPT Software",
    title: "Learning to ship",
    story:
      "My first engineering job: computer vision, recommenders and document AI for enterprise clients. Here I learned that a model isn't done until someone is using it.",
    highlight: { value: "73% → 93%", label: "OCR accuracy, from a GAN that writes Japanese by hand" },
    color: "#f97316",
    outfit: { id: "hoodie", label: "Hoodie", says: "Ship it, then make it better." },
  },
  {
    id: "datanest",
    years: "2024",
    place: "Data Nest · Fintech",
    title: "Models with money on the line",
    story:
      "Income scoring from telco data covering about 70% of Vietnam, used by lenders to automate income checks. The moment I'm proudest of: catching a label leak that was quietly inflating our AUC, before it reached production.",
    highlight: { value: "−45%", label: "manual review time for lenders" },
    color: "#22c55e",
    outfit: { id: "shirtTie", label: "Shirt & tie", says: "That AUC is too good to be true." },
  },
  {
    id: "birmingham",
    years: "2024 – 2025",
    place: "Birmingham, UK",
    title: "New country, back to school",
    story:
      "An MSc in AI and Machine Learning, finished with Distinction. My research looked at keeping LLM-based agents safe, which turned out to be exactly the problem my next job needed solving.",
    highlight: { value: "Distinction", label: "MSc AI & ML, University of Birmingham" },
    color: "#a78bfa",
    outfit: { id: "coatScarf", label: "Coat & scarf", says: "It's raining again." },
  },
  {
    id: "gevernova",
    years: "2025 – now",
    place: "GE Vernova · UK",
    title: "LLMs for engineers",
    story:
      "I build retrieval assistants and tool-using agents that let engineers drive a complex design platform in plain language, and I run the LLM gateway the team builds on.",
    highlight: { value: "59% → 70%", label: "retrieval precision@5 on the docs assistant" },
    color: "#facc15",
    outfit: { id: "hardHat", label: "Hard hat", says: "Ask it in plain English." },
  },
  {
    id: "offline",
    years: "Bonus level",
    place: "Off the clock",
    title: "And outside work",
    story:
      "Sports, calisthenics, and a journal where I write down what I'm learning, where I've travelled and what I've been playing.",
    link: { href: "/journal/", label: "Read the journal" },
    color: "#ef4444",
    outfit: { id: "training", label: "Training gear", says: "One more rep." },
  },
];
