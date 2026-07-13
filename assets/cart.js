/* ============================================================
   IZABEL DE PAULA — LOJA · shop core + carrinho
   Fonte de dados: assets/data.js (window.PRODUCTS, window.SHOP)
   - Renderiza vitrines (mais vendidos / catálogo / experiência)
   - Carrinho persistente (localStorage) + gaveta lateral
   - Checkout via WhatsApp
   ============================================================ */
(function () {
  'use strict';
  var PRODUCTS = window.PRODUCTS || [];
  var SHOP = window.SHOP || { whatsapp: '', email: '', freeShip: 50, currency: '€', storeUrl: 'https://store.izabeldepaula.com' };
  var KEY = 'izb_cart';
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
  // fonte de cálculo única: espelha o seletor de unidades da página de produto
  // e o cupão aplicado no checkout — assim carrinho e PDP mostram o mesmo valor.
  function tierRate(qty, p) {
    if (qty >= 3 && p.d3) return 0.10;
    if (qty === 2 && p.d2) return 0.05;
    return 0;
  }
  function lineTotal(p, qty) { return p.price * qty * (1 - tierRate(qty, p)); }
  function bySlug(slug) { for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].slug === slug) return PRODUCTS[i]; return null; }
  function url(p) { return 'produto.html?produto=' + encodeURIComponent(p.slug); }

  /* ---------- card markup (espelha a estrutura .pcard do design) ---------- */
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
    /* Sem stock não é um beco — e também não é um carimbo. "ESGOTADO" fecha a porta
       e soa a fim de linha; "Sob consulta" é a verdade (há clínica e WhatsApp, há mesmo
       quem consultar) e mantém o registo da marca. Antes o botão era um <span> com
       pointer-events:none: a cliente mais motivada, a que quer justamente o que falta,
       batia na parede e ia-se embora. Agora tem caminho — leva à página do produto.
       Nota: isto é o RÓTULO. No schema.org o produto continua a declarar OutOfStock ao
       Google (seo-stock.js) — suavizar o que a cliente lê é marketing; suavizar o que o
       Google lê seria mentir, e custa a conta do Merchant Center. */
    var addBtn = sold
      ? '<span class="add add--sold" aria-hidden="true">Sob consulta</span>'
      : '<button class="add" type="button" data-add="' + esc(p.slug) + '">Adicionar à sacola</button>';
    var buyBtn = sold
      ? '<a class="buy buy--wait" href="' + u + '">Consultar</a>'
      : '<a class="buy" href="' + u + '">Comprar</a>';
    return '<article class="pcard' + (sold ? ' is-sold' : '') + '" data-cat="' + p.cat + '" data-reveal>'
      + '<div class="media">' + badgesHTML(p)
      + '<a href="' + u + '" aria-label="' + esc(p.name) + '"><img src="' + p.img + '" alt="' + esc(p.name) + '" loading="lazy"></a>'
      + addBtn
      + '</div>'
      + '<div class="body">'
      + '<span class="cat">' + esc(p.catLabel) + '</span>'
      + '<h3><a href="' + u + '">' + esc(p.name) + '</a></h3>'
      + (p.blurb ? '<p class="pc-blurb">' + esc(p.blurb) + '</p>' : '')
      + '<span class="vol">' + esc(p.vol) + '</span>'
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

  /* ---------- estado do carrinho ---------- */
  function read() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } }
  function save(c) { try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {} }
  function items() {
    return read().map(function (l) { var p = bySlug(l.slug); return p ? { p: p, qty: l.qty } : null; }).filter(Boolean);
  }
  function count() { return read().reduce(function (n, l) { return n + l.qty; }, 0); }
  function subtotal() { return items().reduce(function (s, it) { return s + lineTotal(it.p, it.qty); }, 0); }
  function add(slug, qty) {
    qty = qty || 1; var c = read(); var f = null;
    for (var i = 0; i < c.length; i++) if (c[i].slug === slug) f = c[i];
    if (f) f.qty += qty; else c.push({ slug: slug, qty: qty });
    save(c); sync(); openCart();
  }
  function setQty(slug, qty) {
    var c = read();
    c = c.map(function (l) { return l.slug === slug ? { slug: slug, qty: qty } : l; }).filter(function (l) { return l.qty > 0; });
    save(c); sync();
  }
  function remove(slug) { save(read().filter(function (l) { return l.slug !== slug; })); sync(); }

  /* ---------- gaveta do carrinho ---------- */
  var drawer, overlay, built = false;
  function buildDrawer() {
    if (built) return; built = true;
    overlay = document.createElement('div'); overlay.className = 'cart-overlay'; overlay.setAttribute('data-cart-close', '');
    drawer = document.createElement('aside'); drawer.className = 'cart-drawer'; drawer.setAttribute('aria-label', 'Sacola'); drawer.setAttribute('aria-hidden', 'true');
    drawer.innerHTML =
      '<div class="cart-head"><span class="cart-title">Sacola <span class="cart-n" data-cart-count>0</span></span>'
      + '<button class="cart-x" type="button" data-cart-close aria-label="Fechar">&times;</button></div>'
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
    var body = drawer.querySelector('[data-cart-body]');
    var its = items();
    if (!its.length) {
      body.innerHTML = '<div class="cart-empty"><p>A sua sacola está vazia.</p><a class="cart-empty-link" href="index.html#loja" data-cart-close>Ver a coleção</a></div>';
    } else {
      body.innerHTML = its.map(function (it) {
        var p = it.p;
        var rate = tierRate(it.qty, p);
        var priceHTML = rate > 0
          ? '<div class="ci-price"><span class="ci-was">' + money(p.price * it.qty) + '</span>' + money(lineTotal(p, it.qty)) + '<span class="ci-disc">&minus;' + Math.round(rate * 100) + '%</span></div>'
          : '<div class="ci-price">' + money(lineTotal(p, it.qty)) + '</div>';
        return '<div class="cart-item" data-slug="' + esc(p.slug) + '">'
          + '<a class="ci-img" href="' + url(p) + '"><img src="' + p.img + '" alt="' + esc(p.name) + '"></a>'
          + '<div class="ci-main"><a class="ci-name" href="' + url(p) + '">' + esc(p.name) + '</a>'
          + '<div class="ci-meta">' + esc(p.vol) + '</div>'
          + '<div class="ci-row"><div class="qty"><button type="button" data-dec aria-label="Diminuir">&minus;</button>'
          + '<span class="qty-n">' + it.qty + '</span><button type="button" data-inc aria-label="Aumentar">+</button></div>'
          + priceHTML + '</div></div>'
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

  /* ---------- progresso de frete (gaveta + barra flutuante) ---------- */
  function renderShip() {
    var sub = subtotal(), goal = SHOP.freeShip, rem = Math.max(0, goal - sub);
    var pct = goal > 0 ? Math.min(100, Math.round((sub / goal) * 100)) : 100;
    var msg = rem > 0
      ? 'Faltam <b>' + money(rem) + '</b> para <b>portes grátis</b>!'
      : '<b>Boa!</b> Já tem <b>portes grátis</b>. 🎉';
    if (built) {
      drawer.querySelector('[data-ship-msg]').innerHTML = msg;
      drawer.querySelector('[data-ship-bar]').style.width = pct + '%';
    }
    // barra flutuante .frete da home
    var f = document.querySelector('.frete');
    if (f) {
      var p = f.querySelector('.top p'); if (p) p.innerHTML = rem > 0 ? 'Faltam <b>' + money(rem) + '</b> para ter <b>portes grátis</b>!' : 'Desbloqueou os <b>portes grátis</b>! 🎉';
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
  // cupão por quantidade (mesmo produto): 2 un -> -5%, 3+ un -> -10%
  function tierCode(p, qty) { if (!p.variant) return ''; if (qty >= 3) return p.d3 || ''; if (qty === 2) return p.d2 || ''; return ''; }
  // link de checkout Shopify para 1 produto (usado na página de produto)
  function buyUrl(p, qty) {
    if (!p.variant) return null;
    var code = tierCode(p, qty);
    return SHOP.storeUrl + '/cart/' + p.variant + ':' + qty + (code ? ('?discount=' + code) : '');
  }
  function checkoutShopify(its) {
    var path = its.map(function (it) { return it.p.variant + ':' + it.qty; }).join(',');
    // cupão de quantidade só se aplica a carrinho de 1 produto (o Shopify aceita 1 código por link)
    var code = its.length === 1 ? tierCode(its[0].p, its[0].qty) : '';
    window.location.href = SHOP.storeUrl + '/cart/' + path + (code ? ('?discount=' + code) : '');
  }
  function checkoutWhatsApp(its) {
    if (!its.length) return;
    var lines = its.map(function (it) {
      var r = tierRate(it.qty, it.p);
      return '• ' + it.qty + '× ' + it.p.name + ' — ' + money(lineTotal(it.p, it.qty)) + (r > 0 ? ' (−' + Math.round(r * 100) + '%)' : '');
    });
    var sub = its.reduce(function (s, it) { return s + lineTotal(it.p, it.qty); }, 0);
    var msg = 'Olá! Quero finalizar o meu pedido na loja Izabel de Paula:\n\n' + lines.join('\n') + '\n\nSubtotal: ' + money(sub);
    if (sub < SHOP.freeShip) msg += '\n(Portes grátis acima de ' + money(SHOP.freeShip) + ' · Portugal Continental)';
    window.open('https://wa.me/' + SHOP.whatsapp + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
  }
  // O Shopify só honra 1 cupão por link de carrinho. Se houver desconto de
  // quantidade num carrinho com VÁRIOS produtos, finalizamos pelo WhatsApp para
  // o valor cobrado bater exatamente com o subtotal mostrado no carrinho.
  function goesShopify(its) {
    if (!its.length || !its.every(function (it) { return it.p.variant; })) return false;
    var withDisc = its.filter(function (it) { return tierRate(it.qty, it.p) > 0; }).length;
    return its.length === 1 || withDisc === 0;
  }
  function checkout() {
    var its = items(); if (!its.length) return;
    if (goesShopify(its)) checkoutShopify(its);
    else checkoutWhatsApp(its);
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
    var item = t.closest('[data-slug]'); if (!item) return;
    var slug = item.getAttribute('data-slug');
    var cur = 0; read().forEach(function (l) { if (l.slug === slug) cur = l.qty; });
    if (t.hasAttribute('data-inc')) setQty(slug, cur + 1);
    else if (t.hasAttribute('data-dec')) setQty(slug, cur - 1);
    else if (t.hasAttribute('data-remove')) remove(slug);
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

  /* ---------- API pública (usada por product.js) ---------- */
  window.IZB = {
    PRODUCTS: PRODUCTS, SHOP: SHOP,
    money: money, discount: discount, esc: esc, bySlug: bySlug, productUrl: url,
    cardHTML: cardHTML, expSlideHTML: expSlideHTML,
    add: add, openCart: openCart, count: count, subtotal: subtotal, sync: sync,
    buyUrl: buyUrl, tierCode: tierCode, tierRate: tierRate, lineTotal: lineTotal,
    checkout: checkout, checkoutWhatsApp: checkoutWhatsApp
  };

  /* ---------- estoque ao vivo ----------
     live-stock.js corrige window.PRODUCTS (disponibilidade/preço) com os
     dados reais do Shopify e dispara 'izb:stock' → re-renderizamos vitrines
     e carrinho para nunca mostrar como disponível algo que já esgotou. */
  document.addEventListener('izb:stock', function () { renderShop(); sync(); });

  /* ---------- init (síncrono: o DOM acima já está parseado) ---------- */
  buildDrawer();
  renderShop();
  sync();
})();
