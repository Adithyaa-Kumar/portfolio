"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { SectionId } from "./SystemShell";

/*
  SideNav.tsx
  ─────────────────────────────────────────────────────────────
  Right-edge sidebar strip (72px wide at rest).

  PROFILE BLOCK (top):
    NOT a circle. Cut-corner hexagonal frame using clip-path.
    Corner bracket markers at all 4 corners of the frame.
    Scan-line overlay on portrait.
    Identity data below: name + role in monospace.
    Subtle pulse animation on frame border.

  NAV BUTTONS (below profile):
    6 buttons — About, Education, Skills, Projects, Certs, Contact.
    Each button:
      - At rest: 72px wide, icon only, parallelogram clip-path
      - On hover: elongates LEFT to ~220px, reveals section label
      - Shape: polygon parallelogram (NOT rounded rectangle)
      - B&W monochrome: border-only at rest, white fill on active
      - Active section: filled white, text black
      - Animation: gsap width tween, text opacity fade-in
    Stagger in on mount from right edge.

  ICONS:
    SVG inline icons for each section — techy minimal strokes.
*/

interface SideNavProps {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
}

interface NavItem {
  id: SectionId;
  label: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: "about",
    label: "ABOUT",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="9" cy="6" r="3"/>
        <path d="M2 16c0-3.866 3.134-7 7-7s7 3.134 7 7"/>
        <line x1="9" y1="1" x2="9" y2="2.5"/>
        <line x1="9" y1="9.5" x2="9" y2="11"/>
      </svg>
    ),
  },
  {
    id: "education",
    label: "EDUCATION",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2">
        <polygon points="9,2 17,6.5 9,11 1,6.5"/>
        <path d="M5 8.5v4c0 1.5 1.8 3 4 3s4-1.5 4-3v-4"/>
        <line x1="17" y1="6.5" x2="17" y2="11"/>
      </svg>
    ),
  },
  {
    id: "skills",
    label: "SKILLS",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="1" y="12" width="4" height="5"/>
        <rect x="7" y="8"  width="4" height="9"/>
        <rect x="13" y="4" width="4" height="13"/>
        <polyline points="2,10 6,6 10,8 16,3"/>
      </svg>
    ),
  },
  {
    id: "projects",
    label: "PROJECTS",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="2" y="2" width="6" height="6" rx="0"/>
        <rect x="10" y="2" width="6" height="6" rx="0"/>
        <rect x="2" y="10" width="6" height="6" rx="0"/>
        <circle cx="13" cy="13" r="3"/>
        <line x1="13" y1="11" x2="13" y2="15"/>
        <line x1="11" y1="13" x2="15" y2="13"/>
      </svg>
    ),
  },
  {
    id: "certifications",
    label: "CERTS",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2">
        <polygon points="9,1 11.5,6.5 17,7.3 13,11.2 14,16.8 9,14 4,16.8 5,11.2 1,7.3 6.5,6.5"/>
      </svg>
    ),
  },
  {
    id: "contact",
    label: "CONTACT",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="1" y="4" width="16" height="11" rx="0"/>
        <polyline points="1,4 9,11 17,4"/>
        <line x1="1" y1="15" x2="6" y2="10"/>
        <line x1="17" y1="15" x2="12" y2="10"/>
      </svg>
    ),
  },
];

