import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import * as Icons from "lucide-react";
import Reveal from "../ui/Reveal";
import StaggerGroup, { staggerItem } from "../ui/StaggerGroup";
import GlassCard from "../ui/GlassCard";
import GoldButton from "../ui/GoldButton";
import { HIGHLIGHTS, GALLERY_IMAGES } from "../../utils/constants";

export default function ThreeColumnFeatures() {
  return (
    <section className="max-w-6xl mx-auto px-5 sm:px-8 mt-8 grid md:grid-cols-3 gap-6">
      {/* Family message */}
      <Reveal variant="fadeLeft">
        <GlassCard className="p-7 sm:p-8 text-center h-full flex flex-col">
          <p className="eyebrow">A message from the family</p>
          <p className="mt-5 text-[15px] text-cream/75 leading-relaxed flex-1">
            Your love, prayers and presence mean the world to us. Let's come together to
            celebrate a remarkable life, filled with love, wisdom and unforgettable memories.
          </p>
          <p className="heading-script text-2xl mt-5">We can't wait to celebrate with you!</p>
          <Heart size={16} className="text-gold mx-auto mt-4" />
        </GlassCard>
      </Reveal>

      {/* Event highlights */}
      <Reveal variant="fadeUp" delay={0.1}>
        <GlassCard className="p-7 sm:p-8 h-full">
          <p className="eyebrow text-center">Event Highlights</p>
          <StaggerGroup className="mt-6 flex flex-col gap-4">
            {HIGHLIGHTS.map((h) => {
              const Icon = Icons[h.icon] || Icons.Star;
              return (
                <motion.div
                  key={h.text}
                  variants={staggerItem}
                  className="flex items-center gap-3"
                >
                  <span className="w-9 h-9 rounded-full bg-ink/40 flex items-center justify-center border border-gold/20">
                    <Icon size={16} className="text-gold-light" strokeWidth={1.6} />
                  </span>
                  <span className="text-[15px] text-cream/85">{h.text}</span>
                </motion.div>
              );
            })}
          </StaggerGroup>
        </GlassCard>
      </Reveal>

      {/* Gallery preview */}
      <Reveal variant="fadeRight" delay={0.2}>
        <GlassCard className="p-7 sm:p-8 h-full flex flex-col">
          <p className="eyebrow text-center">Gallery Preview</p>
          <div className="grid grid-cols-3 gap-2 mt-6">
            {GALLERY_IMAGES.slice(0, 6).map((img) => (
              <div
                key={img.id}
                className="aspect-square rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
              >
                <img src={img.src} alt={img.caption} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <GoldButton to="/gallery" className="w-full mt-6">
            View Gallery
          </GoldButton>
        </GlassCard>
      </Reveal>
    </section>
  );
}