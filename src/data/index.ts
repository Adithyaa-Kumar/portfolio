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
  title:       "AI ENGINEER",                             // REPLACE
  tagline:     "Building Intelligence at the Edge",       // REPLACE
  location:    "Chennai, India",                          // REPLACE
  email:       "adithyaa@email.com",                      // REPLACE
  github:      "https://github.com/adithyaak",            // REPLACE
  linkedin:    "https://linkedin.com/in/adithyaak",       // REPLACE
  bio: {
    p1: "I engineer intelligent systems that sit at the intersection of machine learning, computer vision, and real-world deployment. My work focuses on building AI that doesn't just run in notebooks — it ships.", // REPLACE
    p2: "I believe the best AI systems are invisible to users and indispensable to workflows. Every model I train, every pipeline I deploy, is designed with that philosophy.",                                       // REPLACE
    p3: "When I'm not training models or optimizing inference pipelines, I'm exploring multimodal systems, generative architectures, and the edges of what current AI can do.",                                      // REPLACE
  },
  philosophy:    "Build systems that think. Deploy experiences that feel.",  // REPLACE
  systemStatus:  "ONLINE",
  coordinates:   "13.0827° N, 80.2707° E",                                  // REPLACE
  stock:         "/images/stock/stock.png",
  profile:       "/images/profile/adithyaa.jpg",
};

// ─── Education ────────────────────────────────────────────────────────────────

export const EDUCATION: Education[] = [
  {
    id:             "edu-01",
    institution:    "Your University Name",                    // REPLACE
    degree:         "B.Tech / B.E.",                           // REPLACE
    specialization: "Artificial Intelligence & Data Science",  // REPLACE
    year:           "2021 — 2025",                             // REPLACE
    grade:          "8.5 CGPA",                                // REPLACE
    location:       "Chennai, India",                          // REPLACE
    highlights: [
      "Specialized in deep learning and computer vision",      // REPLACE
      "Final year project on multimodal AI systems",           // REPLACE
      "AI/ML Club lead, organized 3 hackathons",               // REPLACE
    ],
  },
  {
    id:             "edu-02",
    institution:    "Your School Name",                        // REPLACE
    degree:         "Higher Secondary Certificate",             // REPLACE
    specialization: "Computer Science & Mathematics",          // REPLACE
    year:           "2019 — 2021",                             // REPLACE
    grade:          "94.2%",                                   // REPLACE
    location:       "Chennai, India",                          // REPLACE
    highlights: [
      "State rank in Mathematics",                             // REPLACE
      "School tech club president",                            // REPLACE
    ],
  },
];

