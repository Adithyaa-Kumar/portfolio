"use client";

import { useState, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { Mail, MapPin, Phone, Send, X, Paperclip } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
// ─── TYPES ────────────────────────────────────────────────────────────────────

type SendStatus = "idle" | "sending" | "success" | "error";

// ─── CONTACT DATA ─────────────────────────────────────────────────────────────

const CONTACT_DETAILS = [
  {
    icon: "mail",
    label: "EMAIL",
    value: "adithyaakumarrr@gmail.com",
    href: "mailto:adithyaakumarrr@gmail.com",
  },
  {
    icon: "location",
    label: "LOCATION",
    value: "Chennai, India",
    href: null,
  },
  {
    icon: "github",
    label: "GITHUB",
    value: "github.com/adithyaak",
    href: "https://github.com/adithyaak",
  },
  {
    icon: "linkedin",
    label: "LINKEDIN",
    value: "linkedin.com/in/adithyaak",
    href: "https://linkedin.com/in/adithyaak",
  },
];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function ContactSection() {
  const [email,   setEmail]   = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status,  setStatus]  = useState<SendStatus>("idle");
  const [fileName, setFileName] = useState<string | null>(null);

  const formRef    = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const fileRef    = useRef<HTMLInputElement>(null);

  // ── CLEAR ──────────────────────────────────────────────────
  const handleClear = () => {
    setEmail("");
    setSubject("");
    setMessage("");
    setFileName(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  // ── SUBMIT ─────────────────────────────────────────────────
  const handleSubmit = useCallback(async () => {
    if (!email || !message || status === "sending") return;

    setStatus("sending");

    // Blur form — sending animation
    if (formRef.current) {
      gsap.to(formRef.current, {
        filter: "blur(4px)", opacity: 0.4,
        duration: 0.4, ease: "power2.out",
      });
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, subject, message }),
      });

      if (!res.ok) throw new Error("Failed");

      // Success state
      setStatus("success");

      // Show success overlay
      if (successRef.current) {
        gsap.fromTo(successRef.current,
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)" }
        );
      }

      // Reset form after delay
      setTimeout(() => {
        setStatus("idle");
        setEmail("");
        setSubject("");
        setMessage("");
        setFileName(null);
        if (fileRef.current) fileRef.current.value = "";
        if (formRef.current) {
          gsap.to(formRef.current, {
            filter: "blur(0px)", opacity: 1,
            duration: 0.5, ease: "power2.out",
          });
        }
        if (successRef.current) {
          gsap.to(successRef.current, { opacity: 0, scale: 0.9, duration: 0.3 });
        }
      }, 3000);

    } catch {
      setStatus("error");
      if (formRef.current) {
        gsap.to(formRef.current, {
          filter: "blur(0px)", opacity: 1,
          duration: 0.4,
        });
      }
      setTimeout(() => setStatus("idle"), 3000);
    }
  }, [email, subject, message, status]);

  const isValid = email.trim() !== "" && message.trim() !== "";

  return (
    <div style={{
      width: "100%",
      height: "100%",
      display: "grid",
      gridTemplateColumns: "1fr 1.4fr",
      gap: "0",
      overflow: "hidden",
    }}>

      {/* ── LEFT — Contact details ──────────────────────────── */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "28px 32px 28px 16px",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        gap: "28px",
      }}>
        {/* Header */}
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"8px" }}>
            <div style={{ width:20, height:1, background:"rgba(255,255,255,0.2)" }}/>
            <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.38rem", letterSpacing:"0.44em", color:"rgba(255,255,255,0.2)" }}>
              06 // CONTACT
            </span>
          </div>
          <div style={{
            fontFamily:"var(--font-bebas)",
            fontSize:"clamp(2.5rem, 5vw, 4rem)",
            letterSpacing:"0.04em",
            color:"rgba(255,255,255,0.92)",
            lineHeight:0.9,
            marginBottom:"12px",
          }}>
            LET'S BUILD<br/>TOGETHER
          </div>
          <p style={{
            fontFamily:"var(--font-grotesk)",
            fontSize:"0.78rem", fontWeight:300,
            color:"rgba(255,255,255,0.42)",
            lineHeight:1.7, margin:0, maxWidth:"280px",
          }}>
            Open to collaborations, roles, and interesting problems.
            Transmit your signal below.
          </p>
        </div>

        {/* Contact rows */}
        <div style={{ display:"flex", flexDirection:"column", gap:"4px" }}>
          {CONTACT_DETAILS.map((item) => (
            <ContactRow key={item.label} item={item} />
          ))}
        </div>

        {/* System status */}
        <div style={{
          padding:"12px 16px",
          border:"1px solid rgba(255,255,255,0.07)",
          background:"rgba(255,255,255,0.015)",
          display:"flex", justifyContent:"space-between", alignItems:"center",
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
            <div style={{
              width:6, height:6, borderRadius:"50%",
              background:"rgba(255,255,255,0.85)",
              animation:"blink-block 2s step-end infinite",
            }}/>
            <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.3rem", letterSpacing:"0.3em", color:"rgba(255,255,255,0.35)" }}>
              TRANSMISSION READY
            </span>
          </div>
          <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.28rem", letterSpacing:"0.22em", color:"rgba(255,255,255,0.2)" }}>
            AK/OS v3.1.4
          </span>
        </div>
      </div>

      {/* ── RIGHT — Form ────────────────────────────────────── */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        padding: "28px 16px 20px 32px",
        gap: "12px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Form header */}
        <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"4px" }}>
          <div style={{ width:20, height:1, background:"rgba(255,255,255,0.15)" }}/>
          <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.36rem", letterSpacing:"0.4em", color:"rgba(255,255,255,0.18)" }}>
            TRANSMISSION CONSOLE
          </span>
        </div>

        {/* Form body */}
        <div ref={formRef} style={{
          flex:1,
          display:"flex",
          flexDirection:"column",
          gap:"10px",
          position:"relative",
        }}>
          {/* Email */}
          <FormField
            label="YOUR EMAIL"
            placeholder="signal@origin.com"
            value={email}
            onChange={setEmail}
            type="email"
          />

          {/* Subject */}
          <FormField
            label="SUBJECT"
            placeholder="Transmission subject line"
            value={subject}
            onChange={setSubject}
          />

          {/* Message */}
          <div style={{ flex:1, display:"flex", flexDirection:"column", gap:"5px" }}>
            <label style={{
              fontFamily:"var(--font-mono)", fontSize:"0.33rem",
              letterSpacing:"0.38em", color:"rgba(255,255,255,0.22)",
            }}>
              MESSAGE
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Compose your transmission..."
              rows={5}
              style={{
                flex:1,
                background:"rgba(255,255,255,0.02)",
                border:"1px solid rgba(255,255,255,0.1)",
                color:"rgba(255,255,255,0.85)",
                fontFamily:"var(--font-grotesk)",
                fontSize:"0.78rem",
                fontWeight:300,
                lineHeight:1.7,
                padding:"12px 14px",
                resize:"none",
                outline:"none",
                transition:"border-color 0.2s ease, box-shadow 0.2s ease",
                minHeight:"100px",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                e.currentTarget.style.boxShadow = "0 0 0 1px rgba(255,255,255,0.06)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Attach */}
          <div>
            <input
              ref={fileRef}
              type="file"
              id="file-attach"
              style={{ display:"none" }}
              onChange={(e) => {
                const f = e.target.files?.[0];
                setFileName(f ? f.name : null);
              }}
            />
            <label
              htmlFor="file-attach"
              style={{
                display:"inline-flex",
                alignItems:"center",
                gap:"7px",
                padding:"6px 12px",
                border:"1px solid rgba(255,255,255,0.08)",
                background:"rgba(255,255,255,0.02)",
                fontFamily:"var(--font-mono)",
                fontSize:"0.32rem",
                letterSpacing:"0.28em",
                color: fileName ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.25)",
                cursor:"pointer",
                transition:"all 0.2s ease",
                clipPath:"polygon(3px 0%,100% 0%,100% calc(100% - 3px),calc(100% - 3px) 100%,0% 100%,0% 3px)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.25)";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)";
              }}
            >
              <Paperclip size={11} color="rgba(255,255,255,0.4)"/>
              {fileName ? fileName.slice(0, 28) + (fileName.length > 28 ? "..." : "") : "ATTACH FILE"}
              {fileName && (
                <span
                  onClick={(e) => {
                    e.preventDefault();
                    setFileName(null);
                    if (fileRef.current) fileRef.current.value = "";
                  }}
                  style={{ marginLeft:"4px", color:"rgba(255,255,255,0.4)" }}
                >
                  ×
                </span>
              )}
            </label>
          </div>

          {/* Error message */}
          {status === "error" && (
            <div style={{
              padding:"8px 12px",
              border:"1px solid rgba(255,80,80,0.3)",
              background:"rgba(255,60,60,0.05)",
              fontFamily:"var(--font-mono)",
              fontSize:"0.32rem",
              letterSpacing:"0.22em",
              color:"rgba(255,120,120,0.8)",
            }}>
              TRANSMISSION FAILED — CHECK CONNECTION AND RETRY
            </div>
          )}

          {/* Success overlay — inside form */}
          {status === "success" && (
            <div
              ref={successRef}
              style={{
                position:"absolute", inset:0, zIndex:10,
                background:"rgba(0,0,0,0.88)",
                backdropFilter:"blur(8px)",
                WebkitBackdropFilter:"blur(8px)",
                display:"flex", flexDirection:"column",
                alignItems:"center", justifyContent:"center",
                gap:"16px",
                border:"1px solid rgba(255,255,255,0.1)",
              }}
            >
              {/* Tick circle */}
              <div style={{
                width:"56px", height:"56px",
                border:"1px solid rgba(255,255,255,0.35)",
                borderRadius:"50%",
                display:"flex", alignItems:"center", justifyContent:"center",
                background:"rgba(255,255,255,0.04)",
                boxShadow:"0 0 30px rgba(255,255,255,0.08)",
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12l5 5L19 7"
                    stroke="rgba(255,255,255,0.9)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="28"
                    strokeDashoffset="0"
                    style={{ animation:"draw-check 0.5s ease forwards" }}
                  />
                </svg>
              </div>
              <div style={{
                fontFamily:"var(--font-orbitron)",
                fontSize:"0.65rem", fontWeight:700,
                letterSpacing:"0.2em",
                color:"rgba(255,255,255,0.9)",
              }}>
                TRANSMISSION COMPLETE
              </div>
              <div style={{
                fontFamily:"var(--font-mono)",
                fontSize:"0.35rem", letterSpacing:"0.3em",
                color:"rgba(255,255,255,0.35)",
              }}>
                MESSAGE SENT — SIGNAL DELIVERED
              </div>
            </div>
          )}
        </div>

        {/* ── BUTTONS — outside form ────────────────────── */}
        <div style={{
          display:"flex",
          gap:"10px",
          paddingTop:"8px",
          borderTop:"1px solid rgba(255,255,255,0.06)",
          flexShrink:0,
        }}>
          {/* CLEAR */}
          <ClearButton onClick={handleClear} disabled={status === "sending" || status === "success"} />

          {/* SUBMIT */}
          <SubmitButton
            onClick={handleSubmit}
            disabled={!isValid || status === "sending" || status === "success"}
            status={status}
          />
        </div>

        <style>{`
          @keyframes draw-check {
            from { stroke-dashoffset: 28; }
            to   { stroke-dashoffset: 0; }
          }
        `}</style>
      </div>
    </div>
  );
}

// ─── CONTACT ROW ─────────────────────────────────────────────────────────────

function ContactRow({ item }: {
  item: { icon: string; label: string; value: string; href: string | null }
}) {
  const [hov, setHov] = useState(false);

  const iconEl = () => {
    const color = hov ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)";
    const size = 14;
    switch (item.icon) {
      case "mail":     return <Mail size={size} color={color}/>;
      case "location": return <MapPin size={size} color={color}/>;
      case "github":   return <FaGithub size={size} color={color}/>;
      case "linkedin": return <FaLinkedin size={size} color={color}/>;
      case "phone":    return <Phone size={size} color={color}/>;
      default:         return <Mail size={size} color={color}/>;
    }
  };

  const content = (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:"flex", alignItems:"center", gap:"14px",
        padding:"12px 14px",
        border:`1px solid ${hov ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.06)"}`,
        background: hov ? "rgba(255,255,255,0.04)" : "transparent",
        transition:"all 0.22s ease",
        cursor: item.href ? "pointer" : "default",
        position:"relative", overflow:"hidden",
      }}
    >
      {/* Sweep on hover */}
      {hov && (
        <div style={{
          position:"absolute", inset:0,
          background:"linear-gradient(90deg, rgba(255,255,255,0.03) 0%, transparent 60%)",
          pointerEvents:"none",
        }}/>
      )}

      {/* Icon box */}
      <div style={{
        width:"32px", height:"32px",
        border:`1px solid ${hov ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)"}`,
        background: hov ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)",
        display:"flex", alignItems:"center", justifyContent:"center",
        flexShrink:0,
        clipPath:"polygon(3px 0%,100% 0%,100% calc(100% - 3px),calc(100% - 3px) 100%,0% 100%,0% 3px)",
        transition:"all 0.22s ease",
      }}>
        {iconEl()}
      </div>

      {/* Text */}
      <div>
        <div style={{
          fontFamily:"var(--font-mono)", fontSize:"0.3rem",
          letterSpacing:"0.38em", color:"rgba(255,255,255,0.2)",
          marginBottom:"3px",
        }}>
          {item.label}
        </div>
        <div style={{
          fontFamily:"var(--font-orbitron)", fontSize:"0.52rem",
          fontWeight:600, letterSpacing:"0.06em",
          color: hov ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.65)",
          transition:"color 0.22s ease",
        }}>
          {item.value}
        </div>
      </div>

      {/* Arrow on hover */}
      {item.href && hov && (
        <div style={{
          marginLeft:"auto",
          fontFamily:"var(--font-mono)", fontSize:"0.5rem",
          color:"rgba(255,255,255,0.3)",
        }}>
          →
        </div>
      )}

      {/* Bottom line on hover */}
      <div style={{
        position:"absolute", bottom:0, left:0,
        height:"1px",
        width: hov ? "100%" : "0%",
        background:"rgba(255,255,255,0.2)",
        transition:"width 0.3s ease",
      }}/>
    </div>
  );

  if (item.href) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none", display:"block" }}>
        {content}
      </a>
    );
  }
  return content;
}

