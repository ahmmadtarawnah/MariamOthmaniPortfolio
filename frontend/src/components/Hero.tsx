"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLang } from "./LanguageProvider";
import { MEDIA } from "@/lib/content";
import { onLoaded } from "@/lib/loaded";

export function Hero() {
  const { t, isAr } = useLang();
  const [ready, setReady] = useState(false);
  const portraitRef = useRef<HTMLDivElement>(null);

  // Start the entrance once the preloader has peeled away. The fallback keeps
  // the hero from ever being stranded invisible if that signal never arrives.
  useEffect(() => {
    const go = () => setReady(true);
    const off = onLoaded(go);
    const fallback = window.setTimeout(go, 5500);
    return () => {
      off();
      window.clearTimeout(fallback);
    };
  }, []);

  // Gentle parallax on the portrait.
  useEffect(() => {
    const el = portraitRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 700);
        el.style.transform = `translate3d(0, ${y * 0.07}px, 0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const step = (i: number) => ({
    opacity: ready ? 1 : 0,
    transform: ready ? "none" : "translateY(26px)",
    filter: ready ? "blur(0)" : "blur(7px)",
    transition: `opacity .95s var(--ease) ${i * 110}ms, transform 1.05s var(--ease) ${i * 110}ms, filter .95s var(--ease) ${i * 110}ms`,
  });

  return (
    <section
      id="home"
      className="grain relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[color:var(--bg-deep)] pb-20 pt-[calc(var(--nav-h)+3rem)]"
    >
      {/* Atmosphere */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_18%_22%,rgba(194,160,92,.20),transparent_62%),radial-gradient(55%_55%_at_88%_72%,rgba(169,108,131,.22),transparent_65%),linear-gradient(160deg,#241722_0%,#33202f_55%,#20141e_100%)]" />
        <div className="absolute -left-24 top-1/4 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(230,211,168,.10),transparent_68%)] blur-2xl anim-float" />
        <div
          className="absolute -right-20 bottom-8 h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(169,108,131,.14),transparent_68%)] blur-2xl anim-float"
          style={{ animationDelay: "2.5s" }}
        />
      </div>

      <div className="wrap grid w-full items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Copy */}
        <div className="relative z-10 max-w-xl">
          <div style={step(0)} className="flex items-center gap-3">
            <span className="h-px w-10 bg-[color:var(--gold)]" />
            <span className="eyebrow !text-[color:var(--gold-light)]">
              {t.hero.eyebrow}
            </span>
          </div>

          <h1
            style={step(1)}
            className="font-display h-xl mt-5 text-[color:var(--ink-invert)]"
          >
            <span className="block">{isAr ? "مريم" : "Mariam"}</span>
            <span className="gold-text block">{isAr ? "عثماني" : "Othmani"}</span>
          </h1>

          <p
            style={step(2)}
            className={`mt-5 text-[color:var(--gold-light)] ${
              isAr ? "text-lg" : "text-base tracking-[0.04em]"
            }`}
          >
            {t.hero.role}
          </p>

          <p
            style={step(3)}
            className="lede mt-6 max-w-lg !text-[color:var(--ink-invert-soft)]"
          >
            {t.hero.lede}
          </p>

          <div style={step(4)} className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#about" className="btn btn-on-dark">
              {t.hero.ctaListen}
            </a>
            <a href="#contact" className="btn btn-on-dark !border-transparent !bg-[linear-gradient(120deg,var(--gold-deep),var(--gold))] !text-[#241722]">
              {t.hero.ctaBook}
            </a>
          </div>

          {/* Equalizer */}
          <div
            style={step(5)}
            aria-hidden="true"
            className="mt-12 flex h-9 items-end gap-[5px]"
          >
            {[0.45, 0.8, 0.35, 1, 0.6, 0.9, 0.3, 0.7, 0.5, 0.85, 0.4, 0.65].map(
              (h, i) => (
                <span
                  key={i}
                  className="eq-bar w-[3px] rounded-full bg-[linear-gradient(to_top,var(--gold-deep),var(--gold-light))]"
                  style={{
                    height: `${h * 100}%`,
                    animationDelay: `${i * 95}ms`,
                    animationDuration: `${900 + (i % 4) * 230}ms`,
                  }}
                />
              ),
            )}
          </div>
        </div>

        {/* Portrait */}
        <div
          ref={portraitRef}
          className="relative mx-auto w-full max-w-[26rem] lg:max-w-none"
          style={{
            opacity: ready ? 1 : 0,
            transition: "opacity 1.3s var(--ease) 350ms",
          }}
        >
          <div className="relative">
            {/* Rotating ring */}
            <div
              aria-hidden="true"
              className="absolute -inset-5 rounded-[999px_999px_28px_28px] border border-[rgba(230,211,168,.18)] sm:-inset-8"
              style={{ animation: "spinSlow 60s linear infinite" }}
            />
            <div
              aria-hidden="true"
              className="absolute -inset-2 rounded-[999px_999px_24px_24px] border border-[rgba(230,211,168,.3)]"
            />

            <div className="framed !rounded-[999px_999px_24px_24px] aspect-[4/5] w-full">
              <Image
                src={MEDIA.stage}
                alt={isAr ? "مريم عثماني على المسرح" : "Mariam Othmani on stage"}
                fill
                sizes="(max-width: 1024px) 90vw, 46vw"
                className="object-cover object-[center_18%]"
                preload
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(36,23,34,.6),transparent_45%)]" />
            </div>

            {/* Award badge */}
            <div
              className="absolute -bottom-5 start-0 flex items-center gap-3 rounded-2xl border border-[rgba(230,211,168,.28)] bg-[rgba(36,23,34,.82)] px-4 py-3 backdrop-blur-md sm:-bottom-6 sm:-start-6"
              style={{
                opacity: ready ? 1 : 0,
                transform: ready ? "none" : "translateY(16px)",
                transition: "opacity .9s var(--ease) 1.1s, transform .9s var(--ease) 1.1s",
              }}
            >
              <MicIcon />
              <span className="flex flex-col leading-tight">
                <span className="text-[0.95rem] font-medium text-[color:var(--gold-light)]">
                  {isAr ? "الميكروفون الذهبي" : "Golden Microphone"}
                </span>
                <span className="latin text-[0.62rem] tracking-[0.18em] text-[color:var(--ink-invert-soft)]">
                  2023 · TUNISIAN SONG FESTIVAL
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        className="absolute bottom-16 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[color:var(--ink-invert-soft)] transition-colors duration-300 hover:text-[color:var(--gold-light)] md:flex"
        style={{ opacity: ready ? 1 : 0, transition: "opacity 1s var(--ease) 1.4s" }}
      >
        <span className="text-[0.62rem] uppercase tracking-[0.3em]">
          {t.hero.scroll}
        </span>
        <span className="relative h-9 w-px overflow-hidden bg-[rgba(230,211,168,.25)]">
          <span className="absolute inset-x-0 top-0 h-3 bg-[color:var(--gold-light)] [animation:scrollCue_2s_ease-in-out_infinite]" />
        </span>
      </a>

      {/* Marquee strip */}
      <div className="absolute inset-x-0 bottom-0 z-10 overflow-hidden border-y border-[rgba(230,211,168,.14)] bg-[rgba(36,23,34,.55)] py-2.5 backdrop-blur-sm">
        <div className="flex w-max [animation:marquee_34s_linear_infinite]">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center">
              {t.hero.marquee.map((m, i) => (
                <span key={`${dup}-${i}`} className="flex items-center">
                  <span
                    className={`px-6 text-[color:var(--gold-light)] ${
                      isAr
                        ? "text-sm"
                        : "text-[0.7rem] uppercase tracking-[0.28em]"
                    }`}
                  >
                    {m}
                  </span>
                  <span className="h-1 w-1 rotate-45 bg-[color:var(--gold)] opacity-60" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scrollCue {
          0% { transform: translateY(-100%); }
          60%,100% { transform: translateY(300%); }
        }
      `}</style>
    </section>
  );
}

function MicIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--gold)"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect x="9" y="2" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v4M8.5 22h7" />
    </svg>
  );
}
