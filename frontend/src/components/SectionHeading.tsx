"use client";

import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "start",
  tone = "light",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  align?: "start" | "center";
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div
      className={`flex flex-col ${
        align === "center" ? "items-center text-center" : "items-start"
      }`}
    >
      <Reveal className="flex items-center gap-3">
        <span
          className={`h-px w-9 ${dark ? "bg-[color:var(--gold)]" : "bg-[color:var(--gold-deep)]"}`}
        />
        <span className={`eyebrow ${dark ? "!text-[color:var(--gold-light)]" : ""}`}>
          {eyebrow}
        </span>
        {align === "center" && (
          <span
            className={`h-px w-9 ${dark ? "bg-[color:var(--gold)]" : "bg-[color:var(--gold-deep)]"}`}
          />
        )}
      </Reveal>

      <Reveal
        as="h2"
        delay={90}
        className={`font-display h-lg mt-4 ${
          dark ? "text-[color:var(--ink-invert)]" : "text-[color:var(--ink)]"
        }`}
      >
        {title}
      </Reveal>

      {intro && (
        <Reveal
          as="p"
          delay={180}
          className={`lede mt-5 max-w-2xl ${
            dark ? "!text-[color:var(--ink-invert-soft)]" : ""
          }`}
        >
          {intro}
        </Reveal>
      )}
    </div>
  );
}
