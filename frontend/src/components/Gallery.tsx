"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useLang } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const SHAPES = [
  "sm:col-span-7 aspect-[4/5] sm:aspect-[5/6]",
  "sm:col-span-5 aspect-[4/5] sm:aspect-[4/5]",
  "sm:col-span-5 aspect-[4/5] sm:aspect-[4/5]",
  "sm:col-span-7 aspect-[4/5] sm:aspect-[5/6]",
];

export function Gallery() {
  const { t, isAr } = useLang();
  const [open, setOpen] = useState<number | null>(null);
  const items = t.gallery.items;

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) =>
      setOpen((i) => (i === null ? null : (i + d + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (open === null) return;
    document.body.classList.add("is-locked");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(isAr ? -1 : 1);
      if (e.key === "ArrowLeft") step(isAr ? 1 : -1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("is-locked");
    };
  }, [open, close, step, isAr]);

  return (
    <section id="gallery" className="section bg-[color:var(--bg)]">
      <div className="wrap">
        <SectionHeading
          eyebrow={t.gallery.eyebrow}
          title={t.gallery.title}
          intro={t.gallery.intro}
          align="center"
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-12 sm:gap-6">
          {items.map((img, i) => (
            <Reveal
              key={img.src}
              variant="scale"
              delay={i * 110}
              className={SHAPES[i % SHAPES.length]}
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="framed group block h-full w-full cursor-zoom-in !rounded-[var(--radius-lg)]"
                aria-label={img.caption}
              >
                <Image
                  src={img.src}
                  alt={img.caption}
                  fill
                  sizes="(max-width: 640px) 92vw, 45vw"
                  className="object-cover"
                />
                <span className="absolute inset-0 bg-[linear-gradient(to_top,rgba(36,23,34,.78),rgba(36,23,34,.08)_48%,transparent)] opacity-80 transition-opacity duration-700 group-hover:opacity-95" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-start">
                  <span className="translate-y-1 text-[color:var(--ink-invert)] opacity-90 transition-all duration-700 [transition-timing-function:var(--ease)] group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="block text-[0.6rem] uppercase tracking-[0.26em] text-[color:var(--gold-light)] rtl:text-[0.7rem] rtl:tracking-normal">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-display mt-1 block ${isAr ? "text-lg" : "text-xl"}`}
                    >
                      {img.caption}
                    </span>
                  </span>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgba(230,211,168,.4)] text-[color:var(--gold-light)] opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <ExpandIcon />
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {open !== null && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={items[open].caption}
        >
          <button
            type="button"
            onClick={close}
            aria-label={t.gallery.close}
            className="absolute inset-0 cursor-zoom-out bg-[rgba(24,14,21,.93)] backdrop-blur-md anim-fade-in"
          />

          <div className="relative z-10 flex max-h-full w-full max-w-4xl flex-col items-center gap-4 anim-fade-up">
            <div className="relative max-h-[72vh] w-full overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)]">
              <Image
                key={items[open].src}
                src={items[open].src}
                alt={items[open].caption}
                width={1400}
                height={1750}
                sizes="(max-width: 900px) 92vw, 900px"
                className="max-h-[72vh] w-full object-contain"
              />
            </div>

            <p className="font-display text-center text-lg text-[color:var(--ink-invert)]">
              {items[open].caption}
            </p>

            <div className="flex items-center gap-3">
              <LightboxBtn onClick={() => step(-1)} label={t.gallery.prev}>
                <ArrowIcon dir="start" />
              </LightboxBtn>
              <span className="latin text-xs tracking-[0.22em] text-[color:var(--ink-invert-soft)]">
                {String(open + 1).padStart(2, "0")} /{" "}
                {String(items.length).padStart(2, "0")}
              </span>
              <LightboxBtn onClick={() => step(1)} label={t.gallery.next}>
                <ArrowIcon dir="end" />
              </LightboxBtn>
            </div>
          </div>

          <button
            type="button"
            onClick={close}
            aria-label={t.gallery.close}
            className="absolute end-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(230,211,168,.3)] text-[color:var(--gold-light)] transition-colors duration-400 hover:bg-[color:var(--gold)] hover:text-[#241722] sm:end-8 sm:top-8"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}

function LightboxBtn({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(230,211,168,.3)] text-[color:var(--gold-light)] transition-all duration-400 hover:scale-105 hover:bg-[color:var(--gold)] hover:text-[#241722]"
    >
      {children}
    </button>
  );
}

function ArrowIcon({ dir }: { dir: "start" | "end" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={dir === "start" ? "rtl:rotate-180" : "rotate-180 rtl:rotate-0"}
    >
      <path d="M15 5l-7 7 7 7" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 9V4h5M20 15v5h-5M20 9V4h-5M4 15v5h5" />
    </svg>
  );
}
