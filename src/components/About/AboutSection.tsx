"use client";

import { useRef, useState } from "react";
import { PERSONAL } from "@/data";

export default function AboutSection() {
  return (
    <div style={{
      width: "100%",
      minHeight: "100%",
      display: "grid",
      gridTemplateColumns: "1.15fr 0.85fr",
      gap: "0",
      padding: "0",
    }}>
      {/* ── LEFT ─────────────────────────────────────────── */}
      <div style={{
        display: "flex",
        position: "relative",
        flexDirection: "column",
        justifyContent: "flex-start",
        marginTop: "26px",
        padding: "18px 24px 20px 20px",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        gap: "18px",
      }}>
        <div style={{
  position: "absolute",
  top: "24px",
  left: "0",
  width: "1px",
  bottom: "24px",
  background: "linear-gradient(to bottom, rgba(255,255,255,0.12), transparent)",
}}/>

        {/* Main description */}
        <div>
          <p style={{
            fontFamily: "var(--font-orbitron)",
            fontSize: "clamp(0.95rem, 1.15vw, 1.05rem)",
            fontWeight: 400,
            letterSpacing: "0.06em",
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1.8,
            maxWidth: "720px",
            width: "88%",
          }}>
            I'm an AI Engineer who builds systems that think — pipelines that move,
            models that ship, and interfaces that make intelligence feel human.
            Not research. Not prototypes. Production systems.
          </p>
        </div>

        {/* Highlighted boxes — core traits */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}>
          {TRAIT_BOXES.map((box, i) => (
            <TraitBox key={i} {...box} />
          ))}
        </div>

        {/* Divider */}
        <div style={{
          height: "1px",
          background: "linear-gradient(to right, rgba(255,255,255,0.1), transparent)",
        }}/>

        {/* Stack highlight row */}
        <div>
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.38rem",
            letterSpacing: "0.45em",
            color: "rgba(255,255,255,0.2)",
            marginBottom: "14px",
          }}>
            CORE STACK
          </div>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
          }}>
            {CORE_STACK.map((s, i) => (
              <StackTag key={i} label={s} />
            ))}
          </div>
        </div>

        {/* Philosophy */}
        <div style={{
          padding: "16px 20px",
          border: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(255,255,255,0.02)",
          position: "relative",
        }}>
          <div style={{
            position: "absolute",
            top: "-1px", left: "20px",
            width: "40px", height: "1px",
            background: "rgba(255,255,255,0.35)",
          }}/>
          <p style={{
            fontFamily: "var(--font-orbitron)",
            fontSize: "0.58rem",
            letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.4)",
            lineHeight: 1.9,
            margin: 0,
          }}>
            "{PERSONAL.philosophy}"
          </p>
        </div>

      </div>

      {/* ── RIGHT ────────────────────────────────────────── */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "18px 18px 20px 24px",
        gap: "24px",
      }}>

        {/* Techy photo frame */}
        <TechFrame />

        {/* Identity data block */}
        <div style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1px",
          background: "rgba(255,255,255,0.04)",
        }}>
          {[
            { label: "DESIGNATION", value: PERSONAL.title },
            { label: "LOCATION",    value: PERSONAL.location },
            { label: "COORDINATES", value: PERSONAL.coordinates },
            { label: "SYSTEM",      value: "AK/OS v3.1.4 // ONLINE" },
          ].map((row, i) => (
            <div key={i} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 16px",
              background: "#000",
              borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none",
            }}>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.36rem",
                letterSpacing: "0.4em",
                color: "rgba(255,255,255,0.2)",
              }}>
                {row.label}
              </span>
              <span style={{
                fontFamily: "var(--font-orbitron)",
                fontSize: "0.55rem",
                letterSpacing: "0.1em",
                fontWeight: 600,
                color: "rgba(255,255,255,0.8)",
              }}>
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* GitHub + LinkedIn redirect boxes */}
        <div style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px",
        }}>
          <LinkBox
            label="GITHUB"
            sub="adithyaak"
            href={PERSONAL.github}
            icon="⌥"
          />
          <LinkBox
            label="LINKEDIN"
            sub="adithyaak"
            href={PERSONAL.linkedin}
            icon="⊕"
          />
        </div>

      </div>
    </div>
  );
}

// ─── Trait Box ────────────────────────────────────────────────────────────────

const TRAIT_BOXES = [
  {
    tag: "BUILDER",
    text: "I ship production AI — not Jupyter notebooks. Models, APIs, pipelines, deployed.",
    accent: false,
  },
  {
    tag: "ENGINEER",
    text: "Computer vision, NLP, multimodal systems. Real inference. Real latency constraints.",
    accent: true,
  },
  {
    tag: "DESIGNER",
    text: "I believe every AI system needs a cinematic interface. Intelligence should feel like something.",
    accent: false,
  },
];

