/* ============================================================
   IZABEL DE PAULA — Shopify bootstrap
   Junta os metadados curados (window.THEME_META) com os dados vivos
   do Shopify (window.SHOPIFY_LIVE) -> window.PRODUCTS, no mesmo formato
   que o front-end (cart.js / product.js / proof.js / content.js) já usa.
   ============================================================ */
(function () {
  'use strict';
  var META = window.THEME_META || [];
  var LIVE = window.SHOPIFY_LIVE || {};
  // prefixo do CDN de assets do tema (de product-data.liquid) — para as fotos curadas
  var ASSETS = (window.SHOP && window.SHOP.assets) || '';

  window.PRODUCTS = META.map(function (m) {
    var l = LIVE[m.handle] || {};
    // fotos curadas (no tema, via SHOP.assets) têm prioridade sobre as imagens vivas do Shopify
    var curatedImg = m.imgFile ? (ASSETS + m.imgFile) : '';
    var curatedGallery = (m.galleryFiles || []).map(function (g) { return { full: ASSETS + g.full, thumb: ASSETS + g.thumb }; });
    var liveMedia = (l.media && l.media.length) ? l.media : (l.img ? [l.img] : []);
    var liveGallery = liveMedia.map(function (u) { return { full: u, thumb: u }; });
    return {
      slug: m.slug,
      handle: m.handle,
      name: m.name,
      cat: m.cat,
      catLabel: m.catLabel,
      vol: m.vol,
      rating: m.rating,
      badges: m.badges || [],
      bestseller: m.bestseller,
      bsRank: m.bsRank,
      exp: m.exp,
      short: m.short,
      blurb: m.blurb || '',
      d2: m.d2,
      d3: m.d3,
      price: (l.price != null) ? l.price : 0,
      compareAt: (l.compareAt != null) ? l.compareAt : null,
      variant: l.variant || null,
      available: (l.available !== false),
      img: curatedImg || l.img || '',
      gallery: curatedGallery.length ? curatedGallery : liveGallery,
      productUrl: l.url || ('/products/' + m.handle)
    };
  }).filter(function (p) {
    // só produtos que existem na loja (têm variante viva)
    return p.variant;
  });

  // aviso amigável em dev se algum produto curado não foi encontrado na loja
  if (window.PRODUCTS.length < META.length && window.console) {
    var found = {};
    window.PRODUCTS.forEach(function (p) { found[p.handle] = 1; });
    var missing = META.filter(function (m) { return !found[m.handle]; }).map(function (m) { return m.handle; });
    console.warn('[IZB] produtos não encontrados na loja (verificar handles):', missing);
  }
})();
