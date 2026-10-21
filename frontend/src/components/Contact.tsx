"use client";

import Image from "next/image";
import { useState } from "react";
import { useLang } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { MEDIA, SITE } from "@/lib/content";

export function Contact() {
  const { t, isAr } = useLang();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section id="contact" className="section relative overflow-hidden bg-[color:var(--bg)]">
      <div className="wrap">
        <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--line)] bg-[color:var(--bg-deep)] shadow-[var(--shadow-lg)]">
          {/* Backdrop photo */}
          <div aria-hidden="true" className="absolute inset-0">
            <Image
              src={MEDIA.backstage}
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-top opacity-[0.16]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(36,23,34,.96)_32%,rgba(51,32,47,.86))]" />
            <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_85%_20%,rgba(194,160,92,.2),transparent_65%)]" />
          </div>

          <div className="relative grid gap-12 px-7 py-16 sm:px-12 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-16">
            <div>
              <SectionHeading
                eyebrow={t.contact.eyebrow}
                title={t.contact.title}
                intro={t.contact.text}
                tone="dark"
              />

              <Reveal delay={240} className="mt-10">
                <span className="text-[0.66rem] uppercase tracking-[0.26em] text-[color:var(--gold-light)] rtl:text-[0.8rem] rtl:tracking-normal">
                  {t.contact.emailLabel}
                </span>
                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <a
                    href={`mailto:${SITE.email}`}
                    className="latin group relative text-[clamp(1rem,2.6vw,1.55rem)] text-[color:var(--ink-invert)] transition-colors duration-400 hover:text-[color:var(--gold-light)]"
                  >
                    {SITE.email}
                    <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-100 bg-[color:var(--gold)] transition-transform duration-500 group-hover:scale-x-0 rtl:origin-right" />
                  </a>

                  <button
                    type="button"
                    onClick={copy}
                    className="flex items-center gap-2 rounded-full border border-[color:var(--line-invert)] px-4 py-2 text-[0.72rem] text-[color:var(--gold-light)] transition-colors duration-400 hover:border-[color:var(--gold)] hover:bg-[rgba(194,160,92,.12)] rtl:text-[0.85rem]"
                  >
                    {copied ? <CheckIcon /> : <CopyIcon />}
                    {copied ? t.contact.copied : t.contact.copy}
                  </button>
                </div>

                <p className="mt-5 max-w-md text-[0.86rem] leading-[1.9] text-[rgba(203,182,191,.75)]">
                  {t.contact.bookingNote}
                </p>
              </Reveal>
            </div>

            {/* Side card */}
            <Reveal variant="right" delay={160} className="lg:self-center">
              <div className="rounded-[var(--radius)] border border-[color:var(--line-invert)] bg-[rgba(247,239,230,.05)] p-7 backdrop-blur-sm">
                <span className="text-[0.66rem] uppercase tracking-[0.26em] text-[color:var(--gold-light)] rtl:text-[0.8rem] rtl:tracking-normal">
                  {t.contact.followLabel}
                </span>

                <div className="mt-5 flex flex-col gap-3">
                  <SocialRow
                    href={SITE.instagram}
                    label="Instagram"
                    handle="@maryem_othmanii"
                    icon={<InstagramIcon />}
                  />
                  <SocialRow
                    href={SITE.youtube}
                    label="YouTube"
                    handle="@MariemOthmanii"
                    icon={<YoutubeIcon />}
                  />
                  <SocialRow
                    href={`mailto:${SITE.email}`}
                    label={isAr ? "البريد" : "Email"}
                    handle={isAr ? "إدارة الأعمال" : "Management"}
                    icon={<MailIcon />}
                  />
                </div>

                <div className="mt-7 flex items-center gap-3 border-t border-[color:var(--line-invert)] pt-6">
                  <Image
                    src={MEDIA.jusour}
                    alt={t.management.org}
                    width={120}
                    height={90}
                    className="h-11 w-auto rounded bg-white/95 p-1.5 object-contain"
                  />
                  <span className="text-[0.78rem] leading-relaxed text-[color:var(--ink-invert-soft)]">
                    {t.footer.managed}
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialRow({
  href,
  label,
  handle,
  icon,
}: {
  href: string;
  label: string;
  handle: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-4 rounded-xl border border-transparent px-3 py-3 transition-all duration-500 [transition-timing-function:var(--ease)] hover:border-[color:var(--line-invert)] hover:bg-[rgba(194,160,92,.08)]"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[color:var(--line-invert)] text-[color:var(--gold-light)] transition-colors duration-400 group-hover:border-[color:var(--gold)] group-hover:bg-[color:var(--gold)] group-hover:text-[#241722]">
        {icon}
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-[0.9rem] text-[color:var(--ink-invert)]">{label}</span>
        <span className="latin truncate text-[0.74rem] text-[color:var(--ink-invert-soft)]">
          {handle}
        </span>
      </span>
      <span className="ms-auto text-[color:var(--gold-light)] opacity-0 transition-all duration-500 group-hover:opacity-100">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="rtl:rotate-180">
          <path d="M5 12h13M12 5l7 7-7 7" />
        </svg>
      </span>
    </a>
  );
}

function CopyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <rect x="9" y="9" width="11" height="11" rx="2.5" />
      <path d="M15 5.5A2.5 2.5 0 0 0 12.5 3H6.5A2.5 2.5 0 0 0 4 5.5v6A2.5 2.5 0 0 0 6.5 14" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12.5 9.5 18 20 6.5" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function YoutubeIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="4.5" />
      <path d="M10 9.2v5.6l5-2.8-5-2.8Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="2.5" y="4.5" width="19" height="15" rx="3" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}
