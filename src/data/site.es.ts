// Spanish copy for /es/: the same exports and shape as site.ts, translated from its approved English copy
// (DECISIONS 2026-10-27). Links, images and prices come from site.ts; series names stay as they are.
import * as en from './site';

export { socials, packs, checkout, pricing } from './site';

export const site: typeof en.site = {
  ...en.site,
  title: 'Mario Perera — Bienvenido al SaaS-Killing World',
  description:
    'Reconstruyo con IA las apps que pagas y te enseño cómo. Guías gratis y ayuda para equipos.',
};

export const steps: typeof en.steps = [
  {
    title: 'Mira un reel',
    text: 'Cada reel desmonta una app o un servicio de pago y te enseña a construirlo tú.',
  },
  {
    title: 'Comenta la palabra clave',
    text: 'Comenta la palabra que sale en pantalla, como PLAYBOOK. Mi bot te responde por DM.',
  },
  {
    title: 'Recibe la guía por email',
    text: 'Deja tu email en el chat. Los prompts llegan a tu bandeja un minuto después.',
  },
];

export const series: typeof en.series = [
  {
    name: 'SaaS Kill #N',
    formula: 'Deja de pagar [app]. Constrúyela en [tiempo].',
    text: 'Una suscripción por episodio, reconstruida con IA, con lo que de verdad cuesta mantenerla.',
  },
  {
    name: "Don't pay for this",
    formula: '[Servicio] cobra $X por [tarea]. Haz esto en su lugar.',
    text: 'Servicios caros desmontados paso a paso, para que puedas hacer el trabajo tú mismo.',
  },
  {
    name: 'Boring Apps #N',
    formula: 'Esta app aburrida cuesta $X. Una sola vez.',
    text: 'Apps pequeñas que pagas una sola vez. La versión gratis resuelve el problema, y cómo la construí también es gratis.',
  },
  {
    name: 'AI Money Radar',
    formula: 'Dinero para quien construye con IA. Cada lunes.',
    text: 'Hackathons, ayudas y créditos abiertos ahora mismo, comprobados en sus páginas oficiales.',
  },
];

const buildsEs = [
  {
    stack: 'AGENTE · NESTJS · REDIS · OPENAI',
    text: 'Un agente de WhatsApp que guía a los técnicos de campo de VivoFácil en cada orden de trabajo.',
    alt: 'VivoBot guiando a un técnico de campo en una orden de trabajo por WhatsApp',
  },
  {
    stack: 'APP WEB · NEXT.JS · SHADCN',
    text: 'Genera documentos de empresa a partir de plantillas, para que una agencia deje de escribirlos a mano.',
    alt: 'Lista de documentos de DocAI para una agencia de automatizaciones',
  },
  {
    stack: 'ASISTENTE · PYTHON · OPENAI · PLAYWRIGHT',
    text: 'Un asistente de compras que encuentra el precio más bajo para quien compra en España.',
    alt: 'CompraChat comparando precios de productos',
  },
];
export const builds: typeof en.builds = en.builds.map((b, i) => ({ ...b, ...buildsEs[i] }));

export const doors: typeof en.doors = [
  {
    ...en.doors[0],
    kicker: 'TU NEGOCIO VENDE, PERO HA TOCADO TECHO',
    title: 'Growth Partner con Baskion',
    text: 'Automatizamos lo que ya haces para que atiendas a más clientes con el mismo equipo. Solo cobramos por resultados.',
    cta: 'Solicita ser partner',
  },
  {
    ...en.doors[1],
    kicker: 'TU EQUIPO PAGA LICENCIAS QUE PODRÍA CONSTRUIR',
    title: 'Formación de equipos con el método CDEV',
    text: 'Enseño a tu equipo a construir con IA: entender el servicio, darle el contexto a la IA, centralizar los datos. Así dejáis de comprar lo que podéis construir.',
    cta: 'Reserva una sesión de equipo',
  },
];

export const ui: typeof en.ui = {
  dateLocale: 'es-ES',
  header: {
    home: 'Mario Perera, inicio',
    nav: 'Principal',
    read: 'Leer',
    builds: 'Proyectos',
    work: 'Trabaja conmigo',
    subscribe: 'Suscríbete',
    switch: 'EN',
    switchName: 'English',
  },
  footer: { nav: 'Redes sociales' },
  hero: {
    kicker: 'Newsletter gratis · proyectos cada semana',
    welcome: 'Bienvenido al',
    lede: 'Reconstruyo con IA las apps que pagas cada mes y te enseño exactamente cómo. Lo que funcionó y lo que no. Gratis.',
    readers: 'lectores · gratis, sin spam',
    photoAlt: 'Mario Perera presentando delante de una pantalla',
  },
  guides: { title: 'Cómo funcionan las guías gratis', step: 'PASO' },
  series: {
    eyebrow: 'Las series',
    title: 'Cuatro series. Un enemigo: la factura mensual.',
    receipt: 'Ejemplo de una factura mensual de software recortada',
    bill: 'TU FACTURA DE SOFTWARE',
    perMonth: '/ MES',
    instead: '→ mi propio bot de DMs',
    total: 'AHORA PAGAS',
    caption: 'ManyChat Pro, plan mensual, sep 2026.',
    latest: 'Lo último',
    read: 'Leer →',
  },
  builds: {
    eyebrow: 'Pruebas',
    title: 'Cosas que he construido',
    github: 'Mira mi GitHub →',
    also: 'Y también: la app Holnix para Shopify, mi tesis de AutoML, CDEV (desarrollo agéntico, en abierto) y Compiss.',
  },
  work: { eyebrow: 'Para empresas', title: 'Dos formas de trabajar conmigo' },
  about: {
    title: 'No tengo superpoderes. Crecí con la IA.',
    text: 'Soy ingeniero de software, formado en la CUJAE de La Habana. Tú conoces tu trabajo y tu negocio mejor que yo; yo sé construir con IA. Construyo en público: CDEV, Compiss y Baskion Innovation con mi equipo.',
    markAlt: 'La palabra SaaS tachada, la marca de Mario Perera',
  },
  welcome: {
    title: 'Ya estás dentro · Mario Perera',
    eyebrow: 'Suscripción',
    h1: 'Ya estás dentro.',
    lede: 'Un último paso: confirma tu suscripción en la pestaña de Substack que se acaba de abrir.',
    noTab: '¿No se abrió?',
    subscribe: 'Suscríbete en Substack',
    back: 'Volver a la página de inicio',
  },
  form: {
    label: 'Tu email',
    placeholder: 'Tu email',
    button: 'Suscríbete',
    consent: 'Acepto recibir correos de Mario Perera. Puedes darte de baja cuando quieras.',
    email: 'Escribe un email válido.',
    noConsent: 'Marca la casilla para que pueda escribirte.',
    wait: 'Un momento: la verificación aún está cargando. Inténtalo de nuevo.',
    invalid: 'Ese email no parece correcto. Revísalo e inténtalo de nuevo.',
    forbidden: 'No se pudo verificar que eres humano. Inténtalo de nuevo.',
    limited: 'Demasiados intentos. Espera un minuto y vuelve a probar.',
    failed: 'Algo ha fallado. Inténtalo de nuevo en un minuto.',
    sent: '',
    already: '',
  },
};
