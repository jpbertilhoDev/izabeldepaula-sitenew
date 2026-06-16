/* ============================================================
   IZABEL DE PAULA — Avaliações de clientes (Google) na PDP
   Avaliações reais de clientes, exibidas ABAIXO do antes/depois em cada
   página de produto (não na home). Estilo inspirado em lojas de referência
   (usethabeauty): resumo de avaliação + cartões.
   Conformidade UE: são TESTEMUNHOS de clientes (não claims da marca);
   disclaimer de variabilidade incluído. Texto curado/limpo a partir das
   avaliações públicas do Google do negócio Izabel de Paula.
   ============================================================ */
(function () {
  'use strict';
  var IZB = window.IZB || {};
  var esc = IZB.esc || function (s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  };

  // Avaliações reais de clientes (Google) — todas 5★ (avaliações positivas exibidas).
  // `reply` (opcional) = resposta pública do proprietário.
  var REVIEWS = [
    { n: 'Teresa Magueija', when: 'há 1 ano', text: 'Tenho usado os produtos da Izabel — o Creme Barriga Fit, o Levanta Bumbum, o Leg Fit Express, o Sublime Lush, as cápsulas, o Detox, o Stop Gordura e o Pernas Leves — e obtive resultados.', reply: 'Teresa, que testemunho tão especial 💛 Quando o corpo é trabalhado com estratégia e consistência, os resultados aparecem.' },
    { n: 'Arlete Jesus', when: 'há 1 ano', text: 'Comecei a tomar as ampolas Depur e o Barriga Fit e estou realmente surpreendida — sinto-me com energia e mais desinchada. É para continuar. Obrigada, Izabel!', reply: 'Muito obrigada pelo seu feedback 💛' },
    { n: 'Sandra Lourenço', when: 'há 1 ano', text: 'Estou maravilhada com os produtos da Izabel. Já tinha experimentado vários suplementos e detox que nunca funcionaram. Os da Izabel são muito drenantes e ajudam imenso na retenção. Recomendo mesmo! 😍', reply: 'Sandra, muito obrigada pelas suas palavras 🤍 Fico mesmo feliz por ver esses resultados.' },
    { n: 'Clara Oliveira', when: 'há 1 ano', text: 'Produtos excelentes, 5 estrelas! Sofria com a sensação de pernas cansadas, pesadas e retenção de líquidos. Desde que comecei a usar os produtos da Izabel — cápsulas e creme Pernas Leves — sinto uma grande diferença.' },
    { n: 'Ana Teixeira', when: 'há 1 ano', text: 'Adoro as partilhas, ajudam muitas mulheres que às vezes não sabem como começar. Tomei três meses o Detox e o Pernas Leves e notei uma diferença enorme. Recomendo a todas! ☺️' },
    { n: 'Anderson Costa', when: 'há 6 meses', text: 'Em pouquíssimo tempo, com as dicas e os produtos, é impressionante — já consigo ver e sentir o resultado. Super indico.' },
    { n: 'Tracy Canto', when: 'há 7 meses', text: 'Estou a fazer o kit da Izabel de Paula, o desafio, e estou a adorar. Aconselho vivamente! Produtos naturais e com ótimos resultados. 🙏💪🥰', reply: 'Que orgulho! Muito obrigada pelo seu carinho 💛' },
    { n: 'Superwoman', when: 'há 6 meses', text: 'Os produtos são todos naturais e pensados nos problemas do dia a dia. Para além de tudo, existe uma honestidade e um cuidado que hoje em dia são cada vez mais raros. Parabéns, Izabel!' },
    { n: 'Sara Neves Quaresma', when: 'há 1 ano', text: 'Os produtos da Izabel são fantásticos e chegam super rápido! Recomendo muito. Além da pessoa que a Izabel é — uma querida! Quem comprar os seus produtos não se vai decepcionar.' },
    { n: 'Ana Milho', when: 'há 1 ano', text: 'Adoro os produtos, são excelentes. Devem experimentar, não se vão arrepender. A Izabel é muito profissional e atenciosa. Obrigada! 💖', reply: 'Ana querida, muito obrigada 🤍' },
    { n: 'Miriam Marques', when: 'há 1 ano', text: 'Izabel de Paula é um verdadeiro Património de body expertise. Mais do que uma especialista, é uma inspiração no auto-cuidado e na autoestima. Os produtos são de uma qualidade única, com resultados visíveis. Altamente recomendável!' },
    { n: 'Fátima Inácio Maia', when: 'há 8 meses', text: 'Aconselho vivamente tudo, desde os suplementos até seguir as dicas diárias que este ser humano nos dá, de coração cheio de amor e partilha.' },
    { n: 'Daniela Lima', when: 'há 1 ano', text: 'Sem palavras para tanto profissionalismo, mas, acima de tudo, o lado humano. A preocupação com o bem-estar do próximo é genuína — o objetivo não é só vender produtos; há acompanhamento e preocupação com o nosso sucesso.' },
    { n: 'LISERAL', when: 'há 10 meses', text: 'Experiência ótima. Estou super feliz com os resultados. A Izabel é uma excelente profissional e um ser humano extraordinário. Muita gratidão.' },
    { n: 'Carla Sousa', when: 'há 1 ano', text: 'Se querem resultados, encontraram o local certo. Sigam as recomendações da Izabel de Paula e vão gostar de investir em vocês. Espaço incrível e uma equipa maravilhosa. 🩵' },
    { n: 'Ana Severino', when: 'há 1 ano', text: 'Conheci a Izabel em 2018 e desde aí fiquei cliente assídua. Os produtos e tratamentos ajudam-me a evitar a flacidez e a celulite. A simpatia e o profissionalismo fazem a diferença. Experimentem!' },
    { n: 'Célia Ferreira Ruivo', when: 'há 8 meses', text: 'Excelente profissional. Com o método Izabel de Paula consegui alcançar o meu objetivo. A Izabel é extraordinária, sempre atenciosa e preocupada. Adoro-a! 💕' },
    { n: 'Elisa Guerreiro Antunes', when: 'há 7 meses', text: 'Top, top, top! Estou a adorar conhecer a Izabel de Paula. Mega simpática, meiga e passa imensa segurança.' }
  ];

  function starRow() {
    return '<span class="rev-stars" role="img" aria-label="5 de 5 estrelas">★★★★★</span>';
  }

  function initial(name) {
    return (String(name || '?').trim().charAt(0) || '?').toUpperCase();
  }

  function cardHTML(r) {
    var reply = r.reply
      ? '<div class="rev-reply"><span class="rev-reply-by">Resposta de Izabel de Paula</span><p>' + esc(r.reply) + '</p></div>'
      : '';
    return '<article class="rev-card">'
      + starRow()
      + '<p class="rev-text">' + esc(r.text) + '</p>'
      + reply
      + '<footer class="rev-who">'
      + '<span class="rev-av" aria-hidden="true">' + esc(initial(r.n)) + '</span>'
      + '<span class="rev-meta">'
      + '<span class="rev-name">' + esc(r.n) + '</span>'
      + '<span class="rev-sub">' + esc(r.when) + ' · <span class="rev-src">Google</span></span>'
      + '</span></footer></article>';
  }

  function fmtRating(p) {
    var r = (p && p.rating) ? String(p.rating) : '4.9';
    return r.replace('.', ',');
  }

  // Bloco da página de produto (abaixo do antes/depois). p = produto atual.
  function pdpReviewsHTML(p) {
    var cards = REVIEWS.map(cardHTML).join('');
    return '<section class="pdp-reviews" aria-label="Avaliações de clientes">'
      + '<div class="rev-head">'
      + '<span class="kicker">Avaliações</span>'
      + '<h2 class="proof-title">O que dizem as <span class="it gold">nossas clientes</span>.</h2>'
      + '<div class="rev-summary">'
      + '<span class="rev-score">' + fmtRating(p) + '</span>'
      + '<span class="rev-score-col">' + starRow()
      + '<span class="rev-count">' + REVIEWS.length + '+ avaliações reais · via Google</span></span>'
      + '</div></div>'
      + '<div class="rev-grid" data-reviews-grid>' + cards + '</div>'
      + '<div class="rev-more-wrap"><button class="btn btn--line rev-more" type="button" data-reviews-more aria-expanded="false">Ver todas as avaliações</button></div>'
      + '<p class="proof-disclaimer">Avaliações reais de clientes Izabel de Paula. Os resultados podem variar de pessoa para pessoa.</p>'
      + '</section>';
  }

  window.IZBREVIEWS = { data: REVIEWS, cardHTML: cardHTML, pdpReviewsHTML: pdpReviewsHTML };

  // "Ver todas" — listener delegado (a PDP é renderizada dinamicamente por product.js)
  document.addEventListener('click', function (e) {
    var t = e.target;
    var btn = t && t.closest ? t.closest('[data-reviews-more]') : null;
    if (!btn) return;
    var sec = btn.closest('.pdp-reviews');
    if (!sec) return;
    var open = sec.classList.toggle('pdp-reviews--all');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.textContent = open ? 'Ver menos avaliações' : 'Ver todas as avaliações';
  });
})();