// ─── FORM FIELD ──────────────────────────────────────────────────────────────

function FormField({
  label, placeholder, value, onChange, type = "text",
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"5px" }}>
      <label style={{
        fontFamily:"var(--font-mono)", fontSize:"0.33rem",
        letterSpacing:"0.38em", color:"rgba(255,255,255,0.22)",
      }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          background:"rgba(255,255,255,0.02)",
          border:"1px solid rgba(255,255,255,0.1)",
          color:"rgba(255,255,255,0.85)",
          fontFamily:"var(--font-grotesk)",
          fontSize:"0.78rem",
          fontWeight:300,
          padding:"10px 14px",
          outline:"none",
          transition:"border-color 0.2s ease, box-shadow 0.2s ease",
          width:"100%",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
          e.currentTarget.style.boxShadow = "0 0 0 1px rgba(255,255,255,0.06)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
          e.currentTarget.style.boxShadow = "none";
        }}
      />
    </div>
  );
}

// ─── CLEAR BUTTON ────────────────────────────────────────────────────────────

function ClearButton({ onClick, disabled }: { onClick: () => void; disabled: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding:"11px 24px",
        border:`1px solid ${hov ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.12)"}`,
        background: hov ? "rgba(255,255,255,0.05)" : "transparent",
        fontFamily:"var(--font-orbitron)",
        fontSize:"0.52rem", fontWeight:700,
        letterSpacing:"0.3em",
        color: hov ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        transition:"all 0.22s ease",
        display:"flex", alignItems:"center", gap:"8px",
        clipPath:"polygon(4px 0%,100% 0%,100% calc(100% - 4px),calc(100% - 4px) 100%,0% 100%,0% 4px)",
      }}
    >
      <X size={12} color={hov ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)"}/>
      CLEAR
    </button>
  );
}

