"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";

type LineType = "ok" | "warn" | "err" | "dim" | "bright" | "gap" | "done";

interface HeroSectionProps {
  onEnter: () => void;
}
const BOOT_LINES: { text: string; type: LineType }[] = [
  { text: "AK/OS BIOS v3.1.4  [2026-05-15]  x86_64  UEFI SECURE BOOT", type: "bright" },
  { text: "Copyright (C) 2026 — All Rights Reserved", type: "dim" },
  { text: "", type: "gap" },
  { text: ">> POST SEQUENCE INITIATED", type: "dim" },
  { text: "   CPU ........... Neural Engine X   128c @ 4.8GHz    [PASS]", type: "ok" },
  { text: "   RAM ........... 64.0 GB LPDDR5X   ECC ENABLED      [PASS]", type: "ok" },
  { text: "   GPU ........... Tensor Array v7   48 GB VRAM       [PASS]", type: "ok" },
  { text: "   NVMe .......... 8.0 TB            R:14GB/s         [PASS]", type: "ok" },
  { text: "   ENCLAVE ....... AES-256 / RSA-4096 / SHA-3         [PASS]", type: "ok" },
  { text: "", type: "gap" },
  { text: ">> MEMORY INTEGRITY CHECK", type: "dim" },
  { text: "   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%  64.0 GB VERIFIED", type: "bright" },
  { text: "", type: "gap" },
  { text: ">> LOADING KERNEL MODULES", type: "dim" },
  { text: "   [  OK  ]  ai_inference.ko              loaded", type: "ok" },
  { text: "   [  OK  ]  neural_net.ko                loaded", type: "ok" },
  { text: "   [  OK  ]  data_pipeline.ko             loaded", type: "ok" },
  { text: "   [ WARN ]  vision_module.ko             +2ms delay", type: "warn" },
  { text: "   [  OK  ]  vision_module.ko             recovered  OK", type: "ok" },
  { text: "   [  OK  ]  identity_subsystem.ko        loaded", type: "ok" },
  { text: "", type: "gap" },
  { text: ">> NETWORK INITIALIZATION", type: "dim" },
  { text: "   GeoIP ........ CHENNAI // INDIA  13.0827N 80.2707E  [OK]", type: "ok" },
  { text: "   SSH .......... RSA-4096 encrypted tunnel            [OK]", type: "ok" },
  { text: "", type: "gap" },
  { text: ">> IDENTITY SUBSYSTEM", type: "dim" },
  { text: "   ENGINEER ..... VERIFIED                      [ACTIVE]", type: "ok" },
  { text: "   ROLE ......... AI ENGINEER                   [ACTIVE]", type: "ok" },
  { text: "", type: "gap" },
  { text: "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%", type: "bright" },
  { text: "BOOT COMPLETE — INITIALIZING VISUAL ENVIRONMENT", type: "done" },
];

const GCHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*_-=<>?/\\|";
function scramble(target: string, progress: number) {
  return target.split("").map((ch, i) => {
    if (ch === " ") return " ";
    if (i / target.length < progress) return ch;
    return GCHARS[Math.floor(Math.random() * GCHARS.length)];
  }).join("");
}

function pickWire() {
  const pool = [0, 1, 2, 3, 4, 5, 6, 7, 9];
  const s = new Set<number>();
  while (s.size < 3) s.add(pool[Math.floor(Math.random() * pool.length)]);
  return s;
}
const WIRE_IDX = pickWire();

const RIGHT_DATA = [
  { label: "STATUS", value: "SYSTEM ONLINE", href: null, isStatus: true },
  { label: "LOCATION", value: "CHENNAI // INDIA", href: null, isStatus: false },
  { label: "COORDINATES", value: "13.0827°N / 80.2707°E", href: null, isStatus: false },
  { label: "ROLE", value: "AI ENGINEER", href: null, isStatus: false },
  { label: "GITHUB", value: "github.com/adithyaak", href: "https://github.com/Adithyaa-Kumar", isStatus: false },
  { label: "LINKEDIN", value: "linkedin.com/in/adithyaak", href: "https://www.linkedin.com/in/adithyaa-k-a496b03ba/", isStatus: false },
];

