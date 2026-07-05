import React from "react";
import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";

/**
 * Elegant gold-gradient call-to-action. Renders a <Link> when `to` is
 * provided, an <a> when `href` is provided, otherwise a <button>.
 */
export default function GoldButton({
  children,
  to,
  href,
  variant = "solid",
  className = "",
  icon: Icon,
  ...props
}) {
  const classes = cn(variant === "solid" ? "btn-gold" : "btn-ghost", className);
  const content = (
    <>
      <span>{children}</span>
      {Icon && <Icon size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={cn(classes, "group")} {...props}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cn(classes, "group")} {...props}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" className={cn(classes, "group")} {...props}>
      {content}
    </button>
  );
}
