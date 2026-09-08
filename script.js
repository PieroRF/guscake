// ==========================================================
// GUS CAKE — lógica de vitrina, carrito, formulario y hero
// ==========================================================

//PRODUCTOS//
const PRODUCTS = [
  {
    id: "p1", name: "Alfajor de amor",
    desc: "Finas laminasde hojarasca, rellenas de manjar tradicional, frambuesas naturales y crema chantilly de vainilla.",
    prices: [
      { label: "Torta 04 porciones", price: 15500 },
      { label: "Torta 10 porciones", price: 25500 },
      { label: "Torta 20 porciones", price: 35500 },
    ],
    emoji: "🎂", img: "img/productos/alfajordeamor.jpg", category: "tortas", tag: "Especial del día"
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
    emoji: "🍰", img: "img/productos/piedelimon.jpg", category: "tartas"
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
    emoji: "⭐", img: "img/productos/frambuesapremium.jpg", category: "premium"
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
    emoji: "⭐", img: "img/productos/pastelitospremium.jpg", category: "premium"
  },
];

const CATEGORY_LABELS = {
  tortas: "Tortas 🎂",
  tartas: "Tartas 🍰",
  "peque-dulces": "Peque-Dulces 🍪",
  premium: "Premium",
};
const CATEGORY_ORDER = ["premium", "tortas", "tartas", "peque-dulces"];

const clp = (n) => n.toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });

// ---------- Vitrina ----------
const grid = document.getElementById("productGrid");

function cardHTML(p) {
  const hasOptions = p.prices.length > 1;
  const priceOptions = hasOptions
    ? `<div class="price-options">
        ${p.prices.map((opt, i) => `
          <button type="button" class="price-chip${i === 0 ? " active" : ""}" data-price="${opt.price}" data-label="${opt.label}">${opt.label}</button>
        `).join("")}
      </div>`
    : "";

  return `
    <article class="product-card" data-id="${p.id}">
      <div class="product-media">
        ${p.tag ? `<span class="product-tag">${p.tag}</span>` : ""}
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

function renderGrid() {
  grid.innerHTML = "";
  CATEGORY_ORDER.forEach(cat => {
    const items = PRODUCTS.filter(p => p.category === cat);
    const isPremium = cat === "premium";
    const section = document.createElement("div");
    section.className = "product-section";
    section.innerHTML = `
      <h3 class="product-section-title${isPremium ? " product-section-title--premium" : ""}">
        ${isPremium ? "✨ Premium ✨" : (CATEGORY_LABELS[cat] || cat)}
      </h3>
      <div class="product-grid">
        ${items.length
          ? items.map(cardHTML).join("")
          : `<p class="product-empty">Muy pronto vamos a<br>sumar productos acá.</p>`}
      </div>
    `;
    grid.appendChild(section);
  });
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

function openLightbox(src, name) {
  lightboxImg.src = src;
  lightboxImg.alt = name;
  lightboxCaption.textContent = name;
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
  openLightbox(photo.src, photo.alt);
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

// ---------- Formulario de encargos ----------
document.getElementById("orderForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const note = document.getElementById("formNote");
  const formData = new FormData(form);

  fetch(form.action, {
    method: "POST",
    body: formData,
    headers: { Accept: "application/json" },
  })
    .then((response) => {
      if (response.ok) {
        note.textContent = "¡Listo! Te confirmamos por WhatsApp dentro de 02 horas.";
        form.reset();
      } else {
        note.textContent = "No pudimos enviarlo. Escríbenos directo por WhatsApp, por favor.";
      }
    })
    .catch(() => {
      note.textContent = "No pudimos enviarlo. Escríbenos directo por WhatsApp, por favor.";
    })
    .finally(() => {
      setTimeout(() => (note.textContent = ""), 5000);
    });
});

// ---------- Carrusel de fotos del hero ----------
const HERO_SLIDES = [
  {
    img: "img/hero-torta-1.jpg",
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
];

function initHeroSlider() {
  const track = document.getElementById("heroSlides");
  const dotsWrap = document.getElementById("heroDots");
  const caption = document.getElementById("heroCaption");
  const eyebrow = document.getElementById("heroEyebrow");
  const title = document.getElementById("heroTitle");
  const text = document.getElementById("heroText");
  if (!track || !dotsWrap || !caption || !eyebrow || !title || !text) return;

  track.innerHTML = HERO_SLIDES.map((s, i) => `
    <div class="scene-slide${i === 0 ? " active" : ""}">
      <img src="${s.img}" alt="${s.caption}" onerror="this.style.display='none';">
    </div>
  `).join("");

  dotsWrap.innerHTML = HERO_SLIDES.map((_, i) => `
    <button class="scene-dot${i === 0 ? " active" : ""}" aria-label="Ver foto ${i + 1}"></button>
  `).join("");

  const slides = track.querySelectorAll(".scene-slide");
  const dots = dotsWrap.querySelectorAll(".scene-dot");
  const textEls = [eyebrow, title, text, caption];
  let current = 0;

  function goTo(index) {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");
    current = index;
    slides[current].classList.add("active");
    dots[current].classList.add("active");

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

  let timer = setInterval(() => goTo((current + 1) % HERO_SLIDES.length), 4500);

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      goTo(i);
      clearInterval(timer);
      timer = setInterval(() => goTo((current + 1) % HERO_SLIDES.length), 4500);
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

// ---------- Init ----------
document.getElementById("year").textContent = new Date().getFullYear();
renderGrid();
renderCart();
initScrollReveal();
initHeroSlider();
