"use client";

import { motion } from "framer-motion";

const SKILL_GROUPS = [
  {
    title: "AI / ML",
    skills: [
      "PyTorch",
      "TensorFlow",
      "Scikit-Learn",
      "OpenCV",
      "LangChain",
      "Transformers",
    ],
  },

  {
    title: "Frontend",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "TailwindCSS",
      "Framer Motion",
      "GSAP",
    ],
  },

  {
    title: "Backend",
    skills: [
      "Python",
      "FastAPI",
      "Node.js",
      "Express",
      "REST APIs",
      "MongoDB",
    ],
  },

  {
    title: "Tools",
    skills: [
      "Git",
      "Docker",
      "AWS",
      "Linux",
      "Figma",
      "Premiere Pro",
    ],
  },
];

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
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
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
            fontSize: "0.42rem",
            letterSpacing: "0.42em",
            color: "rgba(255,255,255,0.22)",
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
            color: "rgba(255,255,255,0.72)",
            lineHeight: 1.8,
            maxWidth: "1000px",
          }}
        >
          A cinematic inventory of technologies, frameworks,
          AI systems, engineering tools, and production infrastructure.
        </div>
      </motion.div>

      {/* Film Reel Section */}
      <div
        style={{
          position: "relative",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
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
            background: "rgba(255,255,255,0.35)",
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
          border-color: rgba(255,255,255,0.22);
          background: rgba(255,255,255,0.05);
          box-shadow: 0 0 28px rgba(255,255,255,0.04);
        }

        .skill-tile:hover .skill-glow {
          opacity: 1;
        }

        .skill-tile:hover .skill-indicator {
          transform: scaleX(1);
        }

        .skill-tile:hover .skill-dot {
          transform: scale(1.4);
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
          marginBottom: "24px",
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
            width: "40px",
            height: "1px",
            background: "rgba(255,255,255,0.3)",
            transformOrigin: "left",
          }}
        />

        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.5rem",
            letterSpacing: "0.42em",
            color: "rgba(255,255,255,0.3)",
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
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "32px",
            height: "1px",
            background:
              "linear-gradient(to right, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
          }}
        />

        {group.skills.map((skill: string, skillIndex: number) => (
          <SkillTile
            key={skill}
            skill={skill}
            delay={skillIndex * 0.06}
          />
        ))}
      </div>
    </motion.div>
  );
}

function SkillTile({
  skill,
  delay,
}: {
  skill: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 24,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.55,
        delay,
      }}
      viewport={{ once: true }}
      style={{
        position: "relative",
        flexShrink: 0,
      }}
    >
      {/* Timeline Node */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{
          duration: 0.35,
          delay: delay + 0.15,
        }}
        viewport={{ once: true }}
        className="skill-dot"
        style={{
          position: "absolute",
          top: "25px",
          left: "50%",
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.88)",
          transform: "translateX(-50%)",
          boxShadow: "0 0 14px rgba(255,255,255,0.22)",
          zIndex: 10,
          transition: "transform 0.22s ease",
        }}
      />

      {/* Tile */}
      <div
        className="skill-tile"
        style={{
          position: "relative",
          width: "220px",
          height: "130px",
          marginTop: "48px",
          padding: "18px",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        {/* Glow */}
        <div
          className="skill-glow"
          style={{
            position: "absolute",
            top: "-30px",
            right: "-30px",
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.08), transparent)",
            opacity: 0.4,
            transition: "opacity 0.25s ease",
            pointerEvents: "none",
          }}
        />

        {/* Indicator */}
        <div
          className="skill-indicator"
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            height: "1px",
            transform: "scaleX(0)",
            transformOrigin: "left",
            background:
              "linear-gradient(to right, rgba(255,255,255,0.9), transparent)",
            transition: "transform 0.25s ease",
          }}
        />

        {/* Tiny Label */}
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.38rem",
            letterSpacing: "0.35em",
            color: "rgba(255,255,255,0.25)",
            marginBottom: "22px",
          }}
        >
          SYSTEM MODULE
        </div>

        {/* Skill Name */}
        <div
          style={{
            fontFamily: "var(--font-orbitron)",
            fontSize: "1rem",
            fontWeight: 700,
            letterSpacing: "0.04em",
            color: "rgba(255,255,255,0.92)",
            lineHeight: 1.6,
            marginBottom: "16px",
          }}
        >
          {skill}
        </div>

        {/* Bottom Meta */}
        <div
          style={{
            position: "absolute",
            bottom: "18px",
            left: "18px",
            right: "18px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.4rem",
              letterSpacing: "0.28em",
              color: "rgba(255,255,255,0.22)",
            }}
          >
            ACTIVE
          </div>

          <div
            style={{
              width: "28px",
              height: "1px",
              background: "rgba(255,255,255,0.18)",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}