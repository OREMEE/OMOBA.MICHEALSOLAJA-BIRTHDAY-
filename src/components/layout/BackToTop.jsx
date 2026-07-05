import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import useScrollPosition from "../../hooks/useScrollPosition";

export default function BackToTop() {
  const { passedThreshold } = useScrollPosition(480);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <AnimatePresence>
      {passedThreshold && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 16, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.8 }}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-40 w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold text-ink hover:shadow-gold-lg transition-shadow duration-300"
        >
          <ArrowUp size={19} strokeWidth={2.2} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
