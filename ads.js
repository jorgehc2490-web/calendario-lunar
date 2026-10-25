// Publicidad del Calendario Lunar: rotan las promos de las redes de LABMET
// junto al hueco de patrocinador disponible (como en las demás apps).
// - data-adslot="sponsor": siempre para el patrocinador directo / promos.
// - data-adslot="google": promos mientras no haya ID de editor de AdSense
//   (window.CL_ADS.client); al configurarlo (tras la aprobación), pasa a Google.
(function () {
  var st = document.createElement("style");
  st.textContent =
    '[data-adslot="sponsor"]{max-width:1120px;margin:12px auto 0;padding:0 16px;box-sizing:border-box}' +
    '[data-adslot="google"]{margin:20px 0 4px}' +
    '.adbox{display:flex;align-items:center;gap:10px;justify-content:center;text-align:left;' +
    'background:rgba(229,184,75,.08);border:1px solid rgba(229,184,75,.28);border-radius:14px;padding:10px 14px;' +
    'font-family:Manrope,system-ui,sans-serif;color:#f4f1e9}' +
    '.adbox .adico{display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:9px;color:#fff;font-weight:800;flex:0 0 auto}' +
    '.adbox .admarca{font-weight:800;font-size:.92rem}' +
    '.adbox .adsub{opacity:.82;font-size:.85rem;margin-left:2px}' +
    '.adbox a.adlink{display:flex;align-items:center;gap:10px;color:inherit;text-decoration:none}' +
    '@media (prefers-color-scheme:light){.adbox{color:#17201d}}' +
    '.pieLabmet{margin:26px 0 8px;padding:16px 6px 4px;border-top:1px solid rgba(229,184,75,.22);' +
    'font-size:.85rem;opacity:.85;text-align:center;line-height:1.7}' +
    '.pieLabmet a{color:inherit;font-weight:700}';
  document.head.appendChild(st);

  var PROMOS = [
    { nom: "SU MARCA AQUÍ", txt: "Espacio publicitario disponible · Escríbenos: labmet22@gmail.com", url: "", ico: "★", col: "#b8860b" },
    { nom: "LABMET · YouTube", txt: "@labmet · 94,9 mil suscriptores — huracanes y pronóstico del tiempo", url: "https://www.youtube.com/@labmet", ico: "▶", col: "#c4302b" },
    { nom: "Meteorólogo Jorge F Hernández · TikTok", txt: "@jorgefelixmeteorologo · 233,7 mil seguidores", url: "https://www.tiktok.com/@jorgefelixmeteorologo", ico: "♪", col: "#111111" },
    { nom: "Jorge Felix Hernández · Instagram", txt: "@jorgefelix_met · 126 mil seguidores", url: "https://www.instagram.com/jorgefelix_met", ico: "◎", col: "#c13584" },
    { nom: "Meteorólogo Jorge Félix Hernández · Facebook", txt: "Síguenos en Facebook para el pronóstico diario", url: "", ico: "f", col: "#1877f2" },
    { nom: "Weather Latino USA · YouTube", txt: "@WeatherLatinoUSA · El tiempo para los hispanos en EE. UU.", url: "https://www.youtube.com/@WeatherLatinoUSA", ico: "▶", col: "#c4302b" },
    { nom: "Clima y Tiempo MX · YouTube", txt: "@ClimayTiempoMX · 12,1 mil suscriptores — el pronóstico para México", url: "https://www.youtube.com/@ClimayTiempoMX", ico: "▶", col: "#c4302b" }
  ];
  function paintPromo(box, p) {
    var inner = '<span class="adico" style="background:' + p.col + '">' + p.ico + '</span>' +
      '<span><span class="admarca">' + p.nom + '</span><span class="adsub">' + p.txt + '</span></span>';
    box.innerHTML = '<div class="adbox">' + (p.url
      ? '<a class="adlink" href="' + p.url + '" target="_blank" rel="noopener">' + inner + '</a>'
      : inner) + '</div>';
  }
  var sponsorBox = document.querySelector('[data-adslot="sponsor"]');
  var googleBox = document.querySelector('[data-adslot="google"]');
  var idx = 0;
  function paintAll() {
    if (sponsorBox) paintPromo(sponsorBox, PROMOS[idx % PROMOS.length]);
    if (googleBox && !window.__clAdsenseOn) paintPromo(googleBox, PROMOS[(idx + 3) % PROMOS.length]);
  }
  paintAll();
  setInterval(function () { idx++; paintAll(); }, 9000);

  var cfg = window.CL_ADS || {};
  if (!cfg.client || !googleBox) return;
  window.__clAdsenseOn = true;
  var s = document.createElement("script");
  s.async = true;
  s.crossOrigin = "anonymous";
  s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + encodeURIComponent(cfg.client);
  document.head.appendChild(s);
  googleBox.innerHTML = "";
  var ins = document.createElement("ins");
  ins.className = "adsbygoogle";
  ins.style.display = "block";
  ins.setAttribute("data-ad-client", cfg.client);
  if (cfg.slotMid) ins.setAttribute("data-ad-slot", cfg.slotMid);
  ins.setAttribute("data-ad-format", "auto");
  ins.setAttribute("data-full-width-responsive", "true");
  googleBox.appendChild(ins);
  (window.adsbygoogle = window.adsbygoogle || []).push({});
})();
