// Site copy and links in one place, so text changes don't touch the components.
// Anything in [brackets] is a placeholder to fill before launch; an empty value is not rendered.
// English copy; src/data/site.es.ts mirrors every export in Spanish for /es/ (src/data/i18n.ts picks one).

export const site = {
  name: 'Mario Perera',
  handle: 'sr_perera',
  url: 'https://srperera.com',
  title: 'Mario Perera — Welcome to the SaaS-Killing World',
  description:
    'I rebuild the apps you pay for with AI and show you how. Free guides, and help for teams.',
  readers: '', // reader count not given yet: the hero line is hidden while empty
  // Sign-ups also open Substack; PUBLIC_SUBSTACK_URL overrides it.
  substackUrl: import.meta.env.PUBLIC_SUBSTACK_URL || 'https://srperera.substack.com',
  // srperera-api Worker (workspace contract sb-01-01): POST /lead, GET /posts.
  apiUrl: 'https://api.srperera.com',
  // Turnstile widget for srperera.com (public). PUBLIC_TURNSTILE_SITE_KEY overrides it, e.g. with Cloudflare's
  // always-pass test key 1x00000000000000000000AA for a local preview (the real key only works on srperera.com).
  turnstileSiteKey: import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || '0x4AAAAAAFnzmCI-VUL3f-rLCNA9yyBx5rk',
};

// From the community panel (workspace contract sb-01-02); GitHub is not in the panel.
export const socials = [
  { name: 'Instagram', url: 'https://www.instagram.com/sr_perera/' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@sr_perera_' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/mario-sr-perera-b30921237' },
  { name: 'X', url: 'https://x.com/mariosrperera' },
  { name: 'Substack', url: 'https://srperera.substack.com' },
  { name: 'GitHub', url: 'https://github.com/elmayii' },
];

export const steps = [
  {
    title: 'Watch a reel',
    text: 'Each reel takes apart one paid app or service and shows how to build it yourself.',
  },
  {
    title: 'Comment the keyword',
    text: 'Comment the word on screen, like PLAYBOOK. My bot answers in your DMs.',
  },
  {
    title: 'Get the guide by email',
    text: 'Leave your email in the chat. The prompts land in your inbox a minute later.',
  },
];

export const series = [
  {
    name: 'SaaS Kill #N',
    formula: 'Stop paying for [app]. Build it in [time].',
    text: 'One subscription per episode, rebuilt with AI, with what it really costs to run.',
  },
  {
    name: "Don't pay for this",
    formula: '[Service] charges $X for [task]. Do this instead.',
    text: 'Expensive services taken apart step by step, so you can do the job yourself.',
  },
  {
    name: 'Boring Apps #N',
    formula: 'This boring app costs $X. Once.',
    text: 'Small apps you pay for once. The free version solves the problem, and how I built it is free too.',
  },
  {
    name: 'AI Money Radar',
    formula: 'Cash for AI builders. Every Monday.',
    text: 'Hackathons, grants and credits that are open right now, checked on their official pages.',
  },
];

export const builds = [
  {
    name: 'VivoBot',
    stack: 'AGENT · NESTJS · REDIS · OPENAI',
    text: "A WhatsApp agent that walks VivoFácil's field workers through every work order.",
    image: '/images/builds/vivobot.jpg',
    alt: 'VivoBot guiding a field worker through a work order in WhatsApp',
    position: 'top',
  },
  {
    name: 'DocAI',
    stack: 'WEB APP · NEXT.JS · SHADCN',
    text: 'Builds business documents from templates, so an agency stops writing them by hand.',
    image: '/images/builds/docai.jpg',
    alt: 'DocAI document list for an automations agency',
    position: '22% center',
  },
  {
    name: 'CompraChat',
    stack: 'ASSISTANT · PYTHON · OPENAI · PLAYWRIGHT',
    text: 'A shopping assistant that finds the lower price for shoppers in Spain.',
    image: '/images/builds/comprachat.jpg',
    alt: 'CompraChat comparing product prices',
    position: 'center',
  },
];

