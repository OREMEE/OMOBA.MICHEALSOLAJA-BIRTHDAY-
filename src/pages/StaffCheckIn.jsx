import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { CheckCircle2, XCircle, Search, ScanLine, Loader2 } from "lucide-react";
import Reveal from "../components/ui/Reveal";
import GlassCard from "../components/ui/GlassCard";
import { checkInGuest, manualCheckInGuest, searchGuests } from "../utils/api";
import { cn } from "../utils/cn";

const SCANNER_ELEMENT_ID = "qr-scanner-region";

function ResultBanner({ result }) {
  if (!result) return null;

  if (result.success) {
    return (
      <div className="rounded-xl bg-emerald-500/15 border border-emerald-400/40 text-emerald-200 px-5 py-4 flex items-center gap-3">
        <CheckCircle2 size={22} />
        <div>
          <p className="font-semibold">Welcome, {result.name}!</p>
          <p className="text-sm opacity-80">
            {result.guests} guest{result.guests === "1" || result.guests === 1 ? "" : "s"} — checked in
            successfully.
          </p>
        </div>
      </div>
    );
  }

  const messages = {
    already_used: (r) =>
      `${r.name || "This guest"} was already checked in${
        r.checkedInAt ? ` at ${new Date(r.checkedInAt).toLocaleString()}` : ""
      }.`,
    not_found: () => "No RSVP found for this code. Check spelling or ask for their confirmation email.",
    default: () => "Something went wrong — please try again.",
  };
  const msg = (messages[result.reason] || messages.default)(result);

  return (
    <div className="rounded-xl bg-red-500/15 border border-red-400/40 text-red-200 px-5 py-4 flex items-center gap-3">
      <XCircle size={22} />
      <p className="font-semibold">{msg}</p>
    </div>
  );
}

export default function StaffCheckInPage() {
  const [mode, setMode] = useState("scan"); // "scan" | "manual"
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const scannerRef = useRef(null);
  const lastScanRef = useRef({ code: null, time: 0 });

  useEffect(() => {
    if (mode !== "scan") return undefined;

    const scanner = new Html5Qrcode(SCANNER_ELEMENT_ID);
    scannerRef.current = scanner;
    let stopped = false;

    scanner
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 240, height: 240 } },
        async (decodedText) => {
          const now = Date.now();
          if (
            lastScanRef.current.code === decodedText &&
            now - lastScanRef.current.time < 3000
          ) {
            return;
          }
          lastScanRef.current = { code: decodedText, time: now };
          await handleCheckIn(decodedText.trim());
        },
        () => {
          /* ignore per-frame "no QR found" errors */
        }
      )
      .catch(() => {
        setResult({ success: false, reason: "default" });
      });

    return () => {
      if (!stopped) {
        stopped = true;
        scanner.stop().catch(() => {});
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  async function handleCheckIn(id) {
    setBusy(true);
    try {
      const res = await checkInGuest(id);
      setResult(res);
    } catch {
      setResult({ success: false, reason: "default" });
    } finally {
      setBusy(false);
    }
  }

  async function handleManualCheckIn(id) {
    setBusy(true);
    try {
      const res = await manualCheckInGuest(id, "door staff");
      setResult(res);
      setSearchResults((prev) => prev.filter((g) => g.id !== id));
    } catch {
      setResult({ success: false, reason: "default" });
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    if (query.trim().length < 2) {
      setSearchResults([]);
      return undefined;
    }
    setSearching(true);
    const timeout = setTimeout(() => {
      searchGuests(query.trim())
        .then((res) => setSearchResults(res.results || []))
        .catch(() => setSearchResults([]))
        .finally(() => setSearching(false));
    }, 350);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 pb-24">
      <Reveal variant="fadeUp">
        <p className="eyebrow text-center mb-2">Door Staff</p>
        <h1 className="font-display text-3xl sm:text-4xl text-cream text-center mb-8">
          Guest Check-In
        </h1>
      </Reveal>

      <Reveal variant="zoom" delay={0.1}>
        <GlassCard hover={false} className="p-6 sm:p-8">
          <div className="flex gap-2 mb-6 bg-ink/40 rounded-lg p-1">
            <button
              type="button"
              onClick={() => {
                setMode("scan");
                setResult(null);
              }}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-semibold transition-colors duration-300",
                mode === "scan" ? "bg-gold-gradient text-ink" : "text-cream/60 hover:text-cream"
              )}
            >
              <ScanLine size={16} /> Scan QR
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("manual");
                setResult(null);
              }}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-semibold transition-colors duration-300",
                mode === "manual" ? "bg-gold-gradient text-ink" : "text-cream/60 hover:text-cream"
              )}
            >
              <Search size={16} /> Find by Name
            </button>
          </div>

          <p className="text-xs text-cream/50 text-center mb-6">
            Use "Find by Name" for guests who can't show a QR code (no phone, no printout, etc.)
          </p>

          {mode === "scan" && (
            <div>
              <div
                id={SCANNER_ELEMENT_ID}
                className="rounded-xl overflow-hidden border border-gold/25 bg-black/40 min-h-[260px]"
              />
              {busy && (
                <p className="flex items-center justify-center gap-2 text-sm text-cream/60 mt-4">
                  <Loader2 size={15} className="animate-spin" /> Checking…
                </p>
              )}
            </div>
          )}

          {mode === "manual" && (
            <div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type guest's name…"
                className="w-full rounded-lg bg-ink/40 border border-gold/25 px-4 py-3 text-sm text-cream placeholder:text-cream/35 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-colors duration-300"
              />
              <div className="mt-4 flex flex-col gap-2 max-h-72 overflow-y-auto">
                {searching && (
                  <p className="text-sm text-cream/50 text-center py-4">Searching…</p>
                )}
                {!searching && query.trim().length >= 2 && searchResults.length === 0 && (
                  <p className="text-sm text-cream/50 text-center py-4">No matches found.</p>
                )}
                {searchResults.map((g) => (
                  <div
                    key={g.id}
                    className="flex items-center justify-between gap-3 rounded-lg bg-ink/30 border border-gold/15 px-4 py-3"
                  >
                    <div>
                      <p className="text-cream font-medium">{g.name}</p>
                      <p className="text-xs text-cream/50">
                        {g.guests} guest{g.guests === 1 ? "" : "s"} ·{" "}
                        {g.checkedIn ? "Already checked in" : "Not yet arrived"}
                      </p>
                    </div>
                    <button
                      type="button"
                      disabled={g.checkedIn || busy}
                      onClick={() => handleManualCheckIn(g.id)}
                      className={cn(
                        "shrink-0 rounded-md px-4 py-2 text-xs font-bold tracking-wide transition-colors duration-300",
                        g.checkedIn
                          ? "bg-cream/10 text-cream/30 cursor-not-allowed"
                          : "bg-gold-gradient text-ink hover:shadow-gold"
                      )}
                    >
                      {g.checkedIn ? "Checked In" : "Check In"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <ResultBanner result={result} />
          </div>
        </GlassCard>
      </Reveal>
    </div>
  );
}