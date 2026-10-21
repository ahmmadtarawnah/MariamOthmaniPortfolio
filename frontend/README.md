# Mariam Othmani — Official Portfolio

موقع تعريفي للمطربة التونسية **مريم عثماني**، ثنائي اللغة (عربي RTL / إنجليزي LTR).

Built with Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS 4 · TypeScript.

## Run

```bash
npm run dev     # http://localhost:3000
npm run build
npm start
npm run lint
```

## Structure

| Path | Purpose |
| --- | --- |
| `src/lib/content.ts` | **All site text, in both languages** — edit here, not in components |
| `src/app/globals.css` | Design tokens (colours, type scale, motion) + shared component classes |
| `src/app/layout.tsx` | Fonts, metadata, the RTL/LTR bootstrap script |
| `src/components/` | One file per section |
| `public/media/` | Images + video served by the site (ASCII filenames) |

### Sections

`Preloader → Navbar → Hero → About (+stats) → Journey → Repertoire → Gallery → Stage (video) → Management → Contact → Footer`

## Language

Arabic is the default. The choice is stored in `localStorage` under `mo-lang` and applied to
`<html lang dir>` by an inline script in `layout.tsx` **before first paint**, so there is no flash
and no hydration mismatch. The toggle lives in the navbar.

To change the default, edit `DEFAULT_LANG` in `src/components/LanguageProvider.tsx`.

## Design tokens

Defined on `:root` in `globals.css`:

- Surfaces — `--bg` warm ivory, `--bg-alt` sand, `--bg-deep` deep plum
- Accents — `--gold` champagne, `--rose`, `--plum`
- Motion — `--ease`, plus `[data-reveal]` for scroll reveals

Scroll reveals are driven by one `IntersectionObserver` in `src/components/Reveal.tsx`; wrap any
element in `<Reveal variant="up|left|right|scale" delay={ms}>`. Everything respects
`prefers-reduced-motion`.

## Logo

`src/components/Logo.tsx` — an SVG emblem whose "M" is drawn as a single waveform inside a
champagne ring. Three exports: `LogoMark` (idle, animated ring + equalizer), `LogoDraw`
(self-drawing, used by the preloader), `Wordmark` (emblem + name). The favicon is
`src/app/icon.svg`.

## Media

`public/media/` holds the ASCII-named copies the site uses. The originals remain in
`public/mariam othmani pics/` — that folder is **not referenced by the site** and can be deleted
before deploying (it duplicates the ~30 MB video).

## Contact details in the site

- Business email: `business@officialmariamothmani.com`
- Management: مؤسسة جسور الإنجاز (logo at `public/media/jusour-logo.png`)
- Socials: configured in `SITE` at the top of `src/lib/content.ts`
