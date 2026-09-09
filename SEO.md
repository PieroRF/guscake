# Guía SEO — GusCake

Objetivo: aparecer en los primeros lugares de Google, sobre todo en búsquedas
locales como *"pastelería San Pedro de la Paz"*, *"tortas por encargo Concepción"*,
*"alfajores artesanales Biobío"*.

> **Realidad importante:** nadie puede *garantizar* el primer lugar. Google ordena
> los resultados según cientos de factores y según la competencia. Lo que sí se
> puede hacer es cumplir **todo** lo que Google premia. Los resultados tardan
> típicamente entre **4 y 12 semanas** en notarse.

---

## 1. Ya está hecho en el código (SEO técnico on-page)

- `<title>` y `<meta description>` optimizados con la ciudad y los productos, en
  `index.html` y `mayoristas.html`.
- Etiqueta `canonical` en ambas páginas.
- Open Graph + Twitter Card (miniatura y texto al compartir por WhatsApp / redes).
- Etiquetas `geo.*` e `ICBM` con las coordenadas del local.
- **Datos estructurados JSON-LD** tipo `Bakery` (negocio local): nombre,
  descripción, dirección, coordenadas, teléfono, horario y redes sociales.
- `robots.txt` y `sitemap.xml` en la raíz del sitio.
- Dirección + teléfono + horario (NAP) visibles en el pie de todas las páginas,
  dentro de una etiqueta `<address>`.

- Dominio `https://guscake.cl/` ya aplicado en `index.html`, `mayoristas.html`,
  `robots.txt` y `sitemap.xml`.

### ⚠️ Acción pendiente tuya: conectar guscake.cl en Vercel

El código ya apunta a `guscake.cl`, pero falta que ese dominio **sirva el sitio**.
El hosting es **Vercel**:

1. En Vercel → proyecto `guscake` → **Settings → Domains**.
2. Escribe `guscake.cl`, presiona **Add** y agrega también `www.guscake.cl`.
   Elige cuál es la principal (recomendado: `guscake.cl` sin `www`); Vercel crea
   solo la redirección de la otra.
3. Vercel te mostrará los registros DNS exactos. Ve al panel DNS de tu dominio
   (NIC Chile o el proveedor que administres) y créalos. Normalmente son:
   - Dominio raíz `guscake.cl` → registro **A** → `76.76.21.21`
   - Subdominio `www` → registro **CNAME** → `cname.vercel-dns.com`
   > Usa siempre los valores que muestre TU panel de Vercel; pueden variar.
4. Espera la propagación DNS (de minutos a 24 h). Vercel marcará el dominio como
   *Valid* y emitirá el certificado HTTPS automáticamente (no hay que activar
   nada).
5. Comprueba que `https://guscake.cl` abre el sitio con candado.

> Cada vez que hagas `git push`, Vercel vuelve a publicar el sitio solo. Los
> cambios de SEO de este trabajo se aplican en el próximo push.

**Mientras el dominio no esté *Valid* en Vercel**, no envíes el sitio a Search
Console ni lo compartas con las URLs de `guscake.cl`: las miniaturas y el
`canonical` apuntarían a una dirección que todavía no responde.

---

## 2. Lo que MÁS mueve la aguja (fuera del código) — hazlo sí o sí

### 2.1. Perfil de Empresa de Google (Google Business Profile) — PRIORIDAD 1
Es lo que hace aparecer el negocio en el **mapa** y en el recuadro lateral.
1. Entra a <https://www.google.com/business/> con la cuenta del negocio.
2. Crea el perfil: nombre exacto **GusCake**, categoría **Pastelería** /
   **Repostería**, dirección o zona de reparto, teléfono **+56 9 2067 9622**,
   sitio web, horario **Lun–Sáb 09:00–19:00**.
3. Verifica (Google envía código por tarjeta postal, teléfono o video).
4. Sube **mínimo 10 fotos reales** (productos, local, equipo) y súbelas seguido.
5. Publica novedades cada semana (como en redes).
6. Mantén el **NAP idéntico** al del sitio (mismo nombre, teléfono y dirección,
   carácter por carácter).

### 2.2. Reseñas de clientes — PRIORIDAD 2
- Pide a cada cliente feliz que deje **reseña con estrellas** en Google.
- Manda el link directo por WhatsApp después de cada entrega.
- Responde **todas** las reseñas (buenas y malas). Google premia la actividad.
- Meta inicial realista: 20–30 reseñas en 3 meses.

### 2.3. Google Search Console — PRIORIDAD 3
1. Entra a <https://search.google.com/search-console>.
2. Agrega la propiedad con tu dominio y verifícala.
3. En **Sitemaps**, envía `sitemap.xml`.
4. Usa **Inspección de URL → Solicitar indexación** para `index.html` y
   `mayoristas.html`.
5. Revísala cada 2 semanas para ver por qué palabras apareces y corregir errores.

---

## 3. Contenido (lo que Google lee para entender de qué eres)

- Escribe la ciudad y la especialidad de forma natural en los textos:
  *"pastelería artesanal en San Pedro de la Paz"*, *"despachamos a todo el Gran
  Concepción"*, etc. (ya se agregó en varias partes, se puede reforzar más).
- Idealmente, una sección o página con **preguntas frecuentes** (zonas de reparto,
  anticipación de pedidos, formas de pago, personalización de tortas).
- Un **blog** ayuda mucho a largo plazo: 1 artículo al mes tipo *"Cómo elegir la
  torta para un cumpleaños"*, *"Diferencia entre hojarasca y milhojas"*. Cada
  artículo es una puerta de entrada más desde Google.
- Nombra bien las imágenes antes de subirlas: `torta-chocolate-guscake.jpg` en vez
  de `IMG_2931.jpg`, y usa el texto `alt` describiendo la foto.

## 4. Enlaces entrantes (backlinks) y presencia

- Pon el link del sitio en la **biografía de Instagram y TikTok**.
- Regístrate en directorios locales: PáginasAmarillas.cl, Guía Local, portales de
  gastronomía de Concepción, grupos de emprendimiento del Biobío.
- Alianzas: si trabajas con cafeterías (mayoristas), pídeles un link a tu web
  desde la suya.
- Prensa local / influencers gastronómicos de la zona: una nota con enlace vale
  mucho.

## 5. Rendimiento y experiencia (Core Web Vitals)

- Comprime las fotos de `img/` (usa formato **WebP**, ancho máx. ~1600px, peso
  < 200 KB c/u). Es el punto que más frena la velocidad hoy.
- Mide en <https://pagespeed.web.dev/> y apunta a verde en móvil.
- El sitio ya usa `loading="lazy"` en el mapa; conviene añadirlo también a las
  fotos de producto si en el futuro se cargan como HTML estático.

---

## Checklist rápido

- [x] Dominio `guscake.cl` aplicado en el código
- [ ] Conectar `guscake.cl` en Vercel (Settings → Domains) + registros DNS
- [ ] Crear y **verificar** el Perfil de Empresa de Google
- [ ] Subir 10+ fotos al perfil y publicar novedades semanales
- [ ] Conseguir las primeras 20 reseñas en Google
- [ ] Verificar el sitio en Search Console y enviar `sitemap.xml`
- [ ] Poner el link web en las bios de Instagram y TikTok
- [ ] Registrarse en 3–5 directorios locales
- [ ] Comprimir todas las imágenes a WebP
- [ ] Probar en pagespeed.web.dev y en el Test de Resultados Enriquecidos de Google
