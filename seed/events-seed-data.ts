/**
 * EVENTS SEED DATA — wired into seed/seed.ts.
 *
 * Seeds 4 `events` collection docs and the `eventsSection` global that
 * references them, mirroring the current content in
 * components/landing/upcoming-events/data.ts. `date` is a plain date; the day/month
 * badge shown on each card is derived from it (see formatEventDate in
 * lib/cms/landing.ts), so no separate display-date field is needed here.
 */

import type { Event, EventsSection } from "@/payload-types";

import type { MediaSeed } from "./header-seed-data";

type EventSeed = Omit<Event, "id" | "image" | "updatedAt" | "createdAt"> & {
  key: string;
  image?: MediaSeed;
};

export type EventsSeedData = Omit<
  EventsSection,
  "id" | "events" | "updatedAt" | "createdAt"
> & {
  events: EventSeed[];
  // Local event `key`s, in display order.
  featuredEvents: string[];
};

export const eventsSeedData: EventsSeedData = {
  eyebrow: "Events",
  heading: "Don’t Miss Our Upcoming Events!",
  cta: { label: "Explore Our All Events", href: "#", openInNewTab: false },
  events: [
    {
      key: "nova-open-day",
      title: "NOVA Open Day!",
      date: "2026-04-25",
      excerpt:
        "Join us for an Open Day! Discover opportunities and meet our campus. Explore your future with us!",
      image: {
        src: "/events/nova-open-day.png",
        alt: "Students talking and smiling together at a campus open day.",
      },
      order: 0,
      active: true,
    },
    {
      key: "cairo-innovation-hub",
      title: "Cairo Innovation Hub",
      date: "2026-04-25",
      excerpt: "Visit our Campus! Learn about programs and meet campus.",
      image: {
        src: "/events/cairo-innovation.png",
        alt: "Graduates in caps and gowns gathered at a commencement ceremony.",
      },
      order: 1,
      active: true,
    },
    {
      key: "campus-tour",
      title: "Guided Campus Tour",
      date: "2026-05-08",
      excerpt:
        "Walk through our facilities, labs, and student spaces with a current student guide.",
      image: {
        src: "/events/nova-open-day.png",
        alt: "A wide view of the university campus grounds.",
      },
      order: 2,
      active: true,
    },
    {
      key: "research-showcase",
      title: "Research Showcase",
      date: "2026-05-19",
      excerpt:
        "See student and faculty projects across engineering, design, and the sciences.",
      image: {
        src: "/events/cairo-innovation.png",
        alt: "Students working with equipment in a research lab.",
      },
      order: 3,
      active: true,
    },
  ],
  featuredEvents: [
    "nova-open-day",
    "cairo-innovation-hub",
    "campus-tour",
    "research-showcase",
  ],
};
