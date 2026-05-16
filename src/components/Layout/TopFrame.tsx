"use client";

import { useEffect, useRef, useState } from "react";
import { SectionId } from "./SystemShell";

/*
  TopFrame.tsx
  ─────────────────────────────────────────────────────────────
  Fixed top bar for the dashboard. 44px height.
  Shows: OS tag left | Active section path center | Clock right
  Drawn once, stays persistent across section changes.
*/

interface TopFrameProps {
  activeSection: SectionId;
}

const SECTION_PATHS: Record<SectionId, string> = {
  about:          "PORTFOLIO.EXE > ABOUT",
  education:      "PORTFOLIO.EXE > EDUCATION",
  skills:         "PORTFOLIO.EXE > SKILLS",
  projects:       "PORTFOLIO.EXE > PROJECTS",
  certifications: "PORTFOLIO.EXE > CERTIFICATIONS",
  contact:        "PORTFOLIO.EXE > CONTACT",
};

export default function TopFrame({ activeSection }: TopFrameProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const n = new Date();
      setTime(
        `${String(n.getHours()).padStart(2,"0")}:${String(n.getMinutes()).padStart(2,"0")}:${String(n.getSeconds()).padStart(2,"0")}`
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0,
      height: "44px",
      zIndex: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 88px 0 24px",
      borderBottom: "1px solid rgba(255,255,255,0.07)",
      background: "rgba(0,0,0,0.7)",
      backdropFilter: "blur(4px)",
    }}>
      {/* Left: OS tag */}
      <div style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.38rem",
        letterSpacing: "0.44em",
        color: "rgba(255,255,255,0.22)",
      }}>
        AK/OS // PORTFOLIO.EXE
      </div>

      {/* Center: active path */}
      <div style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.36rem",
        letterSpacing: "0.3em",
        color: "rgba(255,255,255,0.35)",
        transition: "opacity 0.3s ease",
      }}>
        {SECTION_PATHS[activeSection]}
      </div>

      {/* Right: clock */}
      <div style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.4rem",
        letterSpacing: "0.3em",
        color: "rgba(255,255,255,0.28)",
        minWidth: "80px",
        textAlign: "right",
      }}>
        {time}
      </div>
    </div>
  );
}