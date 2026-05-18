"use client";

import { useEffect, useRef, useState, useCallback, forwardRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { X, ArrowUpRight, Cpu, Database, Brain, Zap } from "lucide-react";
import { PROJECTS as RAW_PROJECTS } from "@/data";
const PROJECTS = RAW_PROJECTS as unknown as Project[];
// ─── TYPES ───────────────────────────────────────────────────────────────────

type StatIcon = "brain" | "db" | "cpu" | "arrow" | "zap";

interface ProjectStat {
  label: string;
  value: string;
  icon: StatIcon;
}

interface Project {
  id: number | string;
  title: string;
  short: string;
  description: string;
  images: string[];
  github: string;
  stack: string[];
  stats: ProjectStat[];
  category: string;
  year: string;
}

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const CARD_W      = 380;
const CARD_H      = 460;
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
            fontSize: "0.6rem",
            letterSpacing: "0.44em",
            color: "rgba(255,255,255,0.2)",
          }}>
          PROJECT MODULE ARCHIVE · {PROJECTS.length} SYSTEMS
          </span>
        </div>
        <p style={{
          fontFamily: "var(--font-orbitron)",
          fontSize: "0.9",
          lineHeight: 1.3,
          fontWeight: 300,
          color: "rgba(255, 255, 255, 0.79)",
          maxWidth: "1000px",
          margin: 0,
        }}>
          Live subsystem modules — engineered concepts,
          immersive experiences, and evolving digital frameworks.
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
              key={`${index}`}
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
        background: "linear-gradient(160deg, rgba(22,22,22,0.98) 0%, rgba(8,8,8,0.99) 100%)",
        cursor: "pointer",
        overflow: "hidden",
        willChange: "transform",
        clipPath: "polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px))",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.1), 0 4px 24px rgba(0,0,0,0.5)",
        transition: "box-shadow 0.25s ease",
      }}
    >
      {/* Ambient glow */}
      <div ref={glowRef} style={{
        position: "absolute", top: "-80px", right: "-80px",
        width: "260px", height: "260px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,255,255,0.07), transparent 65%)",
        opacity: 0, pointerEvents: "none", zIndex: 2,
      }}/>

      {/* ── IMAGE — 50% height ─────────────────────────── */}
      <div style={{
        position: "relative",
        width: "100%",
        height: "50%",
        overflow: "hidden",
      }}>
        <div ref={imageRef} style={{ position: "absolute", inset: 0, willChange: "transform" }}>
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            priority={isPriority}
            style={{
              objectFit: "cover",
              filter: "grayscale(100%) contrast(1.1) brightness(0.75)",
            }}
          />
        </div>

        {/* Gradient over image */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.7) 100%)",
          zIndex: 2,
        }}/>

        {/* Top bar: category + pulse dot */}
        <div style={{
          position: "absolute", top: "14px", left: "14px", right: "14px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          zIndex: 3,
        }}>
          <div style={{
            width: "8px", height: "8px",
            background: "rgba(255, 255, 255, 0.82)",
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            animation: "card-pulse 2.2s ease infinite",
          }}/>
        </div>

        {/* Bottom bar: sys ID + year */}
        <div style={{
          position: "absolute", bottom: "12px", left: "14px", right: "14px",
          display: "flex", justifyContent: "space-between",
          zIndex: 3,
        }}>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.42rem",
            letterSpacing: "0.2em",
            color: "rgba(255, 255, 255, 0.6)",
          }}>
            {String(project.id).padStart(3,"0")}
          </span>
          <span style={{
            fontFamily: "var(--font-orbitron)",
            fontSize: "0.42rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            color: "rgba(255, 255, 255, 0.79)",
          }}>
            {project.year}
          </span>
        </div>
      </div>

      {/* Hover divider line */}
      <div ref={lineRef} style={{
        position: "absolute",
        top: "50%",
        left: 0, right: 0,
        height: "2px",
        background: "linear-gradient(to right, rgba(255,255,255,0.7), rgba(255,255,255,0.15), transparent)",
        transformOrigin: "left",
        transform: "scaleX(0)",
        zIndex: 4,
      }}/>
{/* ── CONTENT — 50% height — fixed layout, no dynamic growth ── */}
      <div style={{
        position: "absolute",
        top: "50%", left: 0, right: 0, bottom: 0,
        padding: "18px 20px 16px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        zIndex: 3,
        overflow: "hidden",   /* hard clip — nothing can escape the 50% box */
      }}>
        {/* Title — fixed 2-line max, ellipsis if longer */}
        <div style={{
          fontFamily: "var(--font-orbitron)",
          fontSize: "0.95rem",
          fontWeight: 700,
          letterSpacing: "0.02em",
          color: "rgba(255,255,255,0.95)",
          lineHeight: 1.25,
          // Fixed height = 2 lines × lineHeight 1.25 × fontSize 0.95rem
          height: "calc(0.95rem * 1.25 * 2)",
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          flexShrink: 0,
        }}>
          {project.title}
        </div>

        {/* Description — fixed 3-line max, ellipsis if longer */}
        <div style={{
          fontFamily: "var(--font-grotesk)",
          fontSize: "0.9rem",
          lineHeight: 1.65,
          fontWeight: 300,
          color: "rgba(255,255,255,0.5)",
          // Fixed height = 3 lines × lineHeight 1.65 × fontSize 0.9rem
          height: "calc(0.9rem * 1.65 * 3)",
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          flexShrink: 0,
        }}>
          {project.short}
        </div>
        {/* Stack pills */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {project.stack.slice(0, 3).map((s) => (
            <div key={s} style={{
              padding: "4px 10px",
              border: "1px solid rgba(255, 255, 255, 0.38)",
              background: "rgba(255,255,255,0.04)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              letterSpacing: "0.14em",
              color: "rgba(255, 255, 255, 0.75)",
            }}>
              {s}
            </div>
          ))}
          {project.stack.length > 3 && (
            <div style={{
              padding: "4px 8px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              letterSpacing: "0.14em",
              color: "rgba(255, 255, 255, 0.75)",
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
          paddingTop: "10px",
          borderTop: "1px solid rgba(255,255,255,0.07)",
        }}>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.4rem",
            letterSpacing: "0.22em",
            color: "rgba(255,255,255,0.2)",
          }}>
            CLICK TO EXPAND
          </span>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "36px", height: "36px",
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.03)",
              display: "flex", alignItems: "center", justifyContent: "center",
              clipPath: "polygon(4px 0%,100% 0%,100% calc(100% - 4px),calc(100% - 4px) 100%,0% 100%,0% 4px)",
              transition: "border-color 0.2s, background 0.2s",
              cursor: "pointer", flexShrink: 0,
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.5)";
              (e.currentTarget as HTMLElement).style.background  = "rgba(255,255,255,0.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
              (e.currentTarget as HTMLElement).style.background  = "rgba(255,255,255,0.03)";
            }}
          >
            <FaGithub size={16} color="rgba(255,255,255,0.75)"/>
          </a>
        </div>
      </div>

      {/* Corner brackets */}
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
      <div style={{ ...s, bottom: 2, left: 2, display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
        <div style={{ width: 1, height: 10, background: "rgba(255,255,255,0.45)" }}/>
        <div style={{ width: 10, height: 1, background: "rgba(255,255,255,0.45)" }}/>
      </div>
      <div style={{ ...s, bottom: 2, right: 2, display:"flex", flexDirection:"column", alignItems:"flex-end", justifyContent:"flex-end" }}>
        <div style={{ width: 1, height: 10, background: "rgba(255,255,255,0.45)", alignSelf:"flex-end" }}/>
        <div style={{ width: 10, height: 1, background: "rgba(255,255,255,0.45)" }}/>
      </div>
    </>
  );
}

