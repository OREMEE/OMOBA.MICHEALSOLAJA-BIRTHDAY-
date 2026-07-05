import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import UploadPhotoPage from "./pages/UploadPhoto";
import GuestPhotosPage from "./pages/GuestPhotos";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import BackToTop from "./components/layout/BackToTop";
import LoadingScreen from "./components/layout/LoadingScreen";
import ParticlesBackground from "./components/layout/ParticlesBackground";
import PageTransition from "./components/layout/PageTransition";

import Home from "./pages/Home";
import EventDetailsPage from "./pages/EventDetails";
import SchedulePage from "./pages/Schedule";
import GalleryPage from "./pages/Gallery";
import RSVPPage from "./pages/RSVP";
import ContactPage from "./pages/Contact";
import GuestPassPage from "./pages/GuestPass";
import StaffCheckInPage from "./pages/StaffCheckIn";
import NotFoundPage from "./pages/NotFound";


export default function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to top on every route change.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [location.pathname]);

  return (
    <>
      <LoadingScreen show={loading} />
      <ParticlesBackground />
      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />
          <Route
            path="/event-details"
            element={
              <PageTransition>
                <EventDetailsPage />
              </PageTransition>
            }
          />
          <Route
            path="/schedule"
            element={
              <PageTransition>
                <SchedulePage />
              </PageTransition>
            }
          />
          <Route
            path="/gallery"
            element={
              <PageTransition>
                <GalleryPage />
              </PageTransition>
            }
          />

          <Route
            path="/upload"
            element={
              <PageTransition>
                <UploadPhotoPage />
              </PageTransition>
            }
          />

          <Route
            path="/guest-photos"
            element={
              <PageTransition>
                <GuestPhotosPage />
              </PageTransition>
            }
          />
          
          <Route
            path="/rsvp"
            element={
              <PageTransition>
                <RSVPPage />
              </PageTransition>
            }
          />
        <Route
            path="/contact"
            element={
              <PageTransition>
                <ContactPage />
              </PageTransition>
            }
          />
          <Route
            path="/pass/:code"
            element={
              <PageTransition>
                <GuestPassPage />
              </PageTransition>
            }
          />
          <Route
            path="/staff/checkin"
            element={
              <PageTransition>
                <StaffCheckInPage />
              </PageTransition>
            }
          />
          <Route
            path="*"
            element={
              <PageTransition>
                <NotFoundPage />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>

      <Footer />
      <BackToTop />
    </>
  );
}