import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-20 h-20 rounded-full border border-gold flex items-center justify-center mb-6"
          >
            <span className="font-display text-2xl font-bold text-gold-light">80</span>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="h-px w-40 bg-gold-gradient origin-left mb-4"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="eyebrow text-cream/60"
          >
            Preparing your invitation…
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
