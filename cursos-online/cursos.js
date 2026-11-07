// Página de cursos online: galería "Mis trabajos" y cursos en PDF.
// Lo que normalmente se edita está en las listas de abajo.

/* =====================================================================
   1. DESCRIPCIONES DE "MIS TRABAJOS"
   Las fotos img/mis-trabajos/fotocurso1, fotocurso2, ... toman estas
   descripciones en orden. Si hay más fotos que descripciones, la lista
   vuelve a empezar desde la primera.
   ===================================================================== */
const DESCRIPCIONES_TRABAJOS = [
  "Pastelería artesanal",
  "Decoración hecha a mano",
  "Técnica y detalle",
  "Repostería de autor",
  "Creaciones dulces",
  "Terminaciones finas",
  "Recetas propias",
  "Hecho con dedicación",
  "Sabor y presentación",
];

/* =====================================================================
   2. DATOS DE CADA CURSO
   El número corresponde al archivo cursos-online/pdf/cursoN.pdf
   (1 = curso1.pdf, 2 = curso2.pdf, ...). El nombre es el que se muestra
   y el que se envía por WhatsApp al presionar "¡Me interesa!". Precio y
   descripción son opcionales: si quedan vacíos ("") no se muestran.
   "etiqueta" (opcional) aparece como sello destacado en el centro de la
   vista previa, por ejemplo "Preventa" o "Nuevo". Vacía ("") = sin sello.
   ===================================================================== */
const CURSOS = {
  1: { nombre: "El Merengue perfecto", descripcion: "", precio: "", etiqueta: "" },
  2: { nombre: "Recetario Tartas", descripcion: "", precio: "", etiqueta: "Preventa" },
  3: { nombre: "Curso 3", descripcion: "", precio: "", etiqueta: "" },
};

// Cantidad de láminas (páginas) del PDF que se pueden ver antes del bloqueo.
const PAGINAS_VISTA_PREVIA = 2;

// Cantidad total de tarjetas en la sección de cursos. Los cursos publicados (PDF) van primero
// y los espacios que sobran se completan con tarjetas "Próximamente". Si hay más cursos
// publicados que este número, se muestran todos igual (sin tarjetas "Próximamente").
// Si en CURSOS el número de una tarjeta "Próximamente" ya tiene nombre propio, la tarjeta lo anuncia.
const TOTAL_TARJETAS_CURSOS = 3;

// Segundos que se muestra cada foto del chef (img/chef/fotochef1, fotochef2, ...).
const SEGUNDOS_POR_FOTO_CHEF = 5;

const WHATSAPP = "56920679622";

/* ===================================================================== */

const MAX_HUECOS = 3; // se deja de buscar tras 3 números seguidos sin archivo
const EXTENSIONES = ["jpg", "jpeg", "png", "webp", "JPG", "JPEG", "PNG"];

// Devuelve la ruta de la foto `${base}${n}` con la primera extensión que exista, o null.
const probarImagen = (src) => new Promise((ok) => {
  const img = new Image();
  img.onload = () => ok(src);
  img.onerror = () => ok(null);
  img.src = src;
});
async function buscarFoto(base, n) {
  for (const ext of EXTENSIONES) {
    const src = await probarImagen(`${base}${n}.${ext}`);
    if (src) return src;
  }
  return null;
}
// Busca base1, base2, ... en orden; tolera hasta MAX_HUECOS - 1 números saltados.
async function buscarSerie(base) {
  const fotos = [];
  let huecos = 0;
  for (let n = 1; huecos < MAX_HUECOS; n++) {
    const src = await buscarFoto(base, n);
    if (src) { fotos.push(src); huecos = 0; } else { huecos++; }
  }
  return fotos;
}

/* ---------- Carrusel de fotos del chef ---------- */

