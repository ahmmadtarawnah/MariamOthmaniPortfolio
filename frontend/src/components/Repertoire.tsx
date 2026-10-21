"use client";

import { useLang } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Repertoire() {
  const { t, isAr } = useLang();

  return (
    <section
      id="repertoire"
      className="grain section relative overflow-hidden bg-[color:var(--bg-deep)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_15%_10%,rgba(169,108,131,.18),transparent_62%),radial-gradient(50%_50%_at_90%_90%,rgba(194,160,92,.14),transparent_65%)]"
      />

      <div className="wrap relative">
        <SectionHeading
          eyebrow={t.repertoire.eyebrow}
          title={t.repertoire.title}
          intro={t.repertoire.intro}
          tone="dark"
        />

        <ul className="mt-14 border-t border-[color:var(--line-invert)]">
          {t.repertoire.items.map((item, i) => (
            <Reveal
              key={item.title}
              as="li"
              delay={i * 120}
              className="group relative border-b border-[color:var(--line-invert)]"
            >
              {/* Hover wash */}
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-left scale-x-0 bg-[linear-gradient(90deg,rgba(194,160,92,.12),transparent)] transition-transform duration-700 [transition-timing-function:var(--ease)] group-hover:scale-x-100 rtl:origin-right"
              />

              <div className="relative grid items-center gap-x-6 gap-y-3 px-1 py-7 sm:px-3 md:grid-cols-[auto_1fr_auto] md:py-8">
                <span className="latin font-display text-2xl text-[color:var(--gold)] opacity-60 transition-opacity duration-500 group-hover:opacity-100 md:text-3xl">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3
                      className={`font-display text-[color:var(--ink-invert)] transition-colors duration-500 group-hover:text-[color:var(--gold-light)] ${
                        isAr ? "text-2xl" : "text-3xl"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <span className="rounded-full border border-[color:var(--line-invert)] px-3 py-0.5 text-[0.66rem] uppercase tracking-[0.16em] text-[color:var(--gold-light)] rtl:text-[0.75rem] rtl:tracking-normal">
                      {item.kind}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[0.95rem] text-[color:var(--ink-invert-soft)]">
                    {item.sub}
                  </p>
                  <p className="mt-3 max-w-xl text-[0.86rem] leading-[1.85] text-[rgba(203,182,191,.72)]">
                    {item.note}
                  </p>
                </div>

                <div className="flex items-center gap-4 md:flex-col md:items-end md:gap-3">
                  <span
                    className={`text-[color:var(--gold-light)] ${
                      isAr
                        ? "text-[0.85rem]"
                        : "text-[0.7rem] uppercase tracking-[0.18em]"
                    }`}
                  >
                    {item.meta}
                  </span>
                  <WaveGlyph />
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function WaveGlyph() {
  return (
    <span
      aria-hidden="true"
      className="flex h-5 items-end gap-[3px] opacity-45 transition-opacity duration-500 group-hover:opacity-100"
    >
      {[0.4, 0.95, 0.6, 1, 0.5].map((h, i) => (
        <span
          key={i}
          className="eq-bar w-[2px] rounded-full bg-[color:var(--gold)]"
          style={{
            height: `${h * 100}%`,
            animationDelay: `${i * 130}ms`,
            animationDuration: `${1000 + i * 180}ms`,
          }}
        />
      ))}
    </span>
  );
}
