import React from "react";
import { Gift, ChevronRight } from "lucide-react";
import Reveal from "../ui/Reveal";
import GlassCard from "../ui/GlassCard";
import GoldButton from "../ui/GoldButton";
import { EVENT } from "../../utils/constants";

export default function FooterCTA() {
  return (
    <section className="max-w-6xl mx-auto px-5 sm:px-8 mt-8 mb-20">
      <Reveal variant="fadeUp">
        <GlassCard hover={false} className="p-7 sm:p-9 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4 text-center md:text-left">
            <Gift size={26} className="text-gold-light hidden sm:block" strokeWidth={1.5} />
            <div>
              <p className="font-bold text-cream text-[15px]">Can't make it?</p>
              <p className="text-[13.5px] text-cream/60 mt-0.5 mb-3">
                You can still celebrate with us by sending a gift or message.
              </p>
              <GoldButton to="/contact" variant="ghost">
                Send Gift / Message
              </GoldButton>
            </div>
          </div>

          <div className="hidden md:block w-px self-stretch bg-gold/20" />

          <div className="text-center md:text-right">
            <p className="font-bold text-cream text-[15px]">
              Kindly RSVP by {EVENT.rsvpDeadline}
            </p>
            <p className="text-[13.5px] text-cream/60 mt-0.5 mb-3">
              to help us make proper arrangements.
            </p>
            <GoldButton to="/rsvp" icon={ChevronRight}>
              RSVP Now
            </GoldButton>
          </div>
        </GlassCard>
      </Reveal>
    </section>
  );
}
