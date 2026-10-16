// ==========================================================
// GUS CAKE — lógica de vitrina, carrito, formulario y hero
// ==========================================================

//PRODUCTOS//
const PRODUCTS = [
  {
    id: "p1", name: "Alfajor de amor",
    desc: "Finas laminas de hojarasca, rellenas de manjar tradicional, frambuesas naturales y crema chantilly de vainilla.",
    prices: [
      { label: "Torta 04 porciones", price: 15500 },
      { label: "Torta 10 porciones", price: 25500 },
      { label: "Torta 20 porciones", price: 35500 },
    ],
    emoji: "🎂", img: "img/productos/alfajordeamor.jpg", category: "tortas", tag: "Destacado"
  },
  {
    id: "p2", name: "Choco Ganache",
    desc: "Bizcocho húmedo de chocolate, relleno de manjar tradicional y ganache bitter.",
    prices: [
      { label: "Torta 04 porciones", price: 16500 },
      { label: "Torta 10 porciones", price: 26500 },
      { label: "Torta 20 porciones", price: 36500 },
    ],
    emoji: "🎂", img: "img/productos/chocoganache.jpg", category: "tortas"
  },
  {
    id: "p3", name: "Manjar nuez",
    desc: "Finas laminas de hojarascas, rellenas de manjar artesanal y nueces molidas.",
    prices: [
      { label: "Torta 04 porciones", price: 15500 },
      { label: "Torta 10 porciones", price: 25500 },
      { label: "Torta 20 porciones", price: 35500 },
    ],
    emoji: "🎂", img: "img/productos/manjarnuez.jpg", category: "tortas"
  },
  {
    id: "p4", name: "Carrot cake",
    desc: "Bizcocho húmedo de zanahoria, relleno de frosting de queso crema de vainilla.",
    prices: [
      { label: "Torta 04 porciones", price: 16500 },
      { label: "Torta 10 porciones", price: 26500 },
      { label: "Torta 20 porciones", price: 36500 },
    ],
    emoji: "🎂", img: "img/productos/carrotcake.jpg", category: "tortas"
  },
  {
    id: "p5", name: "Red velvet",
    desc: "Bizcocho rojo intenso con un toque de cacao, relleno de frosting de queso crema de vainilla.",
    prices: [
      { label: "Torta 04 porciones", price: 16500 },
      { label: "Torta 10 porciones", price: 26500 },
      { label: "Torta 20 porciones", price: 36500 },
    ],
    emoji: "🎂", img: "img/productos/redvelvet.jpg", category: "tortas"
  },
  {
    id: "p6", name: "Pie de limón",
    desc: "Masa sableé rellena de crema de limón, cubierta de merengue suizo.",
    prices: [{ label: "Precio único", price: 22500 }],
    emoji: "🍰", img: "img/productos/piedelimon.jpg", category: "tartas", tag: "Destacado"
  },
  {
    id: "p7", name: "Kuchen sureño",
    desc: "Masa sableé rellena de cremoso kuchen de frutos rojos con toques de limón sutil.",
    prices: [{ label: "Precio único", price: 20500 }],
    emoji: "🍰", img: "img/productos/kuchensureño.jpg", category: "tartas"
  },
  {
    id: "p8", name: "Choco Brownie",
    desc: "Bizcocho húmedo de chocolate, cubierto de ganache bitter.",
    prices: [{ label: "Precio único", price: 21500 }],
    emoji: "🍰", img: "img/productos/chocobrownie.jpg", category: "tartas"
  },
  {
    id: "p9", name: "Cheseecake Maracuya",
    desc: "Tarta a base de queso crema de vainilla, cubierta con gel de maracuya.",
    prices: [{ label: "Precio único", price: 28500 }],
    emoji: "🍰", img: "img/productos/cheseecakemaracuya.jpg", category: "tartas"
  },
  {
    id: "p10", name: "Cheseecake Frambuesa",
    desc: "Tarta a base de queso crema de vainilla, cubierta con gel de frambuesa.",
    prices: [{ label: "Precio único", price: 28500 }],
    emoji: "🍰", img: "img/productos/cheseecakeframbuesa.jpg", category: "tartas"
  },
  {
    id: "p19", name: "Mix de tartas",
    desc: "Tartas, cheesecake, pie de limón, brownie y kuchen sureño. Especial para compartir.",
    prices: [{ label: "Precio único", price: 25500 }],
    emoji: "🍰", img: "img/hero-torta-3.jpg", category: "premium"
  },
  {
    id: "p11", name: "Barquillos (06 uds.)",
    desc: "Galleta fina, ligera y crujiente. Rellena de manjar artesanal.",
    prices: [{ label: "Precio único", price: 5500 }],
    emoji: "🍪", img: "img/productos/barquillos.jpg", category: "peque-dulces"
  },
  {
    id: "p12", name: "Alfajor tradicional",
    desc: "Galletas de chocolate Con toques de zeste de naranja, rellenas de manjar tradicional y bañadas en chocalate bitter o blanco.",
    prices: [{ label: "Precio único", price: 2000 }],
    emoji: "🍪", img: "img/productos/alfajortradicional.jpg", category: "peque-dulces"
  },
  {
    id: "p13", name: "Alfajor Maicena",
    desc: "Galletas de maicenas rellenas de manjar Artesanal, cubiertas de coco rallado y espolvoreadas con azúcar flor.",
    prices: [{ label: "Precio único", price: 1900 }],
    emoji: "🍪", img: "img/productos/alfajormaicena.jpg", category: "peque-dulces"
  },
  {
    id: "p14", name: "Alfajor Hojarasca",
    desc: "Discos de hojarascas rellenas de manjar artesanal, cubiertas con coco rallado y espolvoreadas con azúcar flor.",
    prices: [{ label: "Precio único", price: 1700 }],
    emoji: "🍪", img: "img/productos/alfajorhojarasca.jpg", category: "peque-dulces"
  },
  {
    id: "p18", name: "Pastelitos premium",
    desc: "La combinación ideal para compartir: intensos brownies con manjar artesanal, suaves cheesecakes de vainilla y frambuesa, clásicos pies de limón natural y tradicionales suspiros limeños. Pastelería artesanal lista para regalar y disfrutar.",
    prices: [{ label: "Precio único", price: 28500 }],
    emoji: "⭐", img: "img/productos/pastelitospremium.jpg", category: "premium", tag: "Destacado"
  },
];

const CATEGORY_LABELS = {
  tortas: "Tortas 🎂",
  tartas: "Tartas 🍰",
  "peque-dulces": "Peque-Dulces 🍪",
  premium: "Dulce variedad",
};
const CATEGORY_ORDER = ["tortas", "tartas", "premium", "peque-dulces"];

// ---------- Productos desde Google Sheets ----------
// Para editar productos y precios sin tocar código: pega aquí el enlace CSV
// de la planilla publicada (Archivo → Compartir → Publicar en la web → CSV).
// Si queda vacío, o la planilla no responde, se usa la lista PRODUCTS de arriba.
const PRODUCTS_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTfpLLzVDhyd1qpwdR8iY_Il7QmbC7cegz5YgQltEQCCL5_w2eHrHusu3BxZbSdGjB4k6GR8oPEue-S/pub?gid=1908333832&single=true&output=csv";

