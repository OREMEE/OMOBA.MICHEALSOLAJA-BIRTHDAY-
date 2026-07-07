import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Send, XCircle } from "lucide-react";
import SectionHeading from "../components/ui/SectionHeading";
import GlassCard from "../components/ui/GlassCard";
import GoldButton from "../components/ui/GoldButton";
import Reveal from "../components/ui/Reveal";
import { EVENT } from "../utils/constants";
import { submitRSVP } from "../utils/api";

const inputClass =
  "w-full rounded-lg bg-ink/40 border border-gold/25 px-4 py-3 text-sm text-cream placeholder:text-cream/35 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-colors duration-300";

export default function RSVPPage() {
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [passCode, setPassCode] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", guests: "1", attending: "yes", message: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await submitRSVP(form);
      if (res.success) {
        setPassCode(res.id);
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 pb-24">
      <SectionHeading
        eyebrow="Kindly Respond"
        title="RSVP"
        subtitle={`Please reply by ${EVENT.rsvpDeadline} so we can prepare a seat with your name on it.`}
      />

      <Reveal variant="zoom" className="mt-12">
        <GlassCard hover={false} className="p-7 sm:p-10">
          <AnimatePresence mode="wait">
{status === "success" && (
  <motion.div
    key="success"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0 }}
    className="text-center py-8"
  >
    <CheckCircle2 size={54} className="text-gold-light mx-auto mb-5" strokeWidth={1.3} />
    <h3 className="font-display text-2xl text-cream mb-2">Thank you, {form.name}</h3>

    {form.attending === "no" ? (
      <p className="text-cream/65 mb-6">
        Thank you for letting us know. We're sorry you won't be able to join us for{" "}
        <strong>
          {EVENT.honoreeName}'s {EVENT.age}th Birthday Celebration
        </strong>
        , but we truly appreciate your response.
        <br />
        <br />
        You'll be missed — we hope to celebrate with you another time!
      </p>
    ) : (
      <>
        <p className="text-cream/65 mb-6">
          Your RSVP has been received. We've emailed your personal access pass to{" "}
          {form.email} — you can also view it right here.
        </p>
        {passCode && (
          <GoldButton to={`/pass/${passCode}`}>View My Access Pass</GoldButton>
        )}
      </>
    )}
  </motion.div>
)}

            {status === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8"
              >
                <XCircle size={54} className="text-gold-light mx-auto mb-5" strokeWidth={1.3} />
                <h3 className="font-display text-2xl text-cream mb-2">Something went wrong</h3>
                <p className="text-cream/65 mb-6">
                  We couldn't submit your RSVP. Please check your connection and try again, or
                  reach out to us directly via the{" "}
                  <Link to="/contact" className="underline text-gold-light">
                    Contact page
                  </Link>
                  .
                </p>
                <GoldButton onClick={() => setStatus("idle")}>Try Again</GoldButton>
              </motion.div>
            )}

            {(status === "idle" || status === "submitting") && (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
              >
                <div>
                  <label className="eyebrow !text-gold-light block mb-2">Full Name</label>
                  <input
                    required
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="eyebrow !text-gold-light block mb-2">Email Address</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="eyebrow !text-gold-light block mb-2">Will you attend?</label>
                    <select name="attending" value={form.attending} onChange={handleChange} className={inputClass}>
                      <option value="yes">Joyfully accepts</option>
                      <option value="no">Regretfully declines</option>
                    </select>
                  </div>
                  <div>
                    <label className="eyebrow !text-gold-light block mb-2">Number of Guests</label>
                    <select name="guests" value={form.guests} onChange={handleChange} className={inputClass}>
                      {[1, 2].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "guest" : "guests"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="eyebrow !text-gold-light block mb-2">Message (optional)</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Leave a note or blessing for the celebrant…"
                    className={inputClass}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === "submitting"}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-gold w-full mt-2 disabled:opacity-60 disabled:pointer-events-none"
                >
                  {status === "submitting" ? "Submitting…" : "Submit RSVP"} <Send size={15} />
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </GlassCard>
      </Reveal>
    </div>
  );
}