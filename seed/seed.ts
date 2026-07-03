import { basename, dirname, extname, join } from "node:path";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { getPayloadClient } from "../lib/cms/payload";
import { admissionsSeedData } from "./admissions-seed-data";
import { contactSeedData } from "./contact-seed-data";
import { eventsSeedData } from "./events-seed-data";
import { experienceSeedData } from "./experience-seed-data";
import { footerSeedData } from "./footer-seed-data";
import { graduatesSeedData } from "./graduates-seed-data";
import { headerSeedData } from "./header-seed-data";
import { heroSeedData } from "./hero-seed-data";
import { majorsSeedData } from "./majors-seed-data";
import { marqueeSeedData } from "./marquee-seed-data";
import { newsSeedData } from "./news-seed-data";
import { partnersSeedData } from "./university-seed-data";

// Loose local-API surface — mirrors the casting style in lib/cms/landing.ts so we
// don't have to satisfy the generated block-union types when building global data.
type Doc = { id: number | string; [key: string]: unknown };
type LocalApi = {
  create: (args: {
    collection: string;
    data: Record<string, unknown>;
    filePath?: string;
    file?: { data: Buffer; mimetype: string; name: string; size: number };
  }) => Promise<Doc>;
  find: (args: {
    collection: string;
    where?: Record<string, unknown>;
    sort?: string;
    limit?: number;
  }) => Promise<{ docs: Doc[] }>;
  delete: (args: {
    collection: string;
    where: Record<string, unknown>;
  }) => Promise<unknown>;
  updateGlobal: (args: {
    slug: string;
    data: Record<string, unknown>;
  }) => Promise<unknown>;
};

type MediaRef = string | { src: string; alt: string } | null | undefined;

type ResolvedRef = { src: string; alt: string };

// This seed folder is self-contained: every media file the seed data references
// lives under seed/assets/, mirroring the web path it uses (e.g. "/img/x.png" ->
// seed/assets/img/x.png). Resolving against the script's own directory (not the
// process cwd) means `pnpm seed` works from anywhere on the server, and the seed
// no longer depends on public/ being deployed.
const ASSETS_DIR = join(dirname(fileURLToPath(import.meta.url)), "assets");

// Uploads go through the local API with an explicit filename, so we supply the
// mimetype ourselves (it isn't inferred from a path the way `filePath` would).
const MIME_BY_EXT: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
};

function toRef(ref: MediaRef): ResolvedRef | null {
  if (!ref) {
    return null;
  }
  if (typeof ref === "string") {
    return { src: ref, alt: basename(ref) };
  }
  return { src: ref.src, alt: ref.alt || basename(ref.src) };
}