const SHEET_CATEGORIES = {
  "tortas": "tortas",
  "tartas": "tartas",
  "peque-dulces": "peque-dulces",
  "peque dulces": "peque-dulces",
  "dulce variedad": "premium",
  "premium": "premium",
};
const CATEGORY_EMOJI = { tortas: "🎂", tartas: "🍰", "peque-dulces": "🍪", premium: "⭐" };

// Lector de CSV que respeta comillas (descripciones con comas o saltos de línea).
function parseCSV(text) {
  const rows = [];
  let row = [], field = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); rows.push(row); row = []; field = "";
    } else field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows;
}

// Convierte cada fila de la planilla al mismo formato que PRODUCTS.
// Las filas sin nombre, sin precio, con categoría desconocida o con
// visible = "no" se ignoran.
function productsFromCSV(text) {
  const [header, ...rows] = parseCSV(text.replace(/^﻿/, ""));
  const col = (name) => header.findIndex(h => h.trim().toLowerCase() === name);
  const idx = Object.fromEntries(
    ["id", "nombre", "descripcion", "categoria", "imagen", "etiqueta", "visible",
     "opcion1", "precio1", "opcion2", "precio2", "opcion3", "precio3"].map(n => [n, col(n)])
  );
  const get = (r, n) => (idx[n] >= 0 ? (r[idx[n]] || "").trim() : "");
  const toPrice = (v) => Number(String(v).replace(/[^\d]/g, ""));

  // Si dos filas tienen el mismo id (p. ej. al copiar una fila), se les da
  // uno distinto: el carrito y la foto ampliada buscan los productos por id.
  const usedIds = new Set();
  const uniqueId = (id) => {
    let out = id, n = 2;
    while (usedIds.has(out)) out = `${id}-${n++}`;
    usedIds.add(out);
    return out;
  };
  return rows.map((r, i) => {
    const category = SHEET_CATEGORIES[get(r, "categoria").toLowerCase()];
    const prices = [1, 2, 3]
      .map(n => ({ label: get(r, `opcion${n}`) || "Precio único", price: toPrice(get(r, `precio${n}`)) }))
      .filter(p => p.price > 0);
    const name = get(r, "nombre");
    if (!name || !category || !prices.length || /^no$/i.test(get(r, "visible"))) return null;
    const tag = get(r, "etiqueta");
    return {
      id: uniqueId(get(r, "id") || `s${i + 1}`),
      name,
      desc: get(r, "descripcion"),
      prices,
      emoji: CATEGORY_EMOJI[category],
      img: get(r, "imagen"),
      category,
      ...(tag && { tag }),
      ...(/^agotado$/i.test(tag) && { tagVariant: "agotado" }),
      ...(/^nuevo$/i.test(tag) && { tagVariant: "nuevo" }),
      ...(/^edici[oó]n limitada$/i.test(tag) && { tagVariant: "limitada" }),
    };
  }).filter(Boolean);
}

async function loadProductsFromSheet() {
  if (!PRODUCTS_SHEET_URL) return;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(PRODUCTS_SHEET_URL, { signal: controller.signal, cache: "no-store" });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const list = productsFromCSV(await res.text());
    if (list.length) PRODUCTS.splice(0, PRODUCTS.length, ...list);
  } catch (err) {
    console.warn("No se pudo leer la planilla de productos; se usa la lista del código.", err);
  }
}

const clp = (n) => n.toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });

// ---------- Vitrina ----------
const grid = document.getElementById("productGrid");
// Los clics de las tarjetas (tamaño, agregar, ampliar foto) se escuchan en
// toda la vitrina: sirven igual para las filas y para los resultados del buscador.
const vitrinaEl = document.getElementById("vitrina");

// selected: tamaño que aparece elegido al mostrar la tarjeta (por defecto el
// primero). El buscador lo usa para mostrar el tamaño que calza con el filtro.
function cardHTML(p, selected = 0) {
  // Tarjeta "próximamente" (p. ej. "¡Pronto, nuevo box!"): mismo formato que
  // un producto pero sin precio ni botón de compra, solo el anuncio.
  if (p.soon) {
    return `
    <article class="product-card product-card--soon" data-id="${p.id}">
      <div class="product-media">
        <span class="product-tag product-tag--soon">Próximamente</span>
        <img src="${p.img}" alt="${p.name} — próximamente" class="product-photo"
             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <span class="product-emoji-fallback">${p.emoji}</span>
      </div>
      <div class="product-body">
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-footer">
          <span class="product-soon-cta">Disponible muy pronto</span>
        </div>
      </div>
    </article>
  `;
  }

  const hasOptions = p.prices.length > 1;
  const priceOptions = hasOptions
    ? `<div class="price-options">
        ${p.prices.map((opt, i) => {
          // Texto corto en el botón (p. ej. "10 porc.") para que las 3 opciones
          // quepan en una sola fila; el carrito sigue usando data-label completo.
          const shortLabel = opt.label.replace(/^Torta\s+0*/i, "").replace(/\s*porciones/i, " porc.");
          return `<button type="button" class="price-chip${i === selected ? " active" : ""}" data-price="${opt.price}" data-label="${opt.label}">${shortLabel}</button>`;
        }).join("")}
      </div>`
    : "";

  // Producto agotado (misma etiqueta roja "Agotado"): se ve igual que
  // cualquier tarjeta pero con el botón de compra deshabilitado.
  const isAgotado = p.tagVariant === "agotado";

  return `
    <article class="product-card${isAgotado ? " product-card--agotado" : ""}" data-id="${p.id}">
      <div class="product-media">
        ${p.tag ? `<span class="product-tag${p.tagVariant ? ` product-tag--${p.tagVariant}` : ""}">${p.tag}</span>` : ""}
        <img src="${p.img}" alt="${p.name}" class="product-photo"
             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <span class="product-emoji-fallback">${p.emoji}</span>
        <span class="product-zoom-hint">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      </div>
      <div class="product-body">
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        ${priceOptions}
        <div class="product-footer">
          <span class="product-price">${clp(p.prices[selected].price)}</span>
          <button class="add-btn${isAgotado ? " add-btn--agotado" : ""}" data-id="${p.id}"${isAgotado ? " disabled" : ""}>${isAgotado ? "Agotado" : "Agregar"}</button>
        </div>
      </div>
    </article>
  `;
}

function renderGrid() {
  grid.innerHTML = "";
  // Una fila por categoría: el título centrado arriba y los productos
  // desplazándose hacia los lados (ver initProductRows).
  CATEGORY_ORDER.forEach(cat => {
    // Dentro de cada fila, los productos van de menor a mayor precio
    // (se usa el precio base, es decir la primera opción de cada uno).
    const items = PRODUCTS.filter(p => p.category === cat)
      .sort((a, b) => a.prices[0].price - b.prices[0].price);
    const section = document.createElement("div");
    section.className = "product-section";
    // Todos los títulos llevan la misma animación: el texto "late" y el
    // emoji se balancea. "Dulce variedad" lleva un dulce a cada lado (🍭 y 🍬).
    const [, label, emoji] = (CATEGORY_LABELS[cat] || cat).match(/^(.*?)\s*(\p{Extended_Pictographic}*)$/u);
    const text = `<span class="section-title-text">${label}</span>`;
    const titleContent = cat === "premium"
      ? `<span class="section-title-gem">🍭</span> ${text} <span class="section-title-gem">🍬</span>`
      : `${text}${emoji ? ` <span class="section-title-gem">${emoji}</span>` : ""}`;
    section.innerHTML = `
      <h3 class="product-section-title">
        <span class="section-title-pill">${titleContent}</span>
      </h3>
      <div class="product-grid">
        ${items.length
          ? `<div class="product-track">${items.map(p => cardHTML(p)).join("")}</div>`
          : `<p class="product-empty">Muy pronto vamos a<br>sumar productos acá.</p>`}
      </div>
    `;
    grid.appendChild(section);
  });
}

