"use client";

import { useEffect, useRef } from "react";

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface Vec { x: number; y: number }

interface Chip {
  x: number; y: number;
  w: number; h: number;
  type: "cpu" | "ram" | "ic" | "cap";
  pins: Vec[];
  label: string;
  glowPhase: number;
  glowSpeed: number;
}

interface Trace {
  points: Vec[];
  progress: number;
  speed: number;
  opacity: number;
  width: number;
  pulse: number;
  pulseSpeed: number;
  tailLen: number;
  chipSrc?: number;
}

interface Particle {
  x: number; y: number;
  life: number; maxLife: number;
  vx: number; vy: number;
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────

const GRID = 40;
const snap = (v: number) => Math.round(v / GRID) * GRID;
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const randInt = (a: number, b: number) => Math.floor(rand(a, b));

const BLUE  = (a: number) => `rgba(200,230,255,${a})`;
const CYAN  = (a: number) => `rgba(80,220,255,${a})`;
const WHITE = (a: number) => `rgba(200,230,255,${a})`;

function buildChips(W: number, H: number): Chip[] {
  const chips: Chip[] = [];

  // CPU / large chip — center-ish
  chips.push(makeCPU(snap(W * 0.3), snap(H * 0.35)));
  chips.push(makeCPU(snap(W * 0.68), snap(H * 0.6)));

  // RAM sticks
  for (let i = 0; i < 3; i++) {
    chips.push(makeRAM(snap(rand(80, W - 200)), snap(rand(60, H - 120))));
  }

  // Small ICs
  for (let i = 0; i < 6; i++) {
    chips.push(makeIC(snap(rand(40, W - 100)), snap(rand(40, H - 80))));
  }

  // Capacitors
  for (let i = 0; i < 8; i++) {
    chips.push(makeCap(snap(rand(40, W - 60)), snap(rand(40, H - 60))));
  }

  return chips;
}

function makeCPU(x: number, y: number): Chip {
  const w = 160, h = 160;
  const pins: Vec[] = [];
  const pinCount = 6;
  for (let i = 0; i < pinCount; i++) {
    pins.push({ x: x + (i / (pinCount - 1)) * w, y: y - 10 });        // top
    pins.push({ x: x + (i / (pinCount - 1)) * w, y: y + h + 10 });    // bottom
    pins.push({ x: x - 10, y: y + (i / (pinCount - 1)) * h });        // left
    pins.push({ x: x + w + 10, y: y + (i / (pinCount - 1)) * h });    // right
  }
  return { x, y, w, h, type: "cpu", pins, label: "PROC-X1", glowPhase: Math.random() * Math.PI * 2, glowSpeed: 0.012 };
}

function makeRAM(x: number, y: number): Chip {
  const w = 120, h = 40;
  const pins: Vec[] = [];
  for (let i = 0; i < 8; i++) {
    pins.push({ x: x + (i / 7) * w, y: y - 8 });
    pins.push({ x: x + (i / 7) * w, y: y + h + 8 });
  }
  return { x, y, w, h, type: "ram", pins, label: "MEM-DDR", glowPhase: Math.random() * Math.PI * 2, glowSpeed: 0.018 };
}

function makeIC(x: number, y: number): Chip {
  const w = 60, h = 30;
  const pins: Vec[] = [];
  for (let i = 0; i < 4; i++) {
    pins.push({ x: x + (i / 3) * w, y: y - 8 });
    pins.push({ x: x + (i / 3) * w, y: y + h + 8 });
  }
  return { x, y, w, h, type: "ic", pins, label: "IC", glowPhase: Math.random() * Math.PI * 2, glowSpeed: 0.022 };
}

function makeCap(x: number, y: number): Chip {
  const w = 18, h = 18;
  return { x, y, w, h, type: "cap", pins: [{ x, y: y - 8 }, { x, y: y + h + 8 }], label: "", glowPhase: Math.random() * Math.PI * 2, glowSpeed: 0.03 };
}

function buildTrace(chips: Chip[], W: number, H: number): Trace {
  const srcChip = chips[randInt(0, chips.length)];
  const srcPin  = srcChip.pins[randInt(0, srcChip.pins.length)];

  const points: Vec[] = [{ x: snap(srcPin.x), y: snap(srcPin.y) }];
  let cx = points[0].x, cy = points[0].y;

  // Route to a random target (another chip pin or just wander)
  const dstChip = chips[randInt(0, chips.length)];
  const dstPin  = dstChip.pins[randInt(0, dstChip.pins.length)];

  // L-shaped routing: horizontal then vertical (PCB style)
  const midX = snap(dstPin.x);
  const midY = snap(srcPin.y);
  if (Math.abs(midX - cx) > GRID) points.push({ x: midX, y: midY });
  points.push({ x: snap(dstPin.x), y: snap(dstPin.y) });

  // Add one extra jog for realism
  if (Math.random() < 0.4 && points.length >= 2) {
    const jog = snap(rand(-3, 3) * GRID);
    points.splice(1, 0, { x: cx + jog, y: cy });
  }

  return {
    points,
    progress: Math.random(),
    speed: rand(0.002, 0.006),
    opacity: rand(0.5, 0.9),
    width: Math.random() < 0.2 ? 2 : 1,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: rand(0.015, 0.04),
    tailLen: rand(0.15, 0.3),
    chipSrc: chips.indexOf(srcChip),
  };
}

function totalLen(pts: Vec[]) {
  let l = 0;
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i].x - pts[i-1].x, dy = pts[i].y - pts[i-1].y;
    l += Math.sqrt(dx*dx + dy*dy);
  }
  return l;
}

