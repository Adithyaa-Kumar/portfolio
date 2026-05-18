import type {
  Project,
  Education,
  Certification,
  SkillCategory,
  SectionMeta,
} from "@/types";

// ─── Sections ─────────────────────────────────────────────────────────────────

export const SECTIONS: SectionMeta[] = [
  { id: "hero",           index: 0, label: "HOME",           systemLabel: "00 / HOME" },
  { id: "about",          index: 1, label: "ABOUT",          systemLabel: "01 / ABOUT" },
  { id: "education",      index: 2, label: "EDUCATION",      systemLabel: "02 / EDUCATION" },
  { id: "skills",         index: 3, label: "SKILLS",         systemLabel: "03 / SKILLS" },
  { id: "projects",       index: 4, label: "PROJECTS",       systemLabel: "04 / PROJECTS" },
  { id: "certifications", index: 5, label: "CERTIFICATIONS", systemLabel: "05 / CERTS" },
  { id: "contact",        index: 6, label: "CONTACT",        systemLabel: "06 / CONTACT" },
];

// ─── Personal ─────────────────────────────────────────────────────────────────

export const PERSONAL = {
  name:        "Adithyaa K",
  nameShort:   "AK",
  title:       "AI&ML ENGINEER",                             // REPLACE
  tagline:     "Building Intelligence at the Edge",       // REPLACE
  location:    "Chennai, India",                          // REPLACE
  email:       "adithyaa@email.com",                      // REPLACE
  github:      "https://github.com/Adithyaa-Kumar",            // REPLACE
  linkedin:    "https://www.linkedin.com/in/adithyaa-k-a496b03ba/",       // REPLACE
  bio: {
    p1: "I engineer intelligent systems that sit at the intersection of machine learning, computer vision, and real-world deployment. My work focuses on building AI that doesn't just run in notebooks — it ships.", // REPLACE
    p2: "I believe the best AI systems are invisible to users and indispensable to workflows. Every model I train, every pipeline I deploy, is designed with that philosophy.",                                       // REPLACE
    p3: "When I'm not training models or optimizing inference pipelines, I'm exploring multimodal systems, generative architectures, and the edges of what current AI can do.",                                      // REPLACE
  },
  philosophy: "Engineering matters when intelligence meets execution.",
  systemStatus:  "ONLINE",
  coordinates:   "13.0827° N, 80.2707° E",                                  // REPLACE
  stock:         "/images/stock/stock.png",
  profile:       "/images/profile/adithyaa.jpg",
};

