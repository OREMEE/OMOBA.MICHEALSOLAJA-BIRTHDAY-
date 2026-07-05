import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, ImageOff } from "lucide-react";
import SectionHeading from "../components/ui/SectionHeading";
import GoldButton from "../components/ui/GoldButton";
import { listGuestPhotos } from "../utils/api";

export default function GuestPhotosPage() {
  const [selected, setSelected] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listGuestPhotos()
      .then((res) => setPhotos(res.photos || []))
      .catch(() => setPhotos([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-24">
      <SectionHeading
        eyebrow="Captured By You"
        title="Photos From the Event"
        subtitle="Shared live by our guests — add your own from the day!"
      />

      <div className="text-center mt-8">
        <GoldButton to="/upload">Upload a Photo</GoldButton>
      </div>

      {loading && (
        <div className="flex justify-center py-20">
          <Loader2 size={28} className="text-gold-light animate-spin" />
        </div>
      )}

      {!loading && photos.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-20 text-cream/50">
          <ImageOff size={32} strokeWidth={1.3} />
          <p>No photos yet — be the first to share one!</p>
        </div>
      )}

      {!loading && photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-10">
          {photos.map((photo, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelected(photo)}
              className="group aspect-square rounded-xl overflow-hidden relative card-lift"
            >
              <img src={photo.url} alt={photo.caption || photo.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/40 transition-colors duration-300 flex items-end p-3 opacity-0 group-hover:opacity-100">
                <span className="text-xs text-cream/90">{photo.name}</span>
              </div>
            </button>
          ))}
        </div>
      )}

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
              <img src={selected.url} alt={selected.caption} className="w-full h-full object-contain bg-ink" />
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center text-gold-light"
              >
                <X size={18} />
              </button>
              {(selected.caption || selected.name) && (
                <div className="absolute bottom-0 left-0 right-0 bg-ink/70 backdrop-blur-sm px-4 py-3">
                  {selected.caption && <p className="text-sm text-cream">{selected.caption}</p>}
                  <p className="text-xs text-cream/60 mt-0.5">— {selected.name}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}