"use client";

import { motion } from "framer-motion";

const EDUCATION_DATA = [
  {
    title: "Secondary Education",
    institute: "Narayana Institute of Technology, Chennai",
    duration: "2020 - 2022",
    grade: "91.6%",
    status: "ARCHIVED",
  },
  {
    title: "Higher Secondary",
    institute: "Narayana Institute of Technology, Chennai",
    duration: "2022 - 2024",
    grade: "85%",
    status: "COMPLETED",
  },
  {
    title: "Undergraduate - B.Tech CSE (AI & ML)",
    institute: "Vellore Institute of Technology, Chennai",
    duration: "2024 - 2028",
    grade: "9.03 CGPA",
    status: "ACTIVE NODE",
  },
];

export default function EducationSection() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100%",
        overflow: "hidden",
        padding: "20px 10px 100px 10px",
      }}
    >
      {/* Background Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.025,
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
          top: "10%",
          left: "35%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.04), transparent 70%)",
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />

      {/* Intro */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{
          marginBottom: "50px",
          paddingLeft: "20px",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.5rem",
            letterSpacing: "0.42em",
            color: "rgba(255, 255, 255, 0.35)",
            marginBottom: "12px",
          }}
        >
          KNOWLEDGE NETWORK
        </div>

        <div
          style={{
            fontFamily: "var(--font-orbitron)",
            fontSize: "clamp(0.92rem, 1.2vw, 1.1rem)",
            letterSpacing: "0.04em",
            color: "rgba(255,255,255,0.72)",
            lineHeight: 1.8,
            maxWidth: "1000px",
          }}
        >
          Building a strong foundation in computer science, engineering,
and AI through academic learning and hands-on development.
        </div>
      </motion.div>

      {/* Timeline Section */}
      <div
        style={{
          position: "relative",
          width: "100%",
          padding: "40px 20px 0 20px",
        }}
      >
        {/* Timeline line reveal */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true }}
          style={{
            position: "absolute",
            top: "26px",
            left: "40px",
            right: "40px",
            height: "1px",
            transformOrigin: "left",
            background:
              "linear-gradient(to right, rgba(255,255,255,0.22), rgba(255,255,255,0.05))",
          }}
        />

        {/* Animated energy pulse */}
        <motion.div
          initial={{ left: "40px", opacity: 0 }}
          whileInView={{
            left: "calc(100% - 160px)",
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: 0.5,
            ease: "easeInOut",
          }}
          viewport={{ once: true }}
          style={{
            position: "absolute",
            top: "25px",
            width: "120px",
            height: "3px",
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.85), transparent)",
            filter: "blur(2px)",
          }}
        />

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "28px",
            position: "relative",
            zIndex: 10,
          }}
        >
          {EDUCATION_DATA.map((item, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.65,
                delay: 0.8 + index * 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
              style={{
                transform: "translateZ(0)",
              }}
            >
              <div className="edu-card">
                {/* Top Node */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{
                    delay: 0.95 + index * 0.18,
                    duration: 0.4,
                  }}
                  viewport={{ once: true }}
                  style={{
                    position: "absolute",
                    top: "-7px",
                    left: "50%",
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    transform: "translateX(-50%)",
                    background: "rgba(255,255,255,0.9)",
                    boxShadow: "0 0 16px rgba(255,255,255,0.3)",
                  }}
                />

                {/* Ambient corner glow */}
                <div
                  className="edu-glow"
                  style={{
                    position: "absolute",
                    top: "-30px",
                    right: "-30px",
                    width: "90px",
                    height: "90px",
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.08), transparent)",
                    opacity: 0.45,
                    pointerEvents: "none",
                  }}
                />

                {/* Status */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{
                    delay: 1 + index * 0.18,
                  }}
                  viewport={{ once: true }}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.35em",
                    color: "rgba(255,255,255,0.28)",
                    marginBottom: "24px",
                  }}
                >
                  {item.status}
                </motion.div>

                {/* Institute */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{
                    delay: 1.12 + index * 0.18,
                  }}
                  viewport={{ once: true }}
                  style={{
                    fontFamily: "var(--font-orbitron)",
                    fontSize: "1.02rem",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    color: "rgba(255,255,255,0.95)",
                    marginBottom: "18px",
                    lineHeight: 1.5,
                  }}
                >
                  {item.institute}
                </motion.div>
                {/* Title */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 1.05 + index * 0.18,
                  }}
                  viewport={{ once: true }}
                  style={{
                    fontFamily: "var(--font-grotesk)",
                    fontSize: "0.9rem",
                    color: "rgba(255,255,255,0.58)",
                    lineHeight: 1.8,
                    marginBottom: "34px",
                  }}
                >
                  {item.title}
                </motion.div>

                {/* Bottom */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{
                    delay: 1.18 + index * 0.18,
                  }}
                  viewport={{ once: true }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                    marginTop: "auto",
                  }}
                >
                  {/* Duration */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderTop: "1px solid rgba(255,255,255,0.06)",
                      paddingTop: "14px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.64rem",
                        letterSpacing: "0.28em",
                        color: "rgba(255, 255, 255, 0.46)",
                      }}
                    >
                      DURATION
                    </span>

                    <span
                      style={{
                        fontFamily: "var(--font-orbitron)",
                        fontSize: "0.72rem",
                        letterSpacing: "0.04em",
                        color: "rgba(255,255,255,0.82)",
                      }}
                    >
                      {item.duration}
                    </span>
                  </div>

                  {/* Grade */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.64rem",
                        letterSpacing: "0.28em",
                        color: "rgba(255, 255, 255, 0.46)",
                      }}
                    >
                      GRADE
                    </span>

                    <span
                      style={{
                        fontFamily: "var(--font-orbitron)",
                        fontSize: "0.76rem",
                        letterSpacing: "0.04em",
                        color: "rgba(255,255,255,0.92)",
                      }}
                    >
                      {item.grade}
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MASTER STYLES */}
      <style jsx>{`
        .edu-card {
          position: relative;
          padding: 15px;
          min-height: 245px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.02);
          overflow: hidden;
          transition:
            transform 0.25s ease,
            border-color 0.25s ease,
            background 0.25s ease,
            box-shadow 0.25s ease;
          backface-visibility: hidden;
          will-change: transform;
        }

        .edu-card:hover {
          transform: translateY(-8px);
          border-color: rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.04);
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.04);
        }

        .edu-card:hover .edu-glow {
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
}