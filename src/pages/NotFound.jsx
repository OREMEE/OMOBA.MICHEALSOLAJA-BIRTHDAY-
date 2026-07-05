import React from "react";
import Reveal from "../components/ui/Reveal";
import GoldButton from "../components/ui/GoldButton";

export default function NotFoundPage() {
  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 pb-24 text-center py-20">
      <Reveal variant="zoom">
        <p className="heading-display text-7xl sm:text-8xl">404</p>
        <p className="heading-script text-3xl mt-2">Page not found</p>
        <p className="text-cream/60 mt-4 mb-8">
          This page must have wandered off to the celebration early. Let's get you back.
        </p>
        <GoldButton to="/">Return Home</GoldButton>
      </Reveal>
    </div>
  );
}
