import React from "react";
import { Calendar, Clock, MapPin, Shirt, ChevronRight } from "lucide-react";
import SectionHeading from "../components/ui/SectionHeading";
import GlassCard from "../components/ui/GlassCard";
import GoldButton from "../components/ui/GoldButton";
import Reveal from "../components/ui/Reveal";
import StaggerGroup, { staggerItem } from "../components/ui/StaggerGroup";
import { motion } from "framer-motion";
import { EVENT } from "../utils/constants";

const DETAILS = [
  { icon: Calendar, label: "Date", value: EVENT.date },
  { icon: Clock, label: "Time", value: EVENT.time },
  { icon: MapPin, label: "Venue", value: `${EVENT.venueName}, ${EVENT.venueAddress}` },
  { icon: Shirt, label: "Dress Code", value: EVENT.dressCode },
];

export default function EventDetailsPage() {
  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-24 flex flex-col gap-16">
      <SectionHeading
        eyebrow="The Occasion"
        title="Event Details"
        subtitle={`Everything you need to know before joining us for ${EVENT.honoreeName}'s ${EVENT.age}th birthday celebration.`}
      />

      <StaggerGroup className="grid sm:grid-cols-2 gap-6">
        {DETAILS.map((d) => (
          <motion.div key={d.label} variants={staggerItem}>
            <GlassCard className="p-7 flex gap-4 items-start h-full">
              <span className="w-12 h-12 min-w-[48px] rounded-full bg-gold-gradient flex items-center justify-center">
                <d.icon size={20} className="text-ink" strokeWidth={1.8} />
              </span>
              <div>
                <p className="eyebrow !text-gold-light">{d.label}</p>
                <p className="mt-2 text-[15px] text-cream/80 leading-relaxed">{d.value}</p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </StaggerGroup>

      <Reveal variant="zoom">
        <GlassCard hover={false} className="p-8 sm:p-10 text-center">
          <p className="eyebrow mb-3">Getting there</p>
          <h3 className="font-display text-2xl sm:text-3xl text-cream mb-4">
            {EVENT.venueName}
          </h3>
          <p className="text-cream/70 max-w-xl mx-auto mb-6">{EVENT.venueAddress}</p>
          <GoldButton href={EVENT.mapUrl} icon={ChevronRight}>
            View on Google Maps
          </GoldButton>
        </GlassCard>
      </Reveal>

      <Reveal variant="fadeUp" className="text-center">
        <p className="text-cream/60 mb-5">Ready to join the celebration?</p>
        <GoldButton to="/rsvp" icon={ChevronRight}>
          RSVP Now
        </GoldButton>
      </Reveal>
    </div>
  );
}
