import { useEffect, useRef, useState } from "react";

/**
 * Attaches an IntersectionObserver to the returned ref and reports whether
 * the element is currently in view. Used to drive Framer Motion
 * scroll-reveal animations without re-triggering on every scroll by default.
 *
 * @param {Object} options
 * @param {number} options.threshold - fraction of element visible to trigger (0-1)
 * @param {string} options.rootMargin - margin around root, e.g. "-10% 0px"
 * @param {boolean} options.once - whether to stop observing after first reveal
 */
export default function useInView({ threshold = 0.2, rootMargin = "0px", once = true } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(node);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}
