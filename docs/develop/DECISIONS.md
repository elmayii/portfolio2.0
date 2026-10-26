# Decisions — srperera.com · SaaS-Killing World

> Append decisions as they are made. Format: date — decision — rationale.

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