// ---------- Filas de productos con desplazamiento automático ----------
// Cada fila se desliza sola y de forma continua, alternando el sentido: la
// primera de izquierda a derecha, la segunda de derecha a izquierda, etc.
// El movimiento se hace con transform (no con el scroll nativo), así que en
// el celular no hay saltos al deslizar rápido: el arrastre con el dedo y la
// inercia al soltar los calcula este mismo código. Para que el bucle sea
// infinito, cada fila repite sus productos (copias con aria-hidden).
function initProductRows() {
  const btnLeft = document.getElementById("scrollLeft");
  const btnRight = document.getElementById("scrollRight");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const SPEED = 40;        // px por segundo del desplazamiento automático
  const NUDGE = 450;       // ms que dura el avance de una flecha
  const FRICTION = 4;      // qué tan rápido se frena la inercia al soltar
  const RESUME = 2000;     // ms de espera antes de retomar el auto tras tocar
  const DRAG_START = 8;    // px que hay que mover el dedo para empezar a arrastrar
  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  // pos = cuánto se ha corrido el contenido hacia la izquierda.
  // dir = +1 avanza hacia la izquierda (derecha → izquierda), -1 al revés.
  const rows = [...grid.querySelectorAll(".product-track")].map((track, i) => ({
    track,
    viewport: track.parentElement,
    originals: [...track.querySelectorAll(".product-card")],
    dir: i % 2 === 0 ? -1 : 1,
    setW: 0,
    pos: 0,
    vel: 0,          // velocidad de inercia (px/s) tras soltar el dedo
    nudge: null,
    hover: false,
    drag: null,
    suppressClick: false,
    resumeAt: 0,
  }));

  let step = 0; // ancho de una tarjeta + separación

  // Mide las filas y agrega las copias justas para que el bucle no se corte.
  function layout() {
    rows.forEach((row) => {
      const { track, viewport, originals } = row;
      track.querySelectorAll(".is-clone").forEach((el) => el.remove());
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      step = originals[0].getBoundingClientRect().width + gap;
      row.setW = step * originals.length;
      const copies = Math.ceil((row.setW + viewport.clientWidth) / row.setW);
      for (let c = 0; c < copies; c++) {
        originals.forEach((el) => {
          const clone = el.cloneNode(true);
          clone.classList.add("is-clone");
          clone.setAttribute("aria-hidden", "true");
          clone.querySelectorAll("button").forEach((b) => b.setAttribute("tabindex", "-1"));
          track.appendChild(clone);
        });
      }
      paint(row);
    });
  }

  function paint(row) {
    if (!row.setW) return;
    const x = ((row.pos % row.setW) + row.setW) % row.setW;
    row.track.style.transform = `translate3d(${-x}px, 0, 0)`;
  }

  // ---- Arrastre con el dedo (y con el mouse) + inercia ----
  rows.forEach((row) => {
    const { viewport } = row;

    viewport.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      row.drag = { id: e.pointerId, x0: e.clientX, y0: e.clientY, pos0: row.pos, active: false,
                   lastX: e.clientX, lastT: performance.now(), v: 0 };
      row.vel = 0;
      row.nudge = null;
    });

    viewport.addEventListener("pointermove", (e) => {
      const d = row.drag;
      if (!d || d.id !== e.pointerId) return;
      const dx = e.clientX - d.x0;
      const dy = e.clientY - d.y0;
      if (!d.active) {
        // Movimiento vertical: es la persona bajando por la página, se suelta la fila.
        if (Math.abs(dy) > DRAG_START && Math.abs(dy) > Math.abs(dx)) { row.drag = null; return; }
        if (Math.abs(dx) < DRAG_START) return;
        d.active = true;
        try { viewport.setPointerCapture(e.pointerId); } catch (_) { /* puntero ya liberado */ }
        viewport.classList.add("is-dragging");
      }
      const now = performance.now();
      const dt = Math.max(1, now - d.lastT);
      d.v = 0.8 * ((d.lastX - e.clientX) / dt * 1000) + 0.2 * d.v; // px/s, suavizado
      d.lastX = e.clientX;
      d.lastT = now;
      row.pos = d.pos0 - dx;
      paint(row);
    });

    const end = (e) => {
      const d = row.drag;
      if (!d || d.id !== e.pointerId) return;
      row.drag = null;
      row.resumeAt = performance.now() + RESUME;
      if (!d.active) return;
      viewport.classList.remove("is-dragging");
      // Si el dedo se detuvo antes de soltar, no hay inercia.
      row.vel = performance.now() - d.lastT > 80 ? 0 : Math.max(-3000, Math.min(3000, d.v));
      // Evita que soltar después de arrastrar cuente como clic en una tarjeta.
      row.suppressClick = true;
      setTimeout(() => { row.suppressClick = false; }, 0);
    };
    viewport.addEventListener("pointerup", end);
    viewport.addEventListener("pointercancel", end);
    // Sin esto, arrastrar con el mouse sobre una foto la "levanta" como imagen.
    viewport.addEventListener("dragstart", (e) => e.preventDefault());
    viewport.addEventListener("click", (e) => {
      if (row.suppressClick) { e.stopPropagation(); e.preventDefault(); }
    }, true);

    // Trackpad: deslizar con dos dedos hacia los lados mueve la fila.
    viewport.addEventListener("wheel", (e) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      row.pos += e.deltaX;
      row.vel = 0;
      row.nudge = null;
      row.resumeAt = performance.now() + RESUME;
      paint(row);
    }, { passive: false });

    viewport.addEventListener("mouseenter", () => { row.hover = true; });
    viewport.addEventListener("mouseleave", () => { row.hover = false; row.resumeAt = performance.now() + 400; });
  });

  // Flechas: › corre todas las filas un producto hacia la izquierda, ‹ al revés.
  function nudgeAll(sign) {
    if (!step) return;
    const now = performance.now();
    rows.forEach((row) => {
      const base = row.nudge ? row.nudge.to : row.pos;
      row.vel = 0;
      row.nudge = { from: row.pos, to: base + step * sign, start: now };
      row.resumeAt = now + RESUME;
    });
  }
  if (btnLeft) btnLeft.addEventListener("click", () => nudgeAll(-1));
  if (btnRight) btnRight.addEventListener("click", () => nudgeAll(1));

  let last = performance.now();
  let rafId = null;
  function frame(now) {
    rafId = requestAnimationFrame(frame);
    const dt = Math.min(now - last, 100) / 1000;
    last = now;
    rows.forEach((row) => {
      if (!row.setW || (row.drag && row.drag.active)) return;
      if (row.nudge) {
        const p = Math.min(1, (now - row.nudge.start) / (reduceMotion ? 1 : NUDGE));
        row.pos = row.nudge.from + (row.nudge.to - row.nudge.from) * easeInOut(p);
        if (p >= 1) row.nudge = null;
      } else if (Math.abs(row.vel) > 5) {
        row.pos += row.vel * dt;
        row.vel *= Math.exp(-FRICTION * dt);
      } else if (!reduceMotion && !row.hover && !row.drag && now >= row.resumeAt) {
        row.vel = 0;
        row.pos += SPEED * row.dir * dt;
      } else {
        return;
      }
      // Mantiene pos acotado para no perder precisión con el tiempo.
      if (Math.abs(row.pos) > row.setW * 1000) row.pos %= row.setW;
      paint(row);
    });
  }
  function play() {
    if (rafId === null) { last = performance.now(); rafId = requestAnimationFrame(frame); }
  }
  function halt() {
    if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
  }

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(layout, 200);
  });
  document.addEventListener("visibilitychange", () => (document.hidden ? halt() : play()));

  layout();
  play();
}

