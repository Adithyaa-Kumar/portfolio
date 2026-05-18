"use client";

import { motion } from "framer-motion";
import { SKILL_GROUPS } from "@/data";
import { useState } from "react";

export default function SkillsSection() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100%",
        overflow: "hidden",
        padding: "20px 10px 120px 10px",
      }}
    >
      {/* Ambient Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.022,
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.19) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px",
          pointerEvents: "none",
        }}
      />

      {/* Ambient Glow */}
      <div
        style={{
          position: "absolute",
          top: "0%",
          left: "35%",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.04), transparent 70%)",
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
        viewport={{ once: true }}
        style={{
          marginBottom: "70px",
          paddingLeft: "12px",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.42em",
            color: "rgba(255, 255, 255, 0.46)",
            marginBottom: "14px",
          }}
        >
          CAPABILITY ARCHIVE
        </div>

        <div
          style={{
            fontFamily: "var(--font-orbitron)",
            fontSize: "clamp(0.92rem, 1.2vw, 1.08rem)",
            letterSpacing: "0.04em",
            color: "rgba(255, 255, 255, 0.99)",
            lineHeight: 1.8,
            maxWidth: "1000px",
          }}
        >
          Skills and technologies developed through projects,
          research, and hands-on engineering experience.
        </div>
      </motion.div>

      {/* Film Reel Section */}
      <div
        style={{
          position: "relative",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
      >
        {SKILL_GROUPS.map((group, groupIndex) => (
          <SkillReel
            key={group.title}
            group={group}
            index={groupIndex}
          />
        ))}
      </div>

      {/* Floating particles */}
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -20, 0],
            opacity: [0.08, 0.35, 0.08],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            width: "2px",
            height: "2px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.69)",
            top: `${10 + i * 5}%`,
            left: `${5 + ((i * 11) % 90)}%`,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Master Styles */}
      <style jsx>{`
        .skill-track {
          transition: transform 0.45s ease;
          will-change: transform;
        }

        .skill-reel:hover .skill-track {
          transform: translateX(-12px);
        }
        .skill-tile {
  transition:
    transform 0.22s ease,
    border-color 0.22s ease,
    background 0.22s ease,
    box-shadow 0.22s ease;
  backface-visibility: hidden;
  will-change: transform;
}

.skill-tile:hover {
  transform: translateY(-6px);
  border-color: rgba(255,255,255,0.3);
  background: rgba(255,255,255,0.05) !important;
  box-shadow: 0 0 28px rgba(255,255,255,0.06);
}

.skill-tile:hover .skill-glow {
  opacity: 1 !important;
}

.skill-tile:hover .skill-indicator {
  transform: scaleX(1) !important;
}

      `}</style>
    </div>
  );
}

function SkillReel({
  group,
  index,
}: {
  group: any;
  index: number;
}) {
  return (
    <motion.div
      className="skill-reel"
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.75,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true }}
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Reel Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
          marginBottom: "14px",
          paddingLeft: "10px",
        }}
      >
        {/* Reel marker */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.2 + index * 0.1,
          }}
          viewport={{ once: true }}
          style={{
            width: "30px",
            height: "1px",
            background: "rgba(255,255,255,0.3)",
            transformOrigin: "left",
          }}
        />

        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.42em",
            color: "rgba(255, 255, 255, 0.81)",
          }}
        >
          {group.title}
        </div>
      </div>

      {/* Horizontal Track */}
      <div
        className="skill-track"
        style={{
          position: "relative",
          display: "flex",
          gap: "18px",
          padding: "10px 0 18px 10px",
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        {/* Timeline line */}
<motion.div
  initial={{ scaleX: 0 }}
  whileInView={{ scaleX: 1 }}
  transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
  viewport={{ once: true }}
  style={{
    position: "absolute",
    left: 0, right: 0, top: "32px",
    height: "1px",
    transformOrigin: "left",
    background: "linear-gradient(to right, rgba(255,255,255,0.15), rgba(255,255,255,0.03))",
  }}
/>

        {group.skills.map((skill: string, skillIndex: number) => (
          <SkillTile
            key={skill}
            skill={skill}
            delay={skillIndex * 0.06}
            level={group.levels?.[skillIndex] ?? "BEGINNER"}
          />
        ))}
      </div>
    </motion.div>
  );
}

function SkillTile({ skill, delay, level }: {
  skill: string;
  delay: number;
  level: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay }}
      viewport={{ once: true }}
      style={{ position: "relative", flexShrink: 0 }}
    >
      {/* Connector Line */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        transition={{ duration: 0.4, delay: delay + 0.1 }}
        viewport={{ once: true }}
        style={{
          position: "absolute",
          top: "22px",
          left: "50%",
          width: "1px",
          height: "16px",
          background: hovered ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.15)",
          transform: "translateX(-50%)",
          transformOrigin: "top",
          zIndex: 10,
          transition: "background 0.22s ease",
        }}
      />

      {/* Tile */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          width: "220px",
          height: "90px",
          marginTop: "38px",
          padding: "18px",
          overflow: "hidden",
          border: `1px solid ${hovered ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.08)"}`,
          background: hovered ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
          transform: hovered ? "translateY(-6px)" : "translateY(0px)",
          boxShadow: hovered ? "0 0 28px rgba(255,255,255,0.06)" : "none",
          transition: "transform 0.22s ease, border-color 0.22s ease, background 0.22s ease, box-shadow 0.22s ease",
        }}
      >
        {/* Glow */}
        <div style={{
          position: "absolute",
          top: "-30px", right: "-30px",
          width: "90px", height: "90px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.08), transparent)",
          opacity: hovered ? 1 : 0.4,
          transition: "opacity 0.25s ease",
          pointerEvents: "none",
        }} />

        {/* Indicator */}
        <div style={{
          position: "absolute",
          left: 0, bottom: 0,
          width: "100%", height: "1px",
          transformOrigin: "left",
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          background: "linear-gradient(to right, rgba(255,255,255,0.9), transparent)",
          transition: "transform 0.25s ease",
        }} />

        {/* Skill Name */}
        <div style={{
          fontFamily: "var(--font-orbitron)",
          fontSize: "1rem", fontWeight: 700,
          letterSpacing: "0.04em",
          color: "rgba(255,255,255,0.92)",
          lineHeight: 1.6, marginBottom: "10px",
        }}>
          {skill}
        </div>

        {/* Bottom Meta */}
        <div style={{
          position: "absolute", bottom: "10px",
          left: "18px", right: "18px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "0.6rem",
            letterSpacing: "0.28em",
            color: hovered ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.4)",
            transition: "color 0.22s ease",
          }}>
            {level}
          </div>
          <div style={{ width: "28px", height: "1px", background: "rgba(255,255,255,0.18)" }} />
        </div>
      </div>
    </motion.div>
  );
}