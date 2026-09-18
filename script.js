// ==========================================================
// GUS CAKE — lógica de vitrina, carrito, formulario y hero
// ==========================================================

// Contenido de temporada (Fiestas Patrias): se muestra automáticamente hasta
// esta fecha inclusive y desaparece solo (columna de la vitrina + slide del
// hero), sin tener que tocar el código cada año.
const FIESTAS_PATRIAS_CIERRE = new Date("2026-10-01T00:00:00");
const fiestasPatriasVigente = new Date() < FIESTAS_PATRIAS_CIERRE;

// La decoración sobre la foto principal del hero (banderín y bandera) usa
// la misma fecha de corte: se saca del DOM sola, sin dejar espacio vacío ni
// tener que tocar nada a mano.
if (!fiestasPatriasVigente) {
  const heroDecor = document.getElementById("heroFiestasDecor");
  if (heroDecor) heroDecor.remove();
} else if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  // El banderín y la bandera ondean con "animate"/"animateTransform" nativos
  // de SVG (no son animaciones CSS), así que "reducir movimiento" se aplica
  // pausándolos a mano con la API del propio SVG.
  document.querySelectorAll(".hero-bunting svg, .hero-fiesta-flag svg").forEach(svg => {
    if (svg.pauseAnimations) svg.pauseAnimations();
  });
}

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
    emoji: "🍪", img: "img/productos/alfajorhojarasca.jpg", category: "peque-dulces",
    tag: "Agotado", tagVariant: "agotado"
  },
  {
    id: "p15", name: "Chocolate premium",
    desc: "Bizcocho húmedo de chocolate, relleno de manjar artesanal y chocolate real. Un clásico intenso, perfecto para los amantes del chocolate.",
    prices: [{ label: "Precio único", price: 16500 }],
    emoji: "⭐", img: "img/productos/chocolatepremium.jpg", category: "premium"
  },
  {
    id: "p16", name: "Frambuesa premium",
    desc: "Fina selección de hojarascas, rellenas de manjar artesanal, crema batida y frambuesas naturales. Fresco, delicado y perfecto para sorprender en cualquier ocasión.",
    prices: [{ label: "Precio único", price: 15500 }],
    emoji: "⭐", img: "img/productos/frambuesapremium.jpg", category: "premium", tag: "Destacado"
  },
  {
    id: "p17", name: "Carrot premium",
    desc: "Bizcocho húmedo de zanahorias de la huerta, relleno de un exquisito frosting de queso crema y manjar artesanal. Suave, aromático y perfecto para acompañar con un buen café.",
    prices: [{ label: "Precio único", price: 16500 }],
    emoji: "⭐", img: "img/productos/carrotpremium.jpg", category: "premium"
  },
  {
    id: "p18", name: "Pastelitos premium",
    desc: "La combinación ideal para compartir: intensos brownies con manjar artesanal, suaves cheesecakes de vainilla y frambuesa, clásicos pies de limón natural y tradicionales suspiros limeños. Pastelería artesanal lista para regalar y disfrutar.",
    prices: [{ label: "Precio único", price: 28500 }],
    emoji: "⭐", img: "img/productos/pastelitospremium.jpg", category: "premium", tag: "Destacado"
  },
  {
    // Se retira junto con el resto de Fiestas Patrias después del 30/09 (ver
    // FIESTAS_PATRIAS_CIERRE al inicio del archivo).
    id: "p23", name: "Box dieciochero 2",
    desc: "25 bocados artesanales premium para Fiestas Patrias: surtido de alfajores, pajaritos, empolvados y merengues rellenos con manjar tradicional.",
    prices: [{ label: "Precio único", price: 15990 }],
    emoji: "🍰🧁🍪", img: "img/productos/boxdieciochero2.jpg", category: "temporada", tag: "Nuevo"
  },
  {
    id: "p19", name: "Box dieciochero 1",
    desc: "31 bocados premium pensados para endulzar el asado familiar. Una selección irresistible que reúne alfajores de maicena, hojarasca y chocolate, merengues, barquillos con manjar artesanal y ricas cocadas tradicionales.",
    prices: [{ label: "Precio único", price: 19990 }],
    emoji: "🇨🇱", img: "img/productos/boxdieciochero1.jpg", category: "temporada"
  },
  {
    id: "p20", name: "Box de empolvados",
    desc: "La pausa dulce ideal para tus tardes: pack de 8 unidades con delicado bizcocho de vainilla, relleno con nuestro manjar artesanal de receta propia y coronado con azúcar flor.",
    prices: [{ label: "Precio único", price: 9600 }],
    emoji: "🇨🇱", img: "img/productos/boxempolvados.jpg", category: "temporada", tag: "Destacado"
  },
  {
    id: "p21", name: "Box de pajaritos",
    desc: "Tradición y dulzura en cada bocado. Panecillos dulces, suaves y muy esponjosos, cubiertos con un delicado toque de merengue suizo. El infaltable de este Dieciocho.",
    prices: [{ label: "Precio único", price: 12990 }],
    emoji: "🇨🇱", img: "img/productos/boxpajaritos.jpg", category: "temporada", tag: "Destacado"
  },
  {
    id: "p23", name: "Empanada tradicional",
    desc: "El sabor más tradicional de nuestras Fiestas Patrias directo a tu mesa. Nuestra clásica empanada chilena está preparada con un sabroso pino de carne picada y cebolla en su punto justo, acompañado de aceituna y huevo cocido.",
    prices: [{ label: "Precio único", price: 2800 }],
    emoji: "🇨🇱", img: "img/productos/empanadatradicional.jpg", category: "temporada",
    tag: "Agotado", tagVariant: "agotado"
  },
];

