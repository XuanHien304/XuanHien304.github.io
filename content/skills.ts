export interface SkillFilter {
  name: string;
  filter: string;
}

export interface Skill {
  name: string;
  logo: string;
  summary: string;
  categories: string[];
  url?: string;
}

// NOTE: carried over as-is from the old Hugo `skills.yaml`. Some skills use
// category tags ("basic", "cloud", "framework") that have no corresponding
// filter button below (e.g. AWS is "cloud" only, so it never appears under
// any filter but "All") -- an existing content quirk, not something this
// migration fixes.
export const skillFilters: SkillFilter[] = [
  { name: "All", filter: "all" },
  { name: "Machine Learning", filter: "machine-learning" },
  { name: "Language", filter: "language" },
  { name: "Container", filter: "container" },
  { name: "Others", filter: "others" },
];

export const skills: Skill[] = [
  {
    name: "Docker",
    logo: "/images/skills/docker.svg",
    summary:
      "Write most of the programs as dockerized container. Experienced with multi-stage, multi-arch build process.",
    categories: ["container"],
    url: "https://www.docker.com/",
  },
  {
    name: "Linux",
    logo: "/images/skills/linux.png",
    summary: "Using as the main operating system. Capable of writing bash/shell scripts.",
    categories: ["others"],
  },
  {
    name: "Git",
    logo: "/images/skills/git.png",
    summary:
      "Experienced with git-based development. Mostly, use Github. Also, have experience in working with GitLab.",
    categories: ["basic", "others"],
    url: "https://git-scm.com/",
  },
  {
    name: "Python",
    logo: "/images/skills/python.svg",
    summary:
      "Proficient in Python programming, especially for system-level development and machine learning problem-solving.",
    categories: ["basic", "language"],
  },
  {
    name: "C",
    logo: "/images/skills/c.png",
    summary: "Know basic C programming. Used for contest programming and problem solving.",
    categories: ["basic", "language"],
  },
  {
    name: "AWS",
    logo: "/images/skills/aws.svg",
    summary:
      "Familiar with core AWS services like EC2, S3, Lambda, and IAM. Experienced in deploying and managing cloud-based applications.",
    categories: ["cloud"],
    url: "https://aws.amazon.com/",
  },
  {
    name: "PyTorch",
    logo: "/images/skills/pytorch.svg",
    summary:
      "Used for deep learning and AI projects. Experienced in model training, fine-tuning, and deploying neural networks.",
    categories: ["machine-learning", "framework"],
    url: "https://pytorch.org/",
  },
  {
    name: "TensorFlow",
    logo: "/images/skills/tensorflow.svg",
    summary:
      "Worked on machine learning models using TensorFlow and Keras. Experienced in model optimization and deployment.",
    categories: ["machine-learning"],
    url: "https://www.tensorflow.org/",
  },
  {
    name: "Apache Spark",
    logo: "/images/skills/spark.png",
    summary:
      "Experienced in large-scale data processing using Spark. Worked with PySpark for ETL and machine learning pipelines.",
    categories: ["others"],
    url: "https://spark.apache.org/",
  },
  {
    name: "Apache Airflow",
    logo: "/images/skills/airflow.svg",
    summary:
      "Used for workflow automation and data pipeline orchestration. Familiar with DAG creation and scheduling.",
    categories: ["others"],
    url: "https://airflow.apache.org/",
  },
];
