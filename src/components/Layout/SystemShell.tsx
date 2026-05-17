"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SideNav     from "./SideNav";
import SectionLabel from "../UI/SectionLabel";
import AboutSection         from "../About/AboutSection";
import EducationSection     from "../Education/EducationSection";
import SkillsSection        from "../Skills/SkillsSection";
import ProjectsSection      from "../Projects/ProjectsSection";
import CertificationsSection from "../Certifications/CertificationsSection";
import ContactSection       from "../Contact/ContactSection";

/*
  SystemShell.tsx
  ─────────────────────────────────────────────────────────────
  The persistent dashboard wrapper. Renders once after hero exits.

  LAYOUT:
    ┌─────────────────────────────────────┬──────────┐
    │  TopFrame (fixed top bar 44px)      │          │
    ├─────────────────────────────────────┤          │
    │  SectionLabel (.ABOUT ME)           │ SideNav  │
    │  (top-left, animated on change)     │ 72px     │
    │                                     │ right    │
    │  Content Area (scrollable)          │ strip    │
    │                                     │          │
    └─────────────────────────────────────┴──────────┘

  ENTRY ANIMATION (plays once when dashboard mounts):
    - Shell slides in from right (x: 60px → 0) + fade
    - TopFrame draws its lines
    - SideNav profile + buttons stagger in from right
    - SectionLabel types in
    - Content fades in last

  Section switching:
    - Content area fades out → new section fades in
    - SectionLabel scrambles to new name
*/

export type SectionId = "about" | "education" | "skills" | "projects" | "certifications" | "contact";


