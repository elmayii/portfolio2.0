# Agent Progress — srperera.com · SaaS-Killing World

> Handoff log. One entry per meaningful step, **newest first** (the ordering is declared in the
> protocol; never mix orderings). Do not exaggerate progress.

## 2026-10-27 — Sprint 02 / Batch 04 closed (SYS-01-B01)

Status: DONE

Completed:
- Live acceptance: the human ran the 200 path with `LEAD_SECRET` → `sent: true`; email in Gmail
  (Promotions tab, inbox), Spanish, guide link + Substack link + footer; reply goes to
  `hello@srperera.com` (human).

Verification:
- Live: 200 · 403 ×2 · 400 · 405 · 404 · CORS preflight · email received: pass.
- Live daily cap: not-run (local evidence rows 7–9 pass).

Known:
- Gmail files the guide email under Promotions. Improvement for SYS-01-B04: plainer, personal HTML.

Next:
- SYS-01-B02 (site on srperera.com) — planned in the workspace.

## 2026-10-27 — Sprint 02 / Batch 04 deployed on api.srperera.com (SYS-01-B01)

Status: BLOCKED (live 200 path waits for the human, who holds `LEAD_SECRET`)

Completed:
- Human created D1 (schema applied), the Turnstile widget and both secrets; `database_id` set.
- First deploy on route `srperera.com/api/*`: never fired (Pages answered 405/HTML). Human chose
  the Worker custom domain `api.srperera.com`; path `/lead`, CORS for `https://srperera.com`.
- Redeployed: version `37cd6319`, trigger `api.srperera.com (custom domain)`.

Verification:
- `node --test "api/**/*.test.ts"` 6/6 · `npx tsc -p api` · `npm run check` 0 errors: pass.
- Live: 403 without auth and with a wrong secret · 400 bad email · 405 GET · 404 other path ·
  preflight 204 with the allowed origin · site root 200 · D1 0 rows: pass.
- Live 200 with the header and the email in Gmail: not-run (human).

Next:
- Human runs step 7 of the report; then close Batch 04 DONE.

## 2026-10-27 — Sprint 02, Batch 04 — `/api/lead` capture Worker (SYS-01-B01)

Status: BLOCKED (code + local evidence done; live acceptance waits for the human deploy gates)

Completed:
- `api/` Worker `srperera-api`: `POST /api/lead` per the contract — validation, auth by
  `X-Lead-Secret` (constant-time) or Turnstile (siteverify + hostname check), per-IP limit on the
  web path, upsert `people` + row in `requests` in one D1 batch, max 3 guide emails per email +
  keyword per UTC day, Spanish text + HTML email from `Mario Perera <guides@mail.srperera.com>`,
  reply-to `hello@srperera.com`. Route `srperera.com/api/*`; the static site is untouched.
- Config verified against current Cloudflare docs (send_email `allowed_sender_addresses`,
  `ratelimits`, D1, `secrets.required`, Turnstile siteverify/test keys). `database_id` is a marked
  placeholder.
- Type gate solved without touching the root tsconfig: `api/tsconfig.json` + committed
  `wrangler types` output, gate `npx tsc -p api`; `astro check` also covers `api/` (DECISIONS).
- Defect found and fixed during runtime: workerd refused to start because the main module had
  non-handler named exports → pure logic moved to `api/src/lead.ts`.
- Report `docs/develop/reports/sprint-02-batch-04.md`: shapes, ManyChat call, local evidence
  table, the exact human commands in order. No secrets anywhere.

Files changed:
- `api/wrangler.jsonc`, `api/src/index.ts`, `api/src/lead.ts`, `api/src/lead.test.ts`,
  `api/schema.sql`, `api/tsconfig.json`, `api/worker-configuration.d.ts` (generated), `.gitignore`
  (`/api/.wrangler/`, `/api/.dev.vars*`), `docs/develop/reports/sprint-02-batch-04.md`,
  `docs/develop/SPRINTS.md`, `docs/develop/DECISIONS.md`, `docs/develop/AGENT_PROGRESS.md`

