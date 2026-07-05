import React from "react";
import { Calendar, Clock, MapPin, Shirt } from "lucide-react";
import Reveal from "../ui/Reveal";
import InfoItem from "../ui/InfoItem";
import { EVENT } from "../../utils/constants";

export default function InfoBar() {
  return (
    <section className="max-w-6xl mx-auto px-5 sm:px-8 mt-8">
      <Reveal variant="fadeUp">
        <div className="bg-cream rounded-2xl px-6 sm:px-10 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 shadow-card">
          <InfoItem
            icon={Calendar}
            label="Date"
            lines={[{ text: EVENT.date.split(",")[0] }, { text: EVENT.date.split(",")[1]?.trim() }]}
          />
          <InfoItem icon={Clock} label="Time" lines={[{ text: EVENT.time }]} />
          <InfoItem
            icon={MapPin}
            label="Venue"
            lines={[
              { text: EVENT.venueName },
              { text: EVENT.venueAddress },
              { text: "View on Google Maps", href: EVENT.mapUrl },
            ]}
          />
          <InfoItem icon={Shirt} label="Dress Code" lines={[{ text: EVENT.dressCode }]} />
        </div>
      </Reveal>
    </section>
  );
}
