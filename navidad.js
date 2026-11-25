/* ==========================================================
   DECORACIÓN NAVIDEÑA (temporal)
   - Se activa sola entre las fechas de abajo; fuera de ellas no hace nada.
   - Para quitarla antes: borra las dos líneas de navidad.css y navidad.js
     en index.html (o cambia NAVIDAD_HASTA a una fecha pasada).
   ========================================================== */
(function () {
  const NAVIDAD_DESDE = new Date(2026, 10, 1);          // 1 de noviembre 2026
  const NAVIDAD_HASTA = new Date(2027, 0, 6, 23, 59);   // 6 de enero 2027
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

    // ---------- Letrero colgante "Feliz Navidad" en la portada ----------
    // Baja desde la guirnalda, rebota y queda balanceándose suavemente.
    const hero = document.querySelector(".hero");
    if (hero && !hero.querySelector(".navidad-letrero")) {
      const letrero = document.createElement("div");
      letrero.className = "navidad-letrero";
      letrero.setAttribute("role", "note");
      // cada letra del título va en su propio span para la ola de luz
      const letras = [..."¡Feliz Navidad!"]
        .map((l, i) => `<span class="l" style="--i:${i}" aria-hidden="true">${l}</span>`).join("");
      letrero.innerHTML = `
        <div class="navidad-letrero-swing">
          <span class="navidad-cuerda navidad-cuerda--izq" aria-hidden="true"></span>
          <span class="navidad-cuerda navidad-cuerda--der" aria-hidden="true"></span>
          <div class="navidad-letrero-cartel">
            <span class="navidad-brillo" aria-hidden="true"></span>
            <span class="navidad-marco" aria-hidden="true"></span>
            <span class="navidad-mono" aria-hidden="true"></span>
            <span class="navidad-acebo navidad-acebo--izq" aria-hidden="true"></span>
            <span class="navidad-acebo navidad-acebo--der" aria-hidden="true"></span>
            <strong class="navidad-letrero-titulo"><span class="navidad-sr">¡Feliz Navidad!</span>${letras}</strong>
            <i class="navidad-destello" style="--x:12%;--y:22%;--d:0s" aria-hidden="true"></i>
            <i class="navidad-destello" style="--x:86%;--y:28%;--d:-0.9s" aria-hidden="true"></i>
            <i class="navidad-destello" style="--x:76%;--y:70%;--d:-1.7s" aria-hidden="true"></i>
            <i class="navidad-destello" style="--x:22%;--y:72%;--d:-2.4s" aria-hidden="true"></i>
          </div>
          <span class="navidad-cinta-sub">Endulza estas fiestas con GusCake</span>
        </div>`;
      hero.appendChild(letrero);
      ampolletas(letrero.querySelector(".navidad-letrero-cartel"));
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

  // ---------- Borde de ampolletas del letrero ----------
  // Reparte las ampolletas a lo largo del borde del cartel, siguiendo las
  // esquinas redondeadas. Se recalcula si el cartel cambia de tamaño
  // (al cargar la tipografía o al girar el celular).
  function ampolletas(cartel) {
    if (!cartel) return;
    const marco = cartel.querySelector(".navidad-marco");
    const INSET = 7, PASO = 14;
    function dibujar() {
      // clientWidth/Height = área dentro del borde dorado (donde se ubica el marco)
      const w = cartel.clientWidth, h = cartel.clientHeight;
      if (!w || !h) return;
      const r = Math.min(10, h / 2 - INSET);           // radio de las esquinas
      const x0 = INSET, y0 = INSET, x1 = w - INSET, y1 = h - INSET;
      const rectos = [(x1 - x0 - 2 * r), (y1 - y0 - 2 * r)];
      const perimetro = 2 * rectos[0] + 2 * rectos[1] + 2 * Math.PI * r;
      const n = Math.max(12, Math.round(perimetro / PASO / 2) * 2); // número par: la secuencia alterna bien
      // punto a una distancia d del recorrido (sentido horario desde arriba a la izquierda)
      function punto(d) {
        const tramos = [
          { l: rectos[0], f: (t) => [x0 + r + t, y0] },
          { l: Math.PI * r / 2, f: (t) => { const a = -Math.PI / 2 + t / r; return [x1 - r + r * Math.cos(a), y0 + r + r * Math.sin(a)]; } },
          { l: rectos[1], f: (t) => [x1, y0 + r + t] },
          { l: Math.PI * r / 2, f: (t) => { const a = t / r; return [x1 - r + r * Math.cos(a), y1 - r + r * Math.sin(a)]; } },
          { l: rectos[0], f: (t) => [x1 - r - t, y1] },
          { l: Math.PI * r / 2, f: (t) => { const a = Math.PI / 2 + t / r; return [x0 + r + r * Math.cos(a), y1 - r + r * Math.sin(a)]; } },
          { l: rectos[1], f: (t) => [x0, y1 - r - t] },
          { l: Math.PI * r / 2, f: (t) => { const a = Math.PI + t / r; return [x0 + r + r * Math.cos(a), y0 + r + r * Math.sin(a)]; } },
        ];
        for (const tr of tramos) {
          if (d <= tr.l) return tr.f(d);
          d -= tr.l;
        }
        return [x0 + r, y0];
      }
      let html = "";
      for (let i = 0; i < n; i++) {
        const [x, y] = punto((perimetro / n) * i);
        html += `<i style="left:${x.toFixed(1)}px;top:${y.toFixed(1)}px"></i>`;
      }
      marco.innerHTML = html;
    }
    dibujar();
    if ("ResizeObserver" in window) new ResizeObserver(dibujar).observe(cartel);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(dibujar);
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