const ProjectModal = forwardRef<HTMLDivElement, {
  project: Project;
  onClose: () => void;
}>(({ project, onClose }, ref) => {
  const [imgIdx, setImgIdx] = useState(0);
  const images = project.images ?? [];

  const prev = () => setImgIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setImgIdx((i) => (i + 1) % images.length);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: "min(1500px, 94vw)",
        height: "min(560px, 88vh)",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(6,6,6,0.99)",
        display: "grid",
        gridTemplateColumns: "1.25fr 1fr",   // left wider than right
        clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
        boxShadow: "0 40px 80px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.07)",
      }}
    >
      {/* Ambient grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.018,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.08) 1px,transparent 1px)`,
        backgroundSize: "44px 44px",
      }}/>

      {/* Corner brackets */}
      <div style={{ position:"absolute", top:4, left:4, zIndex:20, pointerEvents:"none" }}>
        <div style={{ width:14, height:1, background:"rgba(255,255,255,0.45)" }}/>
        <div style={{ width:1, height:14, background:"rgba(255,255,255,0.45)" }}/>
      </div>
      <div style={{ position:"absolute", bottom:4, right:4, zIndex:20, pointerEvents:"none", display:"flex", flexDirection:"column", alignItems:"flex-end" }}>
        <div style={{ width:1, height:14, background:"rgba(255,255,255,0.45)", alignSelf:"flex-end" }}/>
        <div style={{ width:14, height:1, background:"rgba(255,255,255,0.45)" }}/>
      </div>

      {/* ── LEFT PANEL — independently scrollable ──────────── */}
      <div style={{
        position: "relative", zIndex: 1,
        padding: "16px 16px 16px 16px",
        display: "flex", flexDirection: "column",
        borderRight: "1px solid rgba(255,255,255,0.07)",
        overflowY: "auto",
        scrollbarWidth: "none",
        height: "100%",
        gap: "0",
      }}>

        {/* System label */}
        <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"10px", marginTop:"10px" }}>
          <div style={{ width:16, height:1, background:"rgba(255,255,255,0.18)" }}/>
          <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.45rem", letterSpacing:"0.36em", color:"rgba(255,255,255,0.2)" }}>
            SYS_{String(project.id).padStart(3,"0")} · {project.category}
          </span>
        </div>

        {/* Title */}
        <div style={{
          fontFamily: "var(--font-orbitron)",
          fontSize: "clamp(1.1rem, 2vw, 1.7rem)",
          fontWeight: 900, letterSpacing: "0.02em",
          color: "rgba(255,255,255,0.96)",
          lineHeight: 1.15, marginBottom: "14px",
        }}>
          {project.title}
        </div>

        {/* Category + year */}
        <div style={{ display:"flex", gap:"7px", marginBottom:"16px", flexWrap:"wrap" }}>
          <div style={{
            padding:"3px 9px", border:"1px solid rgba(255, 255, 255, 0.27)",
            fontFamily:"var(--font-mono)", fontSize:"0.6rem", letterSpacing:"0.24em",
            color:"rgba(255, 255, 255, 0.83)",
          }}>
            {project.category}
          </div>
          <div style={{
            padding:"3px 9px", border:"1px solid rgba(255, 255, 255, 0.37)",
            fontFamily:"var(--font-mono)", fontSize:"0.6rem", letterSpacing:"0.24em",
            color:"rgba(255, 255, 255, 0.71)",
          }}>
            {project.year}
          </div>
        </div>

        {/* Divider */}
        <div style={{ width:100, height:1, background:"rgba(255,255,255,0.16)", marginBottom:"10px" }}/>

        {/* Description */}
        <p style={{
          fontFamily: "var(--font-grotesk)",
          fontSize: "0.99rem", lineHeight: 1.85, fontWeight: 300,
          color: "rgba(255, 255, 255, 0.8)", marginBottom: "20px",
        }}>
          {project.description}
        </p>
        {/* Stats grid */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginBottom:"15px" }}>
          {project.stats.map((stat) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} icon={stat.icon as "brain" | "db" | "cpu" | "arrow" | "zap"}/>
          ))}
        </div>

        {/* Stack */}
        <div>
          <div style={{
            fontFamily:"var(--font-mono)", fontSize:"0.7rem",
            letterSpacing:"0.6em", color:"rgba(255, 255, 255, 0.5)", marginBottom:"10px",
          }}>
            TECHNOLOGY STACK
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
            {project.stack.map((tech) => <TechPill key={tech} tech={tech}/>)}
          </div>
        </div>
      </div>

      

      {/* ── RIGHT PANEL — independently scrollable ─────────── */}
      {/* X close — top left of modal */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "14px", right: "14px",
            width: "35px", height: "35px",
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(255,255,255,0.02)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", zIndex: 20,
            clipPath: "polygon(3px 0%,100% 0%,100% calc(100% - 3px),calc(100% - 3px) 100%,0% 100%,0% 3px)",
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
          <X size={13} color="rgba(255,255,255,0.8)"/>
        </button>
<div style={{
  position: "relative",
  zIndex: 1,
  padding: "10px 20px 16px 20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  overflowY: "auto",
  scrollbarWidth: "none",
  height: "100%",
}}>

  {/* TOP META BAR */}
  <div style={{
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexShrink: 0,
  }}>
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
    }}>
      <div style={{
        width: "16px",
        height: "1px",
        background: "rgba(255, 255, 255, 0.52)",
      }}/>

      <span style={{
        fontFamily: "var(--font-orbitron)",
        fontSize: "0.7rem",
        letterSpacing: "0.34em",
        color: "rgba(255, 255, 255, 0.79)",
      }}>
        PROJECT VISUAL MODULE
      </span>
    </div>
  </div>

        {/* ── IMAGE VIEWER ──────────────────────────────── */}
        <div style={{
          position: "relative",
          width: "100%",
          height: "75%",
          flex: "1",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(12,12,12,1)",
          minHeight: "280px",
        }}>
          {/* Current image */}
          <Image
            src={images[imgIdx]}
            alt={`${project.title} — image ${imgIdx + 1}`}
            fill
            style={{
              objectFit: "cover",
              filter: "grayscale(100%) contrast(1.1) brightness(0.82)",
              transition: "opacity 0.3s ease",
            }}
          />

          {/* Gradient */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.4))",
            pointerEvents: "none",
          }}/>

          {/* Image counter */}
          <div style={{
            position: "absolute", top: "10px", right: "10px",
            fontFamily: "var(--font-mono)", fontSize: "0.3rem",
            letterSpacing: "0.28em", color: "rgba(255,255,255,0.35)",
            background: "rgba(0,0,0,0.6)", padding: "3px 8px",
          }}>
            {String(imgIdx + 1).padStart(2,"0")} / {String(images.length).padStart(2,"0")}
          </div>

          {/* Corner marks */}
          <div style={{ position:"absolute", top:6, left:6, pointerEvents:"none", zIndex:2 }}>
            <div style={{ width:10, height:1, background:"rgba(255,255,255,0.45)" }}/>
            <div style={{ width:1, height:10, background:"rgba(255,255,255,0.45)" }}/>
          </div>
          <div style={{ position:"absolute", bottom:6, right:6, pointerEvents:"none", zIndex:2, display:"flex", flexDirection:"column", alignItems:"flex-end" }}>
            <div style={{ width:1, height:10, background:"rgba(255,255,255,0.45)", alignSelf:"flex-end" }}/>
            <div style={{ width:10, height:1, background:"rgba(255,255,255,0.45)" }}/>
          </div>

          {/* Left arrow */}
          {images.length > 1 && (
            <button
              onClick={prev}
              style={{
                position: "absolute", left: "8px", top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.55)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.8)",
                width: "32px", height: "32px",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", zIndex: 5,
                fontFamily: "var(--font-grotesk)",
                fontSize: "1rem", lineHeight: 1,
                transition: "background 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.5)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.55)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
              }}
            >
              ‹
            </button>
          )}

          {/* Right arrow */}
          {images.length > 1 && (
            <button
              onClick={next}
              style={{
                position: "absolute", right: "8px", top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.55)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.8)",
                width: "32px", height: "32px",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", zIndex: 5,
                fontFamily: "var(--font-grotesk)",
                fontSize: "1rem", lineHeight: 1,
                transition: "background 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.5)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.55)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
              }}
            >
              ›
            </button>
          )}
        </div>

        {/* ── THUMBNAIL STRIP ──────────────────────────── */}
        {images.length > 1 && (
          <div style={{
            display: "flex",
            gap: "10px",
            flexShrink: 0,
          }}>
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setImgIdx(i)}
                style={{
                  width: "50px", height: "50px",
                  flexShrink: 0,
                  padding: 0, border: "none",
                  outline: "none", cursor: "pointer",
                  position: "relative", overflow: "hidden",
                  boxShadow: i === imgIdx
                    ? "0 0 0 2px rgba(255, 255, 255, 0.53)"
                    : "0 0 0 1px rgba(255,255,255,0.12)",
                  opacity: i === imgIdx ? 1 : 0.5,
                  transition: "all 0.18s ease",
                  background: "#000",
                }}
                onMouseEnter={(e) => {
                  if (i !== imgIdx) (e.currentTarget as HTMLElement).style.opacity = "0.8";
                }}
                onMouseLeave={(e) => {
                  if (i !== imgIdx) (e.currentTarget as HTMLElement).style.opacity = "0.5";
                }}
              >
                <Image
                  src={src}
                  alt={`thumb ${i + 1}`}
                  fill
                  style={{
                    objectFit: "cover",
                    filter: "grayscale(100%) brightness(0.75)",
                  }}
                />
              </button>
            ))}
          </div>
        )}

        {/* ── GITHUB BOTTOM ─────────────────────────────── */}
        <div style={{
          flexShrink: 0,
          display: "flex",
          justifyContent: "flex-end",
          paddingTop: "15px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}>
          
            <a href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "7px 14px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.02)",
              textDecoration: "none",
              cursor: "pointer",
              transition: "border-color 0.2s, background 0.2s",
              clipPath: "polygon(3px 0%,100% 0%,100% calc(100% - 3px),calc(100% - 3px) 100%,0% 100%,0% 3px)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.4)";
              (e.currentTarget as HTMLElement).style.background  = "rgba(255,255,255,0.06)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
              (e.currentTarget as HTMLElement).style.background  = "rgba(255,255,255,0.02)";
            }}
          >
            <FaGithub size={15} color="rgba(255,255,255,0.75)"/>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.24em",
              color: "rgba(255,255,255,0.55)",
            }}>
              VIEW SOURCE
            </span>
          </a>
        </div>
      </div>
    </div>
  );
});
// ─── STAT CARD ───────────────────────────────────────────────────────────────

