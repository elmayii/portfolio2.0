# srperera.com · SaaS-Killing World

Personal site of Mario Perera (sr_perera): the free newsletter, the guides and the two ways companies work with him.

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
| `/` | Home: hero, how the free guides work, series, latest, builds, vault, work with me |
| `/welcome` | Shown after the email form: confirmation + member offer |
| `/r/playbook` | Free guide for the keyword PLAYBOOK (will move to vault.srperera.com) |

Copy, links and prices live in `src/data/site.ts`. Components are in `src/components/site/`.

## Environment

| Variable | Use |
| --- | --- |
| `PUBLIC_SUBSTACK_URL` | e.g. `https://saaskillingworld.substack.com`. When set, the email form also opens the Substack subscribe page. |

## Before launch

- [ ] Replace placeholders in `[brackets]` (reader count, next episode, next pack)
- [ ] Real links for TikTok, X and Substack in `src/data/site.ts`
- [ ] `/api/subscribe` route (Vercel adapter) instead of the Substack redirect
- [ ] Stripe checkout links on `/welcome` and the vault card
- [ ] PostHog with UTM capture and the event list from the plan
- [ ] Spanish version by browser language

The previous portfolio components (React) are still in `src/components/` but no longer used by any page.
