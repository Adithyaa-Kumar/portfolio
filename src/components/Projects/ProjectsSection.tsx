"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { X, ArrowUpRight, Cpu, Database, Brain, Zap } from "lucide-react";

/*
═══════════════════════════════════════════════════════════════════════

  ProjectsSection.tsx — MASTER REBUILD

  ARCHITECTURE:
  ─────────────────────────────────────────────────────────────────────
  • Seamless infinite loop via GSAP ticker (NOT CSS animation)
    - Tracks a single xOffset float, applies via transform
    - Pause/resume by setting speed to 0 / restore
    - Loop: when offset < -singleSetWidth → jump by +singleSetWidth
    - Two copies of the 5 cards rendered side by side
    - Jump is invisible because card[n] === card[n+5]

  • NO react-state animation — all transforms are direct DOM
    - Zero re-render cost on every frame
    - 60fps guaranteed — pure GSAP ticker

  • Hover system:
    - onMouseEnter: speed → 0 (freeze), card lifts via GSAP
    - onMouseLeave: speed → BASE_SPEED (resume), card settles
    - Modal click: speed → 0, modal opens

  • Modal:
    - Opens IN the project section (position:fixed within section)
    - Background blurs via backdrop-filter on overlay
    - GSAP scale+fade entry
    - X closes → speed resumes

  • Cards:
    - Fixed size: 320×420px
    - Top 55%: project image (grayscale, contrast boosted)
    - Bottom 45%: title, short desc, github icon box
    - Cut-corner clip-path (techy, not rounded)
    - Border brightens on hover

  PERFORMANCE:
  ─────────────────────────────────────────────────────────────────────
  • GSAP ticker at 60fps — requestAnimationFrame based
  • All card transforms: translateX/Y/scale only
  • will-change: transform on moving track
  • Image: Next.js <Image> with priority on first 5
  • No Framer Motion (removed — caused FPS drops with infinite loops)
  • No CSS animations in the hot path

═══════════════════════════════════════════════════════════════════════
*/

// ─── PROJECT DATA ────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    title: "Cinematic AI Portfolio",
    short: "Futuristic OS-inspired portfolio with cinematic motion systems.",
    description:
      "A futuristic AI operating-system-inspired portfolio built with cinematic motion systems, layered UI architecture, persistent dashboard states, and immersive transformation-driven navigation. Every transition is engineered for cinematic quality — boot sequences, glitch reveals, parallax portrait, and signal corruption effects.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    github: "https://github.com/adithyaak",
    stack: ["Next.js", "TypeScript", "GSAP", "TailwindCSS", "Framer Motion"],
    stats: [
      { label: "INTELLIGENCE", value: "ACTIVE",    icon: "brain"  },
      { label: "STATE",        value: "ONLINE",    icon: "db"     },
      { label: "SYSTEM",       value: "OPTIMIZED", icon: "cpu"    },
      { label: "MODULE",       value: "DEPLOYED",  icon: "arrow"  },
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
    stats: [
      { label: "INFERENCE",  value: "REALTIME",  icon: "brain"  },
      { label: "STATE",      value: "STREAMING", icon: "db"     },
      { label: "MODALITIES", value: "3 ACTIVE",  icon: "cpu"    },
      { label: "MODULE",     value: "DEPLOYED",  icon: "arrow"  },
    ],
  },
  {
    id: 3,
    title: "Neural Vision Engine",
    short: "Real-time computer vision pipeline for edge inference.",
    description:
      "A real-time computer vision pipeline for intelligent visual analysis, optimized object tracking, and edge inference deployment with high-performance streaming systems. Real latency constraints, CUDA-accelerated inference, TensorRT optimization for sub-10ms detection.",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1200&auto=format&fit=crop",
    github: "https://github.com/adithyaak",
    stack: ["Python", "YOLO", "OpenCV", "TensorRT", "CUDA", "Flask"],
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
    stats: [
      { label: "USERS",   value: "ACTIVE",   icon: "brain" },
      { label: "STATE",   value: "ONLINE",   icon: "db"    },
      { label: "INFRA",   value: "AWS",      icon: "cpu"   },
      { label: "MODULE",  value: "DEPLOYED", icon: "arrow" },
    ],
  },
];

