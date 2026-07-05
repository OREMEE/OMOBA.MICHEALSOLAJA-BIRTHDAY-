import React from "react";
import Reveal from "../ui/Reveal";
import Laurel from "../ui/Laurel";
import QRCode from "../ui/QRCode";
import { EVENT } from "../../utils/constants";

export default function AccessPass() {
  return (
    <section className="max-w-6xl mx-auto px-5 sm:px-8 mt-8">
      <Reveal variant="zoom">
        <div className="relative glass rounded-2xl grid md:grid-cols-[1.15fr_0.85fr] overflow-hidden">
          <div className="p-8 sm:p-10 border-b md:border-b-0 md:border-r border-dashed border-gold/30">
            <p className="eyebrow">Your access pass</p>
            <p className="heading-script text-3xl mt-4">Hello</p>
            <h2 className="font-display text-2xl sm:text-3xl text-cream mt-1 mb-4">
              {EVENT.guestName}
            </h2>
            <p className="text-[15px] text-cream/70 leading-relaxed max-w-sm">
              You are specially invited to {EVENT.honoreeName}'s {EVENT.age}th Birthday
              Celebration!
            </p>

            <div className="mt-7 flex items-center gap-4">
              <Laurel side="left" />
              <div className="text-center">
                <span className="inline-block bg-gold-gradient text-ink text-[11px] font-bold tracking-[0.2em] rounded px-4 py-1.5 mb-2">
                  ACCESS LEVEL
                </span>
                <div className="font-display text-3xl font-bold text-gold-light">
                  {EVENT.accessLevel}
                </div>
                <div className="tracking-[4px] text-gold text-xs">★★★★★</div>
              </div>
              <Laurel side="right" />
            </div>
          </div>

          <div className="p-8 sm:p-10 flex flex-col items-center justify-center bg-gold/5">
            <p className="text-[11px] tracking-[0.2em] text-cream/60 mb-4 text-center">
              SHOW THIS QR CODE AT THE ENTRANCE
            </p>
            <div className="bg-cream p-3.5 rounded-xl border border-gold/40">
              <QRCode value={EVENT.uniqueCode} />
            </div>
            <p className="text-[11px] tracking-[0.15em] text-cream/50 mt-4">UNIQUE CODE</p>
            <p className="font-display text-lg font-bold text-gold-light tracking-wide">
              {EVENT.uniqueCode}
            </p>
          </div>

          {/* Ticket stub notches */}
          <span className="hidden md:block absolute left-[calc(53.6%-14px)] top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-ink" />
        </div>
      </Reveal>
    </section>
  );
}
