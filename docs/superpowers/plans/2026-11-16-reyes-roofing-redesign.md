# Reyes Roofing Redesign Demo — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a one-page, mobile-first Astro + Tailwind redesign of reyesroofingllc.co that reads as a premium version of the real business, ready to link from a cold email.

**Architecture:** Static Astro page. All facts (phone, hours, licenses, services, cities, FAQ) live in one typed data module; sections are small components fed from it. Photos are local, optimized through `astro:assets`. Scroll reveal is one inline IntersectionObserver in the base layout, no JS framework.

**Tech Stack:** Astro 7, Tailwind CSS 4 (`@tailwindcss/vite`), Fontsource variable fonts, TypeScript data module, GitHub Pages deploy workflow.

**Spec:** `docs/superpowers/specs/2026-11-16-reyes-roofing-redesign-design.md`

## Global Constraints

- Accent `#B3261E`, charcoal `#0B0B0C`, bone `#FAF7F2`; no orange anywhere.
- Phone `(480) 828-3040` / `tel:+14808283040` on every CTA.
- Hours: Mon–Sun 8AM–10PM. AZ ROC #352179 / #314230 (identifiers only, never "active"). BBB A+ accredited since Nov 13, 2017.
- Forbidden copy: reviews, star ratings, project counts, founding year, "GAF Certified", "insured", "bonded", guarantees.
- Footer disclaimer verbatim: `Unofficial redesign concept — not affiliated with Reyes Roofing LLC.`
- `<meta name="robots" content="noindex, nofollow">` and `public/robots.txt` disallow all.
- Mobile target 390×844; no horizontal scroll at 360px; hero CTA visible without scrolling.
- All photos local in `src/assets`, served via `astro:assets`. No base64, no remote images.

## Review Focus

- **Long city list on mobile** — 24 pills must wrap cleanly, never overflow or shrink text below 14px.
- **FAQ accordion without JS** — `<details>/<summary>` must open at 360px, long answers must not clip.
- **Logo on dark header** — the 2170×725 red/chrome PNG must not load oversized or sit on a background that makes it unreadable.
- **Form submit** — missing fields, bad phone, double submit must never produce a silent nothing; success state must be reachable on a phone.
- **Reduced motion / no JS** — content must be fully visible if the observer script never runs.

---

### Task 1: Scaffold, tokens, fonts, deploy config

**Files:**
- Create: `reyesroofing-demo/package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`, `.github/workflows/deploy.yml`, `public/robots.txt`, `src/styles/global.css`, `src/pages/index.astro` (placeholder), `docs/` already exists.

**Interfaces — Produces:** `global.css` tokens `--color-ink: #0B0B0C`, `--color-bone: #FAF7F2`, `--color-red: #B3261E`, `--color-red-bright: #E0492F`, `--font-display: "Archivo Variable"`, `--font-sans: "Inter Variable"`, utilities `.wrap`, `.btn-red`, `.btn-outline`, `.eyebrow`, `.reveal` / `.reveal.is-in`.

- [ ] **Step 1:** Write `package.json` with `astro ^7.4.12`, `@tailwindcss/vite ^4.3.5`, `tailwindcss ^4.3.5`, `@fontsource-variable/archivo`, `@fontsource-variable/inter`; scripts `dev`, `build`, `preview`, `check`.
- [ ] **Step 2:** `npm install`; confirm `node_modules/astro` exists.
- [ ] **Step 3:** `astro.config.mjs` — `site: 'https://inodepi.github.io'`, `base: '/reyesroofing-demo'`, tailwind vite plugin.
- [ ] **Step 4:** `global.css` — Tailwind import, `@theme` tokens above, base body/h tags, `.wrap` max 80rem, focus-visible ring, `.reveal { opacity: 0; transform: translateY(12px) }` with `@media (prefers-reduced-motion: reduce)` override to visible, `.no-js .reveal { opacity: 1; transform: none }`.
- [ ] **Step 5:** GitHub Pages workflow — `npm ci && npm run build`, upload `dist`, deploy with `actions/deploy-pages`. `public/robots.txt` — `User-agent: *` / `Disallow: /`.
- [ ] **Step 6:** Verify: `npm run build` exits 0 and `dist/index.html` exists.

