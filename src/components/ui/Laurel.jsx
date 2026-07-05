import React from "react";
import { cn } from "../../utils/cn";

export default function Laurel({ side = "left", className = "" }) {
  const flip = side === "right" ? "scale-x-[-1]" : "";
  return (
    <svg
      viewBox="0 0 60 120"
      className={cn("w-8 h-16 text-gold", flip, className)}
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M30 4 C 20 20, 20 40, 30 60 C 20 80, 20 100, 30 116" />
        {[10, 26, 42, 58, 74, 90, 104].map((y, i) => (
          <ellipse
            key={y}
            cx={22 - (i % 2) * 2}
            cy={y}
            rx="9"
            ry="4"
            transform={`rotate(${-35 + (i % 2) * 10} 22 ${y})`}
          />
        ))}
      </g>
    </svg>
  );
}
