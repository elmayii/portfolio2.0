// Pure logic of /api/lead. Run: node --test "api/**/*.test.ts"   (Node 24 strips the types; no dependency.)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DAILY_CAP, guideEmail, normalizeKeyword, parseLead, underDailyCap } from './lead.ts';

const base = { email: 'Ana@Example.com ', source: 'instagram', consent: true };

test('valid body is normalised', () => {
  assert.deepEqual(parseLead({ ...base, keyword: ' PlayBook ' }), {
    email: 'ana@example.com',
    keyword: 'playbook',
    source: 'instagram',
    turnstile: null,
  });
  assert.deepEqual(parseLead({ ...base, source: 'web', turnstile: 'tok' }), {
    email: 'ana@example.com',
    keyword: null,
    source: 'web',
    turnstile: 'tok',
  });
});

test('bad email -> invalid_email', () => {
  for (const email of ['', 'nope', 'a@b', 'a b@c.com', `${'x'.repeat(250)}@a.com`]) {
    assert.equal(parseLead({ ...base, email }), 'invalid_email', email);
  }
});

test('malformed body -> invalid_body', () => {
  const bad: unknown[] = [
    null,
    [],
    'str',
    { ...base, email: 42 },
    { source: 'web', consent: true },
    { ...base, source: 'facebook' },
    { ...base, consent: false },
    { ...base, consent: 'true' },
    { ...base, keyword: 'no spaces' },
    { ...base, keyword: 'ñ' },
    { ...base, keyword: 7 },
    { ...base, turnstile: 1 },
    { ...base, turnstile: 'x'.repeat(2049) },
  ];
  for (const body of bad) assert.equal(parseLead(body), 'invalid_body', JSON.stringify(body)?.slice(0, 60));
});

test('keyword normalisation', () => {
  assert.equal(normalizeKeyword(undefined), null);
  assert.equal(normalizeKeyword('   '), null);
  assert.equal(normalizeKeyword('Agentes-IA-2'), 'agentes-ia-2');
  assert.equal(normalizeKeyword('a/b'), undefined);
  assert.equal(normalizeKeyword('x'.repeat(65)), undefined);
});

test('daily cap: 3 sends, the 4th request is not sent', () => {
  assert.equal(DAILY_CAP, 3);
  assert.deepEqual([0, 1, 2, 3, 4].map(underDailyCap), [true, true, true, false, false]);
});

test('guide email carries the guide link, the Substack button and the reply footer', () => {
  const m = guideEmail('playbook');
  for (const part of [m.text, m.html]) {
    assert.match(part, /https:\/\/srperera\.com\/r\/playbook/);
    assert.match(part, /https:\/\/srperera\.substack\.com\/subscribe/);
    assert.match(part, /Responde a este correo para darte de baja o borrar tus datos\./);
  }
  assert.match(m.subject, /playbook/);
});
