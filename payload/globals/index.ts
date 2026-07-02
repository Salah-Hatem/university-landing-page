import type { GlobalConfig } from "payload";
import { revalidateGlobalAfterChange } from "../../lib/cms/revalidate";
import { Footer } from "./footer";
import { Header } from "./header";
import { HomePage } from "./homePage";
import { AdmissionsSection } from "./sections/admissions";
import { ContactSection } from "./sections/contact";
import { CoreMajorsSection } from "./sections/coreMajors";
import { EventsSection } from "./sections/events";
import { ExperienceSection } from "./sections/experience";
import { GraduateSuccessSection } from "./sections/graduateSuccess";
import { HeroSection } from "./sections/hero";
import { MarqueeRibbonSection } from "./sections/marqueeRibbon";
import { NewsSection } from "./sections/news";
import { UniversitiesSection } from "./sections/universities";

function withLandingRevalidation(global: GlobalConfig): GlobalConfig {
  return {
    ...global,
    hooks: {
      ...global.hooks,
      afterChange: [
        ...(global.hooks?.afterChange ?? []),
        revalidateGlobalAfterChange,
      ],
    },
  };
}

export const globals: GlobalConfig[] = [
  Header,
  Footer,
  HomePage,
  HeroSection,
  ExperienceSection,
  UniversitiesSection,
  MarqueeRibbonSection,
  CoreMajorsSection,
  EventsSection,
  GraduateSuccessSection,
  AdmissionsSection,
  NewsSection,
  ContactSection,
].map(withLandingRevalidation);
