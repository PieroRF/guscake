/* ==========================================================
   GUS CAKE — Aviso de cookies y consentimiento
   ----------------------------------------------------------
   Google Analytics NO se carga hasta que la persona acepta las
   cookies analíticas (Ley 19.628 y Ley 21.719 de Protección de
   Datos Personales: el tratamiento con fines estadísticos se basa
   en el consentimiento, que debe ser previo, libre, informado y
   revocable en cualquier momento).

   - La elección se guarda en localStorage ("gc_consent_v1") por
     12 meses; después se vuelve a preguntar.
   - Cualquier enlace o botón con el atributo data-cookie-settings
     vuelve a abrir el panel de configuración.
   - Si cambias el ID de Analytics, cámbialo solo aquí (GA_ID).
   - Si agregas otra herramienta que use cookies (Meta Pixel, etc.),
     debe cargarse dentro de applyConsent() y declararse en
     cookies.html.
   ========================================================== */
(function () {
  "use strict";

  var GA_ID = "G-YG5K7YXBCD";
  var STORAGE_KEY = "gc_consent_v1";
  var VALID_DAYS = 365;

  // Ruta base del sitio (sirve igual en la raíz y en las subcarpetas).
  var script = document.currentScript;
  var BASE = script && script.src ? new URL(".", script.src).href : "/";
  var COOKIES_URL = BASE + "cookies.html";

  // ---------- Almacenamiento de la elección ----------
  function readConsent() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      var age = Date.now() - new Date(data.date).getTime();
      if (!(age >= 0) || age > VALID_DAYS * 864e5) return null;
      return data;
    } catch (e) {
      return null;
    }
  }

  function saveConsent(analytics) {
    var data = { analytics: !!analytics, date: new Date().toISOString(), version: 1 };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) { /* sin almacenamiento */ }
    return data;
  }

  // ---------- Google Analytics ----------
  var gaLoaded = false;

  function loadAnalytics() {
    window["ga-disable-" + GA_ID] = false;
    if (gaLoaded) return;
    gaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID);
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
  }

  // Borra las cookies de Analytics (_ga, _ga_XXXX) en todas las variantes de dominio.
  function removeAnalyticsCookies() {
    window["ga-disable-" + GA_ID] = true;
    var host = location.hostname;
    var parts = host.split(".");
    var domains = ["", host, "." + host];
    if (parts.length > 2) domains.push("." + parts.slice(-2).join("."));
    document.cookie.split(";").forEach(function (c) {
      var name = c.split("=")[0].trim();
      if (!/^_ga/.test(name) && name !== "_gid" && name !== "_gat") return;
      domains.forEach(function (d) {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/" + (d ? "; domain=" + d : "");
      });
    });
  }

  function applyConsent(data) {
    if (data && data.analytics) {
      loadAnalytics();
    } else {
      removeAnalyticsCookies();
    }
  }

  // ---------- Interfaz ----------
  var banner, panel, lastFocus;

  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (html != null) n.innerHTML = html;
    return n;
  }

  function buildBanner() {
    banner = el("section", {
      "class": "cookie-banner",
      role: "region",
      "aria-label": "Aviso de cookies"
    },
      '<p class="cookie-banner-text">🍪 Usamos cookies analíticas solo si las aceptas.</p>' +
      '<div class="cookie-banner-actions">' +
        // "Aceptar" y "Rechazar" con el mismo peso visual: la elección debe ser libre.
        // El panel "Configurar" se abre desde la Política de cookies ("Más info").
        '<button type="button" class="cookie-btn cookie-btn--mini" data-cookie-action="accept">Aceptar</button>' +
        '<button type="button" class="cookie-btn cookie-btn--mini" data-cookie-action="reject">Rechazar</button>' +
        '<a class="cookie-banner-more" href="' + COOKIES_URL + '">Más info</a>' +
      '</div>'
    );
    banner.addEventListener("click", function (e) {
      var b = e.target.closest("[data-cookie-action]");
      if (!b) return;
      var action = b.getAttribute("data-cookie-action");
      if (action === "accept") decide(true);
      else if (action === "reject") decide(false);
      else openPanel();
    });
    document.body.appendChild(banner);
  }

  function buildPanel() {
    panel = el("div", { "class": "cookie-modal", hidden: "" },
      '<div class="cookie-modal-card" role="dialog" aria-modal="true" aria-labelledby="cookieModalTitle">' +
        '<button type="button" class="cookie-modal-close" data-cookie-action="close" aria-label="Cerrar">✕</button>' +
        '<p class="cookie-modal-eyebrow">Privacidad</p>' +
        '<h2 class="cookie-modal-title" id="cookieModalTitle">Configuración de cookies</h2>' +
        '<p class="cookie-modal-text">Elige qué permites. Puedes volver a este panel desde el enlace ' +
        '“Política de cookies” al pie de cada página.</p>' +
        '<div class="cookie-option">' +
          '<div><p class="cookie-option-name">Necesarias</p>' +
          '<p class="cookie-option-desc">Recuerdan tu elección de cookies y evitan repetir avisos durante tu visita. ' +
          'No se usan para identificarte ni se comparten. Siempre activas.</p></div>' +
          '<span class="cookie-option-fixed">Siempre activas</span>' +
        '</div>' +
        '<div class="cookie-option">' +
          '<div><p class="cookie-option-name"><label for="cookieAnalytics">Analíticas (Google Analytics)</label></p>' +
          '<p class="cookie-option-desc">Estadísticas anónimas de visitas: páginas vistas, productos agregados a la boleta, ' +
          'dispositivo y ciudad aproximada. Los datos los procesa Google LLC (EE.UU.).</p></div>' +
          '<label class="cookie-switch"><input type="checkbox" id="cookieAnalytics"><span aria-hidden="true"></span></label>' +
        '</div>' +
        '<div class="cookie-modal-actions">' +
          '<button type="button" class="cookie-btn cookie-btn--solid" data-cookie-action="reject">Rechazar todas</button>' +
          '<button type="button" class="cookie-btn cookie-btn--solid" data-cookie-action="save">Guardar selección</button>' +
          '<button type="button" class="cookie-btn cookie-btn--solid" data-cookie-action="accept">Aceptar todas</button>' +
        '</div>' +
        '<p class="cookie-modal-foot"><a href="' + COOKIES_URL + '">Ver Política de cookies</a></p>' +
      '</div>'
    );
    panel.addEventListener("click", function (e) {
      if (e.target === panel || e.target.closest("a[href]")) return closePanel();
      var b = e.target.closest("[data-cookie-action]");
      if (!b) return;
      var action = b.getAttribute("data-cookie-action");
      if (action === "close") closePanel();
      else if (action === "accept") decide(true);
      else if (action === "reject") decide(false);
      else if (action === "save") decide(panel.querySelector("#cookieAnalytics").checked);
    });
    panel.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closePanel();
      if (e.key !== "Tab") return;
      var f = panel.querySelectorAll("button, input, a[href]");
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    document.body.appendChild(panel);
  }

  function openPanel() {
    if (!panel) buildPanel();
    var current = readConsent();
    panel.querySelector("#cookieAnalytics").checked = !!(current && current.analytics);
    lastFocus = document.activeElement;
    panel.hidden = false;
    document.documentElement.classList.add("cookie-modal-open");
    panel.querySelector(".cookie-modal-close").focus();
  }

  function closePanel() {
    if (!panel || panel.hidden) return;
    panel.hidden = true;
    document.documentElement.classList.remove("cookie-modal-open");
    // Devuelve el foco al enlace que abrió la ventana, sin dibujar el recuadro de foco.
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true, focusVisible: false });
  }

  function hideBanner() {
    if (banner) { banner.remove(); banner = null; }
  }

  function decide(analytics) {
    var data = saveConsent(analytics);
    applyConsent(data);
    closePanel();
    hideBanner();
    updateStatus();
  }

  // Texto de estado en la página de cookies (elemento con data-cookie-status).
  function updateStatus() {
    var nodes = document.querySelectorAll("[data-cookie-status]");
    if (!nodes.length) return;
    var c = readConsent();
    var txt = !c ? "Aún no has elegido. Solo se usan las necesarias."
      : c.analytics ? "Aceptaste las cookies analíticas el " + new Date(c.date).toLocaleDateString("es-CL") + "."
      : "Rechazaste las cookies analíticas el " + new Date(c.date).toLocaleDateString("es-CL") + ".";
    for (var i = 0; i < nodes.length; i++) nodes[i].textContent = txt;
  }

  // ---------- Inicio ----------
  var consent = readConsent();
  applyConsent(consent);

  function init() {
    if (!consent) buildBanner();
    updateStatus();
    document.addEventListener("click", function (e) {
      var t = e.target.closest("[data-cookie-settings]");
      if (!t) return;
      e.preventDefault();
      openPanel();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  window.GusCakeCookies = { open: openPanel, refresh: updateStatus };
})();
