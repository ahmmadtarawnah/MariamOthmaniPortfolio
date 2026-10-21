"use client";

import { useEffect, useState } from "react";
import { LogoDraw } from "./Logo";
import { useLang } from "./LanguageProvider";
import { markLoaded } from "@/lib/loaded";

const MIN_DURATION = 2900; // long enough for the logo to finish drawing
// Must outlast the panel transition (.2s delay + 1.05s) or the peel is cut off.
const PEEL_DURATION = 1300;

export function Preloader() {
  const { t, isAr } = useLang();
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  // No "already started" guard here: React re-runs this effect after the
  // StrictMode cleanup, and the run has to start over or the counter never
  // resumes and the loader sticks on screen.
  useEffect(() => {
    document.body.classList.add("is-locked");
    const start = performance.now();
    let raf = 0;
    let timer = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      // Ease out so the counter slows as it approaches 100.
      const linear = Math.min(elapsed / MIN_DURATION, 1);
      const eased = 1 - Math.pow(1 - linear, 2.2);
      setProgress(Math.round(eased * 100));
      if (linear < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setLeaving(true);
        timer = window.setTimeout(() => {
          document.body.classList.remove("is-locked");
          setGone(true);
          markLoaded();
        }, PEEL_DURATION);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      document.body.classList.remove("is-locked");
    };
  }, []);

  if (gone) return null;

  const name = t.loader.name;
  // Arabic is cursive: splitting it per character would break the joining
  // forms, so it staggers by word and only Latin staggers by letter.
  const parts = isAr ? name.split(" ") : name.split("");

  return (
    <div
      className={`pre ${leaving ? "pre-out" : ""}`}
      role="status"
      aria-live="polite"
      aria-label={`${t.loader.enter} ${progress}%`}
    >
      <div className="pre-panel pre-panel-a" />
      <div className="pre-panel pre-panel-b" />

      <div className="pre-inner">
        <LogoDraw size={132} />

        <h1 className={`pre-name font-display ${isAr ? "pre-name-ar" : ""}`}>
          {parts.map((part, i) => (
            <span
              key={`${part}-${i}`}
              style={{ animationDelay: `${1900 + i * (isAr ? 170 : 42)}ms` }}
            >
              {part === " " ? " " : part}
            </span>
          ))}
        </h1>

        <p className="pre-tag">{t.loader.tagline}</p>

        <div className="pre-track" aria-hidden="true">
          <span className="pre-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="pre-count latin" aria-hidden="true">
          {String(progress).padStart(3, "0")}
        </div>
      </div>

      <style>{`
        .pre {
          position: fixed;
          inset: 0;
          z-index: 200;
          display: grid;
          place-items: center;
          overflow: hidden;
          /* The two panels are the backdrop, so that peeling them away
             uncovers the page rather than this element's own background. */
          background: transparent;
        }
        .pre-inner {
          position: relative;
          z-index: 5;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.1rem;
          padding-inline: 1.5rem;
          transition: opacity .55s var(--ease), transform .55s var(--ease);
        }
        .pre-out .pre-inner { opacity: 0; transform: translateY(-18px); }

        /* Two panels peel away to reveal the page */
        .pre-panel {
          position: absolute;
          inset-inline: 0;
          height: 50.5%;
          overflow: hidden;
          background: var(--bg-deep);
          z-index: 1;
          transition: transform 1.05s cubic-bezier(.76,0,.24,1) .2s;
        }
        /* Each panel carries its half of one viewport-tall glow, so the two
           halves line up into a single wash while they are still closed. */
        .pre-panel::before {
          content: "";
          position: absolute;
          inset-inline: 0;
          height: 100vh;
          background:
            radial-gradient(60% 55% at 50% 38%, rgba(194,160,92,.17), transparent 70%),
            radial-gradient(40% 40% at 85% 85%, rgba(169,108,131,.14), transparent 70%);
        }
        .pre-panel-a { top: 0; }
        .pre-panel-a::before { top: 0; }
        .pre-panel-b { bottom: 0; }
        .pre-panel-b::before { bottom: 0; }
        .pre-out .pre-panel-a { transform: translateY(-100%); }
        .pre-out .pre-panel-b { transform: translateY(100%); }

        .pre-name {
          margin-top: .45rem;
          color: var(--ink-invert);
          font-size: clamp(1.6rem, 5.5vw, 2.5rem);
          letter-spacing: .18em;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
        .pre-name-ar { letter-spacing: 0; gap: .3em; }
        .pre-name span {
          opacity: 0;
          display: inline-block;
          animation: preChar .75s var(--ease) forwards;
        }
        @keyframes preChar {
          from { opacity: 0; transform: translateY(14px) rotateX(-55deg); filter: blur(5px); }
          to   { opacity: 1; transform: none; filter: blur(0); }
        }

        .pre-tag {
          color: var(--gold-light);
          font-size: .72rem;
          letter-spacing: .34em;
          text-transform: uppercase;
          opacity: 0;
          animation: preUp .8s var(--ease) 2.45s forwards;
        }
        html[dir="rtl"] .pre-tag { letter-spacing: .12em; font-size: .85rem; text-transform: none; }

        .pre-track {
          margin-top: .7rem;
          width: min(230px, 62vw);
          height: 1px;
          background: rgba(247,239,230,.16);
          overflow: hidden;
          opacity: 0;
          animation: preUp .8s var(--ease) 2.6s forwards;
        }
        .pre-fill {
          display: block;
          height: 100%;
          background: linear-gradient(90deg, var(--gold-deep), #f0e0bb, var(--gold));
          box-shadow: 0 0 12px rgba(230,211,168,.6);
        }
        .pre-count {
          font-size: .66rem;
          letter-spacing: .3em;
          color: rgba(203,182,191,.75);
          opacity: 0;
          animation: preUp .8s var(--ease) 2.7s forwards;
        }
        @keyframes preUp { from { opacity:0; transform: translateY(8px); } to { opacity:1; transform:none; } }

        @media (prefers-reduced-motion: reduce) {
          .pre-name span, .pre-tag, .pre-track, .pre-count { opacity: 1 !important; animation: none !important; }
        }
      `}</style>
    </div>
  );
}
