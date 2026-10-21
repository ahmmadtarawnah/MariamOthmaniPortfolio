"use client";

import { useEffect, type ElementType, type ReactNode } from "react";

/**
 * One observer for the whole page: every [data-reveal] node gets .is-in the
 * first time it crosses into view, then stops being watched.
 */
export function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    const scan = () => {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)")
        .forEach((el) => io.observe(el));
    };

    scan();
    // Catch nodes added by later renders (language switch re-renders content).
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  variant?: "up" | "left" | "right" | "scale";
  delay?: number;
  className?: string;
  id?: string;
};

export function Reveal({
  children,
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className = "",
  id,
}: RevealProps) {
  return (
    <Tag
      id={id}
      className={className}
      data-reveal={variant}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
