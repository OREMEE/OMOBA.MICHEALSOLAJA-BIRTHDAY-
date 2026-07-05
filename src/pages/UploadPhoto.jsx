import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, ImagePlus, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import SectionHeading from "../components/ui/SectionHeading";
import GlassCard from "../components/ui/GlassCard";
import GoldButton from "../components/ui/GoldButton";
import Reveal from "../components/ui/Reveal";
import { uploadGuestPhoto } from "../utils/api";

const inputClass =
  "w-full rounded-lg bg-ink/40 border border-gold/25 px-4 py-3 text-sm text-cream placeholder:text-cream/35 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-colors duration-300";

export default function UploadPhotoPage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [name, setName] = useState("");
  const [caption, setCaption] = useState("");
  const [status, setStatus] = useState("idle"); // idle | uploading | success | error
  const fileInputRef = useRef(null);

  function handleFileChange(e) {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file) return;
    setStatus("uploading");
    try {
      const res = await uploadGuestPhoto({ name: name || "Anonymous", caption, file });
      if (res.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setFile(null);
    setPreview(null);
    setName("");
    setCaption("");
    setStatus("idle");
  }

  return (
    <div className="max-w-xl mx-auto px-5 sm:px-8 pb-24">
      <SectionHeading
        eyebrow="Share a Memory"
        title="Upload a Photo"
        subtitle="Add your favorite photo of the celebrant to the shared gallery for everyone to enjoy."
      />

      <Reveal variant="zoom" className="mt-12">
        <GlassCard hover={false} className="p-7 sm:p-10">
          <AnimatePresence mode="wait">
            {status === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8"
              >
                <CheckCircle2 size={54} className="text-gold-light mx-auto mb-5" strokeWidth={1.3} />
                <h3 className="font-display text-2xl text-cream mb-2">Thank you!</h3>
                <p className="text-cream/65 mb-6">
                  Your photo has been added to the gallery.
                </p>
                <div className="flex gap-3 justify-center">
<GoldButton to="/guest-photos">View Photos</GoldButton>
                  <GoldButton variant="ghost" onClick={reset}>
                    Upload Another
                  </GoldButton>
                </div>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8"
              >
                <XCircle size={54} className="text-gold-light mx-auto mb-5" strokeWidth={1.3} />
                <h3 className="font-display text-2xl text-cream mb-2">Upload failed</h3>
                <p className="text-cream/65 mb-6">
                  Please check your connection and try again.
                </p>
                <GoldButton onClick={() => setStatus("idle")}>Try Again</GoldButton>
              </motion.div>
            )}

            {(status === "idle" || status === "uploading") && (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
              >
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="relative aspect-video rounded-xl border-2 border-dashed border-gold/30 hover:border-gold/60 transition-colors duration-300 flex items-center justify-center overflow-hidden bg-ink/30"
                >
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-cream/50">
                      <ImagePlus size={32} strokeWidth={1.3} />
                      <span className="text-sm">Tap to choose a photo</span>
                    </div>
                  )}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div>
                  <label className="eyebrow !text-gold-light block mb-2">Your Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name (optional)"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="eyebrow !text-gold-light block mb-2">Caption</label>
                  <input
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Say something about this photo (optional)"
                    className={inputClass}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={!file || status === "uploading"}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-gold w-full mt-2 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {status === "uploading" ? (
                    <>
                      <Loader2 size={15} className="animate-spin" /> Uploading…
                    </>
                  ) : (
                    <>
                      <Upload size={15} /> Upload Photo
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </GlassCard>
      </Reveal>
    </div>
  );
}