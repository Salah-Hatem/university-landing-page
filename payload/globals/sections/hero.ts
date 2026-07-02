import type { GlobalConfig } from "payload";
import { ctaGroup, mediaField } from "../../fields/common";

export const HeroSection: GlobalConfig = {
  slug: "heroSection",
  label: "Hero Section",
  fields: [
    {
      name: "heading",
      type: "text",
      label: "Heading",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
    },
    ctaGroup("primaryCta", "Primary CTA"),
    ctaGroup("secondaryCta", "Secondary CTA"),
    mediaField("image", "Image"),
    mediaField("backgroundImage", "Background Image"),
    mediaField("backgroundVideo", "Background Video"),
  ],
};
