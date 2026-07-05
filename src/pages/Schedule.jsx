import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "../components/ui/SectionHeading";
import GlassCard from "../components/ui/GlassCard";
import Reveal from "../components/ui/Reveal";
import { SCHEDULE } from "../utils/constants";

export default function SchedulePage() {
  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-24">
      <SectionHeading
        eyebrow="Order of the Evening"
        title="Schedule"
        subtitle="A carefully paced evening of arrival, celebration, tribute, and joy."
      />

      <div className="relative mt-14">
        <span className="absolute left-[27px] sm:left-1/2 top-0 bottom-0 w-px bg-gold/25 sm:-translate-x-1/2" />

        <div className="flex flex-col gap-10">
          {SCHEDULE.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <Reveal
                key={item.time}
                variant={isLeft ? "fadeLeft" : "fadeRight"}
                delay={0.05 * i}
                className={`relative sm:grid sm:grid-cols-2 sm:gap-10 flex ${
                  isLeft ? "" : "sm:[&>*:first-child]:order-2"
                }`}
              >
                <span className="absolute left-[19px] sm:left-1/2 top-1.5 w-4 h-4 rounded-full bg-gold-gradient sm:-translate-x-1/2 z-10 shadow-gold" />

                <div className={`pl-14 sm:pl-0 ${isLeft ? "sm:text-right sm:pr-10" : "sm:pl-10"}`}>
                  <GlassCard className="p-6 inline-block w-full sm:w-auto sm:min-w-[280px]">
                    <p className="font-display text-xl text-gold-light font-semibold">
                      {item.time}
                    </p>
                    <p className="font-semibold text-cream mt-1.5">{item.title}</p>
                    <p className="text-sm text-cream/60 mt-1.5 leading-relaxed">{item.desc}</p>
                  </GlassCard>
                </div>
                <div className="hidden sm:block" />
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
