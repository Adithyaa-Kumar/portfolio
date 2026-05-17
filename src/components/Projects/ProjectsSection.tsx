"use client";

import { useEffect, useRef, useState, useCallback, forwardRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { X, ArrowUpRight, Cpu, Database, Brain, Zap } from "lucide-react";

// ─── TYPES ───────────────────────────────────────────────────────────────────

type StatIcon = "brain" | "db" | "cpu" | "arrow" | "zap";

interface ProjectStat {
  label: string;
  value: string;
  icon: StatIcon;
}

interface Project {
  id: number;
  title: string;
  short: string;
  description: string;
  image: string;
  github: string;
  stack: string[];
  stats: ProjectStat[];
  category: string;
  year: string;
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const CARD_W      = 300;
const CARD_H      = 400;
const CARD_GAP    = 20;
const CARD_STRIDE = CARD_W + CARD_GAP;
const BASE_SPEED  = 0.55;

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

interface ProjectsSectionProps {
  onModalOpen?: (open: boolean) => void;
}

export default function ProjectsSection({ onModalOpen }: ProjectsSectionProps) {
  const trackRef       = useRef<HTMLDivElement>(null);
  const offsetRef      = useRef(0);
  const speedRef       = useRef(BASE_SPEED);
  const modalRef       = useRef<HTMLDivElement>(null);
  const overlayRef     = useRef<HTMLDivElement>(null);

  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [modalVisible,  setModalVisible]  = useState(false);

  // ── GSAP TICKER ────────────────────────────────────────────
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const sw = PROJECTS.length * CARD_STRIDE;
    const xSetter = gsap.quickSetter(track, "x", "px");
    const tick = () => {
      if (speedRef.current === 0) return;
      offsetRef.current -= speedRef.current;
      if (offsetRef.current <= -sw) offsetRef.current += sw;
      xSetter(offsetRef.current);
    };
    gsap.ticker.fps(60);
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  const pause  = useCallback(() => { speedRef.current = 0; }, []);
  const resume = useCallback(() => { speedRef.current = BASE_SPEED; }, []);

  // ── OPEN MODAL ─────────────────────────────────────────────
  const openModal = useCallback((project: Project) => {
    pause();
    setActiveProject(project);
    setModalVisible(true);
    onModalOpen?.(true);
  }, [pause, onModalOpen]);

  // ── CLOSE MODAL ────────────────────────────────────────────
  const closeModal = useCallback(() => {
    if (!modalRef.current || !overlayRef.current) return;
    gsap.to(modalRef.current,  { scale: 0.95, opacity: 0, y: 16, duration: 0.25, ease: "power2.in" });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, ease: "power2.in",
      onComplete: () => {
        setModalVisible(false);
        setActiveProject(null);
        resume();
        onModalOpen?.(false);
      },
    });
  }, [resume, onModalOpen]);

  // ── MODAL ENTRY ANIM ───────────────────────────────────────
  useEffect(() => {
    if (modalVisible && modalRef.current && overlayRef.current) {
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(modalRef.current,
        { scale: 0.92, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [modalVisible]);

  // Key close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && modalVisible) closeModal(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalVisible, closeModal]);

  const allCards = [...PROJECTS, ...PROJECTS];

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    }}>

      {/* ── HEADER ──────────────────────────────────────────── */}
      <div style={{
        padding: "16px 24px 20px 16px",
        flexShrink: 0,
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "8px",
        }}>
          <div style={{ width: "20px", height: "1px", background: "rgba(255,255,255,0.2)" }}/>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.4rem",
            letterSpacing: "0.44em",
            color: "rgba(255,255,255,0.2)",
          }}>
            ACTIVE MODULE ARCHIVE · {PROJECTS.length} SYSTEMS
          </span>
        </div>
        <p style={{
          fontFamily: "var(--font-grotesk)",
          fontSize: "0.8rem",
          lineHeight: 1.7,
          fontWeight: 300,
          color: "rgba(255,255,255,0.45)",
          maxWidth: "560px",
          margin: 0,
        }}>
          Floating subsystem modules — AI systems, engineering infrastructure,
          cinematic interfaces, and intelligent digital architectures.
        </p>
      </div>

      {/* ── TRACK AREA ──────────────────────────────────────── */}
      <div style={{
        flex: 1,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}>
        {/* Ambient glow */}
        <div style={{
          position: "absolute", top: "20%", left: "35%",
          width: "500px", height: "300px",
          background: "radial-gradient(circle, rgba(255,255,255,0.03), transparent 70%)",
          pointerEvents: "none", zIndex: 0,
        }}/>

        {/* Track sweep line */}
        <div style={{
          position: "absolute", top: 0, left: "-200px",
          width: "200px", height: "1px",
          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
          animation: "track-sweep 5s linear infinite",
          zIndex: 10, pointerEvents: "none",
        }}/>

        {/* Moving track */}
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: `${CARD_GAP}px`,
            width: "max-content",
            padding: "20px 24px",
            willChange: "transform",
            position: "relative",
            zIndex: 5,
          }}
        >
          {allCards.map((project, index) => (
            <ProjectCard
              key={`${project.id}-${index}`}
              project={project}
              onHoverStart={pause}
              onHoverEnd={resume}
              onSelect={openModal}
              isPriority={index < 5}
            />
          ))}
        </div>

        {/* Edge fades — ONLY over the cards area */}
        <div style={{
          position: "absolute", top: 0, left: 0, bottom: 0, width: "48px",
          background: "linear-gradient(to right, rgba(0,0,0,0.95), transparent)",
          pointerEvents: "none", zIndex: 6,
        }}/>
        <div style={{
          position: "absolute", top: 0, right: 0, bottom: 0, width: "48px",
          background: "linear-gradient(to left, rgba(0,0,0,0.95), transparent)",
          pointerEvents: "none", zIndex: 6,
        }}/>
      </div>

      {/* ── HINT ────────────────────────────────────────────── */}
      <div style={{
        textAlign: "center",
        padding: "8px",
        flexShrink: 0,
      }}>
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.32rem",
          letterSpacing: "0.4em",
          color: "rgba(255,255,255,0.12)",
        }}>
          HOVER TO PAUSE · CLICK TO EXPAND · ESC TO CLOSE
        </span>
      </div>

      {/* ── MODAL OVERLAY — inside section, position:absolute ── */}
      {modalVisible && activeProject && (
        <div
          ref={overlayRef}
          onClick={(e) => { if (e.target === overlayRef.current) closeModal(); }}
          style={{
            position: "absolute",   // ← absolute, NOT fixed — stays inside section
            inset: 0,
            zIndex: 100,
            background: "rgba(0,0,0,0.82)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <ProjectModal
            ref={modalRef}
            project={activeProject}
            onClose={closeModal}
          />
        </div>
      )}

      <style>{`
        @keyframes track-sweep {
          0%   { left: -200px; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { left: 110%; opacity: 0; }
        }
        @keyframes card-pulse {
          0%,100% { opacity:1; box-shadow:0 0 0 0 rgba(255,255,255,0.4); }
          50%      { opacity:0.3; box-shadow:0 0 0 4px rgba(255,255,255,0); }
        }
      `}</style>
    </div>
  );
}

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────

