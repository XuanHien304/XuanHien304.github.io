export interface SocialLink {
  name: string;
  icon: "email" | "github" | "linkedin";
  url: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface AboutInfo {
  designation: string;
  resume: string;
  paragraphs: string[];
  stats: Stat[];
  socialLinks: SocialLink[];
}

export const about: AboutInfo = {
  designation: "Machine Learning Engineer",
  resume: "/files/resume.pdf",
  paragraphs: [
    "I work across the full model lifecycle: shaping messy data into reliable features, training and evaluating models, and running them in production with the monitoring to know when they drift. Most of my day-to-day is Python, PyTorch, Spark and AWS.",
    "Right now I'm at GE Vernova building retrieval-augmented assistants and tool-using agents for engineers. Before that I worked on alternative-data credit scoring in fintech, and on computer vision and document AI for enterprise clients. My MSc research at the University of Birmingham focused on safety in LLM-based agents.",
    "Outside of work I play sports and have recently taken up calisthenics.",
  ],
  stats: [
    { value: "59 → 70%", label: "RAG precision@5 after retrieval redesign" },
    { value: "10B+", label: "daily telco records in feature pipelines" },
    { value: "73 → 93%", label: "OCR accuracy with synthetic handwriting" },
    { value: "~15", label: "engineers served by the LLM gateway I run" },
  ],
  socialLinks: [
    { name: "Email", icon: "email", url: "mailto:vuxuanhien304@gmail.com" },
    { name: "GitHub", icon: "github", url: "https://www.github.com/XuanHien304" },
    {
      name: "LinkedIn",
      icon: "linkedin",
      url: "https://www.linkedin.com/in/vu-xuan-hien-83b9961b6/",
    },
  ],
};
