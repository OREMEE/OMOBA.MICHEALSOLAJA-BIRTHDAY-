import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import GoldButton from "../ui/GoldButton";
import useScrollPosition from "../../hooks/useScrollPosition";
import { NAV_LINKS } from "../../utils/constants";
import { cn } from "../../utils/cn";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { passedThreshold } = useScrollPosition(40);
  const location = useLocation();

  // Close the mobile menu whenever the route changes (link click navigated).
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          passedThreshold ? "glass-strong shadow-card py-3" : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group" aria-label="Home">
            <span className="w-11 h-11 rounded-full border border-gold flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:shadow-gold">
              <span className="font-display text-lg font-bold text-gold-light">80</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-9">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "text-[13px] tracking-[0.12em] uppercase font-semibold transition-colors duration-300",
                    isActive ? "text-gold-light" : "text-cream/75 hover:text-gold-light"
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:block">
            <GoldButton to="/rsvp">RSVP Now</GoldButton>
          </div>

          {/* Mobile hamburger toggle */}
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="lg:hidden relative z-[60] w-11 h-11 rounded-full glass flex items-center justify-center text-gold-light transition-transform duration-300 hover:scale-105"
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Mobile toggle menu — full-screen glass panel, each link routes somewhere */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 lg:hidden glass-strong"
          >
            <motion.nav
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
              }}
              className="h-full flex flex-col items-center justify-center gap-7 px-8"
            >
              {NAV_LINKS.map((link) => (
                <motion.div
                  key={link.to}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      cn(
                        "font-display text-3xl transition-colors duration-300",
                        isActive ? "text-gold-light" : "text-cream/85 hover:text-gold-light"
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mt-4"
              >
                <GoldButton to="/rsvp">RSVP Now</GoldButton>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