// ─── Skills ───────────────────────────────────────────────────────────────────

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id:          "languages",
    label:       "Languages",
    systemLabel: "PROGRAMMING LANGUAGES",
    skills: [
      { name: "Python",     level: "core" },
      { name: "TypeScript", level: "core" },
      { name: "JavaScript", level: "core" },
      { name: "C++",        level: "proficient" },
      { name: "SQL",        level: "proficient" },
      { name: "Bash",       level: "familiar" },
      // REPLACE / ADD your actual languages
    ],
  },
  {
    id:          "ai-ml",
    label:       "AI / ML",
    systemLabel: "AI · ML · DL STACK",
    skills: [
      { name: "PyTorch",          level: "core" },
      { name: "TensorFlow",       level: "core" },
      { name: "Scikit-learn",     level: "core" },
      { name: "HuggingFace",      level: "proficient" },
      { name: "OpenCV",           level: "proficient" },
      { name: "LangChain",        level: "proficient" },
      { name: "YOLO",             level: "proficient" },
      { name: "LLMs",             level: "core" },
      // REPLACE / ADD your actual AI stack
    ],
  },
  {
    id:          "frameworks",
    label:       "Frameworks",
    systemLabel: "FRAMEWORKS & LIBRARIES",
    skills: [
      { name: "Next.js",  level: "core" },
      { name: "FastAPI",  level: "core" },
      { name: "React",    level: "proficient" },
      { name: "Flask",    level: "proficient" },
      { name: "Node.js",  level: "proficient" },
      // REPLACE / ADD your actual frameworks
    ],
  },
  {
    id:          "cloud-devtools",
    label:       "Cloud & DevTools",
    systemLabel: "CLOUD · DEVOPS · TOOLS",
    skills: [
      { name: "AWS",        level: "proficient" },
      { name: "Docker",     level: "proficient" },
      { name: "Git",        level: "core" },
      { name: "Linux",      level: "proficient" },
      { name: "Vercel",     level: "proficient" },
      { name: "PostgreSQL", level: "proficient" },
      { name: "MongoDB",    level: "familiar" },
      // REPLACE / ADD your actual tools
    ],
  },
  {
    id:          "design-tools",
    label:       "Design & Media",
    systemLabel: "DESIGN · MEDIA TOOLS",
    skills: [
      { name: "Figma",        level: "proficient" },
      { name: "Premiere Pro", level: "familiar" },
      { name: "After Effects",level: "familiar" },
      { name: "Blender",      level: "familiar" },
      // REPLACE / ADD your actual design tools
    ],
  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────

export const PROJECTS: Project[] = [
  {
    id:              "proj-01",
    title:           "Project Alpha",                                              // REPLACE
    tagline:         "Vision Intelligence System",                                 // REPLACE
    description:     "Real-time computer vision pipeline for object detection",    // REPLACE
    longDescription: "A production-grade computer vision system built with PyTorch and YOLO, deployed on edge hardware for real-time inference. Achieved 94% mAP on custom dataset with sub-20ms latency.", // REPLACE
    stack:           ["PyTorch", "YOLO", "FastAPI", "Docker", "AWS"],              // REPLACE
    category:        "AI / COMPUTER VISION",                                       // REPLACE
    year:            "2024",                                                       // REPLACE
    image:           "/images/projects/project-01.jpg",
    githubUrl:       "https://github.com/adithyaak/project-alpha",                 // REPLACE
    liveUrl:         "",                                                           // REPLACE
    highlights: [
      "94% mAP on custom dataset",                                                 // REPLACE
      "Sub-20ms inference latency",                                                // REPLACE
      "Deployed on edge hardware",                                                 // REPLACE
    ],
    status: "live",
  },
  {
    id:              "proj-02",
    title:           "Project Beta",                                               // REPLACE
    tagline:         "Multimodal Language Interface",                              // REPLACE
    description:     "LLM-powered assistant with vision + language understanding", // REPLACE
    longDescription: "An end-to-end multimodal system combining a fine-tuned LLM with vision encoders. Processes text and image inputs with RAG-based knowledge retrieval.", // REPLACE
    stack:           ["Python", "LangChain", "HuggingFace", "Next.js", "Supabase"], // REPLACE
    category:        "GENERATIVE AI",                                              // REPLACE
    year:            "2024",                                                       // REPLACE
    image:           "/images/projects/project-02.jpg",
    githubUrl:       "https://github.com/adithyaak/project-beta",                  // REPLACE
    liveUrl:         "https://project-beta.vercel.app",                            // REPLACE
    highlights: [
      "Fine-tuned on domain-specific data",                                        // REPLACE
      "RAG pipeline with vector search",                                           // REPLACE
      "Multimodal input processing",                                               // REPLACE
    ],
    status: "live",
  },
  {
    id:              "proj-03",
    title:           "Project Gamma",                                              // REPLACE
    tagline:         "Autonomous Data Pipeline",                                   // REPLACE
    description:     "ML-powered ETL system with anomaly detection",              // REPLACE
    longDescription: "An intelligent data pipeline automating extraction, transformation, and loading with built-in ML-based anomaly detection. Reduced manual review time by 78%.", // REPLACE
    stack:           ["Python", "Scikit-learn", "PostgreSQL", "Docker", "FastAPI"], // REPLACE
    category:        "ML OPS",                                                     // REPLACE
    year:            "2023",                                                       // REPLACE
    image:           "/images/projects/project-03.jpg",
    githubUrl:       "https://github.com/adithyaak/project-gamma",                 // REPLACE
    liveUrl:         "",                                                           // REPLACE
    highlights: [
      "78% reduction in manual review",                                            // REPLACE
      "Real-time anomaly detection",                                               // REPLACE
      "Handles 1M+ records daily",                                                 // REPLACE
    ],
    status: "live",
  },
  {
    id:              "proj-04",
    title:           "Project Delta",                                              // REPLACE
    tagline:         "Generative Design System",                                   // REPLACE
    description:     "Stable diffusion fine-tune for concept visualization",      // REPLACE
    longDescription: "A fine-tuned Stable Diffusion model trained on domain drawings to generate concept visualizations from text descriptions, deployed as an async API.", // REPLACE
    stack:           ["Stable Diffusion", "Python", "React", "AWS", "FastAPI"],    // REPLACE
    category:        "GENERATIVE AI",                                              // REPLACE
    year:            "2023",                                                       // REPLACE
    image:           "/images/projects/project-04.jpg",
    githubUrl:       "https://github.com/adithyaak/project-delta",                 // REPLACE
    liveUrl:         "",                                                           // REPLACE
    highlights: [
      "Fine-tuned on 12K domain images",                                           // REPLACE
      "Text-to-visualization pipeline",                                            // REPLACE
      "REST API with async job queue",                                             // REPLACE
    ],
    status: "archived",
  },
];

// ─── Certifications ───────────────────────────────────────────────────────────

export const CERTIFICATIONS: Certification[] = [
  {
    id:           "cert-01",
    title:        "Deep Learning Specialization",          // REPLACE
    organization: "Coursera / DeepLearning.AI",            // REPLACE
    year:         "2024",                                  // REPLACE
    image:        "/images/certifications/cert-01.jpg",
    credentialId: "CREDENTIAL-ID-01",                      // REPLACE
    skills:       ["Neural Networks", "CNNs", "RNNs", "Transformers"], // REPLACE
    description:  "5-course specialization covering neural networks, CNNs, sequence models, and NLP.", // REPLACE
  },
  {
    id:           "cert-02",
    title:        "AWS Solutions Architect",               // REPLACE
    organization: "Amazon Web Services",                   // REPLACE
    year:         "2024",                                  // REPLACE
    image:        "/images/certifications/cert-02.jpg",
    credentialId: "CREDENTIAL-ID-02",                      // REPLACE
    skills:       ["Cloud Architecture", "EC2", "S3", "Lambda"], // REPLACE
    description:  "Associate-level certification covering AWS core services, architecture best practices, and cloud security.", // REPLACE
  },
  {
    id:           "cert-03",
    title:        "Machine Learning with Python",          // REPLACE
    organization: "IBM / Coursera",                        // REPLACE
    year:         "2023",                                  // REPLACE
    image:        "/images/certifications/cert-03.jpg",
    credentialId: "CREDENTIAL-ID-03",                      // REPLACE
    skills:       ["Scikit-learn", "Pandas", "NumPy", "ML Algorithms"], // REPLACE
    description:  "Applied machine learning — supervised, unsupervised, and recommender systems.", // REPLACE
  },
  {
    id:           "cert-04",
    title:        "LangChain & LLM Development",           // REPLACE
    organization: "DeepLearning.AI",                       // REPLACE
    year:         "2024",                                  // REPLACE
    image:        "/images/certifications/cert-04.jpg",
    credentialId: "CREDENTIAL-ID-04",                      // REPLACE
    skills:       ["LangChain", "RAG", "Agents", "Prompt Engineering"], // REPLACE
    description:  "Building LLM-powered applications using LangChain including RAG systems and autonomous agents.", // REPLACE
  },
];