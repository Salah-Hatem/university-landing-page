/**
 * GRADUATES SEED DATA — wired into seed/seed.ts.
 *
 * Seeds 9 `graduateStories` collection docs and the `graduateSuccessSection`
 * global that references them, mirroring the current content in
 * components/landing/graduate-success/data.ts. The card's accent colour isn't a CMS
 * field — the mapper (getGraduateSuccessData) cycles the same static
 * palette instead, so it's omitted here.
 */

import type { GraduateStory, GraduateSuccessSection } from "@/payload-types";

import type { MediaSeed } from "./header-seed-data";

type GraduateStorySeed = Omit<
  GraduateStory,
  "id" | "image" | "avatar" | "updatedAt" | "createdAt"
> & {
  key: string;
  image?: MediaSeed;
  avatar?: MediaSeed;
};

export type GraduatesSeedData = Omit<
  GraduateSuccessSection,
  "id" | "stories" | "updatedAt" | "createdAt"
> & {
  stories: GraduateStorySeed[];
  // Local story `key`s, in display order.
  featuredStories: string[];
};

export const graduatesSeedData: GraduatesSeedData = {
  eyebrow: "Build Your Career",
  heading: "Success Career Journeys of Our Graduates",
  description: "98% of our graduates are employed within 6 months of graduation.",
  cta: { label: "Explore Our Career Services", href: "#", openInNewTab: false },
  stories: [
    {
      key: "sarah-ahmed",
      graduateName: "Sarah Ahmed",
      graduationYear: "2025",
      role: "Software Engineer at Vodafone, Egypt",
      school: "NOVA",
      quote:
        "During my final year at TKH, the career services team helped me refine my CV, prepare for technical interviews, and connect with industry mentors. I landed my role shortly after graduation.",
      image: { src: "/graduation/grad1.png", alt: "Sarah Ahmed on graduation day" },
      avatar: { src: "/graduation/avatar 1.png", alt: "Sarah Ahmed" },
      order: 0,
      active: true,
    },
    {
      key: "ali-ahmed",
      graduateName: "Ali Ahmed",
      graduationYear: "2025",
      role: "Backend Engineer at Instabug, Egypt",
      school: "Coventry",
      quote:
        "The mock interviews were the turning point. By the time real interviews came around I felt calm and prepared, and it showed in the offers I received.",
      image: { src: "/graduation/grad2.png", alt: "Ali Ahmed on graduation day" },
      avatar: { src: "/graduation/avatar2.png", alt: "Ali Ahmed" },
      order: 1,
      active: true,
    },
    {
      key: "mariam-tarek",
      graduateName: "Mariam Tarek",
      graduationYear: "2024",
      role: "Data Analyst at Fawry, Egypt",
      school: "TKH",
      quote:
        "I went from not knowing where to start to having a portfolio I was proud of. The mentorship made the difference between hoping and knowing.",
      image: { src: "/graduation/grad3.png", alt: "Mariam Tarek on graduation day" },
      avatar: { src: "/graduation/avatar3.png", alt: "Mariam Tarek" },
      order: 2,
      active: true,
    },
    {
      key: "omar-khaled",
      graduateName: "Omar Khaled",
      graduationYear: "2024",
      role: "Frontend Engineer at Swvl, Egypt",
      school: "Coventry",
      quote:
        "They pushed me to apply for roles I thought were out of reach. That confidence, plus real feedback on my work, got me hired.",
      image: { src: "/graduation/grad1.png", alt: "Omar Khaled on graduation day" },
      avatar: { src: "/graduation/avatar 1.png", alt: "Omar Khaled" },
      order: 3,
      active: true,
    },
    {
      key: "nour-hassan",
      graduateName: "Nour Hassan",
      graduationYear: "2025",
      role: "Product Engineer at Paymob, Egypt",
      school: "NOVA",
      quote:
        "From CV reviews to salary negotiation, the support never stopped. I started my first role feeling genuinely ready for it.",
      image: { src: "/graduation/grad2.png", alt: "Nour Hassan on graduation day" },
      avatar: { src: "/graduation/avatar2.png", alt: "Nour Hassan" },
      order: 4,
      active: true,
    },
    {
      key: "youssef-adel",
      graduateName: "Youssef Adel",
      graduationYear: "2024",
      role: "ML Engineer at Synapse, Egypt",
      school: "TKH",
      quote:
        "The hardest part was knowing my worth. The team helped me see it, and I walked into negotiations with real confidence.",
      image: { src: "/graduation/grad3.png", alt: "Youssef Adel on graduation day" },
      avatar: { src: "/graduation/avatar3.png", alt: "Youssef Adel" },
      order: 5,
      active: true,
    },
    {
      key: "habiba-sami",
      graduateName: "Habiba Sami",
      graduationYear: "2025",
      role: "UX Designer at Valu, Egypt",
      school: "Coventry",
      quote:
        "A portfolio review turned into a roadmap. Each session left me with something concrete to fix, and it added up fast.",
      image: { src: "/graduation/grad1.png", alt: "Habiba Sami on graduation day" },
      avatar: { src: "/graduation/avatar 1.png", alt: "Habiba Sami" },
      order: 6,
      active: true,
    },
    {
      key: "karim-fouad",
      graduateName: "Karim Fouad",
      graduationYear: "2024",
      role: "DevOps Engineer at Robusta, Egypt",
      school: "NOVA",
      quote:
        "I applied to ten companies and got four interviews in a week. The prep work made me sound like someone who already had the job.",
      image: { src: "/graduation/grad2.png", alt: "Karim Fouad on graduation day" },
      avatar: { src: "/graduation/avatar2.png", alt: "Karim Fouad" },
      order: 7,
      active: true,
    },
    {
      key: "salma-reda",
      graduateName: "Salma Reda",
      graduationYear: "2025",
      role: "QA Engineer at Trella, Egypt",
      school: "TKH",
      quote:
        "They treated my goals as their own. That kind of backing is rare, and it changed how I show up in interviews.",
      image: { src: "/graduation/grad3.png", alt: "Salma Reda on graduation day" },
      avatar: { src: "/graduation/avatar3.png", alt: "Salma Reda" },
      order: 8,
      active: true,
    },
  ],
  featuredStories: [
    "sarah-ahmed",
    "ali-ahmed",
    "mariam-tarek",
    "omar-khaled",
    "nour-hassan",
    "youssef-adel",
    "habiba-sami",
    "karim-fouad",
    "salma-reda",
  ],
};
