"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const CERTS = [
  {
    id: "cert-01",
    title: "Deep Learning Specialization",
    organization: "Coursera / DeepLearning.AI",
    year: "2024",
    image: "/images/certifications/cert-01.jpg",
    credentialId: "CREDENTIAL-ID-01",
    skills: ["Neural Networks", "CNNs", "RNNs", "Transformers", "Sequence Models"],
    description:
      "5-course specialization covering neural network fundamentals, convolutional networks, sequence models, and NLP applications. Built and trained deep neural networks, identified architectures suited to different problems, and implemented recurrent networks including LSTMs.",
  },
  {
    id: "cert-02",
    title: "AWS Solutions Architect",
    organization: "Amazon Web Services",
    year: "2024",
    image: "/images/certifications/cert-02.jpg",
    credentialId: "CREDENTIAL-ID-02",
    skills: ["Cloud Architecture", "EC2", "S3", "Lambda", "IAM", "VPC"],
    description:
      "Associate-level certification covering AWS core services, architecture best practices, high availability patterns, and cloud security principles. Designed distributed systems using AWS infrastructure with emphasis on cost optimization and reliability.",
  },
  {
    id: "cert-03",
    title: "Machine Learning with Python",
    organization: "IBM / Coursera",
    year: "2023",
    image: "/images/certifications/cert-03.jpg",
    credentialId: "CREDENTIAL-ID-03",
    skills: ["Scikit-learn", "Pandas", "NumPy", "ML Algorithms", "Model Evaluation"],
    description:
      "Applied machine learning covering supervised, unsupervised, and recommender systems. Implemented classification, regression, clustering, and recommendation algorithms using Python and Scikit-learn on real-world datasets.",
  },
  {
    id: "cert-04",
    title: "LangChain & LLM Development",
    organization: "DeepLearning.AI",
    year: "2024",
    image: "/images/certifications/cert-04.jpg",
    credentialId: "CREDENTIAL-ID-04",
    skills: ["LangChain", "RAG", "Agents", "Prompt Engineering", "Vector DBs"],
    description:
      "Hands-on course building LLM-powered applications using LangChain, including RAG systems and autonomous agents. Covered prompt engineering, tool use, memory systems, and deployment patterns for production LLM applications.",
  },
];

