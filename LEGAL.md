# Guía legal: GusCake

Qué se agregó al sitio para cumplir con la **Ley 19.496** (Protección de los
Derechos de los Consumidores), el **Reglamento de Comercio Electrónico**
(DS 6/2021), el **DS 52/2022** (exclusiones del derecho a retracto) y la
**Ley 19.628** con su reforma por la **Ley 21.719** (Protección de Datos
Personales).

> Estos textos son una base sólida, pero no reemplazan la revisión de un
> abogado. Conviene revisarlos una vez al año o cuando cambie la forma de
> vender (por ejemplo, si se agrega pago online).

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `terminos.html` | Términos y condiciones: identificación del proveedor, precios, cómo comprar, despacho, cancelaciones, retracto, garantía legal, cursos, mayoristas, SERNAC. |
| `privacidad.html` | Política de privacidad: responsable, datos y finalidades, bases de licitud, terceros, transferencias internacionales, plazos y derechos (se ejercen por correo o WhatsApp). |
| `cookies.html` | Política de cookies con la tabla de cookies y el botón para cambiar la elección. |
| `consent.js` | Aviso de cookies. **Google Analytics solo se carga si la persona acepta.** |
| `legal.css` / `legal.js` | Estilos y funciones de las páginas legales. |
| `legal-modal.js` | Abre los enlaces legales en ventanas emergentes. |

Además, en todas las páginas se agregaron: enlaces legales y datos del
proveedor en el pie, avisos breves junto a los formularios, en "Tu boleta" y
en la página de cursos.

## Datos del proveedor (ya completados)

GUSCAKES BY GUSTAVO RIQUELME F. SPA · RUT 78.548.604-8 · 3 Norte, San Pedro
de la Paz · guscakepasteleria@gmail.com · +56 9 2067 9622 · Representante
legal: Gustavo Jesús Riquelme Flores. Si cambia alguno, búscalo y reemplázalo
en todos los `.html` (y en el JSON-LD de `index.html`).

**Pendiente:** en `terminos.html` (sección 4) conviene nombrar los medios de
pago concretos (ej. "transferencia bancaria y efectivo al retirar"). Hoy dice
que se informan antes de confirmar el pedido.

## Ventanas emergentes

Los enlaces legales (pie de página, avisos de formularios, boleta y cursos)
se abren solo como ventana emergente sobre la página (`legal-modal.js`), que lee el texto
de las propias páginas legales: **solo hay que editar `terminos.html`,
`privacidad.html` y `cookies.html`**.

## Compromisos escritos en los términos (verificar que se puedan cumplir)

- Responder en un máximo de 2 horas en horario de atención (ya estaba en el sitio).
- Cancelación de un pedido pagado en su totalidad: GusCake retiene el 15% y devuelve el 85% (100% si la cancelación es por causa de GusCake).
- Devolver el dinero en un máximo de 10 días hábiles.
- Enviar los PDF de cursos dentro de 24 horas desde el pago.
- Responder reclamos en un máximo de 5 días hábiles.
- Enviar siempre una **confirmación escrita** del pedido (WhatsApp o correo) con
  productos, total pagado, fecha y forma de entrega y el enlace a
  `https://guscake.cl/terminos.html`. Lo exige el artículo 12 A de la Ley 19.496.
- Emitir boleta o factura por cada venta.

## Tareas fuera del código

1. **Google Analytics:** en Administrar → Recopilación y retención de datos,
   deja la retención en **14 meses** como máximo (lo que dice la política).
2. **Solicitudes de derechos:** llegan por correo o WhatsApp. Hay que responder en
   **30 días corridos** (se puede prorrogar una sola vez por otros 30).
3. **Si se agrega una herramienta nueva** (Meta Pixel, pago online, newsletter,
   etc.): cargarla dentro de `consent.js` si usa cookies y agregarla a
   `privacidad.html` (tabla de terceros) y `cookies.html`.
4. **Ley 21.719:** el Congreso aprobó postergar su entrada en vigencia al
   15 de octubre de 2027 (estaba pendiente de publicación al 24-11-2026). Los
   textos ya están adaptados; cuando la Agencia de Protección de Datos
   Personales empiece a funcionar, revisa si publicó formatos o requisitos
   nuevos.