const CATEGORY_LABELS = {
  tortas: "Tortas 🎂",
  tartas: "Tartas 🍰",
  "peque-dulces": "Peque-Dulces 🍪",
  premium: "Premium",
  temporada: "Fiestas Patrias",
};
// La columna "temporada" (Fiestas Patrias) se retira sola después del 30/09
// (ver FIESTAS_PATRIAS_CIERRE al inicio del archivo).
const CATEGORY_ORDER = ["premium", "temporada", "tortas", "tartas", "peque-dulces"]
  .filter(cat => cat !== "temporada" || fiestasPatriasVigente);

const clp = (n) => n.toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });

// ---------- Vitrina ----------
const grid = document.getElementById("productGrid");

function cardHTML(p) {
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
          return `<button type="button" class="price-chip${i === 0 ? " active" : ""}" data-price="${opt.price}" data-label="${opt.label}">${shortLabel}</button>`;
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
          <span class="product-price">${clp(p.prices[0].price)}</span>
          <button class="add-btn${isAgotado ? " add-btn--agotado" : ""}" data-id="${p.id}"${isAgotado ? " disabled" : ""}>${isAgotado ? "Agotado" : "Agregar"}</button>
        </div>
      </div>
    </article>
  `;
}

// Iconos decorativos de Fiestas Patrias (mismo dibujo que el cartel de
// arriba del todo, ver index.html) para flanquear el título de la columna.
const FIESTAS_ICONOS = {
  chupalla: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <ellipse cx="12" cy="17" rx="10" ry="2.3"/>
    <path d="M6.6 15.6c.3-3.9 2.6-6.9 5.4-6.9s5.1 3 5.4 6.9c-1.6.9-3.5 1.4-5.4 1.4s-3.8-.5-5.4-1.4z"/>
  </svg>`,
  copihue: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 3.4c1.9 0 3.2 2.1 3.2 5 0 3.4-1.5 6.7-3.2 9.1-1.7-2.4-3.2-5.7-3.2-9.1 0-2.9 1.3-5 3.2-5z"/>
    <ellipse cx="7.5" cy="9.6" rx="2.5" ry="1.4" transform="rotate(-35 7.5 9.6)" opacity="0.75"/>
    <ellipse cx="16.5" cy="9.6" rx="2.5" ry="1.4" transform="rotate(35 16.5 9.6)" opacity="0.75"/>
  </svg>`,
};

// Pinta un título letra por letra con los colores de la bandera chilena
// (azul, blanco y rojo) para la columna de Fiestas Patrias.
function tricolorChileno(texto) {
  const colores = ["cl-azul", "cl-blanco", "cl-rojo"];
  let i = 0;
  return [...texto]
    .map(ch => {
      if (ch === " ") return " ";
      const clase = colores[i % colores.length];
      i++;
      return `<span class="${clase}">${ch}</span>`;
    })
    .join("");
}

function renderGrid() {
  grid.innerHTML = "";
  // Se dibuja el set de columnas dos veces: el segundo es una copia (is-clone)
  // que permite que el deslizamiento automático sea infinito y sin cortes.
  const buildSet = (isClone) => {
    CATEGORY_ORDER.forEach(cat => {
      // Dentro de cada columna, los productos van de menor a mayor precio
      // (se usa el precio base, es decir la primera opción de cada uno).
      const items = PRODUCTS.filter(p => p.category === cat)
        .sort((a, b) => a.prices[0].price - b.prices[0].price);
      const isPremium = cat === "premium";
      const isTemporada = cat === "temporada";
      const section = document.createElement("div");
      section.className = "product-section" + (isClone ? " is-clone" : "");
      if (isClone) section.setAttribute("aria-hidden", "true");
      let titleClass = "product-section-title";
      if (isPremium) titleClass += " product-section-title--premium";
      if (isTemporada) titleClass += " product-section-title--chile";
      let titleContent;
      if (isPremium) {
        titleContent = "💎 Premium 💎";
      } else if (isTemporada) {
        titleContent =
          `<span class="chile-title-icon">${FIESTAS_ICONOS.chupalla}</span>` +
          tricolorChileno(CATEGORY_LABELS[cat]) +
          `<span class="chile-title-icon">${FIESTAS_ICONOS.copihue}</span>`;
      } else {
        titleContent = CATEGORY_LABELS[cat] || cat;
      }
      section.innerHTML = `
        <h3 class="${titleClass}">
          ${titleContent}
        </h3>
        <div class="product-grid">
          ${items.length
            ? items.map(cardHTML).join("")
            : `<p class="product-empty">Muy pronto vamos a<br>sumar productos acá.</p>`}
        </div>
      `;
      grid.appendChild(section);
    });
  };
  buildSet(false);
  buildSet(true);
}

// ---------- Carrusel automático de columnas de productos ----------
// Avance por pasos: la vitrina descansa mostrando 4 columnas y cada cierto
// rato desliza suavemente hasta la siguiente, en bucle infinito (el set de
// columnas está duplicado, así que el salto de retorno es invisible).
// Las flechas laterales fuerzan ese mismo deslizamiento al instante.
function initProductCarousel() {
  const btnLeft = document.getElementById("scrollLeft");
  const btnRight = document.getElementById("scrollRight");
  if (!grid || !btnLeft || !btnRight) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const COLS = CATEGORY_ORDER.length;  // columnas reales por set
  const DWELL = 2800;                  // ms quieto entre avances automáticos
  const GLIDE = reduceMotion ? 0 : 820; // ms que dura pasar de una columna a la siguiente

  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  // Ancho de una columna incluyendo el gap.
  function columnWidth() {
    const section = grid.querySelector(".product-section");
    if (!section) return grid.clientWidth || 1;
    const gap = parseFloat(getComputedStyle(grid).columnGap) || 32;
    return section.getBoundingClientRect().width + gap;
  }

  // Posición de scroll para un índice de columna dado, ya envuelta al primer set.
  function xForIndex(i) {
    const cw = columnWidth();
    const span = COLS * cw;
    return (((i * cw) % span) + span) % span;
  }

  let index = 0;        // columna asentada (entero)
  let curIndex = 0;     // posición actual (fraccionaria mientras desliza)
  let from = 0, to = 0, glideStart = 0;
  let dwellUntil = 0;
  let paused = false;
  let rafId = null;

  function beginGlide(target, now) {
    from = curIndex;
    to = target;
    glideStart = now || performance.now();
  }

  function frame(now) {
    rafId = requestAnimationFrame(frame);

    if (glideStart) {
      const p = GLIDE ? Math.min(1, (now - glideStart) / GLIDE) : 1;
      curIndex = from + (to - from) * easeInOut(p);
      grid.scrollLeft = xForIndex(curIndex);
      if (p >= 1) {
        glideStart = 0;
        index = ((Math.round(to) % COLS) + COLS) % COLS;
        curIndex = index;
        grid.scrollLeft = xForIndex(curIndex);
        dwellUntil = now + DWELL;
      }
    } else if (!paused && !reduceMotion && now >= dwellUntil) {
      beginGlide(index + 1, now);
    }
  }

  // Avance manual: responde siempre, aunque el auto esté en pausa o a mitad de camino.
  function nudge(dir) {
    const base = glideStart ? Math.round(curIndex) : index;
    beginGlide(base + dir, performance.now());
  }
  btnLeft.addEventListener("click", () => nudge(-1));
  btnRight.addEventListener("click", () => nudge(1));

  // El usuario arrastra / usa la rueda: seguimos su posición y aplazamos el auto.
  grid.addEventListener("scroll", () => {
    if (glideStart) return;
    if (Math.abs(grid.scrollLeft - xForIndex(curIndex)) > 2) {
      const raw = ((grid.scrollLeft / columnWidth()) % COLS + COLS) % COLS;
      curIndex = raw;
      index = Math.round(raw) % COLS;
      dwellUntil = performance.now() + DWELL * 2;
    }
  }, { passive: true });

  const pause = () => { paused = true; };
  const resume = (delay) => { paused = false; dwellUntil = performance.now() + (delay || 0); };
  grid.addEventListener("mouseenter", pause);
  grid.addEventListener("mouseleave", () => resume(500));
  grid.addEventListener("touchstart", pause, { passive: true });
  grid.addEventListener("touchend", () => resume(DWELL), { passive: true });

  function play() {
    if (rafId === null) { dwellUntil = performance.now() + DWELL; rafId = requestAnimationFrame(frame); }
  }
  function halt() {
    if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
  }
  document.addEventListener("visibilitychange", () => (document.hidden ? halt() : play()));
  window.addEventListener("resize", () => { if (!glideStart) grid.scrollLeft = xForIndex(curIndex); });

  grid.scrollLeft = 0;
  play();
}

// ---------- Selección de tamaño/precio ----------
grid.addEventListener("click", (e) => {
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

grid.addEventListener("click", (e) => {
  const btn = e.target.closest(".add-btn");
  if (!btn) return;
  const card = btn.closest(".product-card");
  const id = btn.dataset.id;
  const p = PRODUCTS.find(x => x.id === id);
  const activeChip = card.querySelector(".price-chip.active");
  const label = activeChip ? activeChip.dataset.label : p.prices[0].label;
  const price = activeChip ? Number(activeChip.dataset.price) : p.prices[0].price;
  const key = `${id}::${label}`;
  addToCart(key, { name: p.name, label, price, emoji: p.emoji }, btn);
});

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

grid.addEventListener("click", (e) => {
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
    eyebrow: "De todo un poco",
    titleHTML: `Mini pastelitos<br><span class="accent">Bocados elegantes</span>`,
    text: "Selección dulce para regalar momentos inolvidables: pie limón, suspiro limeño, cheesecake y brownie.",
    caption: "Ideal para compartir",
  },
  {
    img: "img/hero-torta-3.jpg",
    eyebrow: "Hecho a mano, sin atajos",
    titleHTML: `Mix de tartas<br><span class="accent">Equilibrio perfecto</span>`,
    text: "Tartas, cheesecake, pie de limón, brownie y kuchen sureño. Especial para compartir.",
    caption: "Todo en un solo pedido",
  },
  {
    img: "img/hero-torta-4.jpg",        // poster / respaldo si el video no carga
    video: "video/sabor-a-chile.mp4",   // coloca aquí el archivo
    videoWebm: "",                       // ej: "video/sabor-a-chile.webm" (opcional)
    eyebrow: "🔴⚪🔵 Especial dieciochero 🔵⚪🔴",
    titleHTML: `Sabor a Chile<br><span class="accent">18 de Septiembre</span>`,
    text: "Box dieciochero, ideal para compartir. ¡Encarga con anticipación para estas Fiestas Patrias!",
    caption: "Disponible por tiempo limitado",
    temporada: true, // se retira solo del hero después del 30/09 (FIESTAS_PATRIAS_CIERRE)
  },
].filter(s => !s.temporada || fiestasPatriasVigente);

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

// ---------- Init ----------
document.getElementById("year").textContent = new Date().getFullYear();
initPageTransitions();
renderGrid();
renderCart();
renderTestimonios();
initScrollReveal();
initHeroSlider();
initProductCarousel();