// ─── CONSTANTS ───────────────────────────────────────────────
const CARD_W      = 320;   // card width px
const CARD_GAP    = 24;    // gap between cards px
const CARD_STRIDE = CARD_W + CARD_GAP;
const BASE_SPEED  = 0.6;   // px per frame at 60fps

type Project = typeof PROJECTS[number];

// ════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ════════════════════════════════════════════════════════════
export default function ProjectsSection() {
  const trackRef       = useRef<HTMLDivElement>(null);
  const wrapperRef     = useRef<HTMLDivElement>(null);
  const offsetRef      = useRef(0);          // current x offset (px, always negative/zero)
  const speedRef       = useRef(BASE_SPEED); // current speed multiplier
  const tickerRef = useRef<(() => void) | null>(null);
  const singleWidthRef = useRef(0);          // width of one set of 5 cards
  const modalRef       = useRef<HTMLDivElement>(null);
  const overlayRef     = useRef<HTMLDivElement>(null);

  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [modalVisible,  setModalVisible]  = useState(false);

  // ── CALCULATE SINGLE SET WIDTH ────────────────────────────
  useEffect(() => {
    singleWidthRef.current = PROJECTS.length * CARD_STRIDE;
  }, []);

  // ── GSAP TICKER LOOP ─────────────────────────────────────
  // Runs every frame. Applies transform directly to track DOM node.
  // No React state involved → zero re-renders.
  useEffect(() => {
  const track = trackRef.current;

  if (!track) return;

  const sw = PROJECTS.length * CARD_STRIDE;

  singleWidthRef.current = sw;

  const xSetter = gsap.quickSetter(track, "x", "px");

  const tick = () => {
    const speed = speedRef.current;

    if (speed === 0) return;

    offsetRef.current -= speed;

    if (offsetRef.current <= -sw) {
      offsetRef.current += sw;
    }

    xSetter(offsetRef.current);
  };

  gsap.ticker.fps(60);
  gsap.ticker.add(tick);

  tickerRef.current = tick;

  return () => {
    gsap.ticker.remove(tick);
  };
}, []);
  // ── PAUSE / RESUME ────────────────────────────────────────
  const pause   = useCallback(() => { speedRef.current = 0; },             []);
  const resume  = useCallback(() => { speedRef.current = BASE_SPEED; },    []);

  // ── OPEN MODAL ────────────────────────────────────────────
  const openModal = useCallback((project: Project) => {
    pause();
    setActiveProject(project);
    setModalVisible(true);
  }, [pause]);

  // ── CLOSE MODAL ──────────────────────────────────────────
  const closeModal = useCallback(() => {
    if (!modalRef.current || !overlayRef.current) return;

    gsap.to(modalRef.current, {
      scale: 0.94, opacity: 0, y: 20,
      duration: 0.28, ease: "power2.in",
      onComplete: () => {
        setModalVisible(false);
        setActiveProject(null);
        resume();
      },
    });
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.28, ease: "power2.in",
    });
  }, [resume]);

  // ── MODAL ENTRY ANIMATION ────────────────────────────────
  useEffect(() => {
    if (modalVisible && modalRef.current && overlayRef.current) {
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: "power2.out" }
      );
      gsap.fromTo(modalRef.current,
        { scale: 0.9, opacity: 0, y: 40 },
        { scale: 1,   opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }
      );
    }
  }, [modalVisible]);

  // Two copies of projects for seamless loop
  const allCards = [...PROJECTS, ...PROJECTS];

  return (
    <div ref={wrapperRef} style={{
      position: "relative",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      padding: "24px 0 40px 0",
    }}>

      {/* ── AMBIENT GRID ─────────────────────────────────── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        opacity: 0.022,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
        `,
        backgroundSize: "70px 70px",
      }}/>

      {/* ── AMBIENT GLOW ─────────────────────────────────── */}
      <div style={{
        position: "absolute", top: "10%", left: "30%",
        width: "600px", height: "400px",
        background: "radial-gradient(circle, rgba(255,255,255,0.035), transparent 70%)",
        opacity: 0.22,
        pointerEvents: "none", zIndex: 0,
      }}/>

      {/* ── SECTION HEADER ───────────────────────────────── */}
      <div style={{ paddingLeft: "24px", marginBottom: "32px", position: "relative", zIndex: 5 }}>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.4rem", letterSpacing: "0.44em",
          color: "rgba(255,255,255,0.2)", marginBottom: "10px",
          display: "flex", alignItems: "center", gap: "10px",
        }}>
          <span style={{ display:"inline-block", width:"20px", height:"1px", background:"rgba(255,255,255,0.2)" }}/>
          ACTIVE MODULE ARCHIVE · {PROJECTS.length} SYSTEMS
        </div>
        <div style={{
          fontFamily: "var(--font-rajdhani)",
          fontSize: "clamp(0.88rem, 1.1vw, 1rem)",
          lineHeight: 1.8, fontWeight: 400,
          color: "rgba(255,255,255,0.5)",
          maxWidth: "680px",
        }}>
          Floating subsystem modules — AI systems, engineering infrastructure,
          cinematic interfaces, and intelligent digital architectures.
        </div>
      </div>

      {/* ── TRACK WRAPPER ────────────────────────────────── */}
      <div style={{
        position: "relative", width: "100%", overflow: "hidden",
        padding: "16px 0 24px 0",
        zIndex: 5,
      }}>
        {/* Top track line */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(to right, rgba(255,255,255,0.12), rgba(255,255,255,0.04), transparent)",
          pointerEvents: "none",
        }}/>

        {/* Sweep light on track */}
        <TrackSweep />

        {/* Bottom track line */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.04), rgba(255,255,255,0.12))",
          pointerEvents: "none",
        }}/>

        {/* THE MOVING TRACK */}
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: `${CARD_GAP}px`,
            width: "max-content",
            padding: "12px 24px",
            willChange: "transform",
            // CSS transform is applied directly by GSAP ticker
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
      </div>

      {/* ── EDGE FADES ───────────────────────────────────── */}
      <div style={{
        position: "absolute", top: 0, left: 0, bottom: 0, width: "60px",
        background: "linear-gradient(to right, #000, transparent)",
        pointerEvents: "none", zIndex: 6,
      }}/>
      <div style={{
        position: "absolute", top: 0, right: 0, bottom: 0, width: "60px",
        background: "linear-gradient(to left, #000, transparent)",
        pointerEvents: "none", zIndex: 6,
      }}/>

      {/* ── SCROLL HINT ──────────────────────────────────── */}
      <div style={{
        position: "absolute", bottom: "12px", left: "50%",
        transform: "translateX(-50%)",
        fontFamily: "var(--font-mono)",
        fontSize: "0.32rem", letterSpacing: "0.4em",
        color: "rgba(255,255,255,0.15)",
        zIndex: 7,
      }}>
        HOVER TO PAUSE · CLICK TO EXPAND
      </div>

      {/* ── MODAL ────────────────────────────────────────── */}
      {modalVisible && activeProject && (
        <div
          ref={overlayRef}
          onClick={(e) => { if (e.target === overlayRef.current) closeModal(); }}
          style={{
            position: "fixed",
top: 0,
left: 0,
width: "100vw",
height: "100vh",
            zIndex: 99999,
            background: "rgba(0,0,0,0.75)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "32px",
          }}
        >
          <ProjectModal
            ref={modalRef}
            project={activeProject}
            onClose={closeModal}
          />
        </div>
      )}

      {/* KEYFRAMES */}
      <style>{`
        @keyframes track-sweep {
          0%   { left: -200px; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { left: 110%; opacity: 0; }
        }
        @keyframes sidenav-pulse {
          0%,100% { opacity:1; box-shadow:0 0 0 0 rgba(255,255,255,0.5); }
          50%      { opacity:0.3; box-shadow:0 0 0 4px rgba(255,255,255,0); }
        }
      `}</style>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// TRACK SWEEP — ambient moving light on the track line
