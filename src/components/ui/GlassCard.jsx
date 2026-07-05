import React from "react";
import { cn } from "../../utils/cn";

/**
 * Generic glassmorphism panel used throughout the site (info cards,
 * schedule items, gallery frames, contact cards). `strong` uses a denser
 * background for content that needs more contrast.
 */
export default function GlassCard({ children, className = "", strong = false, hover = true, as: Component = "div", ...props }) {
  return (
    <Component
      className={cn(
        strong ? "glass-strong" : "glass",
        "rounded-2xl",
        hover && "card-lift",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
