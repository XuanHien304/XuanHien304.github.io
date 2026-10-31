export interface Role {
  company: string;
  companyUrl?: string;
  title: string;
  location: string;
  start: string;
  end: string;
  context: string;
  highlights: string[];
  stack: string[];
}

export const roles: Role[] = [
  {
    company: "GE Vernova",
    companyUrl: "https://www.gevernova.com/",
    title: "Machine Learning Engineer",
    location: "United Kingdom",
    start: "Nov 2025",
    end: "Present",
    context: "LLM systems for an in-house engineering design platform.",
    highlights: [
      "Built a RAG assistant over the platform's user guides, with structure-aware chunking for mixed docs (tables, code, YAML, images) and hybrid dense + BM25 retrieval plus a reranker. Precision@5 went from 59% to 70%, and documentation search time fell by an estimated 40%.",
      "Served it as a FastAPI service in Docker on AWS EC2 behind a load balancer with SSO, and checked answer grounding with an LLM-as-judge faithfulness rubric. User feedback led to parsing fixes and automatic re-ingestion when docs change.",
      "Designed an agent on the OpenAI Agents SDK with a custom MCP server so engineers can drive optimisation runs, datasets and ML workflows in plain language. Guardrails validate arguments and ask for confirmation before risky actions.",
      "Run the team's LLM gateway (LiteLLM, Postgres, Docker) for about 15 engineers: routing across OpenAI and Gemini, key management, per-user rate limits, and cost and latency dashboards.",
    ],
    stack: ["RAG", "OpenAI Agents SDK", "MCP", "LiteLLM", "FastAPI", "Docker", "AWS"],
  },
  {
    company: "Data Nest",
    title: "Machine Learning Engineer",
    location: "Vietnam · Fintech",
    start: "Apr 2024",
    end: "Sep 2024",
    context: "Alternative-data credit and income scoring for lenders.",
    highlights: [
      "Built a CatBoost income-scoring model on telco data covering about 70% of Vietnam's population, reaching 0.78 AUC. Lenders used it to automate income checks, cutting manual review time by about 45%.",
      "Engineered features from 10B+ daily telco records in Spark, scheduled with Airflow, which lifted precision by 10%.",
      "Caught a label leak before production: a fixed-date aggregation window captured post-default behaviour and inflated AUC. Rebuilt the features with per-customer cutoff dates.",
      "Monitored the models with Grafana drift dashboards and caught 4 drift events. Traced each to its root cause, flagged it to the business and retrained, with runs tracked in MLflow.",
    ],
    stack: ["CatBoost", "Spark", "Airflow", "MLflow", "Grafana"],
  },
  {
    company: "FPT Software",
    companyUrl: "https://fptsoftware.com/",
    title: "AI Engineer",
    location: "Vietnam",
    start: "Sep 2022",
    end: "Apr 2024",
    context: "Computer vision, recommendation and document AI for enterprise clients.",
    highlights: [
      "Developed a video understanding system for human tracking and action recognition, combining pose estimation and an LSTM on top of a pre-trained vision-language model. It reached 96% accuracy across 3 action classes on a client test set.",
      "Designed a learning-path recommender using hybrid collaborative filtering and knowledge tracing. Course completion and time on platform rose about 30% the following semester.",
      "Trained a GAN to generate Japanese handwriting from printed text as synthetic OCR training data, raising OCR accuracy from 73% to 93%.",
      "Integrated LangChain RAG and custom OCR models into a chatbot for Japanese document search and summarisation, deployed for a client company.",
    ],
    stack: ["PyTorch", "Computer Vision", "GANs", "Recommender Systems", "LangChain"],
  },
];
