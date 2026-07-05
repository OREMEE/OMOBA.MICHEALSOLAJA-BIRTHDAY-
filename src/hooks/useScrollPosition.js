import { useEffect, useState } from "react";

/**
 * Returns the current vertical scroll position (px) and a `passedThreshold`
 * boolean once the user scrolls beyond `threshold`. Used to shrink/tint the
 * sticky navbar and reveal the back-to-top button.
 */
export default function useScrollPosition(threshold = 60) {
  const [scrollY, setScrollY] = useState(0);
  const [passedThreshold, setPassedThreshold] = useState(false);

  useEffect(() => {
    let ticking = false;

    function handleScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          setScrollY(y);
          setPassedThreshold(y > threshold);
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return { scrollY, passedThreshold };
}
