import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, CheckCircle2, Send } from "lucide-react";
import SectionHeading from "../components/ui/SectionHeading";
import GlassCard from "../components/ui/GlassCard";
import StaggerGroup, { staggerItem } from "../components/ui/StaggerGroup";
import Reveal from "../components/ui/Reveal";
import { CONTACTS } from "../utils/constants";
import { sendMessage } from "../utils/api";

const inputClass =
  "w-full rounded-lg bg-ink/40 border border-gold/25 px-4 py-3 text-sm text-cream placeholder:text-cream/35 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-colors duration-300";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

 async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const name = form[0].value;
  const email = form[1].value;
  const message = form[2].value;
  try {
    await sendMessage({ name, email, message });
    setSent(true);
  } catch {
    alert("Something went wrong sending your message — please try again.");
  }
}

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 pb-24">
      <SectionHeading
        eyebrow="We'd Love to Hear From You"
        title="Contact"
        subtitle="Reach out with questions, gift arrangements, or a message for the celebrant."
      />

      <Reveal variant="fadeUp" delay={0.05} className="mt-14 mb-2">
  <GlassCard hover={false} className="p-7 sm:p-9 text-center max-w-lg mx-auto">
    <p className="eyebrow mb-3">Monetary Gifts</p>
    <p className="text-cream/65 text-sm mb-5">
      If you'd like to bless the celebrant with a monetary gift, it can be sent to:
    </p>
    <div className="text-left inline-block">
      <p className="text-cream/80 text-sm mb-1">
        <span className="text-gold-light font-semibold">Bank:</span> First Bank
      </p>
      <p className="text-cream/80 text-sm mb-1">
        <span className="text-gold-light font-semibold">Account Name:</span> Samuel Adeyemi
      </p>
      <p className="text-cream/80 text-sm">
        <span className="text-gold-light font-semibold">Account Number:</span> 0123456789
      </p>
    </div>
  </GlassCard>
</Reveal>

 <Reveal variant="zoom" delay={0.15} className="mt-10">
        <GlassCard hover={false} className="p-7 sm:p-10">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8"
              >
                <CheckCircle2 size={54} className="text-gold-light mx-auto mb-5" strokeWidth={1.3} />
                <h3 className="font-display text-2xl text-cream mb-2">Message sent!</h3>
                <p className="text-cream/65">We'll pass your note along with our warmest thanks.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <p className="eyebrow mb-5 text-center">Message</p>
                    <label className="eyebrow !text-gold-light block mb-2">Your Name</label>
                    <input required placeholder="Full name" className={inputClass} />
                  </div>
                  <div>
                    <label className="eyebrow !text-gold-light block mb-2">Email</label>
                    <input required type="email" placeholder="you@example.com" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className="eyebrow !text-gold-light block mb-2">Message</label>
                  <textarea rows={5} placeholder="Your message or gift note…" className={inputClass} />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-gold w-full mt-2"
                >
                  Send Message <Send size={15} />
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </GlassCard>
      </Reveal>

      <StaggerGroup className="grid sm:grid-cols-2 gap-6 mt-14">
        {CONTACTS.map((c) => (
          <motion.div key={c.name} variants={staggerItem}>
            <GlassCard className="p-7 h-full">
              <p className="eyebrow !text-gold-light">{c.label}</p>
              <p className="font-display text-xl text-cream mt-2 mb-4">{c.name}</p>
              <div className="flex items-center gap-2.5 text-sm text-cream/70 mb-2">
                <Phone size={15} className="text-gold" /> {c.phone}
              </div>
              <div className="flex items-center gap-2.5 text-sm text-cream/70">
                <Mail size={15} className="text-gold" /> {c.email}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </StaggerGroup>

     
    </div>
  );
}