// ════════════════════════════════════════════════════════════
function TrackSweep() {
  return (
    <div style={{
      position: "absolute", top: 0, left: "-200px",
      width: "200px", height: "1px",
      background: "linear-gradient(to right, transparent, rgba(255,255,255,0.75), transparent)",
      animation: "track-sweep 5s linear infinite",
      zIndex: 10, pointerEvents: "none",
    }}/>
  );
}

// ════════════════════════════════════════════════════════════
// PROJECT CARD
// ════════════════════════════════════════════════════════════
function ProjectCard({
  project, onHoverStart, onHoverEnd, onSelect, isPriority,
}: {
  project: Project;
  onHoverStart: () => void;
  onHoverEnd:   () => void;
  onSelect:     (p: Project) => void;
  isPriority:   boolean;
}) {
  const cardRef    = useRef<HTMLDivElement>(null);
  const glowRef    = useRef<HTMLDivElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);
  const imageRef   = useRef<HTMLDivElement>(null);
  const borderRef  = useRef<HTMLDivElement>(null);

  const onEnter = useCallback(() => {
    onHoverStart();
gsap.killTweensOf(cardRef.current);
    gsap.to(cardRef.current, {
      y: -14, scale: 1.025,
      borderColor: "rgba(255,255,255,0.28)",
      boxShadow: "0 10px 24px rgba(0,0,0,0.32)",
      duration: 0.18, ease: "power2.out",
    });

    // Image zooms slightly
    gsap.to(imageRef.current, {
      scale: 1.05, duration: 0.45, ease: "power2.out",
    });

    // Glow brightens
    gsap.to(glowRef.current, {
      opacity: 0.8, duration: 0.3,
    });

    // Line draws in
    gsap.to(lineRef.current, {
      transform: "scaleX(1)", duration: 0.4, ease: "expo.out",
    });
  }, [onHoverStart]);

  const onLeave = useCallback(() => {
    onHoverEnd();
gsap.killTweensOf(cardRef.current);
    gsap.to(cardRef.current, {
      y: 0, scale: 1,
      borderColor: "rgba(255,255,255,0.09)",
      boxShadow: "none",
      duration: 0.2, ease: "power2.out",
    });
    gsap.to(imageRef.current, {
      scale: 1, duration: 0.45, ease: "power2.out",
    });
    gsap.to(glowRef.current, {
      opacity: 0.25, duration: 0.3,
    });
    gsap.to(lineRef.current, {
      transform: "scaleX(0)", duration: 0.28, ease: "power2.in",
    });
  }, [onHoverEnd]);

  const onClick = useCallback(() => {
    // Quick scale click feedback
    gsap.to(cardRef.current, {
      scale: 0.97, duration: 0.08,
      onComplete: () => {
        gsap.to(cardRef.current, { scale: 1.025, duration: 0.15 });
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
        height: "420px",
        flexShrink: 0,
        border: "1px solid rgba(255,255,255,0.09)",
        background: "rgba(8,8,8,0.95)",
        cursor: "pointer",
        overflow: "hidden",
        transform: "translateZ(0)",
backfaceVisibility: "hidden",
        // Cut-corner shape — techy
        clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
        willChange: "transform",
      }}
    >
      {/* Corner bracket markers */}
      <CornerBrackets/>

      {/* Ambient glow top-right */}
      <div ref={glowRef} style={{
        position: "absolute", top: "-40px", right: "-40px",
        width: "160px", height: "160px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%)",
        opacity: 0.25, pointerEvents: "none", zIndex: 2,
        transition: "opacity 0.3s ease",
      }}/>

      {/* IMAGE AREA — top 54% */}
      <div style={{
        position: "relative", width: "100%", height: "54%",
        overflow: "hidden", flexShrink: 0,
      }}>
        <div ref={imageRef} style={{
          position: "absolute", inset: 0,
          willChange: "transform",
        }}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority={isPriority}
            style={{
              objectFit: "cover",
              filter: "grayscale(100%) contrast(1.08) brightness(0.82)",
            }}
          />
        </div>

        {/* Image gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.72) 100%)",
          zIndex: 2,
        }}/>

        {/* Top metadata row */}
        <div style={{
          position: "absolute", top: "14px", left: "14px", right: "14px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          zIndex: 3,
        }}>
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.36rem", letterSpacing: "0.32em",
            color: "rgba(255,255,255,0.65)",
          }}>
            ACTIVE MODULE
          </div>
          <div style={{
            width: "8px", height: "8px",
            background: "rgba(255,255,255,0.85)",
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            animation: "sidenav-pulse 2s ease infinite",
          }}/>
        </div>

        {/* ID tag bottom-left of image */}
        <div style={{
          position: "absolute", bottom: "12px", left: "14px", zIndex: 3,
          fontFamily: "var(--font-mono)", fontSize: "0.34rem",
          letterSpacing: "0.28em", color: "rgba(255,255,255,0.3)",
        }}>
          SYS_{String(project.id).padStart(3,"0")}
        </div>

        {/* Horizontal scan line on image (decorative) */}
        <div style={{
          position: "absolute", top: "50%", left: 0, right: 0,
          height: "1px", background: "rgba(255,255,255,0.04)",
          zIndex: 3, pointerEvents: "none",
        }}/>
      </div>

      {/* DIVIDER LINE — draws in on hover */}
      <div ref={lineRef} style={{
        position: "absolute",
        top: "54%",
        left: 0, right: 0,
        height: "1px",
        background: "linear-gradient(to right, rgba(255,255,255,0.7), transparent)",
        transformOrigin: "left",
        transform: "scaleX(0)",
        zIndex: 4,
      }}/>

      {/* CONTENT AREA — bottom 46% */}
      <div style={{
        position: "absolute",
        top: "54%", left: 0, right: 0, bottom: 0,
        padding: "18px 18px 16px 18px",
        display: "flex", flexDirection: "column",
        zIndex: 3,
      }}>
        {/* Title */}
        <div style={{
          fontFamily: "var(--font-orbitron)",
          fontSize: "0.82rem", fontWeight: 700,
          letterSpacing: "0.03em",
          color: "rgba(255,255,255,0.94)",
          lineHeight: 1.3,
          marginBottom: "10px",
        }}>
          {project.title}
        </div>

        {/* Short description */}
        <div style={{
          fontFamily: "var(--font-rajdhani)",
          fontSize: "0.82rem",
          lineHeight: 1.7, fontWeight: 400,
          color: "rgba(255,255,255,0.45)",
          flex: 1,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
        }}>
          {project.short}
        </div>

        {/* Bottom row: VIEW + GITHUB */}
        <div style={{
          marginTop: "12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "12px",
        }}>
          {/* View label */}
          <div style={{
            display: "flex", alignItems: "center", gap: "8px",
          }}>
            <div style={{ width:"16px", height:"1px", background:"rgba(255,255,255,0.2)" }}/>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.34rem", letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.38)",
              transition: "color 0.2s ease",
            }}>
              VIEW SYSTEM
            </div>
          </div>

          {/* GitHub icon box */}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "36px", height: "36px",
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.03)",
              display: "flex", alignItems: "center", justifyContent: "center",
              // Small cut-corner on github box too
              clipPath: "polygon(4px 0%, 100% 0%, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0% 100%, 0% 4px)",
              transition: "border-color 0.2s ease, background 0.2s ease",
              cursor: "pointer",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.45)";
              (e.currentTarget as HTMLElement).style.background  = "rgba(255,255,255,0.06)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.14)";
              (e.currentTarget as HTMLElement).style.background  = "rgba(255,255,255,0.03)";
            }}
          >
            <FaGithub size={15} color="rgba(255,255,255,0.78)"/>
          </a>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// CORNER BRACKETS — decorative cut-corner markers on card
