/**
 * MAJORS SEED DATA — wired into seed/seed.ts.
 *
 * Seeds 5 `programs` collection docs and the `coreMajorsSection` global that
 * references them, mirroring the current content in
 * components/landing/core-majors/data.ts.
 */

import type { CoreMajorsSection, Program } from "@/payload-types";

import type { MediaSeed } from "./header-seed-data";

type ProgramSeed = Omit<Program, "id" | "image" | "updatedAt" | "createdAt"> & {
  key: string;
  image?: MediaSeed;
};

export type MajorsSeedData = Omit<
  CoreMajorsSection,
  "id" | "programs" | "updatedAt" | "createdAt"
> & {
  programs: ProgramSeed[];
  // Local program `key`s, in display order.
  featuredPrograms: string[];
};

export const majorsSeedData: MajorsSeedData = {
  eyebrow: "Choose Your Future",
  heading: "Discover Your Path Across 5 Core Majors",
  programs: [
    {
      key: "design-media",
      title: "Design & Media",
      programCountLabel: "7 Programs",
      image: {
        src: "/majors/design-media.png",
        alt: "Students collaborating on a model-making project in a design studio.",
      },
      order: 0,
      active: true,
    },
    {
      key: "engineering",
      title: "Engineering",
      programCountLabel: "9 Programs",
      image: {
        src: "/majors/engineering.png",
        alt: "An engineering student in safety gear working on machinery in a workshop.",
      },
      order: 1,
      active: true,
    },
    {
      key: "psychology",
      title: "Psychology",
      programCountLabel: "3 Programs",
      image: {
        src: "/majors/psychology.png",
        alt: "A clinician guiding a patient through a rehabilitation walking exercise.",
      },
      order: 2,
      active: true,
    },
    {
      key: "business",
      title: "Business",
      programCountLabel: "5 Programs",
      image: {
        src: "/majors/business.png",
        alt: "Business students discussing work together on campus.",
      },
      order: 3,
      active: true,
    },
    {
      key: "physiotherapy",
      title: "Physiotherapy",
      programCountLabel: "3 Programs",
      image: {
        src: "/majors/physiotherapy.png",
        alt: "A physiotherapy session in a bright, equipped treatment space.",
      },
      order: 4,
      active: true,
    },
  ],
  featuredPrograms: [
    "design-media",
    "engineering",
    "psychology",
    "business",
    "physiotherapy",
  ],
};
