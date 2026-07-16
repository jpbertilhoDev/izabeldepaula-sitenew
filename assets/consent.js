/* ============================================================
   IZABEL DE PAULA — CONSENTIMENTO DE COOKIES (RGPD / ePrivacy)
   ------------------------------------------------------------
   Porque existe: o site não pode escrever cookies não-essenciais
   (analítica, marketing) antes de a visitante consentir. Hoje ainda
   não há pixels instalados — este ficheiro é a porta que eles vão
   ter de atravessar quando chegarem (GA4, Meta, TikTok).

   Como um pixel futuro se liga a isto — nunca dispara sozinho:

     if (window.IZBConsent && IZBConsent.has('analytics')) initGA4();
     document.addEventListener('izb:consent', function(e){
       if (e.detail.analytics) initGA4();
       if (e.detail.marketing) initMetaPixel();
     });

   Regras que o desenho respeita:
   • Recusar é tão fácil como aceitar — mesmo peso visual, mesmo clique
     (exigência do RGPD e da CNPD; um "Aceitar" grande com um "Recusar"
     escondido é consentimento inválido).
   • Sem pré-seleção: enquanto não houver escolha, nada não-essencial corre.
   • O consentimento caduca aos 12 meses e volta a ser pedido.
   • A escolha é revogável a qualquer momento (link no rodapé).
   ============================================================ */
(function () {
  'use strict';

  var KEY = 'izb_consent';
  var VERSION = 1;
  var MAX_AGE = 365 * 24 * 60 * 60 * 1000; // 12 meses

  /* ---------- estado ---------- */
  function read() {
    try {
      var o = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (!o || o.v !== VERSION) return null;
      if (!o.t || (Date.now() - o.t) > MAX_AGE) return null; // caducou → perguntar de novo
      return o;
    } catch (e) { return null; }
  }

  function write(analytics, marketing) {
    var o = { v: VERSION, t: Date.now(), analytics: !!analytics, marketing: !!marketing };
    try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {}
    try { document.dispatchEvent(new CustomEvent('izb:consent', { detail: o })); }
    catch (e) {
      var ev = document.createEvent('Event'); ev.initEvent('izb:consent', true, true);
      ev.detail = o; document.dispatchEvent(ev);
    }
    return o;
  }

  /* ---------- API pública (é isto que os pixels vão consultar) ---------- */
  window.IZBConsent = {
    has: function (cat) { var o = read(); return !!(o && o[cat]); },
    all: function () { return read(); },
    open: function () { render(true); },
    reset: function () { try { localStorage.removeItem(KEY); } catch (e) {} render(true); }
  };

  /* ---------- banner ---------- */
  var el = null;

  function close() {
    if (!el) return;
    el.classList.remove('on');
    document.documentElement.classList.remove('consent-open');
    var node = el;
    setTimeout(function () { if (node && node.parentNode) node.parentNode.removeChild(node); }, 450);
    el = null;
  }

  function decide(analytics, marketing) { write(analytics, marketing); close(); }

  function render(force) {
    if (el) return;                    // já está no ecrã
    if (!force && read()) return;      // já decidiu e ainda é válido

    el = document.createElement('aside');
    el.className = 'consent';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-live', 'polite');
    el.setAttribute('aria-label', 'Preferências de cookies');
    el.innerHTML =
      '<div class="consent-in">' +
        '<div class="consent-txt">' +
          '<h2 class="consent-h">A sua privacidade</h2>' +
          '<p>Usamos cookies essenciais para o site funcionar — a sacola, por exemplo, não vive sem eles. ' +
          'Gostaríamos ainda de usar cookies de <strong>análise e marketing</strong>, para perceber o que lhe é útil ' +
          'e mostrar-lhe o que faz sentido. Só os usamos se disser que sim. ' +
          '<a href="/politica-privacidade.html">Saiba mais na nossa política</a>.</p>' +
        '</div>' +
        '<div class="consent-btns">' +
          '<button type="button" class="btn btn--ghost consent-no" data-consent-no>Recusar</button>' +
          '<button type="button" class="btn btn--ink consent-yes" data-consent-yes>Aceitar</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(el);
    document.documentElement.classList.add('consent-open');

    el.querySelector('[data-consent-no]').addEventListener('click', function () { decide(false, false); });
    el.querySelector('[data-consent-yes]').addEventListener('click', function () { decide(true, true); });

    /* Entrada: forçar o reflow e só depois pôr a classe — assim o browser
       regista o estado inicial (fora do ecrã) e a transição corre.
       Deliberadamente SEM requestAnimationFrame: num separador em segundo
       plano o rAF nunca dispara, e o banner ficaria invisível para sempre.
       Consentimento não pode depender de uma animação para existir. */
    void el.offsetHeight;
    el.classList.add('on');
  }

  /* link "Definições de cookies" (rodapé) — o direito de mudar de ideias */
  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-consent-open]');
    if (t) { e.preventDefault(); window.IZBConsent.open(); }
  });

  /* mostra o banner assim que o corpo existir, sem estorvar o first paint */
  function boot() { if (!read()) setTimeout(function () { render(false); }, 900); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

})();
