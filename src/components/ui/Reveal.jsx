import React from "react";
import { motion } from "framer-motion";
import useInView from "../../hooks/useInView";

const VARIANTS = {
  fadeUp: {
    hidden: { opacity: 0, y: 36 },
    show: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -36 },
    show: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -48 },
    show: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 48 },
    show: { opacity: 1, x: 0 },
  },
  zoom: {
    hidden: { opacity: 0, scale: 0.85 },
    show: { opacity: 1, scale: 1 },
  },
  fade: {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  },
};

/**
 * Wrap any content to have it fade/slide/zoom into place when scrolled
 * into view. Pass `stagger` on a parent Reveal (as="ul"-like usage) is not
 * automatic — for staggered children use <StaggerGroup> below instead.
 */
export default function Reveal({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.7,
  className = "",
  once = true,
  threshold = 0.2,
  as: Component = motion.div,
}) {
  const [ref, inView] = useInView({ once, threshold });
  const chosen = VARIANTS[variant] || VARIANTS.fadeUp;

  return (
    <Component
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={chosen}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Component>
  );
}
