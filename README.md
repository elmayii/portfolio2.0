# srperera.com · SaaS-Killing World

Personal site of Mario Perera (sr_perera): the free newsletter, the guides and the two ways companies work with him.
Sign-ups go to the `srperera-api` Worker in `api/` (`https://api.srperera.com`); the site itself stays static.

## Run it locally

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
npm run preview    # serve dist/ locally
```

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home: hero, how the free guides work, series, latest (from `GET /posts`), builds, work with me |
| `/welcome` | Shown after the email form: confirmation |
| `/guia/<palabra>` | Spanish keyword guide form (noindex): one static page, served for every keyword by a rewrite in `public/_redirects` |
| `/r/<palabra>` | Redirect to the guide's Substack post: one line per guide in `public/_redirects` (`/r/playbook` → `/`, 301) |
| any other path | `404.html` with HTTP 404 (Pages): "Este post no existe" under `/r/`, "Page not found" elsewhere |

The Vault section and the member offer are hidden until the vault exists (components kept in `src/components/site/`).

Copy, links and prices live in `src/data/site.ts`. Components are in `src/components/site/`.

## Environment

| Variable | Use |
| --- | --- |
| `PUBLIC_SUBSTACK_URL` | Overrides `site.substackUrl` (`https://srperera.substack.com`): after a sign-up the form opens its subscribe page. |
| `PUBLIC_TURNSTILE_SITE_KEY` | Overrides the Turnstile site key. For a local preview use Cloudflare's always-pass test key `1x00000000000000000000AA` (the real key only works on srperera.com). |

`_redirects` only works on Cloudflare Pages: preview it locally with `npx wrangler@4 pages dev dist`.

## Before launch

- [x] Placeholders without a value are hidden (reader count, next episode, next pack)
- [x] Real links for TikTok, X and Substack in `src/data/site.ts`
- [x] Email form posts to `https://api.srperera.com/lead` (Turnstile + consent); Latest reads the Worker's `GET /posts`
- [ ] Stripe checkout links on `/welcome` and the vault card (vault hidden for now)
- [ ] PostHog with UTM capture and the event list from the plan
- [ ] Spanish version by browser language

The previous portfolio components (React) are still in `src/components/` but no longer used by any page.
