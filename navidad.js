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
      letrero.innerHTML = `
        <div class="navidad-letrero-swing">
          <span class="navidad-cuerda navidad-cuerda--izq" aria-hidden="true"></span>
          <span class="navidad-cuerda navidad-cuerda--der" aria-hidden="true"></span>
          <div class="navidad-letrero-cartel">
            <span class="navidad-acebo navidad-acebo--izq" aria-hidden="true"></span>
            <span class="navidad-acebo navidad-acebo--der" aria-hidden="true"></span>
            <strong class="navidad-letrero-titulo">¡Feliz Navidad!</strong>
            <span class="navidad-letrero-sub">Endulza estas fiestas con GusCake</span>
            <i class="navidad-destello" style="--x:8%;--y:18%;--d:0s" aria-hidden="true"></i>
            <i class="navidad-destello" style="--x:90%;--y:26%;--d:-0.9s" aria-hidden="true"></i>
            <i class="navidad-destello" style="--x:78%;--y:80%;--d:-1.7s" aria-hidden="true"></i>
            <i class="navidad-destello" style="--x:18%;--y:84%;--d:-2.4s" aria-hidden="true"></i>
          </div>
          <span class="navidad-esfera navidad-esfera--izq" aria-hidden="true"></span>
          <span class="navidad-esfera navidad-esfera--der" aria-hidden="true"></span>
        </div>`;
      hero.appendChild(letrero);
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

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