// EDUCATION
export const EDUCATION = [
  {
    title:     "Secondary Education",
    institute: "Narayana Institute of Technology, Chennai",
    duration:  "2020 - 2022",
    grade:     "91.6%",
    status:    "ARCHIVED",
  },
  {
    title:     "Higher Secondary",
    institute: "Narayana Institute of Technology, Chennai",
    duration:  "2022 - 2024",
    grade:     "85%",
    status:    "COMPLETED",
  },
  {
    title:     "Undergraduate - B.Tech CSE (AI & ML)",
    institute: "Vellore Institute of Technology, Chennai",
    duration:  "2024 - 2028",
    grade:     "9.03 CGPA",
    status:    "ACTIVE NODE",
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
    title: "Cinematic AI Portfolio",
    short: "Futuristic OS-inspired portfolio with cinematic motion systems.",
    description:
      "A futuristic AI operating-system-inspired portfolio built with cinematic motion systems, layered UI architecture, persistent dashboard states, and immersive transformation-driven navigation. Every transition is engineered for cinematic quality — boot sequences, glitch reveals, parallax portrait, and signal corruption effects.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    github: "https://github.com/adithyaak",
    stack: ["Next.js", "TypeScript", "GSAP", "TailwindCSS", "Framer Motion"],
    category: "INTERFACE",
    year: "2025",
    stats: [
      { label: "INTELLIGENCE", value: "ACTIVE",    icon: "brain" },
      { label: "STATE",        value: "ONLINE",    icon: "db"    },
      { label: "SYSTEM",       value: "OPTIMIZED", icon: "cpu"   },
      { label: "MODULE",       value: "DEPLOYED",  icon: "arrow" },
    ],
  },
  {
    id: "2",
    title: "Multimodal AI Assistant",
    short: "Transformer-based multimodal assistant with vision + language.",
    description:
      "An intelligent multimodal system capable of processing text, image, and contextual reasoning using transformer pipelines, LangChain orchestration, and optimized inference workflows. Supports real-time streaming, tool use, and persistent memory across sessions.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop",
    github: "https://github.com/adithyaak",
    stack: ["PyTorch", "LangChain", "OpenCV", "Transformers", "FastAPI", "Docker"],
    category: "AI / ML",
    year: "2024",
    stats: [
      { label: "INFERENCE",  value: "REALTIME",  icon: "brain" },
      { label: "STATE",      value: "STREAMING", icon: "db"    },
      { label: "MODALITIES", value: "3 ACTIVE",  icon: "cpu"   },
      { label: "MODULE",     value: "DEPLOYED",  icon: "arrow" },
    ],
  },
  {
    id: "3",
    title: "Neural Vision Engine",
    short: "Real-time computer vision pipeline for edge inference.",
    description:
      "A real-time computer vision pipeline for intelligent visual analysis, optimized object tracking, and edge inference deployment with high-performance streaming systems. CUDA-accelerated, TensorRT optimized for sub-10ms detection on edge hardware.",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1200&auto=format&fit=crop",
    github: "https://github.com/adithyaak",
    stack: ["Python", "YOLO", "OpenCV", "TensorRT", "CUDA", "Flask"],
    category: "VISION",
    year: "2024",
    stats: [
      { label: "LATENCY",  value: "<10ms",    icon: "brain" },
      { label: "STATE",    value: "ONLINE",   icon: "db"    },
      { label: "HARDWARE", value: "CUDA",     icon: "cpu"   },
      { label: "MODULE",   value: "DEPLOYED", icon: "arrow" },
    ],
  },
  {
    id: "4",
    title: "Autonomous Trading Bot",
    short: "Autonomous crypto trading engine with signal intelligence.",
    description:
      "A meme-coin trading automation engine featuring signal analysis, transaction orchestration, liquidity monitoring, and intelligent execution systems. Real-time WebSocket feeds, Redis-backed state management, and Docker-orchestrated microservices.",
    image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=1200&auto=format&fit=crop",
    github: "https://github.com/adithyaak",
    stack: ["Node.js", "Python", "WebSockets", "Redis", "MongoDB", "Docker"],
    category: "AUTOMATION",
    year: "2024",
    stats: [
      { label: "SIGNAL",  value: "LIVE",     icon: "brain" },
      { label: "STATE",   value: "ACTIVE",   icon: "db"    },
      { label: "LATENCY", value: "<50ms",    icon: "cpu"   },
      { label: "MODULE",  value: "DEPLOYED", icon: "arrow" },
    ],
  },
  {
    id: "5",
    title: "Relationship Management",
    short: "Automated communication and scheduling platform.",
    description:
      "A scheduling and automated communication platform enabling timed email delivery, relationship tracking, intelligent reminders, and personalized interaction systems. JWT-authenticated, AWS-hosted, with Next.js frontend and FastAPI backend.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
    github: "https://github.com/adithyaak",
    stack: ["Next.js", "FastAPI", "MongoDB", "SMTP", "JWT", "AWS"],
    category: "PLATFORM",
    year: "2023",
    stats: [
      { label: "USERS",  value: "ACTIVE",   icon: "brain" },
      { label: "STATE",  value: "ONLINE",   icon: "db"    },
      { label: "INFRA",  value: "AWS",      icon: "cpu"   },
      { label: "MODULE", value: "DEPLOYED", icon: "arrow" },
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