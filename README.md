# The Knowledge Hub Universities — Landing Page

A pixel-perfect, fully CMS-driven university landing page built for the Eng Techno full-stack (frontend-focused) technical assessment.

**Stack:** Next.js 16 (App Router, Cache Components) · Payload CMS 3 (embedded) · TypeScript · Tailwind CSS 4 · Motion · Embla Carousel · Postgres · Vercel Blob

- **Live demo:** `<your-deployed-url>`
- **Payload admin:** `<your-deployed-url>/admin`

---

## Setup

### Prerequisites

- Node.js 20.9+
- pnpm (`corepack enable`)
- A Postgres database — Vercel Postgres, Neon, or any local/hosted Postgres

### 1. Install

```bash
pnpm install
```

### 2. Environment

Copy the example env file and fill it in:

```bash
cp env.example .env.local
```

| Variable | Required | Description |
| --- | --- | --- |
| `PAYLOAD_SECRET` | yes | Long random string used by Payload to sign auth tokens |
| `POSTGRES_URL` | yes | Postgres connection string. In dev, Payload pushes the schema automatically — no migrations to run |
| `BLOB_READ_WRITE_TOKEN` | no | Vercel Blob token for media storage in production. Leave unset locally and uploads are stored on disk under `media/` |

### 3. Seed

```bash
pnpm seed
```

This reads `.env.local`, uploads every image/video from `seed/assets/` into Payload's Media collection, creates all collection documents (universities, programs, events, graduate stories, news, studies), and populates every section global — so the page renders fully populated on first run. The script is idempotent: media is reused by filename and collections are recreated, so it's safe to re-run.

### 4. Run

```bash
pnpm dev        # http://localhost:3000
```

Production build:

```bash
pnpm build && pnpm start
```

Other scripts: `pnpm lint`, `pnpm generate:types` (regenerates `payload-types.ts` after schema changes).

---

## Payload Admin & Editing Content

Open **`/admin`**.

- **Local / fresh database:** Payload shows a **"Create your first user"** screen — sign up with any email + password. That account has full admin access.
- **Live demo:** use the credentials below (public signup is disabled once the first user exists):

  | | |
    | --- | --- |
  | Email | `<demo-admin-email>` |
  | Password | `<demo-admin-password>` |

### How the content is organized

Each landing section maps to a clearly named **Global** in the admin sidebar, and repeatable content lives in **Collections** that the section globals reference via relationship fields:

| Landing section | Global | Pulls from collection |
| --- | --- | --- |
| Header navigation (incl. mega menu) | Header | Studies |
| Hero | Hero Section | — |
| Experience a World-Class Campus | Experience Section | — |
| University Partners | Universities Section | Universities |
| Marquee Ribbon | Marquee Ribbon Section | Universities |
| Core Majors slider | Core Majors Section | Programs |
| Events slider | Events Section | Events |
| Graduate Success coverflow | Graduate Success Section | Graduate Stories |
| Admission Steps | Admissions Section | — |
| Proud News slider | News Section | News |
| Get In Touch | Contact Section | — |
| Footer | Footer | — |
| SEO metadata (title, description, OG image) | Home Page | Media |

To edit: change copy/media in a global, or add/reorder items in a collection and pick which ones are featured in the section global. All images and videos go through the **Media** collection (alt text is required). Saving triggers cache revalidation automatically — reload the landing page and the change is live.

---

## Architecture Decisions

- **Rendering/caching — Cache Components with per-section tagged caches.** The app uses Next 16's `cacheComponents` mode. Each Payload global is fetched through its own `'use cache'` function in [`lib/cms/landing.ts`](lib/cms/landing.ts), cached with `cacheLife("days")` and tagged `global:<slug>`; globals that embed collection docs (e.g. Core Majors → Programs) also carry a `collection:<slug>` tag. The result is a statically-served page with **no monolithic page cache** — each section invalidates independently.

- **Revalidation — in-process Payload hooks, stale-while-revalidate.** Payload runs inside the same Next.js server, so `afterChange`/`afterDelete` hooks on every collection and global call `revalidateTag(tag, "max")` directly ([`lib/cms/revalidate.ts`](lib/cms/revalidate.ts)). An editor's save marks only the affected section stale; the next visit is served instantly from cache while the section refetches in the background. Content is never stale indefinitely, and editing one collection never busts unrelated sections. Tag names live in a single module ([`lib/cms/tags.ts`](lib/cms/tags.ts)) so fetchers and hooks can't drift.

