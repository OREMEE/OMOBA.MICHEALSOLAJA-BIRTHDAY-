/**
 * Lightweight className combiner — filters falsy values and joins with space.
 * Avoids pulling in clsx/tailwind-merge as a dependency.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