(async function carruselChef() {
  const marco = document.getElementById("chefFotos");
  const puntos = document.getElementById("chefPuntos");
  if (!marco) return;
  const fotos = await buscarSerie("../img/chef/fotochef");
  if (fotos.length < 2) return; // con una sola foto queda fija la que ya está en la página

  const alt = marco.querySelector("img")?.alt || "Chef pastelero de GusCake";
  const imgs = fotos.map((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = i === 0 ? alt : "";
    if (i === 0) img.className = "is-activa";
    return img;
  });
  marco.replaceChildren(...imgs);

  puntos.innerHTML = fotos.map((_, i) => `<button type="button" aria-label="Ver foto ${i + 1}"></button>`).join("");
  const botones = [...puntos.children];
  puntos.hidden = false;

  let actual = 0;
  const mostrar = (i) => {
    actual = (i + imgs.length) % imgs.length;
    imgs.forEach((img, k) => img.classList.toggle("is-activa", k === actual));
    botones.forEach((b, k) => b.classList.toggle("is-activa", k === actual));
  };
  mostrar(0);

  // Avance automático (se pausa al pasar el cursor y si el usuario prefiere menos movimiento).
  const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let temporizador = null;
  const iniciar = () => {
    if (sinMovimiento) return;
    clearInterval(temporizador);
    temporizador = setInterval(() => mostrar(actual + 1), SEGUNDOS_POR_FOTO_CHEF * 1000);
  };
  const detener = () => clearInterval(temporizador);
  botones.forEach((b, i) => b.addEventListener("click", () => { mostrar(i); iniciar(); }));
  const figura = marco.closest(".chef-retrato");
  figura.addEventListener("mouseenter", detener);
  figura.addEventListener("mouseleave", iniciar);
  iniciar();
})();

/* ---------- Galería "Mis trabajos" ---------- */

(function cargarTrabajos() {
  const grid = document.getElementById("trabajosGrid");
  if (!grid) return;
  const CARPETA = "../img/mis-trabajos/fotocurso";
  const buscar = (n) => buscarFoto(CARPETA, n);

  function agregar(src, indice) {
    const texto = DESCRIPCIONES_TRABAJOS[indice % DESCRIPCIONES_TRABAJOS.length] || "";
    const fig = document.createElement("figure");
    fig.className = "trabajo";
    fig.style.setProperty("--i", indice);
    fig.tabIndex = 0;
    fig.setAttribute("role", "button");
    fig.setAttribute("aria-label", `Ampliar foto: ${texto || "trabajo de GusCake"}`);
    const img = document.createElement("img");
    img.src = src;
    img.alt = `${texto} — trabajo de pastelería de GusCake`;
    img.loading = "lazy";
    fig.appendChild(img);
    if (texto) {
      const cap = document.createElement("figcaption");
      cap.textContent = texto;
      fig.appendChild(cap);
    }
    grid.appendChild(fig);
  }

  // Mosaico sin huecos en una grilla de 4 columnas (2 en celular):
  // la primera foto ocupa 2×2 y, si sobran casillas, las últimas fotos se ensanchan (2×1)
  // hasta completar filas enteras. Con 1 foto ocupa todo el ancho; con 2, ambas van 2×2.
  function armarMosaico(figs) {
    const n = figs.length;
    if (n === 1) { figs[0].classList.add("trabajo--completo"); return; }
    if (n === 2) { figs.forEach((f) => f.classList.add("trabajo--grande")); return; }
    figs[0].classList.add("trabajo--grande");
    const sobrantes = (4 - ((n + 3) % 4)) % 4; // casillas que faltan para cerrar la última fila
    for (let k = 0; k < sobrantes; k++) figs[n - 1 - k].classList.add("trabajo--ancho");
  }

  // Visor: al hacer clic (o Enter) en una foto se muestra ampliada.
  function activarVisor(figs) {
    const visor = document.createElement("div");
    visor.className = "trabajo-visor";
    visor.hidden = true;
    visor.innerHTML = `
      <button type="button" class="trabajo-visor-cerrar" aria-label="Cerrar">✕</button>
      <button type="button" class="trabajo-visor-flecha trabajo-visor-flecha--prev" aria-label="Foto anterior">‹</button>
      <figure><img alt=""><figcaption></figcaption></figure>
      <button type="button" class="trabajo-visor-flecha trabajo-visor-flecha--next" aria-label="Foto siguiente">›</button>`;
    document.body.appendChild(visor);
    const img = visor.querySelector("img");
    const cap = visor.querySelector("figcaption");
    let actual = 0;
    const mostrar = (i) => {
      actual = (i + figs.length) % figs.length;
      const origen = figs[actual].querySelector("img");
      img.src = origen.src;
      img.alt = origen.alt;
      cap.textContent = figs[actual].querySelector("figcaption")?.textContent || "";
    };
    const abrir = (i) => {
      mostrar(i);
      visor.hidden = false;
      requestAnimationFrame(() => visor.classList.add("is-abierto"));
      visor.querySelector(".trabajo-visor-cerrar").focus();
    };
    const cerrar = () => {
      visor.classList.remove("is-abierto");
      setTimeout(() => { visor.hidden = true; figs[actual].focus(); }, 300);
    };
    figs.forEach((f, i) => {
      f.addEventListener("click", () => abrir(i));
      f.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); abrir(i); } });
    });
    visor.addEventListener("click", (e) => { if (e.target === visor || e.target.closest(".trabajo-visor-cerrar")) cerrar(); });
    visor.querySelector(".trabajo-visor-flecha--prev").addEventListener("click", () => mostrar(actual - 1));
    visor.querySelector(".trabajo-visor-flecha--next").addEventListener("click", () => mostrar(actual + 1));
    visor.querySelector(".trabajo-visor-flecha--prev").hidden = figs.length < 2;
    visor.querySelector(".trabajo-visor-flecha--next").hidden = figs.length < 2;
    document.addEventListener("keydown", (e) => {
      if (visor.hidden) return;
      if (e.key === "Escape") cerrar();
      if (e.key === "ArrowLeft") mostrar(actual - 1);
      if (e.key === "ArrowRight") mostrar(actual + 1);
    });
  }

  // Entrada en cascada cuando la galería aparece en pantalla.
  function animarEntrada() {
    const mostrar = () => grid.classList.add("is-visible");
    if (!("IntersectionObserver" in window)) { mostrar(); return; }
    const obs = new IntersectionObserver((entradas) => {
      if (entradas.some((e) => e.isIntersecting)) { mostrar(); obs.disconnect(); }
    }, { threshold: 0.15 });
    obs.observe(grid);
  }

  (async () => {
    let huecos = 0;
    let mostradas = 0;
    for (let n = 1; huecos < MAX_HUECOS; n++) {
      const src = await buscar(n);
      if (src) {
        agregar(src, mostradas++);
        huecos = 0;
      } else {
        huecos++;
      }
    }
    if (!mostradas) {
      document.getElementById("trabajos").hidden = true;
      return;
    }
    const figs = [...grid.children];
    armarMosaico(figs);
    activarVisor(figs);
    animarEntrada();
  })();
})();

