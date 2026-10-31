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
  headline: string;
  current: { role: string; company: string };
  contactInfo: ContactInfo;
  summary: string[];
}

export const author: AuthorInfo = {
  name: "Vu Xuan Hien",
  nickname: "Hien",
  image: "/images/site/ava.png",
  location: "United Kingdom",
  headline: "I build machine learning and LLM systems that hold up in production.",
  current: { role: "Machine Learning Engineer", company: "GE Vernova" },
  contactInfo: {
    email: "vuxuanhien304@gmail.com",
    github: "XuanHien304",
    linkedin: "vu-xuan-hien-83b9961b6/",
  },
  summary: [
    "Machine Learning Engineer with experience building and deploying ML systems end to end, from large-scale data pipelines and feature engineering to model deployment, monitoring and scaling.",
    "I've shipped LLM-powered systems, credit-risk models and computer vision applications across fintech, industrial and enterprise settings.",
  ],
};
