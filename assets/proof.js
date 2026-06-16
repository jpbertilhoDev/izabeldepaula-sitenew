/* ============================================================
   IZABEL DE PAULA — Prova social: Antes/Depois + selos de autoridade
   Redação em conformidade UE (cosméticos): só claims de aspecto/firmeza/
   leveza/celulite/pele mais lisa. Sem claims médicos ou de emagrecimento.
   Imagens: clientes reais, partilhadas com consentimento.
   ============================================================ */
(function () {
  'use strict';
  var IZB = window.IZB || {};
  var esc = IZB.esc || function (s) { return String(s == null ? '' : s); };

  var PROOF = {
    beforeAfter: [
      { img: 'images/resultados/ba-1.jpg', caption: 'Coxas e glúteos com aspecto mais firme e pele mais lisa.', dur: '≈ 6 semanas de uso contínuo', product: 'leg-fit-express' },
      { img: 'images/resultados/ba-2.jpg', caption: 'Abdómen com sensação de leveza e aspecto mais liso após rotina contínua.', dur: '≈ 8 semanas de uso contínuo', product: 'creme-barriga-fit' },
      { img: 'images/resultados/ba-3.jpg', caption: 'Glúteos com aspecto mais firme e textura de pele mais uniforme.', dur: '≈ 6 semanas de uso contínuo', product: 'levanta-bumbum' },
      { img: 'images/resultados/ba-4.jpg', caption: 'Pernas com sensação de leveza e contorno mais firme.', dur: '≈ 8 semanas de uso contínuo', product: 'leg-fit-express' },
      { img: 'images/resultados/ba-5.jpg', caption: 'Barriga com aspecto mais liso e redução da sensação de inchaço.', dur: '≈ 8 semanas de uso contínuo', product: 'creme-barriga-fit' },
      { img: 'images/resultados/ba-6.jpg', caption: 'Firmeza e melhora no aspecto da celulite na zona dos glúteos.', dur: '≈ 6 semanas de uso contínuo', product: 'levanta-bumbum' }
    ],
    awards: [
      { name: 'Prémio Máxima', sub: 'Beleza & Perfumes' },
      { name: 'Honoris Causa', sub: 'Distinção' },
      { name: 'Forbes', sub: 'Destaque' },
      { name: 'Gold Star', sub: 'Excelência' },
      { name: 'Livro de Reclamações', sub: 'Portugal' }
    ]
  };

  var SEAL = '<svg viewBox="0 0 24 24"><circle cx="12" cy="10" r="5.2"/><path d="M9.4 14.3 7.5 21l4.5-2.6L16.5 21l-1.9-6.7"/><path d="m12 7.2 1 2 2.2.2-1.7 1.5.5 2.2L12 12.1l-2 1.2.5-2.2L8.8 9.6l2.2-.2z"/></svg>';
  var DISCLAIMER = '<p class="proof-disclaimer">Resultados podem variar de pessoa para pessoa. Imagens de clientes reais, partilhadas com consentimento.</p>';

  function awardsChips() {
    return '<img class="seals-strip" src="images/selos-premios.png" alt="Prémios e distinções da marca: Outorga Honoris Causa, Prémio Mérito Nacional, Corpo Cuidados Específicos, Serviço Estrela, Top Mind e Prémio Gold Star" loading="lazy">'
      + '<img class="seals-livro" src="images/livro-reclamacoes.png" alt="Livro de Reclamações" loading="lazy">';
  }

  function baCardHTML(item, link) {
    var inner =
      '<div class="ba-media"><img src="' + item.img + '" alt="Antes e depois — cliente real Izabel de Paula" loading="lazy"></div>'
      + '<div class="ba-body"><p class="ba-caption">' + esc(item.caption) + '</p>'
      + '<div class="ba-meta"><span class="ba-dur">' + esc(item.dur) + '</span><span class="ba-client">Cliente verificada ✓</span></div></div>';
    if (link && item.product) {
      var p = IZB.bySlug ? IZB.bySlug(item.product) : null;
      var href = 'produto.html?produto=' + encodeURIComponent(item.product);
      return '<a class="ba-card ba-card--link" href="' + href + '" data-reveal>' + inner
        + '<span class="ba-shop">Ver ' + (p ? esc(p.name) : 'produto') + ' &rarr;</span></a>';
    }
    return '<article class="ba-card" data-reveal>' + inner + '</article>';
  }

  function railHTML(cards, extraClass) {
    return '<div class="rail rail--ba ' + (extraClass || '') + '" data-rail data-reveal>'
      + '<button class="rail-arrow prev" data-prev aria-label="Anterior"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></button>'
      + '<button class="rail-arrow next" data-next aria-label="Próximo"><svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg></button>'
      + '<div class="rail-track">' + cards + '</div></div>';
  }

  // Bloco da página de produto: até 3 pares relevantes à categoria + selos + CTA
  function pdpItems(p) {
    var order = { creme: [0, 2, 3], capsula: [1, 4, 0], kit: [2, 3, 5] };
    var idx = (p && order[p.cat]) || [0, 1, 2];
    return idx.map(function (i) { return PROOF.beforeAfter[i]; });
  }
  function pdpBlockHTML(p) {
    var cards = pdpItems(p).map(function (it) { return baCardHTML(it, false); }).join('');
    return '<section class="pdp-proof" aria-label="Antes e depois de clientes reais">'
      + '<div class="proof-head"><span class="kicker">Provas reais</span>'
      + '<h2 class="proof-title">Resultados <span class="it gold">reais</span> de clientes.</h2></div>'
      + '<div class="awards">' + awardsChips() + '</div>'
      + railHTML(cards)
      + '<div class="proof-cta"><p>Sente que pode ser para si? Comece a sua rotina com a <b>' + esc(p.name) + '</b>.</p>'
      + '<button class="btn btn--ink" type="button" data-add="' + esc(p.slug) + '">Adicionar à sacola</button></div>'
      + DISCLAIMER + '</section>';
  }

  window.IZBPROOF = { data: PROOF, awardsChips: awardsChips, baCardHTML: baCardHTML, pdpBlockHTML: pdpBlockHTML };

  /* init da home (síncrono — os contentores acima já estão parseados) */
  var aw = document.querySelector('[data-awards]');
  if (aw) aw.innerHTML = awardsChips();
  var res = document.querySelector('[data-resultados]');
  if (res) res.innerHTML = PROOF.beforeAfter.map(function (it) { return baCardHTML(it, true); }).join('');
})();
