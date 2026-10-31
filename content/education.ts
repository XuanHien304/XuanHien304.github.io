export interface Institution {
  name: string;
  url: string;
  logo: string;
}

export interface Degree {
  name: string;
  timeframe: string;
  institution: Institution;
  honours?: string;
  focus?: string;
  courses?: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year?: string;
}

export const degrees: Degree[] = [
  {
    name: "MSc Artificial Intelligence and Machine Learning",
    timeframe: "2024 – 2025",
    institution: {
      name: "University of Birmingham",
      url: "https://www.birmingham.ac.uk/",
      logo: "/images/education/uob.png",
    },
    honours: "With Distinction",
    focus: "Research focus: safety in LLM-based AI agents",
    courses: [
      "Natural Language Processing",
      "Computer Vision and Imaging",
      "Robot Vision",
      "Current Topics in AI and Machine Learning",
    ],
  },
  {
    name: "BSc Biomedical Engineering",
    timeframe: "2018 – 2022",
    institution: {
      name: "International University, Vietnam National University HCMC",
      url: "https://hcmiu.edu.vn/en/students/international-students/",
      logo: "/images/education/iu.png",
    },
  },
];

export const certifications: Certification[] = [
  { name: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services", year: "2024" },
  { name: "Machine Learning DevOps Engineer", issuer: "Udacity" },
];
