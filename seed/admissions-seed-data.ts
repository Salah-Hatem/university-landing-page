/**
 * ADMISSIONS SEED DATA — wired into seed/seed.ts.
 *
 * Global-only (no backing collection). Mirrors the current copy in
 * components/landing/admission-steps/AdmissionSteps.tsx so seeding populates the
 * `admissionsSection` global with the content already displayed on the
 * landing page.
 */

import type { AdmissionsSection } from "@/payload-types";

export type AdmissionsSeedData = Omit<
  AdmissionsSection,
  "id" | "updatedAt" | "createdAt"
>;

export const admissionsSeedData: AdmissionsSeedData = {
  eyebrow: "Take Action",
  heading: "Your Journey Starts Here!",
  description: "Just a few steps to join TKH campus.",
  cta: { label: "Apply For 2026 Year", href: "#", openInNewTab: false },
  steps: [
    {
      number: "1",
      title: "Apply Online",
      description: "Complete our simple online application form",
    },
    {
      number: "2",
      title: "Upload Docs",
      description: "Provide your academic transcripts and other required documents",
    },
    {
      number: "3",
      title: "Screening & Interview",
      description: "Participate in an interview with our admissions team",
    },
    {
      number: "4",
      title: "Placement Test",
      description: "Get your admission offer and next steps",
    },
    {
      number: "5",
      title: "Acceptance Offer",
      description:
        "Confirm your enrollment and prepare for your journey at TKH campus",
    },
  ],
};
