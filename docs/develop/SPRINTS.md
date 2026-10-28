# Sprints — srperera.com · SaaS-Killing World

> Plan consumed by docs/develop/AGENT_EXECUTION_PROTOCOL.md. Exactly one sprint is `ACTIVE`.
> Batches run sequentially. States: PENDING | READY | IN_PROGRESS | BLOCKED | DONE.

## Sprint 01 — Green gates and runtime baseline

Status: DONE

Goal: the redesign line builds on Astro 7 with a real type gate, and every route has recorded
runtime evidence, so later batches start from a verified base.

### Batch 01 — Astro 7 toolchain green + type gate

Status: DONE

Context: the working tree carries the human's uncommitted Astro 5.9 → 7.4 bump (plus
`readers: '+100'` in `site.ts`). This batch absorbs it (DECISIONS 2026-10-17). The dependency
changes below are pre-approved; nothing beyond them is.

Tasks:
- Cut `cdev/sprint-01-batch-01` from `feat/saas-killing-world-alt2`, carrying the uncommitted
  WIP into it.
- Upgrade `@astrojs/sitemap` and `@astrojs/react` to their Astro 7 compatible releases (check
  each package's peer range for `astro`).
- Add `@astrojs/check` and `typescript` as devDependencies and a `"check": "astro check"`
  script.
- Run `npx astro check` and fix the reported errors with type-level changes only. Do not
  exclude files, loosen `strict` or delete legacy code; if errors only go away by deleting
  legacy files, stop with `BLOCKED` naming that decision.
- Clear the Vite deprecation warnings only if a pre-approved upgrade clears them; otherwise list
  them in the handoff.
- If no Astro 7 compatible `@astrojs/react` exists → `BLOCKED`, minimum decision: "drop the
  React integration and the legacy components?".
- Append `/logs/` and `/.playwright-mcp/` to `.gitignore` (evidence stays out of git).
- Commit the WIP + upgrade + check script together as the batch commit.

Acceptance:
- `npm ci` passes from the committed lockfile.
- `npx astro check` → 0 errors (warnings and hints listed in the handoff).
- `npm run build` → exit 0 with no integration error; `dist/sitemap-index.xml` exists and lists
  `/`, `/welcome/`, `/r/playbook/`.
- `npm run preview` + Playwright: `/`, `/welcome`, `/r/playbook` render at 1280 and 375 with no
  console errors; screenshots referenced in the handoff.
- `git diff` holds only `package.json`, `package-lock.json`, `src/data/site.ts` (the WIP line),
  `.gitignore`, type fixes, and nothing else.

### Batch 02 — Runtime baseline of every flow

Status: DONE

Known defects carried from Batch 01 (fix here):
- D1 `/r/playbook` hero broken at every width: `.copy` names both the hero copy `<div>`
  (line 139) and the "Copy prompt" `<button>` (line 213), so the button rule (line 507: 44px
  height, ink background, white text) also hits the div — the H1 renders white on a black 44px
  bar and the lede spills into the members band. Root fix: give the button its own class.
- D2 `/welcome` is `noindex` but listed in `dist/sitemap-0.xml`. Root fix: `filter` in the
  sitemap integration config.

Tasks:
- Drive every interactive flow on preview with Playwright: subscribe form (empty, invalid,
  valid → `/welcome?source=hero`, `optin_email` stored), header anchors from home and from
  `/welcome` (`/#read` etc.), `/r/playbook` copy buttons (Copied status) and sheet links.
- Check every page at 375px: no horizontal scroll, header Subscribe on one line, hero form
  usable.
- Accessibility basics: one `h1` per page, labels, `alt` text, visible focus, keyboard reach of
  every control.
- Record each defect found as a numbered item in the handoff; fix only defects that are clearly
  bugs against current behaviour (not copy or design changes) within this batch.

Acceptance:
- A handoff entry with one line per flow (pass / fail + screenshot path).
- Every fix carries its own before/after evidence.
- Defects that need a human decision are listed as open questions, not fixed.

## Sprint 02 — Launch readiness

Status: ACTIVE

Goal: close the README "Before launch" list. Every batch below waits on a human input; each
names the minimum decision that unblocks it. Stripe checkout and PostHog are ABSENT in
PRODUCT.md and stay open questions until their inputs exist.

### Batch 01 — Fill launch placeholders

Status: DONE (2026-10-28)

System Reference: SYS-01-B02 (contract: workspace `workspace/contracts/sb-01-02.md`).

Unblocked 2026-10-27 (DECISIONS): the social URLs come from the panel (contract `sb-01-02`, read
from its real DB); every value the human has not given (RADAR #1 target, next episode, next pack,
reader count) is **hidden**, not left as `[brackets]` or `#`.

Tasks:
- Socials in `src/data/site.ts` from the contract: Instagram, TikTok, LinkedIn (the panel's URL
  replaces the current one), X, Substack; GitHub stays. `substackUrl` = the Substack URL.
- Items without a real value are not rendered (latest cards, next episode, next pack, reader
  count); components skip entries without a value instead of showing `#` or `[brackets]`.
- Socials with real URLs flow into JSON-LD `sameAs` automatically (only `http` URLs).

Acceptance:
- No `[` placeholder and no `'#'` link rendered anywhere in the built HTML.
- `site.ts` socials equal the contract values (L2 check in `sb-01-02`).
- Footer, latest cards and JSON-LD checked in the built HTML; Playwright on `/` at 1280/375.

### Batch 02 — Spanish version

Status: DONE (2026-10-28)

System Reference: SYS-01-B02. Runs after Batch 05.

Unblocked 2026-10-27 (DECISIONS): English at the root, Spanish under `/es/` (Astro i18n); on the
first visit a small inline script sends Spanish browsers (`navigator.languages` starting with
`es`) to `/es/…`; everyone else stays in English (fallback). A visible language switch stores the
choice and wins over detection. The agent translates the existing approved copy; the human
reviews the Spanish pages on the preview before publishing (Batch 06).

Tasks:
- Implement that routing; Spanish copy beside `site.ts` with the same shape; `lang`,
  `og:locale`, `hreflang` per page.

Acceptance:
- Every route renders in both languages with identical structure; language switch verified with
  Playwright at 1280/375; sitemap lists both.

### Batch 03 — Legacy React cleanup

Status: BLOCKED

Unblocks with: approval to delete `src/components/*.tsx`, `Canvas/`, `src/hooks/`,
`Welcome.astro`, `src/assets/`, `tailwind.config.js`, the `@astrojs/react` integration and the
`react`, `react-dom`, `@types/react*`, `framer-motion`, `react-icons` dependencies — and
whether the old CV PDF stays.

Acceptance:
- `astro check` 0 errors and 0 hints from legacy; build passes; the three routes look identical
  to `logs/evidence/01-02/` captures.

### Batch 04 — `/api/lead` capture Worker

Status: DONE (2026-10-27; live on `https://api.srperera.com/lead`)

System Reference: SYS-01-B01 (contract: workspace `workspace/contracts/sb-01-01.md`).

Was `/api/subscribe`. Its blockers were closed by the human on 2026-10-26 (DECISIONS): email
provider = Cloudflare Email Service, hosting = Cloudflare, and the API is a **separate Worker**
in `api/`, so the site itself stays static (no adapter, no server output). One endpoint serves
ManyChat, the TikTok guide page and the site's subscribe form.

Tasks:
- `api/` folder: `wrangler.jsonc` (Worker `srperera-api`; deployed on the custom domain `api.srperera.com` — the planned route `srperera.com/api/*` on zone
  `srperera.com`, D1 binding `DB`, `send_email` binding, rate limiting binding), `src/index.ts`
  and `schema.sql`. No `package.json`: run with `npx wrangler@4`; test with `node --test`
  (Node 24 strips types). No new dependency in the site.
- `POST /api/lead` exactly as the contract: validation, auth (`X-Lead-Secret` header or a
  Turnstile token), rate limit per IP on the web path, upsert in `people`, row in `requests`,
  at most 3 sends per email + keyword per day.
- Email in Spanish, text + HTML: guide link `https://srperera.com/r/<keyword>`, a join button to
  `https://srperera.substack.com/subscribe`, footer "reply to unsubscribe or delete your data".
  From `Mario Perera <guides@mail.srperera.com>`, reply-to `hello@srperera.com`.
- One `api/src/lead.test.ts` with the pure logic (body validation, keyword normalisation, daily
  cap decision).
- Prepared, not executed by the agent (human gates):
  - the human creates the Turnstile widget for `srperera.com` and gives the **site key**
    (public) and runs `! npx wrangler@4 secret put TURNSTILE_SECRET` and
    `! npx wrangler@4 secret put LEAD_SECRET` himself — the agent never sees a secret;
  - `npx wrangler@4 d1 create srperera`, `d1 execute --remote --file api/schema.sql` and
    `npx wrangler@4 deploy` run only with the human's OK at that moment.
- Report `docs/develop/reports/sprint-02-batch-04.md`: deployed URL, request/response shapes,
  Turnstile site key, how ManyChat calls it. No secrets.

Acceptance:
- `npm run check` and `npm run build` green (the site is untouched); `node --test api/` green
  (real command: `node --test "api/**/*.test.ts"`, DECISIONS 2026-10-27); `npx tsc -p api` green.
- Live, after the approved deploy: with the header → 200, row in D1 with `source=instagram`,
  the email reaches the human's Gmail in Spanish with the guide link and the Substack button;
  without header or Turnstile → 403 and no row; bad email → 400; fourth request of the same
  email + keyword in a day → `sent: false`.
- The report exists and contains no secret.

### Batch 05 — Capture on the site

Status: DONE (2026-10-28; Worker redeployed by the human, version `15ef985c`, live `GET /posts` green)

System Reference: SYS-01-B02 (contracts: workspace `sb-01-01` and `sb-01-02`).

Wait-for: `docs/develop/reports/sprint-02-batch-04.md` (the live API: URL, shapes, CORS).

Unblocks with (only for the Turnstile part): the Turnstile **site key** (public), given by the
human. Everything else can start.

Tasks:
- Subscribe form: `POST https://api.srperera.com/lead` with `source: web`, no keyword,
  `consent` checkbox (GDPR) and a Turnstile widget; on `200` keep today's behaviour (open the
  Substack subscribe page with the email, go to `/welcome?source=`). Clear error states for 400 /
  403 / 429.
