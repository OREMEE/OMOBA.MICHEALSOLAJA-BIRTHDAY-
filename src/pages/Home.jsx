import React from "react";
import Hero from "../components/sections/Hero";
import CountdownSection from "../components/sections/CountdownSection";
import InfoBar from "../components/sections/InfoBar";
import AccessPass from "../components/sections/AccessPass";
import ThreeColumnFeatures from "../components/sections/ThreeColumnFeatures";
import FooterCTA from "../components/sections/FooterCTA";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 ">
      <Hero />
      <CountdownSection />
      <InfoBar />
<section className="max-w-4xl mx-auto px-5 sm:px-8 mt-8 text-center">
  <div className="glass rounded-2xl px-8 py-10">
    <p className="eyebrow mb-3">Your Personal Invitation</p>
    <h3 className="font-display text-2xl sm:text-3xl text-cream mb-3">
      RSVP to receive your own access pass
    </h3>
    <p className="text-cream/65 max-w-md mx-auto mb-6">
      Once you RSVP, we'll email you a personalized pass with a unique QR
      code — just show it at the entrance.
    </p>
    <a href="/rsvp" className="btn-gold inline-flex">
      RSVP Now
    </a>
  </div>
</section>      <ThreeColumnFeatures />
      <FooterCTA />
    </div>
  );
}
