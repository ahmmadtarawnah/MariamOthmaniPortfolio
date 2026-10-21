"use client";

import Image from "next/image";
import { useLang } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { MEDIA, SITE } from "@/lib/content";

export function Management() {
  const { t, isAr } = useLang();

  return (
    <section
      id="management"
      className="section relative overflow-hidden bg-[color:var(--bg-alt)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -start-24 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(16,150,80,.08),transparent_70%)] blur-2xl"
      />

      <div className="wrap relative grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* Logo panel */}
        <Reveal variant="left" className="order-2 lg:order-1">
          <div className="group relative mx-auto max-w-sm">
            <span
              aria-hidden="true"
              className="absolute -inset-3 rounded-[calc(var(--radius-lg)+8px)] border border-[color:var(--line-strong)] transition-transform duration-700 [transition-timing-function:var(--ease)] group-hover:-rotate-1"
            />
            <div className="relative flex flex-col items-center gap-6 rounded-[var(--radius-lg)] bg-white px-10 py-12 shadow-[var(--shadow-md)]">
              <Image
                src={MEDIA.jusour}
                alt={t.management.org}
                width={300}
                height={230}
                className="h-auto w-full max-w-[220px] object-contain transition-transform duration-700 [transition-timing-function:var(--ease)] group-hover:scale-[1.04]"
              />
              <span className="rule-gold w-24" />
              <span className="text-center text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--ink-faint)] rtl:text-[0.85rem] rtl:tracking-normal">
                {isAr ? "إدارة الأعمال الحصرية" : "Exclusive management"}
              </span>
            </div>
          </div>
        </Reveal>

        {/* Copy */}
        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow={t.management.eyebrow}
            title={t.management.title}
          />

          <Reveal delay={120} className="mt-6">
            <p className="font-display text-xl text-[color:var(--plum)]">
              {t.management.org}
            </p>
            <p className="mt-1.5 text-[0.9rem] text-[color:var(--gold-deep)]">
              {t.management.role}
            </p>
          </Reveal>

          <Reveal as="p" delay={200} className="lede mt-6">
            {t.management.text}
          </Reveal>

          <Reveal delay={280} className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${SITE.email}`}
              className="btn btn-solid"
            >
              {t.management.cta}
              <ArrowOut />
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="latin text-sm text-[color:var(--ink-soft)] underline decoration-[color:var(--gold)] decoration-1 underline-offset-[6px] transition-colors duration-300 hover:text-[color:var(--gold-deep)]"
            >
              {SITE.email}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ArrowOut() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="rtl:rotate-180"
    >
      <path d="M5 12h13M12 5l7 7-7 7" />
    </svg>
  );
}
