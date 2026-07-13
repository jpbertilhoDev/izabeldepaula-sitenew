/* ============================================================
   IZABEL DE PAULA — SEO: o stock que o Google lê é o stock REAL
   ------------------------------------------------------------
   O JSON-LD da homepage foi escrito à mão e traz "availability":
   "InStock" fixo nos 12 produtos. O stock, esse, muda todos os dias.
   Resultado: declarávamos disponíveis produtos há muito esgotados —
   rich results a mandar gente para uma página com "ESGOTADO", e o
   Merchant Center a marcar incompatibilidade de disponibilidade
   (motivo clássico de suspensão de conta).

   Aqui corrigimos o JSON-LD com a verdade de window.PRODUCTS — o mesmo
   catálogo que o live-stock.js já sincroniza com o Shopify. É o padrão
   que a página de produto (product.js → applySEO) já usava; a home é que
   tinha ficado para trás.

   Duas redes de segurança, porque o Googlebot nem sempre executa o JS:
   1. o JSON-LD estático no HTML fica correto à data do deploy;
   2. este script corrige-o em runtime, e outra vez quando o estoque ao
      vivo chega ('izb:stock').
   ============================================================ */
(function () {
  'use strict';

  var IN = 'https://schema.org/InStock';
  var OUT = 'https://schema.org/OutOfStock';

  /* o bloco do JSON-LD que lista os produtos (pode haver outros: Organization, FAQ…) */
  function findGraph() {
    var nodes = document.querySelectorAll('script[type="application/ld+json"]');
    for (var i = 0; i < nodes.length; i++) {
      var data;
      try { data = JSON.parse(nodes[i].textContent); } catch (e) { continue; }
      var graph = data['@graph'] || [data];
      for (var j = 0; j < graph.length; j++) {
        if (graph[j] && graph[j]['@type'] === 'ItemList' && graph[j].itemListElement) {
          return { node: nodes[i], data: data, list: graph[j] };
        }
      }
    }
    return null;
  }

  function slugOf(url) {
    var m = /[?&]produto=([^&#]+)/.exec(String(url || ''));
    return m ? decodeURIComponent(m[1]) : null;
  }

  function sync() {
    var products = window.PRODUCTS || [];
    if (!products.length) return;

    var found = findGraph();
    if (!found) return;

    var bySlug = {};
    products.forEach(function (p) { if (p.slug) bySlug[p.slug] = p; });

    var changed = 0;
    found.list.itemListElement.forEach(function (li) {
      var item = li && li.item;
      if (!item || !item.offers) return;

      var p = bySlug[slugOf(item.url || item['@id'])];
      if (!p) return;

      var truth = (p.available === false) ? OUT : IN;
      if (item.offers.availability !== truth) { item.offers.availability = truth; changed++; }
      if (p.price != null && item.offers.price !== p.price) { item.offers.price = p.price; changed++; }
    });

    if (changed) found.node.textContent = JSON.stringify(found.data);
  }

  sync();                                          // snapshot do data.js
  document.addEventListener('izb:stock', sync);    // e outra vez com o estoque ao vivo do Shopify

})();
