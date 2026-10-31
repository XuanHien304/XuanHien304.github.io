export interface SkillGroup {
  name: string;
  items: string[];
}

// Grouped to mirror the CV. The old Hugo-era logo cards and filter tags were
// dropped in favour of these categories.
export const skillGroups: SkillGroup[] = [
  {
    name: "LLM & Agents",
    items: ["RAG", "OpenAI Agents SDK", "MCP", "LangChain", "LangGraph", "LiteLLM", "Ragas", "Chroma", "Pinecone"],
  },
  {
    name: "Machine Learning",
    items: [
      "PyTorch",
      "TensorFlow",
      "scikit-learn",
      "CatBoost",
      "Transformers",
      "Feature engineering",
      "Drift monitoring",
    ],
  },
  {
    name: "MLOps & Cloud",
    items: ["AWS", "Azure", "GCP", "FastAPI", "Docker", "Kubernetes", "MLflow", "DVC", "Airflow", "CI/CD", "Grafana"],
  },
  {
    name: "Data",
    items: ["SQL", "Spark", "Kafka", "HDFS", "PostgreSQL", "MongoDB"],
  },
  {
    name: "Programming",
    items: ["Python", "C", "Java", "R", "Git", "Linux"],
  },
];