Verification:
- npm ci: not-run (no dependency change)
- node --test "api/**/*.test.ts": pass — 6/6
- npx tsc -p api: pass — 0 errors
- npm run check: pass — 0 errors, 0 warnings, 13 hints (legacy)
- npm run build: pass — 3 pages, sitemap written
- npx wrangler@4 deploy --dry-run: pass — EMAIL (sender-restricted), DB, WEB_LIMIT, var
- local runtime (`wrangler dev --local`, local D1, simulated email, Turnstile test keys): pass —
  200 / `sent:false` on the 4th request / 400 / 403 (no header, wrong secret, failed Turnstile,
  hostname mismatch) / 429 on the 6th web request; 403/400 left no row (table in the report)
- Playwright evidence: not-run — no UI touched (the Worker has no page; curl is the evidence)
- live acceptance: not-run — waits for the human gates

Blockers (minimum human decision):
- Run, in order (report § Human actions): `d1 create srperera` (give the id), `d1 execute
  --remote --file schema.sql`, create the Turnstile widget (give the site key), `secret put
  LEAD_SECRET` + `TURNSTILE_SECRET`, `deploy`; then the live acceptance curls + Gmail check.

Next:
- After the deploy: put the `database_id` in `api/wrangler.jsonc`, run the live acceptance,
  record it here and close Batch 04 as DONE.

## 2026-10-26 — Sprint 02 / Batch 04 re-planned (SYS-01-B01)

Status: PLANNED

Completed:
- Batch 04 rewritten from `/api/subscribe` to the `/api/lead` capture Worker in `api/`; its
  blockers closed by the human (DECISIONS 2026-10-26). System Reference: SYS-01-B01, contract
  in the workspace `workspace/contracts/sb-01-01.md`.

Next:
- `/cdev` on Batch 04 from a `cdev/sprint-02-batch-04` branch. Deploy, D1 creation and secrets
  wait for the human at the moment.

## 2026-10-17 17:50 — Sprint 01 merged

Status: DONE

Completed:
- Human approved: `cdev/sprint-01-batch-01` + `cdev/sprint-01-batch-02` fast-forwarded into
  `feat/saas-killing-world-alt2` (`130c03f..f9cb7c2`) and pushed to origin.

Next:
- Sprint 02 batches stay BLOCKED on the inputs listed in the entry below; new batch branches
  are cut from `feat/saas-killing-world-alt2`.

## 2026-10-17 17:40 — Sprint 01 closed; Sprint 02 ACTIVE, all batches BLOCKED

Status: PAUSED

Completed:
- Sprint 01 DONE. Sprint 02 (launch readiness) promoted to ACTIVE with four batches, each
  BLOCKED on a named human input. Stripe and PostHog stay open questions (ABSENT).
- Plan exhausted inside DEFINED/PARTIAL: self-chosen order checked — (1) README "Before launch"
  items all wait on human values or gates; (2) no EN/ES parity yet; (3) gates green, every
  route has evidence, a11y basics pass; (4) next-phase ideas written as `PROPOSAL` in
  SPRINTS.md (hero photo weight, phone navigation, avatar reuse, OG image).

Blockers (minimum human decision each):
- Sprint 02 / Batch 01: real URLs for TikTok, X, Substack, RADAR #1; next episode title; next
  pack name + line.
- Sprint 02 / Batch 02: Spanish routing (`/es/` vs browser detection) + who approves the copy.
- Sprint 02 / Batch 03: approval to delete the legacy React code and its dependencies.
- Sprint 02 / Batch 04: email provider + hosting + approval for the adapter/server output.
- Merging `cdev/sprint-01-batch-01` and `cdev/sprint-01-batch-02` (stacked) into
  `feat/saas-killing-world-alt2` and pushing: human gate.

Next:
- Any of the decisions above → `/cdev` resumes on the unblocked batch.

## 2026-10-17 17:35 — Sprint 01, Batch 02 — Runtime baseline of every flow

Status: DONE

Completed:
- D1 fixed: the "Copy prompt" button in `/r/playbook` now has its own class `.copy-btn`; the
  hero copy `div.copy` keeps its layout (background transparent, H1 and lede visible, no
  spill into the members band).
