/**
 * GusCake — Reporte mensual automático
 * ======================================================================
 * Se pega en la misma planilla de productos (Extensiones → Apps Script).
 * El día 1 de cada mes, a las 9:00, lee Google Analytics del mes anterior y:
 *   1) envía un correo con el resumen, y
 *   2) agrega una pestaña "Reporte AAAA-MM" en la planilla con la tabla completa.
 *
 * Datos que incluye:
 *   - Visitas (personas y sesiones) del mes.
 *   - Productos más agregados al carrito.
 *   - Productos enviados a pedido por WhatsApp (botón "Enviar pedido").
 *
 * Instalación (una sola vez): ver herramientas/LEEME-reporte.txt
 */

// ID NUMÉRICO de la propiedad de Google Analytics 4 (no es el "G-YG5K7YXBCD").
// Se ve en Analytics → Administrar → Configuración de la propiedad → "ID de la propiedad".
const GA4_PROPERTY_ID = "PEGAR_AQUI_EL_ID";

// A quién se envía el reporte. Vacío = al dueño de la planilla.
const REPORT_EMAIL = "";

// Cuántos productos mostrar en cada ranking.
const TOP_N = 10;

// ---------------------------------------------------------------------

/** Ejecuta esta función UNA vez para dejar programado el envío mensual. */
function instalarReporteMensual() {
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === "enviarReporteMensual")
    .forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger("enviarReporteMensual")
    .timeBased()
    .onMonthDay(1)
    .atHour(9)
    .create();
  Logger.log("Listo: el reporte se enviará el día 1 de cada mes a las 9:00.");
}

/** Reporte del mes anterior (lo usa el envío automático). */
function enviarReporteMensual() {
  const hoy = new Date();
  const inicio = new Date(hoy.getFullYear(), hoy.getMonth() - 1, 1);
  const fin = new Date(hoy.getFullYear(), hoy.getMonth(), 0);
  generarReporte_(inicio, fin);
}

/** Para probar ahora mismo: reporte del mes en curso hasta hoy. */
function probarReporteAhora() {
  const hoy = new Date();
  generarReporte_(new Date(hoy.getFullYear(), hoy.getMonth(), 1), hoy);
}

// ---------------------------------------------------------------------

function generarReporte_(inicio, fin) {
  if (!/^\d+$/.test(GA4_PROPERTY_ID)) {
    throw new Error("Falta el ID numérico de la propiedad de Analytics en GA4_PROPERTY_ID.");
  }
  const tz = Session.getScriptTimeZone();
  const fmt = (d) => Utilities.formatDate(d, tz, "yyyy-MM-dd");
  const rango = { startDate: fmt(inicio), endDate: fmt(fin) };
  const nombreMes = Utilities.formatDate(inicio, tz, "MMMM yyyy");

  // Visitas del mes
  const visitas = correr_({ dateRanges: [rango], metrics: [{ name: "activeUsers" }, { name: "sessions" }] });
  const fila = (visitas.rows && visitas.rows[0]) || { metricValues: [{ value: "0" }, { value: "0" }] };
  const personas = Number(fila.metricValues[0].value);
  const sesiones = Number(fila.metricValues[1].value);

  // Productos: agregados al carrito y enviados a pedido por WhatsApp
  const prod = correr_({
    dateRanges: [rango],
    dimensions: [{ name: "itemName" }],
    metrics: [{ name: "itemsAddedToCart" }, { name: "itemsCheckedOut" }],
    orderBys: [{ metric: { metricName: "itemsAddedToCart" }, desc: true }],
    limit: 100,
  });
  const productos = (prod.rows || [])
    .map(r => ({
      nombre: r.dimensionValues[0].value,
      agregados: Number(r.metricValues[0].value),
      pedidos: Number(r.metricValues[1].value),
    }))
    .filter(p => p.nombre && p.nombre !== "(not set)" && (p.agregados || p.pedidos));

  const totalAgregados = productos.reduce((s, p) => s + p.agregados, 0);
  const totalPedidos = productos.reduce((s, p) => s + p.pedidos, 0);
  const topAgregados = productos.slice(0, TOP_N);
  const topPedidos = productos.slice().sort((a, b) => b.pedidos - a.pedidos).filter(p => p.pedidos).slice(0, TOP_N);

  escribirPestana_(nombreMes, inicio, { personas, sesiones, totalAgregados, totalPedidos, productos });
  enviarCorreo_(nombreMes, { personas, sesiones, totalAgregados, totalPedidos, topAgregados, topPedidos });
}

