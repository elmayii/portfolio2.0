# Agent Execution Protocol — srperera.com · SaaS-Killing World (local deltas only)

The generic loop — selection, implementation, auto-advance, blocked-but-not-idle, stop
conditions, gate policy — lives in the global `cdev` skill and is **not** copied here. This
file holds only what is specific to this repository. If this file and the skill disagree on
safety, the strictest wins.

## Role

frontend — a static Astro site with no backend of its own; external services are reached by link
only. "Verified" means the type gate and the build pass; "evidence" means the touched route was
driven in a real browser.

## Verification sequence (the real one — every gate verified before it was written down)

```bash
npm ci
npx astro check        # 0 errors required; exists only after Sprint 01 / Batch 01
npm run build          # must finish without integration errors (sitemap runs in astro:build:done)
npm run preview        # http://localhost:4321 — runtime evidence runs against this (or npm run dev)
```

Gate audit at conditioning (2026-10-17, working tree with the uncommitted Astro 7.4 bump):
- `npm run build` — **honest, currently red**: pages render, then `[@astrojs/sitemap] Cannot
  read properties of undefined (reading 'reduce')` in `astro:build:done` → exit 1. Cause:
  `@astrojs/sitemap` 3.4.1 / `@astrojs/react` 4.3.0 are Astro 5 era. Repair: Batch 01.
- `npx astro check` — **absent**: `@astrojs/check` and `typescript` are not installed (running
  it would prompt an install). Repair: Batch 01.
- lint / test — **absent by design**; not required, not fabricated.
- A build "passing" while an integration hook errored is a lying gate: read the tail of the
  output, not only the page list.

No database, no migrations, no backend. Introducing any (DB, adapter, server output, API route)
is a standing human gate.

## Evidence required for `DONE`

- The touched route(s) served by `npm run preview` (or `npm run dev`) and driven through
  **Playwright MCP** (binding; the requirement is observing real behaviour):
  - snapshot + screenshot at **1280×800** and **375×812**;
  - console read: no errors (warnings listed in the handoff);
  - the touched flow executed, not just rendered. For the subscribe form: invalid email shows
    the error; a valid email lands on `/welcome?source=<source>`.
- Copy changes: the rendered text checked against `src/data/site.ts`.
- Head/SEO changes: the rendered `<head>` (canonical, OG, JSON-LD) read from the built HTML in
  `dist/`.
- Screenshots go under `logs/evidence/<sprint>-<batch>/` and are referenced in the handoff
  entry. `logs/` and `.playwright-mcp/` must be git-ignored (Sprint 01 / Batch 01 adds them).
- No Playwright, or the server does not start, and nothing else is workable → `BLOCKED`, never
  `DONE`.

## Branches and commits

- Working branch: `cdev/sprint-<nn>-batch-<nn>`, cut from `feat/saas-killing-world-alt2`, never
  `main`/`master`. A batch depending on an unmerged predecessor branches from that
  predecessor's branch.
- One commit per batch: `feat(sprint-<nn>): complete batch <nn> — <short name>`; unfinished
  but useful → `wip(...)`. Also valid: `test/docs/fix/chore(...)`.
- Stage explicit paths only. Never commit `dist/`, `.astro/`, `logs/`, `.env*`.

## Handoff log

`docs/develop/AGENT_PROGRESS.md`, **newest-first**, one entry per meaningful step, per-check
verification (pass / fail / not-run), blockers naming the minimum human decision.

## Architecture and domain rules (from the recognition document — they override the plan)

1. Copy, links and prices change in `src/data/site.ts`, not in components.
2. New UI is `.astro` with a scoped `<style>` built on `global.css` tokens and shared classes.
   No Tailwind utilities, no new hydration (`client:`) without a DECISIONS entry.
3. Behaviour is inline plain-TS `<script>`, defensive around browser APIs (`try/catch` on
   storage and clipboard), working without JS where the markup allows.
4. Every page goes through `Layout.astro` with an explicit `title` and `description`; private
   or utility pages pass `noindex`.
5. Public contract stays stable: routes, anchors `#top #read #built #vault #work #join`,
   `/welcome?source=`, `localStorage.optin_email`.
6. Layout is fluid (`auto-fit`/`minmax`/`clamp`); every change is checked at 375px.
7. `[brackets]` and `#` placeholders are filled only with values the human provides.
8. Legacy React files are neither extended nor deleted.
9. English at the root, Spanish under `/es/`: copy in `src/data/site.ts` and its mirror `site.es.ts` (same
   exports, same shape); a copy change edits both. `/guia` is Spanish only.

## Safety gates (prepare, never execute)

- Merge or push to `main`/`master`, force-push, deleting or rewriting any branch
  (`feat/saas-killing-world-alt1` is a live alternative design).
- Deploying to srperera.com or any hosting, DNS, domain or `astro.config.mjs` `site` changes.
- Adding or upgrading dependencies, Astro integrations included — except the Batch 01
  pre-approval recorded in DECISIONS (2026-10-17).
- Switching to server output: adapters, `/api/*` routes, SSR.
- Real money and live accounts: Stripe links or keys, PostHog keys, Substack settings, any
  credential or `.env` file.
- Deleting legacy components or anything in `public/`.
- Inventing human-only values (prices, reader count, social URLs, episode/pack names, brand
  claims).
- Rewriting `/r/playbook` prompt texts or its sheet URL.
- Weakening a gate to pass it (excluding files from `tsconfig`, loosening `strict`, removing
  integrations).

## Self-chosen work order (when the plan runs out; only inside DEFINED/PARTIAL of PRODUCT.md)

1. README "Before launch" checklist — only the items whose inputs exist in the repo (verified
   in code, not assumed); items waiting on human values become open questions.
2. EN/ES parity gaps, once the Spanish version exists.
3. Debt within scope: red or missing gates, routes without runtime evidence, accessibility
   basics (labels, focus, contrast, alt text), dead `#` links surfaced as questions.
4. Draft of the next phase as `PROPOSAL` in SPRINTS.md — never self-activated; continue with
   1–3 meanwhile.
