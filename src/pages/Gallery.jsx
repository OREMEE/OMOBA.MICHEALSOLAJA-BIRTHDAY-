import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import SectionHeading from "../components/ui/SectionHeading";
import GoldButton from "../components/ui/GoldButton";
import StaggerGroup, { staggerItem } from "../components/ui/StaggerGroup";
import { GALLERY_IMAGES } from "../utils/constants";

export default function GalleryPage() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-24">
      <SectionHeading
        eyebrow="Moments & Memories"
        title="Gallery"
        subtitle="A glimpse into a life beautifully lived — moments we treasure."
      />

      <div className="text-center mt-8">
        <GoldButton to="/guest-photos" variant="ghost">
          View Photos From the Event
        </GoldButton>
      </div>

      <StaggerGroup className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-10">
        {GALLERY_IMAGES.map((img) => (
          <motion.button
            key={img.id}
            type="button"
            variants={staggerItem}
            onClick={() => setSelected(img)}
            className="group aspect-square rounded-xl overflow-hidden relative card-lift"
          >
            <img src={img.src} alt={img.caption} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/30 transition-colors duration-300 flex items-end p-3 opacity-0 group-hover:opacity-100">
              <span className="text-xs tracking-wide text-cream/90">{img.caption}</span>
            </div>
          </motion.button>
        ))}
      </StaggerGroup>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-ink/90 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-2xl overflow-hidden border border-gold/30"
            >
              <img src={selected.src} alt={selected.caption} className="w-full h-full object-contain bg-ink" />
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center text-gold-light"
              >
                <X size={18} />
              </button>
              <span className="absolute bottom-4 left-4 text-sm text-cream/80">
                {selected.caption}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}