export default function SystemShell() {
  const shellRef   = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const grainRef   = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const sweepRef   = useRef<HTMLDivElement>(null);

  const [activeSection, setActiveSection] = useState<SectionId>("about");
  const [labelKey, setLabelKey] = useState(0);
  

  // ── ENTRY ANIMATION ──────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(shellRef.current, { opacity: 0, x: 60 });

      const tl = gsap.timeline();

      // Shell slides in
      tl.to(shellRef.current, { opacity: 1, x: 0, duration: 0.55, ease: "power3.out" }, 0);

      // Background systems
      tl.call(() => {
        gsap.to(grainRef.current, { backgroundPosition: "300px 300px", duration: 12, repeat: -1, ease: "none" });
        gsap.to(gridRef.current,  { backgroundPosition: "160px 160px", duration: 30,  repeat: -1, ease: "none" });
        gsap.to(sweepRef.current, { left: "110%", duration: 6, repeat: -1, ease: "none" });
      }, [], 0.3);

      // Shell frame lines draw
      tl.fromTo(".shell-frame-h",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, stagger: 0.06, ease: "expo.out" },
        0.2
      );

      // Corner markers
      tl.fromTo(".shell-corner-mk",
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.28, stagger: 0.05, ease: "back.out(5)" },
        0.5
      );

      // Content area
      tl.fromTo(contentRef.current,
        { opacity: 0, y: 20, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power2.out" },
        0.65
      );
    }, shellRef);

    return () => ctx.revert();
  }, []);

  // ── SECTION SWITCH ───────────────────────────────────────
  const switchSection = (id: SectionId) => {
  const el = document.getElementById(`section-${id}`);
  if (!el || !contentRef.current) return;

  contentRef.current.scrollTo({
    top: el.offsetTop,
    behavior: "smooth",
  });
};
useEffect(() => {
  const container = contentRef.current;
  if (!container) return;

  const handleScroll = () => {
    const sections: SectionId[] = [
      "about",
      "education",
      "skills",
      "projects",
      "certifications",
      "contact",
    ];

    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(`section-${sections[i]}`);
      if (!el) continue;

      if (el.offsetTop <= container.scrollTop + container.clientHeight*0.45) {
        if (sections[i] !== activeSection) {
          setActiveSection(sections[i]);
          setLabelKey((k) => k + 1);
        }
        break;
      }
    }
  };

  container.addEventListener("scroll", handleScroll);

  return () => container.removeEventListener("scroll", handleScroll);
}, [activeSection]);
  return (
    <div ref={shellRef} style={{
      position: "relative",
      width: "100%", height: "100vh",
      background: "#000",
      overflow: "hidden",
      cursor: "crosshair",
    }}>

      {/* ── BACKGROUND GRID ─────────────────────────────── */}
      <div ref={gridRef} style={{
        position: "absolute", inset: 0, zIndex: 1, opacity: 0.03,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)
        `,
        backgroundSize: "72px 72px",
      }}/>

      {/* ── GRAIN ────────────────────────────────────────── */}
      <div ref={grainRef} style={{
        position: "absolute", inset: 0, zIndex: 2, opacity: 0.045, pointerEvents: "none",
        backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
        backgroundSize: "3px 3px",
      }}/>

      {/* ── VIGNETTE ─────────────────────────────────────── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
        background: "radial-gradient(ellipse at 40% 50%, transparent 25%, rgba(0,0,0,0.85) 100%)",
      }}/>

      {/* ── CRT ──────────────────────────────────────────── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 4, pointerEvents: "none",
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.045) 2px, rgba(0,0,0,0.045) 4px)",
      }}/>
      {/* ── FRAME LINES ──────────────────────────────────── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 20, pointerEvents: "none" }}>
        {/* Frame sweep */}
        <div ref={sweepRef} style={{
          position: "absolute", top: "0px", left: "-18%",
          width: "18%", height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent)",
          zIndex: 25,
        }}/>

        {/* Top line */}
        <div className="shell-frame-h" style={{
          position: "absolute", top: "0px", left: "2%", right: "80px",
          height: "1px", background: "rgba(255,255,255,0.07)", transformOrigin: "left",
        }}/>

        {/* Bottom line */}
        <div className="shell-frame-h" style={{
          position: "absolute", bottom: "44px", left: "2%", right: "80px",
          height: "1px", background: "rgba(255,255,255,0.07)", transformOrigin: "right",
        }}/>

        {/* Corners */}
        {(["tl","bl"] as const).map(p => <ShellCornerMk key={p} pos={p}/>)}

        {/* Bottom status */}
        <div style={{
          position: "absolute", bottom: "12px", left: "24px",
          fontFamily: "var(--font-mono)", fontSize: "0.33rem",
          letterSpacing: "0.28em", color: "rgba(255,255,255,0.1)",
        }}>
          SYS:NOMINAL · SESSION:{activeSection.toUpperCase()} · AK/OS v3.1.4
        </div>
      </div>

      {/* ── NOISE LINES ──────────────────────────────────── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none" }}>
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} style={{
            position: "absolute", top: `${i * 5.5}%`, left: 0, right: 0,
            height: "1px", background: "rgba(255,255,255,0.016)",
          }}/>
        ))}
      </div>

      {/* ── SECTION LABEL — top left ─────────────────────── */}
      <SectionLabel key={labelKey} section={activeSection}/>

      {/* ── CONTENT AREA ─────────────────────────────────── */}
      {/* ── CONTENT AREA — scrollable ───────────────── */}
<div
  ref={contentRef}
  style={{
    position: "absolute",
    top: "12px",
    left: "28px",
    right: "120px",
    bottom: "70px",
    zIndex: 10,
    overflowY: "auto",
    overflowX: "visible",
    border: "1px solid rgba(255,255,255,0.06)",
    background:
      "linear-gradient(to bottom, rgba(255,255,255,0.015), rgba(255,255,255,0.008))",
    boxShadow:
      "0 0 0 1px rgba(255,255,255,0.03), inset 0 0 80px rgba(255,255,255,0.015)",
    scrollbarWidth: "none",
  }}
>
  <style>{`
    div::-webkit-scrollbar {
      display: none;
    }
  `}</style>

  <div id="section-about" style={{ minHeight: "auto", padding: "40px" }}>
    <AboutSection />
  </div>

  <div
    id="section-education"
    style={{
      minHeight: "100%",
      padding: "40px",
      borderTop: "1px solid rgba(255,255,255,0.05)",
    }}
  >
    <EducationSection />
  </div>

  <div
    id="section-skills"
    style={{
      minHeight: "100%",
      padding: "40px",
      borderTop: "1px solid rgba(255,255,255,0.05)",
    }}
  >
    <SkillsSection />
  </div>

  <div
    id="section-projects"
    style={{
      minHeight: "100%",
      padding: "0px",
      borderTop: "1px solid rgba(255,255,255,0.05)",
    }}
  >
    <ProjectsSection />
  </div>

  <div
    id="section-certifications"
    style={{
      minHeight: "100%",
      padding: "40px",
      borderTop: "1px solid rgba(255,255,255,0.05)",
    }}
  >
    <CertificationsSection />
  </div>

  <div
    id="section-contact"
    style={{
      minHeight: "100%",
      padding: "40px",
      borderTop: "1px solid rgba(255,255,255,0.05)",
    }}
  >
    <ContactSection />
  </div>
</div>

      {/* ── SIDE NAV ─────────────────────────────────────── */}
      <SideNav activeSection={activeSection} onNavigate={switchSection}/>

    </div>
  );
}

function ShellCornerMk({ pos }: { pos: "tl" | "bl" }) {
  const top  = pos === "tl";
  return (
    <div className="shell-corner-mk" style={{
      position: "absolute",
      top:    top  ? "16px" : undefined,
      bottom: !top ? "16px" : undefined,
      left: "16px",
      display: "flex", flexDirection: "column", alignItems: "flex-start",
    }}>
      <div style={{ width:"16px", height:"1px", background:"rgba(255,255,255,0.35)" }}/>
      <div style={{ width:"1px", height:"16px", background:"rgba(255,255,255,0.35)" }}/>
    </div>
  );
}