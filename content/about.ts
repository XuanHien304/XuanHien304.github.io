export interface SocialLink {
  name: string;
  icon: "email" | "github" | "linkedin";
  url: string;
}

export interface AboutInfo {
  designation: string;
  resume: string;
  summary: string;
  socialLinks: SocialLink[];
}

export const about: AboutInfo = {
  designation: "Machine Learning Engineer",
  resume: "/files/resume.pdf",
  summary:
    "I am a passionate Machine Learning Engineer with experience in developing and deploying AI solutions for real-world applications. Currently, I'm especially focused on Large Language Models (LLMs) and their practical applications. I'll be updating my portfolio soon with my latest projects in this area. Outside of works, I enjoy playing sports and have recently started practicing calisthenics as part of my fitness journey.",
  socialLinks: [
    { name: "Email", icon: "email", url: "mailto:vuxuanhien304@gmail.com" },
    { name: "Github", icon: "github", url: "https://www.github.com/XuanHien304" },
    {
      name: "LinkedIn",
      icon: "linkedin",
      url: "https://www.linkedin.com/in/vu-xuan-hien-83b9961b6/",
    },
  ],
};