### Task 2: Content module + Base layout

**Files:**
- Create: `src/data/site.ts`, `src/layouts/Base.astro`
- Modify: `src/pages/index.astro`

**Interfaces — Produces:**
```ts
export const site = { name, phone, phoneHref, hours, licenseA, licenseB, bbbSince, disclaimer }
export const services: { title, blurb, href, img }[]        // 4 items
export const work: { src, alt }[]                            // 8 photos
export const warnings: { title, body, href }[]               // 6 items
export const cities: { name, href }[]                        // 24 items
export const faqs: { q, a }[]                                // 6 items
export const process: { step, title, body }[]                // 4 items
```
`Base.astro` props: `{ title: string; description: string; ogImage?: ImageMetadata }`.

- [ ] **Step 1:** Write `site.ts` with only spec-approved facts (see Global Constraints). City `href`s point at the live `https://reyesroofingllc.co/<city>-roofing` URLs.
- [ ] **Step 2:** Write `Base.astro`: `<html lang="en" class="no-js">`, head with title/description/canonical/`noindex, nofollow`/OG tags, Fontsource imports, `global.css` import, LocalBusiness JSON-LD (name, phone, `openingHoursSpecification` Mo–Su 08:00–22:00, `areaServed: Arizona`, no fabricated address/ratings), inline script that removes `no-js` and adds `.is-in` on `[data-reveal]` via IntersectionObserver (guard `matchMedia('(prefers-reduced-motion: reduce)')`).
- [ ] **Step 3:** `index.astro` renders `<Base>` with a placeholder `<h1>` and nothing else.
- [ ] **Step 4:** Verify: `npm run build`; `grep -c noindex dist/index.html` → 1; page loads in `npm run preview` with no console error (check `curl -s localhost:4321 | head`).

### Task 3: Assets + Header + Hero + Systems

**Files:**
- Create: `src/assets/*` (17 photos + logo), `src/components/Header.astro`, `Hero.astro`, `Systems.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1:** `curl` the 17 CDN images from the live site into `src/assets` (`logo.png`, `truck.png`, 15 project/team photos), keep extensions; `du -sh` under 6 MB.
- [ ] **Step 2:** `Header.astro` — sticky, charcoal/95 blur, logo rendered with `astro:assets` at `height={40}` and `widths` not needed, phone CTA `tel:` right, nav links to `#services #work #about #areas`, mobile: logo + call button only (no hamburger menu in v1).
- [ ] **Step 3:** `Hero.astro` — full-bleed roof photo (`truck.png` or best wide shot) `loading="eager"`, `fetchpriority="high"`, gradient `from-ink`, eyebrow, H1 `Phoenix roofs, built for 115°.`, subhead, two CTAs, credential row; min-h `[92svh]` on mobile with CTA above the fold.
- [ ] **Step 4:** `Systems.astro` — text chips: Asphalt shingle · Tile · Concrete tile · Flat & low-slope, plus one-line "Residential & commercial · Phoenix & across Arizona".
- [ ] **Step 5:** Verify: `npm run build`; hero `img` has `width`/`height` attributes and a `.webp`/`.avif` srcset in `dist`; mobile check on user's phone.

### Task 4: Services + Work gallery

**Files:** Create `src/components/Services.astro`, `src/components/Work.astro`; modify `index.astro`.

