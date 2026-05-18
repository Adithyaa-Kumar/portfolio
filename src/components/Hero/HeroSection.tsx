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
    // REPLACE WITH:
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
    const D: Record<LineType, number> = { ok: 80, warn: 125, err: 140, dim: 60, bright: 100, gap: 40 ,done : 120};

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

    // Add glow animation class
    btnRef.current.classList.add("btn-enter-active");

    // 1. Glow pulse on button
    gsap.to(btnRef.current, {
      scale: 0.96,
      duration: 0.1,
      ease: "back.out(3)",
    });

    // 2. Brief white flash after a short delay
    // 2. Scanline glitch exit — no white flash
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
                dim: "rgba(255,255,255,0.26)", bright: "rgba(255,255,255,0.97)", gap: "transparent",done: "rgb(17, 157, 12)",
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

        {/* ── BOOT RIGHT HUD ── */}
        <div ref={bootRightRef} style={{
          position: "absolute", top: 0, right: 0,
          width: "50%", height: "100%",
          padding: "8% 7% 8% 4%",
          display: "flex", flexDirection: "column",
          justifyContent: "center", gap: "28px",
        }}>
          <BootWireframe />
          <BootCircuits />
          <BootLoadingBars />
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
            LLM-driven infrastructures,<br/>
            and autonomous AI workflows<br/>
            where engineering precision meets<br/>
            next-generation computational intelligence.
          </p>

          {/* ENTER SYSTEM BUTTON */}
          <button
            ref={btnRef}
            className="btn-primary"
            style={{ opacity: 0, marginTop: "1.2rem", alignSelf: "flex-start" }}
            onClick={handleEnterSystem}
          >
            {/* Sweep shimmer element */}
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

      {/* PORTRAIT OVERLAY z=50 (between solid z=1 and stroke z=60) */}
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

function HeroCornerMk({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const isTop = pos[0] === "t";
  const isLeft = pos[1] === "l";
  const COLOR = "rgba(255,255,255,0.45)";
  const ARM_W = 20; // horizontal arm length px
  const ARM_H = 20; // vertical arm height px
  // Top corners sit AT the frame line (44px), not the screen edge.
  // Bottom corners sit AT the bottom frame line (44px from bottom).
  // Left/right offset: 24px so they align with the OS label text.
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
      {/* Horizontal arm */}
      <div style={{
        width: `${ARM_W}px`,
        height: "1px",
        background: COLOR,
        flexShrink: 0,
      }} />
      {/* Vertical arm */}
      <div style={{
        width: "1px",
        height: `${ARM_H}px`,
        background: COLOR,
        flexShrink: 0,
        alignSelf: isLeft ? "flex-start" : "flex-end",
      }} />
    </div>
  );
}

function LiveClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = () => { const n = new Date(); setT(`${String(n.getHours()).padStart(2, "0")}:${String(n.getMinutes()).padStart(2, "0")}:${String(n.getSeconds()).padStart(2, "0")}`); };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, []);
  return <div style={{ position: "absolute", top: "15px", right: "17px", fontFamily: "var(--font-orbitron)", fontSize: "0.6rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.28)" }}>{t}</div>;
}
// ─── BOOT WIREFRAME ──────────────────────────────────────────────────────────
function BootWireframe() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100px" }}>
      <svg width="100%" height="100" viewBox="0 0 400 100" fill="none"
        style={{ position: "absolute", inset: 0 }}>
        {/* Outer frame draws in */}
        <rect x="1" y="1" width="398" height="98" rx="1"
          stroke="rgba(255,255,255,0.15)" strokeWidth="1"
          strokeDasharray="996" strokeDashoffset="996"
          style={{ animation: "wire-draw 1.2s ease forwards 0.1s" }}
        />
        {/* Horizontal divider */}
        <line x1="0" y1="50" x2="400" y2="50"
          stroke="rgba(255,255,255,0.04)" strokeWidth="1"
          strokeDasharray="400" strokeDashoffset="400"
          style={{ animation: "wire-draw 0.6s ease forwards 0.8s" }}
        />
        {/* Corner brackets */}
        <path d="M1 22 L1 1 L22 1" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"
          strokeDasharray="44" strokeDashoffset="44"
          style={{ animation: "wire-draw 0.35s ease forwards 0.05s" }}
        />
        <path d="M378 1 L399 1 L399 22" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"
          strokeDasharray="44" strokeDashoffset="44"
          style={{ animation: "wire-draw 0.35s ease forwards 0.1s" }}
        />
        <path d="M1 78 L1 99 L22 99" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"
          strokeDasharray="44" strokeDashoffset="44"
          style={{ animation: "wire-draw 0.35s ease forwards 0.15s" }}
        />
        <path d="M378 99 L399 99 L399 78" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"
          strokeDasharray="44" strokeDashoffset="44"
          style={{ animation: "wire-draw 0.35s ease forwards 0.2s" }}
        />
        {/* Reticle circle */}
        <circle cx="200" cy="50" r="16"
          stroke="rgba(255,255,255,0.07)" strokeWidth="1"
          strokeDasharray="101" strokeDashoffset="101"
          style={{ animation: "wire-draw 0.7s ease forwards 0.9s" }}
        />
        <circle cx="200" cy="50" r="4"
          stroke="rgba(255,255,255,0.3)" strokeWidth="1"
          strokeDasharray="26" strokeDashoffset="26"
          style={{ animation: "wire-draw 0.4s ease forwards 1.2s" }}
        />
        {/* Cross hairs */}
        <line x1="200" y1="28" x2="200" y2="72"
          stroke="rgba(255,255,255,0.06)" strokeWidth="1"
          strokeDasharray="44" strokeDashoffset="44"
          style={{ animation: "wire-draw 0.4s ease forwards 1.0s" }}
        />
        <line x1="178" y1="50" x2="222" y2="50"
          stroke="rgba(255,255,255,0.06)" strokeWidth="1"
          strokeDasharray="44" strokeDashoffset="44"
          style={{ animation: "wire-draw 0.4s ease forwards 1.0s" }}
        />
        {/* Horizontal scan sweep */}
        <line x1="0" y1="50" x2="0" y2="50"
          stroke="rgba(255,255,255,0.5)" strokeWidth="1"
          style={{ animation: "scan-x 2.4s ease-in-out infinite 0.4s" }}
        />
      </svg>
      <div style={{
        position: "absolute", bottom: "4px", left: "12px",
        fontFamily: "var(--font-mono)", fontSize: "0.28rem",
        letterSpacing: "0.38em", color: "rgba(255,255,255,0.18)",
        animation: "fade-in 0.4s ease forwards 1.3s", opacity: 0,
      }}>
        FRAME LOCK · SCANNING
      </div>
      <div style={{
        position: "absolute", bottom: "4px", right: "12px",
        fontFamily: "var(--font-mono)", fontSize: "0.28rem",
        letterSpacing: "0.2em", color: "rgba(255,255,255,0.12)",
        animation: "fade-in 0.4s ease forwards 1.5s", opacity: 0,
      }}>
        SYS · INIT
      </div>
    </div>
  );
}

