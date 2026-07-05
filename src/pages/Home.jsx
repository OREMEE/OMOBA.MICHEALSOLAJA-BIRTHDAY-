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
      <AccessPass />
      <ThreeColumnFeatures />
      <FooterCTA />
    </div>
  );
}
