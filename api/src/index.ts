// srperera-api — POST https://api.srperera.com/lead for ManyChat (X-Lead-Secret), the TikTok guide page and the
// site's subscribe form (Turnstile + per-IP limit); GET /posts for the site's Latest section.
// Contract: workspace workspace/contracts/sb-01-01.md.
// Pure logic lives in lead.ts (tested by lead.test.ts: `node --test "api/**/*.test.ts"`).
import { guideEmail, parseLead, toPosts, underDailyCap } from './lead.ts';

const FROM = { email: 'guides@mail.srperera.com', name: 'Mario Perera' };
const REPLY_TO = 'hello@srperera.com';
// The site calls the API cross-origin (it lives on api.srperera.com); ManyChat calls server to server.
const SITE_ORIGIN = 'https://srperera.com';

const json = (status: number, body: Record<string, unknown>) => Response.json(body, { status });

async function sameSecret(a: string, b: string): Promise<boolean> {
  // Constant-time compare of the SHA-256 digests (equal length by construction). Hand-rolled instead of
  // workerd's crypto.subtle.timingSafeEqual so the file also type-checks under the site's DOM tsconfig.
  const enc = new TextEncoder();
  const [ha, hb] = await Promise.all(
    [a, b].map(async (s) => new Uint8Array(await crypto.subtle.digest('SHA-256', enc.encode(s)))),
  );
  let diff = 0;
  for (let i = 0; i < ha.length; i++) diff |= ha[i] ^ hb[i];
  return diff === 0;
}

async function turnstileOk(token: string, ip: string, env: Env): Promise<boolean> {
  try {
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token, remoteip: ip }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!r.ok) return false;
    const v = await r.json<{ success?: boolean; hostname?: string }>();
    const hosts = env.TURNSTILE_HOSTNAMES.split(',').map((h) => h.trim());
    return v.success === true && hosts.includes(v.hostname ?? '');
  } catch {
    return false;
  }
}

// The RSS feed leaves out subscriber-only posts (where the guides live), so the archive JSON is read instead.
const ARCHIVE = 'https://srperera.substack.com/api/v1/archive?sort=new&limit=3';

async function posts(): Promise<Response> {
  const cache = await caches.open('posts');
  const hit = await cache.match(ARCHIVE);
  if (hit) return new Response(hit.body, hit); // fresh copy: the CORS header is added after
  try {
    const r = await fetch(ARCHIVE, { signal: AbortSignal.timeout(5_000) });
    if (!r.ok) throw new Error(String(r.status));
    const res = Response.json(toPosts(await r.json()), { headers: { 'Cache-Control': 'public, max-age=900' } });
    await cache.put(ARCHIVE, res.clone()); // 15 min (max-age); failures below are not cached
    return res;
  } catch (e) {
    console.error('posts_failed', (e as Error).message);
    return Response.json([]);
  }
}

async function handle(request: Request, env: Env): Promise<Response> {
  const path = new URL(request.url).pathname;
  if (path === '/posts')
    return request.method === 'GET' ? posts() : new Response(null, { status: 405, headers: { Allow: 'GET' } });
  if (path !== '/lead') return new Response(null, { status: 404 });
  if (request.method === 'OPTIONS')
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
      },
    });
  if (request.method !== 'POST') return new Response(null, { status: 405, headers: { Allow: 'POST' } });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json(400, { ok: false, error: 'invalid_body' });
  }
  // Validate before auth so a malformed request never burns a single-use Turnstile token.
  const lead = parseLead(body);
  if (typeof lead === 'string') return json(400, { ok: false, error: lead });

  const secret = request.headers.get('X-Lead-Secret');
  const viaSecret = !!secret && !!env.LEAD_SECRET && (await sameSecret(secret, env.LEAD_SECRET));
  if (!viaSecret) {
    if (!lead.turnstile) return json(403, { ok: false, error: 'forbidden' });
    const ip = request.headers.get('CF-Connecting-IP') ?? '';
    if (!(await env.WEB_LIMIT.limit({ key: ip })).success) return json(429, { ok: false, error: 'rate_limited' });
    if (!(await turnstileOk(lead.turnstile, ip, env))) return json(403, { ok: false, error: 'forbidden' });
  }

  const now = new Date().toISOString();
  // One transaction: upsert the person, count today's earlier requests, record this one.
  const [, prior] = await env.DB.batch<{ n: number }>([
    env.DB.prepare(
      `INSERT INTO people (email, source, consent_at, substack, created_at, updated_at)
       VALUES (?1, ?2, ?3, NULL, ?3, ?3)
       ON CONFLICT (email) DO UPDATE SET updated_at = excluded.updated_at`,
    ).bind(lead.email, lead.source, now),
    env.DB.prepare(
      'SELECT count(*) AS n FROM requests WHERE email = ?1 AND keyword IS ?2 AND created_at >= ?3',
    ).bind(lead.email, lead.keyword, now.slice(0, 10)),
    env.DB.prepare('INSERT INTO requests (email, keyword, source, created_at) VALUES (?1, ?2, ?3, ?4)').bind(
      lead.email,
      lead.keyword,
      lead.source,
      now,
    ),
  ]);

  let sent = false;
  if (lead.keyword !== null && underDailyCap(prior.results[0]?.n ?? 0)) {
    try {
      await env.EMAIL.send({ to: lead.email, from: FROM, replyTo: REPLY_TO, ...guideEmail(lead.keyword) });
      sent = true;
    } catch (e) {
      // The lead is stored; report sent=false. Log the error code only, never the address.
      console.error('send_failed', (e as { code?: string }).code ?? 'unknown');
    }
  }
  return json(200, { ok: true, sent });
}

export default {
  async fetch(request, env): Promise<Response> {
    const response = await handle(request, env);
    if (request.headers.get('Origin') === SITE_ORIGIN) {
      response.headers.set('Access-Control-Allow-Origin', SITE_ORIGIN);
      response.headers.set('Vary', 'Origin');
    }
    return response;
  },
} satisfies ExportedHandler<Env>;
