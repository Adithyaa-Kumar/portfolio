import type {
  Project,
  Education,
  Certification,
  SkillCategory,
  SectionMeta,
} from "@/types";

// ─── Sections ─────────────────────────────────────────────────────────────────

export const SECTIONS: SectionMeta[] = [
  { id: "hero", index: 0, label: "HOME", systemLabel: "00 / HOME" },
  { id: "about", index: 1, label: "ABOUT", systemLabel: "01 / ABOUT" },
  { id: "education", index: 2, label: "EDUCATION", systemLabel: "02 / EDUCATION" },
  { id: "skills", index: 3, label: "SKILLS", systemLabel: "03 / SKILLS" },
  { id: "projects", index: 4, label: "PROJECTS", systemLabel: "04 / PROJECTS" },
  { id: "certifications", index: 5, label: "CERTIFICATIONS", systemLabel: "05 / CERTS" },
  { id: "contact", index: 6, label: "CONTACT", systemLabel: "06 / CONTACT" },
];

// ─── Personal ─────────────────────────────────────────────────────────────────

export const PERSONAL = {
  name: "Adithyaa K",
  nameShort: "AK",
  title: "AI&ML ENGINEER",                             // REPLACE
  tagline: "Building Intelligence at the Edge",       // REPLACE
  location: "Chennai, India",                          // REPLACE
  email: "adithyaa@email.com",                      // REPLACE
  github: "https://github.com/Adithyaa-Kumar",            // REPLACE
  linkedin: "https://www.linkedin.com/in/adithyaa-k-a496b03ba/",       // REPLACE
  bio: {
    p1: "I engineer intelligent systems that sit at the intersection of machine learning, computer vision, and real-world deployment. My work focuses on building AI that doesn't just run in notebooks — it ships.", // REPLACE
    p2: "I believe the best AI systems are invisible to users and indispensable to workflows. Every model I train, every pipeline I deploy, is designed with that philosophy.",                                       // REPLACE
    p3: "When I'm not training models or optimizing inference pipelines, I'm exploring multimodal systems, generative architectures, and the edges of what current AI can do.",                                      // REPLACE
  },
  philosophy: "Engineering matters when intelligence meets execution.",
  systemStatus: "ONLINE",
  coordinates: "13.0827° N, 80.2707° E",                                  // REPLACE
  stock: "/images/stock/stock.png",
  profile: "/images/profile/adithyaa.jpg",
};

// EDUCATION
export const EDUCATION = [
  {
    title: "Secondary Education",
    institute: "Narayana Institute of Technology, Chennai",
    duration: "2020 - 2022",
    grade: "91.6%",
    status: "ARCHIVED",
  },
  {
    title: "Higher Secondary",
    institute: "Narayana Institute of Technology, Chennai",
    duration: "2022 - 2024",
    grade: "85%",
    status: "COMPLETED",
  },
  {
    title: "Undergraduate - B.Tech CSE (AI & ML)",
    institute: "Vellore Institute of Technology, Chennai",
    duration: "2024 - 2028",
    grade: "9.03 CGPA",
    status: "ACTIVE NODE",
  },
];
// ─── Skills ───────────────────────────────────────────────────────────────────

