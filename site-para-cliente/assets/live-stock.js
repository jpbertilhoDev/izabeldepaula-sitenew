/* ============================================================
   IZABEL DE PAULA — camada de ESTOQUE AO VIVO
   ------------------------------------------------------------
   Corrige window.PRODUCTS (disponibilidade + preço) com os dados
   REAIS da loja Shopify, em tempo de execução, para a vitrine nunca
   mostrar como disponível algo que já esgotou — nem um preço antigo.

   • Fonte: {storeUrl}/products.json  (público; CORS aberto: allow-origin *)
   • Casa por variant id (o mesmo que já vive no data.js) → faz patch.
   • Dispara o evento 'izb:stock' para o cart.js/product.js re-renderizarem.
   • Falha em silêncio: se a rede falhar, mantém o snapshot do data.js
     (que continua a ser a rede de segurança, atualizada pela automação).

   Nota: a LOJA Shopify (store.izabeldepaula.com) já é dinâmica de raiz —
   esta camada existe para a VITRINE estática (index.html / produto.html).
   ============================================================ */
(function () {
  'use strict';

  var SHOP = window.SHOP || {};
  var PRODUCTS = window.PRODUCTS || [];
  if (!PRODUCTS.length) return;

  var STORE = String(SHOP.storeUrl || 'https://store.izabeldepaula.com').replace(/\/+$/, '');
  var CACHE_KEY = 'izb_live_stock';
  var TTL = 3 * 60 * 1000; // 3 min: fresco, mas evita bater no endpoint a cada clique

  // índice variant id (string) -> produto do nosso catálogo
  var byVariant = {};
  PRODUCTS.forEach(function (p) { if (p.variant) byVariant[String(p.variant)] = p; });
  if (!Object.keys(byVariant).length) return; // catálogo sem variantes Shopify: nada a sincronizar

  /* aplica um mapa {variantId -> {available, price, compareAt}} a window.PRODUCTS */
  function applyLive(map) {
    var changed = 0;
    Object.keys(byVariant).forEach(function (vid) {
      var p = byVariant[vid];
      var live = map[vid];
      if (!live) {
        // variante não veio na resposta viva → saiu de catálogo / despublicada → tratar como indisponível
        if (p.available !== false) { p.available = false; changed++; }
        return;
      }
      if (typeof live.available === 'boolean' && p.available !== live.available) { p.available = live.available; changed++; }
      if (live.price != null && !isNaN(live.price) && p.price !== live.price) { p.price = live.price; changed++; }
      var ca = (live.compareAt != null && !isNaN(live.compareAt) && live.compareAt > live.price) ? live.compareAt : null;
      if (p.compareAt !== ca) { p.compareAt = ca; changed++; }
    });
    if (changed) {
      try { document.dispatchEvent(new CustomEvent('izb:stock')); }
      catch (e) { var ev = document.createEvent('Event'); ev.initEvent('izb:stock', true, true); document.dispatchEvent(ev); }
    }
  }

  /* extrai o mapa de variantes de uma resposta /products.json */
  function buildMap(products) {
    var map = {};
    (products || []).forEach(function (pr) {
      (pr.variants || []).forEach(function (v) {
        map[String(v.id)] = {
          available: !!v.available,
          price: v.price != null ? parseFloat(v.price) : null,
          compareAt: v.compare_at_price != null ? parseFloat(v.compare_at_price) : null
        };
      });
    });
    return map;
  }

  /* cache de sessão (navegação entre páginas não volta a bater na rede) */
  function fromCache() {
    try {
      var o = JSON.parse(sessionStorage.getItem(CACHE_KEY) || 'null');
      if (!o || (Date.now() - o.t) > TTL) return null;
      return o.map;
    } catch (e) { return null; }
  }
  function toCache(map) {
    try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), map: map })); } catch (e) {}
  }

  /* busca uma página do /products.json */
  function fetchPage(page) {
    var url = STORE + '/products.json?limit=250' + (page > 1 ? ('&page=' + page) : '');
    var ctrl = ('AbortController' in window) ? new AbortController() : null;
    var to = ctrl ? setTimeout(function () { ctrl.abort(); }, 6000) : null;
    return fetch(url, { signal: ctrl ? ctrl.signal : undefined, credentials: 'omit', cache: 'no-store' })
      .then(function (r) { if (to) clearTimeout(to); return r.ok ? r.json() : Promise.reject(r.status); });
  }

  function refreshFromNetwork() {
    fetchPage(1)
      .then(function (data) {
        var map = buildMap(data.products);
        // catálogo grande: se a 1.ª página veio cheia, funde a 2.ª (a loja tem ~2 dezenas, mas robusto)
        if (data.products && data.products.length === 250) {
          return fetchPage(2).then(function (d2) { Object.assign(map, buildMap(d2.products)); return map; })
            .catch(function () { return map; });
        }
        return map;
      })
      .then(function (map) { toCache(map); applyLive(map); })
      .catch(function () { /* silêncio: mantém o snapshot do data.js */ });
  }

  // 1) cache primeiro → correção quase instantânea entre páginas
  var cached = fromCache();
  if (cached) applyLive(cached);
  // 2) rede a seguir → dados frescos, sem bloquear o first paint (a vitrine já renderizou do snapshot)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', refreshFromNetwork);
  } else {
    setTimeout(refreshFromNetwork, 0);
  }
})();