type Cert = typeof CERTS[number];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function CertificationsSection() {
  const [current,      setCurrent]      = useState(0);
  const [activeCert,   setActiveCert]   = useState<Cert | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isAnimating,  setIsAnimating]  = useState(false);

  const modalRef   = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);

  // ── NAVIGATE ──────────────────────────────────────────────
  const navigate = useCallback((dir: 1 | -1) => {
    if (isAnimating) return;
    setIsAnimating(true);
    const nextIndex = (current + dir + CERTS.length) % CERTS.length;
    if (!cardsRef.current) { setIsAnimating(false); return; }

    gsap.to(cardsRef.current, {
    opacity: 0, x: dir === 1 ? -30 : 30,
    duration: 0.22, ease: "power2.in",
    onComplete: () => {
      setCurrent(nextIndex);
      setActiveCert(CERTS[nextIndex]);
      gsap.fromTo(cardsRef.current,
        { opacity: 0, x: dir === 1 ? 30 : -30 },
        { opacity: 1, x: 0, duration: 0.28, ease: "power2.out",
          onComplete: () => setIsAnimating(false) }
      );
    },
  });
  }, [isAnimating]);

  // ── KEYBOARD ──────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (modalVisible) {
        if (e.key === "Escape") closeModal();
        return;
      }
      if (e.key === "ArrowLeft")  navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, modalVisible]);

  // ── OPEN MODAL ────────────────────────────────────────────
  const openModal = (cert: Cert) => {
    setActiveCert(cert);
    setModalVisible(true);
  };

  useEffect(() => {
    if (modalVisible && modalRef.current && overlayRef.current) {
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(modalRef.current,
        { scale: 0.92, opacity: 0, y: 24 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [modalVisible]);

  // ── CLOSE MODAL ───────────────────────────────────────────
  const closeModal = () => {
    if (!modalRef.current || !overlayRef.current) return;
    gsap.to(modalRef.current,   { scale: 0.95, opacity: 0, y: 16, duration: 0.22, ease: "power2.in" });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.22, ease: "power2.in",
      onComplete: () => { setModalVisible(false); setActiveCert(null); }
    });
  };

  // Visible window: show 3 cards centered on current
  const getVisible = () => {
    const items = [];
    for (let i = -1; i <= 1; i++) {
      const idx = (current + i + CERTS.length) % CERTS.length;
      items.push({ cert: CERTS[idx], offset: i });
    }
    return items;
  };

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      padding: "30px 16px 0px 16px",
      overflow: "hidden",
    }}>

      {/* ── HEADER ──────────────────────────────────────────── */}
      <div style={{ marginBottom: "20px", flexShrink: 0 }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px",
        }}>
          <div style={{ width: "20px", height: "1px", background: "rgba(255, 255, 255, 0.47)" }}/>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "0.6rem",
            letterSpacing: "0.44em", color: "rgba(255, 255, 255, 0.4)",
          }}>
            ACHIEVEMENT ARCHIVE
          </span>
        </div>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        }}>
          <p style={{
            fontFamily: "var(--font-mono)", fontSize: "0.9rem",
            fontWeight: 300, color: "rgba(255, 255, 255, 0.79)",
            lineHeight: 1.6, margin: 0,
          }}>
            Verified credentials and completed specializations.
          </p>
          {/* Counter */}
          <div style={{
            fontFamily: "var(--font-orbitron)", fontSize: "0.5rem",
            letterSpacing: "0.2em", color: "rgba(255,255,255,0.2)",
          }}>
            {String(current + 1).padStart(2, "0")} / {String(CERTS.length).padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* ── CAROUSEL ────────────────────────────────────────── */}
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "30px",
        position: "relative",
        minHeight: 0,
      }}>
        {/* LEFT ARROW */}
        <ArrowButton dir="left" onClick={() => navigate(-1)} disabled={isAnimating} />

        {/* CARDS */}
        <div
          ref={cardsRef}
          style={{
            display: "flex",
            gap: "30px",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          {getVisible().map(({ cert, offset }) => (
            <CertCard
              key={cert.id}
              cert={cert}
              isCenter={offset === 0}
              onClick={() => offset === 0 && openModal(cert)}
            />
          ))}
        </div>

        {/* RIGHT ARROW */}
        <ArrowButton dir="right" onClick={() => navigate(1)} disabled={isAnimating} />
      </div>

      {/* ── DOT INDICATORS ──────────────────────────────────── */}
      <div style={{
        display: "flex", justifyContent: "center", gap: "8px",
        padding: "16px 0 0 0", flexShrink: 0,
      }}>
        {CERTS.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (i === current || isAnimating) return;
              const dir = i > current ? 1 : -1;
              navigate(dir);
            }}
            style={{
              width: i === current ? "24px" : "6px",
              height: "6px",
              borderRadius: "3px",
              background: i === current ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)",
              border: "none", cursor: "pointer", padding: 0,
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* ── KEYBOARD HINT ───────────────────────────────────── */}
      <div style={{ textAlign: "center", paddingTop: "8px", flexShrink: 0 }}>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: "0.3rem",
          letterSpacing: "0.35em", color: "rgba(255,255,255,0.1)",
        }}>
          ← → NAVIGATE · CLICK TO EXPAND · ESC TO CLOSE
        </span>
      </div>

      {/* ── MODAL OVERLAY ───────────────────────────────────── */}
      {modalVisible && activeCert && (
        <div
          ref={overlayRef}
          onClick={(e) => { if (e.target === overlayRef.current) closeModal(); }}
          style={{
            position: "absolute", inset: 0, zIndex: 100,
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "20px",
          }}
        >
          <ArrowButton dir="left" onClick={() => navigate(-1)} disabled={isAnimating} />
          <CertModal
            ref={modalRef}
            cert={activeCert}
            onClose={closeModal}
            onPrev={() => navigate(-1)}
            onNext={() => navigate(1)}
          />
          <ArrowButton dir="right" onClick={() => navigate(1)} disabled={isAnimating} />
        </div>
      )}
    </div>
  );
}

