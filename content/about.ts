export interface SocialLink {
  name: string;
  icon: "email" | "github" | "linkedin";
  url: string;
}

export interface AboutInfo {
  designation: string;
  resume: string;
  socialLinks: SocialLink[];
}

export const about: AboutInfo = {
  designation: "Machine Learning Engineer",
  resume: "/files/resume.pdf",
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
