/* ============================================================
   IZABEL DE PAULA — página de produto (produto.html?produto=<slug>)
   Renderiza a partir de window.PRODUCTS via window.IZB.
   ============================================================ */
(function () {
  'use strict';
  var IZB = window.IZB;
  var root = document.getElementById('pdp');
  if (!IZB || !root) return;

  // Shopify: a URL é /products/{handle}; o template injeta window.IZB_HANDLE.
  // Fallback ?produto=<slug> mantido para preview/local.
  var ROOT = (IZB.SHOP && IZB.SHOP.routes && IZB.SHOP.routes.root) || '/';
  var SHOPU = IZB.shopUrl ? IZB.shopUrl() : '/collections/all';
  var slug = new URLSearchParams(location.search).get('produto');
  var p = (slug && IZB.bySlug(slug)) || (window.IZB_HANDLE && IZB.byHandle ? IZB.byHandle(window.IZB_HANDLE) : null);

  if (!p) {
    // Se já existe conteúdo server-side (Shopify renderou o produto), mantém-no —
    // assim crawlers e utilizadores sem JS continuam a ver a página real.
    if (!root.querySelector('.pdp-title')) {
      root.innerHTML = '<div class="wrap pdp-missing"><span class="kicker">Ops</span>'
        + '<h1 class="h-sec">Produto não encontrado</h1>'
        + '<p class="lead">O produto que procura não existe ou saiu de catálogo.</p>'
        + '<a class="btn btn--ink" href="' + SHOPU + '">Ver a coleção</a></div>';
    }
    return;
  }

  var esc = IZB.esc, money = IZB.money;
  document.title = p.name + ' · Izabel de Paula — Loja oficial';
  var md = document.querySelector('meta[name="description"]');
  if (md) md.setAttribute('content', p.short);

  var d = IZB.discount(p);
  var priceBlock = (p.compareAt && p.compareAt > p.price ? '<span class="pdp-was">' + money(p.compareAt) + '</span>' : '')
    + '<span class="pdp-now">' + money(p.price) + '</span>'
    + (d ? '<span class="pdp-off">-' + d + '%</span>' : '');

  var tags = '';
  (p.badges || []).forEach(function (b) { tags += '<span class="tag ' + (b.cls || '') + '">' + esc(b.t) + '</span>'; });
  if (d) tags += '<span class="tag sale">-' + d + '%</span>';

  var LOCK = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" style="vertical-align:-2px"><rect x="4" y="10" width="16" height="11" rx="1.5"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>';
  var WA = '<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Z"/></svg>';
  var BUY_LABEL = p.variant ? (LOCK + ' Comprar agora<span class="btn-sub"> · pagamento seguro</span>') : (WA + ' Comprar agora<span class="btn-sub"> pelo WhatsApp</span>');

  /* opções de quantidade pré-definidas: 1 (cheio) · 2 (−5%) · 3 (−10%) */
  var TIERS = [
    { units: 1, off: 0,    note: 'Preço normal',  tag: '' },
    { units: 2, off: 0.05, note: 'Poupe 5%',      tag: '−5%' },
    { units: 3, off: 0.10, note: 'Poupe 10%',     tag: '−10% · melhor valor' }
  ];
  function unitInfo(t) {
    // mesma fórmula do carrinho (IZB.lineTotal/tierRate) — evita qualquer divergência
    return { total: IZB.lineTotal(p, t.units), showOff: IZB.tierRate(t.units, p) > 0 };
  }
  var unitsHTML = '<div class="pdp-units" data-pdp-units role="group" aria-label="Escolha a quantidade">'
    + TIERS.map(function (t) {
        var u = unitInfo(t);
        return '<button type="button" class="pdp-unit' + (t.units === 1 ? ' active' : '') + '" data-units="' + t.units + '" aria-pressed="' + (t.units === 1) + '">'
          + (u.showOff ? '<span class="u-tag">' + t.tag + '</span>' : '')
          + '<span class="u-q">' + t.units + (t.units > 1 ? ' unidades' : ' unidade') + '</span>'
          + '<span class="u-price">' + money(u.total) + '</span>'
          + '<span class="u-note">' + (u.showOff ? t.note : 'Preço normal') + '</span>'
          + '</button>';
      }).join('')
    + '</div>'
    + (p.d2 ? '<p class="pdp-units-note">Desconto de 2 e 3 unidades aplicado automaticamente no checkout.</p>' : '');

  /* galeria: foto limpa + slides do carrossel (coluna de miniaturas à esquerda) */
  var gal = (p.gallery && p.gallery.length) ? p.gallery : [{ full: p.img, thumb: p.img }];
  var thumbsHTML = gal.length > 1 ? '<div class="pdp-thumbs">' + gal.map(function (it, i) {
    return '<button class="pdp-thumb' + (i === 0 ? ' active' : '') + '" type="button" data-gallery="' + it.full
      + '" aria-label="Ver imagem ' + (i + 1) + '"><img src="' + it.thumb + '" alt="' + esc(p.name) + ' — imagem ' + (i + 1)
      + '" loading="lazy" width="70" height="70"></button>';
  }).join('') + '</div>' : '';

  root.innerHTML =
    '<div class="wrap">'
    + '<nav class="breadcrumb"><a href="' + ROOT + '">Início</a><span>/</span>'
    + '<a href="' + SHOPU + '">Loja</a><span>/</span><b>' + esc(p.name) + '</b></nav>'
    + '<div class="pdp-wrap">'
    + '<div class="pdp-gallery">' + thumbsHTML
    + '<div class="pdp-main">'
    + (tags ? '<div class="pdp-tags">' + tags + '</div>' : '')
    + '<img src="' + gal[0].full + '" alt="' + esc(p.name) + '" data-gallery-main fetchpriority="high"></div>'
    + '</div>'
    + '<div class="pdp-info">'
    + '<span class="pdp-cat">' + esc(p.catLabel) + '</span>'
    + '<h1 class="pdp-title">' + esc(p.name) + '</h1>'
    + '<div class="pdp-rating"><span class="stars">★★★★★</span><span class="pdp-rate-n">' + esc(p.rating) + '</span><span class="pdp-rate-tx">· avaliação das clientes</span></div>'
    + '<p class="pdp-short">' + esc(p.short) + '</p>'
    + '<div class="pdp-price">' + priceBlock + '</div>'
    + '<div class="pdp-vol">' + esc(p.vol) + '</div>'
    + unitsHTML
    + '<div class="pdp-actions">'
    + '<button class="btn btn--ink btn--block pdp-add" type="button" data-pdp-add>Adicionar à sacola</button>'
    + '</div>'
    + '<button class="btn btn--gold btn--block pdp-buy" type="button" data-pdp-buy>' + BUY_LABEL + '</button>'
    + '<ul class="pdp-trust"><li>Envio para toda a Europa</li><li>Portes grátis acima de ' + money(IZB.SHOP.freeShip) + (IZB.SHOP.freeShipNote ? ' · ' + IZB.SHOP.freeShipNote : '') + '</li><li>Pagamento seguro</li><li>Garantia de 15 dias</li></ul>'
    + (window.IZBCONTENT ? '<div class="pdp-desc pdp-desc--col">' + window.IZBCONTENT.fullDescriptionHTML(p) + '</div>' : '')
    + '</div></div>'
    + (window.IZBPROOF ? window.IZBPROOF.pdpBlockHTML(p) : '')
    // Avaliações ocultas por enquanto (decisão do cliente). Para reativar, descomente:
    // + (window.IZBREVIEWS ? window.IZBREVIEWS.pdpReviewsHTML(p) : '')
    + '</div>';

  /* ---------- seleção de unidades (1 · 2 · 3) + ações ---------- */
  var qty = 1;
  var unitBtns = root.querySelectorAll('[data-pdp-units] .pdp-unit');
  function selectUnits(n) {
    qty = Math.max(1, n);
    unitBtns.forEach(function (b) {
      var on = parseInt(b.getAttribute('data-units'), 10) === qty;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }
  unitBtns.forEach(function (b) {
    b.addEventListener('click', function () { selectUnits(parseInt(b.getAttribute('data-units'), 10)); });
  });
  root.querySelector('[data-pdp-add]').addEventListener('click', function () { IZB.add(p.slug, qty); });
  root.querySelector('[data-pdp-buy]').addEventListener('click', function (e) {
    e.preventDefault();
    if (p.variant) { window.location.href = IZB.buyUrl(p, qty); return; }
    var msg = 'Olá! Tenho interesse no produto:\n\n' + qty + '× ' + p.name + ' — ' + money(p.price * qty)
      + '\n\nPode ajudar-me a finalizar a compra?';
    window.open('https://wa.me/' + IZB.SHOP.whatsapp + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
  });

  /* ---------- WhatsApp de dúvidas: contextualiza a mensagem com o produto ---------- */
  var waMsg = 'Olá Izabel, vendo o site, tenho uma dúvida sobre ' + p.name + '.';
  var waHref = 'https://wa.me/' + IZB.SHOP.whatsapp + '?text=' + encodeURIComponent(waMsg);
  document.querySelectorAll('a[href*="wa.me"]').forEach(function (a) {
    a.setAttribute('href', waHref);
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener');
  });

  /* ---------- galeria: trocar imagem principal ao clicar na miniatura ---------- */
  var gMain = root.querySelector('[data-gallery-main]');
  var gThumbs = root.querySelectorAll('[data-gallery]');
  gThumbs.forEach(function (t) {
    t.addEventListener('click', function () {
      if (gMain) gMain.src = t.getAttribute('data-gallery');
      gThumbs.forEach(function (x) { x.classList.remove('active'); });
      t.classList.add('active');
    });
  });

  /* ---------- relacionados (mesma categoria) ---------- */
  var related = IZB.PRODUCTS.filter(function (x) { return x.cat === p.cat && x.slug !== p.slug; }).slice(0, 6);
  if (related.length < 3) {
    IZB.PRODUCTS.forEach(function (x) { if (x.slug !== p.slug && related.indexOf(x) === -1 && related.length < 6) related.push(x); });
  }
  var rel = document.querySelector('[data-related]');
  if (rel) rel.innerHTML = related.map(IZB.cardHTML).join('');
})();
