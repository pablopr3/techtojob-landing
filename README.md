# TechToJob · Landing page (Torneo #2)

Landing de [TechToJob](https://techtojob.com), la comunidad en Discord donde desarrolladores y empresas tech se conocen antes de que exista la vacante. Entrega para el Torneo #2 de la comunidad.

- Español: `/es/` · Inglés: `/en/` (la raíz redirige según el idioma del navegador)
- Stack: Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · next-intl
- Sin plantillas ni kits de componentes: todos los componentes están escritos a mano en `src/components`

## Arrancar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
npm run lint
```

Variables de entorno (opcional): copia `.env.example` a `.env.local`.

| Variable | Uso |
| --- | --- |
| `NEXT_PUBLIC_NEWSLETTER_ENDPOINT` | URL que recibe un `POST` JSON `{ email }`. Vacía mientras no exista la lista: el formulario valida el correo y muestra un aviso honesto en vez de simular un alta. |
| `NEXT_PUBLIC_BASE_PATH` | Solo si la web cuelga de una sub-ruta (GitHub Pages de proyecto: `/techtojob-landing`). Vacío con dominio propio. |
| `NEXT_PUBLIC_SITE_URL` | URL pública para canonical, Open Graph, sitemap y JSON-LD. Por defecto `https://techtojob.com`. |

## Despliegue

El proyecto se exporta como HTML estático (`output: "export"`, carpeta `out/`), así que vale para cualquier hosting de estáticos.

- **GitHub Pages**: ya incluido. El workflow `.github/workflows/deploy.yml` compila y publica en cada push a `main`. Solo hay que activar en el repo *Settings → Pages → Build and deployment → Source: GitHub Actions*. Queda en `https://<usuario>.github.io/techtojob-landing/`. Con dominio propio (techtojob.com), quitar las dos variables `NEXT_PUBLIC_*` del workflow y añadir el `CNAME`.
- **Vercel / Cloudflare Pages**: importar el repo; detectan Next y sirven `out/` sin configurar nada.

La raíz (`/`) es un `public/index.html` que redirige a `/es/` o `/en/` según el idioma del navegador, con `noindex` para que no compita con las páginas reales.

## Estructura

```
messages/
  es.json               # todos los textos en español
  en.json               # todos los textos en inglés
src/
  app/
    [locale]/           # layout con metadata, página principal, /legal y /privacidad
    sitemap.ts          # sitemap con alternates por idioma
    robots.ts
    icon.svg            # favicon (símbolo oficial)
    globals.css         # tokens de marca (@theme) y utilidades
  components/
    layout/             # Header, MobileMenu, Footer, LegalPage
    sections/           # una carpeta por sección de la landing
    ui/                 # Button, SectionHeading, Reveal, Doodle, doodles, InViewObserver, CursorFx, Logo, BrandIcons
  config/site.ts        # URLs oficiales (Discord, redes, correo)
  fonts/                # Sora variable, autoalojada (SIL OFL 1.1)
  i18n/                 # routing, navigation y request de next-intl
  lib/json-ld.ts        # JSON-LD Organization
  lib/rich-text.tsx     # etiquetas <mark> permitidas dentro de los textos
public/
  logo.svg, symbol.svg  # logo oficial (Torneo #1)
  og-es.png, og-en.png  # imágenes Open Graph 1200×630
docs/                   # capturas de escritorio, móvil y Lighthouse
```

## Secciones y orden

Se respeta el orden del brief salvo un matiz: **Talento** y **Empresas** van seguidas y con contraste visual fuerte (fondo blanco → fondo oscuro) para que cada público encuentre lo suyo de un vistazo sin leer la otra parte. Testimonios se titulan "Opiniones" en la interfaz porque es la palabra que usa la gente.

1. Hero — un solo botón (Discord) y una comparación "portal de empleo vs. TechToJob" que fija el posicionamiento en dos frases.
2. Cómo funciona — cuatro pasos, numerados en `<ol>`.
3. Ofrécete como talento — tres argumentos (nadie te descarta antes de leerte, no hace falta ser senior, sin coste) y una tarjeta de perfil de ejemplo.
4. Publica como empresa — el reverso, sobre fondo oscuro.
5. Torneos — para qué sirven y estado de los torneos #1, #2 y siguiente.
6. Networking — canales por área y por qué los buenos trabajos "se enteran".
7. Opiniones — cinco tarjetas con hueco reservado para foto (`avatar`) y enlace a perfil (`profileUrl`) en `messages/*.json`. Hasta que haya opiniones reales, se muestra la inicial y el icono de LinkedIn aparece desactivado; la página lo dice en una nota.
8. Noticias — tres entradas de ejemplo con `<time>` y categoría; enlazan al Discord hasta que exista el blog.
9. Newsletter — franja antes del cierre, con el botón diciendo lo que recibes y una nota de no-spam.
10. Cierre — último empujón.
11. Footer — cuatro bloques (talento, empresas, comunidad, legal), redes y crédito.

## Textos

Todos los textos viven en `messages/es.json` y `messages/en.json`; no hay cadenas incrustadas en componentes. Escritos siguiendo el brief: tuteo, frases cortas, sin palabras de folleto, sin cifras de miembros ni promesas de plazos. "Gratis" aparece solo donde tranquiliza (nota bajo el botón del hero y punto tres de Talento), no como titular. Los nombres de los testimonios, del perfil de ejemplo y de la conversación ilustrada en el hero son ficticios.

## Estilo: la pizarra de la comunidad

La landing se plantea como una pizarra donde la comunidad va apuntando cosas: fondo con cuadrícula suave, tarjetas con borde "dibujado a rotulador" (radios irregulares en CSS, sin imágenes), notas pegadas con cinta y ligeramente giradas, frases clave marcadas con subrayador y trazos a mano (flechas, círculos, checks, un trofeo, un sobre) que se dibujan solos. La sección de empresas invierte la pizarra: fondo oscuro con la misma cuadrícula en blanco.

Todo son SVG y CSS propios (`src/components/ui/doodles.tsx`, utilidades `sketch`, `marker`, `tape` y `board-grid` en `globals.css`).

### Animaciones

| Qué | Cómo |
| --- | --- |
| Entrada del hero | Título, párrafo, botón, tarjetas y vista del Discord suben en cascada al cargar (`.hero-in`, keyframes CSS) |
| Trazos que se dibujan | `stroke-dashoffset` de 1 a 0 cuando el trazo entra en pantalla (`.doodle`) |
| Subrayador | El fondo amarillo se "pasa" de izquierda a derecha sobre la frase al entrar en pantalla (`.marker`) |
| Aparición de bloques | Tarjetas, notas y noticias suben y aparecen al hacer scroll, escalonadas (`.reveal`) |
| Post-its | Se enderezan y se levantan al pasar el ratón (`.note-lift`) |
| Cursor | En escritorio, cursor propio tipo HUD sin retardo: un punto de "plotter", una cruceta de dos líneas finas que cruza la pantalla, un marco con esquinas que se engancha a enlaces y botones, y una zona de la cuadrícula que se ilumina en azul alrededor del puntero (`CursorFx.tsx`). Solo hace trabajo cuando el ratón se mueve (un `requestAnimationFrame` por movimiento, sin bucle en reposo). En táctil y con movimiento reducido se usa el cursor normal |

Un único `IntersectionObserver` (`InViewObserver.tsx`) añade `is-visible` a todo lo animable; funciona en cualquier navegador. Red de seguridad: si la hidratación tarda o falla, todo se muestra solo a los 2,5 s (`reveal-safety`). Nada de esto afecta al SEO: el texto está íntegro en el HTML servido, el estado inicial de las animaciones se anula con un `<noscript>` para navegadores sin JavaScript, y con `prefers-reduced-motion` todo es estático.

## Identidad y paleta

La paleta original del brief (`#2f3436`, `#84c0bf`, `#ffffff`) se ha sustituido a petición del organizador. La nueva tiene **cuatro colores** y todos son cosas que hay en una pizarra; lo demás son tintes de esos cuatro.

| Token | Color | Papel |
| --- | --- | --- |
| `ink` | `#1c2230` | Rotulador negro: texto, bordes dibujados, botón principal, checks, "pizarra oscura" de empresas |
| `brand` | `#2b5cf0` | Rotulador azul: acciones, enlaces, chips, franja de newsletter, todos los trazos (flechas, círculos, asteriscos) y el degradado del logo |
| `highlight` | `#fff176` | Subrayador amarillo: detrás de las frases clave de cada título y como botón sobre fondo oscuro |
| `board` | `#fcfbf7` | La pizarra, ligeramente cálida para que las tarjetas blancas resalten |

Tintes: `brand-deep #1e44c2` (azul para texto pequeño sobre claro, 7:1), `brand-tint #e6edff` (fondos azulados y post-its), `note #fff4b3` (subrayador diluido para post-its), y los grises `mist #f3f2ec`, `line #dedbd0` y `muted #5b6472` (texto secundario, 6.6:1) derivados de la tinta.

Contrastes comprobados en Lighthouse: tinta sobre subrayador 14:1, tinta sobre post-it 13:1, blanco sobre azul 5.5:1.

- Tipografía: Sora, autoalojada como fuente variable con `next/font/local` (un solo archivo `.woff2`, 33 KB); se usan los pesos 400, 600 y 700.
- Logo: versión degradado outlined (`v1Degradado.svg`) con el degradado recoloreado a azul → tinta; símbolo como favicon. Las versiones con `<text>` no se usan porque un SVG en `<img>` no puede cargar la fuente.

## SEO y accesibilidad

- Un `<h1>` por página; jerarquía h2 → h3 sin saltos; `header`, `nav`, `main`, `section`, `article`, `footer`, `ol`, `dl`, `time`, `blockquote` donde corresponde.
- Metadata API con `title.template` y `metadataBase`; `<title>` de 55/54 caracteres y `description` de 150–160 en ambos idiomas; canonical y `hreflang` cruzado (`es`, `en`, `x-default`); Open Graph y Twitter Card con imagen 1200×630 por idioma; JSON-LD `Organization` con nombre, logo, URL, correo y redes.
- Selector de idioma como enlace real (`<a href="/en">`), `lang` correcto en cada versión, sitemap con alternates.
- Enlaces con texto descriptivo; anclas legibles (`#talento`, `#empresas`, `#torneos`…).
- Skip link, foco visible, menú móvil con `aria-expanded` y cierre con Escape, formulario con `<label>` y mensaje `aria-live`.
- Animaciones sin coste para el SEO: nada usa `hidden`, hay `<noscript>` de respaldo y red de seguridad a los 2,5 s; los trazos SVG son `aria-hidden`.

Lighthouse (móvil, build de producción, `/es`): rendimiento 96 · accesibilidad 100 · buenas prácticas 100 · SEO 100. `/en`: 98 · 100 · 100 · 100. Captura en `docs/lighthouse-mobile.png`.

## Recursos y licencias

| Recurso | Fuente | Licencia |
| --- | --- | --- |
| Logo y símbolo | Torneo #1 de TechToJob (Pablo Expósito, @novision_studio) | Propiedad del proyecto |
| Sora | [Google Fonts](https://fonts.google.com/specimen/Sora), archivos vía [Fontsource](https://fontsource.org/fonts/sora) | SIL Open Font License 1.1 (`src/fonts/LICENSE-Sora-OFL.txt`) |
| Iconos de interfaz | [Lucide](https://lucide.dev) (`lucide-react`) | ISC |
| Iconos de LinkedIn, X, Instagram y Discord | Dibujados para este proyecto en `src/components/ui/BrandIcons.tsx` | — |
| Ilustraciones y trazos | Ninguna externa: la vista del servidor y la tarjeta de perfil son HTML y CSS; los garabatos son SVG dibujados para este proyecto (`doodles.tsx`) | — |
| Imágenes OG | Generadas para este proyecto a partir del logo y la tipografía | — |

## Uso de IA

Código, textos y traducción al inglés se han hecho con ayuda de Claude (Anthropic), revisados y ajustados a mano. No se han generado imágenes con IA.

## Pendiente antes de publicar

- Sustituir opiniones de ejemplo por reales (`testimonials.items` en `messages/*.json`, añadiendo `avatar` y `profileUrl`).
- Conectar `NEXT_PUBLIC_NEWSLETTER_ENDPOINT` a la lista de correo.
- Redactar aviso legal y política de privacidad (`/legal`, `/privacidad`).
- Enlazar las noticias al blog cuando exista.