- [ ] **Step 1:** `Services.astro` — section label `WHAT WE DO`, H2, four cards (Residential Roofing, Commercial Roofing, Repairs & Leaks, Roof Replacement) with real photo, index number `01–04`, one-line blurb, `#estimate` link. Grid: 1 col mobile, 2 cols ≥640px.
- [ ] **Step 2:** `Work.astro` — `OUR WORK` label, H2, horizontal snap-scroll strip of 8 photos, `loading="lazy"`, captions optional; no lightbox.
- [ ] **Step 3:** Verify: `npm run build`; at 360px the scroll strip stays inside the viewport (`document.body.scrollWidth === window.innerWidth` in devtools).

### Task 5: Why Reyes + Warning signs + Process

**Files:** Create `src/components/WhyUs.astro`, `WarningSigns.astro`, `Process.astro`; modify `index.astro`.

- [ ] **Step 1:** `WhyUs.astro` — dark band, three numbered points restating /about copy: understand the concern, evaluate the roofing system, recommend repair or replacement based on condition (quote "without turning every roofing concern into the same recommendation"). Include team photo.
- [ ] **Step 2:** `WarningSigns.astro` — `SIGNS YOUR ROOF NEEDS ATTENTION`, six rows (title + one line), each linking to `#services`. Two columns ≥768px.
- [ ] **Step 3:** `Process.astro` — four steps `Tell us → Inspect → Plan → Build` with their existing step copy compressed to one line each.
- [ ] **Step 4:** Verify: `npm run build`; grep rendered HTML for the exact quote; no `undefined` in output.

### Task 6: Areas + FAQ

**Files:** Create `src/components/Areas.astro`, `src/components/Faq.astro`; modify `index.astro`.

- [ ] **Step 1:** `Areas.astro` — `SERVICE AREAS`, H2 "Phoenix and 23 communities across Arizona", 24 pills as `<a>` to live site, `flex-wrap gap-2`, plus a note that the list links to their existing city pages.
- [ ] **Step 2:** `Faq.astro` — `<details>` per question, `<summary>` with plus/chevron that rotates via `details[open]`, answers 2–3 sentences written only from their published content.
- [ ] **Step 3:** Verify: build; `details` works with JS disabled (open first one in a real browser, phone width).

### Task 7: Estimate form + Footer

**Files:** Create `src/components/Estimate.astro`, `src/components/Footer.astro`; modify `index.astro`.

- [ ] **Step 1:** `Estimate.astro` — id `estimate`, dark card: name, phone, email, service `<select>` (their four services + "Not sure"), message; `required` on name/phone; submit handler `preventDefault`, validates phone digits ≥ 10, swaps form for a success panel with their phone number; no network call; `data-demo` comment in code.
- [ ] **Step 2:** `Footer.astro` — logo, hours, phone, AZ ROC + BBB links, nav, areas link, copyright 2026, disclaimer line verbatim.
- [ ] **Step 3:** Verify: build; submit empty form → browser blocks; submit valid phone → success panel appears.

### Task 8: Polish, README, final verification

**Files:** Create `README.md`; modify components as needed.

- [ ] **Step 1:** Responsive pass at 360/390/768/1280; fix overflow, line lengths, hero height.
- [ ] **Step 2:** A11y pass: single H1, alt text on all photos, contrast on bone-on-red and red-on-charcoal, focus rings, `aria-hidden` on decorative numbers.
- [ ] **Step 3:** `README.md` — run commands, what's real vs demo, form caveat, deploy steps, asset sources.
- [ ] **Step 4:** `npm run build` twice (clean), check `dist` size < 3 MB total, `dist/index.html` contains disclaimer and phone.
- [ ] **Step 5:** Commit: `git add reyesroofing-demo && git commit -m "feat: reyes roofing redesign demo"`.

## Self-Review

- Spec sections 1–13 map to Tasks 3–7; success criteria to Task 8; deploy config to Task 1.
- No test framework exists for a static demo: verification is build output + browser checks, so Review Focus items are checked in Task 4/6/7/8 steps rather than automated tests.
- Interfaces: `site.ts` is written once in Task 2 and consumed verbatim by Tasks 3–7; component names match spec section list.
