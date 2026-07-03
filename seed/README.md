# Seed

Self-contained seeders for the Payload CMS behind the landing page. Everything the
seed needs — the scripts **and** the media files they reference — lives in this
folder, so it can be run as-is on the server without depending on `public/`.

## Layout

```
seed/
├── seed.ts                 # entry point — run this
├── *-seed-data.ts          # content for each section/collection/global
└── assets/                 # every image/video the seed data references
    ├── image 30.png
    ├── img/…
    ├── svg/…
    └── video/…
```

Media is referenced by web-style path in the `*-seed-data.ts` files (e.g.
`/img/nova-logo.png`). The seeder resolves each one against `seed/assets/`
(mirroring that path), uploads it into the `media` collection once, and links it
by ID. Paths are resolved relative to this folder, not the process working
directory, so `pnpm seed` works from anywhere.

## Running

From the project root:

```bash
pnpm seed
```

This runs `tsx --env-file=.env.local seed/seed.ts`. It needs:

- The database configured via `payload.config.ts` (the env file supplies the
  connection / secret). On the server, make sure the same env vars are present —
  either via `.env.local` or the process environment (drop `--env-file` if the
  server injects them another way).
- `tsx` (already a dev dependency) and the app's dependencies installed.

The seed is **idempotent for media** (files are reused by filename across runs)
and **wipes & recreates** the collection docs it owns (studies, universities,
programs, events, graduate stories, news) before re-inserting, then updates the
corresponding globals.

## Adding or changing media

1. Add the file under `seed/assets/`, mirroring the web path you want to use.
2. Reference it from the relevant `*-seed-data.ts` by that leading-slash path
   (e.g. put `seed/assets/img/foo.png` → reference `"/img/foo.png"`).

If you also want the asset served by the site, add a copy under `public/` too —
the two are intentionally decoupled so the seed stays runnable on its own.