// Packs with an empty key are not rendered.
export const packs = [
  { key: 'PLAYBOOK', text: 'Lead sheet, router, drafter and call follow-ups' },
  { key: 'RADAR', text: 'The daily search task that finds open prize money' },
  { key: '', text: '[One line on what it builds]' }, // [NEXT PACK]
];

// Stripe payment links for /welcome; a plan without a link is not rendered.
export const checkout = { monthly: '', yearly: '' };

export const pricing = {
  intro: 12,
  monthly: 15,
  yearly: 120,
  yearlyIntro: 96,
};

// Contact doors of the "work with me" section.
export const doors = [
  {
    kicker: 'YOUR BUSINESS SELLS, BUT IT HIT A CEILING',
    title: 'Growth Partner with Baskion',
    text: 'We automate what you already do so you can serve more clients with the same team. We get paid only on results.',
    cta: 'Apply as a partner',
    href: 'mailto:mariomanuel.pereravaldes@gmail.com?subject=Growth%20Partner',
  },
  {
    kicker: 'YOUR TEAM PAYS FOR LICENSES IT COULD BUILD',
    title: 'Team training with the CDEV method',
    text: 'I teach your team to build with AI: understand the service, give the AI the context, centralize the data. Then you stop buying what you can build.',
    cta: 'Book a team session',
    href: 'mailto:mariomanuel.pereravaldes@gmail.com?subject=Team%20training',
  },
];

// Interface copy of the components and pages.
export const ui = {
  dateLocale: 'en-US',
  header: {
    home: 'Mario Perera, home',
    nav: 'Main',
    read: 'Read',
    builds: 'Builds',
    work: 'Work with me',
    subscribe: 'Subscribe',
    switch: 'ES', // link to the same page in the other language
    switchName: 'Español',
  },
  footer: { nav: 'Social' },
  hero: {
    kicker: 'Free newsletter · weekly builds',
    welcome: 'Welcome to the',
    lede: "I rebuild the apps you pay for every month with AI and show you exactly how. What worked, what didn't. Free.",
    readers: 'readers · free, no spam',
    photoAlt: 'Mario Perera presenting in front of a screen',
  },
  guides: { title: 'How the free guides work', step: 'STEP' },
  series: {
    eyebrow: 'The series',
    title: 'Four series. One enemy: the monthly bill.',
    receipt: 'Example of a monthly software bill being cut',
    bill: 'YOUR SOFTWARE BILL',
    perMonth: '/ MONTH',
    instead: '→ my own DM bot',
    total: 'NOW YOU PAY',
    caption: 'ManyChat Pro, monthly plan, Sep 2026.',
    latest: 'Latest',
    read: 'Read →',
  },
  builds: {
    eyebrow: 'Proof',
    title: "Things I've built",
    github: 'See my GitHub →',
    also: 'Also: the Holnix app for Shopify, my AutoML thesis, CDEV (agentic development, in the open) and Compiss.',
  },
  work: { eyebrow: 'For companies', title: 'Two ways to work with me' },
  about: {
    title: "I don't have superpowers. I grew up with AI.",
    text: "I'm a software engineer, trained at CUJAE in Havana. You know your job and your business better than I do; I know how to build with AI. I build in public: CDEV, Compiss and Baskion Innovation with my team.",
    markAlt: "The word SaaS struck through, Mario Perera's mark",
  },
  welcome: {
    title: "You're in · Mario Perera",
    eyebrow: 'Subscribed',
    h1: "You're in.",
    lede: 'One last step: confirm your subscription in the Substack tab that just opened.',
    noTab: 'No new tab?',
    subscribe: 'Subscribe on Substack',
    back: 'Back to the home page',
  },
  form: {
    label: 'Your email',
    placeholder: 'Enter your email',
    button: 'Subscribe',
    consent: 'I agree to get emails from Mario Perera. Unsubscribe anytime.',
    email: 'Enter a valid email address.',
    noConsent: 'Tick the box so I can email you.',
    wait: 'One moment: the human check is still loading. Try again.',
    invalid: "That email doesn't look right. Check it and try again.",
    forbidden: 'The human check failed. Try again.',
    limited: 'Too many tries. Wait a minute and try again.',
    failed: 'Something went wrong. Try again in a minute.',
    sent: '',
    already: '',
  },
};