export default function SideNav({ activeSection, onNavigate }: SideNavProps) {
  const navRef     = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // ── ENTRY ANIMATION ──────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Profile frame slides in from right
      gsap.fromTo(profileRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.55, ease: "power3.out", delay: 0.4 }
      );

      // Nav buttons stagger in
      gsap.fromTo(".sidenav-btn",
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.07, ease: "power3.out", delay: 0.6 }
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={navRef} style={{
      position: "absolute",
      top: 0, right: 0, bottom: 0,
      width: "72px",
      zIndex: 50,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      paddingTop: "52px",
      // Subtle right border
      borderLeft: "1px solid rgba(255,255,255,0.06)",
      background: "linear-gradient(to left, rgba(0,0,0,0.6), transparent)",
    }}>

      {/* ── PROFILE BLOCK ──────────────────────────────── */}
      <div ref={profileRef} style={{
        width: "72px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "16px",
        paddingBottom: "20px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        opacity: 0,
      }}>
        {/* Hex cut-corner portrait frame */}
        <ProfileFrame/>

        {/* Name + role below */}
        <div style={{
          marginTop: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "3px",
        }}>
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.28rem",
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.5)",
            textAlign: "center",
            lineHeight: 1.4,
            writingMode: "horizontal-tb",
          }}>
            AK
          </div>
          {/* Vertical status indicator */}
          <div style={{
            width: "1px",
            height: "20px",
            background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)",
            marginTop: "4px",
          }}/>
        </div>
      </div>

      {/* ── NAV BUTTONS ────────────────────────────────── */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: "6px",
        paddingRight: "0",
        width: "100%",
      }}>
        {NAV_ITEMS.map((item) => (
          <NavButton
            key={item.id}
            item={item}
            isActive={activeSection === item.id}
            onClick={() => onNavigate(item.id)}
          />
        ))}
      </div>

      {/* ── BOTTOM IDENTIFIER ──────────────────────────── */}
      <div style={{
        width: "72px",
        paddingBottom: "52px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "6px",
      }}>
        <div style={{
          width: "1px", height: "24px",
          background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.2))",
        }}/>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.24rem",
          letterSpacing: "0.15em",
          color: "rgba(255,255,255,0.18)",
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          transform: "rotate(180deg)",
        }}>
          v3.1.4
        </div>
      </div>
    </div>
  );
}

// ── PROFILE FRAME ─────────────────────────────────────────────
function ProfileFrame() {
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Subtle pulse on border
    gsap.to(frameRef.current, {
      boxShadow: "0 0 0 1px rgba(255,255,255,0.35), 0 0 12px rgba(255,255,255,0.05)",
      duration: 1.8, repeat: -1, yoyo: true, ease: "sine.inOut",
    });
  }, []);

  return (
    <div style={{ position: "relative", width: "64px", height: "72px" }}>
      {/* Portrait frame — cut-corner hexagonal, NOT a circle */}
      <div ref={frameRef} style={{
        width: "64px",
        height: "72px",
        // Hexagonal cut-corner polygon
        clipPath:"polygon(18% 0%, 82% 0%, 100% 18%, 100% 82%, 82% 100%, 18% 100%, 0% 82%, 0% 18%)",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.22)",
        overflow: "hidden",
        position: "relative",
      }}>
        {/* Portrait image */}
        <img
          src="/images/stock/hero.png"
          alt="AK"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            filter: "grayscale(100%) contrast(1.1) brightness(0.85)",
          }}
        />

        {/* Scanline overlay on portrait */}
        <div style={{
          position: "absolute", inset: 0,
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 4px)",
          pointerEvents: "none",
        }}/>

        {/* Glitch overlay strip — subtle */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.3) 100%)",
          pointerEvents: "none",
        }}/>
      </div>

      {/* Corner bracket markers */}
      {/* TL */}
      <div style={{ position:"absolute", top:"-2px", left:"-2px" }}>
        <div style={{ width:"8px", height:"1px", background:"rgba(255,255,255,0.7)" }}/>
        <div style={{ width:"1px", height:"8px", background:"rgba(255,255,255,0.7)" }}/>
      </div>
      {/* TR */}
      <div style={{ position:"absolute", top:"-2px", right:"-2px", display:"flex", flexDirection:"column", alignItems:"flex-end" }}>
        <div style={{ width:"8px", height:"1px", background:"rgba(255,255,255,0.7)" }}/>
        <div style={{ width:"1px", height:"8px", background:"rgba(255,255,255,0.7)", alignSelf:"flex-end" }}/>
      </div>
      {/* BL */}
      <div style={{ position:"absolute", bottom:"-2px", left:"-2px", display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
        <div style={{ width:"1px", height:"8px", background:"rgba(255,255,255,0.7)" }}/>
        <div style={{ width:"8px", height:"1px", background:"rgba(255,255,255,0.7)" }}/>
      </div>
      {/* BR */}
      <div style={{ position:"absolute", bottom:"-2px", right:"-2px", display:"flex", flexDirection:"column", alignItems:"flex-end", justifyContent:"flex-end" }}>
        <div style={{ width:"1px", height:"8px", background:"rgba(255,255,255,0.7)", alignSelf:"flex-end" }}/>
        <div style={{ width:"8px", height:"1px", background:"rgba(255,255,255,0.7)" }}/>
      </div>

      {/* Online dot */}
      <div style={{
        position: "absolute", bottom: "1px", right: "1px",
        width: "6px", height: "6px",
        background: "#fff",
        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", // diamond
        animation: "sidenav-pulse 2s ease infinite",
      }}/>
    </div>
  );
}

