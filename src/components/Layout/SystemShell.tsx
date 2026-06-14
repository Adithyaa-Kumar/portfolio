"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import SideNav from "./SideNav";
import SectionLabel from "../UI/SectionLabel";
import AboutSection from "../About/AboutSection";
import EducationSection from "../Education/EducationSection";
import SkillsSection from "../Skills/SkillsSection";
import ProjectsSection from "../Projects/ProjectsSection";
import CertificationsSection from "../Certifications/CertificationsSection";
import ContactSection from "../Contact/ContactSection";

export type SectionId =
  | "about"
  | "education"
  | "skills"
  | "projects"
  | "certifications"
  | "contact";

const SECTION_ORDER: SectionId[] = [
  "about",
  "education",
  "skills",
  "projects",
  "certifications",
  "contact",
];

const BOUNDARY_THRESHOLD = 8;
const MIN_DELTA = 30;
const LOCK_MS = 700;

export default function SystemShell() {
  const shellRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);

  const [activeSection, setActiveSection] = useState<SectionId>("about");
  const [labelKey, setLabelKey] = useState(0);

  // ── NEW: modal-open flag — freezes all outer scroll while true
  const modalOpenRef = useRef(false);

  const snapLocked = useRef(false);
  const wheelAccum = useRef(0);
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Called by ProjectsSection when modal opens/closes ──────
  const handleModalOpen = useCallback((open: boolean) => {
    modalOpenRef.current = open;

    const container = contentRef.current;
    if (!container) return;

    if (open) {
      // Hard-freeze the outer scroll container
      container.style.overflow = "hidden";
    } else {
      // Restore scrollability
      container.style.overflowY = "scroll";
      container.style.overflowX = "hidden";
    }
  }, []);

  const getSectionEl = (id: SectionId) =>
    document.getElementById(`section-${id}`) as HTMLElement | null;

  const getActiveSectionFromScroll = useCallback((): SectionId => {
    const container = contentRef.current;
    if (!container) return "about";
    const scrollTop = container.scrollTop;
    const viewH = container.clientHeight;
    for (let i = SECTION_ORDER.length - 1; i >= 0; i--) {
      const el = getSectionEl(SECTION_ORDER[i]);
      if (!el) continue;
      if (el.offsetTop <= scrollTop + viewH * 0.35) {
        return SECTION_ORDER[i];
      }
    }
    return "about";
  }, []);

  const snapToSection = useCallback((id: SectionId) => {
    const container = contentRef.current;
    const el = getSectionEl(id);
    if (!container || !el) return;

    snapLocked.current = true;

    const targetTop = el.offsetTop;

    gsap.to(container, {
      scrollTop: targetTop,
      duration: 0.65,
      ease: "power3.inOut",
      onComplete: () => {
        setTimeout(() => {
          snapLocked.current = false;
        }, LOCK_MS - 650);
      },
    });

    if (id !== activeSection) {
      setActiveSection(id);
      setLabelKey(k => k + 1);
    }
  }, [activeSection]);

  const switchSection = useCallback((id: SectionId) => {
    snapToSection(id);
  }, [snapToSection]);

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Block ALL outer scroll while modal is open
      if (modalOpenRef.current) {
        e.preventDefault();
        return;
      }

      if (snapLocked.current) {
        e.preventDefault();
        return;
      }

      const deltaY = e.deltaY;
      wheelAccum.current += deltaY;

      if (wheelTimer.current) clearTimeout(wheelTimer.current);
      wheelTimer.current = setTimeout(() => {
        wheelAccum.current = 0;
      }, 150);

      if (Math.abs(wheelAccum.current) < MIN_DELTA) {
        return;
      }

      const scrollingDown = wheelAccum.current > 0;
      wheelAccum.current = 0;

      const currentId = getActiveSectionFromScroll();
      const currentIdx = SECTION_ORDER.indexOf(currentId);
      const currentEl = getSectionEl(currentId);
      if (!currentEl) return;

      const viewH = container.clientHeight;
      const sectionH = currentEl.offsetHeight;
      const sectionTop = currentEl.offsetTop;
      const scrollTop = container.scrollTop;

      const scrollWithinSection = scrollTop - sectionTop;
      const fitsSingleScreen = sectionH <= viewH + BOUNDARY_THRESHOLD;

      if (fitsSingleScreen) {
        e.preventDefault();
        if (scrollingDown) {
          const nextId = SECTION_ORDER[currentIdx + 1];
          if (nextId) snapToSection(nextId);
        } else {
          const prevId = SECTION_ORDER[currentIdx - 1];
          if (prevId) snapToSection(prevId);
          else snapToSection(currentId);
        }
      } else {
        const atSectionTop = scrollWithinSection <= BOUNDARY_THRESHOLD;
        const atSectionBottom = scrollWithinSection >= sectionH - viewH - BOUNDARY_THRESHOLD;

        if (scrollingDown && atSectionBottom) {
          e.preventDefault();
          const nextId = SECTION_ORDER[currentIdx + 1];
          if (nextId) snapToSection(nextId);
        } else if (!scrollingDown && atSectionTop) {
          e.preventDefault();
          const prevId = SECTION_ORDER[currentIdx - 1];
          if (prevId) snapToSection(prevId);
          else snapToSection(currentId);
        }
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [getActiveSectionFromScroll, snapToSection]);

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (snapLocked.current) return;
      const id = getActiveSectionFromScroll();
      if (id !== activeSection) {
        setActiveSection(id);
        setLabelKey(k => k + 1);
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [activeSection, getActiveSectionFromScroll]);

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;

    const ctx = gsap.context(() => {
      gsap.set(shellRef.current, { opacity: 0, x: 60 });

      const tl = gsap.timeline();

      tl.to(shellRef.current, { opacity: 1, x: 0, duration: 0.55, ease: "power3.out" }, 0);

      tl.call(() => {
        gsap.to(grainRef.current, { backgroundPosition: "300px 300px", duration: 12, repeat: -1, ease: "none" });
        gsap.to(gridRef.current, { backgroundPosition: "160px 160px", duration: 30, repeat: -1, ease: "none" });
        gsap.to(sweepRef.current, { left: "110%", duration: 6, repeat: -1, ease: "none" });
      }, [], 0.3);

      tl.fromTo(".shell-frame-h",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, stagger: 0.06, ease: "expo.out" },
        0.2
      );

      tl.fromTo(".shell-corner-mk",
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.28, stagger: 0.05, ease: "back.out(5)" },
        0.5
      );

      tl.fromTo(contentRef.current,
        { opacity: 0, y: 20, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power2.out" },
        0.65
      );
    }, shellRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={shellRef} style={{
      position: "relative",
      width: "100%", height: "100vh",
      background: "#000",
      overflow: "hidden",
      cursor: "crosshair",
    }}>
      {/* BACKGROUND GRID */}
      <div ref={gridRef} style={{
        position: "absolute", inset: 0, zIndex: 1, opacity: 0.03,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)
        `,
        backgroundSize: "72px 72px",
      }} />

      {/* GRAIN */}
      <div ref={grainRef} style={{
        position: "absolute", inset: 0, zIndex: 2, opacity: 0.045, pointerEvents: "none",
        backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
        backgroundSize: "3px 3px",
      }} />

      {/* VIGNETTE */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
        background: "radial-gradient(ellipse at 40% 50%, transparent 25%, rgba(0,0,0,0.85) 100%)",
      }} />

      {/* CRT */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 4, pointerEvents: "none",
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.045) 2px, rgba(0,0,0,0.045) 4px)",
      }} />

      {/* FRAME LINES */}
      <div style={{ position: "absolute", inset: 0, zIndex: 20, pointerEvents: "none" }}>
        <div ref={sweepRef} style={{
          position: "absolute", top: "0px", left: "-18%",
          width: "18%", height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent)",
          zIndex: 25,
        }} />

        <div className="shell-frame-h" style={{
          position: "absolute", top: "0px", left: "2%", right: "80px",
          height: "1px", background: "rgba(255,255,255,0.07)", transformOrigin: "left",
        }} />

        <div className="shell-frame-h" style={{
          position: "absolute", bottom: "44px", left: "2%", right: "80px",
          height: "1px", background: "rgba(255,255,255,0.07)", transformOrigin: "right",
        }} />

        {(["tl", "bl"] as const).map(p => <ShellCornerMk key={p} pos={p} />)}

        <div style={{
          position: "absolute", bottom: "12px", left: "24px",
          fontFamily: "var(--font-mono)", fontSize: "0.33rem",
          letterSpacing: "0.28em", color: "rgba(255,255,255,0.1)",
        }}>
          SYS:NOMINAL · SESSION:{activeSection.toUpperCase()} · AK/OS v3.1.4
        </div>
      </div>

      {/* NOISE LINES */}
      <div style={{ position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none" }}>
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} style={{
            position: "absolute", top: `${i * 5.5}%`, left: 0, right: 0,
            height: "1px", background: "rgba(255,255,255,0.016)",
          }} />
        ))}
      </div>

      {/* SECTION LABEL */}
      <SectionLabel key={labelKey} section={activeSection} />

      {/* CONTENT AREA */}
      <div
        ref={contentRef}
        style={{
          position: "absolute",
          top: "0px",
          left: "0px",
          right: "80px",
          bottom: "56px",
          zIndex: 10,
          overflowY: "scroll",
          overflowX: "hidden",
          scrollbarWidth: "none",
          scrollSnapType: "none",
        }}
      >
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>

        <div id="section-about" style={{
          minHeight: "100vh",
          padding: "70px 40px 10px",
          boxSizing: "border-box",
        }}>
          <AboutSection />
        </div>

        <div id="section-education" style={{
          minHeight: "100vh",
          padding: "120px 40px 0px",
          boxSizing: "border-box",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}>
          <EducationSection />
        </div>

        <div id="section-skills" style={{
          minHeight: "100vh",
          padding: "80px 60px",
          boxSizing: "border-box",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}>
          <SkillsSection />
        </div>

        <div id="section-projects" style={{
          height: "100vh",
          maxHeight: "150vh",
          padding: "80px 70px 60px",
          boxSizing: "border-box",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          flexDirection: "column",
        }}>
          <ProjectsSection onModalOpen={handleModalOpen} />
        </div>

        <div id="section-certifications" style={{
          minHeight: "100vh",
          padding: "80px 80px",
          boxSizing: "border-box",
        }}>
          <CertificationsSection />
        </div>

        <div id="section-contact" style={{
          minHeight: "100vh",
          padding: "100px 100px 0px 100px",
          boxSizing: "border-box",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}>
          <ContactSection />
        </div>
      </div>

      {/* SIDE NAV */}
      <SideNav activeSection={activeSection} onNavigate={switchSection} />

    </div>
  );
}

function ShellCornerMk({ pos }: { pos: "tl" | "bl" }) {
  const top = pos === "tl";
  return (
    <div className="shell-corner-mk" style={{
      position: "absolute",
      top: top ? "16px" : undefined,
      bottom: !top ? "16px" : undefined,
      left: "16px",
      display: "flex", flexDirection: "column", alignItems: "flex-start",
    }}>
      {top ? (
        <>
          <div style={{ width: "16px", height: "1px", background: "rgba(255,255,255,0.35)" }} />
          <div style={{ width: "1px", height: "16px", background: "rgba(255,255,255,0.35)" }} />
        </>
      ) : (
        <>
          <div style={{ width: "1px", height: "16px", background: "rgba(255,255,255,0.35)" }} />
          <div style={{ width: "16px", height: "1px", background: "rgba(255,255,255,0.35)" }} />
        </>
      )}
    </div>
  );
}
