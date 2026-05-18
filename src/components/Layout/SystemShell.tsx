"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import SideNav              from "./SideNav";
import SectionLabel         from "../UI/SectionLabel";
import AboutSection         from "../About/AboutSection";
import EducationSection     from "../Education/EducationSection";
import SkillsSection        from "../Skills/SkillsSection";
import ProjectsSection      from "../Projects/ProjectsSection";
import CertificationsSection from "../Certifications/CertificationsSection";
import ContactSection       from "../Contact/ContactSection";

/*
  SystemShell.tsx
  ─────────────────────────────────────────────────────────────
  SCROLL BEHAVIOUR — Section snap system:

  Rule 1 — Section fits in one screen (contentHeight ≤ viewportH):
    ANY wheel scroll → immediately jump to next/prev section.

  Rule 2 — Section is taller than screen (contentHeight > viewportH):
    Wheel scroll → normal scroll within section.
    When user reaches the BOTTOM of the section content and
    scrolls DOWN → snap to next section.
    When user is at the TOP of the section content and
    scrolls UP → snap to prev section.

  Implementation:
    - Single scrollable contentRef div contains all sections stacked.
    - Each section wrapper has a known offsetTop and offsetHeight.
    - Custom wheel handler intercepts events:
        a) Determines which section the viewport is currently "in"
           (activeSection = section whose top ≤ scrollTop + small offset).
        b) Checks if that section's content fits in one viewport.
        c) If yes → calls snapToSection(next/prev).
        d) If no → checks if scroll is at the boundary of the section.
           At top boundary + scroll up → snapToSection(prev).
           At bottom boundary + scroll down → snapToSection(next).
           Otherwise → allow native scroll.
    - snapToSection animates scrollTop with GSAP (smooth, not CSS scroll).
    - A "locked" flag prevents multiple snaps firing from one gesture.

  SideNav navigation calls switchSection(id) which also uses snapToSection.
  Section label updates whenever scrollTop crosses a section boundary.
*/

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

// How many px from the section boundary counts as "at the boundary"
const BOUNDARY_THRESHOLD = 8;
// Minimum wheel delta to trigger a snap (filters micro-scrolls / trackpad drift)
const MIN_DELTA = 30;
// Lock duration in ms — prevents double-firing one gesture
const LOCK_MS = 700;

