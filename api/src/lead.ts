// Pure logic of POST /api/lead (no Workers APIs), shared by index.ts and lead.test.ts.
// Kept out of index.ts because workerd treats every named export of the main module as an entrypoint.

export type Source = 'instagram' | 'tiktok' | 'web';
export interface Lead {
  email: string;
  keyword: string | null; // null = sign-up without a guide (no email is sent)
  source: Source;
  turnstile: string | null;
}

export const DAILY_CAP = 3; // guide emails per email + keyword per UTC day
const SOURCES: readonly string[] = ['instagram', 'tiktok', 'web'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const KEYWORD_RE = /^[a-z0-9-]{1,64}$/;
const JOIN_URL = 'https://srperera.substack.com/subscribe';

/** Lowercased keyword; `null` when absent or blank; `undefined` when malformed. */
export function normalizeKeyword(raw: unknown): string | null | undefined {
  if (raw === undefined || raw === null) return null;
  if (typeof raw !== 'string') return undefined;
  const keyword = raw.trim().toLowerCase();
  if (keyword === '') return null;
  return KEYWORD_RE.test(keyword) ? keyword : undefined;
}

export function parseLead(body: unknown): Lead | 'invalid_email' | 'invalid_body' {
  if (typeof body !== 'object' || body === null || Array.isArray(body)) return 'invalid_body';
  const b = body as Record<string, unknown>;
  const keyword = normalizeKeyword(b.keyword);
  const turnstile = b.turnstile ?? null;
  if (
    typeof b.email !== 'string' ||
    keyword === undefined ||
    typeof b.source !== 'string' ||
    !SOURCES.includes(b.source) ||
    b.consent !== true ||
    (turnstile !== null && (typeof turnstile !== 'string' || turnstile.length > 2048))
  ) {
    return 'invalid_body';
  }
  const email = b.email.trim().toLowerCase();
  if (email.length > 254 || !EMAIL_RE.test(email)) return 'invalid_email';
  return { email, keyword, source: b.source as Source, turnstile };
}

/** `prior` = requests for the same email + keyword earlier today (UTC). */
export function underDailyCap(prior: number): boolean {
  return prior < DAILY_CAP;
}

export function guideEmail(keyword: string): { subject: string; text: string; html: string } {
  const guide = `https://srperera.com/r/${keyword}`; // keyword is [a-z0-9-] only: safe in URL and HTML
  const text = [
    'Hola,',
    '',
    'Aquí tienes la guía que pediste:',
    guide,
    '',
    'Si quieres más guías como esta, únete gratis a SaaS-Killing World:',
    JOIN_URL,
    '',
    'Mario Perera',
    '',
    '--',
    'Responde a este correo para darte de baja o borrar tus datos.',
  ].join('\n');
  const html = `<!doctype html><html lang="es"><body style="margin:0;padding:24px;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#111111;line-height:1.5">
<p>Hola,</p>
<p>Aquí tienes la guía que pediste:<br><a href="${guide}" style="color:#0057FF">${guide}</a></p>
<p>Si quieres más guías como esta, únete gratis a SaaS-Killing World:</p>
<p><a href="${JOIN_URL}" style="display:inline-block;padding:12px 20px;background:#0057FF;color:#ffffff;text-decoration:none;font-weight:bold;border-radius:4px">Unirme a SaaS-Killing World</a></p>
<p>Mario Perera</p>
<hr style="border:none;border-top:1px solid #dddddd">
<p style="font-size:12px;color:#666666">Responde a este correo para darte de baja o borrar tus datos.</p>
</body></html>`;
  return { subject: `Tu guía: ${keyword}`, text, html };
}
