"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLang } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { MEDIA } from "@/lib/content";

export function Stage() {
  const { t } = useLang();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);

  const toggle = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setStarted(true);
    } else {
      v.pause();
    }
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTime = () =>
      setProgress(v.duration ? (v.currentTime / v.duration) * 100 : 0);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("timeupdate", onTime);
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("timeupdate", onTime);
    };
  }, []);

  // Pause when scrolled out of view.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting && !v.paused) v.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    let ratio = (e.clientX - rect.left) / rect.width;
    if (document.documentElement.dir === "rtl") ratio = 1 - ratio;
    v.currentTime = Math.max(0, Math.min(1, ratio)) * v.duration;
  };

  return (
    <section
      id="stage"
      className="grain section relative overflow-hidden bg-[color:var(--bg-deep)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_50%_at_50%_0%,rgba(194,160,92,.16),transparent_60%),radial-gradient(45%_45%_at_10%_100%,rgba(169,108,131,.16),transparent_65%)]"
      />

      <div className="wrap relative">
        <SectionHeading
          eyebrow={t.stage.eyebrow}
          title={t.stage.title}
          intro={t.stage.intro}
          align="center"
          tone="dark"
        />

        <Reveal variant="scale" delay={120} className="mt-14">
          <div className="group relative mx-auto w-fit max-w-full">
            {/* Gold frame */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-3 rounded-[calc(var(--radius-lg)+10px)] border border-[rgba(230,211,168,.22)] sm:-inset-5"
            />

            <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-black shadow-[var(--shadow-lg)]">
              <video
                ref={videoRef}
                className="block max-h-[76vh] w-auto max-w-full"
                poster={MEDIA.stage}
                preload="metadata"
                muted
                playsInline
                onClick={toggle}
              >
                <source src={MEDIA.video} type="video/mp4" />
              </video>

              {/* Big play overlay */}
              <button
                type="button"
                onClick={toggle}
                aria-label={playing ? t.stage.pause : t.stage.play}
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                  playing
                    ? "opacity-0 focus-visible:opacity-100"
                    : "bg-[rgba(24,14,21,.42)] opacity-100"
                }`}
              >
                <span className="relative flex h-20 w-20 items-center justify-center rounded-full border border-[rgba(230,211,168,.5)] bg-[rgba(36,23,34,.6)] backdrop-blur-sm transition-transform duration-500 [transition-timing-function:var(--ease)] group-hover:scale-105">
                  {!playing && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full border border-[color:var(--gold)] [animation:pulseRing_2.4s_ease-out_infinite]"
                    />
                  )}
                  <PlayIcon />
                </span>
              </button>

              {/* Controls */}
              <div
                className={`absolute inset-x-0 bottom-0 flex items-center gap-4 bg-[linear-gradient(to_top,rgba(24,14,21,.9),transparent)] px-5 pb-4 pt-10 transition-opacity duration-400 ${
                  started ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                }`}
              >
                <button
                  type="button"
                  onClick={toggle}
                  aria-label={playing ? t.stage.pause : t.stage.play}
                  className="shrink-0 text-[color:var(--gold-light)] transition-colors duration-300 hover:text-white"
                >
                  {playing ? <PauseGlyph /> : <PlayGlyph />}
                </button>

                <div
                  onClick={seek}
                  role="presentation"
                  className="group/bar h-3 flex-1 cursor-pointer py-[5px]"
                >
                  <div className="h-[3px] w-full overflow-hidden rounded-full bg-[rgba(247,239,230,.2)]">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,var(--gold-deep),var(--gold-light))]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={muted ? t.stage.unmute : t.stage.mute}
                  className="shrink-0 text-[color:var(--gold-light)] transition-colors duration-300 hover:text-white"
                >
                  {muted ? <MutedGlyph /> : <SoundGlyph />}
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PlayIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="var(--gold-light)" aria-hidden="true">
      <path d="M8 5.2v13.6a.8.8 0 0 0 1.22.68l11-6.8a.8.8 0 0 0 0-1.36l-11-6.8A.8.8 0 0 0 8 5.2Z" />
    </svg>
  );
}
function PlayGlyph() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 4.5v15l13-7.5L7 4.5Z" />
    </svg>
  );
}
function PauseGlyph() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.5 4.5h4v15h-4zM13.5 4.5h4v15h-4z" />
    </svg>
  );
}
function SoundGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 5 6.5 9H3v6h3.5L11 19V5Z" />
      <path d="M15.5 9.2a4 4 0 0 1 0 5.6M18.3 6.5a8 8 0 0 1 0 11" />
    </svg>
  );
}
function MutedGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 5 6.5 9H3v6h3.5L11 19V5Z" />
      <path d="m16 10 4 4M20 10l-4 4" />
    </svg>
  );
}