- D2 fixed: `sitemap({ filter })` keeps the `noindex` `/welcome` out of the sitemap.
- Flows driven on preview (`:4322`) with Playwright:
  - Subscribe (hero, 375): empty → error shown + input focused; `not-an-email` → error; valid
    `test@example.com` → `/welcome?source=hero`, `localStorage.optin_email` stored. pass
  - Header anchors (1280): `/welcome` → Read → `/#read` and Builds → `/#built` land on the
    section; on home Work with me → `#work`. All six anchors exist. pass
  - `/r/playbook`: Copy prompt shows "Copied", button keeps its style; both sheet links point to
    the Google Sheets copy URL. pass
  - 375px: no horizontal overflow on `/`, `/welcome`, `/r/playbook`. pass
  - A11y basics: one `h1` per page, 0 images without `alt`, 0 unlabeled controls, 21 focusable
    elements on home all take focus with a visible outline (checked with script `focus()`,
    not a manual Tab walk). pass

Files changed:
- `src/pages/r/playbook.astro`, `astro.config.mjs`, `docs/develop/SPRINTS.md`,
  `docs/develop/AGENT_PROGRESS.md`

Verification:
- npm ci: not-run (no dependency change in this batch)
- npx astro check: pass — 0 errors, 0 warnings, 13 hints (legacy)
- npm run build: pass — sitemap lists `/` and `/r/playbook/` only
- runtime evidence: pass — 0 console errors/warnings; screenshots
  `logs/evidence/01-02/playbook-1280-after.png`, `playbook-375-after.png`,
  `subscribe-invalid-375.png` (before: `logs/evidence/01-01/playbook-*.png`)

Observations needing a human decision (not fixed):
- Phone header hides Read / Builds / Vault / Work with me; there is no phone menu.
- Placeholder `#` links still live: TikTok, X, Substack (footer), RADAR #1 and SaaS Kill #01
  (latest), both plans and "Subscribe there" on `/welcome`.
- The email error line sits ~2px from the reader count under the hero form (tight, readable).

Next:
- Sprint 01 closes (see entry above).

## 2026-10-17 17:25 — Sprint 01, Batch 01 — Astro 7 toolchain green + type gate

Status: DONE

Completed:
- Absorbed the human's WIP (Astro ^5.9.3 → ^7.4.0, `readers: '+100'`).
- Upgraded `@astrojs/react` ^4.3.0 → ^7.1.0 (its devDeps target astro 7.4.0) and
  `@astrojs/sitemap` ^3.4.1 → ^3.7.4 (targets astro 7.2.10) — pre-approved set.
- Added devDependencies `@astrojs/check` ^0.9.10 and `typescript` ^6.0.3 (`@astrojs/check`
  peers `typescript ^5 || ^6`; TS 7 is out of range) and the `check` script.
- `.gitignore`: `/logs/`, `/.playwright-mcp/`.
- No type fixes were needed. The React upgrade also cleared every Vite `esbuild`/
  `optimizeDeps` deprecation warning (0 left).
- Gate honesty probe: a throwaway `src/__gate_probe.ts` with `const n: number = 'x'` made
  `astro check` exit 1 with ts(2322); file removed. The type gate checks the real project.

Files changed:
- `package.json`, `package-lock.json`, `src/data/site.ts`, `.gitignore`,
  `docs/develop/SPRINTS.md`, `docs/develop/AGENT_PROGRESS.md`

Verification:
- npm ci: not-run (lockfile regenerated by `npm install` in this batch; same tree)
- npx astro check: pass — 35 files, 0 errors, 0 warnings, 13 hints (unused imports in legacy
  `src/components/*.tsx`)
- npm run build: pass — exit 0, 3 pages, `sitemap-index.xml` created, `sitemap-0.xml` lists
  `/`, `/r/playbook/`, `/welcome/`
