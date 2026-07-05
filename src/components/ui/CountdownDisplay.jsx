import React from "react";
import { motion } from "framer-motion";
import useCountdown from "../../hooks/useCountdown";

const UNITS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

export default function CountdownDisplay({ targetDate, className = "" }) {
  const time = useCountdown(targetDate);

  return (
    <div className={className}>
      <div className="grid grid-cols-4 divide-x divide-gold/20">
        {UNITS.map((u) => (
          <div key={u.key} className="text-center px-1 sm:px-3">
            <motion.div
              key={time[u.key]}
              initial={{ opacity: 0.4, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="font-display font-semibold text-2xl sm:text-4xl md:text-5xl text-gold-light tabular-nums"
            >
              {String(time[u.key]).padStart(2, "0")}
            </motion.div>
            <div className="mt-1.5 text-[9px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] text-cream/50 uppercase whitespace-nowrap">
              {u.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}