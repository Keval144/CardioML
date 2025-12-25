"use client";

import { motion } from "motion/react";

export default function HeartBeat() {
  const pathData =
    "M0 50 L300 50 L315 42 L325 58 L335 50 L345 50 L355 10 L375 90 L395 50 L415 50 L430 38 L450 50 L800 50";

  return (
    <div className="pointer-events-none flex w-full items-center justify-center py-8 sm:py-12 lg:py-16">
      <svg
        viewBox="0 0 800 100"
        className="h-12 w-full max-w-7xl sm:h-16"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="scanGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="0.1" />
            <stop offset="90%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          <mask id="scanMask">
            <motion.rect
              x="-100%"
              y="0"
              width="100%"
              height="100%"
              fill="url(#scanGradient)"
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </mask>
        </defs>

        {/* Ghost Path - Uses your theme's muted foreground at low opacity */}
        <path
          d={pathData}
          fill="none"
          stroke="var(--muted-foreground)"
          strokeWidth="1"
          opacity="0.15"
        />

        {/* Active Pulse - Uses your theme's Primary OKLCH color */}
        <path
          d={pathData}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          mask="url(#scanMask)"
          style={{
            // Dynamic glow based on your primary color
            filter: "drop-shadow(0 0 4px var(--primary))",
          }}
        />
      </svg>
    </div>
  );
}
