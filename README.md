# Reyes Roofing LLC — concept redesign

A pitch demo for [reyesroofingllc.co](https://reyesroofingllc.co/), rebuilt as a one-page
Astro + Tailwind site. Built to be linked from a cold email: it should read as
*their* business in the first screen and load fast on a phone.

Live: https://inodepi.github.io/reyesroofing-demo/

This is an independent concept, not affiliated with Reyes Roofing LLC. The name,
logo and photography belong to them. Every page is `noindex` so it cannot compete
with their real site in search.

## What the redesign changes

1. **One page, one funnel.** The current site spreads 25 service pages and 24 city
   pages across a mega-menu. Here the whole business fits in one scroll: services →
   work → approach → warning signs → process → areas → FAQ → estimate.
2. **A hero that shows a roof.** The current hero is a text block next to an hours
   table. This one is their own sunset roof photo with a single phone number above
   the fold.
3. **Real proof, no invented proof.** No fake reviews or star ratings. Credentials
   are limited to what their own site publishes: AZ ROC #352179 / #314230, BBB A+
   accredited since 2017, family-owned, open 7 days.
4. **Cities and services link back to the live site.** The 24 location pages keep
   their SEO value instead of being duplicated here.
5. **Performance.** The current site inlines several manufacturer logos as
   multi-hundred-KB base64 PNGs. Here every photo is local, resized and served as
   WebP through `astro:assets`; Lighthouse mobile: 98 performance, 100
   accessibility, 100 best practices.
6. **A form that ends in a phone call.** The estimate form validates on the client
   and, being a demo, ends with the real phone number.

## Run it

```bash
npm install
npm run dev      # http://localhost:4321/reyesroofing-demo/
npm run build    # static output in dist/
npm run preview
```

## Structure

```
src/
├── layouts/Base.astro        head, fonts, JSON-LD, noindex, scroll reveal
├── data/site.ts              single source of facts: phone, hours, licenses,
│                             services, photos, cities, FAQ, process
├── components/
│   ├── Header.astro          utility bar, sticky nav, call CTA
│   ├── Hero.astro            photo, headline, credentials
│   ├── Systems.astro         shingle / tile / concrete tile / flat
│   ├── Services.astro        four service cards
│   ├── Work.astro            swipeable project gallery
│   ├── WhyUs.astro           their /about approach, restated
│   ├── WarningSigns.astro    six things worth a look
│   ├── Process.astro         four steps
│   ├── Areas.astro           24 city links to the live site
│   ├── Faq.astro             native <details>, no JS
│   ├── Estimate.astro        demo form + success state
│   └── Footer.astro          hours, phone, credentials, disclaimer
├── assets/                   their photos, resized, optimized at build
├── styles/global.css         tokens, type, buttons, reveal
└── pages/index.astro
```

## Design tokens

| Token | Hex | Use |
|---|---|---|
| `ink` | `#0b0b0c` | dark bands, header |
| `ink-soft` | `#141416` | warning-signs band |
| `bone` | `#faf7f2` | light bands, text on dark |
| `red` | `#b3261e` | primary actions (matches their logo) |
| `red-bright` | `#e0492f` | hover, accents on dark |
| `clay` | `#7d6f63` | muted labels on light |

Display: Archivo · Body: Inter, self-hosted through Fontsource.

## Demo caveats

- The estimate form sends nothing. Submitting shows the success state and the real
  phone number. Marked in the code at `src/components/Estimate.astro`.
- No reviews, ratings, project counts, founding year or insurance/bond claims are
  used anywhere, because the current site does not publish verifiable ones.
- The logo's "licensed, bonded & insured" line is part of their existing artwork
  and is not repeated in the site copy.

## Deploy

Pushes to `main` build and deploy through GitHub Pages
(`.github/workflows/deploy.yml`). The `base` in `astro.config.mjs` must match the
repository name.
