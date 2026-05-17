"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { SectionId } from "../Layout/SystemShell";

/*
  SectionLabel.tsx
  ─────────────────────────────────────────────────────────────
  Top-left section display — inspired by the reference image
  where section names like ".ABOUT ME", ".EDUCATION" dominate
  the layout in huge bold Orbitron type.

  Format: .SECTION_NAME
  Animation on mount/change:
    1. Characters scramble from random glitch chars
    2. Resolve letter-by-letter left to right
    3. Underline draws in beneath

  Positioned top-left below the top bar (top: ~60px, left: 24px).
  Uses key prop from parent to retrigger on section change.
*/

interface SectionLabelProps {
  section: SectionId;
}

const SECTION_DISPLAY: Record<SectionId, string> = {
  about:          ".ABOUT",
  education:      ".EDUCATION",
  skills:         ".SKILLS",
  projects:       ".PROJECTS",
  certifications: ".CERTIFICATIONS",
  contact:        ".CONTACT",
};

const GCHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%-=<>?";

function scramble(target: string, progress: number) {
  return target.split("").map((ch, i) => {
    if (ch === ".") return ".";
    if (ch === " ") return " ";
    if (i / target.length < progress) return ch;
    return GCHARS[Math.floor(Math.random() * GCHARS.length)];
  }).join("");
}

export default function SectionLabel({ section }: SectionLabelProps) {
  const wrapRef      = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const target       = SECTION_DISPLAY[section];
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    // Wrap slides up from below
    gsap.fromTo(wrapRef.current,
      { opacity: 0, y: 16, filter: "blur(8px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.45, ease: "power3.out" }
    );

    // Scramble resolve
    const start = performance.now();
    const dur   = 900;
    const tick  = () => {
      const p = Math.min((performance.now() - start) / dur, 1);
      setDisplay(scramble(target, p));
      if (p < 1) requestAnimationFrame(tick);
      else setDisplay(target);
    };
    requestAnimationFrame(tick);

    // Underline draws in after resolve
    gsap.fromTo(underlineRef.current,
      { scaleX: 0, transformOrigin: "left" },
      { scaleX: 1, duration: 0.5, ease: "expo.out", delay: 0.75 }
    );
  }, [target]);

  return (
    <div ref={wrapRef} style={{
      position: "absolute",
      top: "16px",
      left: "20px",
      zIndex: 15,
      pointerEvents: "none",
      opacity: 0,
    }}>
      {/*
        Frosted blur frame — sits behind the text, spans full label width.
        Grows left→right as a gradient so it doesn't hard-box.
        backdrop-filter blurs whatever content is scrolling behind.
      */}
      <div style={{
        position: "absolute",
        inset: "-10px -24px -14px -24px",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        background: "linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.55) 60%, transparent 100%)",
        maskImage: "linear-gradient(to right, black 0%, black 65%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, black 0%, black 65%, transparent 100%)",
        zIndex: -1,
        pointerEvents: "none",
      }}/>

      {/* Main section name */}
      <div style={{
        fontFamily: "var(--font-orbitron)",
        fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)",
        fontWeight: 900,
        letterSpacing: "0.04em",
        color: "rgba(255,255,255,0.96)",
        lineHeight: 1,
        userSelect: "none",
        textShadow: "0 0 40px rgba(0,0,0,0.8)",
      }}>
        {display}
      </div>

      {/* Underline — draws left to right */}
      <div ref={underlineRef} style={{
        height: "1px",
        width: "100%",
        background: "linear-gradient(90deg, rgba(255,255,255,0.45), transparent)",
        marginTop: "10px",
      }}/>
    </div>
  );
}