export async function seed(): Promise<void> {
  const payload = (await getPayloadClient()) as unknown as LocalApi;

  // ── 1. Media (upload once, reuse by filename across runs) ──────────────────
  const mediaIdBySrc = new Map<string, number | string>();

  async function resolveMedia(ref: MediaRef): Promise<number | string | null> {
    const resolved = toRef(ref);
    if (!resolved) {
      return null;
    }
    const cached = mediaIdBySrc.get(resolved.src);
    if (cached !== undefined) {
      return cached;
    }

    const relativePath = resolved.src.replace(/^\//, "");
    const filePath = join(ASSETS_DIR, relativePath);

    if (!existsSync(filePath)) {
      throw new Error(
          `Media file not found for "${resolved.src}" (looked in ${filePath}). ` +
          `Add the file under seed/assets/ or fix the path in the seed data.`,
      );
    }

    // Derive the stored filename from the full source path (slashes → dashes) so
    // files that share a basename across folders (e.g. /img/campus.png vs
    // /img/experience/campus.png) never collide in the media collection. This
    // also keeps re-runs idempotent: the same source always maps to one media doc.
    const storedName = relativePath.replace(/[\\/]/g, "-");
    const existing = await payload.find({
      collection: "media",
      where: { filename: { equals: storedName } },
      sort: "id",
      limit: 1,
    });

    let id: number | string;
    if (existing.docs[0]) {
      id = existing.docs[0].id;
      console.log(`  • media reused: ${storedName}`);
    } else {
      const data = await readFile(filePath);
      const created = await payload.create({
        collection: "media",
        data: { alt: resolved.alt },
        file: {
          data,
          mimetype: MIME_BY_EXT[extname(filePath).toLowerCase()] ?? "application/octet-stream",
          name: storedName,
          size: data.byteLength,
        },
      });
      id = created.id;
      console.log(`  • media uploaded: ${storedName}`);
    }

    mediaIdBySrc.set(resolved.src, id);
    return id;
  }

  // ── 2. Studies (wipe & recreate) ───────────────────────────────────────────
  console.log("Seeding studies…");
  await payload.delete({
    collection: "studies",
    where: { id: { exists: true } },
  });

  const studyIdByKey = new Map<string, number | string>();
  for (const [index, study] of headerSeedData.studies.entries()) {
    const created = await payload.create({
      collection: "studies",
      data: {
        label: study.label,
        href: study.href,
        openInNewTab: study.openInNewTab ?? false,
        order: study.order ?? index,
        active: study.active ?? true,
      },
    });
    studyIdByKey.set(study.key.toLowerCase(), created.id);
  }
  console.log(`  • ${headerSeedData.studies.length} studies created`);

  function resolveStudyIds(keys: string[]): Array<number | string> {
    return keys.flatMap((key) => {
      const id = studyIdByKey.get(key.toLowerCase());
      if (id === undefined) {
        console.warn(`  ! study key not found, skipping: "${key}"`);
        return [];
      }
      return [id];
    });
  }

  // ── 3. Header global ───────────────────────────────────────────────────────
  console.log("Seeding header global…");

  type AnySubLink = HeaderSeedSubLink;
  async function buildSubLink(
      sub: AnySubLink,
  ): Promise<Record<string, unknown>> {
    switch (sub.blockType) {
      case "textLink":
        return {
          blockType: "textLink",
          label: sub.label,
          href: sub.href,
          openInNewTab: sub.openInNewTab ?? false,
        };
      case "photoLink":
        return {
          blockType: "photoLink",
          image: await resolveMedia(sub.image),
          label: sub.label,
          href: sub.href,
          openInNewTab: sub.openInNewTab ?? false,
        };
      case "studyLinks":
        return {
          blockType: "studyLinks",
          items: resolveStudyIds(sub.items),
        };
      case "linkGroup":
        return {
          blockType: "linkGroup",
          heading: sub.heading,
          links: (sub.links ?? []).map((link) => ({
            label: link.label,
            href: link.href,
            openInNewTab: link.openInNewTab ?? false,
            highlighted: link.highlighted ?? false,
          })),
        };
    }
  }

  async function buildTab(tab: HeaderSeedTab): Promise<Record<string, unknown>> {
    const subLinks = [];
    for (const sub of tab.subLinks ?? []) {
      subLinks.push(await buildSubLink(sub));
    }
    const previewImage = await resolveMedia(tab.previewImage);

    if (tab.blockType === "imageDescriptionTab") {
      return {
        blockType: "imageDescriptionTab",
        image: await resolveMedia(tab.image),
        description: tab.description ?? "",
        previewImage,
        subLinks,
      };
    }
    return {
      blockType: "titleDescriptionTab",
      title: tab.title ?? "",
      description: tab.description ?? "",
      previewImage,
      subLinks,
    };
  }

  const primaryNavigation = [];
  for (const item of headerSeedData.primaryNavigation) {
    if (item.hasMegaMenu && item.megaMenu) {
      const tabs = [];
      for (const tab of item.megaMenu.tabs ?? []) {
        tabs.push(await buildTab(tab));
      }
      primaryNavigation.push({
        label: item.label,
        hasMegaMenu: true,
        megaMenu: { tabs },
      });
    } else {
      primaryNavigation.push({
        label: item.label,
        hasMegaMenu: false,
        href: item.href,
        openInNewTab: item.openInNewTab ?? false,
      });
    }
  }

  const linkList = (links: HeaderSeedLink[]) =>
      links.map((link) => ({
        label: link.label,
        href: link.href,
        openInNewTab: link.openInNewTab ?? false,
      }));

  await payload.updateGlobal({
    slug: "header",
    data: {
      logo: await resolveMedia(headerSeedData.logo),
      topLinks: {
        universities: linkList(headerSeedData.topLinks?.universities ?? []),
        resources: linkList(headerSeedData.topLinks?.resources ?? []),
      },
      primaryNavigation,
      searchLabel: headerSeedData.searchLabel,
      contactCta: linkList([headerSeedData.contactCta ?? {}])[0],
      applyCta: linkList([headerSeedData.applyCta ?? {}])[0],
      mobileMenu: {
        openLabel: headerSeedData.mobileMenu?.openLabel,
        closeLabel: headerSeedData.mobileMenu?.closeLabel,
      },
    },
  });
  console.log("  • header global updated");

  // ── 4. Hero global ─────────────────────────────────────────────────────────
  console.log("Seeding hero global…");

  await payload.updateGlobal({
    slug: "heroSection",
    data: {
      heading: heroSeedData.heading,
      description: heroSeedData.description,
      primaryCta: heroSeedData.primaryCta,
      secondaryCta: heroSeedData.secondaryCta,
      image: await resolveMedia(heroSeedData.image),
      backgroundImage: await resolveMedia(heroSeedData.backgroundImage),
      backgroundVideo: await resolveMedia(heroSeedData.backgroundVideo),
    },
  });
  console.log("  • hero global updated");

  // ── 5. Experience global ───────────────────────────────────────────────────
  console.log("Seeding experience global…");

  const experienceTabs = [];
  for (const tab of experienceSeedData.tabs) {
    experienceTabs.push({
      title: tab.title,
      description: tab.description,
      image: await resolveMedia(tab.image),
      stat: tab.stat,
    });
  }

  await payload.updateGlobal({
    slug: "experienceSection",
    data: {
      eyebrow: experienceSeedData.eyebrow,
      heading: experienceSeedData.heading,
      description: experienceSeedData.description,
      tabs: experienceTabs,
      cta: experienceSeedData.cta,
    },
  });
  console.log("  • experience global updated");

  // ── 6. Universities (wipe & recreate) + universities section global ───────
  console.log("Seeding universities…");
  await payload.delete({
    collection: "universities",
    where: { id: { exists: true } },
  });

  const universityIdByKey = new Map<string, number | string>();
  for (const university of partnersSeedData.universities) {
    const created = await payload.create({
      collection: "universities",
      data: {
        name: university.name,
        logo: await resolveMedia(university.logo),
        image: await resolveMedia(university.image),
        marqueeLogo: await resolveMedia(university.marqueeLogo),
        cta: university.cta,
        highlights: university.highlights,
        order: university.order ?? 0,
        active: university.active ?? true,
      },
    });
    universityIdByKey.set(university.key, created.id);
  }
  console.log(`  • ${partnersSeedData.universities.length} universities created`);

  function resolveUniversityIds(keys: string[]): Array<number | string> {
    return keys.flatMap((key) => {
      const id = universityIdByKey.get(key);
      if (id === undefined) {
        console.warn(`  ! university key not found, skipping: "${key}"`);
        return [];
      }
      return [id];
    });
  }

  await payload.updateGlobal({
    slug: "universitiesSection",
    data: {
      eyebrow: partnersSeedData.eyebrow,
      heading: partnersSeedData.heading,
      description: partnersSeedData.description,
      featuredUniversities: resolveUniversityIds(partnersSeedData.featuredUniversities),
    },
  });
  console.log("  • universities section global updated");

  // ── 7. Programs (wipe & recreate) + core majors section global ────────────
  console.log("Seeding programs…");
  await payload.delete({
    collection: "programs",
    where: { id: { exists: true } },
  });

  const programIdByKey = new Map<string, number | string>();
  for (const program of majorsSeedData.programs) {
    const created = await payload.create({
      collection: "programs",
      data: {
        title: program.title,
        programCountLabel: program.programCountLabel,
        description: program.description,
        image: await resolveMedia(program.image),
        order: program.order ?? 0,
        active: program.active ?? true,
      },
    });
    programIdByKey.set(program.key, created.id);
  }
  console.log(`  • ${majorsSeedData.programs.length} programs created`);

  function resolveProgramIds(keys: string[]): Array<number | string> {
    return keys.flatMap((key) => {
      const id = programIdByKey.get(key);
      if (id === undefined) {
        console.warn(`  ! program key not found, skipping: "${key}"`);
        return [];
      }
      return [id];
    });
  }

  await payload.updateGlobal({
    slug: "coreMajorsSection",
    data: {
      eyebrow: majorsSeedData.eyebrow,
      heading: majorsSeedData.heading,
      programs: resolveProgramIds(majorsSeedData.featuredPrograms),
    },
  });
  console.log("  • core majors section global updated");

  // ── 8. Events (wipe & recreate) + events section global ───────────────────
  console.log("Seeding events…");
  await payload.delete({
    collection: "events",
    where: { id: { exists: true } },
  });

  const eventIdByKey = new Map<string, number | string>();
  for (const event of eventsSeedData.events) {
    const created = await payload.create({
      collection: "events",
      data: {
        title: event.title,
        date: event.date,
        excerpt: event.excerpt,
        image: await resolveMedia(event.image),
        order: event.order ?? 0,
        active: event.active ?? true,
      },
    });
    eventIdByKey.set(event.key, created.id);
  }
  console.log(`  • ${eventsSeedData.events.length} events created`);

  function resolveEventIds(keys: string[]): Array<number | string> {
    return keys.flatMap((key) => {
      const id = eventIdByKey.get(key);
      if (id === undefined) {
        console.warn(`  ! event key not found, skipping: "${key}"`);
        return [];
      }
      return [id];
    });
  }

  await payload.updateGlobal({
    slug: "eventsSection",
    data: {
      eyebrow: eventsSeedData.eyebrow,
      heading: eventsSeedData.heading,
      events: resolveEventIds(eventsSeedData.featuredEvents),
      cta: eventsSeedData.cta,
    },
  });
  console.log("  • events section global updated");

  // ── 9. Graduate stories (wipe & recreate) + graduate success global ───────
  console.log("Seeding graduate stories…");
  await payload.delete({
    collection: "graduateStories",
    where: { id: { exists: true } },
  });

  const graduateStoryIdByKey = new Map<string, number | string>();
  for (const story of graduatesSeedData.stories) {
    const created = await payload.create({
      collection: "graduateStories",
      data: {
        graduateName: story.graduateName,
        graduationYear: story.graduationYear,
        role: story.role,
        company: story.company,
        school: story.school,
        quote: story.quote,
        image: await resolveMedia(story.image),
        avatar: await resolveMedia(story.avatar),
        order: story.order ?? 0,
        active: story.active ?? true,
      },
    });
    graduateStoryIdByKey.set(story.key, created.id);
  }
  console.log(`  • ${graduatesSeedData.stories.length} graduate stories created`);

  function resolveGraduateStoryIds(keys: string[]): Array<number | string> {
    return keys.flatMap((key) => {
      const id = graduateStoryIdByKey.get(key);
      if (id === undefined) {
        console.warn(`  ! graduate story key not found, skipping: "${key}"`);
        return [];
      }
      return [id];
    });
  }

  await payload.updateGlobal({
    slug: "graduateSuccessSection",
    data: {
      eyebrow: graduatesSeedData.eyebrow,
      heading: graduatesSeedData.heading,
      description: graduatesSeedData.description,
      stories: resolveGraduateStoryIds(graduatesSeedData.featuredStories),
      cta: graduatesSeedData.cta,
    },
  });
  console.log("  • graduate success section global updated");

  // ── 10. News (wipe & recreate) + news section global ──────────────────────
  console.log("Seeding news…");
  await payload.delete({
    collection: "news",
    where: { id: { exists: true } },
  });

  const newsIdByKey = new Map<string, number | string>();
  for (const article of newsSeedData.articles) {
    const created = await payload.create({
      collection: "news",
      data: {
        category: article.category,
        categoryColor: article.categoryColor,
        title: article.title,
        date: article.date,
        thumbnail: await resolveMedia(article.thumbnail),
        order: article.order ?? 0,
        active: article.active ?? true,
      },
    });
    newsIdByKey.set(article.key, created.id);
  }
  console.log(`  • ${newsSeedData.articles.length} news articles created`);

  function resolveNewsIds(keys: string[]): Array<number | string> {
    return keys.flatMap((key) => {
      const id = newsIdByKey.get(key);
      if (id === undefined) {
        console.warn(`  ! news key not found, skipping: "${key}"`);
        return [];
      }
      return [id];
    });
  }

  await payload.updateGlobal({
    slug: "newsSection",
    data: {
      eyebrow: newsSeedData.eyebrow,
      heading: newsSeedData.heading,
      description: newsSeedData.description,
      articles: resolveNewsIds(newsSeedData.featuredArticles),
      cta: newsSeedData.cta,
    },
  });
  console.log("  • news section global updated");

  // ── 11. Admissions section global (global-only) ───────────────────────────
  console.log("Seeding admissions global…");
  await payload.updateGlobal({
    slug: "admissionsSection",
    data: {
      eyebrow: admissionsSeedData.eyebrow,
      heading: admissionsSeedData.heading,
      description: admissionsSeedData.description,
      cta: admissionsSeedData.cta,
      steps: admissionsSeedData.steps,
    },
  });
  console.log("  • admissions section global updated");

  // ── 12. Contact section global (global-only) ──────────────────────────────
  console.log("Seeding contact global…");
  await payload.updateGlobal({
    slug: "contactSection",
    data: {
      eyebrow: contactSeedData.eyebrow,
      heading: contactSeedData.heading,
      description: contactSeedData.description,
      fields: contactSeedData.fields,
      submitCta: contactSeedData.submitCta,
    },
  });
  console.log("  • contact section global updated");

  // ── 13. Footer global (global-only, logo references media) ────────────────
  console.log("Seeding footer global…");
  await payload.updateGlobal({
    slug: "footer",
    data: {
      logo: await resolveMedia(footerSeedData.logo),
      description: footerSeedData.description,
      contact: footerSeedData.contact,
      search: footerSeedData.search,
      linkColumns: footerSeedData.linkColumns,
      moreLinks: footerSeedData.moreLinks,
      socialLinks: footerSeedData.socialLinks,
      legalLinks: footerSeedData.legalLinks,
      copyright: footerSeedData.copyright,
    },
  });
  console.log("  • footer global updated");

  // ── 14. Marquee ribbon section global (bands reference universities) ──────
  console.log("Seeding marquee ribbon global…");
  const marqueeBands = marqueeSeedData.bands.map((band) => ({
    label: band.label,
    backgroundColor: band.backgroundColor,
    universities: resolveUniversityIds(band.universities),
  }));

  await payload.updateGlobal({
    slug: "marqueeRibbonSection",
    data: {
      bands: marqueeBands,
    },
  });
  console.log("  • marquee ribbon section global updated");
}

// Narrowing helpers derived from the seed data shape.
type HeaderSeedLink = NonNullable<
    NonNullable<(typeof headerSeedData)["topLinks"]>["universities"]
>[number];
type HeaderSeedNavItem = (typeof headerSeedData)["primaryNavigation"][number];
type HeaderSeedTab = NonNullable<
    NonNullable<HeaderSeedNavItem["megaMenu"]>["tabs"]
>[number];
type HeaderSeedSubLink = NonNullable<HeaderSeedTab["subLinks"]>[number];

try {
  await seed();
  console.log("\n✓ Header seed complete");
  process.exit(0);
} catch (error) {
  console.error("\n✗ Header seed failed:\n", error);
  process.exit(1);
}
