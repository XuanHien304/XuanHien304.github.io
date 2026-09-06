export interface ContactInfo {
  email: string;
  phone: string;
  github: string;
  linkedin: string;
}

export interface AuthorInfo {
  name: string;
  nickname: string;
  greeting: string;
  image: string;
  contactInfo: ContactInfo;
  summary: string[];
}

export const author: AuthorInfo = {
  name: "Vu Xuan Hien",
  nickname: "Hien",
  greeting: "Hi, I am",
  image: "/images/site/ava.png",
  contactInfo: {
    email: "vuxuanhien304@gmail.com",
    phone: "+447516786651",
    github: "XuanHien304",
    linkedin: "vu-xuan-hien-83b9961b6/",
  },
  summary: ["I am a noob Developer"],
};