function ptAt(pts: Vec[], t: number): Vec {
  const total = totalLen(pts);
  let rem = t * total;
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i].x - pts[i-1].x, dy = pts[i].y - pts[i-1].y;
    const seg = Math.sqrt(dx*dx + dy*dy);
    if (rem <= seg) {
      const f = rem / seg;
      return { x: pts[i-1].x + dx*f, y: pts[i-1].y + dy*f };
    }
    rem -= seg;
  }
  return pts[pts.length - 1];
}

// ─── DRAW FUNCTIONS ───────────────────────────────────────────────────────────

function drawChip(ctx: CanvasRenderingContext2D, c: Chip, t: number) {
  c.glowPhase += c.glowSpeed;
  const glow = 0.5 + 0.5 * Math.sin(c.glowPhase);

  if (c.type === "cap") {
    // Cylindrical capacitor
    const cx = c.x + c.w / 2, cy = c.y + c.h / 2;
    ctx.beginPath();
    ctx.arc(cx, cy, c.w / 2, 0, Math.PI * 2);
    ctx.strokeStyle = BLUE(0.5 + glow * 0.3);
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = BLUE(0.06 + glow * 0.06);
    ctx.fill();
    // + mark
    ctx.beginPath();
    ctx.moveTo(cx - 4, cy); ctx.lineTo(cx + 4, cy);
    ctx.moveTo(cx, cy - 4); ctx.lineTo(cx, cy + 4);
    ctx.strokeStyle = CYAN(0.4 + glow * 0.3);
    ctx.lineWidth = 1;
    ctx.stroke();
    // pins
    c.pins.forEach(p => {
      ctx.beginPath();
      ctx.moveTo(cx, p.y < cy ? cy - c.h/2 : cy + c.h/2);
      ctx.lineTo(p.x, p.y);
      ctx.strokeStyle = BLUE(0.4);
      ctx.lineWidth = 1;
      ctx.stroke();
    });
    return;
  }

  // Body
  ctx.beginPath();
  ctx.roundRect(c.x, c.y, c.w, c.h, c.type === "cpu" ? 6 : 3);
  ctx.fillStyle = `rgba(4,12,28,${0.92})`;
  ctx.fill();
  ctx.strokeStyle = BLUE(0.4 + glow * 0.4);
  ctx.lineWidth = c.type === "cpu" ? 1.5 : 1;
  ctx.stroke();

  // Inner glow
  if (c.type === "cpu") {
    const ig = ctx.createRadialGradient(
      c.x + c.w/2, c.y + c.h/2, 0,
      c.x + c.w/2, c.y + c.h/2, c.w * 0.7,
    );
    ig.addColorStop(0, BLUE(0.08 + glow * 0.1));
    ig.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = ig;
    ctx.beginPath();
    ctx.roundRect(c.x, c.y, c.w, c.h, 6);
    ctx.fill();

    // Inner die square
    const pad = 28;
    ctx.beginPath();
    ctx.rect(c.x + pad, c.y + pad, c.w - pad*2, c.h - pad*2);
    ctx.strokeStyle = BLUE(0.25 + glow * 0.35);
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = BLUE(0.04 + glow * 0.06);
    ctx.fill();

    // Grid lines inside die
    for (let gi = 1; gi < 4; gi++) {
      const gx = c.x + pad + (gi / 4) * (c.w - pad*2);
      const gy = c.y + pad + (gi / 4) * (c.h - pad*2);
      ctx.beginPath();
      ctx.moveTo(gx, c.y + pad); ctx.lineTo(gx, c.y + c.h - pad);
      ctx.moveTo(c.x + pad, gy); ctx.lineTo(c.x + c.w - pad, gy);
      ctx.strokeStyle = BLUE(0.1);
      ctx.stroke();
    }
  }

  if (c.type === "ram") {
    // Stripe pattern
    for (let ri = 0; ri < 4; ri++) {
      const rx = c.x + 8 + ri * (c.w - 16) / 4;
      ctx.fillStyle = WHITE(0.08 + glow * 0.04);
      ctx.fillRect(rx, c.y + 6, (c.w - 16) / 4 - 2, c.h - 12);
    }
    // Notch
    ctx.beginPath();
    ctx.arc(c.x + c.w/2, c.y, 5, 0, Math.PI);
    ctx.fillStyle = "rgba(0,0,0,0.9)";
    ctx.fill();
    ctx.strokeStyle = WHITE(0.3);
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Label
  if (c.label) {
    ctx.font = `${c.type === "cpu" ? 9 : 7}px monospace`;
    ctx.fillStyle = WHITE(0.35 + glow * 0.2);
    ctx.textAlign = "center";
    ctx.fillText(c.label, c.x + c.w/2, c.y + c.h/2 + 3);
  }

  // Pins
  c.pins.forEach((p) => {
    const isTop    = p.y < c.y;
    const isBottom = p.y > c.y + c.h;
    const isLeft   = p.x < c.x;
    const isRight  = p.x > c.x + c.w;

    let ex = p.x, ey = p.y;
    if (isTop)    ey = c.y;
    if (isBottom) ey = c.y + c.h;
    if (isLeft)   ex = c.x;
    if (isRight)  ex = c.x + c.w;

    ctx.beginPath();
    ctx.moveTo(ex, ey);
    ctx.lineTo(p.x, p.y);
    ctx.strokeStyle = BLUE(0.45 + glow * 0.2);
    ctx.lineWidth = 1;
    ctx.stroke();

    // Pin pad dot
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = CYAN(0.5 + glow * 0.3);
    ctx.fill();
  });
}

function drawTrace(ctx: CanvasRenderingContext2D, tr: Trace) {
  tr.progress += tr.speed;
  tr.pulse    += tr.pulseSpeed;

  if (tr.progress >= 1.1) return true as unknown as void; // signal rebuild

  const head = Math.min(tr.progress, 1);
  const tail = Math.max(0, head - tr.tailLen);
  const pulseA = 0.65 + 0.35 * Math.sin(tr.pulse);

  // Static trace (already drawn path, dim)
  ctx.beginPath();
  ctx.moveTo(tr.points[0].x, tr.points[0].y);
  tr.points.slice(1).forEach(p => ctx.lineTo(p.x, p.y));
  ctx.strokeStyle = BLUE(0.08);
  ctx.lineWidth = tr.width;
  ctx.setLineDash([]);
  ctx.stroke();

  // Animated lit segment
  const STEPS = 32;
  for (let s = 0; s < STEPS; s++) {
    const t0 = tail + (s / STEPS) * (head - tail);
    const t1 = tail + ((s + 1) / STEPS) * (head - tail);
    const p0 = ptAt(tr.points, t0);
    const p1 = ptAt(tr.points, t1);
    const frac = s / STEPS;
    const a = frac * tr.opacity * pulseA;

    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.strokeStyle = BLUE(a);
    ctx.lineWidth = tr.width + (frac > 0.8 ? 1.5 : 0);
    ctx.stroke();
  }

  // Bright head dot
  const hp = ptAt(tr.points, head);
  const gr = ctx.createRadialGradient(hp.x, hp.y, 0, hp.x, hp.y, 8);
  gr.addColorStop(0, CYAN(tr.opacity * pulseA));
  gr.addColorStop(0.4, BLUE(tr.opacity * pulseA * 0.5));
  gr.addColorStop(1, "rgba(0,0,0,0)");
  ctx.beginPath();
  ctx.arc(hp.x, hp.y, 8, 0, Math.PI * 2);
  ctx.fillStyle = gr;
  ctx.fill();

  // Tiny bright core
  ctx.beginPath();
  ctx.arc(hp.x, hp.y, 1.5, 0, Math.PI * 2);
  ctx.fillStyle = WHITE(0.9 * pulseA);
  ctx.fill();

  return false;
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;

    let chips  = buildChips(W, H);
    let traces: Trace[] = Array.from({ length: 40 }, () => buildTrace(chips, W, H));

    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W; canvas.height = H;
      chips  = buildChips(W, H);
      traces = Array.from({ length: 40 }, () => buildTrace(chips, W, H));
    };
    window.addEventListener("resize", onResize);

    let raf: number;
    let frame = 0;

    const loop = () => {
      frame++;
      ctx.clearRect(0, 0, W, H);

      // Draw chips first (background layer)
      chips.forEach(c => drawChip(ctx, c, frame));

      // Draw traces on top
      traces = traces.map(tr => {
        const done = drawTrace(ctx, tr);
        return done ? buildTrace(chips, W, H) : tr;
      });

      raf = requestAnimationFrame(loop);
    };

    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.75,
      }}
    />
  );
}