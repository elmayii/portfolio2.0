// English at the root, Spanish under /es/ (DECISIONS 2026-10-27). Components read Astro.currentLocale.
import * as en from './site';
import * as es from './site.es';

export type Lang = 'en' | 'es';

export const langOf = (locale: string | undefined): Lang => (locale === 'es' ? 'es' : 'en');

export const copy = (lang: Lang) => (lang === 'es' ? es : en);

// Pages that exist in both languages. /guia (Spanish only) and the 404 have no twin.
const twins = [
  { en: '/', es: '/es/' },
  { en: '/welcome/', es: '/es/welcome/' },
];

const trim = (path: string) => path.replace(/(.)\/$/, '$1');

/** Both addresses of the page at `pathname`, or undefined when it exists in one language only. */
export const alternates = (pathname: string) =>
  twins.find((t) => [trim(t.en), trim(t.es)].includes(trim(pathname)));