// ─── SUBMIT BUTTON ────────────────────────────────────────────────────────────

function SubmitButton({
  onClick, disabled, status,
}: { onClick: () => void; disabled: boolean; status: SendStatus }) {
  const [hov, setHov] = useState(false);

  const label = status === "sending" ? "TRANSMITTING..." : "TRANSMIT";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex:1,
        padding:"11px 24px",
        border:`1px solid ${disabled ? "rgba(255,255,255,0.08)" : hov ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.25)"}`,
        background: disabled
          ? "rgba(255,255,255,0.02)"
          : hov
          ? "rgba(255,255,255,0.1)"
          : "rgba(255,255,255,0.04)",
        fontFamily:"var(--font-orbitron)",
        fontSize:"0.52rem", fontWeight:700,
        letterSpacing:"0.3em",
        color: disabled ? "rgba(255,255,255,0.2)" : hov ? "#fff" : "rgba(255,255,255,0.8)",
        cursor: disabled ? "not-allowed" : "pointer",
        transition:"all 0.22s ease",
        display:"flex", alignItems:"center", justifyContent:"center", gap:"10px",
        clipPath:"polygon(4px 0%,100% 0%,100% calc(100% - 4px),calc(100% - 4px) 100%,0% 100%,0% 4px)",
        boxShadow: hov && !disabled ? "0 0 24px rgba(255,255,255,0.06)" : "none",
        position:"relative", overflow:"hidden",
      }}
    >
      {/* Sweep shimmer on hover */}
      {hov && !disabled && (
        <div style={{
          position:"absolute", top:0, left:"-100%", width:"60%", height:"100%",
          background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)",
          transform:"skewX(-20deg)",
          animation:"btn-sweep 0.6s ease forwards",
          pointerEvents:"none",
        }}/>
      )}

      {status === "sending" ? (
        <>
          <div style={{
            width:"12px", height:"12px", borderRadius:"50%",
            border:"1px solid rgba(255,255,255,0.5)",
            borderTopColor:"transparent",
            animation:"spin 0.7s linear infinite",
          }}/>
          {label}
        </>
      ) : (
        <>
          <Send size={13} color={disabled ? "rgba(255,255,255,0.2)" : hov ? "#fff" : "rgba(255,255,255,0.7)"}/>
          {label}
        </>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes btn-sweep { from { left: -100%; } to { left: 110%; } }
      `}</style>
    </button>
  );
}