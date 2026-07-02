import type { GlobalConfig } from "payload";
import { seoGroup } from "../fields/common";

// Section order is design-coupled and lives in app/(frontend)/page.tsx. This
// global exists solely to drive the home page's SEO metadata via
// generateMetadata (see app/(frontend)/page.tsx).
export const HomePage: GlobalConfig = {
  slug: "homePage",
  label: "Home Page",
  fields: [seoGroup],
};
