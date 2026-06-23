/* ============================================================
   IZABEL DE PAULA — LOJA · shop core + carrinho
   Catálogo: window.PRODUCTS / window.SHOP (bootstrap.js).
   CARRINHO: nativo do Shopify via AJAX (/cart/add.js, /cart.js, /cart/change.js).
   A gaveta lateral espelha o carrinho REAL da loja (estoque/preço do Shopify).
   Descontos por quantidade (2un −5% / 3un +): exibidos no cliente (tier) e aplicados
   no checkout via cupão EXISTENTE (carrinho de 1 produto) ou WhatsApp (misto c/ desconto).
   NÃO usa descontos automáticos — o sistema de cupões do cliente é mantido como está.
   ============================================================ */
(function () {
  'use strict';
  var PRODUCTS = window.PRODUCTS || [];
  var SHOP = window.SHOP || { whatsapp: '', email: '', freeShip: 100, currency: '€', storeUrl: '' };
  var WA_SVG = '<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Z"/></svg>';
  var LOCK_SVG = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" style="vertical-align:-2px"><rect x="4" y="10" width="16" height="11" rx="1.5"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>';

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function money(n) { return '€' + Number(n).toFixed(2).replace('.', ','); }
  function discount(p) {
    if (!p.compareAt || p.compareAt <= p.price) return null;
    return Math.round((1 - p.price / p.compareAt) * 100);
  }
  // desconto por quantidade do MESMO produto: 2 un → −5%, 3+ un → −10%.
  // espelha o seletor de unidades da PDP e o cupão aplicado no checkout.
  function tierRate(qty, p) {
    if (qty >= 3 && p.d3) return 0.10;
    if (qty === 2 && p.d2) return 0.05;
    return 0;
  }
  function lineTotal(p, qty) { return p.price * qty * (1 - tierRate(qty, p)); }
  function bySlug(slug) { for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].slug === slug) return PRODUCTS[i]; return null; }
  function byHandle(h) { for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].handle === h) return PRODUCTS[i]; return null; }
  function byVariant(vid) { for (var i = 0; i < PRODUCTS.length; i++) if (String(PRODUCTS[i].variant) === String(vid)) return PRODUCTS[i]; return null; }
  // Shopify: a página de produto é /products/{handle}. productUrl vem do Liquid (bootstrap.js).
  function url(p) { return p.productUrl || ('/products/' + (p.handle || p.slug)); }
  function shopUrl() { return (SHOP.routes && SHOP.routes.allProducts) || '/collections/all'; }

  /* ---------- card markup (vitrines da home) — inalterado ---------- */
  function badgesHTML(p) {
    var html = '';
    (p.badges || []).forEach(function (b) { html += '<span class="tag ' + (b.cls || '') + '">' + esc(b.t) + '</span>'; });
    var d = discount(p);
    if (d) html += '<span class="tag sale">-' + d + '%</span>';
    return html ? '<div class="tags">' + html + '</div>' : '';
  }
  function priceHTML(p) {
    if (!p.price) return '<div class="price"><span class="now price-na">Sob consulta</span></div>';
    var s = '';
    if (p.compareAt && p.compareAt > p.price) s += '<span class="was">' + money(p.compareAt) + '</span><br>';
    s += '<span class="now">' + money(p.price) + '</span>';
    return '<div class="price">' + s + '</div>';
  }
  function cardHTML(p) {
    var u = url(p);
    var sold = p.available === false;
    var addBtn = sold
      ? '<span class="add add--sold" aria-disabled="true">Esgotado</span>'
      : '<button class="add" type="button" data-add="' + esc(p.slug) + '">Adicionar à sacola</button>';
    var buyBtn = sold
      ? '<span class="buy buy--sold" aria-disabled="true">Esgotado</span>'
      : '<a class="buy" href="' + u + '">Comprar</a>';
    return '<article class="pcard' + (sold ? ' is-sold' : '') + '" data-cat="' + p.cat + '" data-reveal>'
      + '<div class="media">' + badgesHTML(p)
      + '<a href="' + u + '" aria-label="' + esc(p.name) + '"><img src="' + p.img + '" alt="' + esc(p.name) + '" loading="lazy"></a>'
      + addBtn
      + '</div>'
      + '<div class="body">'
      + '<span class="cat">' + esc(p.catLabel) + '</span>'
      + '<h3><a href="' + u + '">' + esc(p.name) + '</a></h3>'
      + '<span class="vol">' + esc(p.vol) + '</span>'
      + (p.blurb ? '<p class="blurb">' + esc(p.blurb) + '</p>' : '')
      + '<span class="stars">★★★★★ ' + esc(p.rating) + '</span>'
      + '<div class="foot">' + priceHTML(p) + buyBtn + '</div>'
      + '</div></article>';
  }
  function expSlideHTML(p) {
    return '<a class="exp-slide" href="' + url(p) + '" data-reveal>'
      + '<div class="ph-img"><img src="' + p.img + '" alt="' + esc(p.name) + '" loading="lazy"></div>'
      + '<div class="cap"><div><div class="ed">' + esc(p.catLabel) + '</div><h3>' + esc(p.name) + '</h3></div>'
      + '<div class="pr">' + money(p.price) + '</div></div></a>';
  }

  /* ---------- estado: CARRINHO NATIVO do Shopify ---------- */
  var CART = { items: [], item_count: 0 };   // último /cart.js
  var busy = false;                          // evita mutações concorrentes
  var lastError = '';

  function jpost(u, body) {
    return fetch(u, {
      method: 'POST', credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(body)
    });
  }
  function refreshCart(cb) {
    fetch('/cart.js', { credentials: 'same-origin', headers: { 'Accept': 'application/json' } })
      .then(function (r) { return r.json(); })
      .then(function (c) { CART = c; sync(); if (cb) cb(); })
      .catch(function () { if (cb) cb(); });
  }
  function addToCart(variantId, qty) {
    if (busy || !variantId) return;
    busy = true; lastError = '';
    jpost('/cart/add.js', { id: Number(variantId), quantity: qty || 1 })
      .then(function (r) { if (!r.ok) return r.json().then(function (e) { throw e; }); return r.json(); })
      .then(function () { refreshCart(function () { busy = false; openCart(); }); })
      .catch(function (e) {
        busy = false;
        lastError = (e && e.description) || 'Não foi possível adicionar à sacola. Tente novamente.';
        sync(); openCart();
      });
  }
  function changeLine(key, qty) {
    if (busy) return;
    busy = true; lastError = '';
    jpost('/cart/change.js', { id: key, quantity: qty })
      .then(function (r) { return r.json(); })
      .then(function (c) { CART = c; busy = false; sync(); })
      .catch(function () { busy = false; refreshCart(); });
  }

  // linhas do carrinho nativo mapeadas para exibição (produto curado quando conhecido)
  function items() {
    return (CART.items || []).map(function (li) {
      var p = byVariant(li.id);
      var qty = li.quantity;
      return {
        key: li.key, qty: qty, p: p,
        name: p ? p.name : li.product_title,
        vol: p ? p.vol : (li.variant_title || ''),
        img: p ? p.img : (li.image || ''),
        href: p ? url(p) : li.url,
        rate: p ? tierRate(qty, p) : 0,
        full: p ? (p.price * qty) : (li.original_line_price / 100),
        now: p ? lineTotal(p, qty) : (li.final_line_price / 100)
      };
    });
  }
  function count() { return CART.item_count || 0; }
  function subtotal() { return items().reduce(function (s, it) { return s + it.now; }, 0); }

  // API pública usada por product.js/proof.js: adicionar por slug
  function add(slug, qty) {
    var p = bySlug(slug); if (!p) return;
    addToCart(p.variant, qty || 1);
  }

  /* ---------- gaveta do carrinho ---------- */
  var drawer, overlay, built = false;
  function buildDrawer() {
    if (built) return; built = true;
    overlay = document.createElement('div'); overlay.className = 'cart-overlay'; overlay.setAttribute('data-cart-close', '');
    drawer = document.createElement('aside'); drawer.className = 'cart-drawer'; drawer.setAttribute('aria-label', 'Sacola'); drawer.setAttribute('aria-hidden', 'true');
    drawer.innerHTML =
      '<div class="cart-head"><span class="cart-title">Sacola <span class="cart-n" data-cart-count>0</span></span>'
      + '<button class="cart-x" type="button" data-cart-close aria-label="Fechar">&times;</button></div>'
      + '<p class="cart-err" data-cart-err style="display:none;margin:0;padding:10px 20px;color:#b00020;font-size:13px;background:#fff4f4"></p>'
      + '<div class="cart-ship"><p class="cart-ship-msg" data-ship-msg></p><div class="cart-ship-bar"><i data-ship-bar></i></div></div>'
      + '<div class="cart-body" data-cart-body></div>'
      + '<div class="cart-foot"><div class="cart-sub"><span>Subtotal</span><span data-cart-subtotal>€0,00</span></div>'
      + '<button class="btn btn--ink btn--block cart-go" type="button" data-cart-checkout>Finalizar compra</button>'
      + '<button class="cart-wa-alt" type="button" data-cart-wa>Prefere encomendar pelo WhatsApp?</button>'
      + '<button class="cart-cont" type="button" data-cart-close>Continuar a comprar</button></div>';
    document.body.appendChild(overlay);
    document.body.appendChild(drawer);
  }
  function openCart() { buildDrawer(); renderDrawer(); document.body.classList.add('cart-open'); drawer.setAttribute('aria-hidden', 'false'); }
  function closeCart() { if (!drawer) return; document.body.classList.remove('cart-open'); drawer.setAttribute('aria-hidden', 'true'); }

  function renderDrawer() {
    if (!built) return;
    var err = drawer.querySelector('[data-cart-err]');
    if (err) { err.textContent = lastError || ''; err.style.display = lastError ? 'block' : 'none'; }
    var body = drawer.querySelector('[data-cart-body]');
    var its = items();
    if (!its.length) {
      body.innerHTML = '<div class="cart-empty"><p>A sua sacola está vazia.</p><a class="cart-empty-link" href="' + shopUrl() + '" data-cart-close>Ver a coleção</a></div>';
    } else {
      body.innerHTML = its.map(function (it) {
        var line = it.rate > 0
          ? '<div class="ci-price"><span class="ci-was">' + money(it.full) + '</span>' + money(it.now) + '<span class="ci-disc">&minus;' + Math.round(it.rate * 100) + '%</span></div>'
          : '<div class="ci-price">' + money(it.now) + '</div>';
        return '<div class="cart-item" data-key="' + esc(it.key) + '" data-qty="' + it.qty + '">'
          + '<a class="ci-img" href="' + it.href + '"><img src="' + it.img + '" alt="' + esc(it.name) + '"></a>'
          + '<div class="ci-main"><a class="ci-name" href="' + it.href + '">' + esc(it.name) + '</a>'
          + '<div class="ci-meta">' + esc(it.vol) + '</div>'
          + '<div class="ci-row"><div class="qty"><button type="button" data-dec aria-label="Diminuir">&minus;</button>'
          + '<span class="qty-n">' + it.qty + '</span><button type="button" data-inc aria-label="Aumentar">+</button></div>'
          + line + '</div></div>'
          + '<button class="ci-x" type="button" data-remove aria-label="Remover">&times;</button></div>';
      }).join('');
    }
    drawer.querySelector('[data-cart-subtotal]').textContent = money(subtotal());
    var go = drawer.querySelector('[data-cart-checkout]');
    var waAlt = drawer.querySelector('[data-cart-wa]');
    var shopify = goesShopify(its);
    if (go) {
      go.innerHTML = shopify ? (LOCK_SVG + ' Finalizar compra') : (WA_SVG + ' Finalizar pelo WhatsApp');
      go.disabled = !its.length;
    }
    if (waAlt) waAlt.style.display = (shopify && its.length) ? '' : 'none';
  }

  /* ---------- progresso de portes (gaveta + barra flutuante) ---------- */
  function renderShip() {
    var sub = subtotal(), goal = SHOP.freeShip, rem = Math.max(0, goal - sub);
    var pct = goal > 0 ? Math.min(100, Math.round((sub / goal) * 100)) : 100;
    var msg = rem > 0
      ? 'Faltam <b>' + money(rem) + '</b> para <b>portes grátis</b>!'
      : '<b>Boa!</b> Você tem <b>portes grátis</b>. 🎉';
    if (built) {
      drawer.querySelector('[data-ship-msg]').innerHTML = msg;
      drawer.querySelector('[data-ship-bar]').style.width = pct + '%';
    }
    var f = document.querySelector('.frete');
    if (f) {
      var p = f.querySelector('.top p'); if (p) p.innerHTML = rem > 0 ? 'Faltam <b>' + money(rem) + '</b> para você ganhar <b>portes grátis</b>!' : 'Você desbloqueou os <b>portes grátis</b>! 🎉';
      var bar = f.querySelector('.bar i'); if (bar) bar.style.width = pct + '%';
    }
  }

  function sync() {
    var n = count();
    document.querySelectorAll('.cartn, [data-cart-count]').forEach(function (el) { el.textContent = n; });
    document.querySelectorAll('.cartn').forEach(function (el) { el.classList.toggle('has', n > 0); });
    renderDrawer(); renderShip();
  }

  /* ---------- checkout ---------- */
  // cupão por quantidade (mesmo produto): 2 un -> d2 (-5%), 3+ un -> d3 (-10%)
  function tierCode(p, qty) { if (!p || !p.variant) return ''; if (qty >= 3) return p.d3 || ''; if (qty === 2) return p.d2 || ''; return ''; }
  // "Comprar agora" (PDP) — checkout EXPRESS de 1 item via permalink (não passa pela sacola). Relativo p/ funcionar no preview e no live.
  function buyUrl(p, qty) {
    if (!p.variant) return null;
    var code = tierCode(p, qty);
    return '/cart/' + p.variant + ':' + qty + (code ? ('?discount=' + code) : '');
  }
  // O Shopify honra 1 cupão por carrinho. Carrinho de 1 produto -> aplica o cupão de quantidade.
  // Carrinho com VÁRIOS produtos e algum desconto -> WhatsApp (para o valor cobrado bater com o exibido).
  function goesShopify(its) {
    if (!its.length) return false;
    var withDisc = its.filter(function (it) { return it.rate > 0; }).length;
    return its.length === 1 || withDisc === 0;
  }
  function checkout() {
    var its = items(); if (!its.length) return;
    if (!goesShopify(its)) { checkoutWhatsApp(its); return; }
    // os itens já estão no carrinho nativo do Shopify; aplica o cupão de quantidade se houver.
    var code = (its.length === 1 && its[0].p) ? tierCode(its[0].p, its[0].qty) : '';
    if (code) window.location.href = '/discount/' + encodeURIComponent(code) + '?redirect=/checkout';
    else window.location.href = '/checkout';
  }
  function checkoutWhatsApp(its) {
    if (!its.length) return;
    var lines = its.map(function (it) {
      return '• ' + it.qty + '× ' + it.name + ' — ' + money(it.now) + (it.rate > 0 ? ' (−' + Math.round(it.rate * 100) + '%)' : '');
    });
    var sub = its.reduce(function (s, it) { return s + it.now; }, 0);
    var msg = 'Olá! Quero finalizar o meu pedido na loja Izabel de Paula:\n\n' + lines.join('\n') + '\n\nSubtotal: ' + money(sub);
    if (sub < SHOP.freeShip) msg += '\n(Portes grátis acima de ' + money(SHOP.freeShip) + ' · Portugal Continental)';
    window.open('https://wa.me/' + SHOP.whatsapp + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
  }

  /* ---------- delegação de eventos ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-add],[data-cart-open],[data-cart-close],[data-cart-checkout],[data-cart-wa],[data-inc],[data-dec],[data-remove]');
    if (!t) return;
    if (t.hasAttribute('data-add')) { e.preventDefault(); add(t.getAttribute('data-add'), 1); return; }
    if (t.hasAttribute('data-cart-open')) { e.preventDefault(); openCart(); return; }
    if (t.hasAttribute('data-cart-close')) { e.preventDefault(); closeCart(); return; }
    if (t.hasAttribute('data-cart-checkout')) { e.preventDefault(); checkout(); return; }
    if (t.hasAttribute('data-cart-wa')) { e.preventDefault(); checkoutWhatsApp(items()); return; }
    var item = t.closest('[data-key]'); if (!item) return;
    var key = item.getAttribute('data-key');
    var cur = Number(item.getAttribute('data-qty')) || 0;
    if (t.hasAttribute('data-inc')) changeLine(key, cur + 1);
    else if (t.hasAttribute('data-dec')) changeLine(key, cur - 1);   // qty 0 remove a linha
    else if (t.hasAttribute('data-remove')) changeLine(key, 0);
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeCart(); });

  /* ---------- render das vitrines da home ---------- */
  function renderShop() {
    var bs = document.querySelector('[data-bestsellers]');
    if (bs) bs.innerHTML = PRODUCTS.filter(function (p) { return p.bestseller; })
      .sort(function (a, b) { return (a.bsRank || 99) - (b.bsRank || 99); })
      .map(cardHTML).join('');
    var grid = document.querySelector('[data-grid]');
    if (grid) grid.innerHTML = PRODUCTS.map(cardHTML).join('');
    var exp = document.querySelector('[data-exp]');
    if (exp) exp.innerHTML = PRODUCTS.filter(function (p) { return p.exp; }).map(expSlideHTML).join('');
  }

  /* ---------- API pública (usada por product.js / proof.js) ---------- */
  window.IZB = {
    PRODUCTS: PRODUCTS, SHOP: SHOP,
    money: money, discount: discount, esc: esc, bySlug: bySlug, byHandle: byHandle, byVariant: byVariant, productUrl: url, shopUrl: shopUrl,
    cardHTML: cardHTML, expSlideHTML: expSlideHTML,
    add: add, openCart: openCart, count: count, subtotal: subtotal, sync: sync,
    buyUrl: buyUrl, tierCode: tierCode, tierRate: tierRate, lineTotal: lineTotal,
    checkout: checkout, checkoutWhatsApp: checkoutWhatsApp, refreshCart: refreshCart
  };

  /* ---------- init ---------- */
  buildDrawer();
  renderShop();
  // lê o carrinho real do Shopify e sincroniza a UI; abre a gaveta se a página /cart pediu.
  refreshCart(function () { if (window.IZB_OPEN_CART) openCart(); });
})();