- runtime evidence: pass — `astro preview --port 4322` (4321 is the human's dev server) +
  Playwright, `/`, `/welcome`, `/r/playbook` at 1280×800 and 375×812, 0 console
  errors/warnings, no horizontal overflow. Screenshots: `logs/evidence/01-01/*.png`

Blockers:
- None.

Defects found (pre-existing, not caused by this batch; carried to Batch 02):
- D1 `/r/playbook` hero layout broken by a `.copy` class collision (div + button).
- D2 `/welcome` (`noindex`) listed in the sitemap.

Next:
- Sprint 01 / Batch 02 on `cdev/sprint-01-batch-02`, stacked on this branch (unmerged).

## 2026-10-17 16:35 — Reconciliation (human-directed work outside the plan)

Status: DONE

Completed:
- Recorded commit `130c03f` on `feat/saas-killing-world-alt2` (made and pushed at the human's
  request, outside any batch): hero uses `HeroImage.jpg` on desktop (color, straight 4:5 crop
  anchored to the top, no mask/fade, column `min(420px, 40%)`); phones get the
  `partner-mario-perera.jpg` 72px avatar next to the kicker and a 1px `<picture>` source so the
  390KB photo is not downloaded; phone H1 `min(40px, 9.5vw)` keeps "Welcome to the" on one line
  down to 320px. Driven by an external design critique (fade/B&W portrait read as "coach
  landing"; talk photo had the crown cropped and vanished on mobile).
- Pending ideas from that conversation, not planned: use the avatar in "Work with me" and as a
  signature on `/welcome`, `/r/playbook` and the footer; OG image still
  `mario-portrait-bw.jpg` (needs a 1200×630 asset).

Files changed:
- `src/components/site/Hero.astro`, `public/partner-mario-perera.jpg`

Verification:
- npx astro check: not-run (gate absent until Batch 01)
- npm run build: not-run (red on the Astro 7 WIP, see bootstrap entry)
- runtime evidence: pass — dev server + Playwright at 1280, 880, 375, 320: full head in crop,
  avatar visible, H1 on 3 lines at 375/320, no horizontal overflow, 0 console errors/warnings,
  `currentSrc` on phones is the 1px source

Blockers:
- None.

Next:
- Sprint 01 / Batch 01 (now IN_PROGRESS on `cdev/sprint-01-batch-01`).

## 2026-10-17 16:00 — Bootstrap (conditioning)

Status: DONE

Completed:
- Repository conditioned for CDev as **frontend** (static Astro site, no backend).
- Recognition, protocol deltas, clarity map, decisions and plan written. Sprint 01 ACTIVE,
  Batch 01 READY.

Files changed:
- `AGENTS.md`, `CLAUDE.md` (pointer)
- `docs/develop/RECOGNITION.md`, `AGENT_EXECUTION_PROTOCOL.md`, `PRODUCT.md`, `DECISIONS.md`,
  `SPRINTS.md`, `AGENT_PROGRESS.md`

Verification (gate audit on the working tree with the uncommitted Astro 7.4 bump):
- npm ci: not-run (node_modules already installed from the WIP lockfile)
- npx astro check: not-run — gate absent (`@astrojs/check`, `typescript` not installed)
- npm run build: fail — `[@astrojs/sitemap] Cannot read properties of undefined (reading 'reduce')` in `astro:build:done`
- runtime evidence (Playwright): not-run — conditioning only

Blockers (each naming the minimum human decision required):
- None for Batch 01: the Astro 7 WIP and its dependency changes were pre-approved at the gate.
- Note: the WIP (`package.json`, `package-lock.json`, `src/data/site.ts`) stays uncommitted on
  `feat/saas-killing-world-alt2` on purpose; Batch 01 commits it.

Next:
- `/cdev` → Sprint 01 / Batch 01 — Astro 7 toolchain green + type gate.

---

## Progress Log Format

After every meaningful step, add at the top of `docs/develop/AGENT_PROGRESS.md`:

```md
## <YYYY-MM-DD HH:mm> — Sprint <n>, Batch <n>

Status: DONE | IN_PROGRESS | BLOCKED | PAUSED

Completed:
- ...

Files changed:
- ...

Verification (one line per command of the protocol's verification sequence):
- <command>: pass / fail / not-run
- ...

Blockers (each naming the minimum human decision required):
- ...

Next:
- ...
```

Do not exaggerate progress. Do not mark incomplete work as DONE. Omitting a check you did not
run turns a report into an argument — record `not-run` explicitly.