function ProjectCard({
  project, onHoverStart, onHoverEnd, onSelect, isPriority,
}: {
  project: Project;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onSelect: (p: Project) => void;
  isPriority: boolean;
}) {
  const cardRef   = useRef<HTMLDivElement>(null);
  const imageRef  = useRef<HTMLDivElement>(null);
  const glowRef   = useRef<HTMLDivElement>(null);
  const lineRef   = useRef<HTMLDivElement>(null);
  const scanRef   = useRef<HTMLDivElement>(null);

  const onEnter = useCallback(() => {
    onHoverStart();
    gsap.killTweensOf([cardRef.current, imageRef.current, glowRef.current]);
    gsap.to(cardRef.current,  { y: -16, scale: 1.02, duration: 0.22, ease: "power2.out" });
    gsap.to(imageRef.current, { scale: 1.07, duration: 0.5, ease: "power2.out" });
    gsap.to(glowRef.current,  { opacity: 1, duration: 0.3 });
    gsap.to(lineRef.current,  { scaleX: 1, duration: 0.45, ease: "expo.out" });
    gsap.to(scanRef.current,  { opacity: 1, duration: 0.2 });
  }, [onHoverStart]);

  const onLeave = useCallback(() => {
    onHoverEnd();
    gsap.killTweensOf([cardRef.current, imageRef.current, glowRef.current]);
    gsap.to(cardRef.current,  { y: 0, scale: 1, duration: 0.25, ease: "power2.out" });
    gsap.to(imageRef.current, { scale: 1, duration: 0.45, ease: "power2.out" });
    gsap.to(glowRef.current,  { opacity: 0, duration: 0.3 });
    gsap.to(lineRef.current,  { scaleX: 0, duration: 0.3, ease: "power2.in" });
    gsap.to(scanRef.current,  { opacity: 0, duration: 0.2 });
  }, [onHoverEnd]);

  const onClick = useCallback(() => {
    gsap.to(cardRef.current, {
      scale: 0.97, duration: 0.08,
      onComplete: () => {
        gsap.to(cardRef.current, { scale: 1.02, duration: 0.14 });
        onSelect(project);
      },
    });
  }, [onSelect, project]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{
        position: "relative",
        width: `${CARD_W}px`,
        height: `${CARD_H}px`,
        flexShrink: 0,
        background: "linear-gradient(160deg, rgba(18,18,18,0.98) 0%, rgba(8,8,8,0.99) 100%)",
        cursor: "pointer",
        overflow: "hidden",
        willChange: "transform",
        // Techy asymmetric clip
        clipPath: "polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px))",
        // Use boxShadow for border — clip-path hides CSS borders
        boxShadow: "0 0 0 1px rgba(255,255,255,0.1), 0 4px 20px rgba(0,0,0,0.4)",
        transition: "box-shadow 0.25s ease",
      }}
    >
      {/* ── Ambient glow top-right ─ */}
      <div ref={glowRef} style={{
        position: "absolute", top: "-60px", right: "-60px",
        width: "200px", height: "200px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,255,255,0.08), transparent 65%)",
        opacity: 0, pointerEvents: "none", zIndex: 2,
      }}/>

      {/* ── Scan line on hover ─ */}
      <div ref={scanRef} style={{
        position: "absolute", left: 0, right: 0, top: 0,
        height: "2px",
        background: "linear-gradient(to right, transparent, rgba(255,255,255,0.5), transparent)",
        opacity: 0,
        animation: "scan-down 2s linear infinite",
        zIndex: 8, pointerEvents: "none",
      }}/>

      {/* ── IMAGE AREA — 56% height ─ */}
      <div style={{
        position: "relative",
        width: "100%",
        height: "56%",
        overflow: "hidden",
        flexShrink: 0,
      }}>
        <div ref={imageRef} style={{ position: "absolute", inset: 0, willChange: "transform" }}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority={isPriority}
            style={{
              objectFit: "cover",
              filter: "grayscale(100%) contrast(1.1) brightness(0.75)",
            }}
          />
        </div>

        {/* Image gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%)",
          zIndex: 2,
        }}/>

        {/* Top row metadata */}
        <div style={{
          position: "absolute", top: "12px", left: "12px", right: "12px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          zIndex: 3,
        }}>
          {/* Category tag */}
          <div style={{
            padding: "3px 8px",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(0,0,0,0.6)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.32rem",
            letterSpacing: "0.28em",
            color: "rgba(255,255,255,0.7)",
          }}>
            {project.category}
          </div>

          {/* Pulse dot */}
          <div style={{
            width: "7px", height: "7px",
            background: "rgba(255,255,255,0.85)",
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            animation: "card-pulse 2.2s ease infinite",
          }}/>
        </div>

        {/* Year + ID */}
        <div style={{
          position: "absolute", bottom: "10px", left: "12px",
          zIndex: 3,
          display: "flex", alignItems: "center", gap: "10px",
        }}>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "0.3rem",
            letterSpacing: "0.25em", color: "rgba(255,255,255,0.3)",
          }}>
            SYS_{String(project.id).padStart(3,"0")}
          </span>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "0.3rem",
            letterSpacing: "0.2em", color: "rgba(255,255,255,0.2)",
          }}>
            {project.year}
          </span>
        </div>
      </div>

      {/* ── DIVIDER — draws on hover ─ */}
      <div ref={lineRef} style={{
        position: "absolute",
        top: "56%",
        left: 0, right: 0,
        height: "1px",
        background: "linear-gradient(to right, rgba(255,255,255,0.6), rgba(255,255,255,0.1), transparent)",
        transformOrigin: "left",
        transform: "scaleX(0)",
        zIndex: 4,
      }}/>

      {/* ── CONTENT AREA — 44% ─ */}
      <div style={{
        position: "absolute",
        top: "56%", left: 0, right: 0, bottom: 0,
        padding: "14px 16px 14px 16px",
        display: "flex", flexDirection: "column",
        zIndex: 3,
      }}>
        {/* Title */}
        <div style={{
          fontFamily: "var(--font-orbitron)",
          fontSize: "0.78rem",
          fontWeight: 700,
          letterSpacing: "0.03em",
          color: "rgba(255,255,255,0.94)",
          lineHeight: 1.25,
          marginBottom: "8px",
        }}>
          {project.title}
        </div>

        {/* Short desc */}
        <div style={{
          fontFamily: "var(--font-grotesk)",
          fontSize: "0.7rem",
          lineHeight: 1.6,
          fontWeight: 300,
          color: "rgba(255,255,255,0.42)",
          flex: 1,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}>
          {project.short}
        </div>

        {/* Stack pills — top 3 */}
        <div style={{
          display: "flex", gap: "5px", flexWrap: "wrap",
          marginBottom: "10px",
        }}>
          {project.stack.slice(0, 3).map((s) => (
            <div key={s} style={{
              padding: "2px 7px",
              border: "1px solid rgba(255,255,255,0.1)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.28rem",
              letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.35)",
            }}>
              {s}
            </div>
          ))}
          {project.stack.length > 3 && (
            <div style={{
              padding: "2px 7px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.28rem",
              letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.2)",
            }}>
              +{project.stack.length - 3}
            </div>
          )}
        </div>

        {/* Bottom row */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "10px",
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: "7px",
          }}>
            <div style={{ width: "14px", height: "1px", background: "rgba(255,255,255,0.2)" }}/>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.3rem",
              letterSpacing: "0.28em",
              color: "rgba(255,255,255,0.35)",
            }}>
              VIEW SYSTEM
            </span>
          </div>

          {/* GitHub */}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "32px", height: "32px",
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.03)",
              display: "flex", alignItems: "center", justifyContent: "center",
              clipPath: "polygon(4px 0%,100% 0%,100% calc(100% - 4px),calc(100% - 4px) 100%,0% 100%,0% 4px)",
              transition: "border-color 0.2s, background 0.2s",
              cursor: "pointer", flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.5)";
              (e.currentTarget as HTMLElement).style.background  = "rgba(255,255,255,0.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
              (e.currentTarget as HTMLElement).style.background  = "rgba(255,255,255,0.03)";
            }}
          >
            <FaGithub size={14} color="rgba(255,255,255,0.75)"/>
          </a>
        </div>
      </div>

      {/* ── Corner brackets ─ */}
      <CardCorners/>
    </div>
  );
}

