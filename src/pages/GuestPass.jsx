import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import Reveal from "../components/ui/Reveal";
import GlassCard from "../components/ui/GlassCard";
import Laurel from "../components/ui/Laurel";
import { getGuestStatus } from "../utils/api";
import { EVENT } from "../utils/constants";

export default function GuestPassPage() {
  const { code } = useParams();
  const [state, setState] = useState({ loading: true, error: null, data: null });

  useEffect(() => {
    let cancelled = false;
    getGuestStatus(code)
      .then((res) => {
        if (cancelled) return;
        if (!res.success) {
          setState({ loading: false, error: "not_found", data: null });
        } else {
          setState({ loading: false, error: null, data: res });
        }
      })
      .catch(() => {
        if (!cancelled) setState({ loading: false, error: "network", data: null });
      });
    return () => {
      cancelled = true;
    };
  }, [code]);

  return (
    <div className="max-w-lg mx-auto px-5 sm:px-8 pb-24">
      <Reveal variant="zoom">
        <GlassCard hover={false} className="p-8 sm:p-10 text-center">
          {state.loading && (
            <div className="py-16 flex flex-col items-center gap-4">
              <Loader2 size={32} className="text-gold-light animate-spin" />
              <p className="text-cream/60 text-sm">Retrieving your access pass…</p>
            </div>
          )}

          {!state.loading && state.error === "not_found" && (
            <div className="py-16 flex flex-col items-center gap-4">
              <XCircle size={44} className="text-gold-light" strokeWidth={1.3} />
              <p className="font-display text-xl text-cream">Pass not found</p>
              <p className="text-cream/60 text-sm max-w-xs">
                This code doesn't match any RSVP on file. Please check the link from your
                confirmation email, or contact the event organizer.
              </p>
            </div>
          )}

          {!state.loading && state.error === "network" && (
            <div className="py-16 flex flex-col items-center gap-4">
              <XCircle size={44} className="text-gold-light" strokeWidth={1.3} />
              <p className="font-display text-xl text-cream">Couldn't load your pass</p>
              <p className="text-cream/60 text-sm max-w-xs">
                Please check your internet connection and try again.
              </p>
            </div>
          )}

          {!state.loading && state.data && (
            <>
              <p className="eyebrow">Your access pass</p>
              <p className="heading-script text-3xl mt-4">Hello</p>
              <h2 className="font-display text-2xl sm:text-3xl text-cream mt-1 mb-2">
                {state.data.name}
              </h2>
              <p className="text-[15px] text-cream/70 leading-relaxed max-w-sm mx-auto mb-6">
                You are specially invited to {EVENT.honoreeName}'s {EVENT.age}th Birthday
                Celebration!
              </p>

              <div className="flex items-center justify-center gap-4 mb-6">
                <Laurel side="left" />
                <div className="text-center">
                  <span className="inline-block bg-gold-gradient text-ink text-[11px] font-bold tracking-[0.2em] rounded px-4 py-1.5 mb-2">
                    GUESTS
                  </span>
                  <div className="font-display text-2xl font-bold text-gold-light">
                    {state.data.guests}
                  </div>
                </div>
                <Laurel side="right" />
              </div>

              <div className="bg-cream inline-block p-4 rounded-xl border border-gold/40">
                <QRCodeSVG value={code} size={180} bgColor="#F6F1E4" fgColor="#101B33" />
              </div>

              <p className="text-[11px] tracking-[0.15em] text-cream/50 mt-4">UNIQUE CODE</p>
              <p className="font-display text-lg font-bold text-gold-light tracking-wide">
                {code}
              </p>

              <div className="mt-6">
                {state.data.checkedIn ? (
                  <p className="inline-flex items-center gap-2 text-sm text-gold-light">
                    <CheckCircle2 size={16} /> Already checked in
                    {state.data.checkedInAt &&
                      ` at ${new Date(state.data.checkedInAt).toLocaleString()}`}
                  </p>
                ) : (
                  <p className="text-sm text-cream/60">
                    Show this QR code (on your phone or printed) at the entrance.
                  </p>
                )}
              </div>

              <p className="text-xs text-cream/40 mt-6">
                Tip: you can print this page and bring the paper copy instead of your phone.
              </p>
            </>
          )}
        </GlassCard>
      </Reveal>
    </div>
  );
}