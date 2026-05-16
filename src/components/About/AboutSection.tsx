"use client";

export default function AboutSection() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",

        display: "grid",
        gridTemplateColumns: "1.2fr 1fr",

        gap: "40px",

        alignItems: "center",
      }}
    >
      {/* LEFT */}
      <div>
        <div
          style={{
            fontSize: "6rem",
            fontWeight: 900,
            lineHeight: 0.9,
            color: "#fff",
          }}
        >
          ABOUT
        </div>

        <p
          style={{
            marginTop: "24px",
            maxWidth: "500px",
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          AI engineer building cinematic systems,
          intelligent automation experiences,
          immersive interfaces, and futuristic
          operational environments.
        </p>
      </div>

      {/* RIGHT */}
      <div
        style={{
          border: "1px solid rgba(255,255,255,0.08)",
          height: "500px",

          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.02), transparent)",
        }}
      />
    </div>
  );
}