/* ==========================================================
   GUS CAKE — Reseñas de nuestra comunidad
   ----------------------------------------------------------
   Aquí se agregan, cambian o quitan las reseñas que aparecen en la
   sección "Reseñas de nuestra comunidad" de la página de inicio.
   No hace falta tocar el HTML, el CSS ni script.js.

   CÓMO AGREGAR UNA RESEÑA
   1. Copia un bloque { ... }, completo con sus llaves y la coma final.
   2. Pégalo dentro de la lista (entre los corchetes [ ]).
   3. Cambia los datos:
        autor: el nombre de usuario tal como aparece en la red social.
        red:   "instagram" o "tiktok" (en minúsculas).
        texto: el comentario, copiado tal cual (puede llevar emojis).
        link:  opcional, la URL de la publicación; si no hay, deja "".
   4. Guarda el archivo y súbelo (git push). Vercel publica solo.

   CONSEJOS
   - Usa siempre comillas dobles " ". Si el texto lleva comillas
     dobles adentro, escríbelas así: \"
   - Intercala TikTok e Instagram para que no se vean agrupadas.
   - Solo reseñas reales: no inventes comentarios.
   - Si la lista queda vacía, la página muestra un aviso de
     "muy pronto" en vez de la sección.
   ========================================================== */

const TESTIMONIOS = [
  {
    autor: "@fadich_zc",
    red: "tiktok",
    texto: "Los mejoresss",
    link: "",
  },
  {
    autor: "@bbecitaboni",
    red: "instagram",
    texto: "Amooo",
    link: "",
  },
  {
    autor: "@sandrafe151",
    red: "tiktok",
    texto: "Exquisito y de calidad los productos hechos con amor lo recomiendo 💯💯💯💯 es confiable y responsable.",
    link: "",
  },
  {
    autor: "@maxilr_12",
    red: "instagram",
    texto: "El mejor pie de limon de conce 🙌🔥",
    link: "https://www.instagram.com/p/DgEKnmqh3JV/",
  },
  {
    autor: "@danidi1312",
    red: "tiktok",
    texto: "hay amoooo el pie de limón 💖 se ve delicioso 🤭",
    link: "",
  },
  {
    autor: "@cotralchile",
    red: "instagram",
    texto: "Que delicia 💜🙌🏻",
    link: "",
  },
  {
    autor: "@sofiacarvajal661",
    red: "tiktok",
    texto: "nooo, me muero 🤤🤤, se me antojaron las cocadas se ven 10 de 10",
    link: "",
  },
  {
    autor: "@flancita.a",
    red: "instagram",
    texto: "Amé!",
    link: "",
  },
  {
    autor: "@leandro_alexis_",
    red: "tiktok",
    texto: "Qué rico se veeeee",
    link: "",
  },
  {
    autor: "@paolapazfotografa",
    red: "instagram",
    texto: "👏👏👏 me encanta tu trabajo",
    link: "",
  },
    {
    autor: "@jriquelme1309",
    red: "tiktok",
    texto: "100% Recomendado.. Los mejores de Conce...",
    link: "",
  },
    {
    autor: "@verantcosmeticartesanal",
    red: "instagram",
    texto: "Asi me encantan,galleta delgada y harto relleno ❤️con un cafecito",
    link: "https://www.instagram.com/p/DgBFtntB6QB/",
  },
    {
    autor: "@joseluisriquelmemonsalv0",
    red: "tiktok",
    texto: "Está torta es diferente pero es muy rica,mis amigos quedaron muy felices en mi cumpleaños con la torta amor",
    link: "https://www.tiktok.com/@gustaavojrf/video/7324491986906516741",
  },
    {
    autor: "@monica_fritschn",
    red: "instagram",
    texto: "Qué exquisito! Y tan linda la presentacion!!!!",
    link: "https://www.instagram.com/p/DfvUA7gBkei/",
  },
  // Ejemplo (bórrale las // del comienzo de cada línea para usarlo):
  // {
  //   autor: "Nombre tal como aparece en la red social",
  //   red: "instagram",  // o "tiktok"
  //   texto: "El comentario o reseña, copiado tal cual.",
  //   link: "https://www.instagram.com/p/xxxxxxx/", // opcional: URL de la publicación
  // },
];
