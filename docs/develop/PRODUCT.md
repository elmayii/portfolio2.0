# Product Summary — srperera.com · SaaS-Killing World

What: Static personal site of Mario Perera (sr_perera), built with Astro: the free SaaS-Killing
World newsletter, free guides delivered by keyword, the paid member vault offer and the "work
with me" services for companies.

Areas / modules:
- Home (`/`): Hero + subscribe, How it works, Series + latest (Worker `GET /posts`), Builds, Work with me, footer (Vault hidden)
- Subscribe flow (`POST api.srperera.com/lead`, Turnstile + consent) and `/welcome` (confirmation)
- Free guides: `/guia/<palabra>` (Spanish form) and `/r/<palabra>` (redirect to the Substack post), both in `public/_redirects`
- SEO head, sitemap, JSON-LD
- Toolchain and gates (Astro 7 upgrade, type gate)
- Launch integrations (subscribe API, Stripe, PostHog)
- Spanish version
- Legacy React portfolio code

Scope authority: code + `src/data/site.ts` › `README.md` (routes, env, "Before launch") ›
external guide sources (outside the repo) › `Plan_SEO.md` (superseded) › `landing-plan.txt`
(obsolete). Full table in `AGENTS.md`.

## Clarity map

The boundary of self-directed work: the agent self-selects work only inside DEFINED/PARTIAL.
ABSENT areas produce open questions, never batches — inventing them is forbidden.

| Area | Level (DEFINED / PARTIAL / ABSENT) | Source | Open questions |
|---|---|---|---|
| Home sections (7) | DEFINED | Code, `site.ts` | — |
| SEO head, sitemap, JSON-LD | DEFINED | `Layout.astro`, `astro.config.mjs` | — |
| Subscribe form → `POST /lead` → Substack tab + `/welcome` | DEFINED | `SubscribeForm.astro`, contract `sb-01-01` | — |
| `/guia/<palabra>` + `/r/<palabra>` (+ 404 «Este post no existe») | DEFINED | `src/pages/guia/index.astro`, `src/pages/404.astro`, `public/_redirects`, DECISIONS 2026-10-27/28 | Which guides exist (one `/r/` line each, target = its Substack post)? |
| Latest section (Worker `GET /posts`) | DEFINED | `Series.astro`, `api/src/index.ts`, contract `sb-01-01` | — |
| `/r/playbook` guide | Removed (2026-10-28) | DECISIONS 2026-10-27: PLAYBOOK discarded; 301 to `/` | — |
| Toolchain: Astro 7 upgrade + type gate | DEFINED | Gate audit, DECISIONS 2026-10-17 | — |
| Launch placeholders (`[brackets]`, `#` links) | PARTIAL | README "Before launch", `site.ts` | Real URLs for TikTok, X, Substack; next episode title; next pack name + line; "RADAR #1" target link |
| Spanish version | PARTIAL | README "Spanish version by browser language" | Routing: `/es/` with Astro i18n, or runtime detection by browser language? Who writes or approves the Spanish copy? |
| Capture API (`api/`, Worker `srperera-api`) | DEFINED | Contract `sb-01-01`, Batch 04 report | Deploys stay human-run |
| Legacy React portfolio cleanup | PARTIAL — gated | README ("still in `src/components/` but no longer used") | Delete `*.tsx`, `Canvas/`, `hooks/`, `Welcome.astro`, `src/assets/`, `@astrojs/react`, React, framer-motion, react-icons, `tailwind.config.js`? Keep the old CV PDF? |
| Stripe checkout (`/welcome` plans, vault card) | ABSENT | README one line | Payment Links or Checkout? The real URLs; is the intro price an automatic coupon? |
| PostHog analytics + UTM | ABSENT | README "event list from the plan" — the plan is not in the repo | The event list; project key; consent/cookie policy |
| Vault (vault.srperera.com, AI connector) | ABSENT — hidden on the site | Copy only (`Vault.astro` kept, not rendered) | Out of this repo? (SYSTEM Sprint 02) |
| Design direction alt1 vs alt2 | ABSENT | Branches only | Which alternative wins, and when does it merge to `main`? |
