# Reyes Roofing LLC — Redesign Demo (Design)

Date: 2026-11-16
Status: awaiting approval

## Intent

Build a one-page redesign demo of reyesroofingllc.co as a sales asset. It is linked
from a cold email to the owner. The owner opens it on a phone, from the email,
and decides in under a minute whether the design is good enough to reply.

The demo must feel like *their* site, not a generic template: their real photos,
phone number, hours, licenses, services and cities. It replaces the current
GoHighLevel template look with a bold, premium visual identity.

## Goals

- Look unmistakably better than the live site within 5 seconds, on a phone.
- One clear action everywhere: call (480) 828-3040 or request an estimate.
- Load fast on mobile (no base64 images, local fonts, optimized photos).
- Preserve their SEO assets (service and city pages link to the live site).
- Be honest: no invented reviews, stats, years in business or testimonials.

## Non-goals

- No CMS, backend, real form submission or CRM integration.
- No location/service subpages (nav links point to the live site or page anchors).
- Not deployed to their domain; demo lives on a neutral URL.

## Anti-goals

- Anything that reads as a template (stock photos, generic hero video, fake badges).
- Invented social proof. If we don't have it, show credentials and real work instead.

## Constraints

- Astro 7 + Tailwind CSS 4 (matches the existing `redrocksglamping-demo` setup).
- Static output, deployable to Render as a static site.
- Mobile-first; 390px is the design target, desktop is the enhancement.
- Content sourced from the live site (homepage, about, contact) — real facts only.

## Approaches considered

1. **Bold premium (chosen)** — dark, high-contrast, full-bleed photography, large
   display type, deep-red accent. Biggest perceived jump from the current
   template; best cold-email wow rate for contractor redesigns.
2. **Warm family-local** — light, neighborly, softer palette. More authentic,
   weaker as a first-impression pitch.
3. **Conversion landing page** — minimal hero → proof → form. Fast to build but
   looks like the template being pitched against.

## Design

### Visual system

- Palette: charcoal `#0B0B0C`, warm off-white `#FAF7F2`, deep logo red `#B3261E`
  as accent (matches their logo, truck and team shirts — no competing orange),
  stone neutrals, hairline `white/10` borders on dark sections.
- Type: Archivo (700/800, tight tracking) for display, Inter for body, self-hosted
  via Fontsource. No Google Fonts network request.
- Layout: asymmetric two-column hero, full-bleed photo bands, oversized section
  labels in small caps, generous vertical rhythm (py-24 desktop / py-16 mobile).
- Motion: restrained. Scroll-reveal (opacity + 12px rise) via IntersectionObserver,
  hover lift on cards. Respect `prefers-reduced-motion`.

### Sections (single page, in order)

1. **Utility bar** — phone, "Open 7 days · 8am–10pm", AZ ROC #352179.
2. **Sticky header** — their logo (as supplied, small, never in the hero), Services /
   Our Work / About / Areas, Call button. The logo is the recognition anchor and is
   left unmodified; no redraw, no recolour.
3. **Hero** — full-bleed roof photo, dark gradient, eyebrow "Family-owned ·
   Phoenix, AZ", H1 "Phoenix roofs, built for 115°.", one-line subhead on Arizona
   heat/wind/monsoon, primary "Get a free estimate", secondary "Call (480) 828-3040",
   credential row: family-owned · AZ ROC #352179 / #314230 · BBB A+ · open 7 days.
4. **Systems strip** — asphalt shingle · tile · concrete tile · flat / low-slope.
   Text chips, not manufacturer logos: the "manufacturer documents" on their site
   explicitly do not establish contractor certifications.
5. **Services** — four large cards: Residential, Commercial, Repairs & Leaks,
   Roof Replacement. Real photos, numbered, one line each.
6. **Our work** — horizontal scroll gallery of their real project photos.
7. **Why Reyes** — three points restating their own approach copy from /about:
   understand the concern, evaluate the roofing system, recommend repair *or*
   replacement based on condition — "without turning every roofing concern into the
   same recommendation" (their words).
8. **Warning signs** — compact six-item checklist (leaks, shingles, tiles, flashing,
   deterioration, recurring problems), each anchored to Services.
9. **Process** — four steps: tell us → inspect → plan → build.
10. **Service areas** — Phoenix + 23 real cities as pills linking to their live
    location pages (keeps their SEO work intact).
11. **FAQ** — six real questions with answers written from their content.
12. **Final CTA + estimate form** — name, phone, email, service, message. Demo-only:
    validates, shows success state, sends nothing. README says so.
13. **Footer** — hours, phone, AZ ROC and BBB references (linked), nav, areas,
    "Unofficial redesign concept — not affiliated with Reyes Roofing LLC."
    "Redesign concept" line.

### Content rules

Allowed: business name, phone, hours, both AZ ROC numbers (as identifiers, never
"active"/"verified"), BBB A+ accredited since Nov 2017 (their published profile),
GAF contractor profile ID 1142375 (stated as a profile reference, not
"certified"), family-owned description, service list, 24 city names, roofing
system types, real photography. Forbidden: review quotes, star ratings, project
counts, founding year, pricing claims, guarantees not stated on their site, and
any "Certified"/"Insured"/"Bonded" claim — their own credentials page marks
insurance and bond documents as not reviewed. The logo's baked-in "licensed,
bonded & insured" line is theirs, not repeated elsewhere in our copy.

Every page carries a footer line: "Unofficial redesign concept — not affiliated
with Reyes Roofing LLC."

### Assets

Download their CDN photos (7 project/truck/team images) into `src/assets`, served
through Astro `<Image>` as AVIF/WebP with explicit dimensions. The 1.2 MB logo is
downloaded once and served at ~160×54 via Astro's image pipeline. No remote image
dependencies at runtime.

### SEO / metadata

Title, description, canonical (demo URL), OG image from hero photo, LocalBusiness
JSON-LD with phone, opening hours (Mo–Su 08:00–22:00), areaServed, license IDs.

### Map of the build

```
reyesroofing-demo/
  astro.config.mjs        # tailwind vite plugin, site url
  render.yaml             # static site
  src/
    styles/global.css     # tokens, base, utilities
    layouts/Base.astro    # head, fonts, JSON-LD, header/footer slots
    components/           # Header, Hero, TrustStrip, Services, Gallery,
                          # WhyUs, WarningSigns, Process, Areas, Faq,
                          # EstimateForm, Footer, Reveal
    pages/index.astro     # composes sections, all copy lives here
    assets/               # real photos
  public/                 # favicon, og image
  README.md               # how to run, what's real, demo form caveat
```

## Success criteria

- Lighthouse mobile: performance ≥ 95, accessibility ≥ 95.
- No horizontal scroll at 360px; hero CTA visible without scrolling on a 390×844
  phone.
- Every link and phone number works; call button is `tel:+14808283040`.
- Owner can recognize their business in the first screen: name, photo, phone, city.

## Deploy

Render static site (`type: web`, `runtime: static`), build `npm run build`,
publish `dist/`, on a free `*.onrender.com` subdomain. `noindex, nofollow` meta
and `robots.txt` disallow — the demo must not compete with their real site in
search or create duplicate local-business listings. `render.yaml` committed so it
can be redeployed. Not linked to their domain. Footer carries the
"unofficial redesign concept" disclaimer.

## Left to the builder

Exact photo crops, hover timings, FAQ answer wording, form field order, and the
grain/noise texture treatment.
