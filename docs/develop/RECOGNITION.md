# Recognition — what this repository actually is

*Written before any machinery. A conditioning that renders templates without this step produces
a plan for a repository that does not exist.*

## The repo

`srperera.com`: Mario Perera's personal site, rebuilt in October 2026 from a React-component
portfolio into the "SaaS-Killing World" newsletter home. It is a fully static Astro site with
three routes — `/` (hero + how it works, series, latest, builds, vault, work with me), `/welcome`
(post-subscribe confirmation and member offer) and `/r/playbook` (free guide for the keyword
PLAYBOOK). There is no backend: the subscribe form validates the email client-side, optionally
opens Substack (`PUBLIC_SUBSTACK_URL`), and redirects to `/welcome`. The active line of work is
`feat/saas-killing-world-alt2` (alternative design `alt1` lives on the remote); `main` still
carries the old portfolio. At conditioning the working tree held an uncommitted Astro 5.9 → 7.4
bump that breaks the build (`@astrojs/sitemap` 3.4.1 throws in `astro:build:done`).

## Real architecture patterns (extracted from code — they exist nowhere else)

1. **Single copy source.** `src/data/site.ts` holds all copy, links and prices; components
   render it. `[brackets]` and `href: '#'` mark pre-launch placeholders (8 `#` links at
   conditioning: socials TikTok/X/Substack, latest items, `/welcome` plan links).
2. **Astro-only UI, zero hydration.** No `client:` directive exists. Interactivity is inline
   `<script>` in plain TypeScript (`SubscribeForm.astro`, `r/playbook.astro` copy button), with
   `try/catch` around `localStorage` and clipboard.
3. **Tokens + scoped CSS.** `global.css` `:root` tokens and a handful of shared classes; every
   component carries a scoped `<style>`. Tailwind 4 is imported only for preflight;
   `tailwind.config.js` (v3 format) is dead configuration.
4. **Layout owns SEO.** `Layout.astro` builds canonical, OG/Twitter and a JSON-LD `Person` from
   `site` + `socials` (only `http` socials go into `sameAs`). Pages pass `title`, `description`,
   `noindex` (`/welcome` is `noindex`).
5. **Header context.** `SiteHeader` takes `home`: anchors are `#x` on home and `/#x` elsewhere;
   off-home it renders solid.
6. **Grid without breakpoints.** Layouts use `repeat(auto-fit, minmax(min(100%, Npx), 1fr))`
   and `clamp()` type; media queries are rare and small (`max-width: 420px/600px`).
7. **Stable public contract.** Anchors `#top #read #built #vault #work #join`, the
   `/welcome?source=<hero|...>` query and `localStorage.optin_email` are what external links and
   reels point at.

## Overrides to generic conditioning assumptions

| Generic assumption | Reality here | Override |
|---|---|---|
| A frontend consumes an external backend with a contract | No backend; static output; external services by link only | Hardest gate = moving to server output + live external accounts (Stripe, PostHog, Substack) |
| A typecheck gate exists | `@astrojs/check` and `typescript` are not installed | Sprint 01 / Batch 01 adds `astro check` (pre-approved deps) |
| Lint and test commands exist | None | Not required and not fabricated; adding a test framework is a dependency gate |
| The build gate is green | Red at conditioning (Astro 7.4 + sitemap 3.4.1) | Batch 01 makes it green; until then every batch is blocked on it |
| Tailwind utilities/config drive styling | CSS tokens + scoped styles; config file unused | Style with tokens and shared classes; never edit `tailwind.config.js` expecting effect |
| The installed UI framework (React) is the UI layer | Astro components only; React code is dead legacy | New UI is `.astro`; no hydration without a reason recorded in DECISIONS |
| Repo docs describe the current product | `Plan_SEO.md` and `landing-plan.txt` describe the old portfolio | Authority below code + README; never acted on |
| Work branches cut from `main` | `main` is the old portfolio; the redesign lives on `feat/saas-killing-world-alt2` | Batch branches are cut from `feat/saas-killing-world-alt2` |
| Multi-target parity | Single web target | Not applicable; EN/ES parity applies once i18n exists |
| Exact pins are load-bearing | No exact pins; an Astro major upgrade is in flight | Astro integrations must match the Astro major; upgrades are gated |

## Untouchable

- `/r/playbook` prompt texts, columns and sheet URL — source outside the repo, versioned
  (v2 · 2026-10-17).
- Human-only values in `src/data/site.ts`: `pricing`, `readers`, social URLs, episode and pack
  names, brand claims.
- `astro.config.mjs` `site: 'https://srperera.com'` (canonical domain).
- `public/` assets: CV PDF, portraits, build screenshots, brand marks, favicons.
- Legacy React components and their dependencies — no deletion without a human decision.
- `.env*` files and any credential.
- Branches other than the agent's own `cdev/*` branches.
