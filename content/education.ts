export interface Institution {
  name: string;
  url: string;
  logo: string;
}

export interface Degree {
  name: string;
  icon: "microscope" | "graduation-cap";
  timeframe: string;
  institution: Institution;
  courses?: string[];
}

export const degrees: Degree[] = [
  {
    name: "Master of Science - MS, Artificial Intelligence (AI) and Machine Learning",
    icon: "microscope",
    timeframe: "2024-2025",
    institution: {
      name: "University of Birmingham",
      url: "https://www.birmingham.ac.uk/",
      logo: "/images/education/uob.png",
    },
    courses: [
      "Natural language Processing",
      "Computer Vision and Imaging",
      "Robot Vision",
      "Current Topics in Artificial Intelligence and Machine Learning",
    ],
  },
  {
    name: "B.Sc. in Biomedical Engineering",
    icon: "graduation-cap",
    timeframe: "2018-2022",
    institution: {
      name: "International University - VNU-HCM",
      url: "https://hcmiu.edu.vn/en/students/international-students/",
      logo: "/images/education/iu.png",
    },
  },
];
