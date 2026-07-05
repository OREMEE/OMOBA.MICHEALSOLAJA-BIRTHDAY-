import React from "react";
import { motion } from "framer-motion";
import useInView from "../../hooks/useInView";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Wraps a list of children (e.g. cards, icons) and staggers their reveal
 * animation once the group scrolls into view. Each direct child should be
 * a <motion.* variants={staggerItem} /> element for the stagger to apply.
 */
export default function StaggerGroup({ children, className = "", threshold = 0.15 }) {
  const [ref, inView] = useInView({ threshold, once: true });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={container}
      className={className}
    >
      {children}
    </motion.div>
  );
}
