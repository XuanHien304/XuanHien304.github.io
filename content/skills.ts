import type { IconType } from "react-icons";
import {
  SiApacheairflow,
  SiApachehadoop,
  SiApachekafka,
  SiApachespark,
  SiC,
  SiDocker,
  SiDvc,
  SiFastapi,
  SiGit,
  SiGithubactions,
  SiGooglecloud,
  SiGrafana,
  SiHuggingface,
  SiKubernetes,
  SiLangchain,
  SiLinux,
  SiMlflow,
  SiModelcontextprotocol,
  SiMongodb,
  SiOpenjdk,
  SiPostgresql,
  SiPython,
  SiPytorch,
  SiR,
  SiScikitlearn,
  SiTensorflow,
} from "react-icons/si";

export interface Skill {
  name: string;
  // Logo shown in the inventory slot. Without one, the slot shows `short`.
  icon?: IconType;
  short?: string;
  // One line for the item card. Keep it to what the CV backs up.
  note: string;
  // Journey chapter ids where this was used (see content/journey.ts).
  foundIn?: string[];
}

export interface SkillGroup {
  name: string;
  // Tab label in the inventory, in the pixel font.
  tab: string;
  items: Skill[];
}

// Grouped to mirror the CV's skills section.
export const skillGroups: SkillGroup[] = [
  {
    name: "LLM & Agents",
    tab: "LLM",
    items: [
      {
        name: "RAG",
        short: "RAG",
        note: "Hybrid retrieval (dense + BM25) with a reranker for an engineering docs assistant, and a Japanese document chatbot before that.",
        foundIn: ["fpt", "gevernova"],
      },
      {
        name: "OpenAI Agents SDK",
        short: "SDK",
        note: "An agent that runs a design platform in plain language, with guardrails that ask before risky actions.",
        foundIn: ["gevernova"],
      },
      {
        name: "MCP",
        icon: SiModelcontextprotocol,
        note: "A custom MCP server that exposes optimisation runs, datasets and ML workflows as tools.",
        foundIn: ["gevernova"],
      },
      {
        name: "LiteLLM",
        short: "LLM",
        note: "The team's LLM gateway for about 15 engineers: routing across OpenAI and Gemini, per-user rate limits, cost dashboards.",
        foundIn: ["gevernova"],
      },
      {
        name: "LangChain",
        icon: SiLangchain,
        note: "RAG and custom OCR models wired into a chatbot for Japanese document search.",
        foundIn: ["fpt"],
      },
      { name: "LangGraph", short: "LG", note: "Agent workflows as graphs of steps and tools." },
      { name: "Ragas", short: "RGS", note: "Measuring how well a RAG pipeline retrieves and stays grounded." },
      { name: "Chroma", short: "CHR", note: "Vector store for retrieval." },
      { name: "Pinecone", short: "PC", note: "Managed vector database for retrieval." },
    ],
  },
  {
    name: "Machine Learning",
    tab: "ML",
    items: [
      { name: "PyTorch", icon: SiPytorch, note: "My main deep learning framework." },
      { name: "TensorFlow", icon: SiTensorflow, note: "Deep learning framework." },
      { name: "scikit-learn", icon: SiScikitlearn, note: "Classic ML, baselines and evaluation." },
      {
        name: "CatBoost",
        short: "CB",
        note: "An income-scoring model on telco data covering about 70% of Vietnam, at 0.78 AUC.",
        foundIn: ["datanest"],
      },
      { name: "Transformers", icon: SiHuggingface, note: "Pre-trained language and vision models." },
      {
        name: "Feature engineering",
        short: "FE",
        note: "Features from 10B+ daily telco records, lifting precision by 10%.",
        foundIn: ["datanest"],
      },
      {
        name: "Drift monitoring",
        short: "DRF",
        note: "Caught 4 drift events in production, traced each to its root cause and retrained.",
        foundIn: ["datanest"],
      },
    ],
  },
  {
    name: "MLOps & Cloud",
    tab: "MLOPS",
    items: [
      {
        name: "AWS",
        short: "AWS",
        note: "AWS Certified Solutions Architect – Associate (2024). Runs the docs assistant on EC2 behind a load balancer with SSO.",
        foundIn: ["gevernova"],
      },
      { name: "Azure", short: "AZ", note: "Cloud platform." },
      { name: "GCP", icon: SiGooglecloud, note: "Cloud platform." },
      {
        name: "FastAPI",
        icon: SiFastapi,
        note: "Serves the RAG assistant as an API.",
        foundIn: ["gevernova"],
      },
      {
        name: "Docker",
        icon: SiDocker,
        note: "Packages the RAG service and the LLM gateway.",
        foundIn: ["gevernova"],
      },
      { name: "Kubernetes", icon: SiKubernetes, note: "Container orchestration." },
      {
        name: "MLflow",
        icon: SiMlflow,
        note: "Tracked retraining runs for the scoring models.",
        foundIn: ["datanest"],
      },
      { name: "DVC", icon: SiDvc, note: "Versioning data and models alongside code." },
      {
        name: "Airflow",
        icon: SiApacheairflow,
        note: "Scheduled the Spark feature pipelines.",
        foundIn: ["datanest"],
      },
      { name: "CI/CD", icon: SiGithubactions, note: "Automated testing and deployment." },
      {
        name: "Grafana",
        icon: SiGrafana,
        note: "Drift dashboards for the scoring models in production.",
        foundIn: ["datanest"],
      },
    ],
  },
  {
    name: "Data",
    tab: "DATA",
    items: [
      { name: "SQL", short: "SQL", note: "Querying and shaping data, every day." },
      {
        name: "Spark",
        icon: SiApachespark,
        note: "Feature engineering over 10B+ daily telco records.",
        foundIn: ["datanest"],
      },
      { name: "Kafka", icon: SiApachekafka, note: "Streaming data pipelines." },
      { name: "HDFS", icon: SiApachehadoop, note: "Distributed storage for big data." },
      {
        name: "PostgreSQL",
        icon: SiPostgresql,
        note: "The database behind the team's LLM gateway.",
        foundIn: ["gevernova"],
      },
      { name: "MongoDB", icon: SiMongodb, note: "Document database." },
    ],
  },
  {
    name: "Programming",
    tab: "CODE",
    items: [
      {
        name: "Python",
        icon: SiPython,
        note: "The language behind almost everything here.",
        foundIn: ["student", "fpt", "datanest", "birmingham", "gevernova"],
      },
      { name: "C", icon: SiC, note: "Systems programming." },
      { name: "Java", icon: SiOpenjdk, note: "Object-oriented programming." },
      { name: "R", icon: SiR, note: "Statistics and data analysis." },
      { name: "Git", icon: SiGit, note: "Version control." },
      { name: "Linux", icon: SiLinux, note: "Day-to-day development and servers." },
    ],
  },
];
