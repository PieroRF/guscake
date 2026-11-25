/* ==========================================================
   DECORACIÓN NAVIDEÑA (temporal)
   - Se activa sola entre las fechas de abajo; fuera de ellas no hace nada.
   - Para quitarla antes: borra las dos líneas de navidad.css y navidad.js
     en index.html (o cambia NAVIDAD_HASTA a una fecha pasada).
   ========================================================== */
(function () {
  const NAVIDAD_DESDE = new Date(2026, 10, 1);          // 1 de noviembre 2026
  const NAVIDAD_HASTA = new Date(2027, 0, 1, 23, 59, 59); // 1 de enero 2027, fin del día: desde el 2 de enero el sitio vuelve a la normalidad
  const hoy = new Date();
  if (hoy < NAVIDAD_DESDE || hoy > NAVIDAD_HASTA) return;

  document.documentElement.classList.add("navidad");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function init() {
    // ---------- Guirnalda de luces bajo la barra superior ----------
    const topbar = document.querySelector(".topbar");
    if (topbar && !topbar.querySelector(".navidad-luces")) {
      const luces = document.createElement("div");
      luces.className = "navidad-luces";
      luces.setAttribute("aria-hidden", "true");
      luces.innerHTML = "<span></span>".repeat(36);
      topbar.appendChild(luces);
    }

    // ---------- Gorro navideño sobre el logo ----------
    const sello = document.querySelector(".brand-sello");
    if (sello && !sello.querySelector(".navidad-gorro")) {
      const gorro = document.createElement("span");
      gorro.className = "navidad-gorro";
      gorro.setAttribute("aria-hidden", "true");
      sello.appendChild(gorro);
    }

    // ---------- Letrero de neón "¡Feliz Navidad!" en la portada ----------
    // Paño verde pino con borde de bastón de caramelo y el título en luz
    // cálida, que se enciende parpadeando al bajar. Arriba una estrella que
    // titila, abajo dos esferas que se balancean y a los lados dos árboles
    // de Navidad con regalos.
    const hero = document.querySelector(".hero");
    if (hero && !hero.querySelector(".navidad-letrero")) {
      const letrero = document.createElement("div");
      letrero.className = "navidad-letrero";
      letrero.setAttribute("role", "note");
      // cada letra va en su propio span: la ola de luz y el "zumbido" del neón
      const letras = [..."¡Feliz Navidad!"]
        .map((l, i) => `<span class="l" style="--i:${i}" aria-hidden="true">${l}</span>`).join("");
      // tira de luces de colores en el borde inferior, encendiéndose en secuencia
      const focos = Array.from({ length: 16 }, (_, k) => `<i style="--k:${k}"></i>`).join("");
      letrero.innerHTML = `
        <div class="navidad-letrero-swing">
          <span class="navidad-cuerda navidad-cuerda--izq" aria-hidden="true"></span>
          <span class="navidad-cuerda navidad-cuerda--der" aria-hidden="true"></span>
          <div class="navidad-letrero-cartel">
            <span class="navidad-brillo" aria-hidden="true"></span>
            <span class="navidad-estrella" aria-hidden="true"></span>
            <i class="navidad-destello" style="--x:21%;--y:24%;--d:0s" aria-hidden="true"></i>
            <i class="navidad-destello" style="--x:80%;--y:30%;--d:-1.4s" aria-hidden="true"></i>
            <i class="navidad-destello" style="--x:63%;--y:66%;--d:-2.7s" aria-hidden="true"></i>
            <div class="navidad-letrero-textos">
              <strong class="navidad-letrero-titulo"><span class="navidad-sr">¡Feliz Navidad!</span>${letras}</strong>
              <span class="navidad-letrero-firma">Te desea GusCake</span>
            </div>
            <span class="navidad-bola navidad-bola--izq" aria-hidden="true"><i></i></span>
            <span class="navidad-bola navidad-bola--der" aria-hidden="true"><i></i></span>
            <span class="navidad-arbol navidad-arbol--izq" aria-hidden="true"></span>
            <span class="navidad-base" aria-hidden="true"></span>
            <span class="navidad-arbol navidad-arbol--der" aria-hidden="true"></span>
            <span class="navidad-focos" aria-hidden="true">${focos}</span>
          </div>
        </div>`;
      hero.appendChild(letrero);
      // Santa en su trineo con renos, cruzando la portada cada cierto tiempo
      if (!reduceMotion) {
        const trineo = document.createElement("div");
        trineo.className = "navidad-trineo";
        trineo.setAttribute("aria-hidden", "true");
        trineo.innerHTML = "<span></span>";
        hero.appendChild(trineo);
      }
    }

    // ---------- Detalles puntuales ----------
    // Crea un adorno (span vacío decorativo) dentro de un elemento, una sola vez.
    function adorno(selector, clase, alInicio) {
      const el = document.querySelector(selector);
      if (!el || el.querySelector("." + clase)) return null;
      const s = document.createElement("span");
      s.className = clase;
      s.setAttribute("aria-hidden", "true");
      alInicio ? el.insertBefore(s, el.firstChild) : el.appendChild(s);
      return s;
    }
    adorno(".vitrina", "navidad-guirnalda", true);        // guirnalda de pino sobre la vitrina
    adorno(".hero-showcase", "navidad-acebo-foto");        // acebo en la esquina de la foto
    adorno(".whatsapp-float", "navidad-gorrito");          // gorrito en el botón de WhatsApp
    adorno(".footer", "navidad-nieve-suelo", true);        // nieve acumulada sobre el pie de página
    const copy = document.querySelector(".footer-copy");
    if (copy && !document.querySelector(".navidad-saludo")) {
      const saludo = document.createElement("p");
      saludo.className = "navidad-saludo";
      saludo.textContent = "GusCake les desea felices fiestas";
      copy.insertAdjacentElement("afterend", saludo);
    }

    if (!reduceMotion) nieve();
  }

  // ---------- Nieve cayendo (canvas, no bloquea clics) ----------
  // Tres tipos de copo: puntos suaves, cristales de 6 puntas y cristales
  // ramificados. Cada copo tiene una "profundidad" (z): los lejanos son
  // pequeños, difusos y lentos; los cercanos, grandes, nítidos y rápidos.
  // Un viento suave con ráfagas los empuja a todos, más a los cercanos.
  // Los dibujos se pre-renderizan una sola vez (sprites) para que sea liviano.
  function nieve() {
    const canvas = document.createElement("canvas");
    canvas.className = "navidad-nieve";
    canvas.setAttribute("aria-hidden", "true");
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    let w = 0, h = 0, copos = [], dpr = 1, anim = null, last = 0, tiempo = 0;
    const raton = { x: -9999, y: -9999 };

    // --- Sprites ---
    const SPR = 64; // tamaño del sprite en px (se escala al dibujar)
    function sprite(dibujar, desenfoque) {
      const c = document.createElement("canvas");
      c.width = c.height = SPR;
      const g = c.getContext("2d");
      g.translate(SPR / 2, SPR / 2);
      if (desenfoque) g.filter = `blur(${desenfoque}px)`;
      // contorno azulado muy suave: los copos se ven también sobre fondos crema
      g.shadowColor = "rgba(70, 95, 140, 0.55)";
      g.shadowBlur = 4;
      dibujar(g);
      return c;
    }
    const punto = (g) => {
      const grad = g.createRadialGradient(0, 0, 0, 0, 0, 26);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.5, "rgba(255,255,255,0.9)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = grad;
      g.beginPath(); g.arc(0, 0, 26, 0, Math.PI * 2); g.fill();
    };
    const cristal = (ramificado) => (g) => {
      g.strokeStyle = "#fff";
      g.lineCap = "round";
      const R = 24;
      for (let i = 0; i < 6; i++) {
        g.save();
        g.rotate((Math.PI / 3) * i);
        g.lineWidth = 2.6;
        g.beginPath(); g.moveTo(0, 0); g.lineTo(0, -R); g.stroke();
        g.lineWidth = 2;
        const ramas = ramificado ? [0.38, 0.62, 0.82] : [0.55];
        ramas.forEach((p, k) => {
          const largo = (ramificado ? [8, 7, 4][k] : 7);
          g.beginPath();
          g.moveTo(0, -R * p); g.lineTo(-largo, -R * p - largo);
          g.moveTo(0, -R * p); g.lineTo(largo, -R * p - largo);
          g.stroke();
        });
        g.restore();
      }
      g.fillStyle = "#fff";
      g.beginPath(); g.arc(0, 0, 3.2, 0, Math.PI * 2); g.fill();
    };
    const SPRITES = {
      punto: [sprite(punto, 0), sprite(punto, 2)],
      cristal: [sprite(cristal(false), 0), sprite(cristal(false), 1.6)],
      ramificado: [sprite(cristal(true), 0), sprite(cristal(true), 1.6)],
    };

    function crear(alInicio, zFijo) {
      // más copos lejanos que cercanos; al reciclar un copo conserva su z
      const z = zFijo !== undefined ? zFijo : Math.pow(Math.random(), 1.6);
      const r = Math.random();
      const tipo = r < 0.6 ? "punto" : r < 0.85 ? "cristal" : "ramificado";
      const base = tipo === "punto" ? 3 + z * 7 : 9 + z * 15;  // diámetro en px
      return {
        tipo,
        img: SPRITES[tipo][z < 0.35 ? 1 : 0],    // los lejanos usan el sprite difuso
        z,
        s: base,
        x: Math.random() * w,
        y: alInicio ? Math.random() * h : -base - Math.random() * 40,
        vy: 14 + z * 46,                          // px por segundo
        osc: Math.random() * Math.PI * 2,
        oscV: 0.5 + Math.random() * 0.9,
        amp: 6 + Math.random() * 18,
        rot: Math.random() * Math.PI * 2,
        rotV: (Math.random() - 0.5) * (tipo === "punto" ? 0 : 1.4),
        o: 0.35 + z * 0.6,
        px: 0,                                    // empujón del ratón
      };
    }
    function medir() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const total = Math.round(Math.min(110, Math.max(35, w / 13)));
      while (copos.length < total) copos.push(crear(true));
      copos.length = total;
      // los cercanos se dibujan al final, encima de los lejanos
      copos.sort((a, b) => a.z - b.z);
    }
    // viento: mezcla de ondas lentas que de vez en cuando forman una ráfaga
    function viento(t) {
      const suave = Math.sin(t * 0.13) * 14 + Math.sin(t * 0.31 + 1.7) * 8;
      const rafaga = Math.max(0, Math.sin(t * 0.07 + 0.5)) ** 6 * 38;
      return suave + rafaga;
    }
    function frame(t) {
      const dt = Math.min((t - (last || t)) / 1000, 0.05);
      last = t;
      tiempo += dt;
      const v = viento(tiempo);
      ctx.clearRect(0, 0, w, h);
      for (const c of copos) {
        c.y += c.vy * dt;
        c.osc += c.oscV * dt;
        c.rot += c.rotV * dt;
        c.x += v * (0.4 + c.z) * dt;
        // el ratón aparta suavemente los copos cercanos
        const dx = c.x - raton.x, dy = c.y - raton.y, d2 = dx * dx + dy * dy;
        if (d2 < 10000) c.px += (dx / Math.sqrt(d2 || 1)) * (1 - d2 / 10000) * 160 * c.z * dt;
        c.px *= 1 - Math.min(1, 1.5 * dt);
        if (c.y > h + c.s) Object.assign(c, crear(false, c.z));
        if (c.x < -40) c.x += w + 80; else if (c.x > w + 40) c.x -= w + 80;
        const x = c.x + Math.sin(c.osc) * c.amp + c.px;
        ctx.globalAlpha = c.o;
        if (c.rotV) {
          ctx.save();
          ctx.translate(x, c.y);
          ctx.rotate(c.rot);
          ctx.drawImage(c.img, -c.s / 2, -c.s / 2, c.s, c.s);
          ctx.restore();
        } else {
          ctx.drawImage(c.img, x - c.s / 2, c.y - c.s / 2, c.s, c.s);
        }
      }
      ctx.globalAlpha = 1;
      anim = requestAnimationFrame(frame);
    }
    medir();
    window.addEventListener("resize", medir);
    window.addEventListener("pointermove", (e) => {
      if (e.pointerType === "mouse") { raton.x = e.clientX; raton.y = e.clientY; }
    }, { passive: true });
    document.addEventListener("pointerleave", () => { raton.x = raton.y = -9999; });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) { cancelAnimationFrame(anim); anim = null; }
      else if (!anim) { last = 0; anim = requestAnimationFrame(frame); }
    });
    anim = requestAnimationFrame(frame);
  }

  // ---------- Pantalla de bienvenida (splash) en modo Navidad ----------
  // Un gorro navideño cae sobre el logo, nieve suave, brillos rojo y verde
  // en el fondo y "Feliz Navidad" bajo el logo. El splash solo aparece la
  // primera vez de cada visita; si ya se vio, aquí no se hace nada.
  function splashNavidad() {
    const splash = document.getElementById("splash");
    const logo = splash && splash.querySelector(".splash-logo");
    if (!logo || splash.querySelector(".navidad-splash-logo")) return;

    // Tiempo que ya lleva el splash: los adornos arrancan con un retraso
    // negativo igual, para quedar sincronizados con el desvanecimiento.
    let t = 0;
    try {
      const a = logo.getAnimations()[0];
      if (a && a.currentTime) t = Math.round(a.currentTime);
    } catch (_) { /* navegador sin Web Animations: se parte de 0 */ }
    splash.style.setProperty("--nv-t", `-${t}ms`);

    // El logo y su gorro van juntos en un envoltorio que hace la animación
    // del logo (acercarse y desvanecerse), así el gorro crece con él.
    const wrap = document.createElement("span");
    wrap.className = "navidad-splash-logo";
    logo.parentNode.insertBefore(wrap, logo);
    wrap.appendChild(logo);
    const gorro = document.createElement("span");
    gorro.className = "navidad-splash-gorro";
    wrap.appendChild(gorro);

    const texto = document.createElement("p");
    texto.className = "navidad-splash-texto";
    texto.textContent = "Feliz Navidad";
    splash.appendChild(texto);

    if (!reduceMotion) {
      // Copos con posiciones fijas (no aleatorias): siempre se ve igual de parejo.
      const copos = Array.from({ length: 28 }, (_, i) =>
        `<i style="--x:${(i * 37 + 11) % 100}%;--s:${2 + (i * 7) % 4}px;` +
        `--t:${(2.4 + ((i * 13) % 20) / 10).toFixed(1)}s;--d:-${(((i * 29) % 30) / 10).toFixed(1)}s;` +
        `--w:${((i % 5) - 2) * 12}px"></i>`).join("");
      const nieve = document.createElement("div");
      nieve.className = "navidad-splash-nieve";
      nieve.innerHTML = copos;
      splash.insertBefore(nieve, splash.firstChild);
    }
  }
  // El splash ya está en la página cuando corre este archivo: se decora de
  // inmediato, sin esperar al resto de los adornos.
  splashNavidad();

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
