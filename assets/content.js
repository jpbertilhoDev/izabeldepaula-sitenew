/* ============================================================
   IZABEL DE PAULA — Conteúdo estruturado da página de produto
   Template fixo de blocos (muda só o conteúdo por produto):
   1) Abertura  2) Resultados esperados  3) Antes/Depois (proof.js)
   4) Modo de uso  5) Precauções  6) Contém ativos  7) Selo de confiança
   Redação em conformidade UE (cosméticos / suplementos): claims de
   aspeto, firmeza, leveza, conforto e bem-estar. Sem promessas médicas
   nem de emagrecimento garantido. Ativos e modo de uso reais da marca.
   ============================================================ */
(function () {
  'use strict';

  // precauções reutilizáveis
  var CT = [
    'Apenas para uso externo.',
    'Evite o contacto com os olhos e mucosas; não aplicar sobre pele lesionada ou irritada.',
    'Em caso de irritação ou desconforto, suspenda a utilização.',
    'Não recomendado durante a gravidez ou amamentação sem aconselhamento profissional.',
    'Manter fora do alcance das crianças.'
  ];
  var THERMO = ['Pode causar leve sensação de calor e vermelhidão temporária — é normal na fórmula termogénica.'];
  var COLD = ['Evite aplicar sobre pele exposta ao sol intenso ou após depilação recente.'];
  var CS = [
    'Suplemento alimentar: não substitui uma alimentação variada e equilibrada nem um estilo de vida saudável.',
    'Não exceder a dose diária recomendada.',
    'Não recomendado durante a gravidez, amamentação ou a menores de 18 anos.',
    'Em caso de medicação ou condição de saúde, consulte o seu médico ou farmacêutico.',
    'Manter fora do alcance das crianças. Conservar em local fresco e seco.'
  ];

  var CONTENT = {
    'creme-barriga-fit': {
      opening: 'O Creme Barriga Fit® é um creme corporal de toque aveludado, criado para a zona abdominal — onde a gordura localizada e a flacidez mais incomodam. A fórmula termogénica aquece suavemente a pele durante a massagem, num gesto reconfortante de autocuidado. Com uso contínuo, ajuda a melhorar o aspeto da pele e a deixar a barriga com toque mais firme e liso.',
      resultsTime: 'Resultados percebidos a partir de 21 dias de uso contínuo.',
      howto: [
        'Após o banho, com a pele limpa e seca, aplique uma quantidade generosa na zona abdominal.',
        'Massaje em movimentos circulares ascendentes durante 2 a 3 minutos, com pressão moderada.',
        'Deixe absorver totalmente antes de vestir.',
        'Use 1 a 2 vezes por dia para um cuidado contínuo.'
      ],
      cautions: CT.concat(THERMO),
      actives: [
        { name: 'Cafeína', fn: 'ajuda a estimular a pele e a realçar o aspeto firme.' },
        { name: 'Pimenta', fn: 'efeito termogénico que aquece e ativa a massagem.' },
        { name: 'Canela', fn: 'complementa a sensação de calor e conforto.' },
        { name: 'Manteiga de Karité', fn: 'nutre e suaviza a pele.' },
        { name: 'Manteiga de Manga', fn: 'hidrata e deixa a pele macia.' }
      ]
    },
    'sublime-lush': {
      opening: 'O Body Cream Sublime Lush é um creme corporal de hidratação profunda com óleo de Sacha Inchi, rico em ómegas. Funde-se na pele num toque sedoso, sem oleosidade, devolvendo conforto e maciez imediatos. Ideal para peles secas ou sensíveis que pedem nutrição diária, deixa a pele mais lisa, nutrida e luminosa.',
      resultsTime: 'Conforto imediato; pele visivelmente mais nutrida a partir de 14 dias de uso contínuo.',
      howto: [
        'Aplique sobre a pele limpa, de preferência ainda húmida após o banho.',
        'Massaje suavemente em todo o corpo até completa absorção.',
        'Use diariamente; para hidratação extra, aplique de manhã e à noite.'
      ],
      cautions: CT,
      actives: [
        { name: 'Óleo de Sacha Inchi', fn: 'rico em ómegas 3, 6 e 9; nutre e ajuda a proteger a pele.' },
        { name: 'Ativos antioxidantes', fn: 'ajudam a manter a pele com aspeto saudável e luminoso.' }
      ]
    },
    'leg-fit-express': {
      opening: 'O Gel Leg Fit Express® é um gel de efeito frio imediato, pensado para pernas cansadas e pesadas e para o aspeto da celulite. Ao aplicar, refresca e proporciona uma sensação drenante de alívio e leveza. Com uso contínuo, ajuda a melhorar o aspeto da pele, deixando as pernas com toque mais firme e liso.',
      resultsTime: 'Alívio e leveza desde a primeira aplicação; aspeto da pele melhora a partir de 21 dias de uso contínuo.',
      howto: [
        'À noite, após o banho, aplique uma quantidade generosa nas pernas.',
        'Massaje de baixo para cima (movimentos ascendentes) até completa absorção.',
        'Sinta o efeito frio drenante.',
        'Para potenciar, combine com as cápsulas Leg Fit® Pernas Leves.'
      ],
      cautions: CT.concat(COLD),
      actives: [
        { name: 'Mentol', fn: 'efeito frio refrescante e sensação de alívio.' },
        { name: 'Aloé Vera', fn: 'acalma e hidrata a pele.' },
        { name: 'Ácido Hialurónico', fn: 'ajuda a manter a pele hidratada.' },
        { name: 'Centella Asiática', fn: 'apoia o aspeto firme e uniforme da pele.' },
        { name: 'Castanha da Índia', fn: 'associada à sensação de leveza nas pernas.' }
      ]
    },
    'levanta-bumbum': {
      opening: 'O Gel Levanta Bumbum® é um gel corporal termogénico para glúteos, coxas e abdómen. Ao massajar, aquece suavemente a pele numa sensação ativadora — ideal no momento do autocuidado. Com uso contínuo, ajuda a melhorar o aspeto da celulite e da flacidez, deixando a pele com toque mais firme e elástico.',
      resultsTime: 'Resultados percebidos a partir de 28 dias de uso contínuo.',
      howto: [
        'Após o banho, aplique nos glúteos, coxas e abdómen.',
        'Massaje com movimentos circulares vigorosos até absorver.',
        'Sinta o efeito quente termogénico.',
        'Use diariamente para um cuidado contínuo.'
      ],
      cautions: CT.concat(THERMO),
      actives: [
        { name: 'Cafeína', fn: 'ajuda a realçar o aspeto firme da pele.' },
        { name: 'L-Carnitina', fn: 'acompanha o cuidado do contorno corporal.' },
        { name: 'Pimenta Negra', fn: 'efeito termogénico ativador.' },
        { name: 'Canela', fn: 'sensação de calor e conforto.' },
        { name: 'Centella Asiática', fn: 'apoia o aspeto firme e elástico da pele.' }
      ]
    },
    'stop-gordura': {
      opening: 'Barriga Fit® Stop Gordura é um suplemento alimentar em cápsulas com uma fórmula natural premium. Combina probióticos e ativos botânicos que acompanham a tua rotina de bem-estar, apoiando o conforto digestivo e a sensação de leveza no dia a dia. Um gesto simples para te sentires mais leve, a par de uma alimentação equilibrada.',
      resultsTime: 'Sensação de leveza percebida a partir de 2 a 3 semanas de uso contínuo.',
      howto: [
        '1 cápsula 20 a 30 minutos antes do almoço, com um copo de água.',
        '1 cápsula 20 a 30 minutos antes do jantar.',
        'Beba bastante água ao longo do dia.',
        '1 embalagem corresponde a cerca de 25 dias; para uma rotina contínua, recomenda-se 2 a 3 embalagens.'
      ],
      cautions: CS,
      actives: [
        { name: 'Probióticos', fn: 'ajudam a equilibrar a flora intestinal e o conforto digestivo.' },
        { name: 'Cúrcuma', fn: 'planta com propriedades antioxidantes.' },
        { name: 'Café Verde', fn: 'fonte natural de ácido clorogénico.' },
        { name: 'Pimenta Preta', fn: 'ajuda a potenciar a absorção dos nutrientes.' },
        { name: 'Crómio', fn: 'contribui para o metabolismo normal dos macronutrientes.' }
      ]
    },
    'detox-liquido': {
      opening: 'Barriga Fit® Detox é um drenante líquido de origem natural, com uma seleção de plantas tradicionalmente associadas ao bem-estar e à sensação de leveza. Ajuda a manter a hidratação e o cuidado de dentro para fora, contribuindo para a sensação de menos inchaço e mais leveza ao longo do dia.',
      resultsTime: 'Sensação de leveza percebida a partir de 2 semanas de uso contínuo.',
      howto: [
        'Uso diário: dilua 20 ml em 1 a 1,5 L de água e beba ao longo do dia.',
        'Ação intensiva: tome 20 ml diluído num copo de água, em jejum.',
        '1 frasco corresponde a cerca de 25 dias de utilização.'
      ],
      cautions: CS,
      actives: [
        { name: 'Cardo Mariano', fn: 'planta tradicionalmente associada ao bem-estar do fígado.' },
        { name: 'Ortosifão (Chá de Java)', fn: 'associado à drenagem e à sensação de leveza.' },
        { name: 'Bétula', fn: 'tradicionalmente ligada à sensação de leveza.' },
        { name: 'Boldo', fn: 'associado ao conforto digestivo.' },
        { name: 'Salsa & Aipo', fn: 'plantas ricas em água que apoiam a hidratação.' }
      ]
    },
    'pernas-leves': {
      opening: 'Leg Fit® Pernas Leves é um suplemento em cápsulas com ativos botânicos tradicionalmente associados ao conforto das pernas e à sensação de leveza. Pensado para quem passa muito tempo de pé ou sentada, acompanha a rotina de bem-estar das pernas, a par da hidratação e do movimento.',
      resultsTime: 'Sensação de leveza percebida a partir de 3 semanas de uso contínuo.',
      howto: [
        '1 cápsula ao pequeno-almoço, com um copo de água.',
        '1 cápsula ao jantar, com um copo de água.',
        '1 embalagem corresponde a cerca de 30 dias; recomenda-se 2 a 3 embalagens consecutivas para uma rotina contínua.'
      ],
      cautions: CS,
      actives: [
        { name: 'Castanha da Índia', fn: 'associada ao conforto e à leveza das pernas.' },
        { name: 'Centella Asiática', fn: 'apoia o aspeto firme da pele.' },
        { name: 'Gilbardeira', fn: 'tradicionalmente ligada ao bem-estar das pernas.' },
        { name: 'Vitamina C', fn: 'contribui para a formação normal de colagénio.' },
        { name: 'Meliloto', fn: 'associado à sensação de leveza.' }
      ]
    },
    'depur': {
      opening: 'Barriga Fit Depur é um detox em ampolas de toma prática, com plantas tradicionalmente associadas ao bem-estar do fígado e à sensação de leveza. Ideal como gesto inicial de uma rotina de cuidado de dentro para fora, ajudando a sentires-te mais leve e desinchada no dia a dia.',
      resultsTime: 'Sensação de leveza percebida a partir de 15 dias de uso contínuo.',
      howto: [
        '1 ampola diluída em meio copo de água, de preferência em jejum.',
        'Recomendado, sobretudo, nos primeiros 15 dias da rotina.',
        'Beba bastante água ao longo do dia.'
      ],
      cautions: CS,
      actives: [
        { name: 'Alcachofra', fn: 'associada ao conforto digestivo.' },
        { name: 'Cardo Mariano', fn: 'tradicionalmente ligado ao bem-estar do fígado.' },
        { name: 'Reishi', fn: 'cogumelo com propriedades antioxidantes.' }
      ]
    },

    /* ---------- KITS (composição = produtos incluídos) ---------- */
    'kit-stop-gordura': {
      opening: 'O Kit Stop Gordura® reúne o ritual completo da barriga numa só rotina: cuidado interno e externo a trabalhar em conjunto. Combina o detox líquido, as cápsulas Stop Gordura e o creme corporal, para uma sensação diária de leveza e uma pele com aspeto mais firme e liso na zona abdominal.',
      resultsTime: 'Resultados percebidos a partir de 3 a 4 semanas de uso contínuo do ritual.',
      howto: [
        'Manhã (em jejum): dilua 20 ml de Detox em 1 a 1,5 L de água e beba ao longo do dia.',
        'Antes do almoço e do jantar: 1 cápsula Stop Gordura, com água.',
        'À noite, após o banho: aplique o Creme Barriga Fit em massagem ascendente.'
      ],
      cautions: CS.concat(CT),
      activesTitle: 'O que inclui',
      actives: [
        { name: 'Barriga Fit Detox', fn: 'drenante líquido — sensação de leveza.' },
        { name: 'Stop Gordura (cápsulas)', fn: 'apoio ao conforto digestivo.' },
        { name: 'Creme Barriga Fit', fn: 'creme termogénico — aspeto firme da pele.' }
      ]
    },
    'kit-seca-barriga': {
      opening: 'O Kit Seca Barriga® reúne dois cuidados que se complementam: as cápsulas Barriga Fit® Stop Gordura e o detox hepático Barriga Fit Depur. Uma rotina de bem-estar de dentro para fora — apoia o conforto digestivo, a sensação de leveza e o cuidado do fígado, a par de uma alimentação equilibrada e de hábitos saudáveis.',
      resultsTime: 'Sensação de leveza percebida a partir de 2 a 3 semanas de uso contínuo do ritual.',
      howto: [
        'Depur (15 dias iniciais): 1 ampola por dia, agitada e diluída em água, 15 a 20 minutos antes do pequeno-almoço.',
        'Stop Gordura: 1 cápsula 20 a 30 minutos antes do almoço e 1 antes do jantar, com um copo de água.',
        'Beba 1,5 a 2 L de água ao longo do dia.'
      ],
      cautions: CS,
      activesTitle: 'O que inclui',
      actives: [
        { name: 'Barriga Fit Stop Gordura (50 cápsulas)', fn: 'apoio ao conforto digestivo e à sensação de leveza.' },
        { name: 'Barriga Fit Depur (15 ampolas)', fn: 'detox de toma prática — bem-estar do fígado e leveza.' }
      ]
    },
    'kit-detox-stop': {
      opening: 'O Kit Detox + Stop Gordura junta o drenante líquido às cápsulas Stop Gordura, numa dupla de cuidado interno para a sensação de leveza e conforto digestivo no dia a dia. Uma rotina simples para começar de dentro para fora.',
      resultsTime: 'Sensação de leveza percebida a partir de 2 a 3 semanas de uso contínuo.',
      howto: [
        'Stop Gordura: 1 cápsula antes do almoço e 1 antes do jantar, com água.',
        'Detox Líquido: 20 ml diluído em 1 a 1,5 L de água ao longo do dia (ou em jejum para ação intensiva).'
      ],
      cautions: CS,
      activesTitle: 'O que inclui',
      actives: [
        { name: 'Barriga Fit Detox', fn: 'drenante líquido — sensação de leveza.' },
        { name: 'Stop Gordura (cápsulas)', fn: 'apoio ao conforto digestivo.' }
      ]
    },
    'kit-fire': {
      opening: 'O Kit Fire é a rotina intensiva de bem-estar da Izabel de Paula, reunindo o detox em ampolas, as cápsulas Pernas Leves e as cápsulas Stop Gordura. Um ritual de cuidado de dentro para fora, pensado para a sensação de leveza e conforto ao longo do dia.',
      resultsTime: 'Resultados percebidos a partir de 3 a 4 semanas de uso contínuo do ritual.',
      howto: [
        'Manhã (em jejum): 1 ampola de Barriga Fit Depur diluída em meio copo de água (sobretudo nos primeiros 15 dias) + 1 cápsula Pernas Leves.',
        'Antes do almoço e do jantar: 1 cápsula Stop Gordura, com água.',
        'Beba bastante água ao longo do dia.'
      ],
      cautions: CS,
      activesTitle: 'O que inclui',
      actives: [
        { name: 'Barriga Fit Depur (ampolas)', fn: 'detox — sensação de leveza.' },
        { name: 'Leg Fit Pernas Leves', fn: 'conforto e leveza das pernas.' },
        { name: 'Stop Gordura (cápsulas)', fn: 'apoio ao conforto digestivo.' }
      ]
    },
    'kit-celulite-lipedema': {
      opening: 'O Kit Stop Lipedema & Celulite reúne cuidado externo e interno para as pernas e o aspeto da celulite: o gel de efeito frio, o drenante líquido e as cápsulas Pernas Leves. Uma rotina de bem-estar para a sensação de leveza e uma pele com toque mais firme e liso.',
      resultsTime: 'Resultados percebidos a partir de 4 semanas de uso contínuo do ritual.',
      howto: [
        'À noite: aplique o Gel Leg Fit Express nas pernas, em massagem ascendente.',
        'Cápsulas Pernas Leves: 1 ao pequeno-almoço e 1 ao jantar, com água.',
        'Detox Líquido: 20 ml diluído em água ao longo do dia.'
      ],
      cautions: CS.concat(CT, COLD),
      activesTitle: 'O que inclui',
      actives: [
        { name: 'Gel Leg Fit Express', fn: 'gel de efeito frio — aspeto da celulite.' },
        { name: 'Barriga Fit Detox', fn: 'drenante líquido — sensação de leveza.' },
        { name: 'Leg Fit Pernas Leves', fn: 'conforto e leveza das pernas.' }
      ]
    },
    'kit-verao': {
      opening: 'O Kit Verão® é o ritual completo de bem-estar para a estação: 4 produtos premium que unem drenagem, leveza das pernas e cuidado da firmeza da pele. Uma rotina de autocuidado de dentro para fora, para te sentires leve e confiante.',
      resultsTime: 'Resultados percebidos a partir de 3 a 4 semanas de uso contínuo do ritual.',
      howto: [
        'Manhã: 1 cápsula Pernas Leves + 30 ml de Detox Líquido diluído em água, em jejum.',
        'Antes das refeições: cápsulas conforme indicação de cada produto.',
        'À noite: aplique o creme/gel corporal em massagem ascendente.'
      ],
      cautions: CS.concat(CT),
      activesTitle: 'O que inclui',
      actives: [
        { name: 'Barriga Fit Detox', fn: 'drenante líquido — sensação de leveza.' },
        { name: 'Leg Fit Pernas Leves', fn: 'conforto e leveza das pernas.' },
        { name: 'Stop Gordura (cápsulas)', fn: 'apoio ao conforto digestivo.' },
        { name: 'Creme corporal', fn: 'cuidado da firmeza e do aspeto da pele.' }
      ]
    },
    'kit-renovacao-total': {
      opening: 'O Kit Renovação Total é o ritual mais completo da Izabel de Paula, combinando detox, suplementos e cosméticos numa rotina integrada de autocuidado. Pensado para quem quer cuidar do corpo de dentro para fora, com foco na sensação de leveza e no aspeto firme e cuidado da pele.',
      resultsTime: 'Resultados percebidos a partir de 4 a 6 semanas de uso contínuo do ritual.',
      howto: [
        'Siga a rotina interna (detox e suplementos) conforme a indicação de cada produto.',
        'Aplique os cosméticos corporais após o banho, em massagem ascendente.',
        'Mantenha boa hidratação e uma rotina constante ao longo das semanas.'
      ],
      cautions: CS.concat(CT),
      activesTitle: 'O que inclui',
      actives: [
        { name: 'Linha Detox', fn: 'cuidado de dentro para fora — sensação de leveza.' },
        { name: 'Suplementos', fn: 'apoio ao conforto e bem-estar diário.' },
        { name: 'Cosméticos corporais', fn: 'cuidado da firmeza e do aspeto da pele.' }
      ]
    }
  };

  var CLOCK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>';
  var SHIELD = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/></svg>';

  function C(p) { return CONTENT[p.slug] || {}; }
  function li(arr) { return arr.map(function (s) { return '<li>' + s + '</li>'; }).join(''); }
  function block(title, body) { return '<section class="ds-block"><h3 class="ds-h">' + title + '</h3>' + body + '</section>'; }

  // Descrição completa para a COLUNA da direita (modelo usethabeauty):
  // Descrição (abertura + resultados esperados) · Modo de uso · Precauções · Contém ativos · selo
  function fullDescriptionHTML(p) {
    var c = C(p), h = '';
    if (c.opening) {
      h += '<section class="ds-block"><h3 class="ds-h">Descrição</h3><p class="ds-lead">' + c.opening + '</p>';
      if (c.resultsTime) h += '<p class="ds-results-line">' + CLOCK + '<span><b>Resultados esperados.</b> ' + c.resultsTime + '</span></p>';
      h += '</section>';
    }
    if (c.howto && c.howto.length) h += block('Modo de uso', '<ol class="ds-steps">' + li(c.howto) + '</ol>');
    if (c.cautions && c.cautions.length) h += block('Precauções', '<ul class="ds-cautions">' + li(c.cautions) + '</ul>');
    if (c.actives && c.actives.length) {
      h += block(c.activesTitle || 'Contém ativos', '<ul class="ds-actives">'
        + c.actives.map(function (a) { return '<li><b>' + a.name + '</b><span>' + a.fn + '</span></li>'; }).join('') + '</ul>');
    }
    var tag = p.cat === 'capsula' ? 'Suplemento alimentar natural' : (p.cat === 'kit' ? 'Cosméticos + suplementos' : 'Uso externo cosmético');
    h += '<div class="ds-trust-line">' + SHIELD + '<span>Dermatologicamente testado · ' + tag + ' · Fabricado em Portugal</span></div>';
    return h;
  }

  window.IZBCONTENT = { data: CONTENT, fullDescriptionHTML: fullDescriptionHTML };
})();