// ─── CARD CORNERS ────────────────────────────────────────────────────────────

function CardCorners() {
  const s: React.CSSProperties = { position: "absolute", zIndex: 10, pointerEvents: "none" };
  return (
    <>
      <div style={{ ...s, top: 2, left: 2 }}>
        <div style={{ width: 10, height: 1, background: "rgba(255,255,255,0.45)" }}/>
        <div style={{ width: 1, height: 10, background: "rgba(255,255,255,0.45)" }}/>
      </div>
      <div style={{ ...s, top: 2, right: 20, display:"flex", flexDirection:"column", alignItems:"flex-end" }}>
        <div style={{ width: 10, height: 1, background: "rgba(255,255,255,0.45)" }}/>
        <div style={{ width: 1, height: 10, background: "rgba(255,255,255,0.45)", alignSelf:"flex-end" }}/>
      </div>
      <div style={{ ...s, bottom: 2, left: 2, display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
        <div style={{ width: 1, height: 10, background: "rgba(255,255,255,0.45)" }}/>
        <div style={{ width: 10, height: 1, background: "rgba(255,255,255,0.45)" }}/>
      </div>
      <div style={{ ...s, bottom: 20, right: 2, display:"flex", flexDirection:"column", alignItems:"flex-end", justifyContent:"flex-end" }}>
        <div style={{ width: 1, height: 10, background: "rgba(255,255,255,0.45)", alignSelf:"flex-end" }}/>
        <div style={{ width: 10, height: 1, background: "rgba(255,255,255,0.45)" }}/>
      </div>
    </>
  );
}

// ─── PROJECT MODAL ───────────────────────────────────────────────────────────

const ProjectModal = forwardRef<HTMLDivElement, {
  project: Project;
  onClose: () => void;
}>(({ project, onClose }, ref) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: "min(1100px, 90%)",
        maxHeight: "80vh",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(6,6,6,0.98)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))",
        boxShadow: "0 40px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08)",
      }}
    >
      {/* Ambient grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.02,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.08) 1px,transparent 1px)`,
        backgroundSize: "50px 50px",
      }}/>

      {/* Corner brackets */}
      <div style={{ position:"absolute", top:4, left:4, zIndex:20, pointerEvents:"none" }}>
        <div style={{ width:18, height:1, background:"rgba(255,255,255,0.5)" }}/>
        <div style={{ width:1, height:18, background:"rgba(255,255,255,0.5)" }}/>
      </div>
      <div style={{ position:"absolute", bottom:22, right:4, zIndex:20, pointerEvents:"none", display:"flex", flexDirection:"column", alignItems:"flex-end" }}>
        <div style={{ width:1, height:18, background:"rgba(255,255,255,0.5)", alignSelf:"flex-end" }}/>
        <div style={{ width:18, height:1, background:"rgba(255,255,255,0.5)" }}/>
      </div>

      {/* ── LEFT PANEL ──────────────────────────────────── */}
      <div style={{
        position: "relative", zIndex: 1,
        padding: "32px 28px",
        display: "flex", flexDirection: "column",
        borderRight: "1px solid rgba(255,255,255,0.07)",
        overflowY: "auto", scrollbarWidth: "none",
        maxHeight: "80vh",
      }}>
        {/* System label */}
        <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"18px" }}>
          <div style={{ width:20, height:1, background:"rgba(255,255,255,0.2)" }}/>
          <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.36rem", letterSpacing:"0.38em", color:"rgba(255,255,255,0.2)" }}>
            PROJECT SUBSYSTEM · SYS_{String(project.id).padStart(3,"0")}
          </span>
        </div>

        {/* Category + year */}
        <div style={{ display:"flex", gap:"8px", marginBottom:"16px" }}>
          <div style={{
            padding:"3px 10px", border:"1px solid rgba(255,255,255,0.15)",
            fontFamily:"var(--font-mono)", fontSize:"0.32rem", letterSpacing:"0.28em",
            color:"rgba(255,255,255,0.5)",
          }}>
            {project.category}
          </div>
          <div style={{
            padding:"3px 10px", border:"1px solid rgba(255,255,255,0.08)",
            fontFamily:"var(--font-mono)", fontSize:"0.32rem", letterSpacing:"0.28em",
            color:"rgba(255,255,255,0.3)",
          }}>
            {project.year}
          </div>
        </div>

        {/* Title */}
        <div style={{
          fontFamily: "var(--font-orbitron)",
          fontSize: "clamp(1.3rem, 2.2vw, 2rem)",
          fontWeight: 900, letterSpacing: "0.02em",
          color: "rgba(255,255,255,0.96)",
          lineHeight: 1.15, marginBottom: "20px",
        }}>
          {project.title}
        </div>

        {/* Divider */}
        <div style={{ width:50, height:1, background:"rgba(255,255,255,0.18)", marginBottom:"20px" }}/>

        {/* Description */}
        <p style={{
          fontFamily: "var(--font-grotesk)",
          fontSize: "0.82rem", lineHeight: 1.85, fontWeight: 300,
          color: "rgba(255,255,255,0.54)", marginBottom: "24px",
        }}>
          {project.description}
        </p>

        {/* Stats grid */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginBottom:"24px" }}>
          {project.stats.map((stat) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} icon={stat.icon}/>
          ))}
        </div>

        {/* Stack */}
        <div style={{ marginTop:"auto" }}>
          <div style={{
            fontFamily:"var(--font-mono)", fontSize:"0.36rem",
            letterSpacing:"0.4em", color:"rgba(255,255,255,0.2)", marginBottom:"12px",
          }}>
            TECHNOLOGY STACK
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"7px" }}>
            {project.stack.map((tech) => <TechPill key={tech} tech={tech}/>)}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ─────────────────────────────────── */}
      <div style={{
        position: "relative", zIndex: 1,
        padding: "32px 28px 28px 28px",
        display: "flex", flexDirection: "column", gap: "14px",
        overflowY: "auto", scrollbarWidth: "none",
        maxHeight: "80vh",
      }}>
        {/* Close button */}
        <button
          ref={closeBtnRef}
          onClick={onClose}
          style={{
            position: "absolute", top: "16px", right: "24px",
            width: "40px", height: "40px",
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(255,255,255,0.02)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", zIndex: 20,
            clipPath: "polygon(4px 0%,100% 0%,100% calc(100% - 4px),calc(100% - 4px) 100%,0% 100%,0% 4px)",
            transition: "border-color 0.2s, background 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.5)";
            (e.currentTarget as HTMLElement).style.background  = "rgba(255,255,255,0.08)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.14)";
            (e.currentTarget as HTMLElement).style.background  = "rgba(255,255,255,0.02)";
          }}
        >
          <X size={15} color="rgba(255,255,255,0.8)"/>
        </button>

        {/* Main image */}
        <div style={{
          position: "relative", width: "100%", height: "220px",
          overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", flexShrink: 0,
        }}>
          <Image
            src={project.image} alt={project.title} fill
            style={{ objectFit:"cover", filter:"grayscale(100%) contrast(1.1) brightness(0.82)" }}
          />
          <div style={{
            position:"absolute", inset:0,
            background:"linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.45))",
          }}/>
          <div style={{
            position:"absolute", bottom:"10px", left:"12px",
            fontFamily:"var(--font-mono)", fontSize:"0.3rem",
            letterSpacing:"0.26em", color:"rgba(255,255,255,0.3)",
          }}>
            PRIMARY · {project.title.toUpperCase()}
          </div>
          {/* Corner marks on image */}
          <div style={{ position:"absolute", top:6, left:6, zIndex:2 }}>
            <div style={{ width:12, height:1, background:"rgba(255,255,255,0.5)" }}/>
            <div style={{ width:1, height:12, background:"rgba(255,255,255,0.5)" }}/>
          </div>
          <div style={{ position:"absolute", bottom:6, right:6, zIndex:2, display:"flex", flexDirection:"column", alignItems:"flex-end" }}>
            <div style={{ width:1, height:12, background:"rgba(255,255,255,0.5)", alignSelf:"flex-end" }}/>
            <div style={{ width:12, height:1, background:"rgba(255,255,255,0.5)" }}/>
          </div>
        </div>

        {/* Bottom: secondary image + github */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 130px", gap:"12px", flex:1, minHeight:"120px" }}>
          {/* Secondary image */}
          <div style={{
            position:"relative", overflow:"hidden",
            border:"1px solid rgba(255,255,255,0.07)",
          }}>
            <Image
              src={project.image} alt={project.title} fill
              style={{ objectFit:"cover", filter:"grayscale(100%) contrast(1.05) brightness(0.6)" }}
            />
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(0,0,0,0.2),rgba(0,0,0,0.65))" }}/>
            <div style={{ position:"absolute", bottom:8, left:10, fontFamily:"var(--font-mono)", fontSize:"0.28rem", letterSpacing:"0.24em", color:"rgba(255,255,255,0.25)" }}>
              SECONDARY VIEW
            </div>
          </div>

          {/* GitHub box */}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position:"relative",
              border:"1px solid rgba(255,255,255,0.1)",
              background:"rgba(255,255,255,0.02)",
              display:"flex", flexDirection:"column",
              justifyContent:"center", alignItems:"center",
              gap:"10px", textDecoration:"none", overflow:"hidden",
              cursor:"pointer",
              transition:"border-color 0.2s, background 0.2s",
              clipPath:"polygon(6px 0%,100% 0%,100% calc(100% - 6px),calc(100% - 6px) 100%,0% 100%,0% 6px)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.35)";
              (e.currentTarget as HTMLElement).style.background  = "rgba(255,255,255,0.05)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
              (e.currentTarget as HTMLElement).style.background  = "rgba(255,255,255,0.02)";
            }}
          >
            <div style={{ position:"absolute", top:"-30px", right:"-30px", width:80, height:80, borderRadius:"50%", background:"radial-gradient(circle,rgba(255,255,255,0.07),transparent)", pointerEvents:"none" }}/>
            <FaGithub size={26} color="rgba(255,255,255,0.85)"/>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.33rem", letterSpacing:"0.28em", color:"rgba(255,255,255,0.32)", textAlign:"center", lineHeight:1.6 }}>
              GITHUB<br/>MODULE
            </div>
            <div style={{ position:"absolute", bottom:8, display:"flex", alignItems:"center", gap:4 }}>
              <ArrowUpRight size={10} color="rgba(255,255,255,0.25)"/>
              <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.27rem", letterSpacing:"0.18em", color:"rgba(255,255,255,0.2)" }}>OPEN</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
});

