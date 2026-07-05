import React from "react";
import Reveal from "../ui/Reveal";
import CountdownDisplay from "../ui/CountdownDisplay";
import { EVENT } from "../../utils/constants";

export default function CountdownSection() {
  return (
    <section className="max-w-5xl mx-auto px-5 sm:px-8">
      <Reveal variant="zoom">
        <div className="glass rounded-2xl px-6 sm:px-8 py-8 sm:py-10 bg-ink-radial">
          <p className="eyebrow text-center mb-6">Countdown to the celebration</p>
          <CountdownDisplay targetDate={EVENT.isoDate} />
        </div>
      </Reveal>
    </section>
  );
}