// ─── ARROW BUTTON ─────────────────────────────────────────────────────────────

function ArrowButton({
  dir, onClick, disabled,
}: { dir: "left" | "right"; onClick: () => void; disabled: boolean }) {
  const [hov, setHov] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        gap: "48px",
        width: "44px", height: "44px", flexShrink: 0,
        border: `1px solid ${hov ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.15)"}`,
        background: hov ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.02)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        transition: "all 0.2s ease",
        clipPath: "polygon(4px 0%,100% 0%,100% calc(100% - 4px),calc(100% - 4px) 100%,0% 100%,0% 4px)",
        boxShadow: hov ? "0 0 16px rgba(255,255,255,0.06)" : "none",
      }}
    >
      {dir === "left"
        ? <ChevronLeft size={18} color={hov ? "#fff" : "rgba(255,255,255,0.6)"} />
        : <ChevronRight size={18} color={hov ? "#fff" : "rgba(255,255,255,0.6)"} />
      }
    </button>
  );
}

// ─── CERT CARD ────────────────────────────────────────────────────────────────

function CertCard({
  cert, isCenter, onClick,
}: { cert: Cert; isCenter: boolean; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      scale: isCenter ? 1 : 0.88,
      opacity: isCenter ? 1 : 0.45,
      duration: 0.35, ease: "power2.out",
    });
  }, [isCenter]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => { if (isCenter) setHov(true); }}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        width: "360px",
        flexShrink: 0,
        background: "linear-gradient(160deg, rgba(18,18,18,0.98), rgba(8,8,8,0.99))",
        boxShadow: isCenter
          ? hov
            ? "0 0 0 1px rgba(255,255,255,0.4), 0 20px 40px rgba(0,0,0,0.5)"
            : "0 0 0 1px rgba(255,255,255,0.18), 0 8px 24px rgba(0,0,0,0.4)"
          : "0 0 0 1px rgba(255,255,255,0.06)",
        cursor: isCenter ? "pointer" : "default",
        transition: "box-shadow 0.25s ease",
        position: "relative",
        overflow: "hidden",
        clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
      }}
    >
      {/* Image */}
      <div style={{
        width: "100%",
        aspectRatio: "1/1",
        position: "relative",
        overflow: "hidden",
        background: "rgba(20,20,20,1)",
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cert.image}
          alt={cert.title}
          style={{
            width: "100%", height: "100%",
            objectFit: "cover",
            filter: "grayscale(100%) contrast(1.05) brightness(0.8)",
            transition: "filter 0.4s ease, transform 0.4s ease",
            transform: hov && isCenter ? "scale(1.04)" : "scale(1)",
          }}
          onError={(e) => {
            // Fallback placeholder
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.5))",
        }}/>

        {/* Top org label */}
        <div style={{
          position: "absolute", top: "8px", left: "8px",
          padding: "2px 7px",
          border: "1px solid rgba(255,255,255,0.2)",
          background: "rgba(0,0,0,0.7)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.5rem", letterSpacing: "0.22em",
          color: "rgba(255,255,255,0.7)",
        }}>
          VERIFIED
        </div>

        {/* Hover scan line */}
        {isCenter && hov && (
          <div style={{
            position: "absolute", left: 0, right: 0,
            height: "2px",
            background: "linear-gradient(to right, transparent, rgba(255,255,255,0.5), transparent)",
            animation: "cert-scan 4s linear infinite",
            top: 0,
          }}/>
        )}
      </div>

      {/* Bottom info */}
      <div style={{ padding: "12px 14px" }}>
        <div style={{
          fontFamily: "var(--font-orbitron)",
          fontSize: "1rem", fontWeight: 700,
          letterSpacing: "0.03em",
          color: isCenter ? "rgba(255,255,255,0.94)" : "rgba(255,255,255,0.5)",
          lineHeight: 1.3,
          marginBottom: "6px",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          transition: "color 0.25s ease",
        }}>
          {cert.title}
        </div>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "0.8rem",
            letterSpacing: "0.2em", color: "rgba(255, 255, 255, 0.8)",
          }}>
            {cert.organization}
          </span>
          <span style={{
            fontFamily: "var(--font-orbitron)", fontSize: "0.8rem",
            fontWeight: 900, letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.4)",
          }}>
            {cert.year}
          </span>
        </div>

        {/* Hover indicator */}
        {isCenter && (
          <div style={{
            marginTop: "8px",
            height: "1px",
            background: hov
              ? "linear-gradient(to right, rgba(255,255,255,0.5), transparent)"
              : "rgba(255,255,255,0.08)",
            transition: "background 0.3s ease",
          }}/>
        )}
      </div>

      {/* Corner brackets */}
      <div style={{ position:"absolute", top:2, left:2, zIndex:5, pointerEvents:"none" }}>
        <div style={{ width:8, height:1, background:"rgba(255,255,255,0.4)" }}/>
        <div style={{ width:1, height:8, background:"rgba(255,255,255,0.4)" }}/>
      </div>
      <div style={{ position:"absolute", bottom:2, right:2, zIndex:5, pointerEvents:"none", display:"flex", flexDirection:"column", alignItems:"flex-end", justifyContent:"flex-end" }}>
        <div style={{ width:1, height:8, background:"rgba(255,255,255,0.4)", alignSelf:"flex-end" }}/>
        <div style={{ width:8, height:1, background:"rgba(255,255,255,0.4)" }}/>
      </div>

      <style>{`
        @keyframes cert-scan {
          0%   { top: -2px; opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ─── CERT MODAL ───────────────────────────────────────────────────────────────

import { forwardRef } from "react";

const CertModal = forwardRef<HTMLDivElement, {
  cert: Cert;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}>(({ cert, onClose, onPrev, onNext }, ref) => {

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: "min(1200px, 100%)",
        maxHeight: "100vh",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.2)",
        background: "rgba(6,6,6,0.98)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
        boxShadow: "0 40px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08)",
      }}
    >
      {/* Prev arrow */}
      <div style={{ position:"absolute",left:"-120px", top:"50%", transform:"translateY(-50%)", zIndex:200 }}>
        <ArrowButton dir="left" onClick={onPrev} disabled={false} />
      </div>

      {/* Next arrow */}
      <div style={{ position:"absolute", right:"-120px", top:"50%", transform:"translateY(-50%)", zIndex:200 }}>
        <ArrowButton dir="right" onClick={onNext} disabled={false} />
      </div>
      {/* Ambient grid */}
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none", zIndex:0, opacity:0.02,
        backgroundImage:`linear-gradient(rgba(255,255,255,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.08) 1px,transparent 1px)`,
        backgroundSize:"50px 50px",
      }}/>

      {/* Corner brackets */}
      <div style={{ position:"absolute", top:4, left:4, zIndex:20, pointerEvents:"none" }}>
        <div style={{ width:16, height:1, background:"rgba(255,255,255,0.5)" }}/>
        <div style={{ width:1, height:16, background:"rgba(255,255,255,0.5)" }}/>
      </div>
      <div style={{ position:"absolute", bottom:4, right:4, zIndex:20, pointerEvents:"none", display:"flex", flexDirection:"column", alignItems:"flex-end" }}>
        <div style={{ width:1, height:16, background:"rgba(255,255,255,0.5)", alignSelf:"flex-end" }}/>
        <div style={{ width:16, height:1, background:"rgba(255,255,255,0.5)" }}/>
      </div>

      {/* ── LEFT — Details ──────────────────────────────── */}
      <div style={{
        position:"relative", zIndex:1,
        padding:"28px 24px",
        display:"flex", flexDirection:"column",
        borderRight:"1px solid rgba(255,255,255,0.07)",
        overflowY:"auto", scrollbarWidth:"none",
        maxHeight:"80vh",
      }}>
        {/* System label */}
        <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"16px" }}>
          <div style={{ width:18, height:1, background:"rgba(255, 255, 255, 0.78)" }}/>
          <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.55rem", letterSpacing:"0.36em", color:"rgba(255, 255, 255, 0.79)" }}>
            ACHIEVEMENT RECORD 
          </span>
        </div>

        {/* Org + year badges */}
        <div style={{ display:"flex", gap:"8px", marginBottom:"14px", flexWrap:"wrap" }}>
          <div style={{
            padding:"3px 10px", border:"1px solid rgba(255,255,255,0.15)",
            fontFamily:"var(--font-mono)", fontSize:"0.6rem", letterSpacing:"0.26em",
            color:"rgba(255, 255, 255, 0.82)",
          }}>
            {cert.organization}
          </div>
          <div style={{
            padding:"3px 10px", border:"1px solid rgba(255,255,255,0.08)",
            fontFamily:"var(--font-mono)", fontSize:"0.6rem", letterSpacing:"0.26em",
            color:"rgba(255, 255, 255, 0.83)",
          }}>
            {cert.year}
          </div>
        </div>

        {/* Title */}
        <div style={{
          fontFamily:"var(--font-orbitron)",
          fontSize:"clamp(1.1rem, 2vw, 1.6rem)",
          fontWeight:900, letterSpacing:"0.02em",
          color:"rgba(255,255,255,0.96)",
          lineHeight:1.2, marginBottom:"16px",
        }}>
          {cert.title}
        </div>

        {/* Divider */}
        <div style={{ width:45, height:1, background:"rgba(255,255,255,0.18)", marginBottom:"16px" }}/>

        {/* Description */}
        <p style={{
          fontFamily:"var(--font-grotesk)",
          fontSize:"0.95rem", lineHeight:1.85, fontWeight:300,
          color:"rgba(255, 255, 255, 0.78)", marginBottom:"22px",
        }}>
          {cert.description}
        </p>

        {/* Credential ID */}
        <div style={{
          padding:"10px 14px",
          border:"1px solid rgba(255, 255, 255, 0.68)",
          background:"rgba(255, 255, 255, 0)",
          marginBottom:"22px",
          display:"flex", justifyContent:"space-between", alignItems:"center",
        }}>
          <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.55rem", letterSpacing:"0.3em", color:"rgba(255, 255, 255, 0.73)" }}>
            CREDENTIAL ID
          </span>
          <span style={{ fontFamily:"var(--font-orbitron)", fontSize:"0.6rem", fontWeight:600, letterSpacing:"0.08em", color:"rgba(255, 255, 255, 0.72)" }}>
            {cert.credentialId}
          </span>
        </div>

        {/* Skills */}
        <div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.7rem", letterSpacing:"0.38em", color:"rgba(255, 255, 255, 0.71)", marginBottom:"10px" }}>
            SKILLS VERIFIED
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"10px" }}>
            {cert.skills.map((skill) => (
              <SkillPill key={skill} skill={skill} />
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT — Image ───────────────────────────────── */}
      <div style={{
        position:"relative", zIndex:1,
        padding:"28px 24px 24px 24px",
        display:"flex", flexDirection:"column",
        gap:"12px",
      }}>
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position:"absolute",top:"10px", right:"10px",
            width:"38px", height:"38px",
            border:"1px solid rgba(255,255,255,0.14)",
            background:"rgba(255,255,255,0.02)",
            display:"flex", alignItems:"center", justifyContent:"center",
            cursor:"pointer", zIndex:20,
            clipPath:"polygon(4px 0%,100% 0%,100% calc(100% - 4px),calc(100% - 4px) 100%,0% 100%,0% 4px)",
            transition:"border-color 0.2s, background 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.5)";
            (e.currentTarget as HTMLElement).style.background  = "rgba(255,255,255,0.08)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.14)";
            (e.currentTarget as HTMLElement).style.background  = "rgba(255,255,255,0.02)";
          }}
        >
          <X size={14} color="rgba(255,255,255,0.8)"/>
        </button>

        {/* Certificate image — large */}
        <div style={{
          flex:1,
          position:"relative",
          overflow:"hidden",
          border:"1px solid rgba(255,255,255,0.1)",
          minHeight:"260px",
          background:"rgba(12,12,12,1)",
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cert.image}
            alt={cert.title}
            style={{
              width:"100%", height:"100%",
              objectFit:"contain",
              objectPosition:"center",
              filter:"grayscale(100%) contrast(1.1) brightness(0.85)",
              padding:"16px",
            }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />

          {/* Image overlay */}
          <div style={{
            position:"absolute", inset:0,
            background:"linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.3))",
            pointerEvents:"none",
          }}/>

          {/* Label */}
          <div style={{
            position:"absolute", bottom:"10px", left:"12px",
            fontFamily:"var(--font-mono)", fontSize:"0.28rem",
            letterSpacing:"0.24em", color:"rgba(255,255,255,0.25)",
          }}>
            CERTIFICATE · {cert.title.toUpperCase().slice(0, 20)}
          </div>

          {/* Corner marks */}
          <div style={{ position:"absolute", top:6, left:6, pointerEvents:"none" }}>
            <div style={{ width:12, height:1, background:"rgba(255,255,255,0.45)" }}/>
            <div style={{ width:1, height:12, background:"rgba(255,255,255,0.45)" }}/>
          </div>
          <div style={{ position:"absolute", bottom:6, right:6, pointerEvents:"none", display:"flex", flexDirection:"column", alignItems:"flex-end" }}>
            <div style={{ width:1, height:12, background:"rgba(255,255,255,0.45)", alignSelf:"flex-end" }}/>
            <div style={{ width:12, height:1, background:"rgba(255,255,255,0.45)" }}/>
          </div>
        </div>

        {/* Status row */}
        <div style={{
          display:"flex", justifyContent:"space-between", alignItems:"center",
          padding:"8px 12px",
          border:"1px solid rgba(255,255,255,0.06)",
          background:"rgba(255,255,255,0.015)",
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:"7px" }}>
            <div style={{
              width:6, height:6, borderRadius:"50%",
              background:"rgba(255,255,255,0.8)",
              animation:"blink-block 2s step-end infinite",
            }}/>
            <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.6rem", letterSpacing:"0.28em", color:"rgba(255, 255, 255, 0.73)" }}>
              VERIFIED ACTIVE
            </span>
          </div>
          <span style={{ fontFamily:"var(--font-orbitron)", fontSize:"0.6rem", fontWeight:700, letterSpacing:"0.1em", color:"rgba(255, 255, 255, 0.69)" }}>
            {cert.year}
          </span>
        </div>
      </div>
    </div>
  );
});

CertModal.displayName = "CertModal";

// ─── SKILL PILL ──────────────────────────────────────────────────────────────

function SkillPill({ skill }: { skill: string }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding:"5px 10px",
        border:`1px solid ${hov ? "rgba(255, 255, 255, 0.75)" : "rgba(255,255,255,0.08)"}`,
        background: hov ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
        fontFamily:"var(--font-mono)", fontSize:"0.7rem", letterSpacing:"0.18em",
        color: hov ? "rgba(255,255,255,0.75)" : "rgba(255, 255, 255, 0.89)",
        transition:"all 0.18s ease", cursor:"default",
        clipPath:"polygon(3px 0%,100% 0%,100% calc(100% - 3px),calc(100% - 3px) 100%,0% 100%,0% 3px)",
      }}
    >
      {skill}
    </div>
  );
}