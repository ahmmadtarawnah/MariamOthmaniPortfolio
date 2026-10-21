"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Journey() {
  const { t, isAr } = useLang();
  const lineRef = useRef<HTMLDivElement>(null);
  const [fill, setFill] = useState(0);

  // The gold thread fills as the section scrolls past the middle of the screen.
  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const mid = window.innerHeight * 0.58;
        const pct = ((mid - r.top) / r.height) * 100;
        setFill(Math.max(0, Math.min(100, pct)));
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="journey"
      className="section relative overflow-hidden bg-[color:var(--bg-alt)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-32 top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(194,160,92,.12),transparent_70%)] blur-2xl"
      />

      <div className="wrap">
        <SectionHeading
          eyebrow={t.journey.eyebrow}
          title={t.journey.title}
          intro={t.journey.intro}
          align="center"
        />

        <div ref={lineRef} className="relative mt-16 md:mt-20">
          {/* Rail */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 start-[11px] w-px bg-[color:var(--line-strong)] md:start-1/2 md:-translate-x-1/2 rtl:md:translate-x-1/2"
          >
            <div
              className="w-px bg-[linear-gradient(to_bottom,var(--gold-light),var(--gold),var(--gold-deep))]"
              style={{ height: `${fill}%`, transition: "height .25s linear" }}
            />
          </div>

          <ol className="flex flex-col gap-10 md:gap-4">
            {t.journey.items.map((item, i) => {
              const right = i % 2 === 1;
              return (
                <li
                  key={`${item.year}-${item.title}`}
                  className="relative grid grid-cols-1 items-center gap-x-12 ps-10 md:grid-cols-2 md:ps-0"
                >
                  {/* Node */}
                  <span
                    aria-hidden="true"
                    className="absolute start-0 top-6 z-10 flex h-[23px] w-[23px] items-center justify-center md:start-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 rtl:md:translate-x-1/2"
                  >
                    <span className="absolute inset-0 rounded-full bg-[color:var(--gold)] opacity-30 [animation:pulseRing_2.6s_ease-out_infinite]" />
                    <span className="relative h-[11px] w-[11px] rounded-full bg-[color:var(--bg-alt)] ring-2 ring-[color:var(--gold)]" />
                  </span>

                  <Reveal
                    variant={right ? "right" : "left"}
                    delay={60}
                    className={
                      right
                        ? "md:col-start-2 md:ps-10 md:py-6"
                        : "md:col-start-1 md:pe-10 md:text-end md:py-6"
                    }
                  >
                    <article className="card p-6 sm:p-7">
                      <div
                        className={`flex items-center gap-3 ${
                          right ? "" : "md:justify-end"
                        }`}
                      >
                        <span className="rounded-full bg-[color:var(--plum)] px-3 py-1 text-[0.66rem] uppercase tracking-[0.16em] text-[color:var(--ink-invert)] rtl:tracking-normal rtl:text-[0.75rem]">
                          {item.tag}
                        </span>
                        <span className="font-display text-xl text-[color:var(--gold-deep)]">
                          {item.year}
                        </span>
                      </div>

                      <h3
                        className={`font-display mt-3 text-[color:var(--ink)] ${
                          isAr ? "text-xl" : "text-2xl"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p className="mt-2.5 text-[0.95rem] leading-[1.9] text-[color:var(--ink-soft)]">
                        {item.text}
                      </p>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