// ─── BOOT CIRCUITS ────────────────────────────────────────────────────────────
function BootCircuits() {
  const rows = [
    { d: "M0 6 H80 V18 H140 V6 H220 V18 H280", delay: "0.2s" },
    { d: "M0 6 H50 V0 H110 V12 H170 V0 H240 V12 H300", delay: "0.5s" },
    { d: "M0 6 H60 V18 H130 V6 H200 V18 H260", delay: "0.8s" },
  ];

  const nodes = [
    [80, 6], [140, 6], [220, 6], [280, 6],
    [50, 6], [110, 6], [170, 6], [240, 6],
    [60, 6], [130, 6], [200, 6], [260, 6],
  ];

  return (
    <div style={{ position: "relative", width: "100%", height: "68px" }}>
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: "0.28rem",
        letterSpacing: "0.44em", color: "rgba(255,255,255,0.18)",
        marginBottom: "8px",
        animation: "fade-in 0.3s ease forwards 0.1s", opacity: 0,
      }}>
        CIRCUIT MAP · ACTIVE
      </div>
      <svg width="100%" height="52" viewBox="0 0 400 52" fill="none">
        {rows.map((row, i) => (
          <g key={i} transform={`translate(0, ${i * 18})`}>
            <path d={row.d} stroke="rgba(255,255,255,0.04)" strokeWidth="1" fill="none" />
            <path d={row.d} stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none"
              strokeDasharray="500" strokeDashoffset="500"
              style={{ animation: `wire-draw 1.0s ease forwards ${row.delay}` }}
            />
          </g>
        ))}
        {nodes.map(([x, y], i) => {
          const row = Math.floor(i / 4);
          return (
            <g key={i}>
              <circle cx={x} cy={y + row * 18} r="3.5"
                fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1"
                style={{ animation: `fade-in 0.25s ease forwards ${0.3 + i * 0.06}s`, opacity: 0 }}
              />
              <circle cx={x} cy={y + row * 18} r="1.5"
                fill="rgba(255,255,255,0.5)"
                style={{ animation: `fade-in 0.25s ease forwards ${0.4 + i * 0.06}s`, opacity: 0 }}
              />
            </g>
          );
        })}
        {/* Travelling pulse on first row */}
        <circle r="2.5" fill="rgba(255,255,255,0.9)" cy="6"
          style={{ animation: "pulse-travel 2.2s ease-in-out infinite 0.6s", opacity: 0 }}
        />
      </svg>
      <style>{`
        @keyframes pulse-travel {
          0%   { cx: 0;   opacity: 0; }
          5%   { opacity: 1; }
          90%  { opacity: 1; }
          100% { cx: 300; opacity: 0; }
        }
        @keyframes circuit-pulse-0 { 0%,100%{opacity:0} 50%{opacity:1} }
        @keyframes circuit-pulse-1 { 0%,100%{opacity:0} 50%{opacity:1} }
        @keyframes circuit-pulse-2 { 0%,100%{opacity:0} 50%{opacity:1} }
        @keyframes circuit-pulse-3 { 0%,100%{opacity:0} 50%{opacity:1} }
      `}</style>
    </div>
  );
}