- **Strict layering, one direction of data flow.** `payload/` (schema) → `lib/cms/` (typed data access via Payload's local API + generated `payload-types.ts`, no `any`) → `components/landing/<section>/data.ts` (a transformer that normalizes the CMS shape) → presentational section components driven by typed props. Components never fetch; the CMS shape never leaks into JSX.

- **Graceful fallbacks at two levels.** `safeFindGlobal` catches DB/network failures *outside* the cache boundary (so a failure is never cached) and returns `null`; every section transformer renders complete design-accurate defaults when handed `null` or blank fields. A missing section or a dead database degrades to the seeded design instead of a crash or a broken layout.

- **Server Components by default, client islands at the leaves.** The page, all data access, and section shells are Server Components. `"use client"` appears only where interactivity demands it: sliders (Embla), the mega menu, the experience accordion, the marquee, the mobile menu, and motion-driven reveals (Motion). No content is fetched on the client.

- **Design tokens, not magic values.** All Figma tokens — colors (`#e84925`, `#273480`, `#348141`, `#101828`), a fluid `clamp()` type scale anchored to the 1920px/687px Figma frames, spacing, radii — are CSS variables in [`globals.css`](<app/(frontend)/globals.css>) consumed by Tailwind 4. The five Futura cuts are self-hosted via `next/font/local` with `display: swap`, so typography matches the design with zero layout shift.

---

## Tradeoffs & What I'd Improve With More Time

- **Fully fluid responsiveness, not just the design's breakpoints.** The build honors the Figma desktop/tablet/mobile frames exactly — that's what the pixel-match demanded — and typography already scales fluidly via a `clamp()` scale anchored to the 1920px and 687px frames. With more time I'd extend that fluid approach to layout: spacing, gaps, and component dimensions interpolating smoothly across *every* viewport width instead of snapping at breakpoints, so the in-between sizes (ultrawide monitors, small laptops, foldables) look as intentional as the designed frames.
- **Proper migrations instead of schema push + destructive seed.** The project currently relies on Payload's dev-mode schema push, and the seed wipes and recreates collection documents on every run (media uploads are idempotent, reused by filename). Fine for standing up a demo; wrong for a live site — a re-run would erase editor changes. I'd move to Payload's migration workflow (`payload migrate:create` / `migrate`) for versioned, reviewable schema changes in production, and make the seed upsert-by-key so it only fills gaps and never overwrites content an editor has touched.
- **Editor UX polish in the admin.** The content model is intuitive, but I'd go further for a truly non-technical editor: descriptions on every field explaining where it appears on the page, grouped sidebar navigation (e.g. "Landing Sections" vs. "Content Libraries"), stricter validation (URL formats, image dimension hints, max lengths matched to the design), and row labels/thumbnails on array and relationship fields so editors see *what* they're reordering instead of "Item 01".
- **Contact form is presentational.** Submit is currently a client-side stub. Next step: a Payload `form-submissions` collection written to via a server action, plus success/error states.
- **Stale-while-revalidate means one refresh of lag.** An editor may need to reload once to see a save reflected. Acceptable for marketing content; for instant feedback I'd add Payload Live Preview / Next.js draft mode (the stretch goal I'd pick first).
- **No automated tests.** With more time: Playwright visual-regression snapshots against Figma exports at each breakpoint (protecting the pixel-match), and unit tests on the `data.ts` transformers, which carry the fallback logic.

---

## Repository Structure

```
app/(frontend)/        # Landing page — RSC page, layout, fonts, design tokens
app/(payload)/         # Payload admin UI + REST/GraphQL routes
payload/               # Payload config: collections/, globals/, shared fields
lib/cms/               # Typed data-access layer: cached fetchers, revalidation hooks, tags
components/landing/    # One folder per section: data.ts transformer + UI components
seed/                  # seed.ts + per-section seed data + seed/assets/ media
payload-types.ts       # Generated Payload types (pnpm generate:types)
```
