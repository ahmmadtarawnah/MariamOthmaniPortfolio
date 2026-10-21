"use client";

import { useId } from "react";

type Tone = "gold" | "ink" | "invert";

const TONES: Record<Tone, { a: string; b: string; c: string }> = {
  gold: { a: "#9c7c3c", b: "#e6d3a8", c: "#c2a05c" },
  ink: { a: "#5a3450", b: "#c2a05c", c: "#2c2127" },
  invert: { a: "#e6d3a8", b: "#fffdf8", c: "#c2a05c" },
};

/**
 * The emblem: a champagne ring enclosing an "M" that is drawn as a single
 * waveform — the monogram and the sound it stands for are the same stroke.
 * Flanking bars read as an equalizer; the ring carries two cut arcs so the
 * mark keeps air around the letter.
 */
export function LogoMark({
  size = 48,
  tone = "gold",
  animated = false,
  className = "",
}: {
  size?: number;
  tone?: Tone;
  animated?: boolean;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const g = `grad-${uid}`;
  const c = TONES[tone];

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`${className} ${animated ? "logo-animated" : ""}`}
      role="img"
      aria-label="Mariam Othmani"
      fill="none"
    >
      <defs>
        <linearGradient id={g} x1="8%" y1="0%" x2="92%" y2="100%">
          <stop offset="0%" stopColor={c.a} />
          <stop offset="48%" stopColor={c.b} />
          <stop offset="100%" stopColor={c.c} />
        </linearGradient>
      </defs>

      {/* Outer ring, cut at the sides */}
      <circle
        className="lg-ring"
        cx="50"
        cy="50"
        r="45"
        stroke={`url(#${g})`}
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeDasharray="118 24"
        strokeDashoffset="59"
        opacity="0.85"
      />
      {/* Inner hairline ring */}
      <circle
        className="lg-ring2"
        cx="50"
        cy="50"
        r="39.5"
        stroke={`url(#${g})`}
        strokeWidth="0.5"
        opacity="0.4"
      />

      {/* Monogram M, drawn as a waveform */}
      <path
        className="lg-m"
        d="M28 68 V34 L50 55 L72 34 V68"
        stroke={`url(#${g})`}
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Equalizer flanks */}
      <g stroke={`url(#${g})`} strokeWidth="2.2" strokeLinecap="round">
        <line className="lg-bar lg-bar-1" x1="19" y1="44" x2="19" y2="56" />
        <line className="lg-bar lg-bar-2" x1="81" y1="44" x2="81" y2="56" />
      </g>

      {/* Crown diamond + base dot */}
      <path
        className="lg-dot"
        d="M50 11.5 L53 15.5 L50 19.5 L47 15.5 Z"
        fill={`url(#${g})`}
      />
      <circle className="lg-dot" cx="50" cy="85" r="1.9" fill={`url(#${g})`} />

      <style>{`
        .logo-animated .lg-ring {
          stroke-dasharray: 118 24;
          animation: lgSpin 26s linear infinite;
          transform-origin: 50% 50%;
        }
        .logo-animated .lg-bar-1 { animation: lgPulse 1.6s var(--ease-soft) infinite; transform-origin: 19px 50px; }
        .logo-animated .lg-bar-2 { animation: lgPulse 1.6s var(--ease-soft) .35s infinite; transform-origin: 81px 50px; }
        @keyframes lgSpin { to { transform: rotate(360deg); } }
        @keyframes lgPulse { 0%,100% { transform: scaleY(.45); } 50% { transform: scaleY(1.25); } }
        @media (prefers-reduced-motion: reduce) {
          .logo-animated .lg-ring,
          .logo-animated .lg-bar-1,
          .logo-animated .lg-bar-2 { animation: none; }
        }
      `}</style>
    </svg>
  );
}

/**
 * The drawing version used by the preloader: ring, monogram and ornaments
 * draw themselves on, in sequence.
 */