/* ---------- Cursos en PDF (vista previa de las primeras láminas) ---------- */

(function cargarCursos() {
  const grid = document.getElementById("cursosGrid");
  if (!grid) return;
  const CARPETA = "pdf/curso";

  async function existe(url) {
    try {
      const r = await fetch(url, { method: "HEAD", cache: "no-store" });
      return r.ok && !/text\/html/i.test(r.headers.get("content-type") || "");
    } catch {
      return false;
    }
  }

  function enlaceWhatsApp(n, datos) {
    const texto =
      `Hola GusCake, me interesa el curso "${datos.nombre}" (curso ${n}) ` +
      "que vi en la página de cursos online. ¿Me pueden indicar cómo comprarlo?";
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;
  }

  const ICONO_CANDADO =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10.5" width="14" height="10" rx="2.2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8.5 10.5V7.8a3.5 3.5 0 0 1 7 0v2.7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
  const ICONO_OJO =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12s3.5-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.5 6.5-9.5 6.5S2.5 12 2.5 12z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';

  function crearTarjeta(n) {
    const datos = { nombre: `Curso ${n}`, descripcion: "", precio: "", etiqueta: "", ...(CURSOS[n] || {}) };
    const wa = enlaceWhatsApp(n, datos);
    const card = document.createElement("article");
    card.className = "curso-card";
    card.innerHTML = `
      <div class="curso-preview" aria-roledescription="carrusel" aria-label="Vista previa del curso">
        <div class="curso-laminas">
          <div class="curso-lamina is-activa"><span class="curso-cargando">Cargando vista previa…</span></div>
        </div>
        <span class="curso-etiqueta">${ICONO_OJO}<span>Vista previa</span></span>
        <button type="button" class="curso-flecha curso-flecha--prev" aria-label="Lámina anterior" hidden>‹</button>
        <button type="button" class="curso-flecha curso-flecha--next" aria-label="Lámina siguiente" hidden>›</button>
        <div class="curso-puntos" aria-hidden="true"></div>
      </div>
      <div class="curso-body">
        <p class="curso-meta">Curso ${n} · Documento PDF</p>
        <h3 class="curso-nombre"></h3>
        <p class="curso-desc" hidden></p>
        <p class="curso-precio" hidden></p>
        <a class="btn btn-primary curso-cta" target="_blank" rel="noopener">¡Me interesa!</a>
      </div>`;
    card.querySelector(".curso-nombre").textContent = datos.nombre;
    if (datos.descripcion) {
      const d = card.querySelector(".curso-desc");
      d.textContent = datos.descripcion;
      d.hidden = false;
    }
    if (datos.precio) {
      const p = card.querySelector(".curso-precio");
      p.textContent = datos.precio;
      p.hidden = false;
    }
    card.querySelector(".curso-cta").href = wa;
    card.dataset.wa = wa;
    // Sello destacado en el centro de la vista previa (p. ej. "Preventa").
    if (datos.etiqueta) {
      const sello = document.createElement("span");
      sello.className = "curso-sello-centro";
      sello.textContent = datos.etiqueta;
      card.querySelector(".curso-preview").appendChild(sello);
    }
    // Las láminas no se pueden arrastrar ni abrir con clic derecho.
    const preview = card.querySelector(".curso-preview");
    preview.addEventListener("contextmenu", (e) => e.preventDefault());
    preview.addEventListener("dragstart", (e) => e.preventDefault());
    return card;
  }

  const ICONO_RELOJ =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  // Tarjeta de un curso que aún no se publica: mismo diseño que las demás, con portada "Próximamente".
  function crearProximo(n) {
    const propio = CURSOS[n]?.nombre && CURSOS[n].nombre !== `Curso ${n}` ? CURSOS[n].nombre : "";
    const card = document.createElement("article");
    card.className = "curso-card curso-card--proximo";
    card.innerHTML = `
      <div class="curso-preview">
        <div class="curso-laminas">
          <div class="curso-lamina is-activa">
            <div class="curso-portada-proxima">
              <span class="curso-proxima-icono">${ICONO_RELOJ}</span>
              <span class="curso-proxima-numero">Curso ${n}</span>
              <span class="curso-proxima-texto">Próximamente</span>
              <span class="curso-proxima-linea"></span>
              <span class="curso-proxima-sub">Nuevo curso en preparación</span>
            </div>
          </div>
        </div>
        <span class="curso-etiqueta">${ICONO_RELOJ}<span>Próximamente</span></span>
      </div>
      <div class="curso-body">
        <p class="curso-meta">Curso ${n} · Muy pronto</p>
        <h3 class="curso-nombre"></h3>
        <span class="btn curso-cta curso-cta--proximo" aria-disabled="true">Muy pronto</span>
      </div>`;
    card.querySelector(".curso-nombre").textContent = propio || "Nuevo curso";
    return card;
  }

  // Nombres de curso: se muestran grandes y centrados; si alguno ocupa más de 2 líneas,
  // su letra se achica de a poco hasta caber, así todas las tarjetas quedan parejas.
  function ajustarTitulos() {
    grid.querySelectorAll(".curso-nombre").forEach((h) => {
      h.style.fontSize = "";
      const estilo = getComputedStyle(h);
      let tam = parseFloat(estilo.fontSize);
      const proporcion = (parseFloat(estilo.lineHeight) || tam * 1.15) / tam;
      const texto = document.createRange();
      texto.selectNodeContents(h);
      while (tam > 15 && texto.getBoundingClientRect().height > tam * proporcion * 2 + 2) {
        tam -= 1;
        h.style.fontSize = `${tam}px`;
      }
    });
  }

  // Carrusel: láminas visibles + una última lámina bloqueada que invita a comprar.
  function activarCarrusel(card) {
    const laminas = [...card.querySelectorAll(".curso-lamina")];
    const puntos = card.querySelector(".curso-puntos");
    const prev = card.querySelector(".curso-flecha--prev");
    const next = card.querySelector(".curso-flecha--next");
    let actual = 0;

    puntos.innerHTML = laminas
      .map((l, i) => `<span class="${l.classList.contains("curso-lamina--fin") ? "es-fin" : ""}">${i + 1}</span>`)
      .join("");
    const marcas = [...puntos.children];

    const ir = (i) => {
      actual = Math.max(0, Math.min(laminas.length - 1, i));
      laminas.forEach((l, k) => l.classList.toggle("is-activa", k === actual));
      marcas.forEach((m, k) => m.classList.toggle("is-activa", k === actual));
      prev.hidden = actual === 0;
      next.hidden = actual === laminas.length - 1;
    };
    prev.addEventListener("click", () => ir(actual - 1));
    next.addEventListener("click", () => ir(actual + 1));

    // Deslizar con el dedo en celulares.
    let x0 = null;
    const preview = card.querySelector(".curso-preview");
    preview.addEventListener("pointerdown", (e) => { x0 = e.clientX; });
    preview.addEventListener("pointerup", (e) => {
      if (x0 === null) return;
      const dx = e.clientX - x0;
      x0 = null;
      if (Math.abs(dx) > 40) ir(actual + (dx < 0 ? 1 : -1));
    });
    ir(0);
  }

  // Dibuja solo las primeras láminas del PDF en <canvas>: no se usa el visor del
  // navegador, así que no hay botones de descarga ni acceso al resto de páginas.
  async function dibujarVistaPrevia(pdfjs, url, card) {
    const contenedor = card.querySelector(".curso-laminas");
    const ancho = Math.max(contenedor.clientWidth, 280) * Math.min(window.devicePixelRatio || 1, 2);
    try {
      const doc = await pdfjs.getDocument({ url, isEvalSupported: false }).promise;
      const total = doc.numPages;
      const visibles = Math.min(PAGINAS_VISTA_PREVIA, total);
      const laminas = [];
      for (let i = 1; i <= visibles; i++) {
        const pagina = await doc.getPage(i);
        const base = pagina.getViewport({ scale: 1 });
        const viewport = pagina.getViewport({ scale: ancho / base.width });
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(viewport.width);
        canvas.height = Math.round(viewport.height);
        await pagina.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
        const lamina = document.createElement("div");
        lamina.className = "curso-lamina";
        lamina.appendChild(canvas);
        laminas.push(lamina);
        // La primera lámina se muestra apenas está lista, sin esperar a las demás.
        if (i === 1) {
          lamina.classList.add("is-activa");
          contenedor.replaceChildren(lamina);
        }
      }
      doc.destroy();

      // Lámina final bloqueada.
      const restantes = total - visibles;
      const fin = document.createElement("div");
      fin.className = "curso-lamina curso-lamina--fin";
      fin.innerHTML = `
        <div class="curso-fin">
          <span class="curso-fin-icono">${ICONO_CANDADO}</span>
          <p class="curso-fin-titulo">${restantes > 0 ? "¿Quieres ver el resto?" : "¿Te gustó lo que viste?"}</p>
          <p class="curso-fin-texto">${restantes > 0
            ? `Las otras ${restantes} ${restantes === 1 ? "lámina es exclusiva" : "láminas son exclusivas"} para quienes adquieren el curso.`
            : "El curso completo es exclusivo para quienes lo adquieren."}</p>
          <a class="btn btn-primary" target="_blank" rel="noopener">¡Lo quiero!</a>
        </div>`;
      fin.querySelector("a").href = card.dataset.wa;
      laminas.push(fin);

      contenedor.replaceChildren(...laminas);
      if (total > 1) card.querySelector(".curso-meta").textContent += ` · ${total} láminas`;
      activarCarrusel(card);
    } catch (err) {
      console.error(err);
      contenedor.innerHTML = '<div class="curso-lamina is-activa"><span class="curso-cargando">Vista previa no disponible</span></div>';
    }
  }

  (async () => {
    const encontrados = [];
    let huecos = 0;
    for (let n = 1; huecos < MAX_HUECOS; n++) {
      if (await existe(`${CARPETA}${n}.pdf`)) {
        encontrados.push(n);
        huecos = 0;
      } else {
        huecos++;
      }
    }
    grid.replaceChildren();
    const tarjetas = encontrados.map((n) => {
      const card = crearTarjeta(n);
      grid.appendChild(card);
      return [n, card];
    });
    // Tarjetas "Próximamente" hasta completar TOTAL_TARJETAS_CURSOS.
    const siguiente = (encontrados.at(-1) || 0) + 1;
    const proximos = Math.max(0, TOTAL_TARJETAS_CURSOS - encontrados.length);
    for (let k = 0; k < proximos; k++) grid.appendChild(crearProximo(siguiente + k));
    ajustarTitulos();
    document.fonts?.ready.then(ajustarTitulos); // vuelve a medir cuando carga la tipografía del sitio
    let espera;
    window.addEventListener("resize", () => { clearTimeout(espera); espera = setTimeout(ajustarTitulos, 150); });
    if (!encontrados.length) return;

    let pdfjs;
    try {
      pdfjs = await import("./vendor/pdfjs/pdf.min.mjs");
      pdfjs.GlobalWorkerOptions.workerSrc = new URL("./vendor/pdfjs/pdf.worker.min.mjs", import.meta.url).href;
    } catch (err) {
      console.error(err);
      tarjetas.forEach(([, card]) => {
        card.querySelector(".curso-laminas").innerHTML = '<div class="curso-lamina is-activa"><span class="curso-cargando">Vista previa no disponible</span></div>';
      });
      return;
    }
    for (const [n, card] of tarjetas) await dibujarVistaPrevia(pdfjs, `${CARPETA}${n}.pdf`, card);
  })();
})();
