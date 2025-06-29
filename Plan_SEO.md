# Plan de Optimización SEO para tu Portfolio

Hola! Soy Cascade. He analizado tu proyecto y he preparado este plan de acción para mejorar significativamente el posicionamiento y la visibilidad de tu portfolio en los motores de búsqueda. Las recomendaciones están priorizadas para que puedas implementarlas de forma progresiva.

---

### ✅ **Prioridad Alta: Cambios Esenciales**

Estos son los cambios más importantes que tendrán un mayor impacto en el SEO de tu sitio.

#### 1. Optimización del Layout Principal (`src/layouts/Layout.astro`)

El layout es la base de todas tus páginas. Es crucial que contenga las metaetiquetas adecuadas.

**Acciones:**

*   **Añadir un Título y Descripción dinámicos y específicos:** El título actual es "sr-perera" y la descripción es genérica. Debes personalizarlos para que reflejen mejor tu perfil profesional.
*   **Incorporar Metaetiquetas Open Graph (OG):** Fundamentales para que tu portfolio se vea bien al compartirlo en redes sociales como LinkedIn, Facebook o Twitter.
*   **Añadir URL Canónica:** Evita contenido duplicado indicando a los buscadores cuál es la URL principal.
*   **Añadir Palabras Clave (Keywords):** Aunque su peso ha disminuido, sigue siendo una buena práctica incluir keywords relevantes.

**Código Sugerido para `src/layouts/Layout.astro`:**

```astro
---
import '../styles/global.css';

interface Props {
	title?: string;
	description?: string;
	image?: string; // Para la imagen de Open Graph
}

const canonicalURL = new URL(Astro.url.pathname, Astro.site);

const {
	title = 'Mario Perera (srperera) | Ingeniero de Software y Freelance',
	description = 'Portfolio de Mario Perera (srperera), Ingeniero de Software y desarrollador freelance. Experto en NestJS, Next.js e IA. Contacta a Mario Perera para tu próximo proyecto.',
	image = '/og-image.png' // Crea una imagen de 1200x630px y ponla en /public
} = Astro.props;
---

<!doctype html>
<html lang="es" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="generator" content={Astro.generator} />

    <!-- SEO -->
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content="mario perera, srperera, sr_perera, mario perera ingeniero, mario perera ingeniero de software, mario freelance, mario perera freelance, desarrollador full stack, ingeniero de software, nestjs, nextjs, typescript, ia, liderazgo tecnico, portfolio" />
    <link rel="canonical" href={canonicalURL} />

    <!-- Open Graph -->
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonicalURL} />
    <meta property="og:image" content={new URL(image, Astro.url)} />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="es_ES" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={new URL(image, Astro.url)} />

    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@500;600;700&display=swap" rel="stylesheet">
  </head>
  <body class="min-h-screen bg-light text-dark">
    <slot />
  </body>
</html>
```

#### 2. Estructura Semántica del Contenido (`index.astro` y componentes)

Google valora el contenido bien estructurado. Usa las etiquetas HTML (`<h1>`, `<h2>`, `section`, etc.) correctamente.

**Acciones:**

*   **Asegurar un único `<h1>`:** La página principal (`index.astro`) debe tener un solo `<h1>`, que es el título más importante. Probablemente debería estar en tu componente `Hero.tsx`.
*   **Usar `<h2>` para las secciones:** "Sobre Mí", "Experiencia", "Proyectos", etc., deben ser `<h2>`.
*   **Usar `alt` en las imágenes:** Todas las imágenes deben tener un atributo `alt` descriptivo. Esto es crucial para la accesibilidad y el SEO.
*   **Integrar keywords en el contenido:** Menciona las variaciones de tu nombre y rol ("Mario Perera", "srperera", "Ingeniero de Software", "desarrollador freelance") de forma natural en los textos de la web, como en la sección "Sobre Mí".

**Ejemplo en `src/components/Hero.tsx`:**

```jsx
// Asegúrate de que el título principal sea un <h1>
<h1>Mario Perera (srperera)</h1>
<p>Ingeniero de Software y Desarrollador Freelance</p>
```

**Ejemplo en `src/components/Projects.tsx`:**

```jsx
// Si tienes imágenes de tus proyectos
<img src={project.image} alt={`Imagen del proyecto ${project.title} desarrollado por Mario Perera`} />
```

---

### 🟠 **Prioridad Media: Mejoras Técnicas**

#### 1. Añadir un Mapa del Sitio (`sitemap.xml`)

Un mapa del sitio ayuda a los buscadores a descubrir e indexar todas las páginas de tu web.

**Acciones:**

1.  **Instalar la integración de sitemap de Astro:**
    ```bash
    npx astro add sitemap
    ```
2.  **Configurar `astro.config.mjs`:** Añade la URL de tu sitio.

**Código Sugerido para `astro.config.mjs`:**

```javascript
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tu-dominio.com', // ¡IMPORTANTE! Reemplaza con tu dominio
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [react(), sitemap()]
});
```

#### 2. Crear un archivo `robots.txt`

Este archivo le dice a los bots de los buscadores qué páginas pueden o no rastrear.

**Acciones:**

*   Crea un archivo llamado `robots.txt` dentro de la carpeta `public/`.

**Contenido para `public/robots.txt`:**

```
User-agent: *
Allow: /

Sitemap: https://tu-dominio.com/sitemap-index.xml
```
*Recuerda reemplazar `https://tu-dominio.com` con tu dominio real.*

---

### 🟢 **Prioridad Baja: Optimización Avanzada**

#### 1. Añadir Datos Estructurados (Schema.org)

Esto ayuda a los buscadores a entender el contexto de tu contenido y puede resultar en "rich snippets" (fragmentos enriquecidos) en los resultados de búsqueda.

**Acciones:**

*   Añade un script JSON-LD en tu `Layout.astro` para describir que la página trata sobre una persona.

**Código Sugerido para añadir al `<head>` de `src/layouts/Layout.astro`:**

```html
<script type="application/ld+json" set:html={JSON.stringify({
    "@context": "http://schema.org",
    "@type": "Person",
    "name": "Mario Perera",
    "alternateName": ["srperera", "sr_perera"],
    "url": Astro.site,
    "sameAs": [
      "https://www.linkedin.com/in/tu-usuario/", // URL de tu LinkedIn
      "https://github.com/tu-usuario" // URL de tu GitHub
    ],
    "jobTitle": "Ingeniero de Software",
    "knowsAbout": ["NestJS", "Next.js", "Inteligencia Artificial", "Freelance", "Liderazgo Técnico"],
    "alumniOf": "Instituto Politécnico de la Habana (CUJAE)"
  })} />
```

---

### Resumen de Tareas

1.  [ ] **Layout:** Actualizar `src/layouts/Layout.astro` con todas las metaetiquetas SEO.
2.  [ ] **Imagen OG:** Crear y añadir una imagen `og-image.png` en `public/`.
3.  [ ] **HTML Semántico:** Revisar componentes y asegurar el uso correcto de `h1`, `h2`, etc.
4.  [ ] **Atributos `alt`:** Añadir `alt` a todas las imágenes.
5.  [ ] **Sitemap:** Instalar y configurar `@astrojs/sitemap`.
6.  [ ] **robots.txt:** Crear el archivo `public/robots.txt`.
7.  [ ] **Datos Estructurados:** Añadir el script JSON-LD al layout.

Espero que este plan te sea de gran ayuda. Si tienes alguna duda sobre cómo implementar alguno de los puntos, no dudes en consultarme. ¡Mucho éxito!
