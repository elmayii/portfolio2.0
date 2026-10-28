# AGENTS.md — srperera.com · SaaS-Killing World

This file guides any coding agent working in this repository. Read it before touching code.
(Hosts that read a different guide filename get a pointer file importing this one.)

## What this repo is

Static personal site of Mario Perera (sr_perera), built with Astro: the free SaaS-Killing World
newsletter, free guides delivered by keyword, the paid member vault offer and the "work with me"
services for companies.

**Role:** frontend — a static site with no backend of its own; external services (Substack,
Google Sheets, later Stripe and PostHog) are reached by link only. Its hardest gate is not a
consumed API but the jump to server output and real external accounts. The repository is the
memory: `docs/develop/SPRINTS.md` is the plan, `docs/develop/AGENT_PROGRESS.md` is the
handoff, git is the truth.

## Source documents (authority order)

The source of truth; this file is the operational summary.

| # | Source | Authority | Notes |
|---|---|---|---|
| 1 | Code + `src/data/site.ts` | Highest | `site.ts` holds every piece of copy, link and price. Values in `[brackets]` are pre-launch placeholders. |
| 2 | `README.md` | High | Routes, env vars and the "Before launch" checklist (the documented backlog). |
| 3 | External guide sources (`biblioteca/reels/...`, outside this repo) | High for `/r/playbook` | Cited in `src/pages/r/playbook.astro`; not readable from here, never rewritten from memory. |
| 4 | `Plan_SEO.md` (2025) | Superseded | Written for the old React portfolio (`lang="es"`, `Hero.tsx`). Its SEO head is already implemented in `Layout.astro`; its language/keyword advice contradicts the current English site. Do not act on it. |
| 5 | `landing-plan.txt` | Obsolete | Sprints of the old React portfolio. Do not act on it. |

## Stack

Astro 7.4 (upgrade from 5.9 in flight — see Sprint 01) · TypeScript strict
(`astro/tsconfigs/strict`) · Tailwind 4 through `@tailwindcss/vite` (preflight only) ·
`@astrojs/sitemap` · `@astrojs/react` + React 19 (legacy only, no page uses it) · Node 24 —
package manager: **npm** (`package-lock.json`).

## Architecture and patterns (extracted from this repo, see `docs/develop/RECOGNITION.md`)

- **Static output, three pages:** `/` (`src/pages/index.astro`), `/welcome`, `/guia/` (served for
  every `/guia/<palabra>` by `public/_redirects`, which also holds the `/r/<palabra>` redirects).
  No adapter, no API routes, no SSR. The API is the separate Worker in `api/` (`api.srperera.com`).
- **Copy lives in data, not components:** `src/data/site.ts` exports `site`, `socials`,
  `steps`, `series`, `builds`, `packs`, `checkout`, `pricing` (Latest comes from the Worker's
  `GET /posts` at runtime). A text change edits `site.ts`;
  components only render it. Page-local data (FAQ, playbook prompts) sits in the page
  frontmatter.
- **Components:** `src/components/site/*.astro`. Zero hydration: there is no `client:` directive
  anywhere. Small behaviour (subscribe form, copy-prompt button) is an inline `<script>` in
  plain TypeScript.
- **Styling:** design tokens as CSS custom properties in `src/styles/global.css` `:root`
  (`--bg --paper --ink --body --muted --rule --blue #0057FF --pink #FF3366 --night ...`, fonts
  Montserrat / Inter / IBM Plex Mono) plus shared classes (`.wrap .eyebrow .section-title .mono
  .btn .link-arrow .strike .sr-only`). Each component has its own scoped `<style>`. No Tailwind
  utility classes are used. `tailwind.config.js` is a v3-format file that Tailwind 4 does not
  read — editing it has no effect.
- **Page shell:** `Layout.astro` (SEO head: canonical, OG, Twitter, JSON-LD `Person` built
  from `site` + `socials`; props `title description image noindex`) → `SiteHeader` (`home`
  prop: `#anchor` on home, `/#anchor` elsewhere) → `<main>` → `SiteFooter`. Home is the
  exception: `Hero.astro` renders `SiteHeader home` over the photo.
- **Responsive is load-bearing:** recent work tunes phone widths (the header wordmark shrinks
  so Subscribe stays on one line). Every UI change is checked at 375px.
- **Legacy:** `src/components/*.tsx`, `Canvas/`, `src/hooks/`, `Welcome.astro`, `src/assets/`
  are the old portfolio — unused. Do not extend them; deleting them is a gate.
- **Env:** `PUBLIC_SUBSTACK_URL` (optional). When it is set, the subscribe form also opens
  Substack; it always redirects to `/welcome?source=<source>`.

## Development principles

- **Additive by default.** Live contracts do not break: routes, anchors (`#read #built #vault
  #work #join`) and the `/welcome?source=` query stay stable.
- **Reuse before writing.** Existing tokens, shared classes, `site.ts` and patterns first;
  smallest correct diff; no speculative abstractions, no new dependencies without a gate.
- **Evidence over assertion.** Nothing is `DONE` without the recorded proof the protocol
  demands; `not-run` is recorded, never omitted.
- **Behaviour traces to the source documents.** A change that cannot be traced back to them is
  out of scope.
- **Match surrounding code** — patterns, comment density, idioms.

## Commands

```bash
npm ci
npx astro check        # type gate — added by Sprint 01 / Batch 01 (not installed before it)
npm run build          # static output in dist/
npm run preview        # serves dist/ on http://localhost:4321 for runtime evidence
npm run dev            # dev server on http://localhost:4321
```

No database, no backend, no migrations. Introducing any of them (a DB, an adapter, server
output, an API route) is a human gate.

## Autonomous execution

Driven by the global `cdev` skill (`/cdev`). Local rules live in
`docs/develop/AGENT_EXECUTION_PROTOCOL.md` (deltas only); the plan in `docs/develop/SPRINTS.md`;
the handoff in `docs/develop/AGENT_PROGRESS.md`; the clarity map in `docs/develop/PRODUCT.md`;
decisions in `docs/develop/DECISIONS.md`; what this repo actually is in
`docs/develop/RECOGNITION.md`.

Work on `cdev/sprint-<nn>-batch-<nn>` branches only, cut from `feat/saas-killing-world-alt2`
(the active redesign line) until the human merges it.

## Safety gates (never elevated)

- Merge or push to `main`/`master`, force-push, deleting or rewriting any branch
  (`feat/saas-killing-world-alt1` is a live alternative design).
- Deploying to srperera.com or any hosting, DNS, domain or `astro.config.mjs` `site` changes.
- Adding or upgrading dependencies, Astro integrations included — the only exception is the
  set pre-approved for Sprint 01 / Batch 01 (see `docs/develop/DECISIONS.md`).
- Switching to server output: adapters, `/api/*` routes, SSR.
- Real money and live accounts: Stripe links or keys, PostHog keys, Substack settings, any
  credential or `.env` file.
- Deleting legacy components or anything in `public/` (CV PDF, photos, brand marks).
- Inventing human-only values: prices, reader count, social URLs, episode/pack names, brand
  claims. They come from the human or stay as `[brackets]` / `#`.
- Rewriting `/r/playbook` prompt texts or its sheet URL (their source lives outside the repo).
- Weakening a gate to pass it: excluding files from `tsconfig`, loosening `strict`, skipping
  integrations.

Prepare, don't execute: drafts and commands ready, execution is the human's.
