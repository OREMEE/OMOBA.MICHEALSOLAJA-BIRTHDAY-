import React from "react";

export default function InfoItem({ icon: Icon, label, lines = [] }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-11 h-11 min-w-[44px] rounded-full bg-ink flex items-center justify-center border border-gold/20">
        <Icon size={18} className="text-gold-light" strokeWidth={1.6} />
      </div>
      <div>
        <p className="text-[11px] tracking-[0.18em] font-bold text-gold-deep uppercase">
          {label}
        </p>
        {lines.map((l, i) =>
          l.href ? (
            <a
              key={i}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="block text-sm text-ink underline decoration-gold-deep/50 hover:text-gold-deep transition-colors mt-0.5"
            >
              {l.text}
            </a>
          ) : (
            <p key={i} className="text-[15px] text-ink/90 leading-snug mt-0.5">
              {l.text}
            </p>
          )
        )}
      </div>
    </div>
  );
}