// ─── BOOT LOADING BARS ────────────────────────────────────────────────────────
function BootLoadingBars() {
  const bars = [
    { label: "NEURAL CORE", pct: 100, delay: "0.2s", dur: "1.2s" },
    { label: "VISION MODULE", pct: 94, delay: "0.4s", dur: "1.0s" },
    { label: "MEMORY BANKS", pct: 100, delay: "0.6s", dur: "0.9s" },
    { label: "IDENTITY SYSTEM", pct: 100, delay: "0.8s", dur: "0.8s" },
    { label: "INFERENCE ENGINE", pct: 87, delay: "1.0s", dur: "0.7s" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: "0.32rem",
        letterSpacing: "0.44em", color: "rgba(255,255,255,0.2)",
        marginBottom: "4px",
        animation: "fade-in 0.4s ease forwards 0.3s", opacity: 0,
      }}>
        SUBSYSTEM INITIALIZATION
      </div>

      {bars.map((bar, i) => (
        <div key={i} style={{
          animation: `fade-in 0.3s ease forwards ${bar.delay}`,
          opacity: 0,
        }}>
          <div style={{
            display: "flex", justifyContent: "space-between",
            marginBottom: "4px",
          }}>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "0.34rem",
              letterSpacing: "0.28em", color: "rgba(255,255,255,0.38)",
            }}>
              {bar.label}
            </span>
            <span style={{
              fontFamily: "var(--font-orbitron)", fontSize: "0.34rem",
              letterSpacing: "0.1em", color: "rgba(255,255,255,0.5)",
            }}>
              {bar.pct}%
            </span>
          </div>
          {/* Track */}
          <div style={{
            width: "100%", height: "2px",
            background: "rgba(255,255,255,0.06)",
            position: "relative", overflow: "hidden",
          }}>
            {/* Fill */}
            <div style={{
              position: "absolute", left: 0, top: 0, height: "100%",
              width: `${bar.pct}%`,
              background: "linear-gradient(to right, rgba(255,255,255,0.2), rgba(255,255,255,0.8))",
              transformOrigin: "left",
              animation: `bar-fill ${bar.dur} ease forwards ${bar.delay}`,
              transform: "scaleX(0)",
            }} />
            {/* Shimmer */}
            <div style={{
              position: "absolute", top: 0, height: "100%", width: "30px",
              background: "linear-gradient(to right, transparent, rgba(255,255,255,0.9), transparent)",
              animation: `bar-shimmer 1.5s ease-in-out infinite ${bar.delay}`,
            }} />
          </div>
        </div>
      ))}

      <style>{`
        @keyframes bar-fill {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes bar-shimmer {
          0%   { left: -30px; opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { left: 110%; opacity: 0; }
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
      padding: "18px 20px",
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
        fontFamily: "var(--font-mono)", fontSize: "0.32rem",
        letterSpacing: "0.5em", color: "rgba(255,255,255,0.2)",
        marginBottom: "5px",
      }}>
        BIOMETRIC VERIFICATION
      </div>

      {/* Main identity line */}
      <div style={{
        fontFamily: "var(--font-orbitron)", fontSize: "1.1rem",
        fontWeight: 900, letterSpacing: "0.08em",
        color: "rgba(255,255,255,0.9)",
        marginBottom: "6px",
        animation: "fade-in 0.4s ease forwards 1.0s",
        opacity: 0,
      }}>
        USER DETECTED
      </div>

      {/* Role */}
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: "0.42rem",
        letterSpacing: "0.38em", color: "rgba(255,255,255,0.35)",
        marginBottom: "16px",
        animation: "fade-in 0.4s ease forwards 1.2s",
        opacity: 0,
      }}>
        ACCESS ROLE: SYSTEM ADMINISTRATOR
      </div>

      {/* Divider */}
      <div style={{
        height: "1px", marginBottom: "14px",
        background: "linear-gradient(to right, rgba(255,255,255,0.25), transparent)",
        animation: "wire-draw 0.6s ease forwards 1.3s",
        clipPath: "inset(0)",
      }} />

      {/* Verified badge */}
      <div style={{
        display: "flex", alignItems: "center", gap: "10px",
        animation: "fade-in 0.5s ease forwards 1.5s",
        opacity: 0,
      }}>
        <div style={{
          width: "8px", height: "8px", borderRadius: "50%",
          background: "rgba(255,255,255,0.9)",
          boxShadow: "0 0 12px rgba(255,255,255,0.6)",
          animation: "status-pulse 2s ease infinite 3.2s",
        }} />
        <span style={{
          fontFamily: "var(--font-orbitron)", fontSize: "0.55rem",
          fontWeight: 700, letterSpacing: "0.3em",
          color: "rgba(255,255,255,0.85)",
        }}>
          IDENTITY VERIFIED
        </span>
      </div>

      {/* Credential ID */}
      <div style={{
        marginTop: "12px",
        fontFamily: "var(--font-orbitron)", fontSize: "0.3rem",
        letterSpacing: "0.3em", color: "rgba(255,255,255,0.15)",
        animation: "fade-in 0.4s ease forwards 1.7s",
        opacity: 0,
      }}>
        SYS-ID: OS-2026QXJ · CLEARANCE: LEVEL 5
      </div>

      <style>{`
  @keyframes blink-block { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes status-pulse { 0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(255,255,255,0.55)} 50%{opacity:0.3;box-shadow:0 0 0 5px rgba(255,255,255,0)} }
  @keyframes underline-draw { from{width:0} to{width:100%} }
  @keyframes row-scan { 0%{background-position:110% 0} 100%{background-position:-10% 0} }
  @keyframes wire-draw { to { stroke-dashoffset: 0; } }
  @keyframes fade-in   { to { opacity: 1; } }
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
