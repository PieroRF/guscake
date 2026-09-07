// ==========================================================
// DULCE ESPERA — lógica de vitrina, carrito y formulario
// ==========================================================

const PRODUCTS = [
  { id: "p1", name: "Alfajor de amor", desc: "Finas laminasde hojarasca, rellenas de manjar tradicional, frambuesas naturales y crema chantilly de vainilla.", price: 35500, emoji: "🎂", img: "img/productos/alfajordeamor.jpg", category: "tortas", tag: "Especial del día" },
  { id: "p2", name: "Choco Ganache", desc: "Bizcocho húmedo de chocolate, relleno de manjar tradicional y ganache bitter.", price: 36500, emoji: "🎂", img: "img/productos/chocoganache.jpg", category: "tortas" },
  { id: "p3", name: "Manjar nuez", desc: "Finas laminas de hojarascas, rellenas de manjar artesanal y nueces molidas.", price: 35500, emoji: "🎂", img: "img/productos/manjarnuez.jpg", category: "tortas" },
  { id: "p4", name: "Carrot cake", desc: "Bizcocho húmedo de zanahoria, relleno de frosting de queso crema de vainilla.", price: 36500, emoji: "🎂", img: "img/productos/carrotcake.jpg", category: "tortas" },
  { id: "p5", name: "Red velvet", desc: "Bizcocho rojo intenso con un toque de cacao, relleno de frosting de queso crema de vainilla.", price: 36500, emoji: "🎂", img: "img/productos/redvelvet.jpg", category: "tortas" },
  { id: "p6", name: "Pie de limón", desc: "Masa sableé rellena de crema de limón, cubierta de merengue suizo.", price: 22500, emoji: "🍰", img: "img/productos/piedelimon.jpg", category: "tartas" },
  { id: "p7", name: "Pie de frambuesa", desc: "Masa sableé rellena de crema de frambuesas naturales, cubierta de merengue suizo.", price: 22500, emoji: "🍰", img: "img/productos/piedeframbuesa.jpg", category: "tartas" },
  { id: "p8", name: "Kuchen sureño", desc: "Masa sableé rellena de cremoso kuchen de frutos rojos con toques de limón sutil.", price: 20500, emoji: "🍰", img: "img/productos/kuchensureño.jpg", category: "tartas" },
  { id: "p9", name: "Choco Brownie", desc: "Bizcocho húmedo de chocolate, cubierto de ganache bitter.", price: 21500, emoji: "🍰", img: "img/productos/chocobrownie.jpg", category: "tartas" },
  { id: "p10", name: "Cheseecake Maracuya", desc: "Tarta a base de queso crema de vainilla, cubierta con gel de maracuya.", price: 28500, emoji: "🍰", img: "img/productos/cheseecakemaracuya.jpg", category: "tartas" },
  { id: "p11", name: "Cheseecake Frambuesa", desc: "Tarta a base de queso crema de vainilla, cubierta con gel de frambuesa.", price: 28500, emoji: "🍰", img: "img/productos/cheseecakeframbuesa.jpg", category: "tartas" },
  { id: "p12", name: "Bomba chocolatosa", desc: "Cocada de bizcocho húmedo de chocolate, bañada en chocolate bitter.", price: 1200, emoji: "🍪", img: "img/productos/bombachocolatosa.jpg", category: "peque-dulces" },
  { id: "p13", name: "Cocadas", desc: "Cocadas de bizcocho de vainilla. Bañadas en coco rallado.", price: 700, emoji: "🍪", img: "img/productos/cocadas.jpg", category: "peque-dulces" },
  { id: "p14", name: "Alfajor tradicional", desc: "Galletas de chocolate Con toques de zeste de naranja, rellenas de manjar tradicional y bañadas en chocalate bitter o blanco.", price: 2000, emoji: "🍪", img: "img/productos/alfajortradicional.jpg", category: "peque-dulces" },
  { id: "p15", name: "Muffins", desc: "Bizcocho húmedo de vainilla. diferentes variedades; Chocolate, vainilla, frambuesa, arándanos, mora y frutos del bosque.", price: 2500, emoji: "🍪", img: "img/productos/muffins.jpg", category: "peque-dulces" },
  { id: "p16", name: "Alfajor Merengue", desc: "Discos de merengues suizo rellenos de manjar artesanal.", price: 1800, emoji: "🍪", img: "img/productos/m.jpg", category: "peque-dulces" },

];

const clp = (n) => n.toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });

// ---------- Vitrina ----------
const grid = document.getElementById("productGrid");
const filters = document.getElementById("filters");
let activeFilter = "todos";

function renderGrid() {
  grid.innerHTML = "";
  const items = PRODUCTS.filter(p => activeFilter === "todos" || p.category === activeFilter);
  items.forEach(p => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-media">
        ${p.tag ? `<span class="product-tag">${p.tag}</span>` : ""}
        <img src="${p.img}" alt="${p.name}" class="product-photo"
             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <span class="product-emoji-fallback">${p.emoji}</span>
      </div>
      <div class="product-body">
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-footer">
          <span class="product-price">${clp(p.price)}</span>
          <button class="add-btn" data-id="${p.id}">Agregar</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

filters.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-chip");
  if (!btn) return;
  filters.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
  btn.classList.add("active");
  activeFilter = btn.dataset.filter;
  renderGrid();
});

// ---------- Carrito ----------
let cart = {}; // { id: qty }

function addToCart(id, btn) {
  cart[id] = (cart[id] || 0) + 1;
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

function removeFromCart(id) {
  delete cart[id];
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const cartCount = document.getElementById("cartCount");

  const ids = Object.keys(cart);
  cartCount.textContent = ids.reduce((sum, id) => sum + cart[id], 0);

  if (ids.length === 0) {
    cartItems.innerHTML = `<p class="cart-empty">Tu boleta está vacía. Agrega algo de la vitrina.</p>`;
    cartTotal.textContent = clp(0);
    return;
  }

  let total = 0;
  cartItems.innerHTML = ids.map(id => {
    const p = PRODUCTS.find(x => x.id === id);
    const subtotal = p.price * cart[id];
    total += subtotal;
    return `
      <div class="cart-item">
        <div>
          <div class="cart-item-name">${p.emoji} ${p.name}</div>
          <div class="cart-item-qty">${cart[id]} × ${clp(p.price)}</div>
        </div>
        <button class="cart-item-remove" data-remove="${id}">Quitar</button>
      </div>
    `;
  }).join("");
  cartTotal.textContent = clp(total);
}

grid.addEventListener("click", (e) => {
  const btn = e.target.closest(".add-btn");
  if (!btn) return;
  addToCart(btn.dataset.id, btn);
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
  const ids = Object.keys(cart);
  if (ids.length === 0) return;
  const resumen = ids.map(id => {
    const p = PRODUCTS.find(x => x.id === id);
    return `${cart[id]}x ${p.name}`;
  }).join(", ");
  const mensaje = encodeURIComponent(`Hola! Quiero encargar: ${resumen}`);
  window.open(`https://wa.me/56920679622?text=${mensaje}`, "_blank");
});

// ---------- Formulario de encargos ----------
document.getElementById("orderForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const note = document.getElementById("formNote");
  note.textContent = "¡Listo! Te confirmamos por WhatsApp dentro de 02 horas.";
  e.target.reset();
  setTimeout(() => (note.textContent = ""), 5000);
});

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