- `/guia/[palabra]` (Spanish, `noindex`): one page for every keyword — title from the keyword,
  email + consent + Turnstile, `POST` with `source: tiktok` and the keyword, "te lo he enviado".
  Implemented as a single static page plus a rewrite in `public/_redirects`, so a new keyword needs
  no rebuild.
- `/r/<palabra>` mechanism: `public/_redirects` with one commented example line; real lines are
  added when a guide exists (its target is the guide's Substack post).
- Worker `GET /posts` (in `api/`, contract `sb-01-01`): the 3 newest Substack posts from
  `https://srperera.substack.com/api/v1/archive?sort=new&limit=3` (the RSS feed leaves out
  subscriber-only posts), mapped to `{title, subtitle, url, date, cover}`, cached 15 min, CORS for
  `https://srperera.com`; on any upstream error it answers `200 []`. Redeploy is a human gate.
- "Latest" section: loads `/posts` on page load and renders up to 3 cards linking straight to the
  Substack post (Substack itself asks for the email and subscribes; no form of ours in between);
  hidden when the list is empty. It replaces the static `latest` placeholders.
- Vault hidden: the Vault section, its header link and every member/vault mention stop rendering;
  `/welcome` keeps the confirmation and loses the paid plans. Components stay in the repo for the
  vault (SYSTEM Sprint 02).
- `/r/playbook` removed: the page goes; `_redirects` sends `/r/playbook` to `/` (301).
- README and PRODUCT.md updated (Before launch list, routes).

Acceptance:
- `npm run check`, `npm run build` green; Playwright on the preview at 1280/375: the form shows
  the widget and the consent box; with Cloudflare's always-pass test site key a submit reaches the
  API (a 403 from the real API is expected with the test key — the live 200 is checked in Batch 06);
  `/guia/prueba` renders in Spanish; no Vault anywhere; `/r/playbook` → `/`; the Latest section
  shows the example post (live `/posts` after the approved redeploy) and its card opens it.
- Added 2026-10-28 (Mario: «tiene que mostrar una pantalla personalizada de 404 de este post no
  existe»): an `/r/<palabra>` without a `_redirects` line answers HTTP 404 with a Spanish screen
  «Este post no existe» and a link home; other unknown paths answer 404 "Page not found"; real `/r/`
  rules, `/r/playbook` → `/` (301) and the `/guia/:palabra` rewrite keep working (checked on
  `npx wrangler@4 pages dev dist`, Playwright at 1280/375).
- Added 2026-10-28 (Mario: «Sí, procede con lo que propones»): `/welcome` tells a web sign-up to
  confirm in the Substack tab that just opened (no guide email goes out without a keyword).

### Batch 06 — Publish the new site on srperera.com

Status: PENDING

System Reference: SYS-01-B02.

Tasks:
- Pages build green for this line: read the failing build log of the `feat/saas-killing-world-alt2`
  previews (they fail since the Astro 7 upgrade) and fix the cause (suspected Node version: pin it
  the way Pages reads it, e.g. `.node-version`). Evidence: a green preview URL.
- Prepared, executed only with the human's OK at that moment: merge the batch branches into
  `feat/saas-killing-world-alt2`, then `feat/saas-killing-world-alt2` into `main`, push `main`;
  Pages publishes `main` on srperera.com.
- Live check on srperera.com.

Acceptance:
- srperera.com serves the new site (title, no Astro 5.9.3 generator); `/es/` for a Spanish
  browser; socials as in `sb-01-02`; the live form: a real submit (by the human, real Turnstile)
  answers 200 and a `people` row with `source=web` appears in D1.

## PROPOSAL — Next phase drafts (not active)

- Hero photo weight: `HeroImage.jpg` is 1706×2560 / 390KB, shown at ≤420×525 CSS px; a ~840px
  wide derivative (or `astro:assets` `<Picture>`) would cut most of the desktop LCP bytes.
- Phone navigation: at phone widths the header shows only the brand and Subscribe; Read /
  Builds / Vault / Work with me are unreachable except by scrolling. Decide whether that is
  intended.
- Reuse the face avatar in "Work with me" and as a signature on `/welcome`, `/r/playbook` and
  the footer (raised at the hero change, not approved).
- OG image: still `mario-portrait-bw.jpg`; a 1200×630 asset is needed to change it.
