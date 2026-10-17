// Site copy and links in one place, so text changes don't touch the components.
// Anything in [brackets] is a placeholder to fill before launch.

export const site = {
  name: 'Mario Perera',
  handle: 'sr_perera',
  url: 'https://srperera.com',
  title: 'Mario Perera — Welcome to the SaaS-Killing World',
  description:
    'I rebuild the apps you pay for with AI and show you how. Free guides, a member vault your AI installs for you, and help for teams.',
  readers: '[N]',
  // Set PUBLIC_SUBSTACK_URL (e.g. https://saaskillingworld.substack.com) to send sign-ups to Substack.
  substackUrl: import.meta.env.PUBLIC_SUBSTACK_URL ?? '',
};

export const socials = [
  { name: 'Instagram', url: 'https://www.instagram.com/sr_perera/' },
  { name: 'TikTok', url: '#' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/mario-perera-b30921237/' },
  { name: 'X', url: '#' },
  { name: 'Substack', url: '#' },
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

export const latest = [
  { label: 'RADAR #1', title: '$320K+ in cash prizes for AI builders, open this month', cta: 'Read', href: '#' },
  {
    label: 'FREE GUIDE',
    title: 'PLAYBOOK: 3 prompts that pick the right sales playbook for every lead',
    cta: 'Get it',
    href: '/r/playbook',
  },
  { label: 'SAAS KILL #01', title: '[Next episode title]', cta: 'Soon', href: '#' },
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

export const packs = [
  { key: 'PLAYBOOK', text: 'Lead sheet, router, drafter and call follow-ups' },
  { key: 'RADAR', text: 'The daily search task that finds open prize money' },
  { key: '[NEXT PACK]', text: '[One line on what it builds]' },
];

export const pricing = {
  intro: 12,
  monthly: 15,
  yearly: 120,
  yearlyIntro: 96,
};
