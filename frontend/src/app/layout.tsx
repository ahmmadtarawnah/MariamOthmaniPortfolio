import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, El_Messiri, Tajawal } from "next/font/google";
import "./globals.css";
import {
  LanguageProvider,
  LANG_BOOTSTRAP_SCRIPT,
} from "@/components/LanguageProvider";
import { CONTENT } from "@/lib/content";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

const messiri = El_Messiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-messiri",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://officialmariamothmani.com"),
  title: `${CONTENT.ar.meta.title} · ${CONTENT.en.meta.title}`,
  description: CONTENT.ar.meta.description,
  keywords: [
    "مريم عثماني",
    "Mariam Othmani",
    "Mariem Othmani",
    "مطربة تونسية",
    "Tunisian singer",
    "ذا فويس أحلى صوت",
    "The Voice Ahla Sawt",
    "الميكروفون الذهبي",
    "جسور الإنجاز",
  ],
  authors: [{ name: "Ahmad Altarawneh" }],
  openGraph: {
    title: CONTENT.ar.meta.title,
    description: CONTENT.ar.meta.description,
    type: "profile",
    locale: "ar_TN",
    alternateLocale: "en_US",
    images: [{ url: "/media/mariam-stage.jpg", width: 1060, height: 1280 }],
  },
  twitter: {
    card: "summary_large_image",
    title: CONTENT.en.meta.title,
    description: CONTENT.en.meta.description,
    images: ["/media/mariam-stage.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#241722",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${cormorant.variable} ${jost.variable} ${messiri.variable} ${tajawal.variable} h-full`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: LANG_BOOTSTRAP_SCRIPT }} />
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
