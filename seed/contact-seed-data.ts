/**
 * CONTACT SEED DATA — wired into seed/seed.ts.
 *
 * Global-only (no backing collection). Mirrors the current copy in
 * components/landing/contact-section/ContactSection.tsx so seeding populates the
 * `contactSection` global with the content already displayed on the landing
 * page. Field ids/types/autocomplete/validation stay hardcoded in the
 * component — only labels/placeholders and the intro/submit copy are
 * CMS-driven.
 */

import type { ContactSection } from "@/payload-types";

export type ContactSeedData = Omit<ContactSection, "id" | "updatedAt" | "createdAt">;

export const contactSeedData: ContactSeedData = {
  eyebrow: "Take Action",
  heading: "Get In Touch!",
  description:
    "Have a question on mind? Leave us a message and we will contact you shortly.",
  fields: [
    { label: "Your Phone Number" },
    { label: "Your Email" },
    { label: "Your Message" },
  ],
  submitCta: { label: "Send Message", href: "#", openInNewTab: false },
};
