import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { NAV_LINKS, EVENT } from "../../utils/constants";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-gold/15 mt-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <Link to="/" className="inline-flex items-center gap-2">
            <span className="w-11 h-11 rounded-full border border-gold flex items-center justify-center">
              <span className="font-display text-lg font-bold text-gold-light">80</span>
            </span>
          </Link>
          <p className="mt-4 text-sm text-cream/60 leading-relaxed max-w-xs">
            {EVENT.tagline}
          </p>
        </div>

        <div>
          <p className="eyebrow mb-4">Navigate</p>
          <ul className="space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-cream/70 hover:text-gold-light transition-colors duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">The Celebration</p>
          <p className="text-sm text-cream/70 leading-relaxed">{EVENT.date}</p>
          <p className="text-sm text-cream/70 leading-relaxed">{EVENT.venueName}</p>
          <p className="text-sm text-cream/70 leading-relaxed">{EVENT.venueAddress}</p>
        </div>
      </div>

      <div className="border-t border-gold/10 py-6 px-5 sm:px-8">
        <p className="text-center text-xs text-cream/40 flex items-center justify-center gap-1.5">
          Made with <Heart size={12} className="text-gold" fill="currentColor" /> in honor of{" "}
          {EVENT.honoreeFirstName}
        </p>
      </div>
    </footer>
  );
}
