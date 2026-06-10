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
    title: "Programming",
    skills: [
      "Python",
      "JavaScript",
      "C++",
      "SQL",
      "HTML5",
      "CSS3",
      "Arduino C",
    ],
    levels: [
      "ADVANCED",
      "INTERMEDIATE",
      "INTERMEDIATE",
      "INTERMEDIATE",
      "ADVANCED",
      "ADVANCED",
      "ADVANCED",
    ],
  },

  {
    title: "Frontend Development",
    skills: [
      "React.js",
      "Tailwind CSS",
      "Responsive Design",
      "DOM Manipulation",
      "JavaScript ES6+",
      "UI Development",
    ],
    levels: [
      "INTERMEDIATE",
      "INTERMEDIATE",
      "ADVANCED",
      "INTERMEDIATE",
      "INTERMEDIATE",
      "INTERMEDIATE",
    ],
  },

  {
    title: "Backend & Databases",
    skills: [
      "Node.js",
      "REST APIs",
      "MongoDB",
      "MySQL",
      "Database Design",
      "Authentication Systems",
      "Email Automation",
    ],
    levels: [
      "BEGINNER",
      "INTERMEDIATE",
      "INTERMEDIATE",
      "INTERMEDIATE",
      "INTERMEDIATE",
      "BEGINNER",
      "INTERMEDIATE",
    ],
  },

  {
    title: "AI & Data",
    skills: [
      "Generative AI",
      "Large Language Models",
      "Prompt Engineering",
      "Machine Learning",
      "Data Analytics",
      "Data Visualization",
      "Responsible AI",
      "AI Applications",
    ],
    levels: [
      "INTERMEDIATE",
      "INTERMEDIATE",
      "ADVANCED",
      "INTERMEDIATE",
      "INTERMEDIATE",
      "INTERMEDIATE",
      "INTERMEDIATE",
      "INTERMEDIATE",
    ],
  },

  {
    title: "Tools & Platforms",
    skills: [
      "Git",
      "GitHub",
      "Google Cloud",
      "Arduino",
      "VS Code",
      "Linux",
    ],
    levels: [
      "INTERMEDIATE",
      "INTERMEDIATE",
      "BEGINNER",
      "ADVANCED",
      "ADVANCED",
      "BEGINNER",
    ],
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

    github: "https://github.com/Adithyaa-Kumar/misinfo_detector",

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

    github: "https://github.com/Adithyaa-Kumar/cafe_project",

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

    github: "https://github.com/Adithyaa-Kumar/smart-grocery",

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
    title: "Full Stack Web Programming",
    organization: "Udemy",
    year: "2026",
    image: "/images/certifications/udemy_web.png",
    credentialId: "UC-a5a8c96a-c090-4740-8302-07750b3dad48",
    skills: [
      "Web Development",
      "React.js",
      "JavaScript",
      "HTML",
      "CSS",
      "Frontend Development",
      "Backend Development",
      "Full Stack Development",
    ],
    description:
      "Comprehensive full-stack web development course covering modern frontend and backend technologies. Built responsive web applications using React.js, JavaScript, HTML, CSS, and industry-standard development practices.",
  },
  {
    id: "cert-02",
    title: "Responsible AI: Applying AI Principles with Google Cloud",
    organization: "Google",
    year: "2026",
    image: "/images/certifications/google_ai_principle.png",
    credentialId: "24812771",
    skills: [
      "Artificial Intelligence",
      "Responsible AI",
      "Cloud Applications",
      "AI Ethics",
    ],
    description:
      "Learned Google's AI principles and responsible AI practices, including fairness, transparency, accountability, privacy, and ethical deployment of AI systems in cloud-based environments.",
  },
  {
    id: "cert-03",
    title: "Introduction to Large Language Models",
    organization: "Google",
    year: "2026",
    image: "/images/certifications/google_llm.png",
    credentialId: "24700089",
    skills: [
      "Large Language Models (LLM)",
      "LLMOps",
      "Prompt Engineering",
      "Generative AI",
      "Natural Language Processing",
    ],
    description:
      "Introduced to the fundamentals of Large Language Models, their architecture, applications, limitations, and operational considerations. Covered prompt engineering, LLMOps concepts, and real-world AI use cases.",
  },
  {
    id: "cert-04",
    title: "Introduction to Generative AI",
    organization: "Google",
    year: "2026",
    image: "/images/certifications/google_gen_ai.png",
    credentialId: "24681243",
    skills: [
      "Artificial Intelligence",
      "Generative AI",
      "Large Language Models (LLM)",
      "Machine Learning",
      "Prompt Engineering",
      "AI Applications",
      "Foundation Models",
    ],
    description:
      "Covered the core concepts of Generative AI, foundation models, and LLMs. Explored practical applications, use cases, and the impact of generative AI technologies across industries.",
  },
  {
    id: "cert-05",
    title: "Tata - GenAI Powered Data Analytics Job Simulation",
    organization: "Forage",
    year: "2026",
    image: "/images/certifications/tata_forage.png",
    credentialId: "FQTz4YcKMKKyB2iH3",
    skills: [
      "Artificial Intelligence",
      "AI Analytics",
      "Data Analytics",
      "Data Visualization",
      "Business Intelligence",
      "Generative AI",
      "Problem Solving",
      "Data Interpretation",
    ],
    description:
      "Completed a virtual job simulation focused on GenAI-powered data analytics. Applied AI tools to analyze datasets, generate insights, support business decision-making, and communicate findings effectively.",
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
    href: "https://github.com/Adithyaa-Kumar",
  },
  {
    icon: "linkedin",
    label: "LINKEDIN",
    value: "linkedin.com/in/adithyaak",
    href: "https://www.linkedin.com/in/adithyaa-k-a496b03ba/",
  },
];