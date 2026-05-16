"use client";

import { useState } from "react";

import HeroSection from "@/components/Hero/HeroSection";
import SystemShell from "@/components/Layout/SystemShell";

export default function Page() {
  const [view, setView] = useState<"hero" | "dashboard">("hero");

  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#000",
        position: "fixed",
        inset: 0,
      }}
    >
      {view === "hero" && (
        <HeroSection
          onEnter={() => {
            setView("dashboard");
          }}
        />
      )}

      {view === "dashboard" && (
        <SystemShell />
      )}
    </main>
  );
}