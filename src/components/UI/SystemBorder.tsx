// BlinkDot.tsx
// Reusable animated status dot used across sections

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface BlinkDotProps {
  size?: number;
  color?: string;
  shape?: "circle" | "diamond" | "square";
}

export function BlinkDot({ size = 6, color = "#fff", shape = "circle" }: BlinkDotProps) {
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.to(dotRef.current, {
      opacity: 0.25,
      duration: 0.9 + Math.random() * 0.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  const clipMap = {
    circle:  undefined,
    diamond: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
    square:  undefined,
  };

  return (
    <span ref={dotRef} style={{
      display: "inline-block",
      width: size, height: size,
      background: color,
      borderRadius: shape === "circle" ? "50%" : shape === "square" ? "0" : "0",
      clipPath: clipMap[shape],
      flexShrink: 0,
    }}/>
  );
}

// ─────────────────────────────────────────────────────────────
// SystemBorder.tsx
// Reusable techy bordered panel with corner markers
// ─────────────────────────────────────────────────────────────

interface SystemBorderProps {
  children: React.ReactNode;
  label?: string;
  style?: React.CSSProperties;
  accentTop?: boolean;
}

export function SystemBorder({ children, label, style, accentTop = false }: SystemBorderProps) {
  return (
    <div style={{
      position: "relative",
      border: "1px solid rgba(255,255,255,0.1)",
      clipPath: "polygon(12px 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 12px)",
      padding: "20px",
      background: "rgba(255,255,255,0.02)",
      ...style,
    }}>
      {/* Top accent bar */}
      {accentTop && (
        <div style={{
          position: "absolute", top: 0, left: "12px", right: 0,
          height: "1px",
          background: "linear-gradient(90deg, rgba(255,255,255,0.4), transparent)",
        }}/>
      )}

      {/* Corner TL */}
      <div style={{ position:"absolute", top:"-1px", left:"-1px" }}>
        <div style={{ width:"10px", height:"1px", background:"rgba(255,255,255,0.5)" }}/>
        <div style={{ width:"1px",  height:"10px", background:"rgba(255,255,255,0.5)" }}/>
      </div>

      {/* Corner BR */}
      <div style={{ position:"absolute", bottom:"-1px", right:"-1px", display:"flex", flexDirection:"column", alignItems:"flex-end" }}>
        <div style={{ width:"1px",  height:"10px", background:"rgba(255,255,255,0.5)", alignSelf:"flex-end" }}/>
        <div style={{ width:"10px", height:"1px",  background:"rgba(255,255,255,0.5)" }}/>
      </div>

      {/* Optional label */}
      {label && (
        <div style={{
          position: "absolute", top: "-8px", left: "20px",
          fontFamily: "var(--font-mono)",
          fontSize: "0.34rem", letterSpacing: "0.38em",
          color: "rgba(255,255,255,0.35)",
          background: "#000",
          padding: "0 6px",
        }}>
          {label}
        </div>
      )}

      {children}
    </div>
  );
}