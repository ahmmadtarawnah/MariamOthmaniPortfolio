"use client";

import Image from "next/image";
import { useLang } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { MEDIA } from "@/lib/content";

export function About() {
  const { t, isAr } = useLang();

  return (
    <>
      {/* Stats strip */}
      <section className="relative border-b border-[color:var(--line)] bg-[color:var(--bg-alt)]">
        <div className="wrap grid grid-cols-2 divide-x divide-[color:var(--line)] rtl:divide-x-reverse lg:grid-cols-4">
          {t.stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 110}
              variant="scale"
              className="flex flex-col items-center gap-1.5 px-3 py-8 text-center sm:py-10"
            >
              <span className="font-display text-3xl text-[color:var(--gold-deep)] sm:text-4xl">
                {s.value}
              </span>
              <span
                className={`text-[color:var(--ink-soft)] ${
                  isAr
                    ? "text-[0.82rem]"
                    : "text-[0.66rem] uppercase tracking-[0.2em]"
                }`}
              >
                {s.label}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="about" className="section bg-[color:var(--bg)]">
        <div className="wrap grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          {/* Images */}
          <div className="relative mx-auto w-full max-w-[26rem] lg:mx-0 lg:max-w-none">
            <Reveal variant="left" className="framed aspect-[4/5] w-full">
              <Image
                src={MEDIA.interview}
                alt={
                  isAr
                    ? "مريم عثماني في لقاء تلفزيوني"
                    : "Mariam Othmani during a television interview"
                }
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover"
              />
            </Reveal>

            <Reveal
              variant="scale"
              delay={260}
              className="absolute -bottom-10 end-0 w-[46%] max-w-[12rem] translate-x-0 lg:-end-10"
            >
              <div className="framed !rounded-2xl aspect-[3/4] w-full border-4 border-[color:var(--bg)]">
                <Image
                  src={MEDIA.award}
                  alt={
                    isAr
                      ? "مريم عثماني تتسلّم جائزة الميكروفون الذهبي"
                      : "Mariam Othmani receiving the Golden Microphone"
                  }
                  fill
                  sizes="200px"
                  className="object-cover object-top"
                />
              </div>
            </Reveal>

            <Reveal
              delay={380}
              className="mt-16 flex items-center gap-2 text-[0.72rem] text-[color:var(--ink-faint)] lg:mt-20"
            >
              <span className="h-px w-6 bg-[color:var(--gold)]" />
              {t.about.captionAward}
            </Reveal>
          </div>

          {/* Copy */}
          <div>
            <SectionHeading
              eyebrow={t.about.eyebrow}
              title={
                isAr ? (
                  t.about.title
                ) : (
                  <>
                    Mariam <span className="gold-text">Othmani</span>
                  </>
                )
              }
            />

            <div className="mt-8 flex flex-col gap-5">
              {t.about.paragraphs.map((p, i) => (
                <Reveal key={i} as="p" delay={i * 120} className="lede">
                  {p}
                </Reveal>
              ))}
            </div>

            <Reveal
              delay={200}
              variant="scale"
              className="relative mt-10 rounded-[var(--radius)] border-s-2 border-[color:var(--gold)] bg-[color:var(--bg-alt)] px-7 py-7"
            >
              <QuoteIcon />
              <p
                className={`font-display text-[color:var(--plum)] ${
                  isAr ? "text-xl leading-[1.9]" : "text-2xl leading-snug"
                }`}
              >
                {t.about.pull}
              </p>
            </Reveal>

            <Reveal delay={260} className="mt-9 flex flex-wrap gap-3">
              {(isAr
                ? ["طرب عربي", "أغنية تونسية", "أداء حي", "ذا فويس"]
                : ["Arabic tarab", "Tunisian song", "Live performance", "The Voice"]
              ).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[color:var(--line-strong)] px-4 py-2 text-[0.74rem] text-[color:var(--ink-soft)] transition-colors duration-400 hover:border-[color:var(--gold)] hover:text-[color:var(--gold-deep)]"
                >
                  {tag}
                </span>
              ))}
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function QuoteIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="var(--gold)"
      aria-hidden="true"
      className="mb-3 opacity-35"
    >
      <path d="M9.5 5.5C6.4 7 4.6 9.7 4.6 13v5.5h6.2V12H7.9c0-2.2 1-3.8 2.9-4.7l-1.3-1.8Zm9.3 0C15.7 7 13.9 9.7 13.9 13v5.5h6.2V12h-2.9c0-2.2 1-3.8 2.9-4.7l-1.3-1.8Z" />
    </svg>
  );
}
