// ─── Section Types ────────────────────────────────────────────────────────────

export type SectionId =
  | "hero"
  | "about"
  | "education"
  | "skills"
  | "projects"
  | "certifications"
  | "contact";

export interface SectionMeta {
  id: SectionId;
  index: number;
  label: string;
  systemLabel: string;
}

// ─── Content Types ────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  stack: string[];
  category: string;
  year: string;
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  highlights: string[];
  status: "live" | "development" | "archived";
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  specialization: string;
  year: string;
  grade: string;
  location: string;
  highlights: string[];
}

export interface Certification {
  id: string;
  title: string;
  organization: string;
  year: string;
  image: string;
  credentialId?: string;
  skills: string[];
  description: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  systemLabel: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: "core" | "proficient" | "familiar";
}

// ─── Animation State Types ────────────────────────────────────────────────────

export type HeroStage =
  | "void"
  | "wakeup"
  | "assembly"
  | "materialization"
  | "stable"
  | "exploration";

export interface SystemState {
  currentSection: SectionId;
  heroStage: HeroStage;
  isProjectOpen: boolean;
  isCertOpen: boolean;
  activeProject: string | null;
  activeCert: string | null;
}

// ─── Contact Types ────────────────────────────────────────────────────────────

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type TransmissionStatus =
  | "idle"
  | "transmitting"
  | "complete"
  | "failed";