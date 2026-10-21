"use client";

import { useEffect, useState } from "react";
import { Wordmark } from "./Logo";
import { useLang } from "./LanguageProvider";
import { SECTION_IDS, type SectionId } from "@/lib/content";

export function Navbar() {
  const { t, isAr, toggle } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<SectionId>("home");
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (y / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id as SectionId);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.2, 0.6] },
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("is-locked", open);
    return () => document.body.classList.remove("is-locked");
  }, [open]);

  const links = SECTION_IDS.map((id) => ({ id, label: t.nav[id] }));

  // Before the glass panel fades in, the header sits on the dark hero and has
  // to borrow the inverted palette or it is unreadable.
  const onDark = !scrolled;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[90] transition-[background,box-shadow,border-color] duration-500 ${
          scrolled
            ? "glass border-b border-[color:var(--line)] shadow-[0_6px_30px_rgba(44,33,39,.07)]"
            : "nav-dark border-b border-transparent"
        }`}
      >
        <div className="wrap flex h-[var(--nav-h)] items-center justify-between gap-4">
          <a
            href="#home"
            className="shrink-0 transition-opacity duration-300 hover:opacity-75"
            aria-label={isAr ? "الرئيسية" : "Home"}
          >
            <Wordmark isAr={isAr} size={38} tone={onDark ? "invert" : "ink"} />
          </a>

          <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="navlink"
                data-active={active === l.id}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={toggle}
              className={`group relative flex items-center gap-2 overflow-hidden rounded-full border px-4 py-2 text-[0.72rem] font-medium tracking-[0.12em] transition-colors duration-500 hover:border-[color:var(--gold)] ${
                onDark
                  ? "border-[color:var(--line-invert)] text-[color:var(--ink-invert)]"
                  : "border-[color:var(--line-strong)] text-[color:var(--ink)]"
              }`}
              aria-label={`Switch language to ${isAr ? "English" : "العربية"}`}
            >
              <span className="absolute inset-0 -z-10 translate-y-full bg-[linear-gradient(120deg,var(--gold-deep),var(--gold))] transition-transform duration-500 [transition-timing-function:var(--ease)] group-hover:translate-y-0" />
              <GlobeIcon />
              <span className="latin">{isAr ? "EN" : "ع"}</span>
            </button>

            <a
              href="#contact"
              className={`btn hidden !px-6 !py-2.5 md:inline-flex ${
                onDark
                  ? "!border-transparent !bg-[linear-gradient(120deg,var(--gold-deep),var(--gold))] !text-[#241722]"
                  : "btn-solid"
              }`}
            >
              {isAr ? "تواصل" : "Contact"}
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-500 lg:hidden ${
                onDark && !open
                  ? "border-[color:var(--line-invert)]"
                  : "border-[color:var(--line-strong)]"
              }`}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span
                className={`relative block h-3 w-4 ${
                  onDark && !open
                    ? "text-[color:var(--ink-invert)]"
                    : "text-[color:var(--ink)]"
                }`}
              >
                <span
                  className={`absolute inset-x-0 top-0 h-px bg-current transition-transform duration-400 [transition-timing-function:var(--ease)] ${
                    open ? "translate-y-[6px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute inset-x-0 top-[6px] h-px bg-current transition-opacity duration-300 ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute inset-x-0 top-[12px] h-px bg-current transition-transform duration-400 [transition-timing-function:var(--ease)] ${
                    open ? "-translate-y-[6px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        <div
          className="h-px origin-[left] bg-[linear-gradient(90deg,var(--gold-deep),var(--gold),var(--gold-light))] transition-[width] duration-150"
          style={{ width: `${progress}%` }}
          aria-hidden="true"
        />
      </header>

      {/* Mobile sheet */}
      <div
        className={`fixed inset-0 z-[85] lg:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-[rgba(36,23,34,.5)] backdrop-blur-sm transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Close menu"
        />
        <nav
          /* The shadow is dropped while closed: the panel sits exactly above
             the viewport, so its blur would otherwise bleed across the top. */
          className={`absolute inset-x-0 top-0 origin-top bg-[color:var(--bg)] px-7 pb-10 pt-[calc(var(--nav-h)+1.5rem)] transition-transform duration-[650ms] [transition-timing-function:var(--ease)] ${
            open ? "translate-y-0 shadow-[var(--shadow-lg)]" : "-translate-y-full"
          }`}
        >
          <ul className="flex flex-col">
            {links.map((l, i) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between border-b border-[color:var(--line)] py-4"
                  style={{
                    opacity: open ? 1 : 0,
                    transform: open ? "none" : "translateY(10px)",
                    // Longhands only: mixing `transition` with `transitionDelay`
                    // in one style object makes the delay unreliable on rerender.
                    transitionProperty: "opacity, transform",
                    transitionDuration: "500ms",
                    transitionTimingFunction: "var(--ease)",
                    transitionDelay: open ? `${i * 45}ms` : "0ms",
                  }}
                >
                  <span
                    className={`font-display text-xl ${
                      active === l.id
                        ? "text-[color:var(--gold-deep)]"
                        : "text-[color:var(--ink)]"
                    }`}
                  >
                    {l.label}
                  </span>
                  <span className="latin text-[0.65rem] tracking-[0.2em] text-[color:var(--ink-faint)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <a
            href={`mailto:business@officialmariamothmani.com`}
            className="latin mt-7 block text-sm text-[color:var(--gold-deep)]"
          >
            business@officialmariamothmani.com
          </a>
        </nav>
      </div>
    </>
  );
}

function GlobeIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9.5" />
      <path d="M2.5 12h19M12 2.5c2.6 2.6 3.9 6 3.9 9.5s-1.3 6.9-3.9 9.5c-2.6-2.6-3.9-6-3.9-9.5S9.4 5.1 12 2.5Z" />
    </svg>
  );
}