export default function SystemShell() {
  const shellRef   = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const grainRef   = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const sweepRef   = useRef<HTMLDivElement>(null);

  const [activeSection, setActiveSection] = useState<SectionId>("about");
  const [labelKey,      setLabelKey]      = useState(0);

  // Snap lock — prevents multiple sections firing from one wheel gesture
  const snapLocked = useRef(false);
  // Track accumulated wheel delta for touchpad (which fires many small events)
  const wheelAccum = useRef(0);
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── HELPERS ──────────────────────────────────────────────

  /** Get the DOM element for a section id */
  const getSectionEl = (id: SectionId) =>
    document.getElementById(`section-${id}`) as HTMLElement | null;

  /** Which section is currently "active" based on scrollTop */
  const getActiveSectionFromScroll = useCallback((): SectionId => {
    const container = contentRef.current;
    if (!container) return "about";
    const scrollTop = container.scrollTop;
    const viewH = container.clientHeight;
    // Walk backwards — find the last section whose top is within view
    for (let i = SECTION_ORDER.length - 1; i >= 0; i--) {
      const el = getSectionEl(SECTION_ORDER[i]);
      if (!el) continue;
      if (el.offsetTop <= scrollTop + viewH * 0.35) {
        return SECTION_ORDER[i];
      }
    }
    return "about";
  }, []);

  /** Animate scroll to a specific section's top */
  const snapToSection = useCallback((id: SectionId) => {
    const container = contentRef.current;
    const el = getSectionEl(id);
    if (!container || !el) return;

    snapLocked.current = true;

    const targetTop = el.offsetTop;

    // GSAP scroll tween — smooth, controlled, no CSS scroll-behavior interference
    gsap.to(container, {
      scrollTop: targetTop,
      duration: 0.65,
      ease: "power3.inOut",
      onComplete: () => {
        // Release lock after animation + small buffer
        setTimeout(() => {
          snapLocked.current = false;
        }, LOCK_MS - 650);
      },
    });

    // Update active section + label
    if (id !== activeSection) {
      setActiveSection(id);
      setLabelKey(k => k + 1);
    }
  }, [activeSection]);

  /** Navigate via SideNav click */
  const switchSection = useCallback((id: SectionId) => {
    snapToSection(id);
  }, [snapToSection]);

  // ── WHEEL HANDLER ────────────────────────────────────────
  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // If snap animation is running, block all scroll
      if (snapLocked.current) {
        e.preventDefault();
        return;
      }

      const deltaY = e.deltaY;

      // Accumulate delta (handles touchpad which fires many small events)
      wheelAccum.current += deltaY;

      // Reset accumulator after brief idle
      if (wheelTimer.current) clearTimeout(wheelTimer.current);
      wheelTimer.current = setTimeout(() => {
        wheelAccum.current = 0;
      }, 150);

      // Only act on meaningful scroll
      if (Math.abs(wheelAccum.current) < MIN_DELTA) {
        // Don't prevent default yet — let tiny scrolls through
        return;
      }

      const scrollingDown = wheelAccum.current > 0;
      wheelAccum.current = 0; // reset after consuming

      const currentId = getActiveSectionFromScroll();
      const currentIdx = SECTION_ORDER.indexOf(currentId);
      const currentEl = getSectionEl(currentId);
      if (!currentEl) return;

      const viewH     = container.clientHeight;
      const sectionH  = currentEl.offsetHeight;
      const sectionTop = currentEl.offsetTop;
      const scrollTop  = container.scrollTop;

      // How far into the current section are we?
      const scrollWithinSection = scrollTop - sectionTop;

      // Does this section fit entirely in one viewport?
      const fitsSingleScreen = sectionH <= viewH + BOUNDARY_THRESHOLD;

      if (fitsSingleScreen) {
        // Section fits — any scroll jumps to next/prev
        e.preventDefault();
        if (scrollingDown) {
          const nextId = SECTION_ORDER[currentIdx + 1];
          if (nextId) snapToSection(nextId);
        } else {
          const prevId = SECTION_ORDER[currentIdx - 1];
          if (prevId) snapToSection(prevId);
          else snapToSection(currentId); // already first — snap to its own top
        }
      } else {
        // Section is tall — check if we're at its scroll boundary
        const atSectionTop    = scrollWithinSection <= BOUNDARY_THRESHOLD;
        const atSectionBottom = scrollWithinSection >= sectionH - viewH - BOUNDARY_THRESHOLD;

        if (scrollingDown && atSectionBottom) {
          // At bottom of tall section → snap to next
          e.preventDefault();
          const nextId = SECTION_ORDER[currentIdx + 1];
          if (nextId) snapToSection(nextId);
        } else if (!scrollingDown && atSectionTop) {
          // At top of tall section → snap to prev
          e.preventDefault();
          const prevId = SECTION_ORDER[currentIdx - 1];
          if (prevId) snapToSection(prevId);
          else snapToSection(currentId); // already first
        }
        // Otherwise: let native scroll happen within the section
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [getActiveSectionFromScroll, snapToSection]);

  // ── SCROLL → LABEL SYNC ──────────────────────────────────
  // Also update label when user scrolls naturally inside a tall section
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

  // ── ENTRY ANIMATION ──────────────────────────────────────
  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;

    const ctx = gsap.context(() => {
      gsap.set(shellRef.current, { opacity: 0, x: 60 });

      const tl = gsap.timeline();

      tl.to(shellRef.current, { opacity: 1, x: 0, duration: 0.55, ease: "power3.out" }, 0);

      tl.call(() => {
        gsap.to(grainRef.current, { backgroundPosition: "300px 300px", duration: 12, repeat: -1, ease: "none" });
        gsap.to(gridRef.current,  { backgroundPosition: "160px 160px", duration: 30,  repeat: -1, ease: "none" });
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

  // ── RENDER ───────────────────────────────────────────────
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
      }}/>

      {/* GRAIN */}
      <div ref={grainRef} style={{
        position: "absolute", inset: 0, zIndex: 2, opacity: 0.045, pointerEvents: "none",
        backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
        backgroundSize: "3px 3px",
      }}/>

      {/* VIGNETTE */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
        background: "radial-gradient(ellipse at 40% 50%, transparent 25%, rgba(0,0,0,0.85) 100%)",
      }}/>

      {/* CRT */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 4, pointerEvents: "none",
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.045) 2px, rgba(0,0,0,0.045) 4px)",
      }}/>

      {/* FRAME LINES */}
      <div style={{ position: "absolute", inset: 0, zIndex: 20, pointerEvents: "none" }}>
        <div ref={sweepRef} style={{
          position: "absolute", top: "0px", left: "-18%",
          width: "18%", height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent)",
          zIndex: 25,
        }}/>

        <div className="shell-frame-h" style={{
          position: "absolute", top: "0px", left: "2%", right: "80px",
          height: "1px", background: "rgba(255,255,255,0.07)", transformOrigin: "left",
        }}/>

        <div className="shell-frame-h" style={{
          position: "absolute", bottom: "44px", left: "2%", right: "80px",
          height: "1px", background: "rgba(255,255,255,0.07)", transformOrigin: "right",
        }}/>

        {(["tl","bl"] as const).map(p => <ShellCornerMk key={p} pos={p}/>)}

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
          }}/>
        ))}
      </div>

      {/* SECTION LABEL */}
      <SectionLabel key={labelKey} section={activeSection}/>

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
          // Disable CSS scroll snap — handled entirely by our wheel handler
          scrollSnapType: "none",
        }}
      >
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>

        {/*
          Each section wrapper has minHeight: 100% so it fills at least one
          full viewport. Tall sections grow beyond that naturally.
          The wheel handler reads offsetHeight to decide snap vs free-scroll.
        */}

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
          minHeight: "100vh",
          padding: "80px 70px",
          boxSizing: "border-box",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}>
          <ProjectsSection />
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
      <SideNav activeSection={activeSection} onNavigate={switchSection}/>

    </div>
  );
}

// ── CORNER MARKS ─────────────────────────────────────────────
function ShellCornerMk({ pos }: { pos: "tl" | "bl" }) {
  const top = pos === "tl";
  return (
    <div className="shell-corner-mk" style={{
      position: "absolute",
      top:    top  ? "16px" : undefined,
      bottom: !top ? "16px" : undefined,
      left: "16px",
      display: "flex", flexDirection: "column", alignItems: "flex-start",
    }}>
      {top ? (
        <>
          <div style={{ width:"16px", height:"1px", background:"rgba(255,255,255,0.35)" }}/>
          <div style={{ width:"1px", height:"16px", background:"rgba(255,255,255,0.35)" }}/>
        </>
      ) : (
        <>
          <div style={{ width:"1px", height:"16px", background:"rgba(255,255,255,0.35)" }}/>
          <div style={{ width:"16px", height:"1px", background:"rgba(255,255,255,0.35)" }}/>
        </>
      )}
    </div>
  );
}
