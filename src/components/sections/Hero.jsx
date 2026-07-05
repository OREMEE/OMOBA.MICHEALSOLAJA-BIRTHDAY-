import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Reveal from "../ui/Reveal";
import GoldButton from "../ui/GoldButton";
import { EVENT, HERO_IMAGE } from "../../utils/constants";

export default function Hero() {
  return (
    <section className="relative max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-10 items-center pb-20 pt-6">
      {/* Portrait */}
      <Reveal variant="zoom" duration={0.9} className="relative flex justify-center">
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
  className="absolute inset-0 m-auto w-72 h-72 sm:w-80 sm:h-80 md:w-[22rem] md:h-[22rem] rounded-full border-2 border-dashed border-gold/40"
/>
  <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-ink shadow-card">
  <img
    src={HERO_IMAGE}
    alt={EVENT.honoreeName}
    className="w-full h-full object-cover"
  />
</div>
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 glass-strong rounded-full px-5 py-2">
          <span className="font-display text-sm font-semibold text-gold-light tracking-wide">
            {EVENT.honoreeFirstName}
          
          </span>
        </div>
      </Reveal>

      {/* Copy */}
      <div className="text-center lg:text-left">
        <Reveal variant="fadeDown" delay={0.1}>
          <p className="eyebrow">Please join us for a</p>
        </Reveal>

        <Reveal variant="fadeUp" delay={0.2}>
          <span className="heading-script block text-4xl sm:text-5xl mt-1">Celebration of</span>
        </Reveal>

        <Reveal variant="zoom" delay={0.3}>
          <div className="heading-display flex items-start justify-center lg:justify-start gap-2 text-[64px] sm:text-8xl md:text-9xl">
            {EVENT.age}
            <sup className="text-[0.28em] mt-4 sm:mt-6">TH</sup>
          </div>
        </Reveal>

        <Reveal variant="fadeUp" delay={0.35}>
          <span className="heading-script block text-5xl sm:text-7xl md:text-8xl -mt-2 sm:-mt-4">
            Birthday
          </span>
        </Reveal>

        <Reveal variant="fade" delay={0.5}>
          <div className="inline-flex items-center gap-3 my-5">
            <span className="w-7 h-px bg-gold" />
            <span className="text-[11px] tracking-[0.3em] font-bold rounded px-4 py-1.5 bg-gold-gradient text-ink">
              HONORING
            </span>
            <span className="w-7 h-px bg-gold" />
          </div>
        </Reveal>

        <Reveal variant="fadeUp" delay={0.6}>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-cream tracking-wide">
            {EVENT.honoreeName}
          </h1>
        </Reveal>

        <Reveal variant="fadeUp" delay={0.7}>
          <p className="mt-3 text-[13px] tracking-[0.22em] text-cream/60 uppercase">
            {EVENT.tagline}
          </p>
        </Reveal>

        <Reveal variant="fadeUp" delay={0.85}>
          <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
            <GoldButton to="/rsvp">RSVP Now</GoldButton>
            <GoldButton to="/event-details" variant="ghost">
              Event Details
            </GoldButton>
          </div>
        </Reveal>
      </div>

      <motion.div
        className="hidden lg:flex absolute bottom-[-64px] left-1/2 -translate-x-1/2 flex-col items-center gap-1 text-gold/50"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <ChevronDown size={16} />
      </motion.div>
    </section>
  );
}
