import React from "react";
import Reveal from "./Reveal";
import { cn } from "../../utils/cn";

export default function SectionHeading({
  eyebrow,
  title,
  scriptTitle,
  subtitle,
  align = "center",
  className = "",
}) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <Reveal variant="fadeUp" className={cn("flex flex-col gap-3", alignClass, className)}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      {scriptTitle && (
        <span className="heading-script text-3xl sm:text-4xl">{scriptTitle}</span>
      )}
      {title && (
        <h2 className="heading-display text-3xl sm:text-4xl md:text-5xl">{title}</h2>
      )}
      <div className="flex items-center gap-3 my-1">
        <span className="divider-gold" />
        <span className="w-1.5 h-1.5 rounded-full bg-gold" />
        <span className="divider-gold" />
      </div>
      {subtitle && (
        <p className="max-w-2xl text-[15px] sm:text-base text-cream/70 leading-relaxed">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
