import type { ImageMetadata } from "astro";
import roofAerial from "../assets/roof-aerial.jpg";
import roofTile from "../assets/roof-tile.webp";
import team from "../assets/team.png";
import work1 from "../assets/work-1.webp";
import work2 from "../assets/work-2.webp";
import work3 from "../assets/work-3.webp";
import work4 from "../assets/work-4.webp";
import work5 from "../assets/work-5.webp";
import work6 from "../assets/work-6.webp";
import work7 from "../assets/work-7.webp";
import work8 from "../assets/work-8.webp";
import work9 from "../assets/work-9.webp";
import work10 from "../assets/work-10.webp";

export const site = {
  name: "Reyes Roofing LLC",
  phone: "(480) 828-3040",
  phoneHref: "tel:+14808283040",
  hours: "Open 7 days · 8am–10pm",
  licenseA: "352179",
  licenseB: "314230",
  bbbSince: "November 2017",
  disclaimer:
    "Unofficial redesign concept — not affiliated with Reyes Roofing LLC.",
  live: "https://reyesroofingllc.co",
};

export const images = {
  hero: work1,
  team: work8,
  roofAerial,
  roofTile,
};

export type Service = {
  title: string;
  blurb: string;
  img: ImageMetadata;
  href: string;
};

export const services: Service[] = [
  {
    title: "Residential Roofing",
    blurb:
      "Repairs, leaks, inspections and replacements for homes across the Valley.",
    img: roofTile,
    href: "#estimate",
  },
  {
    title: "Commercial Roofing",
    blurb:
      "Repair, replacement, installation and maintenance for commercial properties.",
    img: roofAerial,
    href: "#estimate",
  },
  {
    title: "Repairs & Leaks",
    blurb:
      "Localized damage, flashing, penetrations and the water stains you noticed.",
    img: work3,
    href: "#estimate",
  },
  {
    title: "Roof Replacement",
    blurb:
      "When the condition of the roof goes beyond what a repair can solve.",
    img: work5,
    href: "#estimate",
  },
];

export const work: { src: ImageMetadata; alt: string }[] = [
  { src: work1, alt: "Completed tile roof by Reyes Roofing LLC" },
  { src: work2, alt: "Roofing project by Reyes Roofing LLC" },
  { src: work3, alt: "Residential roof project in Arizona" },
  { src: work4, alt: "Roof installation project by Reyes Roofing LLC" },
  { src: work5, alt: "Roofing work in Arizona" },
  { src: work6, alt: "Roofing project by Reyes Roofing LLC" },
  { src: work7, alt: "Arizona roofing project" },
  { src: work8, alt: "Roof installation project" },
  { src: work9, alt: "Residential roof project" },
  { src: work10, alt: "Roofing project by Reyes Roofing LLC" },
];

export const warnings: { title: string; body: string }[] = [
  {
    title: "Water stains inside",
    body: "Ceiling stains or moisture appearing during rainfall.",
  },
  {
    title: "Missing or lifted shingles",
    body: "Shingles that are cracked, displaced or visibly worn.",
  },
  {
    title: "Broken or displaced tiles",
    body: "Damaged tiles can expose the roofing system beneath them.",
  },
  {
    title: "Flashing problems",
    body: "Issues where walls, valleys and roof penetrations meet.",
  },
  {
    title: "Visible deterioration",
    body: "Surface changes or damaged materials across the roof.",
  },
  {
    title: "Recurring problems",
    body: "The same concern returning in more than one area.",
  },
];

export const processSteps: { step: string; title: string; body: string }[] = [
  {
    step: "01",
    title: "Tell us what you see",
    body: "The leak, the stain, the missing shingles — in your own words.",
  },
  {
    step: "02",
    title: "We look at the roof",
    body: "Materials, flashing, penetrations and drainage are evaluated together.",
  },
  {
    step: "03",
    title: "You get a direction",
    body: "Repair, maintenance or replacement — based on the roof in front of us.",
  },
  {
    step: "04",
    title: "The work gets done",
    body: "Scope is agreed before anything starts.",
  },
];

export const cities: { name: string; href: string }[] = [
  "phoenix",
  "sun-city",
  "goodyear",
  "gilbert",
  "glendale",
  "scottsdale",
  "peoria",
  "tempe",
  "surprise",
  "buckeye",
  "avondale",
  "queen-creek",
  "apache-junction",
  "el-mirage",
  "fountain-hills",
  "paradise-valley",
  "litchfield-park",
  "tolleson",
  "youngtown",
  "carefree",
  "cave-creek",
  "guadalupe",
  "wickenburg",
  "yuma",
].map((slug) => ({
  name: slug
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" "),
  href: `${site.live}/${slug}-roofing`,
}));

export const faqs: { q: string; a: string }[] = [
  {
    q: "What roofing services do you provide?",
    a: "Residential and commercial roofing: roof repair, leak repair, inspections, replacement, new roof installation and maintenance, plus work on asphalt shingle, tile, concrete tile and flat roofing systems.",
  },
  {
    q: "How do I know if my roof needs repair?",
    a: "You don't need to diagnose it yourself. Start with what you've noticed — a stain, missing shingles, cracked tiles, or a problem that keeps coming back — and the roof's condition can be evaluated from there.",
  },
  {
    q: "Does a leak mean I need a whole new roof?",
    a: "Not necessarily. A leak can come from flashing, a penetration or one damaged area. Whether repair or replacement is the right direction depends on the extent and condition of the roofing system.",
  },
  {
    q: "Which roofing systems do you work with?",
    a: "Asphalt shingle, tile, concrete tile and flat or low-slope roofing, on both homes and commercial properties.",
  },
  {
    q: "Do you handle commercial roofing?",
    a: "Yes — commercial repair, replacement, installation, inspections, maintenance and flat roofing.",
  },
  {
    q: "Do you work outside Phoenix?",
    a: "Yes. Reyes Roofing LLC serves properties across Arizona, including 23 communities around the Valley and beyond.",
  },
];
