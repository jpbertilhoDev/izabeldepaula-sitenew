/* ============================================================
   IZABEL DE PAULA — página de produto (produto.html?produto=<slug>)
   Renderiza a partir de window.PRODUCTS via window.IZB.
   Re-desenha ao receber 'izb:stock' (estoque/preço ao vivo do Shopify),
   e trata o estado ESGOTADO (available === false).
   ============================================================ */
(function () {
  'use strict';
  var IZB = window.IZB;
  var root = document.getElementById('pdp');
  if (!IZB || !root) return;

  var esc = IZB.esc, money = IZB.money;
  var slug = new URLSearchParams(location.search).get('produto');

  var LOCK = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" style="vertical-align:-2px"><rect x="4" y="10" width="16" height="11" rx="1.5"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>';
  var WA = '<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Z"/></svg>';

  /* ---------- SEO dinâmico da PDP (espelha o schema server-side da loja) ----------
     Idempotente: reutiliza <script id="pdp-jsonld"> para não duplicar em re-render.
     availability reflete o estado REAL (In/OutOfStock) — nunca fixo. */
  function applySEO(p, sold) {
    var origin = (location.origin && location.origin.indexOf('http') === 0) ? location.origin : 'https://www.izabeldepaula.com';
    var orgId = 'https://www.izabeldepaula.com/#organization';
    var pageUrl = origin + location.pathname + '?produto=' + encodeURIComponent(p.slug);
    function abs(u) { return (u && u.indexOf('http') === 0) ? u : origin + '/' + String(u || '').replace(/^\//, ''); }
    function setMeta(sel, val) { var el = document.querySelector(sel); if (el) el.setAttribute('content', val); }

    var can = document.querySelector('link[rel="canonical"]'); if (can) can.setAttribute('href', pageUrl);
    setMeta('meta[property="og:url"]', pageUrl);
    setMeta('meta[property="og:title"]', p.name + ' · Izabel de Paula');
    setMeta('meta[property="og:description"]', p.short || '');
    setMeta('meta[name="twitter:title"]', p.name + ' · Izabel de Paula');
    setMeta('meta[name="twitter:description"]', p.short || '');
    if (p.img) { setMeta('meta[property="og:image"]', abs(p.img)); setMeta('meta[name="twitter:image"]', abs(p.img)); }

    var imgs = [];
    (p.gallery || []).forEach(function (g) { if (g && g.full) imgs.push(abs(g.full)); });
    if (!imgs.length && p.img) imgs.push(abs(p.img));

    var offer = {
      '@type': 'Offer', 'price': p.price, 'priceCurrency': 'EUR',
      'availability': sold ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
      'url': pageUrl, 'seller': { '@id': orgId }
    };
    var graph = { '@context': 'https://schema.org', '@graph': [
      { '@type': 'Product', '@id': pageUrl + '#product', 'name': p.name,
        'description': p.short || p.blurb || '', 'image': imgs,
        'brand': { '@type': 'Brand', 'name': 'Izabel de Paula' }, 'url': pageUrl, 'offers': offer },
      { '@type': 'BreadcrumbList', 'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Início', 'item': origin + '/' },
        { '@type': 'ListItem', 'position': 2, 'name': 'Loja', 'item': origin + '/index.html#loja' },
        { '@type': 'ListItem', 'position': 3, 'name': p.name, 'item': pageUrl } ] }
    ] };
    var s = document.getElementById('pdp-jsonld');
    if (!s) { s = document.createElement('script'); s.type = 'application/ld+json'; s.id = 'pdp-jsonld'; document.head.appendChild(s); }
    s.textContent = JSON.stringify(graph);
  }

  /* opções de quantidade pré-definidas: 1 (cheio) · 2 (−5%) · 3 (−10%) */
  var TIERS = [
    { units: 1, off: 0,    note: 'Preço normal',  tag: '' },
    { units: 2, off: 0.05, note: 'Poupe 5%',      tag: '−5%' },
    { units: 3, off: 0.10, note: 'Poupe 10%',     tag: '−10% · melhor valor' }
  ];

  /* ---------- render (re-chamável: init + evento 'izb:stock') ---------- */
  function render() {
    var p = IZB.bySlug(slug);
    if (!p) {
      root.innerHTML = '<div class="wrap pdp-missing"><span class="kicker">Ops</span>'
        + '<h1 class="h-sec">Produto não encontrado</h1>'
        + '<p class="lead">O produto que procura não existe ou saiu de catálogo.</p>'
        + '<a class="btn btn--ink" href="index.html#loja">Ver a coleção</a></div>';
      return;
    }
    var sold = p.available === false;

    document.title = p.name + ' · Izabel de Paula — Loja oficial';
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute('content', p.short);
    applySEO(p, sold);

    var d = sold ? null : IZB.discount(p); // não promover desconto de item esgotado
    var priceBlock = !p.price
      ? '<span class="pdp-now price-na">Sob consulta</span>'
      : (p.compareAt && p.compareAt > p.price ? '<span class="pdp-was">' + money(p.compareAt) + '</span>' : '')
        + '<span class="pdp-now">' + money(p.price) + '</span>'
        + (d ? '<span class="pdp-off">-' + d + '%</span>' : '');

    var tags = sold ? '<span class="tag soldout">Sob consulta</span>' : '';
    (p.badges || []).forEach(function (b) { tags += '<span class="tag ' + (b.cls || '') + '">' + esc(b.t) + '</span>'; });
    if (d) tags += '<span class="tag sale">-' + d + '%</span>';

    var BUY_LABEL = p.variant ? (LOCK + ' Comprar agora<span class="btn-sub"> · pagamento seguro</span>') : (WA + ' Comprar agora<span class="btn-sub"> pelo WhatsApp</span>');

    function unitInfo(t) {
      // mesma fórmula do carrinho (IZB.lineTotal/tierRate) — evita qualquer divergência
      return { total: IZB.lineTotal(p, t.units), showOff: IZB.tierRate(t.units, p) > 0 };
    }
    var unitsHTML = sold ? '' : ('<div class="pdp-units" data-pdp-units role="group" aria-label="Escolha a quantidade">'
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
      + (p.d2 ? '<p class="pdp-units-note">Desconto de 2 e 3 unidades aplicado automaticamente no checkout.</p>' : ''));

    /* ações: compra normal OU estado esgotado com "avisar quando voltar" */
    var actionsHTML = sold
      ? '<div class="pdp-actions"><span class="btn btn--ink btn--block pdp-add is-sold" aria-disabled="true">Sob consulta</span></div>'
        + '<button class="btn btn--gold btn--block pdp-buy" type="button" data-pdp-notify>' + WA + ' Falar connosco</button>'
        + '<p class="pdp-soldout-note">Sem compra imediata neste momento. Fale connosco pelo WhatsApp: ajudamos a encontrar a melhor solução para si e avisamos assim que voltar.</p>'
      : '<div class="pdp-actions"><button class="btn btn--ink btn--block pdp-add" type="button" data-pdp-add>Adicionar à sacola</button></div>'
        + '<button class="btn btn--gold btn--block pdp-buy" type="button" data-pdp-buy>' + BUY_LABEL + '</button>';

    /* galeria: foto limpa + slides do carrossel (coluna de miniaturas à esquerda) */
    var gal = (p.gallery && p.gallery.length) ? p.gallery : [{ full: p.img, thumb: p.img }];
    var thumbsHTML = gal.length > 1 ? '<div class="pdp-thumbs">' + gal.map(function (it, i) {
      return '<button class="pdp-thumb' + (i === 0 ? ' active' : '') + '" type="button" data-gallery="' + it.full
        + '" aria-label="Ver imagem ' + (i + 1) + '"><img src="' + it.thumb + '" alt="' + esc(p.name) + ' — imagem ' + (i + 1)
        + '" loading="lazy" width="70" height="70"></button>';
    }).join('') + '</div>' : '';

    root.innerHTML =
      '<div class="wrap">'
      + '<nav class="breadcrumb"><a href="index.html">Início</a><span>/</span>'
      + '<a href="index.html#loja">Loja</a><span>/</span><b>' + esc(p.name) + '</b></nav>'
      + '<div class="pdp-wrap' + (sold ? ' is-sold' : '') + '">'
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
      + (window.IZBCONTENT && window.IZBCONTENT.keyBenefitsHTML ? window.IZBCONTENT.keyBenefitsHTML(p) : '')
      + '<div class="pdp-price">' + priceBlock + '</div>'
      + '<div class="pdp-vol">' + esc(p.vol) + '</div>'
      + unitsHTML
      + actionsHTML
      + '<ul class="pdp-trust"><li>Garantia de satisfação de 15 dias</li><li>Portes grátis acima de ' + money(IZB.SHOP.freeShip) + (IZB.SHOP.freeShipNote ? ' · ' + IZB.SHOP.freeShipNote : '') + '</li><li>Envio seguro para toda a Europa</li><li>Dúvidas? Apoio no WhatsApp</li></ul>'
      + (window.IZBCONTENT ? '<div class="pdp-desc pdp-desc--col">' + window.IZBCONTENT.fullDescriptionHTML(p) + '</div>' : '')
      + '</div></div>'
      + (window.IZBPROOF ? window.IZBPROOF.pdpBlockHTML(p) : '')
      + '</div>';

    /* ---------- ações: compra (só quando disponível) ---------- */
    if (!sold) {
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
      var addBtn = root.querySelector('[data-pdp-add]');
      if (addBtn) addBtn.addEventListener('click', function () { IZB.add(p.slug, qty); });
      var buyBtn = root.querySelector('[data-pdp-buy]');
      if (buyBtn) buyBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (p.variant) { window.location.href = IZB.buyUrl(p, qty); return; }
        var msg = 'Olá! Tenho interesse no produto:\n\n' + qty + '× ' + p.name + ' — ' + money(p.price * qty)
          + '\n\nPode ajudar-me a finalizar a compra?';
        window.open('https://wa.me/' + IZB.SHOP.whatsapp + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
      });
    } else {
      /* esgotado: "avisar quando voltar" pelo WhatsApp */
      var notify = root.querySelector('[data-pdp-notify]');
      if (notify) notify.addEventListener('click', function () {
        var msg = 'Olá Izabel! Tenho interesse no produto "' + p.name + '". Pode dizer-me como posso adquiri-lo, ou avisar-me assim que estiver disponível?';
        window.open('https://wa.me/' + IZB.SHOP.whatsapp + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
      });
    }

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

    stickyBar(p, sold);
  }

  /* ---------- barra fixa de compra (telemóvel) ----------
     Numa PDP longa — galeria, benefícios, ingredientes, modo de uso, prova —
     o botão de compra fica lá em cima e some-se. Quem lê tudo até ao fim é
     precisamente quem está a decidir, e tinha de rolar para trás para comprar.
     Esta barra segue-a: aparece assim que o botão real sai do ecrã.

     Não duplica lógica nenhuma — clica no botão verdadeiro. Assim respeita a
     quantidade escolhida (1/2/3 unidades) e o estado esgotado sem poder
     divergir dele. Duplicar a lógica aqui era o caminho fácil para os dois
     botões deixarem de concordar um dia. */
  var io = null;
  function stickyBar(p, sold) {
    var old = document.querySelector('[data-pdp-bar]');
    if (old) old.remove();                       // o render corre outra vez em 'izb:stock'
    if (io) { io.disconnect(); io = null; }

    var alvo = root.querySelector('[data-pdp-add],[data-pdp-notify]');
    if (!alvo) return;

    var bar = document.createElement('div');
    bar.className = 'pdp-bar';
    bar.setAttribute('data-pdp-bar', '');
    bar.innerHTML =
      '<div class="pdp-bar-in">'
      + '<div class="pdp-bar-info">'
      + '<span class="pdp-bar-name">' + esc(p.name) + '</span>'
      + '<span class="pdp-bar-price" data-pdp-bar-price>' + money(p.price) + '</span>'
      + '</div>'
      + '<button class="btn btn--ink pdp-bar-btn" type="button">' + (sold ? 'Consultar' : 'Adicionar') + '</button>'
      + '</div>';
    document.body.appendChild(bar);

    bar.querySelector('.pdp-bar-btn').addEventListener('click', function () {
      var real = root.querySelector('[data-pdp-add],[data-pdp-notify]');
      if (real) real.click();
    });

    /* o preço da barra segue a quantidade escolhida — senão dizia €49 e metia três na sacola */
    var precoEl = bar.querySelector('[data-pdp-bar-price]');
    root.addEventListener('click', function (e) {
      if (!e.target.closest || !e.target.closest('.pdp-unit')) return;
      setTimeout(function () {
        var ativo = root.querySelector('.pdp-unit.active .u-price');
        if (ativo && precoEl) precoEl.textContent = ativo.textContent;
      }, 0);
    });

    /* aparece quando o botão real sai do ecrã (e só então) */
    if (!('IntersectionObserver' in window)) return;
    io = new IntersectionObserver(function (entries) {
      bar.classList.toggle('on', !entries[0].isIntersecting);
      document.documentElement.classList.toggle('pdpbar-open', !entries[0].isIntersecting);
    }, { threshold: 0 });
    io.observe(alvo);
  }

  render();
  document.addEventListener('izb:stock', render);
})();
