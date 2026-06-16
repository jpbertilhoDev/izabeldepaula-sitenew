/* IZABEL DE PAULA — LOJA · interações */
(function(){
  'use strict';

  /* Entrada sempre no topo (hero) — sem o navegador restaurar a posição de
     rolagem anterior, que fazia o site abrir já nos produtos. Só força o topo
     quando não há âncora (#loja, #bestsellers…) no link de entrada. */
  try {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    if (!location.hash) window.scrollTo(0, 0);
  } catch (e) {}

  /* Paint detector → graceful reveal */
  var painted = false;
  if (window.requestAnimationFrame) requestAnimationFrame(function(){ painted = true; });
  setTimeout(function(){ if (!painted) document.documentElement.classList.remove('anim'); }, 700);

  /* Menu mobile */
  var burger = document.querySelector('.burger');
  var drawer = document.querySelector('.drawer');
  function toggle(force){
    var open = force !== undefined ? force : !drawer.classList.contains('open');
    drawer.classList.toggle('open', open);
    burger.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (burger) burger.addEventListener('click', function(){ toggle(); });
  if (drawer) drawer.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ toggle(false); }); });
  if (drawer){ var dclose = drawer.querySelector('[data-drawer-close]'); if (dclose) dclose.addEventListener('click', function(){ toggle(false); }); }
  if (drawer) document.addEventListener('keydown', function(e){ if (e.key === 'Escape') toggle(false); });

  /* Hero carrossel (Netflix) */
  (function(){
    var hero = document.querySelector('[data-hero]');
    if (!hero) return;
    var slides = [].slice.call(hero.querySelectorAll('.hslide'));
    if (slides.length < 2) return;
    var dotsWrap = hero.querySelector('[data-hdots]');
    var i = 0, timer = null, DUR = 5500;
    var dots = slides.map(function(_, n){
      var b = document.createElement('button');
      b.setAttribute('aria-label', 'Slide ' + (n+1));
      b.addEventListener('click', function(){ go(n, true); });
      dotsWrap.appendChild(b);
      return b;
    });
    function render(){
      slides.forEach(function(s, n){ s.classList.toggle('active', n === i); });
      dots.forEach(function(d, n){ d.classList.toggle('on', n === i); });
    }
    function go(n, manual){ i = (n + slides.length) % slides.length; render(); if (manual) restart(); }
    function next(){ go(i + 1); }
    function prev(){ go(i - 1); }
    function restart(){ if (timer) clearInterval(timer); timer = setInterval(next, DUR); }
    var pn = hero.querySelector('[data-hnext]'); if (pn) pn.addEventListener('click', function(){ go(i+1, true); });
    var pp = hero.querySelector('[data-hprev]'); if (pp) pp.addEventListener('click', function(){ go(i-1, true); });
    hero.addEventListener('mouseenter', function(){ if (timer) clearInterval(timer); });
    hero.addEventListener('mouseleave', restart);
    render(); restart();
  })();

  /* Carrosséis (rails) — controles podem ser irmãos do [data-rail] */
  document.querySelectorAll('[data-rail]').forEach(function(rail){
    var track = rail.querySelector('.rail-track');
    var scope = rail.closest('section') || rail.parentElement;
    var prev = scope.querySelector('[data-prev]');
    var next = scope.querySelector('[data-next]');
    function amt(){
      var card = track.querySelector('*');
      var w = card ? card.getBoundingClientRect().width : track.clientWidth * .8;
      var gap = parseFloat(getComputedStyle(track).columnGap || 20) || 20;
      return (w + gap) * Math.max(1, Math.floor(track.clientWidth / (w + gap)));
    }
    if (prev) prev.addEventListener('click', function(){ track.scrollBy({ left:-amt(), behavior:'smooth' }); });
    if (next) next.addEventListener('click', function(){ track.scrollBy({ left:amt(), behavior:'smooth' }); });
  });

  /* Filtros do catálogo */
  var fbtns = document.querySelectorAll('.filters button');
  var prods = document.querySelectorAll('.grid .pcard');
  fbtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      fbtns.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      var cat = btn.dataset.filter;
      prods.forEach(function(p){
        var show = cat === 'all' || (p.dataset.cat || '').split(' ').indexOf(cat) !== -1;
        p.style.display = show ? '' : 'none';
      });
    });
  });

  /* FAQ */
  document.querySelectorAll('.faq-item').forEach(function(item){
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    q.addEventListener('click', function(){
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function(i){
        i.classList.remove('open'); i.querySelector('.faq-a').style.maxHeight = null;
        var iq = i.querySelector('.faq-q'); if (iq) iq.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen){ item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; q.setAttribute('aria-expanded', 'true'); }
    });
  });

  /* Barra de frete/brinde — aparece após rolar */
  var frete = document.querySelector('.frete');
  if (frete){
    var closed = false;
    var x = frete.querySelector('.x');
    if (x) x.addEventListener('click', function(){ frete.classList.remove('show'); closed = true; });
    window.addEventListener('scroll', function(){
      if (!closed && window.scrollY > 700) frete.classList.add('show');
    }, { passive:true });
  }

  /* Reveal */
  var armed = document.documentElement.classList.contains('anim');
  if (armed && 'IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold:0.1, rootMargin:'0px 0px -6% 0px' });
    document.querySelectorAll('[data-reveal]').forEach(function(el){ io.observe(el); });
    setTimeout(function(){
      document.querySelectorAll('[data-reveal]:not(.in)').forEach(function(el){
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('in');
      });
    }, 1400);
  }

})();