function correr_(request) {
  return AnalyticsData.Properties.runReport(request, "properties/" + GA4_PROPERTY_ID);
}

function escribirPestana_(nombreMes, inicio, d) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const nombre = "Reporte " + Utilities.formatDate(inicio, Session.getScriptTimeZone(), "yyyy-MM");
  const hoja = ss.getSheetByName(nombre) || ss.insertSheet(nombre);
  hoja.clear();
  const filas = [
    ["Reporte GusCake — " + nombreMes, "", ""],
    ["", "", ""],
    ["Personas que visitaron la página", d.personas, ""],
    ["Visitas (sesiones)", d.sesiones, ""],
    ["Productos agregados al carrito", d.totalAgregados, ""],
    ["Productos enviados a pedido por WhatsApp", d.totalPedidos, ""],
    ["", "", ""],
    ["Producto", "Agregados al carrito", "Enviados a pedido"],
  ].concat(d.productos.map(p => [p.nombre, p.agregados, p.pedidos]));
  hoja.getRange(1, 1, filas.length, 3).setValues(filas);
  hoja.getRange(1, 1).setFontSize(14).setFontWeight("bold");
  hoja.getRange(8, 1, 1, 3).setFontWeight("bold").setBackground("#F0D9A0");
  hoja.autoResizeColumns(1, 3);
}

function enviarCorreo_(nombreMes, d) {
  const tabla = (titulo, filas, col1, col2) => filas.length ? `
    <h3 style="margin:24px 0 8px;color:#2E1D14">${titulo}</h3>
    <table style="border-collapse:collapse;width:100%;font-size:14px">
      <tr style="background:#F0D9A0"><th style="text-align:left;padding:6px 10px">#</th><th style="text-align:left;padding:6px 10px">${col1}</th><th style="text-align:right;padding:6px 10px">${col2}</th></tr>
      ${filas.map((f, i) => `<tr style="border-bottom:1px solid #eee"><td style="padding:6px 10px">${i + 1}</td><td style="padding:6px 10px">${f[0]}</td><td style="text-align:right;padding:6px 10px"><b>${f[1]}</b></td></tr>`).join("")}
    </table>` : "";
  const dato = (n, t) => `<td style="padding:12px;text-align:center;background:#FFFCF2;border:1px solid #E4CD90;border-radius:8px"><div style="font-size:24px;font-weight:bold;color:#993D18">${n}</div><div style="font-size:12px;color:#4F3D2C">${t}</div></td>`;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;color:#2E1D14">
      <h2 style="margin:0 0 4px">🍰 Reporte GusCake</h2>
      <p style="margin:0 0 16px;color:#4F3D2C">${nombreMes}</p>
      <table style="width:100%;border-spacing:8px"><tr>
        ${dato(d.personas, "personas visitaron")}
        ${dato(d.totalAgregados, "agregados al carrito")}
        ${dato(d.totalPedidos, "enviados a WhatsApp")}
      </tr></table>
      ${tabla("🏆 Más agregados al carrito", d.topAgregados.map(p => [p.nombre, p.agregados]), "Producto", "Veces")}
      ${tabla("📲 Más enviados a pedido por WhatsApp", d.topPedidos.map(p => [p.nombre, p.pedidos]), "Producto", "Unidades")}
      ${!d.topAgregados.length ? `<p style="margin-top:20px">Este mes no se registraron productos agregados al carrito.</p>` : ""}
      <p style="margin-top:24px;font-size:12px;color:#888">La tabla completa quedó en la pestaña de reporte de tu planilla. Visitas totales (sesiones): ${d.sesiones}.</p>
    </div>`;

  MailApp.sendEmail({
    to: REPORT_EMAIL || Session.getEffectiveUser().getEmail(),
    subject: "📊 Reporte GusCake — " + nombreMes,
    htmlBody: html,
  });
}
