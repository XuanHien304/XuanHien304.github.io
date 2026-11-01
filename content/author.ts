export interface ContactInfo {
  email: string;
  github: string;
  linkedin: string;
}

export interface AuthorInfo {
  name: string;
  nickname: string;
  image: string;
  location: string;
  tagline: string;
  intro: string;
  contactInfo: ContactInfo;
}

export const author: AuthorInfo = {
  name: "Vu Xuan Hien",
  nickname: "Hien",
  image: "/images/site/ava.png",
  location: "UK",
  tagline: "A machine learning adventure",
  intro:
    "I build machine learning and LLM systems that hold up in production. Scroll down and I'll walk you through how I got here.",
  contactInfo: {
    email: "vuxuanhien304@gmail.com",
    github: "XuanHien304",
    linkedin: "vu-xuan-hien-83b9961b6/",
  },
};
