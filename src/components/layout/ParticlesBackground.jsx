import React, { useMemo } from "react";
import { motion } from "framer-motion";

/**
 * Subtle floating gold particles + ambient glow orbs, fixed behind all
 * page content. Pure CSS/SVG — no canvas — so it stays lightweight and
 * respects prefers-reduced-motion via Tailwind's motion-safe variants.
 */
export default function ParticlesBackground({ count = 22 }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        size: 2 + Math.random() * 4,
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: 6 + Math.random() * 8,
        delay: Math.random() * 6,
        opacity: 0.15 + Math.random() * 0.35,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Ambient glow orbs */}
      <div className="absolute -top-40 -right-32 w-[480px] h-[480px] rounded-full bg-gold/10 blur-3xl motion-safe:animate-float-slow" />
      <div className="absolute top-1/2 -left-40 w-[420px] h-[420px] rounded-full bg-gold/5 blur-3xl motion-safe:animate-float" />
      <div className="absolute bottom-0 right-0 w-[380px] h-[380px] rounded-full bg-gold/5 blur-3xl motion-safe:animate-float-slow" />

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-gold-light motion-safe:block hidden sm:block"
          style={{
            width: p.size,
            height: p.size,
            top: `${p.top}%`,
            left: `${p.left}%`,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -24, 0],
            x: [0, 10, 0],
            opacity: [p.opacity, p.opacity * 1.6, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
