import type { GlobalConfig } from "payload";
import { ctaGroup, sectionIntroFields } from "../../fields/common";

export const EventsSection: GlobalConfig = {
  slug: "eventsSection",
  label: "Events Section",
  fields: [
    ...sectionIntroFields,
    {
      name: "events",
      type: "relationship",
      label: "Events",
      relationTo: "events" as never,
      hasMany: true,
    },
    ctaGroup("cta", "CTA"),
  ],
};
