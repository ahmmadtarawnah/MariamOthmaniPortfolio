"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import { Wordmark } from "./Logo";
import { useLang } from "./LanguageProvider";
import { MEDIA, SECTION_IDS, SITE } from "@/lib/content";

const BUILD_YEAR = 2026;
// The page is prerendered, so the clock is only read in the browser: the server
// snapshot is the build year and React swaps in the real one after hydration.
const noSubscribe = () => () => {};
const currentYear = () => new Date().getFullYear();
const buildYear = () => BUILD_YEAR;

export function Footer() {
  const { t, isAr } = useLang();
  const year = useSyncExternalStore(noSubscribe, currentYear, buildYear);

  return (
    <footer className="grain relative overflow-hidden bg-[color:var(--bg-deep)] pt-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(194,160,92,.12),transparent_60%)]"
      />

      <div className="wrap relative">
        <div className="grid gap-12 pb-14 md:grid-cols-[1.3fr_0.8fr_1fr]">
          {/* Brand */}
          <div>
            <Wordmark isAr={isAr} tone="invert" size={44} />
            <p className="mt-5 max-w-xs text-[0.88rem] leading-[1.95] text-[color:var(--ink-invert-soft)]">
              {t.footer.tagline}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <IconLink href={SITE.instagram} label="Instagram">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
                </svg>
              </IconLink>
              <IconLink href={SITE.youtube} label="YouTube">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <rect x="2" y="5" width="20" height="14" rx="4.5" />
                  <path d="M10 9.2v5.6l5-2.8-5-2.8Z" fill="currentColor" stroke="none" />
                </svg>
              </IconLink>
              <IconLink href={`mailto:${SITE.email}`} label="Email">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <rect x="2.5" y="4.5" width="19" height="15" rx="3" />
                  <path d="m3.5 7 8.5 6 8.5-6" />
                </svg>
              </IconLink>
            </div>
          </div>

          {/* Links */}
          <nav>
            <h3 className="text-[0.66rem] uppercase tracking-[0.26em] text-[color:var(--gold-light)] rtl:text-[0.85rem] rtl:tracking-normal">
              {t.footer.nav}
            </h3>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5 md:grid-cols-1">
              {SECTION_IDS.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="group inline-flex items-center gap-2 text-[0.88rem] text-[color:var(--ink-invert-soft)] transition-colors duration-400 hover:text-[color:var(--gold-light)]"
                  >
                    <span className="h-px w-0 bg-[color:var(--gold)] transition-[width] duration-400 group-hover:w-3" />
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Management */}
          <div>
            <h3 className="text-[0.66rem] uppercase tracking-[0.26em] text-[color:var(--gold-light)] rtl:text-[0.85rem] rtl:tracking-normal">
              {t.management.eyebrow}
            </h3>
            <div className="mt-5 flex items-start gap-4 rounded-[var(--radius)] border border-[color:var(--line-invert)] bg-[rgba(247,239,230,.04)] p-4">
              <Image
                src={MEDIA.jusour}
                alt={t.management.org}
                width={130}
                height={100}
                className="h-12 w-auto shrink-0 rounded bg-white/95 p-1.5 object-contain"
              />
              <div className="min-w-0">
                <p className="text-[0.9rem] text-[color:var(--ink-invert)]">
                  {t.management.org}
                </p>
                <a
                  href={`mailto:${SITE.email}`}
                  className="latin mt-1 block truncate text-[0.74rem] text-[color:var(--gold-light)] transition-opacity duration-300 hover:opacity-75"
                >
                  {SITE.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="rule-gold opacity-40" />

        <div className="flex flex-col items-center justify-between gap-4 py-7 text-center md:flex-row md:text-start">
          <p className="text-[0.78rem] text-[color:var(--ink-invert-soft)]">
            © {year}{" "}
            {isAr ? "مريم عثماني" : "Mariam Othmani"} —{" "}
            {t.footer.rights}
          </p>

          <p className="order-3 text-[0.78rem] text-[color:var(--ink-invert-soft)] md:order-2">
            <span className="latin">
              Powered by{" "}
              <span className="relative inline-block font-medium text-[color:var(--gold-light)]">
                {SITE.developer}
                <span className="absolute inset-x-0 -bottom-0.5 h-px bg-[linear-gradient(90deg,transparent,var(--gold),transparent)]" />
              </span>
            </span>
          </p>

          <a
            href="#home"
            className="group order-2 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.2em] text-[color:var(--gold-light)] transition-opacity duration-300 hover:opacity-75 md:order-3 rtl:text-[0.85rem] rtl:tracking-normal"
          >
            {t.footer.back}
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--line-invert)] transition-transform duration-500 [transition-timing-function:var(--ease)] group-hover:-translate-y-0.5">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--line-invert)] text-[color:var(--gold-light)] transition-all duration-500 [transition-timing-function:var(--ease)] hover:-translate-y-0.5 hover:border-[color:var(--gold)] hover:bg-[color:var(--gold)] hover:text-[#241722]"
    >
      {children}
    </a>
  );
}