export default function HeroSection({ onEnter }: HeroSectionProps) {
  const secRef = useRef<HTMLElement>(null);
  const bootRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const bootRightRef = useRef<HTMLDivElement>(null);
  const bootWrapRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const portRef = useRef<HTMLDivElement>(null);
  const imgMain = useRef<HTMLImageElement>(null);
  const imgRed = useRef<HTMLImageElement>(null);
  const imgBlue = useRef<HTMLImageElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const glitchOvRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const sysLabelRef = useRef<HTMLDivElement>(null);

  const [bootLines, setBootLines] = useState<typeof BOOT_LINES>([]);
  const [nameChars, setNameChars] = useState<string[]>("ADITHYAA K".split(""));
  const [cursorVis, setCursorVis] = useState(true);
  const [booted, setBooted] = useState(false);
  const [wireFlicker, setWireFlicker] = useState<boolean[]>(Array(10).fill(false));
  const [glitchSlice, setGlitchSlice] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  // ── WIRE BLINK ───────────────────────────────────────────
  const startWire = useCallback(() => {
    WIRE_IDX.forEach((idx) => {
      const fire = () => {
        const n = Math.floor(Math.random() * 4) + 1;
        let done = 0;
        const flick = () => {
          setWireFlicker(p => { const a = [...p]; a[idx] = true; return a; });
          setTimeout(() => {
            setWireFlicker(p => { const a = [...p]; a[idx] = false; return a; });
            done++;
            if (done < n) setTimeout(flick, 22 + Math.random() * 48);
            else setTimeout(fire, 1400 + Math.random() * 3800);
          }, 30 + Math.random() * 65);
        };
        flick();
      };
      setTimeout(fire, 400 + Math.random() * 2400);
    });
  }, []);

  // ── GLITCH SLICE ─────────────────────────────────────────
  const startGlitch = useCallback(() => {
    const fire = () => {
      setGlitchSlice(true);
      setTimeout(() => setGlitchSlice(false), 80 + Math.random() * 100);
      setTimeout(fire, 3000 + Math.random() * 7000);
    };
    setTimeout(fire, 2000 + Math.random() * 3000);
  }, []);

  // ── INIT ─────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(mainRef.current, { opacity: 0 });
      gsap.set(flashRef.current, { opacity: 0 });
      gsap.set(portRef.current, { opacity: 0 });
      gsap.set([imgMain.current, imgRed.current, imgBlue.current], {
        opacity: 0, scale: 1.06, clipPath: "inset(100% 0 0 0)",
      });
      const sweepLight = document.getElementById("sweep-light");
      if (sweepLight) gsap.set(sweepLight, { x: -120 });
      runBoot();
    }, secRef);
    return () => ctx.revert();
  }, []);

  // ── POST-BOOT ALIVE ──────────────────────────────────────
  useEffect(() => {
    if (!booted) return;
    startWire();
    startGlitch();

    gsap.to(grainRef.current, { backgroundPosition: "300px 300px", duration: 12, repeat: -1, ease: "none" });
    gsap.to(gridRef.current, { backgroundPosition: "160px 160px", duration: 30, repeat: -1, ease: "none" });
    const sweepLight = document.getElementById("sweep-light");
    if (sweepLight) {
      const frameW = sweepRef.current?.offsetWidth ?? (window.innerWidth * 0.92);
      gsap.fromTo(sweepLight,
        { x: -120 },
        { x: frameW + 120, duration: 4.5, repeat: -1, ease: "none", repeatDelay: 0.6 }
      );
    }

    const cr = () => gsap.to(portRef.current, {
      keyframes: [{ x: -5, duration: 0.03 }, { x: 7, duration: 0.03 }, { x: -3, duration: 0.02 }, { x: 0, duration: 0.03 }],
      onComplete: () => gsap.delayedCall(6 + Math.random() * 10, cr),
    });
    cr();

    const onMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 26;
      const y = (e.clientY / window.innerHeight - 0.5) * 16;
      gsap.to(portRef.current, { x, y: y - 5, duration: 1.8, ease: "power3.out" });
      gsap.to(leftRef.current, { x: x * 0.16, y: y * 0.16, duration: 1.8 });
      gsap.to(rightRef.current, { x: x * 0.10, y: y * 0.10, duration: 1.8 });
    };
    window.addEventListener("mousemove", onMouse);
    return () => window.removeEventListener("mousemove", onMouse);
  }, [booted]);

  // ── BOOT ─────────────────────────────────────────────────
  const runBoot = () => {
    const tl = gsap.timeline();
    const D: Record<LineType, number> = { ok: 80, warn: 125, err: 140, dim: 60, bright: 100, gap: 40, done: 120 };

    tl.call(() => {
      let i = 0;
      const step = () => {
        if (i >= BOOT_LINES.length) return;
        const line = BOOT_LINES[i];
        setBootLines(p => [...p, line]);
        i++;
        setTimeout(step, D[line.type]);
      };
      step();
    }, [], 0.1);

    tl.to({}, { duration: 3.6 }, 0.1);

    tl.to(bootWrapRef.current, {
      keyframes: [
        { x: -14, skewX: 10, opacity: 0.8, duration: 0.04 },
        { x: 18, skewX: -13, opacity: 0.35, duration: 0.04 },
        { x: -6, skewX: 6, opacity: 0.65, duration: 0.03 },
        { x: 0, skewX: 0, opacity: 0, duration: 0.14 },
      ]
    }, 3.62);

    tl.to(mainRef.current, { opacity: 1, duration: 0.04 }, 3.7);

    tl.fromTo(".hero-frame-h", { scaleX: 0 }, { scaleX: 1, duration: 1.0, stagger: 0.06, ease: "expo.out" }, 3.72);
    tl.fromTo(".hero-corner-mk", { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.05, ease: "back.out(5)" }, 3.95);

    tl.fromTo(sysLabelRef.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }, 4.0);

    tl.call(() => {
      const target = "ADITHYAA K";
      const start = performance.now();
      const dur = 1500;
      const tick = () => {
        const p = Math.min((performance.now() - start) / dur, 1);
        setNameChars(scramble(target, p).split(""));
        if (p < 1) requestAnimationFrame(tick);
        else setNameChars(target.split(""));
      };
      requestAnimationFrame(tick);
    }, [], 4.05);

    tl.fromTo(nameRef.current,
      { opacity: 0, y: 40, filter: "blur(20px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.65, ease: "power3.out" }, 4.1);

    tl.fromTo(divRef.current,
      { scaleX: 0, transformOrigin: "left" },
      { scaleX: 1, duration: 0.55, ease: "expo.out" }, 4.68);

    tl.fromTo(roleRef.current,
      { opacity: 0, letterSpacing: "1.5em", filter: "blur(4px)" },
      { opacity: 1, letterSpacing: "0.55em", filter: "blur(0px)", duration: 0.6, ease: "power2.out" }, 4.85);

    tl.fromTo(tagRef.current,
      { opacity: 0, y: 24, filter: "blur(8px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.75, ease: "power2.out" }, 5.05);

    tl.call(() => {
      gsap.to(portRef.current, { opacity: 1, duration: 0.06 });
      gsap.to(imgMain.current, { opacity: 1, scale: 1, clipPath: "inset(0% 0 0 0)", duration: 1.1, ease: "power4.out" });
      gsap.to(imgRed.current, { opacity: 0.14, scale: 1, clipPath: "inset(0% 0 0 0)", duration: 1.1, ease: "power4.out" });
      gsap.to(imgBlue.current, { opacity: 0.12, scale: 1, clipPath: "inset(0% 0 0 0)", duration: 1.1, ease: "power4.out" });
      gsap.fromTo(scanRef.current, { top: "-12%", opacity: 1 }, { top: "115%", opacity: 0, duration: 1.1, ease: "none" });
      gsap.to(glitchOvRef.current, { opacity: 0, duration: 1.0 });
      gsap.to(portRef.current, {
        keyframes: [
          { x: -10, skewX: 7, duration: 0.04 },
          { x: 13, skewX: -8, duration: 0.04 },
          { x: -5, skewX: 4, duration: 0.03 },
          { x: 0, skewX: 0, duration: 0.06 },
        ]
      });
    }, [], 4.35);

    tl.fromTo(".hero-right-row",
      { opacity: 0, x: 30, filter: "blur(6px)" },
      { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.45, stagger: 0.09, ease: "power3.out" }, 5.25);

    tl.fromTo(btnRef.current,
      { opacity: 0, y: 16, filter: "blur(4px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.45 }, 5.75);

    tl.call(() => { setCursorVis(false); setBooted(true); }, [], 6.5);
  };

  // ── ENTER SYSTEM TRANSITION ──────────────────────────────────
  const handleEnterSystem = () => {
    console.log("ENTER CLICKED");
    if (transitioning) return;
    setTransitioning(true);

    if (!btnRef.current) return;

    btnRef.current.classList.add("btn-enter-active");

    gsap.to(btnRef.current, {
      scale: 0.96,
      duration: 0.1,
      ease: "back.out(3)",
    });

    setTimeout(() => {
      gsap.to(secRef.current, {
        keyframes: [
          { x: -16, skewX: 12, opacity: 0.9, filter: "brightness(1.4) blur(1px)", duration: 0.05 },
          { x: 22, skewX: -14, opacity: 0.45, filter: "brightness(0.6) blur(2px)", duration: 0.05 },
          { x: -8, skewX: 8, opacity: 0.75, filter: "brightness(1.2) blur(1px)", duration: 0.04 },
          { x: 0, skewX: 0, opacity: 0, filter: "brightness(1) blur(0px)", duration: 0.18 },
        ],
        onComplete: () => {
          if (onEnter) onEnter();
        },
      });
    }, 150);
  };

  // ── HOVER HANDLERS ───────────────────────────────────────
  const hRole = (e: boolean) => gsap.to(roleRef.current, {
    letterSpacing: e ? "0.9em" : "0.55em",
    color: e ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.68)",
    filter: e ? "brightness(1.3)" : "brightness(1)",
    duration: 0.4,
  });

  const hTag = (e: boolean) => gsap.to(tagRef.current, {
    x: e ? 10 : 0,
    letterSpacing: e ? "0.05em" : "0.0em",
    color: e ? "rgba(255,255,255,0.94)" : "rgba(255,255,255,0.64)",
    duration: 0.35,
  });

  return (
    <section ref={secRef} id="hero" style={{
      position: "relative", width: "100%", height: "100vh",
      background: "#000", overflow: "hidden", cursor: "crosshair",
    }}>
      {/* GRID */}
      <div ref={gridRef} style={{
        position: "absolute", inset: 0, zIndex: 1, opacity: 0.03, pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(255,255,255,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.07) 1px,transparent 1px)`,
        backgroundSize: "72px 72px",
      }} />

      {/* GRAIN */}
      <div ref={grainRef} style={{
        position: "absolute", inset: 0, zIndex: 2, opacity: 0.05, pointerEvents: "none",
        backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1px,transparent 1px)",
        backgroundSize: "3px 3px",
      }} />

      {/* VIGNETTE */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
        background: "radial-gradient(ellipse at 50% 40%,transparent 20%,rgba(0,0,0,0.88) 100%)",
      }} />

      {/* CRT */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 4, pointerEvents: "none",
        background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.05) 2px,rgba(0,0,0,0.05) 4px)",
      }} />

      {/* ── BOOT WRAPPER ── */}
      <div ref={bootWrapRef} style={{
        position: "absolute", inset: 0, zIndex: 200, pointerEvents: "none",
      }}>
        {/* ── BOOT LEFT ── */}
        <div ref={bootRef} style={{
          position: "absolute", top: 0, bottom: 0, left: 0, width: "50%",
          background: "#000",
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "0 0 0 8%", fontFamily: "var(--font-mono)",
        }}>
          <div style={{ position: "absolute", top: "6%", left: "8%", display: "flex", flexDirection: "column", gap: "5px" }}>
            <div style={{ fontFamily: "var(--font-orbitron)", fontSize: "0.5rem", letterSpacing: "0.44em", color: "rgba(255,255,255,0.45)" }}>
              VIRTUAL BOOTWARE v13.4.2 - AUTHENTICATED LAUNCH SEQUENCE
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.38rem", letterSpacing: "0.22em", color: "rgba(255,255,255,0.15)" }}>
              AUTHORIZED ENGINEER ENVIRONMENT — UEFI SECURE BOOT ACTIVE
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5px", maxHeight: "70vh", overflow: "hidden" }}>
            {bootLines.map((line, i) => {
              const c: Record<LineType, string> = {
                ok: "rgba(255,255,255,0.85)", warn: "rgba(255,195,50,0.90)", err: "rgba(255,70,70,0.90)",
                dim: "rgba(255,255,255,0.26)", bright: "rgba(255,255,255,0.97)", gap: "transparent", done: "rgb(17, 157, 12)",
              };
              return (
                <div key={i} style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.08em", lineHeight: 1.6, color: c[line.type], whiteSpace: "pre" }}>
                  {line.text || "\u00A0"}
                </div>
              );
            })}
            <div style={{ width: "8px", height: "13px", background: "rgba(255,255,255,0.9)", marginTop: "2px", animation: "blink-block 0.6s step-end infinite" }} />
          </div>
        </div>

        {/* ── BOOT RIGHT HUD — IMPROVED ── */}
        <div ref={bootRightRef} style={{
          position: "absolute", top: 0, right: 0,
          width: "50%", height: "100%",
          padding: "5% 6% 5% 4%",
          display: "flex", flexDirection: "column",
          justifyContent: "center", gap: "16px",
          background: "linear-gradient(135deg, rgba(255,255,255,0.01) 0%, transparent 60%)",
        }}>
          <BootRadar />
          <BootNetworkTopology />
          <BootTelemetryGrid />
          <BootWaveform />
          <BootVisor />
        </div>
      </div>

      {/* ── MAIN UI ──────────────────────────────────── */}
      <div ref={mainRef} style={{
        position: "absolute", inset: 0, zIndex: 10,
        display: "grid", gridTemplateColumns: "1fr 1fr",
        opacity: 0,
      }}>
        {/* LEFT */}
        <div ref={leftRef} style={{
          position: "relative", zIndex: 5,
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "0 0 0 7%",
        }}>
          {/* Ghost watermark */}
          <div style={{
            position: "absolute", left: "4%", top: "8%", transform: "translateY(-50%)",
            fontFamily: "var(--font-orbitron)", fontSize: "clamp(1rem,1vw,1rem)", lineHeight: 0.82,
            color: "transparent", WebkitTextStroke: "0.5px rgba(255, 255, 255, 0.02)",
            pointerEvents: "none", zIndex: 0, userSelect: "none", whiteSpace: "nowrap", letterSpacing: "-0.02em",
          }}>AK</div>

          {/* System identity label */}
          <div ref={sysLabelRef} style={{
            marginBottom: "1.6rem", fontFamily: "var(--font-mono)",
            fontSize: "0.45rem", letterSpacing: "0.58em", color: "rgba(255, 255, 255, 0.36)",
            display: "flex", alignItems: "center", gap: "12px", opacity: 0,
          }}>
            <span style={{ display: "inline-block", width: "24px", height: "1px", background: "rgba(255,255,255,0.22)" }} />
            SYSTEM IDENTITY
          </div>

          {/* NAME BLOCK — dual layer */}
          <div ref={nameRef} style={{ position: "relative", userSelect: "none", opacity: 0 }}>
            {/* Solid layer */}
            <div style={{
              fontFamily: "var(--font-orbitron)", fontSize: "clamp(3rem,5.8vw,6.5rem)",
              lineHeight: 0.88, letterSpacing: "0.02em", fontWeight: 900,
              color: "rgb(255, 255, 255)", display: "flex", flexWrap: "wrap",
              cursor: "default", position: "relative", zIndex: 1,
            }}>
              {nameChars.map((ch, i) => {
                const isWire = WIRE_IDX.has(i) && booted;
                const isFlick = wireFlicker[i];
                return (
                  <span key={i} style={{
                    display: "inline-block",
                    opacity: isFlick ? 0.06 : 1,
                    filter: isWire && !isFlick ? "brightness(0.75)" : "brightness(1)",
                    WebkitTextStroke: isWire && !isFlick ? "0.5px rgba(255,255,255,0.5)" : "0px transparent",
                    transition: isFlick ? "none" : "opacity 0.06s,filter 0.06s",
                    clipPath: glitchSlice && Math.random() > 0.7 ? `inset(${Math.random() * 60}% 0 ${Math.random() * 20}% 0)` : "none",
                  }}>
                    {ch === " " ? "\u00A0" : ch}
                  </span>
                );
              })}
              {cursorVis && (
                <span style={{ display: "inline-block", width: "4px", height: "0.7em", background: "#fff", marginLeft: "8px", alignSelf: "flex-end", marginBottom: "0.08em", animation: "blink-block 0.5s step-end infinite" }} />
              )}
            </div>

            {/* Stroke-only layer — above portrait */}
            <div aria-hidden="true" style={{
              position: "absolute", inset: 0,
              fontFamily: "var(--font-orbitron)", fontSize: "clamp(3rem,5.8vw,6.5rem)",
              lineHeight: 0.88, letterSpacing: "0.02em", fontWeight: 900,
              color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.55)",
              display: "flex", flexWrap: "wrap", pointerEvents: "none", zIndex: 60,
            }}>
              {nameChars.map((ch, i) => (
                <span key={i} style={{ display: "inline-block" }}>{ch === " " ? "\u00A0" : ch}</span>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div ref={divRef} style={{ width: "700px", height: "1px", background: "rgba(255,255,255,0.16)", marginTop: "2rem", marginBottom: "2rem" }} />

          {/* Role */}
          <div ref={roleRef} style={{
            fontFamily: "var(--font-orbitron)", fontSize: "0.62rem", fontWeight: 700,
            letterSpacing: "0.55em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.68)", marginBottom: "1.8rem", cursor: "default", opacity: 0,
          }}
            onMouseEnter={() => hRole(true)} onMouseLeave={() => hRole(false)}
          >AI ENGINEER</div>

          {/* Tagline */}
          <p ref={tagRef} style={{
            maxWidth: "500px", fontFamily: "var(--font-rajdhani)",
            fontSize: "0.95rem", lineHeight: 2, fontWeight: 400,
            color: "rgba(255,255,255,0.64)", marginBottom: "2.8rem", cursor: "default",
            paddingLeft: "14px", borderLeft: "1px solid rgba(255,255,255,0.1)", opacity: 0,
          }}
            onMouseEnter={() => hTag(true)} onMouseLeave={() => hTag(false)}
          >
            Architecting intelligent systems,<br />
            LLM-driven infrastructures,<br />
            and autonomous AI workflows<br />
            where engineering precision meets<br />
            next-generation computational intelligence.
          </p>

          {/* ENTER SYSTEM BUTTON */}
          <button
            ref={btnRef}
            className="btn-primary"
            style={{ opacity: 0, marginTop: "1.2rem", alignSelf: "flex-start" }}
            onClick={handleEnterSystem}
          >
            <span style={{
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "60%",
              height: "100%",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
              transform: "skewX(-20deg)",
              transition: "left 0.6s ease",
              pointerEvents: "none",
            }} className="btn-sweep" />
            ENTER SYSTEM →
          </button>
        </div>

        {/* RIGHT */}
        <div ref={rightRef} style={{
          position: "relative", zIndex: 5,
          display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-end",
          paddingRight: "10%",
        }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", width: "100%" }}>
            {RIGHT_DATA.map((r, i) => (
              <HeroRightRow key={i} index={i} label={r.label} value={r.value} href={r.href} isStatus={r.isStatus} />
            ))}
          </div>
          <div style={{
            position: "absolute", bottom: "72px", right: "7%",
            fontFamily: "var(--font-orbitron)", fontSize: "0.35rem", letterSpacing: "0.36em", color: "rgba(255,255,255,0.1)",
          }}>
            VIRTUAL/OS v3.1.4 // BUILD 20260515
          </div>
        </div>
      </div>

      {/* PORTRAIT OVERLAY z=50 */}
      <div ref={portRef} style={{
        position: "absolute", top: 0, bottom: 0,
        left: "54%", transform: "translateX(-50%)",
        width: "40vw", maxWidth: "450px",
        zIndex: 50, pointerEvents: "none", opacity: 0,
        overflow: "hidden",
      }}>
        <div ref={glitchOvRef} style={{
          position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
          background: "repeating-linear-gradient(to bottom,rgba(255,255,255,0.08) 0px,rgba(255,255,255,0.08) 2px,transparent 2px,transparent 4px)",
          mixBlendMode: "lighten", opacity: 0.12,
        }} />
        <div ref={scanRef} style={{
          position: "absolute", left: 0, right: 0, top: "-12%", height: "14%",
          background: "linear-gradient(to bottom,rgba(255,255,255,0.7),transparent)", zIndex: 10,
        }} />
        <img ref={imgRed} src="/images/stock/hero.png" alt="" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "contain", objectPosition: "center bottom",
          transform: "translateX(-3px)", opacity: 0, mixBlendMode: "lighten",
          filter: "grayscale(100%) sepia(100%) hue-rotate(-40deg) saturate(8)", zIndex: 4,
        }} />
        <img ref={imgBlue} src="/images/stock/hero.png" alt="" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "contain", objectPosition: "center bottom",
          transform: "translateX(3px)", opacity: 0, mixBlendMode: "screen",
          filter: "grayscale(100%) sepia(100%) hue-rotate(180deg) saturate(8)", zIndex: 5,
        }} />
        <img ref={imgMain} src="/images/stock/hero.png" alt="Adithyaa K" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "contain", objectPosition: "center bottom",
          filter: "grayscale(100%) contrast(1.08) brightness(1)", zIndex: 8,
        }} />
        <div style={{
          position: "absolute", inset: 0, zIndex: 12, pointerEvents: "none",
        }} />
        {glitchSlice && (
          <div style={{
            position: "absolute", inset: 0, zIndex: 25, pointerEvents: "none",
            background: `linear-gradient(transparent ${20 + Math.random() * 30}%,rgba(255,255,255,0.06) ${30 + Math.random() * 10}%,rgba(255,255,255,0.06) ${35 + Math.random() * 10}%,transparent ${45 + Math.random() * 20}%)`,
            transform: `translateX(${Math.random() > 0.5 ? 4 : -4}px)`,
          }} />
        )}
      </div>

      {/* FRAME OVERLAY */}
      <div style={{ position: "absolute", inset: 0, zIndex: 35, pointerEvents: "none" }}>
        <div ref={sweepRef} style={{
          position: "absolute", top: "44px",
          left: "4%", right: "4%",
          height: "2px",
          overflow: "hidden",
          zIndex: 40,
          pointerEvents: "none",
        }}>
          <div id="sweep-light" style={{
            position: "absolute",
            top: 0, left: 0,
            width: "120px", height: "2px",
            background: "linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.9) 50%,transparent 100%)",
            pointerEvents: "none",
            willChange: "transform",
          }} />
        </div>
        <div className="hero-frame-h" style={{ position: "absolute", top: "44px", left: "4%", right: "4%", height: "1px", background: "rgba(255,255,255,0.07)", transformOrigin: "left" }} />
        <div className="hero-frame-h" style={{ position: "absolute", bottom: "44px", left: "4%", right: "4%", height: "1px", background: "rgba(255,255,255,0.07)", transformOrigin: "right" }} />
        {(["tl", "tr", "bl", "br"] as const).map(p => <HeroCornerMk key={p} pos={p} />)}
        <div style={{ position: "absolute", top: "16px", left: "24px", fontFamily: "var(--font-mono)", fontSize: "0.38rem", letterSpacing: "0.44em", color: "rgba(255,255,255,0.16)" }}>
          BOOTWARE/OS // PORTFOLIO.EXE
        </div>
        <LiveClock />
        <div style={{ position: "absolute", bottom: "12px", left: "24px", right: "24px", display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.34rem", letterSpacing: "0.28em", color: "rgba(255,255,255,0.12)" }}>
            SYS:NOMINAL · MEM:64GB · CPU:128c · ENC:AES-256
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.34rem", letterSpacing: "0.28em", color: "rgba(255,255,255,0.10)" }}>
            CHENNAI·IND · 13.0827°N 80.2707°E
          </div>
        </div>
      </div>

      {/* NOISE LINES */}
      <div style={{ position: "absolute", inset: 0, zIndex: 6, pointerEvents: "none" }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} style={{ position: "absolute", top: `${i * 5}%`, left: 0, right: 0, height: "1px", background: "rgba(255,255,255,0.018)" }} />
        ))}
      </div>

      <style>{`
        @keyframes blink-block { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes status-pulse { 0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(255,255,255,0.55)} 50%{opacity:0.3;box-shadow:0 0 0 5px rgba(255,255,255,0)} }
        @keyframes underline-draw { from{width:0} to{width:100%} }
        @keyframes row-scan { 0%{background-position:110% 0} 100%{background-position:-10% 0} }
      `}</style>
    </section>
  );
}

// ─── HERO RIGHT ROW ───────────────────────────────────────────────────────────
function HeroRightRow({ index, label, value, href, isStatus }: { index: number; label: string; value: string; href: string | null; isStatus: boolean }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [hov, setHov] = useState(false);
  const onEnter = () => {
    setHov(true);
    const M: Record<number, gsap.TweenVars> = {
      0: { x: -8, duration: 0.28 }, 1: { x: -12, letterSpacing: "0.07em", duration: 0.32 },
      2: { keyframes: [{ x: -3, duration: 0.04 }, { x: 7, duration: 0.04 }, { x: 0, duration: 0.06 }] },
      3: { scale: 1.04, transformOrigin: "right center", duration: 0.28 },
      4: { x: -10, duration: 0.28, ease: "power3.out" }, 5: { x: -8, skewX: -1.5, duration: 0.28 },
    };
    if (rowRef.current) gsap.to(rowRef.current, M[index] ?? { x: -6, duration: 0.28 });
  };
  const onLeave = () => {
    setHov(false);
    if (rowRef.current) gsap.to(rowRef.current, { x: 0, skewX: 0, scale: 1, duration: 0.38, ease: "power2.out" });
  };
  return (
    <div ref={rowRef} className="hero-right-row" style={{
      textAlign: "right",
      borderRight: `1px solid ${hov ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.08)"}`,
      borderBottom: "1px solid rgba(255,255,255,0.04)",
      paddingRight: "20px", paddingTop: "16px", paddingBottom: "16px",
      width: "100%", cursor: href ? "pointer" : "default",
      position: "relative", overflow: "hidden",
      transition: "border-right-color 0.22s ease", opacity: 0,
    }} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {hov && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.03) 50%,transparent 100%)", backgroundSize: "200% 100%", animation: "row-scan 0.5s ease forwards", pointerEvents: "none" }} />}
      {hov && <div style={{ position: "absolute", bottom: 0, right: 0, height: "1px", background: "rgba(255,255,255,0.28)", animation: "underline-draw 0.25s ease forwards" }} />}
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.37rem", letterSpacing: "0.55em", color: hov ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.2)", marginBottom: "6px", textTransform: "uppercase", transition: "color 0.2s ease" }}>{label}</div>
      <div style={{ fontFamily: "var(--font-orbitron)", fontSize: "0.65rem", letterSpacing: "0.1em", fontWeight: 700, color: hov ? "#fff" : "rgba(255,255,255,0.9)", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "10px", textShadow: hov ? "0 0 20px rgba(255,255,255,0.35)" : "none", transition: "color 0.18s ease,text-shadow 0.18s ease" }}>
        {isStatus && <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#fff", flexShrink: 0, animation: "status-pulse 2.2s ease infinite" }} />}
        {href ? <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>{value}</a> : value}
      </div>
    </div>
  );
}

