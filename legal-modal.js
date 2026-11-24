/* ==========================================================
   GUS CAKE — Ventanas emergentes de información legal
   ----------------------------------------------------------
   Los enlaces a terminos.html, privacidad.html y cookies.html se abren
   en una ventana emergente sobre la página, sin salir del sitio.

   - El contenido se lee de las propias páginas legales (su <article
     class="legal-doc">), así hay un solo texto que mantener: para
     cambiar un texto legal, edita terminos.html, privacidad.html o
     cookies.html.
   - Un enlace con #seccion (ej. "terminos.html#cursos") abre la
     ventana desplazada a esa sección.
   - Si la carga falla (por ejemplo, sin conexión), el enlace funciona
     como un enlace normal.
   ========================================================== */
(function () {
  "use strict";

  var script = document.currentScript;
  var BASE = script && script.src ? new URL(".", script.src).href : "/";
  var PAGES = /\/(terminos|privacidad|cookies)\.html$/;

  var cache = {};
  var modal, card, body, titleEl, metaEl, lastFocus;
  var cssLoaded = false;

  // Los estilos del contenido legal viven en legal.css: se cargan
  // solo la primera vez que se abre una ventana.
  function ensureCss() {
    if (cssLoaded || document.querySelector('link[href$="legal.css"]')) { cssLoaded = true; return; }
    var l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = BASE + "legal.css";
    document.head.appendChild(l);
    cssLoaded = true;
  }

  function build() {
    modal = document.createElement("div");
    modal.className = "legal-modal";
    modal.hidden = true;
    modal.innerHTML =
      '<div class="legal-modal-card" role="dialog" aria-modal="true" aria-labelledby="legalModalTitle">' +
        '<header class="legal-modal-head">' +
          '<div>' +
            '<p class="legal-modal-eyebrow">Información legal</p>' +
            '<h2 class="legal-modal-title" id="legalModalTitle"></h2>' +
            '<p class="legal-modal-meta"></p>' +
          '</div>' +
          '<button type="button" class="legal-modal-close" aria-label="Cerrar">✕</button>' +
        '</header>' +
        '<div class="legal-modal-body" tabindex="-1"></div>' +
        '<footer class="legal-modal-foot">' +
          '<button type="button" class="btn btn-primary legal-modal-ok">Cerrar</button>' +
        '</footer>' +
      '</div>';
    card = modal.querySelector(".legal-modal-card");
    body = modal.querySelector(".legal-modal-body");
    titleEl = modal.querySelector(".legal-modal-title");
    metaEl = modal.querySelector(".legal-modal-meta");

    modal.addEventListener("click", function (e) {
      if (e.target === modal || e.target.closest(".legal-modal-close, .legal-modal-ok")) close();    });
    modal.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { close(); return; }
      if (e.key !== "Tab") return;
      var f = card.querySelectorAll('a[href], button:not([disabled]), input, select, textarea');
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    // Enlaces internos (#seccion) dentro de la ventana: desplazan el contenido.
    body.addEventListener("click", function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var target = body.querySelector(a.getAttribute("href"));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: "smooth", block: "start" }); }
    });
    document.body.appendChild(modal);
  }

  function show() {
    if (!modal) build();
    if (modal.hidden) lastFocus = document.activeElement;
    modal.hidden = false;
    document.documentElement.classList.add("legal-modal-open");
    modal.querySelector(".legal-modal-close").focus();
  }

  function close() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.documentElement.classList.remove("legal-modal-open");
    // Devuelve el foco al enlace que abrió la ventana, sin dibujar el recuadro de foco.
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true, focusVisible: false });
  }

  // ---------- Documentos legales ----------
  function load(url) {
    if (cache[url]) return Promise.resolve(cache[url]);
    return fetch(url, { headers: { Accept: "text/html" } })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, "text/html");
        var article = doc.querySelector("article.legal-doc");
        if (!article) throw new Error("sin contenido");
        var h1 = doc.querySelector(".legal-hero h1");
        var meta = doc.querySelector(".legal-meta");
        cache[url] = {
          title: h1 ? h1.textContent.trim() : "Información legal",
          meta: meta ? meta.textContent.trim() : "",
          html: article.innerHTML
        };
        return cache[url];
      });
  }

  function openDoc(href) {
    var url = new URL(href, location.href);
    var hash = url.hash.replace("#", "");
    ensureCss();

    return load(url.href.split("#")[0]).then(function (data) {
      show();
      titleEl.textContent = data.title;
      metaEl.textContent = data.meta;
      metaEl.hidden = !data.meta;

      var doc = document.createElement("div");
      doc.className = "legal-doc legal-doc--modal";
      doc.innerHTML = data.html;
      // Evita ids duplicados con la página de fondo (las secciones se conservan
      // para poder saltar a ellas dentro de la ventana).
      doc.querySelectorAll("[id]").forEach(function (n) {
        if (n.tagName !== "SECTION") n.removeAttribute("id");
      });
      body.innerHTML = "";
      body.appendChild(doc);
      // Muestra la elección de cookies actual en la Política de cookies.
      if (window.GusCakeCookies && window.GusCakeCookies.refresh) window.GusCakeCookies.refresh();

      body.scrollTop = 0;
      if (hash) {
        var target = body.querySelector("#" + CSS.escape(hash));
        if (target) target.scrollIntoView({ block: "start" });
      }
    });
  }

  // ---------- Interceptar enlaces ----------
  // Fase de captura: se adelanta a la transición animada entre páginas
  // (script.js), que escucha cada enlace y navegaría de todas formas.
  document.addEventListener("click", function (e) {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest("a[href]");
    if (!a || a.closest(".legal-tabs")) return;

    var url;
    try { url = new URL(a.getAttribute("href"), location.href); } catch (_) { return; }
    if (url.origin !== location.origin || !PAGES.test(url.pathname)) return;

    e.preventDefault();
    e.stopPropagation();
    openDoc(url.href).catch(function () { location.href = url.href; });
  }, true);

  window.GusCakeLegal = { open: openDoc, close: close };
})();