const CORE_STACK = [
  "PyTorch", "Python", "FastAPI", "Next.js",
  "LangChain", "OpenCV", "Docker", "AWS",
];

function TraitBox({ tag, text, accent }: { tag: string; text: string; accent: boolean }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        gap: "16px",
        alignItems: "flex-start",
        padding: "14px 18px",
        border: `1px solid ${hov ? "rgba(255,255,255,0.25)" : accent ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.05)"}`,
        background: hov
          ? "rgba(255,255,255,0.05)"
          : accent
          ? "rgba(255,255,255,0.03)"
          : "transparent",
        cursor: "default",
        transition: "all 0.25s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top accent line on hover */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: "1px",
        background: hov ? "rgba(255,255,255,0.4)" : "transparent",
        transition: "background 0.25s ease",
      }}/>

      {/* Tag */}
      <div style={{
        fontFamily: "var(--font-orbitron)",
        fontSize: "0.42rem",
        fontWeight: 700,
        letterSpacing: "0.3em",
        color: hov ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.45)",
        minWidth: "70px",
        paddingTop: "2px",
        transition: "color 0.25s ease",
        flexShrink: 0,
      }}>
        {tag}
      </div>

      {/* Separator */}
      <div style={{
        width: "1px",
        alignSelf: "stretch",
        background: hov ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.07)",
        flexShrink: 0,
        transition: "background 0.25s ease",
      }}/>

      {/* Text */}
      <p style={{
        fontFamily: "var(--font-grotesk)",
        fontSize: "0.72rem",
        fontWeight: 300,
        letterSpacing: "0.02em",
        color: hov ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.5)",
        lineHeight: 1.7,
        maxWidth: "90%",
        margin: 0,
        transition: "color 0.25s ease",
      }}>
        {text}
      </p>
    </div>
  );
}

// ─── Stack Tag ────────────────────────────────────────────────────────────────

function StackTag({ label }: { label: string }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "4px 12px",
        border: `1px solid ${hov ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.1)"}`,
        fontFamily: "var(--font-orbitron)",
        fontSize: "0.4rem",
        letterSpacing: "0.2em",
        color: hov ? "#fff" : "rgba(255,255,255,0.4)",
        background: hov ? "rgba(255,255,255,0.06)" : "transparent",
        transition: "all 0.2s ease",
        cursor: "default",
      }}
    >
      {label}
    </div>
  );
}

// ─── Link Box ─────────────────────────────────────────────────────────────────

function LinkBox({ label, sub, href, icon }: {
  label: string; sub: string; href: string; icon: string;
}) {
  const [hov, setHov] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
      window.open(href, "_blank", "noopener,noreferrer");
    }, 300);
  };

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={handleClick}
      style={{
        padding: "18px 16px",
        border: `1px solid ${clicked ? "rgba(255,255,255,0.9)" : hov ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.1)"}`,
        background: clicked
          ? "rgba(255,255,255,0.15)"
          : hov
          ? "rgba(255,255,255,0.06)"
          : "rgba(255,255,255,0.02)",
        cursor: "pointer",
        transition: "all 0.2s ease",
        position: "relative",
        overflow: "hidden",
        boxShadow: hov ? "0 0 20px rgba(255,255,255,0.05), inset 0 0 20px rgba(255,255,255,0.02)" : "none",
      }}
    >
      {/* Corner mark top-left */}
      <div style={{
        position: "absolute", top: "-1px", left: "-1px",
        width: "10px", height: "10px",
        borderTop: `1px solid ${hov ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)"}`,
        borderLeft: `1px solid ${hov ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)"}`,
        transition: "border-color 0.2s ease",
      }}/>

      {/* Corner mark bottom-right */}
      <div style={{
        position: "absolute", bottom: "-1px", right: "-1px",
        width: "10px", height: "10px",
        borderBottom: `1px solid ${hov ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)"}`,
        borderRight: `1px solid ${hov ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)"}`,
        transition: "border-color 0.2s ease",
      }}/>

      {/* Glow sweep on hover */}
      {hov && (
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)",
          pointerEvents: "none",
        }}/>
      )}

      {/* Icon */}
      <div style={{
        fontFamily: "var(--font-orbitron)",
        fontSize: "0.9rem",
        color: hov ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)",
        marginBottom: "8px",
        transition: "color 0.2s ease",
      }}>
        {icon}
      </div>

      {/* Label */}
      <div style={{
        fontFamily: "var(--font-orbitron)",
        fontSize: "0.5rem",
        fontWeight: 700,
        letterSpacing: "0.3em",
        color: hov ? "#fff" : "rgba(255,255,255,0.7)",
        marginBottom: "4px",
        transition: "color 0.2s ease",
      }}>
        {label}
      </div>

      {/* Sub */}
      <div style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.36rem",
        letterSpacing: "0.2em",
        color: hov ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)",
        transition: "color 0.2s ease",
      }}>
        /{sub}
      </div>

      {/* Bottom status line on hover */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0,
        height: "1px",
        width: hov ? "100%" : "0%",
        background: "rgba(255,255,255,0.4)",
        transition: "width 0.3s ease",
      }}/>
    </div>
  );
}