// ---------- Selección de tamaño/precio ----------
vitrinaEl.addEventListener("click", (e) => {
  const chip = e.target.closest(".price-chip");
  if (!chip) return;
  const card = chip.closest(".product-card");
  card.querySelectorAll(".price-chip").forEach(c => c.classList.remove("active"));
  chip.classList.add("active");
  const priceEl = card.querySelector(".product-price");
  priceEl.textContent = clp(Number(chip.dataset.price));
  priceEl.classList.remove("price-pulse");
  void priceEl.offsetWidth; // reinicia la animación aunque se repita
  priceEl.classList.add("price-pulse");
});

// ---------- Carrito ----------
let cart = {}; // { "id::label": { name, label, price, qty, emoji } }

function addToCart(key, item, btn) {
  if (cart[key]) {
    cart[key].qty += 1;
  } else {
    cart[key] = { ...item, qty: 1 };
  }
  renderCart();
  if (btn) {
    btn.classList.add("added");
    btn.textContent = "Agregado ✓";
    setTimeout(() => {
      btn.classList.remove("added");
      btn.textContent = "Agregar";
    }, 900);
  }
}

function removeFromCart(key) {
  const item = cart[key];
  if (item) {
    trackEvent("remove_from_cart", { currency: "CLP", value: item.price * item.qty, items: [analyticsItem(item)] });
  }
  delete cart[key];
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const cartCount = document.getElementById("cartCount");

  const keys = Object.keys(cart);
  cartCount.textContent = keys.reduce((sum, k) => sum + cart[k].qty, 0);

  if (keys.length === 0) {
    cartItems.innerHTML = `<p class="cart-empty">Tu boleta está vacía. Agrega algo de la vitrina.</p>`;
    cartTotal.textContent = clp(0);
    return;
  }

  let total = 0;
  cartItems.innerHTML = keys.map(key => {
    const item = cart[key];
    const subtotal = item.price * item.qty;
    total += subtotal;
    return `
      <div class="cart-item">
        <div>
          <div class="cart-item-name">${item.emoji} ${item.name} <span class="cart-item-label">— ${item.label}</span></div>
          <div class="cart-item-qty">${item.qty} × ${clp(item.price)}</div>
        </div>
        <button class="cart-item-remove" data-remove="${key}">Quitar</button>
      </div>
    `;
  }).join("");
  cartTotal.textContent = clp(total);
}

vitrinaEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".add-btn");
  if (!btn) return;
  const card = btn.closest(".product-card");
  const id = btn.dataset.id;
  const p = PRODUCTS.find(x => x.id === id);
  const activeChip = card.querySelector(".price-chip.active");
  const label = activeChip ? activeChip.dataset.label : p.prices[0].label;
  const price = activeChip ? Number(activeChip.dataset.price) : p.prices[0].price;
  const key = `${id}::${label}`;
  addToCart(key, { id, name: p.name, label, price, emoji: p.emoji, category: p.category }, btn);
  trackEvent("add_to_cart", { currency: "CLP", value: price, items: [analyticsItem({ id, name: p.name, label, price, category: p.category, qty: 1 })] });
});

// ---------- Estadísticas (Google Analytics 4) ----------
// Eventos de comercio electrónico estándar: GA4 los muestra en
// Informes → Monetización → Compras de comercio electrónico.
function trackEvent(name, params) {
  if (typeof gtag === "function") gtag("event", name, params);
}
function analyticsItem(item) {
  return {
    item_id: item.id,
    item_name: item.name,
    item_variant: item.label,
    item_category: (CATEGORY_LABELS[item.category] || item.category || "").replace(/\s*\p{Extended_Pictographic}+/gu, ""),
    price: item.price,
    quantity: item.qty,
  };
}

// ---------- Lightbox (ampliar foto de producto) ----------
const lightbox = document.getElementById("lightbox");
const lightboxOverlay = document.getElementById("lightboxOverlay");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");

function openLightbox(src, name, desc) {
  lightboxImg.src = src;
  lightboxImg.alt = name;
  lightboxCaption.innerHTML =
    `<span class="lightbox-title">${name}</span>` +
    (desc ? `<span class="lightbox-desc">${desc}</span>` : "");
  lightbox.classList.add("open");
  lightboxOverlay.classList.add("open");
  lightboxClose.classList.add("open");
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightboxOverlay.classList.remove("open");
  lightboxClose.classList.remove("open");
}

vitrinaEl.addEventListener("click", (e) => {
  const photo = e.target.closest(".product-photo");
  if (!photo || photo.style.display === "none") return;
  const card = photo.closest(".product-card");
  const p = card && PRODUCTS.find(x => x.id === card.dataset.id);
  openLightbox(photo.src, p ? p.name : photo.alt, p ? p.desc : "");
});

lightboxOverlay.addEventListener("click", closeLightbox);
lightboxClose.addEventListener("click", closeLightbox);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

document.getElementById("cartItems").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-remove]");
  if (!btn) return;
  removeFromCart(btn.dataset.remove);
});

// ---------- Panel del carrito ----------
const cartPanel = document.getElementById("cartPanel");
const cartOverlay = document.getElementById("cartOverlay");

function openCart() {
  cartPanel.classList.add("open");
  cartOverlay.classList.add("open");
}
function closeCart() {
  cartPanel.classList.remove("open");
  cartOverlay.classList.remove("open");
}

document.getElementById("cartToggle").addEventListener("click", openCart);
document.getElementById("cartClose").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

document.getElementById("cartCheckout").addEventListener("click", () => {
  const keys = Object.keys(cart);
  if (keys.length === 0) return;
  const resumen = keys.map(key => {
    const item = cart[key];
    return `${item.qty}x ${item.name} (${item.label})`;
  }).join(", ");
  const items = keys.map(key => cart[key]);
  trackEvent("begin_checkout", {
    currency: "CLP",
    value: items.reduce((sum, it) => sum + it.price * it.qty, 0),
    items: items.map(analyticsItem),
  });
  const mensaje = encodeURIComponent(`Hola! Quiero encargar: ${resumen}`);
  window.open(`https://wa.me/56920679622?text=${mensaje}`, "_blank");
});

