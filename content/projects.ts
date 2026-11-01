export interface ProjectFilter {
  name: string;
  filter: string;
}

export interface Project {
  name: string;
  role: string;
  company?: string;
  timeline: string;
  summary: string;
  metric?: string;
  stack?: string[];
  tags: string[];
  featured?: boolean;
  repo?: string;
}

export const projectFilters: ProjectFilter[] = [
  { name: "All", filter: "all" },
  { name: "Professional", filter: "professional" },
  { name: "Academic", filter: "academic" },
  { name: "Hobby", filter: "hobby" },
];

export const projects: Project[] = [
  {
    name: "Documentation RAG Assistant",
    role: "Machine Learning Engineer",
    company: "GE Vernova",
    timeline: "2025 – 2026",
    summary:
      "Question answering over the user guides of an engineering design platform. Structure-aware chunking handles tables, code, YAML and images, and hybrid dense + BM25 retrieval feeds a reranker. Grounding is checked with an LLM-as-judge faithfulness rubric.",
    metric: "Precision@5 59% → 70%",
    stack: ["RAG", "BM25", "Reranking", "FastAPI", "AWS EC2"],
    tags: ["professional"],
    featured: true,
  },
  {
    name: "Natural-Language Platform Agent",
    role: "Machine Learning Engineer",
    company: "GE Vernova",
    timeline: "2026",
    summary:
      "An agent built on the OpenAI Agents SDK with a custom MCP server, so engineers can launch optimisation runs, manage datasets and run ML workflows in plain language. A planner turns each request into tool calls, and guardrails confirm risky actions first.",
    metric: "Plain language → tool calls",
    stack: ["OpenAI Agents SDK", "MCP", "Guardrails"],
    tags: ["professional"],
    featured: true,
  },
  {
    name: "Income Scoring from Telco Data",
    role: "Machine Learning Engineer",
    company: "Data Nest",
    timeline: "2024",
    summary:
      "A CatBoost income-scoring model on telco data covering about 70% of Vietnam's population, with Spark feature pipelines over 10B+ daily records and drift monitoring in production. Lenders used it to automate income checks.",
    metric: "0.78 AUC · −45% manual review",
    stack: ["CatBoost", "Spark", "Airflow", "MLflow"],
    tags: ["professional"],
    featured: true,
  },
  {
    name: "Generative Japanese Handwriting Synthesis",
    role: "AI Engineer",
    company: "FPT Software",
    timeline: "2023",
    summary:
      "A GAN that renders printed Japanese text as realistic handwriting in diverse styles. It produced synthetic training data for the OCR model.",
    metric: "OCR accuracy 73% → 93%",
    stack: ["GANs", "PyTorch", "OCR"],
    tags: ["professional"],
    featured: true,
  },
  {
    name: "Video Understanding System",
    role: "AI Engineer",
    company: "FPT Software",
    timeline: "2023",
    summary:
      "Human tracking and action recognition that combines pose estimation and an LSTM on top of a pre-trained vision-language model.",
    metric: "96% accuracy on client test set",
    tags: ["professional"],
  },
  {
    name: "Personalized Learning Path Recommendation",
    role: "AI Engineer",
    company: "FPT Software",
    timeline: "2024",
    summary:
      "A hybrid collaborative filtering and knowledge-tracing recommender that plans personalised learning paths for students.",
    metric: "~30% higher course completion",
    tags: ["professional"],
  },
  {
    name: "Vietnamese Medical Chatbot",
    role: "Developer",
    timeline: "2022",
    repo: "https://github.com/XuanHien304/Vietnamese-medical-chatbot-based",
    summary: "An NLP chatbot that answers medical questions in Vietnamese.",
    tags: ["academic", "hobby"],
  },
  {
    name: "Respiratory Disease Detection Android App",
    role: "Developer",
    timeline: "2021",
    repo: "https://github.com/XuanHien304/respiratory-disease-detection-android-app",
    summary: "A mobile app that uses ML to analyse coughing and breathing sounds.",
    tags: ["academic", "hobby"],
  },
  {
    name: "End-to-End Action Segmentation",
    role: "Developer",
    timeline: "2022",
    repo: "https://github.com/XuanHien304/E2E-Action-Segmentation",
    summary: "A model that detects and classifies activities across video frames.",
    tags: ["hobby"],
  },
  {
    name: "Natural Language Inference",
    role: "Developer",
    timeline: "2022",
    repo: "https://github.com/vnk8071/nli-end-to-end",
    summary: "A Transformer model that classifies the relationship between sentence pairs.",
    tags: ["hobby"],
  },
];