export function LogoDraw({ size = 150 }: { size?: number }) {
  const uid = useId().replace(/:/g, "");
  const g = `dgrad-${uid}`;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className="logo-draw"
      role="img"
      aria-label="Mariam Othmani"
      fill="none"
    >
      <defs>
        <linearGradient id={g} x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#9c7c3c" />
          <stop offset="45%" stopColor="#f0e0bb" />
          <stop offset="100%" stopColor="#c2a05c" />
        </linearGradient>
      </defs>

      <circle
        className="dl-ring"
        cx="50"
        cy="50"
        r="45"
        stroke={`url(#${g})`}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <circle
        className="dl-ring2"
        cx="50"
        cy="50"
        r="39.5"
        stroke={`url(#${g})`}
        strokeWidth="0.5"
      />
      <path
        className="dl-m"
        d="M28 68 V34 L50 55 L72 34 V68"
        stroke={`url(#${g})`}
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g stroke={`url(#${g})`} strokeWidth="2.2" strokeLinecap="round">
        <line className="dl-bar" x1="19" y1="44" x2="19" y2="56" />
        <line className="dl-bar dl-bar-b" x1="81" y1="44" x2="81" y2="56" />
      </g>
      <path
        className="dl-orn"
        d="M50 11.5 L53 15.5 L50 19.5 L47 15.5 Z"
        fill={`url(#${g})`}
      />
      <circle className="dl-orn" cx="50" cy="85" r="1.9" fill={`url(#${g})`} />

      <style>{`
        .logo-draw .dl-ring {
          stroke-dasharray: 283;
          stroke-dashoffset: 283;
          animation: dlDraw 1.5s cubic-bezier(.65,0,.35,1) .1s forwards;
          transform: rotate(-90deg);
          transform-origin: 50% 50%;
        }
        .logo-draw .dl-ring2 {
          stroke-dasharray: 248;
          stroke-dashoffset: 248;
          opacity: .5;
          animation: dlDraw 1.4s cubic-bezier(.65,0,.35,1) .45s forwards;
          transform: rotate(-90deg);
          transform-origin: 50% 50%;
        }
        .logo-draw .dl-m {
          stroke-dasharray: 135;
          stroke-dashoffset: 135;
          animation: dlDraw 1.15s cubic-bezier(.65,0,.35,1) .75s forwards;
        }
        .logo-draw .dl-bar {
          opacity: 0;
          transform-origin: 19px 50px;
          animation: dlPop .7s var(--ease) 1.65s forwards;
        }
        .logo-draw .dl-bar-b {
          transform-origin: 81px 50px;
          animation-delay: 1.8s;
        }
        .logo-draw .dl-orn {
          opacity: 0;
          animation: dlFade .8s var(--ease) 1.95s forwards;
        }
        @keyframes dlDraw { to { stroke-dashoffset: 0; } }
        @keyframes dlPop { from { opacity:0; transform: scaleY(0); } to { opacity:1; transform: scaleY(1); } }
        @keyframes dlFade { to { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) {
          .logo-draw * { animation: none !important; stroke-dashoffset: 0 !important; opacity: 1 !important; }
        }
      `}</style>
    </svg>
  );
}

/** Emblem + name, used in the header and footer. */
export function Wordmark({
  isAr,
  tone = "ink",
  size = 40,
  stacked = false,
}: {
  isAr: boolean;
  tone?: Tone;
  size?: number;
  stacked?: boolean;
}) {
  const invert = tone === "invert";
  return (
    <span
      className={`flex items-center gap-3 ${stacked ? "flex-col gap-2 text-center" : ""}`}
    >
      <LogoMark size={size} tone={invert ? "invert" : "gold"} animated />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display ${isAr ? "text-[1.12rem]" : "text-[1.18rem] tracking-[0.1em]"} ${
            invert ? "text-[color:var(--ink-invert)]" : "text-[color:var(--ink)]"
          }`}
        >
          {isAr ? "مريم عثماني" : "MARIAM OTHMANI"}
        </span>
        <span
          className={`mt-1 ${isAr ? "text-[0.64rem]" : "text-[0.57rem] tracking-[0.34em]"} uppercase ${
            invert
              ? "text-[color:var(--gold-light)]"
              : "text-[color:var(--gold-deep)]"
          }`}
        >
          {isAr ? "مطربة تونسية" : "TUNISIAN SINGER"}
        </span>
      </span>
    </span>
  );
}
