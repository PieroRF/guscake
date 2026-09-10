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
    emoji: "🎂", img: "img/productos/alfajordeamor.jpg", category: "tortas", tag: "Producto destacado"
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
    emoji: "🍰", img: "img/productos/piedelimon.jpg", category: "tartas", tag: "Producto destacado"
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
    emoji: "🍪", img: "img/productos/alfajorhojarasca.jpg", category: "peque-dulces"
  },
  {
    id: "p15", name: "Chocolate premium",
    desc: "Bizcocho húmedo de chocolate, relleno de manjar artesanal y chocolate real. Un box ideal para regalar.",
    prices: [{ label: "Precio único", price: 16500 }],
    emoji: "⭐", img: "img/productos/chocolatepremium.jpg", category: "premium"
  },
  {
    id: "p16", name: "Frambuesa premium",
    desc: "Fina selección de hojarascas, rellenas de manjar artesanal, crema batida y frambuesas naturales. Un box ideal para regalar.",
    prices: [{ label: "Precio único", price: 15500 }],
    emoji: "⭐", img: "img/productos/frambuesapremium.jpg", category: "premium", tag: "Producto destacado"
  },
  {
    id: "p17", name: "Carrot premium",
    desc: "Bizcocho húmedo de zanahorias de la huerta, relleno de un exquisito frosting de queso crema y manjar artesanal. Un box ideal para regalar.",
    prices: [{ label: "Precio único", price: 16500 }],
    emoji: "⭐", img: "img/productos/carrotpremium.jpg", category: "premium"
  },
  {
    id: "p18", name: "Pastelitos premium",
    desc: "La combinación ideal para compartir: intensos brownies con manjar artesanal, suaves cheesecakes de vainilla y frambuesa, clásicos pies de limón natural y tradicionales suspiros limeños. Pastelería artesanal lista para regalar y disfrutar.",
    prices: [{ label: "Precio único", price: 28500 }],
    emoji: "⭐", img: "img/productos/pastelitospremium.jpg", category: "premium", tag: "Producto destacado"
  },
  {
    id: "p19", name: "Box dieciochero GusCake",
    desc: "31 bocados premium pensados para endulzar el asado familiar. Una selección irresistible que reúne alfajores de maicena, hojarasca y chocolate, merengues, barquillos con manjar artesanal y ricas cocadas tradicionales.",
    prices: [{ label: "Precio único", price: 19990 }],
    emoji: "🇨🇱", img: "img/productos/boxdieciochero.jpg", category: "temporada"
  },
  {
    id: "p20", name: "Box de empolvados",
    desc: "La pausa dulce ideal para tus tardes: pack de 8 unidades con delicado bizcocho de vainilla, relleno con nuestro manjar artesanal de receta propia y coronado con azúcar flor.",
    prices: [{ label: "Precio único", price: 9600 }],
    emoji: "🇨🇱", img: "img/productos/boxempolvados.jpg", category: "temporada", tag: "Producto destacado"
  },
  {
    id: "p21", name: "Pajaritos",
    desc: "Tradición y dulzura en cada bocado. Panecillo dulce, suave y muy esponjoso, cubierto con un delicado toque de merengue suizo. El infaltable de este Dieciocho.",
    prices: [{ label: "Precio único", price: 2000 }],
    emoji: "🇨🇱", img: "img/productos/pajaritos.jpg", category: "temporada"
  },
  {
    id: "p22", name: "Empanada tradicional",
    desc: "El sabor más tradicional de nuestras Fiestas Patrias directo a tu mesa. Nuestra clásica empanada chilena está preparada con un sabroso pino de carne picada y cebolla en su punto justo, acompañado de aceituna y huevo cocido.",
    prices: [{ label: "Precio único", price: 2800 }],
    emoji: "🇨🇱", img: "img/productos/empanadatradicional.jpg", category: "temporada",
    tag: "Producto salado", tagVariant: "salado"
  },
];

const CATEGORY_LABELS = {
  tortas: "Tortas 🎂",
  tartas: "Tartas 🍰",
  "peque-dulces": "Peque-Dulces 🍪",
  premium: "Premium",
  temporada: "Fiestas Patrias",
};
const CATEGORY_ORDER = ["premium", "temporada", "tortas", "tartas", "peque-dulces"];

const clp = (n) => n.toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });

// ---------- Vitrina ----------
const grid = document.getElementById("productGrid");

function cardHTML(p) {
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

  return `
    <article class="product-card" data-id="${p.id}">
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
          <button class="add-btn" data-id="${p.id}">Agregar</button>
        </div>
      </div>
    </article>
  `;
}

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
      const items = PRODUCTS.filter(p => p.category === cat);
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
        titleContent = tricolorChileno(CATEGORY_LABELS[cat]);
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
    text: "Tartas, cheesecake, pie de limón, brownie y kuchen sureño. Una selección pensada especialmente para compartir.",
    caption: "Todo en un solo pedido",
  },
  {
    img: "img/hero-torta-4.jpg",        // poster / respaldo si el video no carga
    video: "video/sabor-a-chile.mp4",   // coloca aquí el archivo
    videoWebm: "",                       // ej: "video/sabor-a-chile.webm" (opcional)
    eyebrow: "🔴⚪🔵 Especial dieciochero 🔴⚪🔵",
    titleHTML: `Sabor a Chile<br><span class="accent">18 de Septiembre</span>`,
    text: "Box dieciochero, ideal para compartir. ¡Encarga con anticipación para estas Fiestas Patrias!",
    caption: "Disponible por tiempo limitado",
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

    textEls.forEach(el => (el.style.opacity = 0));
    setTimeout(() => {
      const s = HERO_SLIDES[current];
      eyebrow.textContent = s.eyebrow;
      title.innerHTML = s.titleHTML;
      text.textContent = s.text;
      caption.textContent = s.caption;
      textEls.forEach(el => (el.style.opacity = 1));
    }, 250);
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
initScrollReveal();
initHeroSlider();
initProductCarousel();