// ---------- Mensaje animado de "formulario enviado" ----------
// Se comparte con mayoristas.html (allí hay una copia de esta función).
function showFormSuccess(message) {
  const anterior = document.querySelector(".form-success");
  if (anterior) anterior.remove();

  const overlay = document.createElement("div");
  overlay.className = "form-success";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-live", "assertive");
  overlay.innerHTML = `
    <div class="form-success-card">
      <svg class="form-success-check" viewBox="0 0 52 52" aria-hidden="true">
        <circle cx="26" cy="26" r="24"></circle>
        <path d="M14 27l8 8 16-16"></path>
      </svg>
      <p class="form-success-title">¡Formulario enviado correctamente!</p>
      <p class="form-success-text">${message}</p>
      <button type="button" class="btn btn-primary form-success-close">Cerrar</button>
    </div>
  `;
  document.body.appendChild(overlay);

  const cerrar = () => {
    overlay.classList.add("is-closing");
    setTimeout(() => overlay.remove(), 300);
  };
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay || e.target.classList.contains("form-success-close")) cerrar();
  });
  document.addEventListener("keydown", function esc(e) {
    if (e.key === "Escape") {
      cerrar();
      document.removeEventListener("keydown", esc);
    }
  });
  setTimeout(cerrar, 6000);
}

// ---------- Formulario de encargos ----------
// El formulario mayorista vive en mayoristas.html con su propio script,
// pero usa este mismo endpoint de Formspree y correo de destino.
function wireFormspreeForm(formId, okMessage) {
  const form = document.getElementById(formId);
  if (!form) return;
  const note = document.getElementById("formNote");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Honeypot anti-spam: si el campo trampa viene lleno, es un bot -> se descarta.
    if (form.elements._gotcha && form.elements._gotcha.value) return;

    // Ningún campo puede quedar vacío: si falta algo, el navegador
    // muestra el aviso y no se envía.
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          form.reset();
          showFormSuccess(okMessage);
        } else if (note) {
          note.textContent = "No pudimos enviarlo. Escríbenos directo por WhatsApp, por favor.";
        }
      })
      .catch(() => {
        if (note) note.textContent = "No pudimos enviarlo. Escríbenos directo por WhatsApp, por favor.";
      })
      .finally(() => {
        if (note) setTimeout(() => (note.textContent = ""), 5000);
      });
  });
}

wireFormspreeForm("orderForm", "Te confirmaremos por WhatsApp dentro de 2 horas.");

// ---------- Carrusel de fotos del hero ----------
const HERO_SLIDES = [
  {
    img: "img/hero-torta-1.jpg",           // se usa como "poster" del video (y de respaldo si el video no carga)
    video: "video/alfajor-frambuesa.mp4",  // coloca aquí el archivo; opcional un .webm más liviano abajo
    videoWebm: "",                          // ej: "video/alfajor-frambuesa.webm" (si lo tienes)
    eyebrow: "La más vendida",
    titleHTML: `Alfajor frambuesa<br><span class="accent">Dúo clásico</span>`,
    text: "Delicadas capas de hojarasca rellenas de manjar tradicional, crema de vainilla y frambuesas frescas.",
    caption: "✨ La estrella de la casa ✨",
  },
  {
    img: "img/hero-torta-2.jpg",
    eyebrow: "Bocados premium",
    titleHTML: `Mini pastelitos<br><span class="accent">Bocados elegantes</span>`,
    text: "Selección dulce para regalar momentos inolvidables: pie limón, suspiro limeño, cheesecake y brownie.",
    caption: "Ideal para compartir",
  },
  {
    img: "img/hero-torta-3.jpg",
    eyebrow: "Ideal para compartir",
    titleHTML: `Mix de tartas<br><span class="accent">Equilibrio perfecto</span>`,
    text: "Tartas, cheesecake, pie de limón, brownie y kuchen sureño. Especial para compartir.",
    caption: "Todo en un solo pedido",
  },
];

function initHeroSlider() {
  const track = document.getElementById("heroSlides");
  const dotsWrap = document.getElementById("heroDots");
  const caption = document.getElementById("heroCaption");
  const eyebrow = document.getElementById("heroEyebrow");
  const title = document.getElementById("heroTitle");
  const text = document.getElementById("heroText");
  if (!track || !dotsWrap || !caption || !eyebrow || !title || !text) return;

  track.innerHTML = HERO_SLIDES.map((s, i) => {
    const media = s.video
      ? `<video class="hero-slide-video" poster="${s.img}" muted loop playsinline preload="metadata" aria-label="${s.caption}">
           ${s.videoWebm ? `<source src="${s.videoWebm}" type="video/webm">` : ""}
           <source src="${s.video}" type="video/mp4">
         </video>`
      : `<img class="hero-slide-img" src="${s.img}" alt="${s.caption}" onerror="this.style.display='none';">`;
    return `<div class="hero-slide${i === 0 ? " active" : ""}">${media}</div>`;
  }).join("");

  dotsWrap.innerHTML = HERO_SLIDES.map((_, i) => `
    <button class="hero-dot${i === 0 ? " active" : ""}" aria-label="Ver foto ${i + 1}"></button>
  `).join("");

  const slides = track.querySelectorAll(".hero-slide");
  const dots = dotsWrap.querySelectorAll(".hero-dot");
  const textEls = [eyebrow, title, text, caption];
  let current = 0;

  // ----- videos del hero: reproducir solo el del slide activo -----
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = navigator.connection && navigator.connection.saveData;
  function syncVideos() {
    const paused = document.hidden || reduceMotion || saveData;
    slides.forEach((slide, i) => {
      const v = slide.querySelector(".hero-slide-video");
      if (!v) return;
      if (i === current && !paused) {
        v.play().catch(() => {}); // si el navegador lo bloquea, queda el poster (la foto)
      } else {
        v.pause();
        if (i !== current) { try { v.currentTime = 0; } catch (e) {} }
      }
    });
  }
  document.addEventListener("visibilitychange", syncVideos);

  function goTo(index) {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");
    current = index;
    slides[current].classList.add("active");
    dots[current].classList.add("active");
    syncVideos();

    // Los textos salen deslizándose hacia arriba y desenfocados; al volver a
    // entrar lo hacen en cascada (etiqueta, título, párrafo y por último la
    // insignia de la foto), en vez del simple fundido de antes.
    textEls.forEach(el => (el.dataset.phase = "out"));
    setTimeout(() => {
      const s = HERO_SLIDES[current];
      eyebrow.textContent = s.eyebrow;
      title.innerHTML = s.titleHTML;
      text.textContent = s.text;
      caption.textContent = s.caption;
      textEls.forEach(el => (el.dataset.phase = "in"));
    }, 260);
  }

  syncVideos();

  // Cada texto (etiqueta, título y párrafo) reserva el alto del más largo de
  // todos los slides. Así la portada mide siempre lo mismo al rotar y no
  // empuja la página hacia arriba o abajo (se notaba en celulares, donde un
  // texto ocupaba una línea más que otro). Se recalcula al cambiar el ancho
  // de la pantalla y cuando terminan de cargar las tipografías.
  const textFields = [
    [eyebrow, (s) => { eyebrow.textContent = s.eyebrow; }],
    [title,   (s) => { title.innerHTML = s.titleHTML; }],
    [text,    (s) => { text.textContent = s.text; }],
  ];
  function lockTextHeights() {
    textFields.forEach(([el, set]) => {
      const saved = el.innerHTML;
      el.style.minHeight = "";
      let max = el.offsetHeight;
      HERO_SLIDES.forEach((s) => { set(s); max = Math.max(max, el.offsetHeight); });
      el.innerHTML = saved;
      el.style.minHeight = max + "px";
    });
  }
  lockTextHeights();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(lockTextHeights);
  let lockTimer;
  window.addEventListener("resize", () => {
    clearTimeout(lockTimer);
    lockTimer = setTimeout(lockTextHeights, 150);
  });

  // El slide del video se muestra medio segundo más que los de foto.
  const DWELL = 4500;
  let timer;
  function scheduleNext() {
    clearTimeout(timer);
    const extra = HERO_SLIDES[current].video ? 500 : 0;
    timer = setTimeout(() => {
      goTo((current + 1) % HERO_SLIDES.length);
      scheduleNext();
    }, DWELL + extra);
  }
  scheduleNext();

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      goTo(i);
      scheduleNext();
    });
  });
}