// ─── HERO CORNER MK ───────────────────────────────────────────────────────────
function HeroCornerMk({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const isTop = pos[0] === "t";
  const isLeft = pos[1] === "l";
  const COLOR = "rgba(255,255,255,0.45)";
  const ARM_W = 20;
  const ARM_H = 20;
  return (
    <div
      className="hero-corner-mk"
      style={{
        position: "absolute",
        top: isTop ? "43px" : undefined,
        bottom: !isTop ? "43px" : undefined,
        left: isLeft ? "20px" : undefined,
        right: !isLeft ? "20px" : undefined,
        display: "flex",
        flexDirection: isTop ? "column" : "column-reverse",
        alignItems: isLeft ? "flex-start" : "flex-end",
      }}
    >
      <div style={{ width: `${ARM_W}px`, height: "1px", background: COLOR, flexShrink: 0 }} />
      <div style={{ width: "1px", height: `${ARM_H}px`, background: COLOR, flexShrink: 0, alignSelf: isLeft ? "flex-start" : "flex-end" }} />
    </div>
  );
}

// ─── LIVE CLOCK ───────────────────────────────────────────────────────────────
function LiveClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = () => { const n = new Date(); setT(`${String(n.getHours()).padStart(2, "0")}:${String(n.getMinutes()).padStart(2, "0")}:${String(n.getSeconds()).padStart(2, "0")}`); };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, []);
  return <div style={{ position: "absolute", top: "15px", right: "17px", fontFamily: "var(--font-orbitron)", fontSize: "0.6rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.28)" }}>{t}</div>;
}