// ════════════════════════════════════════════════════════════
function CornerBrackets() {
  const s: React.CSSProperties = { position: "absolute", zIndex: 10, pointerEvents: "none" };
  const line = (w: number, h: number, bg: string): React.CSSProperties => ({
    width: w, height: h, background: bg,
  });
  return (
    <>
      {/* TL */}
      <div style={{ ...s, top: 2, left: 2 }}>
        <div style={line(10,1,"rgba(255,255,255,0.4)")}/>
        <div style={line(1,10,"rgba(255,255,255,0.4)")}/>
      </div>
      {/* TR */}
      <div style={{ ...s, top: 2, right: 16, display:"flex", flexDirection:"column", alignItems:"flex-end" }}>
        <div style={line(10,1,"rgba(255,255,255,0.4)")}/>
        <div style={{ ...line(1,10,"rgba(255,255,255,0.4)"), alignSelf:"flex-end" }}/>
      </div>
      {/* BL */}
      <div style={{ ...s, bottom: 2, left: 2, display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
        <div style={line(1,10,"rgba(255,255,255,0.4)")}/>
        <div style={line(10,1,"rgba(255,255,255,0.4)")}/>
      </div>
      {/* BR */}
      <div style={{ ...s, bottom: 16, right: 2, display:"flex", flexDirection:"column", alignItems:"flex-end", justifyContent:"flex-end" }}>
        <div style={{ ...line(1,10,"rgba(255,255,255,0.4)"), alignSelf:"flex-end" }}/>
        <div style={line(10,1,"rgba(255,255,255,0.4)")}/>
      </div>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// PROJECT MODAL — expanded card view
// ════════════════════════════════════════════════════════════
const ProjectModal = ({
  project, onClose, ref,
}: {
  project: Project;
  onClose: () => void;
  ref: React.RefObject<HTMLDivElement | null>;
}) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Close button hover
  const hoverClose = (e: boolean) => {
    gsap.to(closeBtnRef.current, {
      borderColor: e ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.14)",
      background:  e ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.02)",
      duration: 0.2,
    });
  };

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: "min(1200px, 92vw)",
        maxHeight: "86vh",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.1)",
        background: "rgba(6,6,6,0.98)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        // Cut-corner on modal too
        clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
      }}
    >
      {/* Ambient grid inside modal */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        opacity: 0.018,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.08) 1px,transparent 1px)`,
        backgroundSize: "60px 60px",
      }}/>

      {/* Corner brackets on modal */}
      <div style={{ position:"absolute", top:4, left:4, zIndex:20, pointerEvents:"none" }}>
        <div style={{ width:"16px", height:"1px", background:"rgba(255,255,255,0.45)" }}/>
        <div style={{ width:"1px",  height:"16px", background:"rgba(255,255,255,0.45)" }}/>
      </div>
      <div style={{ position:"absolute", bottom:20, right:4, zIndex:20, pointerEvents:"none", display:"flex", flexDirection:"column", alignItems:"flex-end" }}>
        <div style={{ width:"1px", height:"16px", background:"rgba(255,255,255,0.45)", alignSelf:"flex-end" }}/>
        <div style={{ width:"16px", height:"1px", background:"rgba(255,255,255,0.45)" }}/>
      </div>

      {/* ── LEFT PANEL ─────────────────────────────────── */}
      <div style={{
        position: "relative", zIndex: 1,
        padding: "40px 36px",
        display: "flex", flexDirection: "column",
        borderRight: "1px solid rgba(255,255,255,0.07)",
        overflowY: "auto",
        scrollbarWidth: "none",
      }}>
        {/* System ID label */}
        <div style={{
          display: "flex", alignItems: "center", gap: "10px", marginBottom: "22px",
        }}>
          <div style={{ width:"22px", height:"1px", background:"rgba(255,255,255,0.22)" }}/>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "0.38rem",
            letterSpacing: "0.4em", color: "rgba(255,255,255,0.22)",
          }}>
            PROJECT SUBSYSTEM · SYS_{String(project.id).padStart(3,"0")}
          </div>
        </div>

        {/* Title */}
        <div style={{
          fontFamily: "var(--font-orbitron)",
          fontSize: "clamp(1.5rem, 2.5vw, 2.4rem)",
          fontWeight: 900, letterSpacing: "0.03em",
          color: "rgba(255,255,255,0.96)",
          lineHeight: 1.15, marginBottom: "24px",
        }}>
          {project.title}
        </div>

        {/* Divider */}
        <div style={{ width:"60px", height:"1px", background:"rgba(255,255,255,0.18)", marginBottom:"24px" }}/>

        {/* Description */}
        <div style={{
          fontFamily: "var(--font-rajdhani)",
          fontSize: "0.95rem", lineHeight: 2, fontWeight: 400,
          color: "rgba(255,255,255,0.56)",
          marginBottom: "30px",
        }}>
          {project.description}
        </div>

        {/* Stats grid */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "12px", marginBottom: "28px",
        }}>
          {project.stats.map((stat) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} icon={stat.icon}/>
          ))}
        </div>

        {/* Tech stack */}
        <div style={{ marginTop: "auto" }}>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "0.38rem",
            letterSpacing: "0.42em", color: "rgba(255,255,255,0.22)",
            marginBottom: "14px",
          }}>
            TECHNOLOGY STACK
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {project.stack.map((tech) => (
              <TechPill key={tech} tech={tech}/>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ────────────────────────────────── */}
      <div style={{
        position: "relative", zIndex: 1,
        padding: "40px 36px 36px 36px",
        display: "flex", flexDirection: "column",
        gap: "16px",
      }}>
        {/* CLOSE BUTTON */}
        <button
          ref={closeBtnRef}
          onClick={onClose}
          onMouseEnter={() => hoverClose(true)}
          onMouseLeave={() => hoverClose(false)}
          style={{
            position: "absolute", top: "18px", right: "28px",
            width: "44px", height: "44px",
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(255,255,255,0.02)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", zIndex: 20,
            clipPath: "polygon(4px 0%,100% 0%,100% calc(100% - 4px),calc(100% - 4px) 100%,0% 100%,0% 4px)",
          }}
        >
          <X size={16} color="rgba(255,255,255,0.8)"/>
        </button>

        {/* Main project image — larger */}
        <div style={{
          position: "relative", width: "100%",
          height: "260px", overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.07)",
          flexShrink: 0,
        }}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            style={{
              objectFit: "cover",
              filter: "grayscale(100%) contrast(1.1) brightness(0.85)",
            }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.45))",
          }}/>
          {/* Image label */}
          <div style={{
            position: "absolute", bottom: "12px", left: "14px",
            fontFamily: "var(--font-mono)", fontSize: "0.34rem",
            letterSpacing: "0.28em", color: "rgba(255,255,255,0.35)",
          }}>
            PRIMARY · {project.title.toUpperCase()}
          </div>
        </div>

        {/* Bottom row: secondary image + github box */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 160px", gap: "16px", flex: 1 }}>
          {/* Secondary image */}
          <div style={{
            position: "relative", overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.07)",
            minHeight: "140px",
          }}>
            <Image
              src={project.image}
              alt={project.title}
              fill
              style={{
                objectFit: "cover",
                filter: "grayscale(100%) contrast(1.05) brightness(0.7)",
              }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(135deg, rgba(0,0,0,0.3), rgba(0,0,0,0.6))",
            }}/>
            <div style={{
              position: "absolute", bottom: "10px", left: "12px",
              fontFamily: "var(--font-mono)", fontSize: "0.32rem",
              letterSpacing: "0.28em", color: "rgba(255,255,255,0.3)",
            }}>
              SECONDARY VIEW
            </div>
          </div>

          {/* GitHub redirect box */}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: "relative",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.02)",
              display: "flex", flexDirection: "column",
              justifyContent: "center", alignItems: "center",
              gap: "12px", textDecoration: "none", overflow: "hidden",
              cursor: "pointer",
              transition: "border-color 0.2s ease, background 0.2s ease",
              clipPath: "polygon(6px 0%,100% 0%,100% calc(100% - 6px),calc(100% - 6px) 100%,0% 100%,0% 6px)",
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
            {/* Glow */}
            <div style={{
              position: "absolute", top: "-30px", right: "-30px",
              width: "100px", height: "100px", borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,255,255,0.07), transparent)",
              pointerEvents: "none",
            }}/>

            <FaGithub size={30} color="rgba(255,255,255,0.88)"/>

            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.36rem", letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.35)",
              textAlign: "center",
              lineHeight: 1.6,
            }}>
              GITHUB<br/>MODULE
            </div>

            <div style={{
              position: "absolute", bottom: "10px",
              display: "flex", alignItems: "center", gap: "5px",
            }}>
              <ArrowUpRight size={11} color="rgba(255,255,255,0.28)"/>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: "0.3rem",
                letterSpacing: "0.2em", color: "rgba(255,255,255,0.2)",
              }}>
                REDIRECT
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════
// STAT CARD — inside modal
// ════════════════════════════════════════════════════════════
function StatCard({ label, value, icon }: { label:string; value:string; icon:string }) {
  const iconEl = {
    brain: <Brain size={16} color="rgba(255,255,255,0.7)"/>,
    db:    <Database size={16} color="rgba(255,255,255,0.7)"/>,
    cpu:   <Cpu size={16} color="rgba(255,255,255,0.7)"/>,
    arrow: <ArrowUpRight size={16} color="rgba(255,255,255,0.7)"/>,
    zap:   <Zap size={16} color="rgba(255,255,255,0.7)"/>,
  }[icon] ?? <Zap size={16} color="rgba(255,255,255,0.7)"/>;

  return (
    <div style={{
      padding: "14px 16px",
      border: "1px solid rgba(255,255,255,0.07)",
      background: "rgba(255,255,255,0.018)",
      clipPath: "polygon(6px 0%,100% 0%,100% calc(100% - 6px),calc(100% - 6px) 100%,0% 100%,0% 6px)",
    }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"12px" }}>
        {iconEl}
        <div style={{ width:"14px", height:"1px", background:"rgba(255,255,255,0.15)" }}/>
      </div>
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: "0.34rem",
        letterSpacing: "0.3em", color: "rgba(255,255,255,0.22)",
        marginBottom: "6px",
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: "var(--font-orbitron)", fontSize: "0.7rem",
        fontWeight: 700, color: "rgba(255,255,255,0.88)",
        letterSpacing: "0.05em",
      }}>
        {value}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// TECH PILL — stack items in modal
// ════════════════════════════════════════════════════════════
function TechPill({ tech }: { tech: string }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "7px 12px",
        border: `1px solid ${hov ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)"}`,
        background: hov ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
        fontFamily: "var(--font-mono)",
        fontSize: "0.38rem", letterSpacing: "0.22em",
        color: hov ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.4)",
        transition: "all 0.18s ease",
        clipPath: "polygon(4px 0%,100% 0%,100% calc(100% - 4px),calc(100% - 4px) 100%,0% 100%,0% 4px)",
        cursor: "default",
      }}
    >
      {tech}
    </div>
  );
}