export const SKILL_GROUPS = [
  {
    title: "AI / ML",
    skills: ["PyTorch", "TensorFlow", "Scikit-Learn", "OpenCV", "LangChain", "Transformers"],
    levels: ["ADVANCED", "INTERMEDIATE", "INTERMEDIATE", "ADVANCED", "INTERMEDIATE", "BEGINNER"],
  },
  {
    title: "Frontend",
    skills: ["Next.js", "React", "TypeScript", "TailwindCSS", "Framer Motion", "GSAP"],
    levels: ["ADVANCED", "ADVANCED", "INTERMEDIATE", "ADVANCED", "INTERMEDIATE", "BEGINNER"],
  },
  {
    title: "Backend",
    skills: ["Python", "FastAPI", "Node.js", "Express", "REST APIs", "MongoDB"],
    levels: ["ADVANCED", "INTERMEDIATE", "INTERMEDIATE", "BEGINNER", "ADVANCED", "INTERMEDIATE"],
  },
  {
    title: "Tools",
    skills: ["Git", "Docker", "AWS", "Linux", "Figma", "Premiere Pro"],
    levels: ["ADVANCED", "INTERMEDIATE", "BEGINNER", "INTERMEDIATE", "BEGINNER", "BEGINNER"],
  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────

export const PROJECTS = [
  {
    id: "1",

    title: "Multi-Agent Misinformation Detection System",

    short:
      "Distributed AI agent architecture for detecting and analyzing misinformation across multimodal sources.",

    description:
      "A multi-agent intelligence system designed for misinformation detection using coordinated AI agents capable of contextual reasoning, source validation, semantic verification, and response orchestration. The architecture integrates NLP pipelines, transformer inference systems, contextual memory handling, and autonomous agent collaboration for real-time misinformation analysis across digital content streams.",

    images: [
      "/images/misinfo/1.png",
      "/images/misinfo/2.png",
      "/images/misinfo/3.png",
    ],

    github: "https://github.com/adithyaak",

    stack: [
      "Python",
      "Transformers",
      "LangChain",
      "FastAPI",
      "Vector DB",
      "Docker",
    ],

    category: "AI SYSTEMS",

    year: "2025",

    stats: [
      { label: "ARCHITECTURE", value: "MULTI-AGENT", icon: "brain" },
      { label: "REASONING", value: "CONTEXTUAL", icon: "db" },
      { label: "PIPELINE", value: "REALTIME", icon: "cpu" },
      { label: "VALIDATION", value: "SOURCE-AWARE", icon: "arrow" },
    ],
  },

  {
    id: "2",

    title: "CAFE — Context Aware Flow Embeddings",

    short:
      "Context-aware embedding framework for intelligent network packet analysis.",

    description:
      "CAFE is a network intelligence framework engineered for generating context-aware flow embeddings from packet-level network traffic. The system focuses on extracting semantic behavioral representations from flow sequences to improve traffic understanding, anomaly detection, and intelligent packet classification workflows. Designed with scalable embedding pipelines, temporal flow analysis, and efficient feature orchestration for cybersecurity and network intelligence applications.",

    images: [
      "/images/cafe/1.png",
      "/images/cafe/2.png",
      "/images/cafe/3.png",
    ],

    github: "https://github.com/adithyaak",

    stack: [
      "Python",
      "PyTorch",
      "Network Analysis",
      "Embedding Models",
      "Scikit-learn",
      "NumPy",
    ],

    category: "NETWORK INTELLIGENCE",

    year: "2025",

    stats: [
      { label: "EMBEDDINGS", value: "FLOW-AWARE", icon: "brain" },
      { label: "ANALYSIS", value: "PACKET-LEVEL", icon: "db" },
      { label: "PIPELINE", value: "SCALABLE", icon: "cpu" },
      { label: "SECURITY", value: "NETWORK AI", icon: "arrow" },
    ],
  },

  {
    id: "3",

    title: "Smart Grocery Management System",

    short:
      "Intelligent grocery tracking and automation platform for inventory optimization.",

    description:
      "A smart grocery management platform engineered to streamline inventory monitoring, product tracking, and automated management workflows through intelligent system orchestration. The platform focuses on reducing manual management overhead using structured inventory pipelines, automated updates, data-driven monitoring, and optimized user interaction systems for efficient grocery handling.",

    images: [
      "/images/grocery/1.png",
      "/images/grocery/2.png",
      "/images/grocery/3.png",
    ],

    github: "https://github.com/adithyaak",

    stack: [
      "Next.js",
      "Node.js",
      "MongoDB",
      "Express",
      "REST API",
      "JWT",
    ],

    category: "SMART PLATFORM",

    year: "2024",

    stats: [
      { label: "INVENTORY", value: "AUTOMATED", icon: "brain" },
      { label: "TRACKING", value: "REALTIME", icon: "db" },
      { label: "BACKEND", value: "API-DRIVEN", icon: "cpu" },
      { label: "WORKFLOW", value: "OPTIMIZED", icon: "arrow" },
    ],
  },
];

// ─── Certifications ──────────────────────────────────────────────────────────
export const CERTS: Certification[] = [
  {
    id: "cert-01",
    title: "Deep Learning Specialization",
    organization: "Coursera / DeepLearning.AI",
    year: "2024",
    image: "/images/certifications/cert-01.jpg",
    credentialId: "CREDENTIAL-ID-01",
    skills: ["Neural Networks", "CNNs", "RNNs", "Transformers", "Sequence Models"],
    description:
      "5-course specialization covering neural network fundamentals, convolutional networks, sequence models, and NLP applications. Built and trained deep neural networks, identified architectures suited to different problems, and implemented recurrent networks including LSTMs.",
  },
  {
    id: "cert-02",
    title: "AWS Solutions Architect",
    organization: "Amazon Web Services",
    year: "2024",
    image: "/images/certifications/cert-02.jpg",
    credentialId: "CREDENTIAL-ID-02",
    skills: ["Cloud Architecture", "EC2", "S3", "Lambda", "IAM", "VPC"],
    description:
      "Associate-level certification covering AWS core services, architecture best practices, high availability patterns, and cloud security principles. Designed distributed systems using AWS infrastructure with emphasis on cost optimization and reliability.",
  },
  {
    id: "cert-03",
    title: "Machine Learning with Python",
    organization: "IBM / Coursera",
    year: "2023",
    image: "/images/certifications/cert-03.jpg",
    credentialId: "CREDENTIAL-ID-03",
    skills: ["Scikit-learn", "Pandas", "NumPy", "ML Algorithms", "Model Evaluation"],
    description:
      "Applied machine learning covering supervised, unsupervised, and recommender systems. Implemented classification, regression, clustering, and recommendation algorithms using Python and Scikit-learn on real-world datasets.",
  },
  {
    id: "cert-04",
    title: "LangChain & LLM Development",
    organization: "DeepLearning.AI",
    year: "2024",
    image: "/images/certifications/cert-04.jpg",
    credentialId: "CREDENTIAL-ID-04",
    skills: ["LangChain", "RAG", "Agents", "Prompt Engineering", "Vector DBs"],
    description:
      "Hands-on course building LLM-powered applications using LangChain, including RAG systems and autonomous agents. Covered prompt engineering, tool use, memory systems, and deployment patterns for production LLM applications.",
  },
];

//CONTACT
export const CONTACT_DETAILS = [
  {
    icon: "mail",
    label: "EMAIL",
    value: "adithyaakumarrr@gmail.com",
    href: "mailto:adithyaakumarrr@gmail.com",
  },
  {
    icon: "location",
    label: "LOCATION",
    value: "Chennai, India",
    href: null,
  },
  {
    icon: "github",
    label: "GITHUB",
    value: "github.com/adithyaak",
    href: "https://github.com/adithyaak",
  },
  {
    icon: "linkedin",
    label: "LINKEDIN",
    value: "linkedin.com/in/adithyaak",
    href: "https://linkedin.com/in/adithyaak",
  },
];