// ---------- Menú móvil ----------
const navToggle = document.getElementById("navToggle");
const mobileNav = document.getElementById("mobileNav");

function closeMobileNav() {
  mobileNav.classList.remove("open");
  navToggle.classList.remove("active");
  navToggle.setAttribute("aria-expanded", "false");
}

navToggle.addEventListener("click", () => {
  const isOpen = mobileNav.classList.toggle("open");
  navToggle.classList.toggle("active", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

mobileNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", closeMobileNav);
});

// ---------- Aviso "Próximamente" (p. ej. pestaña Cursos online) ----------
function initSoonLinks() {
  let modal;
  const close = () => modal && modal.classList.remove("open");
  document.querySelectorAll(".js-soon").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      if (!modal) {
        modal = document.createElement("div");
        modal.className = "soon-modal";
        modal.innerHTML = `
          <div class="soon-modal-box" role="dialog" aria-modal="true" aria-labelledby="soonTitle">
            <span class="soon-modal-icon">✨</span>
            <h3 id="soonTitle" class="soon-modal-title"></h3>
            <p class="soon-modal-text">¡Próximamente!</p>
            <button type="button" class="btn btn-primary soon-modal-close">Entendido</button>
          </div>`;
        document.body.appendChild(modal);
        modal.addEventListener("click", (ev) => {
          if (ev.target === modal || ev.target.closest(".soon-modal-close")) close();
        });
        document.addEventListener("keydown", (ev) => { if (ev.key === "Escape") close(); });
      }
      modal.querySelector(".soon-modal-title").textContent = link.dataset.soon || "";
      modal.classList.add("open");
      modal.querySelector(".soon-modal-close").focus();
    });
  });
}
initSoonLinks();

// ---------- Animaciones al hacer scroll ----------
function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach(el => el.classList.add("in-view"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

  items.forEach(el => observer.observe(el));

  // red de seguridad: si algo impide que la animación se dispare
  // (bloqueadores, navegadores raros), el contenido igual aparece.
  setTimeout(() => {
    items.forEach(el => el.classList.add("in-view"));
  }, 1800);
}

// ---------- Transición animada entre páginas ----------
// Al ir a otra página del sitio (p. ej. "Precios Mayoristas"), la página
// actual se desvanece antes de navegar y la siguiente entra con un fundido.
function initPageTransitions() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Si se vuelve con el botón "atrás", limpia el estado de salida.
  window.addEventListener("pageshow", () => document.body.classList.remove("is-leaving"));
  if (reduceMotion) return;

  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    const distintaPagina =
      href &&
      !href.startsWith("#") &&
      !link.target &&
      link.origin === window.location.origin &&
      link.pathname !== window.location.pathname;
    if (!distintaPagina) return;

    link.addEventListener("click", (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      document.body.classList.add("is-leaving");
      setTimeout(() => { window.location.href = link.href; }, 320);
    });
  });
}

// ---------- Reseñas (Instagram / TikTok) ----------
// Comentarios y reseñas reales de clientes, copiados tal cual desde Instagram
// o TikTok. Para agregar, cambiar o quitar una reseña solo hay que editar
// este arreglo — no hace falta tocar el HTML ni el CSS. Mientras esté vacío
// (como ahora) se muestra un aviso de "muy pronto" en vez de inventar reseñas.
// Intercaladas TikTok / Instagram a propósito, para que la vitrina de
// reseñas no se vea agrupada por red social.
const TESTIMONIOS = [
  {
    autor: "@fadich_zc",
    red: "tiktok",
    texto: "Los mejoresss",
    link: "",
  },
  {
    autor: "@bbecitaboni",
    red: "instagram",
    texto: "Amooo",
    link: "",
  },
  {
    autor: "@sandrafe151",
    red: "tiktok",
    texto: "es una delicia 😋😋",
    link: "",
  },
  {
    autor: "@maxilr_12",
    red: "instagram",
    texto: "🔥🙌",
    link: "",
  },
  {
    autor: "@danidi1312",
    red: "tiktok",
    texto: "hay amoooo el pie de limón 💖 se ve delicioso 🤭",
    link: "",
  },
  {
    autor: "@cotralchile",
    red: "instagram",
    texto: "Que delicia 💜🙌🏻",
    link: "",
  },
  {
    autor: "@sofiacarvajal661",
    red: "tiktok",
    texto: "nooo, me muero 🤤🤤, se me antojaron las cocadas se ven 10 de 10",
    link: "",
  },
  {
    autor: "@flancita.a",
    red: "instagram",
    texto: "Amé!",
    link: "",
  },
  {
    autor: "@leandro_alexis_",
    red: "tiktok",
    texto: "Qué rico se veeeee",
    link: "",
  },
  {
    autor: "@paolapazfotografa",
    red: "instagram",
    texto: "👏👏👏 me encanta tu trabajo",
    link: "",
  },
  // Ejemplo de cómo se agrega cada reseña real:
  // {
  //   autor: "Nombre tal como aparece en la red social",
  //   red: "instagram",  // o "tiktok"
  //   texto: "El comentario o reseña, copiado tal cual.",
  //   link: "https://www.instagram.com/p/xxxxxxx/", // opcional: URL de la publicación
  // },
];