function StatCard({ label, value, icon }: { label: string; value: string; icon: StatIcon }) {
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
      border: "1px solid rgba(255, 255, 255, 0.1)",
      background: "rgba(255,255,255,0.018)",
      clipPath: "polygon(5px 0%,100% 0%,100% calc(100% - 5px),calc(100% - 5px) 100%,0% 100%,0% 5px)",
    }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"10px" }}>
        {icons[icon] ?? icons.zap}
        <div style={{ width:12, height:1, background:"rgba(255, 255, 255, 0.26)" }}/>
      </div>
      <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.69rem", letterSpacing:"0.28em", color:"rgba(255, 255, 255, 0.46)", marginBottom:"5px" }}>
        {label}
      </div>
      <div style={{ fontFamily:"var(--font-orbitron)", fontSize:"0.65rem", fontWeight:700, color:"rgba(255,255,255,0.88)", letterSpacing:"0.05em" }}>
        {value}
      </div>
    </div>
  );
}

// ─── TECH PILL ────────────────────────────────────────────────────────────────

function TechPill({ tech }: { tech: string }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "5px 10px",
        border: `1px solid ${hov ? "rgba(255, 255, 255, 0.09)" : "rgba(255, 255, 255, 0.25)"}`,
        background: hov ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
        fontFamily: "var(--font-mono)", fontSize:"0.8rem", letterSpacing:"0.2em",
        color: hov ? "rgba(255, 255, 255, 0.87)" : "rgba(255, 255, 255, 0.44)",
        transition: "all 0.18s ease", cursor:"default",
        clipPath: "polygon(3px 0%,100% 0%,100% calc(100% - 3px),calc(100% - 3px) 100%,0% 100%,0% 3px)",
      }}
    >
      {tech}
    </div>
  );
}
ProjectModal.displayName = "ProjectModal";