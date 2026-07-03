/**
 * FOOTER SEED DATA — wired into seed/seed.ts.
 *
 * Global-only (no backing collection). Mirrors the current copy in
 * components/landing/footer/Footer.tsx so seeding populates the `footer` global with
 * the content already displayed on the landing page. Contact/social glyphs stay
 * hardcoded in the component — only labels/hrefs and the `platform` key are
 * CMS-driven.
 */

import type { Footer } from "@/payload-types";

import type { MediaSeed } from "./header-seed-data";

// Conform to the generated Footer global, overriding the `logo` upload field to
// accept a MediaSeed the seeder resolves to a media relation ID at runtime.
export type FooterSeedData = Omit<
  Footer,
  "id" | "logo" | "updatedAt" | "createdAt"
> & {
  logo?: MediaSeed;
};

export const footerSeedData: FooterSeedData = {
  logo: "/footer/TKH-White.svg",
  description:
    "Earn a globally recognized degree from top-ranked partnered universities on our state-of-the-art campus located in Egypt.",
  contact: {
    heading: "Contact Us",
    phone: "19940 , +20 123 456 789",
    address:
      "New Administrative Capital, Residential Area 7, R7, Cairo Governorate",
    email: "hello@tkh.edu.eg",
    cta: { label: "Apply Now", href: "#", openInNewTab: false },
  },
  search: {
    heading: "Can't find what you're looking for?",
    placeholder: "Search for program, Fees, University..",
    buttonLabel: "Search",
  },
  linkColumns: [
    {
      title: "Universities",
      links: [
        { label: "Coventry University", href: "#", openInNewTab: false },
        { label: "NOVA University", href: "#", openInNewTab: false },
      ],
    },
    {
      title: "Study",
      links: [
        { label: "Undergraduate", href: "#", openInNewTab: false },
        { label: "Postgraduate", href: "#", openInNewTab: false },
        { label: "Continuing Education", href: "#", openInNewTab: false },
      ],
    },
    {
      title: "Campus Life",
      links: [
        { label: "Student Life", href: "#", openInNewTab: false },
        { label: "Services", href: "#", openInNewTab: false },
        { label: "Support", href: "#", openInNewTab: false },
      ],
    },
    {
      title: "Admissions",
      links: [
        { label: "Entry Criteria", href: "#", openInNewTab: false },
        { label: "Tuition Fees", href: "#", openInNewTab: false },
        { label: "How to Apply", href: "#", openInNewTab: false },
      ],
    },
    {
      title: "About TKH",
      links: [
        { label: "Overview", href: "#", openInNewTab: false },
        { label: "Board of Trustees", href: "#", openInNewTab: false },
        { label: "TKH Campus", href: "#", openInNewTab: false },
        { label: "Work With TKH", href: "#", openInNewTab: false },
        { label: "FAQs", href: "#", openInNewTab: false },
      ],
    },
  ],
  moreLinks: [
    { label: "International Students", href: "#", openInNewTab: false },
    { label: "Policies & Regulations", href: "#", openInNewTab: false },
    { label: "Alumni", href: "#", openInNewTab: false },
    { label: "News", href: "#", openInNewTab: false },
    { label: "Events", href: "#", openInNewTab: false },
  ],
  socialLinks: [
    { platform: "facebook", url: "#" },
    { platform: "instagram", url: "#" },
    { platform: "linkedin", url: "#" },
  ],
  legalLinks: [
    { label: "Privacy Policy", href: "#", openInNewTab: false },
    { label: "Terms of Service", href: "#", openInNewTab: false },
    { label: "Cookie Policy", href: "#", openInNewTab: false },
  ],
  copyright: "© 2024 TKH - The Knowledge Hub. All rights reserved.",
};
