# Decisions — srperera.com · SaaS-Killing World

> Append decisions as they are made. Format: date — decision — rationale.

- 2026-10-27 — **Launch decisions for SYS-01-B02** (human, workspace DECISIONS 2026-10-27):
  social URLs from the panel (LinkedIn `mario-sr-perera-b30921237`, X `mariosrperera`, TikTok
  `@sr_perera_`, Substack `srperera.substack.com`); values not given are hidden; the Vault section
  and the paid plans of `/welcome` are hidden until the vault exists; `/r/playbook` is removed
  (301 to `/`; PLAYBOOK was discarded); the site is English and Spanish by browser language,
  English fallback (`/es/`, Batch 02); publishing = merge into `main` with the human's OK.
- 2026-10-27 — Assumptions (no question): `/guia/[palabra]` and the guide email are Spanish only;
  the agent translates the approved English copy and the human reviews it on the preview before
  Batch 06; the Vault components stay in the repo (hidden, not deleted).

- 2026-10-27 — **The API moves to the Worker custom domain `api.srperera.com` (path `/lead`)**,
  not the route `srperera.com/api/*`: deployed that way, the route never fired because Pages serves
  `srperera.com`. The site calls it cross-origin: the Worker answers the `OPTIONS` preflight and
  allows only `https://srperera.com`. — Human («sí, vamos por A»).

- 2026-10-27 — `api/` is its own TypeScript project: `api/tsconfig.json` (workerd runtime types
  from the committed `npx wrangler@4 types` output `api/worker-configuration.d.ts`, no DOM) with
  its own gate `npx tsc -p api`. The root `tsconfig.json` is **not** changed (no exclusion): its
  `**/*` include keeps `api/` under `npx astro check` too, so the Worker code is written to pass
  both (hence a hand-rolled constant-time compare instead of workerd-only
  `crypto.subtle.timingSafeEqual`). — Sprint 02 / Batch 04; honours the "no exclusion to pass a
  gate" rule. Side effect: the Worker's global types are visible to the site's type check.
- 2026-10-27 — Pure logic of the Worker lives in `api/src/lead.ts`, not `index.ts`. — workerd
  treats every named export of the main module as an entrypoint and refuses to start with a
  non-handler export (`Incorrect type for map entry 'DAILY_CAP'`), seen in `wrangler dev`.
- 2026-10-27 — `/api/lead` details the contract leaves open (agent, reversible): daily cap counts
  the email + keyword requests of the current **UTC calendar day** (4th → `sent: false`, the
  request is still recorded); validation runs before auth (a malformed request never burns a
  single-use Turnstile token); a wrong `X-Lead-Secret` falls back to Turnstile; Turnstile must
  report a hostname in `TURNSTILE_HOSTNAMES` (`srperera.com`), no `action` check; web limit 5
  requests / 60 s per `CF-Connecting-IP` (namespace `2601`); `people.consent_at` and `source`
  keep the first value; an email-send failure still answers `200 {sent:false}` (the lead is
  stored) and logs only the error code; other paths 404, other methods 405.
- 2026-10-27 — The pure-logic test command is `node --test "api/**/*.test.ts"`: on Node 24
  `node --test api/` tries to load `api` as a module and fails.

- 2026-10-26 — **Hosting moves to Cloudflare; the API is a separate Worker in `api/`** at route
  `srperera.com/api/*`. The site stays static (no adapter). — Human; isolates secrets and
  dependencies from the site (workspace DECISIONS 2026-10-26).
- 2026-10-26 — **One endpoint, `/api/lead`**, for ManyChat (shared secret), the TikTok guide
  page and the subscribe form (Turnstile + per-IP limit). People are stored in D1 (`people`,
  reused later by the vault). — Human.
- 2026-10-26 — **Email from Cloudflare Email Service**: `guides@mail.srperera.com`, reply-to
  `hello@srperera.com`, in Spanish, guide link + invitation to Substack. — Human.
- 2026-10-26 — **Gates opened for Sprint 02 / Batch 04 only:** an API route (as the separate
  Worker), D1, and `npx wrangler@4` without adding it to `package.json`. Deploy, D1 creation and
  every secret stay human-run at the moment. — Human («lo hago todo yo» for the keys).
- 2026-10-26 — Assumptions (no question): resend allowed up to 3 times a day per email +
  keyword; unsubscribe/delete by replying to the email; the email link `/r/<keyword>` is served
  by the site from SYS-01-B02, so it may 404 until then.

- 2026-10-17 — Role resolved as **frontend** (static, no backend). — Astro static output, no
  adapter or API routes; external services by link only.
- 2026-10-17 — Batch branches are cut from `feat/saas-killing-world-alt2`, not `main`. —
  `main` still carries the old portfolio; alt2 is the active redesign line chosen by the human.
- 2026-10-17 — The uncommitted working-tree changes (`astro` ^5.9.3 → ^7.4.0 in
  `package.json`/`package-lock.json`, `readers: '+100'` in `site.ts`) are human-approved work
  that Sprint 01 / Batch 01 **absorbs and commits**. — Human decision at the bootstrap gate.
- 2026-10-17 — **Dependency pre-approval, Batch 01 only:** upgrade `@astrojs/sitemap` and
  `@astrojs/react` to their Astro 7 compatible releases; add `@astrojs/check` and `typescript`
  as devDependencies; add a `"check": "astro check"` script. Nothing else. — Human decision at
  the bootstrap gate; required to make the build green and to create the missing type gate.
- 2026-10-17 — No lint or test framework is added. — None exists; static content site;
  runtime evidence through Playwright covers behaviour. Revisit if logic grows.
- 2026-10-17 — `Plan_SEO.md` and `landing-plan.txt` are kept but ranked superseded/obsolete. —
  They describe the old React portfolio; deleting them is the human's call.
- 2026-10-17 — CDev documents are written in English. — Human choice; matches README and site
  copy.
- 2026-10-17 — Handoff log ordering: newest-first. — Default of the protocol.