// ─── Tech Frame Photo ─────────────────────────────────────────────────────────

function TechFrame() {
  const [hov, setHov] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={frameRef}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "3/4",
        maxHeight: "260px",
        cursor: "crosshair",
      }}
    >
      {/* Outer frame */}
      <div style={{
        position: "absolute",
        inset: 0,
        border: `1px solid ${hov ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.1)"}`,
        transition: "border-color 0.4s ease",
        zIndex: 2,
        pointerEvents: "none",
      }}/>

      {/* Corner brackets — all 4 corners */}
      {[
        { top: "-3px",    left: "-3px",  borderTop: true,  borderLeft: true  },
        { top: "-3px",    right: "-3px", borderTop: true,  borderRight: true },
        { bottom: "-3px", left: "-3px",  borderBottom: true, borderLeft: true  },
        { bottom: "-3px", right: "-3px", borderBottom: true, borderRight: true },
      ].map((c, i) => (
        <div key={i} style={{
          position: "absolute",
          width: hov ? "22px" : "14px",
          height: hov ? "22px" : "14px",
          borderTop:    c.borderTop    ? `2px solid rgba(255,255,255,${hov ? 0.9 : 0.5})` : "none",
          borderBottom: c.borderBottom ? `2px solid rgba(255,255,255,${hov ? 0.9 : 0.5})` : "none",
          borderLeft:   c.borderLeft   ? `2px solid rgba(255,255,255,${hov ? 0.9 : 0.5})` : "none",
          borderRight:  c.borderRight  ? `2px solid rgba(255,255,255,${hov ? 0.9 : 0.5})` : "none",
          top:    c.top,
          bottom: c.bottom,
          left:   c.left,
          right:  c.right,
          zIndex: 5,
          transition: "all 0.35s ease",
          pointerEvents: "none",
        }}/>
      ))}

      {/* Horizontal scan lines — animated */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 3,
        pointerEvents: "none",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          left: 0, right: 0,
          height: "2px",
          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.5), transparent)",
          animation: "tech-scan 3s linear infinite",
          top: 0,
        }}/>
      </div>

      {/* Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/stock/hero.png"
        alt="Adithyaa K"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center top",
          display: "block",
          filter: hov
            ? "grayscale(80%) contrast(1.1) brightness(0.95)"
            : "grayscale(100%) contrast(1.05) brightness(0.85)",
          transition: "filter 0.5s ease",
          position: "relative",
          zIndex: 1,
        }}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />

      {/* Bottom gradient */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        height: "35%",
        background: "linear-gradient(to top, #000, transparent)",
        zIndex: 2,
        pointerEvents: "none",
      }}/>

      {/* ID overlay */}
      <div style={{
        position: "absolute",
        bottom: "10px",
        left: "12px",
        zIndex: 4,
        pointerEvents: "none",
      }}>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.35rem",
          letterSpacing: "0.4em",
          color: "rgba(255,255,255,0.25)",
        }}>
          ID // AK-2025
        </div>
      </div>

      {/* Scanning indicator top-right */}
      <div style={{
        position: "absolute",
        top: "10px",
        right: "12px",
        zIndex: 4,
        display: "flex",
        alignItems: "center",
        gap: "5px",
        pointerEvents: "none",
      }}>
        <div style={{
          width: "4px", height: "4px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.8)",
          animation: "blink-block 1.4s step-end infinite",
        }}/>
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.3rem",
          letterSpacing: "0.35em",
          color: "rgba(255,255,255,0.3)",
        }}>
          LIVE
        </span>
      </div>

      {/* Tech grid overlay on hover */}
      {hov && (
        <div style={{
          position: "absolute",
          inset: 0, zIndex: 3,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          pointerEvents: "none",
          transition: "opacity 0.4s ease",
        }}/>
      )}

      {/* Keyframe */}
      <style>{`
        @keyframes tech-scan {
          0%   { top: -2px;   opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { top: 100%;   opacity: 0; }
        }
      `}</style>
    </div>
  );
}