// ── NAV BUTTON ────────────────────────────────────────────────
function NavButton({
  item, isActive, onClick,
}: {
  item: NavItem; isActive: boolean; onClick: () => void;
}) {
  const btnRef  = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [hov, setHov] = useState(false);

  const REST_WIDTH   = 52;
  const EXPAND_WIDTH = 190;

  const onEnter = () => {
    if (isActive) return;
    setHov(true);
    gsap.to(btnRef.current, {
      width: EXPAND_WIDTH,
      duration: 0.32,
      ease: "power3.out",
    });
    gsap.to(textRef.current, {
      opacity: 1, x: 0,
      duration: 0.22, delay: 0.12,
      ease: "power2.out",
    });
  };

  const onLeave = () => {
    if (isActive) return;
    setHov(false);
    gsap.to(btnRef.current, {
      width: REST_WIDTH,
      duration: 0.28,
      ease: "power3.inOut",
    });
    gsap.to(textRef.current, {
      opacity: 0, x: 8,
      duration: 0.15,
      ease: "power2.in",
    });
  };

  // When active changes, reset hover state
  useEffect(() => {
    if (isActive) {
      setHov(false);
      gsap.set(btnRef.current, { width: REST_WIDTH });
      gsap.set(textRef.current, { opacity: 0, x: 8 });
    }
  }, [isActive]);

  return (
    <button
      ref={btnRef}
      className="sidenav-btn"
      onClick={onClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        width: `${REST_WIDTH}px`,
        height: "52px",
        background: isActive ? "rgba(255,255,255,1)" : "transparent",
        border: `1px solid ${isActive ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.2)"}`,
        color: isActive ? "#000" : "rgba(255,255,255,0.75)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "10px",
        padding: "0 14px",
        // Parallelogram shape — techy, NOT rounded
        clipPath:"polygon(0 0, calc(100% - 18px) 0, 100% 50%, calc(100% - 18px) 100%, 0 100%, 12px 50%)",
        overflow: "hidden",
        position: "relative",
        transition: "border-color 0.2s ease, background 0.2s ease, color 0.2s ease",
        opacity: 0, // will be animated in by gsap
        flexShrink: 0,
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Icon */}
      <span style={{
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: isActive ? 1 : hov ? 1 : 0.7,
        transition: "opacity 0.2s ease",
      }}>
        {item.icon}
      </span>

      {/* Label — hidden at rest, revealed on elongate */}
      <span ref={textRef} style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.42rem",
        letterSpacing: "0.38em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        opacity: isActive ? 0 : 0, // always hidden unless actively hovered
        transform: "translateX(8px)",
        flexShrink: 0,
        color: isActive ? "#000" : "rgba(255,255,255,0.9)",
      }}>
        {item.label}
      </span>

      {/* Active indicator: small right-edge line */}
      {isActive && (
        <div style={{
          position: "absolute", right: 0, top: "20%", bottom: "20%",
          width: "2px",
          background: "#000",
        }}/>
      )}

      {/* Hover scan flash */}
      {hov && !isActive && (
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 100%)",
          pointerEvents: "none",
        }}/>
      )}
    </button>
  );
}