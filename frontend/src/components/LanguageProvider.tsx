"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react";
import { CONTENT, type Lang } from "@/lib/content";

const STORAGE_KEY = "mo-lang";
const DEFAULT_LANG: Lang = "ar";

type Ctx = {
  lang: Lang;
  dir: "rtl" | "ltr";
  isAr: boolean;
  t: (typeof CONTENT)[Lang];
  setLang: (l: Lang) => void;
  toggle: () => void;
};

const LanguageContext = createContext<Ctx | null>(null);

function applyToDocument(lang: Lang) {
  const el = document.documentElement;
  el.lang = lang;
  el.dir = lang === "ar" ? "rtl" : "ltr";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return DEFAULT_LANG;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "en" || stored === "ar" ? stored : DEFAULT_LANG;
  });

  // Runs before paint, and re-applies after React's dev remount clears <html> attrs.
  useLayoutEffect(() => {
    applyToDocument(lang);
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const toggle = useCallback(() => {
    setLangState((prev) => {
      const next: Lang = prev === "ar" ? "en" : "ar";
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* storage unavailable */
      }
      return next;
    });
  }, []);

  const value: Ctx = {
    lang,
    dir: lang === "ar" ? "rtl" : "ltr",
    isAr: lang === "ar",
    t: CONTENT[lang],
    setLang,
    toggle,
  };

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}

/**
 * Sets lang/dir on <html> while the HTML is still parsing, so the first paint
 * already matches the stored preference. Mirrors the lazy useState initializer
 * above, so React's initial render agrees with the DOM.
 */
export const LANG_BOOTSTRAP_SCRIPT = `(function(){try{var l=localStorage.getItem("${STORAGE_KEY}");if(l!=="en"&&l!=="ar")l="${DEFAULT_LANG}";var e=document.documentElement;e.lang=l;e.dir=l==="ar"?"rtl":"ltr"}catch(e){}})()`;
