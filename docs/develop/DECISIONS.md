# Decisions — srperera.com · SaaS-Killing World

> Append decisions as they are made. Format: date — decision — rationale.

- 2026-10-28 — Spanish version, details the plan leaves open (agent, reversible; Sprint 02 / Batch 02):
  `/es/` and `/es/welcome/` are two-line pages that render `../index.astro` / `../welcome.astro`, and every
  component picks its copy by `Astro.currentLocale` through `src/data/i18n.ts` (`copy(lang)`), so both
  languages share one markup. Copy that sat in components (hero, section titles, receipt, work doors,
  about, welcome, web-form messages) moved into `site.ts` as `ui` and `doors`; `site.es.ts` mirrors every
  export (typed `typeof en.<export>`; links, images and prices are spread from `site.ts`). The language
  switch is `ES`/`EN` in the header, visible at every width (phone spacing tightened so it fits on one
  line at 375px), stored in `localStorage.lang`. The inline head script runs only on pages with a twin
  (`/`, `/welcome/`): stored choice wins in both directions; without one, only a browser whose first
  `navigator.languages` entry starts with `es` is sent to `/es/` — an English browser opening `/es/` stays.
  Query and hash are kept (`/welcome/?source=` survives). The Spanish web form lands on
  `/es/welcome?source=`; `source` values and the API call are unchanged. `hreflang` en/es/x-default and
  `og:locale:alternate` only on twinned pages; the sitemap gets the alternates from `@astrojs/sitemap`'s
  `i18n` option (no new dependency). The 404 stays one file: unknown `/es/…` paths get Spanish text and a
  `/es/` link, but the header and footer stay English there. Series names (`SaaS Kill #N`, `Don't pay for
  this`, `Boring Apps #N`, `AI Money Radar`), `Growth Partner`, `PLAYBOOK` and prices are not translated
  (names are human-only values); Mario reviews the Spanish on the preview (Batch 06).

- 2026-10-28 — **Unknown `/r/<palabra>` shows a custom 404 "Este post no existe"** with HTTP 404 and a
  link home; `/welcome` tells web sign-ups to confirm in the Substack tab (a web sign-up has no
  keyword, so no guide email). — Human, relayed by the workspace coordinator (Mario: «tiene que
  mostrar una pantalla personalizada de 404 de este post no existe»; «Sí, procede con lo que
  propones»). Implementation (agent): one top-level `src/pages/404.astro` → `dist/404.html`, which
  Cloudflare Pages serves with 404 for any unmatched path and which turns off its SPA fallback, so
  every unknown path now answers 404 ("Page not found", English); an inline script switches it to the
  Spanish post message, `lang="es"` and title for `/r/…`. A separate `dist/r/404.html` is not possible
  from Astro pages (`r/404.astro` → `r/404/index.html`, `r/404.html.astro` → `r/404.html/index.html`),
  and `_redirects` cannot answer 404. `_redirects` rules still run first.
- 2026-10-28 — The Worker redeploy for `GET /posts` was approved by the human (relayed: «Te doy el ok
  para redesplegar»), but the agent's permission system refused `npx wrangler@4 deploy` (production
  deploy). Not worked around; the human runs it or allows it.

- 2026-10-28 — Capture on the site, details the plan leaves open (agent, reversible; Sprint 02 / Batch 05):
  the form opens a blank tab **inside the click** and sends it to Substack only after `200` (closed on
  any failure), so popup blockers (Safari) do not drop the Substack step that opening after an `await`
  would lose; `/guia/<palabra>` is `src/pages/guia/index.astro` behind `/guia/:palabra /guia/ 200`,
  the keyword is read from the address bar with the Worker's rule (`[a-z0-9-]{1,64}`), and a missing or
  malformed keyword removes the form with a message; `sent:false` there reads "ya te lo envié hoy";
  `site.apiUrl` holds `https://api.srperera.com`; the Turnstile site key lives in `site.ts` with a
  `PUBLIC_TURNSTILE_SITE_KEY` override for local previews (always-pass test key); `GET /posts` caches
  successful answers 15 min with the Cache API (`caches.open('posts')`, failures not cached), other
  methods 405; the Latest section stays hidden when `/posts` is empty or unreachable; `/welcome`'s
  "No thanks, I'll stay free" became "Back to the home page" and the meta description lost the vault
  phrase (Vault hidden); `/guia` is out of the sitemap (noindex). `Layout.astro` gained a `lang` prop
  (`og:locale` follows) for the Spanish page — Batch 02 builds on it.
- 2026-10-28 — Local evidence for `_redirects` uses `npx wrangler@4 pages dev dist` (`astro preview`
  ignores `_redirects`); the Worker is served with `npx wrangler@4 dev --local --var ...` (no `.dev.vars`
  file). Because the Worker only allows the `https://srperera.com` origin, Playwright routes
  `api.srperera.com` server-side: `/posts` to the local Worker, `/lead` to the real API (unchanged
  answer, CORS header added). The 200/400/429 client branches are exercised with labelled stubs.

- 2026-10-27 — **Guides live in Substack as "Subscribers only" posts** (free subscribers included):
  Substack shows the start and asks for the email to keep reading, which subscribes the reader.
  The site lists the 3 newest posts through the Worker (`GET /posts`, Substack's archive JSON —
  the RSS leaves those posts out) and links straight to them. — Human asked for it; mechanism
  chosen by the agent («eso ya lo dirías tú»). First example post published 2026-10-27, web only.

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