// ─── NEW: BOOT RADAR ─────────────────────────────────────────────────────────
function BootRadar() {
  return (
    <div style={{ position: "relative", width: "100%", height: "110px", display: "flex", alignItems: "center", gap: "20px" }}>
      {/* Radar circle */}
      <div style={{ position: "relative", width: "110px", height: "110px", flexShrink: 0 }}>
        <svg width="110" height="110" viewBox="0 0 110 110" fill="none" style={{ position: "absolute", inset: 0 }}>
          {/* Concentric rings */}
          {[48, 36, 24, 12].map((r, i) => (
            <circle key={i} cx="55" cy="55" r={r}
              stroke="rgba(255,255,255,0.06)" strokeWidth="1"
              strokeDasharray={`${2 * Math.PI * r}`} strokeDashoffset={`${2 * Math.PI * r}`}
              style={{ animation: `wire-draw 0.6s ease forwards ${0.1 + i * 0.12}s` }}
            />
          ))}
          {/* Crosshair */}
          <line x1="55" y1="7" x2="55" y2="103" stroke="rgba(255,255,255,0.04)" strokeWidth="1"
            strokeDasharray="96" strokeDashoffset="96"
            style={{ animation: "wire-draw 0.5s ease forwards 0.4s" }}
          />
          <line x1="7" y1="55" x2="103" y2="55" stroke="rgba(255,255,255,0.04)" strokeWidth="1"
            strokeDasharray="96" strokeDashoffset="96"
            style={{ animation: "wire-draw 0.5s ease forwards 0.4s" }}
          />
          {/* Outer ring */}
          <circle cx="55" cy="55" r="52"
            stroke="rgba(255,255,255,0.12)" strokeWidth="1"
            strokeDasharray="327" strokeDashoffset="327"
            style={{ animation: "wire-draw 1.0s ease forwards 0.05s" }}
          />
          {/* Rotating sweep arm */}
          <line x1="55" y1="55" x2="55" y2="3"
            stroke="rgba(255,255,255,0.55)" strokeWidth="1.5"
            style={{ transformOrigin: "55px 55px", animation: "radar-spin 3s linear infinite 0.8s", opacity: 0 }}
          />
          {/* Sweep cone (faked with arc fill) */}
          <path d="M55 55 L55 3 A52 52 0 0 1 103 55 Z"
            fill="url(#radarGrad)"
            style={{ transformOrigin: "55px 55px", animation: "radar-spin 3s linear infinite 0.8s", opacity: 0 }}
          />
          <defs>
            <radialGradient id="radarGrad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
              gradientTransform="translate(55 55) scale(52)">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
            </radialGradient>
          </defs>
          {/* Blip targets */}
          <circle cx="38" cy="28" r="2.5" fill="rgba(255,255,255,0.7)"
            style={{ animation: "radar-blip 3s ease-in-out infinite 1.2s", opacity: 0 }}
          />
          <circle cx="72" cy="68" r="1.8" fill="rgba(255,255,255,0.5)"
            style={{ animation: "radar-blip 3s ease-in-out infinite 2.1s", opacity: 0 }}
          />
          <circle cx="48" cy="74" r="1.5" fill="rgba(255,255,255,0.4)"
            style={{ animation: "radar-blip 3s ease-in-out infinite 0.4s", opacity: 0 }}
          />
          <circle cx="80" cy="35" r="2" fill="rgba(255,255,255,0.55)"
            style={{ animation: "radar-blip 3s ease-in-out infinite 1.8s", opacity: 0 }}
          />
          {/* Center dot */}
          <circle cx="55" cy="55" r="2.5" fill="rgba(255,255,255,0.9)"
            style={{ animation: "fade-in 0.3s ease forwards 0.6s", opacity: 0 }}
          />
        </svg>
      </div>

      {/* Right side data stack */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px", animation: "fade-in 0.5s ease forwards 0.8s", opacity: 0 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.3rem", letterSpacing: "0.5em", color: "rgba(255,255,255,0.22)", marginBottom: "4px" }}>
          SPATIAL SCAN · ACTIVE
        </div>
        {[
          { label: "LAT", value: "13.0827°N", bar: 72 },
          { label: "LON", value: "80.2707°E", bar: 85 },
          { label: "ALT", value: "006.0 MSL", bar: 40 },
          { label: "PING", value: "004ms", bar: 95 },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.3rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.3)", width: "28px", flexShrink: 0 }}>{item.label}</span>
            <div style={{ flex: 1, height: "2px", background: "rgba(255,255,255,0.05)", position: "relative", overflow: "hidden" }}>
              <div style={{
                position: "absolute", left: 0, top: 0, height: "100%", width: `${item.bar}%`,
                background: "linear-gradient(to right, rgba(255,255,255,0.15), rgba(255,255,255,0.7))",
                transformOrigin: "left", animation: `bar-fill 0.8s ease forwards ${0.9 + i * 0.1}s`, transform: "scaleX(0)",
              }} />
            </div>
            <span style={{ fontFamily: "var(--font-orbitron)", fontSize: "0.34rem", letterSpacing: "0.08em", color: "rgba(255,255,255,0.55)", width: "55px", textAlign: "right", flexShrink: 0 }}>{item.value}</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes radar-spin {
          0%   { transform: rotate(0deg);   opacity: 1; }
          100% { transform: rotate(360deg); opacity: 1; }
        }
        @keyframes radar-blip {
          0%,100% { opacity: 0; r: 2; }
          20%     { opacity: 1; r: 3; }
          60%     { opacity: 0.4; r: 2; }
        }
      `}</style>
    </div>
  );
}

// ─── NEW: BOOT NETWORK TOPOLOGY ───────────────────────────────────────────────
function BootNetworkTopology() {
  const nodes = [
    { x: 200, y: 38, label: "CORE", r: 6, primary: true },
    { x: 80,  y: 28, label: "ML",   r: 4, primary: false },
    { x: 330, y: 22, label: "NET",  r: 4, primary: false },
    { x: 50,  y: 85, label: "DB",   r: 3.5, primary: false },
    { x: 165, y: 92, label: "API",  r: 3.5, primary: false },
    { x: 300, y: 88, label: "SEC",  r: 3.5, primary: false },
    { x: 360, y: 72, label: "ENC",  r: 3,   primary: false },
    { x: 120, y: 62, label: "INF",  r: 3,   primary: false },
  ];
  const edges = [
    [0,1],[0,2],[0,4],[0,5],[1,3],[1,7],[2,6],[2,5],[3,7],[4,5],
  ];

  return (
    <div style={{ position: "relative", width: "100%", height: "120px" }}>
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: "0.3rem", letterSpacing: "0.44em",
        color: "rgba(255,255,255,0.2)", marginBottom: "6px",
        animation: "fade-in 0.4s ease forwards 0.2s", opacity: 0,
      }}>
        NETWORK TOPOLOGY · LIVE
      </div>
      <svg width="100%" height="100" viewBox="0 0 400 100" fill="none" preserveAspectRatio="xMidYMid meet">
        {/* Edges */}
        {edges.map(([a, b], i) => {
          const na = nodes[a]; const nb = nodes[b];
          const len = Math.hypot(nb.x - na.x, nb.y - na.y);
          return (
            <g key={i}>
              <line x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                stroke="rgba(255,255,255,0.06)" strokeWidth="1"
              />
              <line x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                stroke="rgba(255,255,255,0.35)" strokeWidth="0.8"
                strokeDasharray={`${len}`} strokeDashoffset={`${len}`}
                style={{ animation: `wire-draw 0.5s ease forwards ${0.3 + i * 0.07}s` }}
              />
              {/* Travelling packet */}
              <circle r="1.5" fill="rgba(255,255,255,0.8)"
                style={{ offsetPath: `path('M${na.x} ${na.y} L${nb.x} ${nb.y}')`, animation: `packet-travel 2.4s linear infinite ${i * 0.38}s`, opacity: 0 } as React.CSSProperties}
              />
            </g>
          );
        })}
        {/* Nodes */}
        {nodes.map((n, i) => (
          <g key={i} style={{ animation: `fade-in 0.3s ease forwards ${0.4 + i * 0.06}s`, opacity: 0 }}>
            {n.primary && (
              <circle cx={n.x} cy={n.y} r={n.r + 6} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1"
                style={{ animation: "status-pulse 2.5s ease infinite" }}
              />
            )}
            <circle cx={n.x} cy={n.y} r={n.r}
              fill={n.primary ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.15)"}
              stroke="rgba(255,255,255,0.4)" strokeWidth="0.8"
            />
            <text x={n.x} y={n.y + n.r + 8}
              fill="rgba(255,255,255,0.3)" fontSize="5"
              textAnchor="middle" fontFamily="monospace" letterSpacing="0.5">
              {n.label}
            </text>
          </g>
        ))}
      </svg>
      <style>{`
        @keyframes packet-travel {
          0%   { offset-distance: 0%;   opacity: 0; }
          8%   { opacity: 1; }
          90%  { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ─── NEW: BOOT TELEMETRY GRID ─────────────────────────────────────────────────
function BootTelemetryGrid() {
  const metrics = [
    { label: "CPU LOAD",   value: "94%",     bar: 94, blink: true  },
    { label: "MEM ALLOC",  value: "61.2 GB", bar: 96, blink: false },
    { label: "GPU UTIL",   value: "87%",     bar: 87, blink: false },
    { label: "NET I/O",    value: "14 GB/s", bar: 78, blink: false },
    { label: "TEMP",       value: "42°C",    bar: 35, blink: false },
    { label: "UPTIME",     value: "00:03:41",bar: 100, blink: false },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 16px" }}>
      <div style={{
        gridColumn: "1 / -1",
        fontFamily: "var(--font-mono)", fontSize: "0.3rem", letterSpacing: "0.44em",
        color: "rgba(255,255,255,0.2)", marginBottom: "4px",
        animation: "fade-in 0.4s ease forwards 0.2s", opacity: 0,
      }}>
        TELEMETRY · REALTIME
      </div>
      {metrics.map((m, i) => (
        <div key={i} style={{ animation: `fade-in 0.3s ease forwards ${0.3 + i * 0.08}s`, opacity: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.28rem", letterSpacing: "0.22em", color: "rgba(255,255,255,0.28)" }}>
              {m.label}
            </span>
            <span style={{
              fontFamily: "var(--font-orbitron)", fontSize: "0.3rem", letterSpacing: "0.06em",
              color: m.blink ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.55)",
              animation: m.blink ? "blink-block 1.1s step-end infinite" : "none",
            }}>
              {m.value}
            </span>
          </div>
          <div style={{ height: "1.5px", background: "rgba(255,255,255,0.05)", position: "relative", overflow: "hidden" }}>
            <div style={{
              position: "absolute", left: 0, top: 0, height: "100%", width: `${m.bar}%`,
              background: m.bar > 90
                ? "linear-gradient(to right, rgba(255,200,100,0.3), rgba(255,200,100,0.8))"
                : "linear-gradient(to right, rgba(255,255,255,0.1), rgba(255,255,255,0.6))",
              transformOrigin: "left",
              animation: `bar-fill 0.7s ease forwards ${0.35 + i * 0.08}s`,
              transform: "scaleX(0)",
            }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── NEW: BOOT WAVEFORM ───────────────────────────────────────────────────────
function BootWaveform() {
  const W = 400; const H = 40; const cols = 80;
  const colW = W / cols;

  // Pre-generate heights for a realistic EEG-style waveform
  const heights = Array.from({ length: cols }, (_, i) => {
    const base = Math.sin(i * 0.4) * 8 + Math.sin(i * 0.13) * 5 + Math.sin(i * 1.1) * 3;
    const spike = (i === 20 || i === 55) ? 18 : 0;
    return Math.max(2, Math.abs(base) + spike);
  });

  return (
    <div style={{ position: "relative", width: "100%", height: "52px" }}>
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: "0.3rem", letterSpacing: "0.44em",
        color: "rgba(255,255,255,0.2)", marginBottom: "5px",
        animation: "fade-in 0.4s ease forwards 0.1s", opacity: 0,
      }}>
        NEURAL SIGNAL · EEG MONITOR
      </div>
      <svg width="100%" height="40" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none"
        style={{ animation: "fade-in 0.5s ease forwards 0.3s", opacity: 0 }}>
        {/* Baseline */}
        <line x1="0" y1={H / 2} x2={W} y2={H / 2} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        {/* Bars */}
        {heights.map((h, i) => (
          <rect
            key={i}
            x={i * colW + colW * 0.15}
            y={(H - h) / 2}
            width={colW * 0.7}
            height={h}
            fill="rgba(255,255,255,0.22)"
            rx="0.5"
            style={{
              animation: `waveform-pulse ${0.8 + Math.random() * 1.4}s ease-in-out infinite ${i * 0.025}s`,
            }}
          />
        ))}
        {/* Scan overlay */}
        <rect x="0" y="0" width="18" height={H} fill="url(#waveGrad)"
          style={{ animation: "waveform-scan 2.2s linear infinite 0.5s" }}
        />
        <defs>
          <linearGradient id="waveGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.12)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
      </svg>
      <div style={{
        position: "absolute", right: 0, bottom: 0,
        fontFamily: "var(--font-mono)", fontSize: "0.26rem", letterSpacing: "0.22em",
        color: "rgba(255,255,255,0.14)",
        animation: "fade-in 0.4s ease forwards 0.8s", opacity: 0,
      }}>
        128 CHANNELS · 4.8 GHz SAMPLE
      </div>
      <style>{`
        @keyframes waveform-pulse {
          0%,100% { transform: scaleY(1);   opacity: 0.22; }
          50%      { transform: scaleY(1.4); opacity: 0.55; }
        }
        @keyframes waveform-scan {
          0%   { transform: translateX(-18px); }
          100% { transform: translateX(418px); }
        }
      `}</style>
    </div>
  );
}

// ─── BOOT VISOR ───────────────────────────────────────────────────────────────
function BootVisor() {
  return (
    <div style={{
      position: "relative",
      border: "1px solid rgba(255,255,255,0.12)",
      padding: "14px 18px",
      overflow: "hidden",
      animation: "fade-in 0.5s ease forwards 0.8s",
      opacity: 0,
      clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
    }}>
      {/* Ambient glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.04), transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Scan line */}
      <div style={{
        position: "absolute", left: 0, right: 0, height: "2px",
        background: "linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)",
        animation: "visor-scan 2.5s linear infinite 1.0s",
        top: 0,
      }} />

      {/* Top label */}
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: "0.3rem",
        letterSpacing: "0.5em", color: "rgba(255,255,255,0.2)",
        marginBottom: "5px",
      }}>
        BIOMETRIC VERIFICATION
      </div>

      {/* Two-column layout for compact display */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
        <div>
          <div style={{
            fontFamily: "var(--font-orbitron)", fontSize: "0.9rem",
            fontWeight: 900, letterSpacing: "0.06em",
            color: "rgba(255,255,255,0.9)", marginBottom: "4px",
            animation: "fade-in 0.4s ease forwards 1.0s", opacity: 0,
          }}>
            USER DETECTED
          </div>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "0.35rem",
            letterSpacing: "0.3em", color: "rgba(255,255,255,0.3)",
            animation: "fade-in 0.4s ease forwards 1.2s", opacity: 0,
          }}>
            ROLE: SYS ADMINISTRATOR
          </div>
        </div>

        {/* Verified badge — right side */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px",
          animation: "fade-in 0.5s ease forwards 1.4s", opacity: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontFamily: "var(--font-orbitron)", fontSize: "0.48rem", fontWeight: 700, letterSpacing: "0.22em", color: "rgba(255,255,255,0.85)" }}>
              VERIFIED
            </span>
            <div style={{
              width: "7px", height: "7px", borderRadius: "50%",
              background: "rgba(255,255,255,0.9)",
              boxShadow: "0 0 10px rgba(255,255,255,0.5)",
              animation: "status-pulse 2s ease infinite 3.2s",
            }} />
          </div>
          <div style={{
            fontFamily: "var(--font-orbitron)", fontSize: "0.26rem",
            letterSpacing: "0.22em", color: "rgba(255,255,255,0.15)",
          }}>
            SYS-ID: OS-2026QXJ · LVL 5
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink-block    { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes status-pulse   { 0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(255,255,255,0.55)} 50%{opacity:0.3;box-shadow:0 0 0 5px rgba(255,255,255,0)} }
        @keyframes underline-draw { from{width:0} to{width:100%} }
        @keyframes row-scan       { 0%{background-position:110% 0} 100%{background-position:-10% 0} }
        @keyframes wire-draw      { to { stroke-dashoffset: 0; } }
        @keyframes fade-in        { to { opacity: 1; } }
        @keyframes scan-x {
          0%   { transform: translateX(0px);   opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { transform: translateX(400px); opacity: 0; }
        }
        @keyframes bar-fill   { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes bar-shimmer {
          0%  { left:-30px; opacity:0; }
          20% { opacity:1; }
          80% { opacity:1; }
          100%{ left:110%; opacity:0; }
        }
        @keyframes visor-scan {
          0%   { top:-2px;  opacity:0; }
          5%   { opacity:1; }
          95%  { opacity:1; }
          100% { top:100%;  opacity:0; }
        }
      `}</style>
    </div>
  );
}