/**
 * EXPERIENCE SEED DATA — wired into seed/seed.ts.
 *
 * The data below conforms to the generated Payload `ExperienceSection` shape
 * (see payload-types.ts). It mirrors the static `EXPERIENCE_TABS` and the inline
 * heading/CTA copy in components/landing/experience-campus/ExperienceCampus.tsx so seeding
 * populates the global with the content already displayed on the landing page.
 *
 * Each tab's `image` accepts a `MediaSeed` (shared with header-seed-data.ts):
 *   - a path (mirrored under seed/assets/)  -> "/experience/campus.png"
 *   - an object { src, alt }
 *   - null                                    -> leave the field empty
 * The seeder uploads each referenced file into the `media` collection and links
 * it by ID.
 */

import type { ExperienceSection } from "@/payload-types";

import type { MediaSeed } from "./header-seed-data";

type PayloadTab = NonNullable<ExperienceSection["tabs"]>[number];

// Conform to a generated tab, overriding `image` to the MediaSeed the seeder
// resolves to a media relation ID at runtime.
type ExperienceTabSeed = Omit<PayloadTab, "id" | "image"> & {
  image?: MediaSeed;
};

export type ExperienceSeedData = Omit<
  ExperienceSection,
  "id" | "tabs" | "updatedAt" | "createdAt"
> & {
  tabs: ExperienceTabSeed[];
};

export const experienceSeedData: ExperienceSeedData = {
  eyebrow: "Experience TKH",
  heading: "Experience a World-Class Campus",
  cta: { label: "Know More About TKH", href: "#", openInNewTab: false },
  tabs: [
    {
      title: "State-of-the-Art Campus",
      description:
        "Explore our premier hub featuring international university standards, specialized innovation zones, and a layout optimized for academic excellence and student wellbeing.",
      image: {
        src: "/experience/campus.png",
        alt: "Modern glass-and-stone academic building on the TKH campus.",
      },
      stat: { value: "50k m²", label: "Campus Area" },
    },
    {
      title: "World-Class Facilities",
      description:
        "Step into cutting-edge laboratories, smart lecture halls, and research centers equipped with the technology our students need to lead in their fields.",
      image: {
        src: "/experience/labs.png",
        alt: "Students working inside a well-equipped modern laboratory.",
      },
      stat: { value: "20+", label: "Modern Labs" },
    },
    {
      title: "Sports & Recreation",
      description:
        "Stay active across professional-grade courts, fitness studios, and open recreational spaces designed to balance ambition with wellbeing.",
      image: {
        src: "/experience/facilities.png",
        alt: "Campus sports and recreation facilities.",
      },
      stat: { value: "15+", label: "Facilities" },
    },
    {
      title: "Student Clubs & Societies",
      description:
        "Find your community among dozens of student-led clubs and societies, where leadership, creativity, and lifelong friendships take shape.",
      image: {
        src: "/experience/students.png",
        alt: "Students gathering and collaborating on campus.",
      },
      stat: { value: "20k+", label: "Students" },
    },
  ],
};