const RESENA_ICONOS = {
  instagram: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.6"/>
    <circle cx="12" cy="12" r="4.2" stroke="currentColor" stroke-width="1.6"/>
    <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor"/>
  </svg>`,
  tiktok: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M14.7 3v10.2a3.3 3.3 0 1 1-2.9-3.28" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14.7 3c.35 2.7 2.1 4.3 4.6 4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
};

function testimonioCardHTML(t, i, esClon) {
  // Sello de la red social bien grande, sobresaliendo arriba de la tarjeta
  // (mismo truco visual que la insignia "100% artesanal" del chef).
  return `
    <article class="resena-card" style="--i:${i}"${esClon ? ' aria-hidden="true"' : ""}>
      <span class="resena-badge resena-badge--${t.red}" aria-hidden="true">${RESENA_ICONOS[t.red] || ""}</span>
      <p class="resena-texto">${t.texto}</p>
      ${t.link
        ? `<a class="resena-autor" href="${t.link}" target="_blank" rel="noopener"${esClon ? ' tabindex="-1"' : ""}>${t.autor}</a>`
        : `<span class="resena-autor">${t.autor}</span>`}
    </article>
  `;
}

function renderTestimonios() {
  const track = document.getElementById("resenasTrack");
  if (!track) return;

  if (!TESTIMONIOS.length) {
    track.classList.add("resenas-track--empty");
    track.innerHTML = `<p class="resenas-empty">Muy pronto vamos a compartir aquí las reseñas de nuestra comunidad en Instagram y TikTok.</p>`;
    return;
  }

  // El set de tarjetas se dibuja dos veces (la segunda copia va oculta a
  // lectores de pantalla) para que el desplazamiento lateral automático sea
  // infinito y sin cortes, en vez de acumularse hacia abajo.
  const real = TESTIMONIOS.map((t, i) => testimonioCardHTML(t, i, false)).join("");
  const clon = TESTIMONIOS.map((t, i) => testimonioCardHTML(t, i, true)).join("");
  track.innerHTML = real + clon;
  // La velocidad se ajusta sola según cuántas reseñas haya (~5s por tarjeta).
  track.style.setProperty("--marquee-duration", `${TESTIMONIOS.length * 5}s`);
}

// ---------- Splash de bienvenida ----------
// El overlay se desvanece por CSS; aquí solo se quita del DOM al terminar.
(function initSplash() {
  const splash = document.getElementById("splash");
  if (!splash) return;
  const remove = () => splash.remove();
  splash.addEventListener("animationend", (e) => {
    if (e.target === splash && e.animationName === "splashOut") remove();
  });
  setTimeout(remove, 3900); // respaldo por si no dispara animationend
})();

// ---------- Banner de temporada (desde la planilla) ----------
// Se maneja desde la pestaña "anuncios" de la planilla, publicada como CSV.
// Columnas: activo | texto | boton | enlace | desde | hasta | color
//  - activo: "si" para mostrarlo.
//  - desde / hasta (opcionales): fechas dd/mm/aaaa; fuera de ese rango no se muestra.
//  - boton + enlace (opcionales): texto del botón y a dónde lleva (ej. #vitrina o un link).
//  - color (opcional): dorado, rojo, verde, morado, naranjo o rosado.
// Si hay varios anuncios activos, van rotando. Si queda vacío, no se muestra nada.
const ANNOUNCEMENT_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTfpLLzVDhyd1qpwdR8iY_Il7QmbC7cegz5YgQltEQCCL5_w2eHrHusu3BxZbSdGjB4k6GR8oPEue-S/pub?gid=1980818935&single=true&output=csv";
const BANNER_COLORS = ["dorado", "rojo", "verde", "morado", "naranjo", "rosado"];

function parseSheetDate(v, endOfDay) {
  const s = (v || "").trim();
  if (!s) return null;
  let d, m, y;
  let match = s.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})$/);   // dd/mm/aaaa
  if (match) [, d, m, y] = match;
  else if ((match = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/))) [, y, m, d] = match; // aaaa-mm-dd
  else return null;
  y = Number(y) < 100 ? 2000 + Number(y) : Number(y);
  return endOfDay ? new Date(y, m - 1, d, 23, 59, 59) : new Date(y, m - 1, d);
}

async function loadAnnouncements() {
  if (!ANNOUNCEMENT_SHEET_URL) return [];
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(ANNOUNCEMENT_SHEET_URL, { signal: controller.signal, cache: "no-store" });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const [header, ...rows] = parseCSV((await res.text()).replace(/^﻿/, ""));
    const col = (name) => header.findIndex(h => h.trim().toLowerCase() === name);
    const get = (r, n) => (col(n) >= 0 ? (r[col(n)] || "").trim() : "");
    const now = new Date();
    return rows.map(r => {
      const text = get(r, "texto");
      if (!text || !/^s[ií]$/i.test(get(r, "activo"))) return null;
      const from = parseSheetDate(get(r, "desde"), false);
      const until = parseSheetDate(get(r, "hasta"), true);
      if ((from && now < from) || (until && now > until)) return null;
      const color = get(r, "color").toLowerCase();
      return {
        text,
        button: get(r, "boton"),
        link: get(r, "enlace"),
        color: BANNER_COLORS.includes(color) ? color : "dorado",
      };
    }).filter(Boolean);
  } catch (err) {
    console.warn("No se pudo leer la pestaña de anuncios.", err);
    return null; // null = no se pudo leer (distinto de "no hay anuncios")
  }
}

function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function renderSeasonBanner(list) {
  const banner = document.getElementById("seasonBanner");
  if (!banner) return;
  clearInterval(banner._timer); // por si ya se había dibujado antes (caché)
  if (!Array.isArray(list) || !list.length) { banner.hidden = true; return; }
  // Si la persona lo cerró, no vuelve a aparecer en esta visita (salvo que cambie el texto).
  const key = "gc_banner_" + list.map(a => a.text).join("|");
  try { if (sessionStorage.getItem(key)) { banner.hidden = true; return; } } catch (_) { /* sin almacenamiento */ }

  const slides = list.map((a, i) => {
    const safeLink = /^(https?:\/\/|#)/i.test(a.link) ? a.link : "";
    const external = /^https?:\/\//i.test(safeLink);
    const cta = a.button && safeLink
      ? `<a class="season-banner-btn" href="${escapeHTML(safeLink)}"${external ? ' target="_blank" rel="noopener"' : ""}>${escapeHTML(a.button)}</a>`
      : "";
    return `<div class="season-banner-slide${i === 0 ? " is-active" : ""}" data-color="${a.color}">
              <span class="season-banner-text">${escapeHTML(a.text)}</span>${cta}
            </div>`;
  }).join("");
  banner.innerHTML = `
    <div class="season-banner-inner">${slides}</div>
    <button type="button" class="season-banner-close" aria-label="Cerrar anuncio">×</button>`;
  banner.dataset.color = list[0].color;
  banner.hidden = false;

  const items = [...banner.querySelectorAll(".season-banner-slide")];
  let current = 0;
  let timer = null;
  if (items.length > 1) {
    banner._timer = timer = setInterval(() => {
      items[current].classList.remove("is-active");
      current = (current + 1) % items.length;
      items[current].classList.add("is-active");
      banner.dataset.color = items[current].dataset.color;
    }, 6000);
  }
  banner.querySelector(".season-banner-close").addEventListener("click", () => {
    banner.hidden = true;
    clearInterval(timer);
    try { sessionStorage.setItem(key, "1"); } catch (_) { /* sin almacenamiento */ }
  });
}

// ---------- Buscador y filtros de la vitrina ----------
// El buscador y el botón "Filtrar" van en la misma línea del título. Los
// filtros (categoría y precio) se eligen en un panel desplegable y se aplican
// al instante. Mientras no hay búsqueda ni filtros, se ven las filas en
// movimiento; al usarlos, las filas se cambian por una grilla de resultados.
const PRICE_RANGES = {
  "todos":      { label: "",                 test: () => true },
  "hasta-5000": { label: "Hasta $5.000",     test: (p) => p <= 5000 },
  "5000-20000": { label: "$5.000 a $20.000", test: (p) => p > 5000 && p <= 20000 },
  "mas-20000":  { label: "Más de $20.000",   test: (p) => p > 20000 },
};
const normalizeText = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

function initVitrinaFilters() {
  const vitrina = document.getElementById("vitrina");
  const search = document.getElementById("productSearch");
  const toggle = document.getElementById("filterToggle");
  const panel = document.getElementById("filterPanel");
  const badge = document.getElementById("filterBadge");
  const catWrap = document.getElementById("productFilters");
  const priceWrap = document.getElementById("priceFilter");
  const results = document.getElementById("productResults");
  if (!vitrina || !search || !toggle || !panel || !catWrap || !priceWrap || !results) return;

  // Categorías: "Todo", una por categoría con productos y, si existen
  // productos con esas etiquetas, "Nuevos" y "Edición limitada".
  const chips = [{ key: "todo", label: "Todo" }]
    .concat(CATEGORY_ORDER
      .filter(cat => PRODUCTS.some(p => p.category === cat))
      .map(cat => ({ key: "cat:" + cat, label: cat === "premium" ? "Dulce variedad 🍭" : (CATEGORY_LABELS[cat] || cat) })));
  if (PRODUCTS.some(p => p.tagVariant === "nuevo")) chips.push({ key: "tag:nuevo", label: "✨ Nuevos" });
  if (PRODUCTS.some(p => p.tagVariant === "limitada")) chips.push({ key: "tag:limitada", label: "⏳ Edición limitada" });
  catWrap.innerHTML = chips.map((c, i) =>
    `<button type="button" class="filter-chip${i === 0 ? " is-active" : ""}" data-filter="${c.key}" aria-pressed="${i === 0}">${c.label}</button>`
  ).join("");

  let category = "todo";
  let price = "todos";

  const selectChip = (wrap, chip) => wrap.querySelectorAll(".filter-chip").forEach(b => {
    b.classList.toggle("is-active", b === chip);
    b.setAttribute("aria-pressed", String(b === chip));
  });

  function apply() {
    const q = normalizeText(search.value.trim());
    const activeCount = (category !== "todo") + (price !== "todos");
    badge.hidden = !activeCount;
    badge.textContent = activeCount;
    toggle.classList.toggle("has-filters", activeCount > 0);

    const filtering = Boolean(q || activeCount);
    vitrina.classList.toggle("is-filtering", filtering);
    grid.hidden = filtering;
    results.hidden = !filtering;
    if (!filtering) { results.innerHTML = ""; return; }

    const words = q.split(/\s+/).filter(Boolean);
    // Un producto entra si CUALQUIERA de sus tamaños está en el rango de precio
    // (ej. "Más de $20.000" incluye las tortas de 10 y 20 porciones). En la
    // tarjeta queda elegido el primer tamaño que calza, con su precio.
    const list = PRODUCTS.map(p => {
      if (category.startsWith("cat:") && p.category !== category.slice(4)) return null;
      if (category.startsWith("tag:") && p.tagVariant !== category.slice(4)) return null;
      const selected = p.prices.findIndex(x => PRICE_RANGES[price].test(x.price));
      if (selected < 0) return null;
      const haystack = normalizeText(`${p.name} ${p.desc} ${CATEGORY_LABELS[p.category] || ""} ${p.tag || ""}`);
      if (!words.every(w => haystack.includes(w))) return null;
      return { p, selected };
    }).filter(Boolean)
      .sort((a, b) => a.p.prices[a.selected].price - b.p.prices[b.selected].price);

    // Resumen de lo que se está viendo, con cada filtro removible por separado.
    const tags = [];
    if (q) tags.push(`<button type="button" class="results-tag" data-clear="search">“${escapeHTML(search.value.trim())}” ✕</button>`);
    if (category !== "todo") tags.push(`<button type="button" class="results-tag" data-clear="category">${catWrap.querySelector(".is-active").textContent} ✕</button>`);
    if (price !== "todos") tags.push(`<button type="button" class="results-tag" data-clear="price">${PRICE_RANGES[price].label} ✕</button>`);

    results.innerHTML = `
      <div class="results-head">
        <span class="results-count">${list.length} ${list.length === 1 ? "producto" : "productos"}</span>
        ${tags.join("")}
        <button type="button" class="results-clear" data-clear="all">Ver todo</button>
      </div>
      ${list.length
        ? `<div class="results-grid">${list.map(r => cardHTML(r.p, r.selected)).join("")}</div>`
        : `<p class="product-empty">No encontramos productos con esa búsqueda.<br>Prueba con otra palabra o quita algún filtro.</p>`}`;
  }

  function clear(what) {
    if (what === "search" || what === "all") search.value = "";
    if (what === "category" || what === "all") { category = "todo"; selectChip(catWrap, catWrap.querySelector(".filter-chip")); }
    if (what === "price" || what === "all") { price = "todos"; selectChip(priceWrap, priceWrap.querySelector(".filter-chip")); }
    apply();
  }

  // Panel desplegable
  function openPanel(open) {
    panel.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.classList.toggle("is-open", open);
  }
  toggle.addEventListener("click", () => openPanel(panel.hidden));
  document.getElementById("filterDone").addEventListener("click", () => openPanel(false));
  document.getElementById("filterReset").addEventListener("click", () => { clear("category"); clear("price"); });
  document.addEventListener("click", (e) => {
    if (!panel.hidden && !panel.contains(e.target) && !toggle.contains(e.target)) openPanel(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !panel.hidden) { openPanel(false); toggle.focus(); }
  });

  catWrap.addEventListener("click", (e) => {
    const chip = e.target.closest(".filter-chip");
    if (!chip) return;
    category = chip.dataset.filter;
    selectChip(catWrap, chip);
    apply();
  });
  priceWrap.addEventListener("click", (e) => {
    const chip = e.target.closest(".filter-chip");
    if (!chip) return;
    price = chip.dataset.price;
    selectChip(priceWrap, chip);
    apply();
  });

  let typing;
  search.addEventListener("input", () => { clearTimeout(typing); typing = setTimeout(apply, 150); });
  results.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-clear]");
    if (btn) clear(btn.dataset.clear);
  });
}

// ---------- Init ----------
document.getElementById("year").textContent = new Date().getFullYear();
initPageTransitions();
renderCart();
renderTestimonios();
initScrollReveal();
initHeroSlider();
// La vitrina se dibuja de inmediato (invisible) con la lista del código, para
// que ya ocupe su espacio y la página no salte cuando llegue la planilla.
// Al responder la planilla se rellena con los productos actualizados.
renderGrid();
grid.classList.add("is-loading");
loadProductsFromSheet().finally(() => {
  renderGrid();
  grid.classList.remove("is-loading");
  initProductRows();
  initVitrinaFilters();
});
// Banner: se muestra al tiro el último anuncio conocido (guardado en este
// navegador) y luego se actualiza con la planilla; así no empuja la página
// hacia abajo en cada visita.
const BANNER_CACHE_KEY = "gc_banner_cache";
let cachedBanner = "[]";
try { cachedBanner = localStorage.getItem(BANNER_CACHE_KEY) || "[]"; } catch (_) { /* sin almacenamiento */ }
try { renderSeasonBanner(JSON.parse(cachedBanner)); } catch (_) { /* caché dañado */ }
loadAnnouncements().then((list) => {
  if (list === null) return; // la planilla no respondió: se deja lo que haya
  const fresh = JSON.stringify(list);
  try { localStorage.setItem(BANNER_CACHE_KEY, fresh); } catch (_) { /* sin almacenamiento */ }
  if (fresh !== cachedBanner) renderSeasonBanner(list);
});
