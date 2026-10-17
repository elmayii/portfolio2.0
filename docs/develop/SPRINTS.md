# Sprints — srperera.com · SaaS-Killing World

> Plan consumed by docs/develop/AGENT_EXECUTION_PROTOCOL.md. Exactly one sprint is `ACTIVE`.
> Batches run sequentially. States: PENDING | READY | IN_PROGRESS | BLOCKED | DONE.

## Sprint 01 — Green gates and runtime baseline

Status: ACTIVE

Goal: the redesign line builds on Astro 7 with a real type gate, and every route has recorded
runtime evidence, so later batches start from a verified base.

### Batch 01 — Astro 7 toolchain green + type gate

Status: READY

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

Status: PENDING

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

## Sprint 02+ — Launch readiness: Spanish version and launch integrations

Status: PENDING

Candidate scope (each needs its PRODUCT.md open questions answered first): fill launch
placeholders with human-provided values; Spanish version (routing decision + approved copy);
`/api/subscribe` (provider + adapter gate); Stripe checkout links; PostHog events; legacy React
cleanup.