ProjectModal.displayName = "ProjectModal";

// ─── STAT CARD ───────────────────────────────────────────────────────────────

function StatCard({ label, value, icon }: { label:string; value:string; icon:StatIcon }) {
  const icons = {
    brain: <Brain size={14} color="rgba(255,255,255,0.65)"/>,
    db:    <Database size={14} color="rgba(255,255,255,0.65)"/>,
    cpu:   <Cpu size={14} color="rgba(255,255,255,0.65)"/>,
    arrow: <ArrowUpRight size={14} color="rgba(255,255,255,0.65)"/>,
    zap:   <Zap size={14} color="rgba(255,255,255,0.65)"/>,
  };
  return (
    <div style={{
      padding: "12px 14px",
      border: "1px solid rgba(255,255,255,0.07)",
      background: "rgba(255,255,255,0.018)",
      clipPath: "polygon(5px 0%,100% 0%,100% calc(100% - 5px),calc(100% - 5px) 100%,0% 100%,0% 5px)",
    }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"10px" }}>
        {icons[icon] ?? icons.zap}
        <div style={{ width:12, height:1, background:"rgba(255,255,255,0.12)" }}/>
      </div>
      <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.32rem", letterSpacing:"0.28em", color:"rgba(255,255,255,0.2)", marginBottom:"5px" }}>{label}</div>
      <div style={{ fontFamily:"var(--font-orbitron)", fontSize:"0.65rem", fontWeight:700, color:"rgba(255,255,255,0.88)", letterSpacing:"0.05em" }}>{value}</div>
    </div>
  );
}

// ─── TECH PILL ────────────────────────────────────────────────────────────────

function TechPill({ tech }: { tech:string }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "5px 10px",
        border: `1px solid ${hov ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)"}`,
        background: hov ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
        fontFamily: "var(--font-mono)", fontSize:"0.35rem", letterSpacing:"0.2em",
        color: hov ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.38)",
        transition: "all 0.18s ease", cursor:"default",
        clipPath: "polygon(3px 0%,100% 0%,100% calc(100% - 3px),calc(100% - 3px) 100%,0% 100%,0% 3px)",
      }}
    >
      {tech}
    </div>
  );
}