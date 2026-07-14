# Auditoria de conformidade legal (UE) — copy do site `www.izabeldepaula.com`

**Âmbito:** `index.html`, `produto.html`, `assets/data.js`, `assets/content.js`, `assets/proof.js`, `assets/product.js`, `assets/cart.js` + as 4 páginas legais (só na parte de claims).
**Normas aplicadas:** Reg. (CE) 1924/2006 (art. 10.º, 12.º/b, 20.º/1) · Reg. (UE) 432/2012 · Reg. (CE) 1223/2009 + Reg. (UE) 655/2013 · Dir. 2005/29/CE (Anexo I) transposta pelo DL 57/2008 · Dir. 98/6/CE art. 6.º-A.
**Data:** 13/07/2026

---

## 1. Veredicto

**90 violações: 14 CRÍTICAS, 44 ALTAS, 32 MÉDIAS.** O site **NÃO está em conformidade** e, no estado atual, é publicidade acionável por ASAE/DGAV.

A suspeita confirma-se e é a menor das partes: "emagrecimento natural" está em 6 metatags (`index.html` e `produto.html`), mas o problema grave está mais fundo — **um produto com nome de doença** ("Kit Stop Lipedema & Celulite"), **alegações de função hepática** ("detox hepático", "bem-estar do fígado", catLabel `Detox fígado · ampolas`) e **fotografias antes/depois de cosméticos exibidas como prova nas páginas de suplementos alimentares** (`proof.js`).

O tom editorial ("Não prometemos milagres. Nós ajudamos.") está bem interiorizado nas frases de marca — o que falha é a **camada técnica**: metatags, JSON-LD, `catLabel`, `short`/`blurb` e a lista de "Contém ativos". É exatamente onde ninguém olha e onde o Google indexa.

---

## 2. Tabela de violações

> ⚠️ **A pasta `site-para-cliente/` é um espelho byte-a-byte da raiz** (verificado: `index.html`, `produto.html`, `data.js`, `content.js`, `proof.js` idênticos). **Toda a correção tem de ser aplicada duas vezes**, ou a pasta regenerada a partir da raiz.

### 2.1 CRÍTICO (14)

| Ficheiro:linha | Texto atual | Risco | Norma | Texto novo proposto |
|---|---|---|---|---|
| `index.html`:7,16,22 · `produto.html`:7,16,22 | `Cremes, géis, cápsulas e kits para emagrecimento natural, barriga fit, pernas leves e celulite. Autocuidado premium com método e constância.` | CRÍTICO | 1924/2006 art. 12.º(b) + art. 10.º | `Cremes e géis corporais, cápsulas e kits Izabel de Paula — Barriga Fit®, Leg Fit® e o aspeto da celulite. Body Shaper Expert® há mais de 30 anos.` |
| `index.html`:318 · `data.js`:538 | `"name": "Kit Fire Emagrecimento®"` | CRÍTICO | 1924/2006 art. 12.º(b) | `"name": "Kit Fire®"` |
| `index.html`:586,587 | `<h3>Kit Emagrecimento</h3>` + `alt="Kit Emagrecimento"` + 2 URLs WhatsApp | CRÍTICO | 1924/2006 art. 12.º(b) | `Kit Verão®` (nome já usado em `data.js`:613) |
| `index.html`:656,657 | `alt="Kit Emagrecimento em ritual de autocuidado"` · `<div class="ed">Linha Emagrecimento</div>` | CRÍTICO | 1924/2006 art. 12.º(b) | `alt="Kit Verão® em ritual de autocuidado"` · `Linha Verão` |
| `index.html`:590,591 | `<h3>Kit Emagrecimento Depur</h3>` + `alt` + 2 URLs | CRÍTICO | 1924/2006 art. 12.º(b) | `Kit Renovação Total` (nome já usado em `data.js`:645) |
| `index.html`:598,599 | `<h3>Kit Celulite &amp; Lipedema</h3>` + `alt="Kit Celulite e Lipedema"` + URL | CRÍTICO | 1924/2006 art. 20.º(1) · 1223/2009 art. 20.º | `Kit Pernas Leves & Celulite` |
| `index.html`:672,673 | `alt="Kit Celulite e Lipedema"` · `<h3>Celulite & Lipedema</h3>` | CRÍTICO | idem | `alt="Kit Pernas Leves & Celulite"` · `<h3>Pernas Leves & Celulite</h3>` |
| `data.js`:570 · `content.js`:230,231 | `"name": "Kit Stop Lipedema & Celulite"` | CRÍTICO | **Lipedema é doença.** Alegar tratamento = medicamento. 1924/2006 art. 20.º(1); 655/2013 | `"name": "Kit Pernas Leves & Celulite"` |
| `data.js`:356 | `"catLabel": "Detox fígado · ampolas"` | CRÍTICO | 1924/2006 art. 10.º — função de órgão, não autorizada | `"catLabel": "Suplemento alimentar · 15 ampolas"` |
| `data.js`:431 | `...cápsulas Stop Gordura + detox hepático Depur — para a sensação de leveza e menos inchaço no dia a dia.` | CRÍTICO | idem (+ é a **meta description** da PDP via `product.js`:81) | ver §3 |
| `content.js`:186 | `...e o detox hepático Barriga Fit Depur. ... apoia o conforto digestivo, a sensação de leveza e o cuidado do fígado...` | CRÍTICO | 1924/2006 art. 10.º | ver §3 |
| `content.js`:128,163 | `{ name: 'Cardo Mariano', fn: 'planta tradicionalmente associada ao bem-estar do fígado.' }` | CRÍTICO | Claim *on hold*. O hedge "tradicionalmente associada" **não** salva — art. 10.º proíbe toda a alegação não autorizada | `{ name: 'Cardo Mariano', fn: 'extrato vegetal da fórmula.' }` |
| `content.js`:153 | `...com plantas tradicionalmente associadas ao bem-estar do fígado e à sensação de leveza, ajudando-a a sentir-se mais leve e desinchada no dia a dia.` | CRÍTICO | 1924/2006 art. 10.º | ver §3 |
| `content.js`:197,356 | `fn: 'detox de toma prática — bem-estar do fígado e leveza.'` · `'Plantas associadas ao bem-estar do fígado e à sensação de leveza.'` | CRÍTICO | 1924/2006 art. 10.º | ver §3 |
| `proof.js`:61 | `var order = { creme: [0, 2, 3], capsula: [1, 4, 0], kit: [2, 3, 5] };` | CRÍTICO | **As fotos antes/depois (produzidas por cosméticos) são exibidas nas PDP dos SUPLEMENTOS**, sob o título "Resultados reais de clientes". É alegação de saúde/emagrecimento **por imagem** num género alimentício (1924/2006 art. 2.º(2)(1): "claim" inclui representações pictóricas) **e** atribuição falsa de resultados. | ver §3 — bloquear o bloco quando `p.cat === 'capsula'` |

### 2.2 ALTO (44)

| Ficheiro:linha | Texto atual | Risco | Norma | Texto novo proposto |
|---|---|---|---|---|
| `index.html`:55 · `produto.html`:48 · `politica-privacidade.html`:48 · `trocas-devolucoes.html`:48 | JSON-LD Organization: `...Cosméticos corporais, géis, detox e suplementos para leveza, firmeza e bem-estar.` | ALTO | 1924/2006 art. 10.º(3) — benefício geral não específico sem alegação autorizada que o acompanhe | `...Cosméticos corporais, géis e suplementos alimentares para uma rotina de autocuidado.` |
| `index.html`:452 | `...a unir cosmética corporal, géis, detox e suplementos... leveza, firmeza e bem-estar, sem promessas de milagre e com resultados reais.` | ALTO | art. 10.º(3) | ver §3 |
| `index.html`:715,762 | `...desenvolve cosméticos corporais, géis, detox e suplementos para leveza, firmeza e bem-estar.` (FAQ **e** FAQPage JSON-LD) | ALTO | art. 10.º(3) | `...desenvolve cosméticos corporais, géis e suplementos alimentares para uma rotina de autocuidado.` |
| `index.html`:719,770 | `...rotina de autocuidado para promover leveza, firmeza e bem-estar — com método, constância e naturalidade.` | ALTO | art. 10.º(3) | `...rotina de autocuidado — com método, constância e naturalidade.` |
| `index.html`:851 | `Cremes, géis, cápsulas e kits para uma rotina de leveza, firmeza e bem-estar — com método, constância e resultados reais.` | ALTO | art. 10.º(3) | `Cremes e géis corporais, cápsulas e kits para uma rotina de autocuidado — com método, ritual e constância.` |
| `index.html`:407 | `alt="Creme Barriga Fit — cuida da zona onde a gordura localizada mais incomoda"` | ALTO | 655/2013 — cosmético a alegar ação sobre gordura | `alt="Creme Barriga Fit® — creme corporal para a zona abdominal"` |
| `index.html`:395 | `alt="Barriga Fit Detox — quando o inchaço pesa, a leveza faz diferença"` | ALTO | 1924/2006 art. 10.º | `alt="Barriga Fit® Detox — suplemento alimentar líquido, 500 ml"` |
| `data.js`:8 | `"catLabel": "Creme redutor"` | ALTO | 655/2013 — "redutor" = efeito fisiológico | `"catLabel": "Creme corporal · 250 ml"` |
| `data.js`:487 | `...creme redutor, detox líquido e cápsulas...` | ALTO | 655/2013 | `...creme corporal, suplemento líquido e cápsulas...` |
| `data.js`:273 | `"catLabel": "Detox líquido"` | ALTO | 1924/2006 art. 10.º — "detox" como descrição do efeito | `"catLabel": "Suplemento alimentar líquido"` |
| `data.js`:292,293 | `Detox líquido saboroso... a sua rotina de leveza, com menos sensação de inchaço e mais bem-estar.` | ALTO | art. 10.º (função digestiva). **É a meta description da PDP.** | ver §3 |
| `data.js`:343,344 | `...apoio diário à sensação de pernas leves e descansadas, sem aquele peso ao fim do dia.` | ALTO | art. 10.º — claim venoso *on hold* (castanha-da-índia/gilbardeira) | ver §3 |
| `data.js`:375,376 | `...um cuidado depurativo de dentro para fora...` · `Ampolas depurativas...` | ALTO | art. 10.º | ver §3 |
| `data.js`:540 | `"catLabel": "Depur · Stop Gordura · Drenagem"` | ALTO | art. 10.º — "drenagem" é função fisiológica. **É também factualmente errado**: o kit contém Pernas Leves (`content.js`:224-228) | `"catLabel": "Depur · Stop Gordura · Pernas Leves"` |
| `data.js`:559,560 | `...depur, cápsulas Stop Gordura e drenagem...` | ALTO | art. 10.º | ver §3 |
| `data.js`:615 | `"catLabel": "Detox · Gordura · Pernas · Firmeza"` | ALTO | art. 10.º / art. 12.º(b) | `"catLabel": "Pack 4 produtos · suplementos e creme"` |
| `data.js`:634,635 | `...detox, controlo de gordura, pernas leves e firmeza...` | ALTO | art. 10.º | ver §3 |
| `content.js`:65 | `...proporciona uma sensação drenante de alívio e leveza instantânea.` | ALTO | 655/2013 — **cosmético não pode alegar drenagem** | ver §3 |
| `content.js`:70 | `'Sinta o efeito frio drenante.'` | ALTO | 655/2013 | `'Sinta o efeito frio imediato.'` |
| `content.js`:101 | `...combina probióticos e ativos botânicos... apoiando o conforto digestivo e a sensação de leveza...` | ALTO | art. 10.º | ver §3 |
| `content.js`:111 | `{ name: 'Probióticos', fn: 'ajudam a equilibrar a flora intestinal e o conforto digestivo.' }` | ALTO | art. 10.º | `{ name: 'Culturas vivas', fn: 'presentes na fórmula.' }` |
| `content.js`:112,164 | `'planta com propriedades antioxidantes.'` (Cúrcuma) · `'cogumelo com propriedades antioxidantes.'` (Reishi) | ALTO | art. 10.º — **"antioxidante" genérico é proibido**; só é autorizado para nutrientes específicos | `'extrato botânico da fórmula.'` · `'cogumelo presente na fórmula.'` |
| `content.js`:114 | `{ name: 'Pimenta Preta', fn: 'ajuda a potenciar a absorção dos nutrientes.' }` | ALTO | art. 10.º | `{ name: 'Pimenta Preta', fn: 'extrato botânico da fórmula.' }` |
| `content.js`:119 | `...é um drenante líquido... contribuindo para a sensação de menos inchaço e mais leveza ao longo do dia.` | ALTO | art. 10.º | ver §3 |
| `content.js`:129 | `{ name: 'Ortosifão (Chá de Java)', fn: 'associado à drenagem e à sensação de leveza.' }` | ALTO | art. 10.º — *on hold* | `{ name: 'Ortosifão (Chá de Java)', fn: 'extrato vegetal da fórmula.' }` |
| `content.js`:131,162 | `{ name: 'Boldo', fn: 'associado ao conforto digestivo.' }` · `{ name: 'Alcachofra', fn: 'associada ao conforto digestivo.' }` | ALTO | art. 10.º — *on hold* | `'extrato vegetal da fórmula.'` |
| `content.js`:136 | `...ativos botânicos tradicionalmente associados ao conforto das pernas e à sensação de leveza...` | ALTO | art. 10.º | ver §3 |
| `content.js`:145,147 | `{ name: 'Castanha da Índia', fn: 'associada ao conforto e à leveza das pernas.' }` · `{ name: 'Gilbardeira', fn: 'tradicionalmente ligada ao bem-estar das pernas.' }` | ALTO | art. 10.º — *on hold* (venotónicos) | `'extrato botânico da fórmula.'` |
| `content.js`:146 | `{ name: 'Centella Asiática', fn: 'apoia o aspeto firme da pele.' }` — **num suplemento ingerido** | ALTO | art. 10.º — "aspeto da pele" é claim de cosmético; ingerido, é alegação de saúde não autorizada | `{ name: 'Centella Asiática', fn: 'extrato botânico da fórmula.' }` |
| `content.js`:180,210,242,257 | `{ name: 'Barriga Fit Detox', fn: 'drenante líquido — sensação de leveza.' }` (×4) | ALTO | art. 10.º | `{ name: 'Barriga Fit Detox', fn: 'suplemento alimentar líquido, 500 ml.' }` |
| `content.js`:181,211,227,259 | `{ name: 'Stop Gordura (cápsulas)', fn: 'apoio ao conforto digestivo.' }` (×4) | ALTO | art. 10.º | `{ name: 'Stop Gordura (cápsulas)', fn: 'suplemento alimentar com crómio, 50 cápsulas.' }` |
| `content.js`:196 | `fn: 'apoio ao conforto digestivo e à sensação de leveza.'` | ALTO | art. 10.º | `fn: 'suplemento alimentar com crómio.'` |
| `content.js`:201 | `...junta o drenante líquido... para a sensação de leveza e conforto digestivo no dia a dia.` | ALTO | art. 10.º | ver §3 |
| `content.js`:226,243,258 | `{ name: 'Leg Fit Pernas Leves', fn: 'conforto e leveza das pernas.' }` (×3) | ALTO | art. 10.º | `{ name: 'Leg Fit Pernas Leves', fn: 'suplemento alimentar com vitamina C, 60 cápsulas.' }` |
| `content.js`:247 | `...4 produtos premium que unem drenagem, leveza das pernas e cuidado da firmeza da pele.` | ALTO | art. 10.º | ver §3 |
| `content.js`:304 | `'Dermatologicamente testado · ' + tag + ' · Fabricado em Portugal'` — aplicado a **TODOS** os produtos, **incluindo cápsulas e ampolas** | ALTO | Alegação falsa: **um suplemento alimentar não é "dermatologicamente testado"**. Dir. 2005/29/CE art. 6.º; 655/2013 (veracidade) | ver §3 — condicionar a `p.cat === 'creme'` |
| `content.js`:339 | `'Apoiam o conforto digestivo e a sensação de leveza no dia a dia.'` | ALTO | art. 10.º | ver §3 |
| `content.js`:343,344 | `'Drenante líquido de origem natural, com plantas associadas à leveza.'` · `'Ajuda na sensação de menos inchaço ao longo do dia.'` | ALTO | art. 10.º | ver §3 |
| `content.js`:350,351 | `'Castanha-da-índia e centella associadas ao conforto das pernas.'` · `'Apoiam a sensação de pernas leves e descansadas.'` | ALTO | art. 10.º | ver §3 |
| `content.js`:362 | `'Cuidado de dentro para fora, para mais leveza e menos inchaço.'` | ALTO | art. 10.º | ver §3 |
| `content.js`:379 | `'O kit mais intensivo: depur, cápsulas e drenagem.'` | ALTO | art. 10.º | ver §3 |
| `proof.js`:18 | `caption: 'Barriga com aspecto mais liso e redução da sensação de inchaço.'` — atribuída ao **Creme** Barriga Fit | ALTO | 655/2013 — cosmético a alegar redução de inchaço (efeito fisiológico) | `caption: 'Barriga com aspeto mais liso e pele com toque mais firme.'` |
| `proof.js`:42 · `product.js`:143 | `<span class="ba-client">Cliente verificada ✓</span>` · `<span class="pdp-rate-tx">· avaliação das clientes</span>` (com `★★★★★ 4.9` fixo, sem sistema de avaliações) | ALTO | **Dir. 2005/29/CE Anexo I, n.º 23-B** (DL 57/2008): afirmar que as avaliações são de consumidores reais sem tomar medidas razoáveis de verificação é **proibido em qualquer circunstância**. Se não existe processo de verificação → **CRÍTICO**. | ver §3 |
| `index.html` (13× `class="was"`, 20× `★★★★★`) | `<span class="was">€74,90</span> <span class="now">€54,90</span>` — enquanto `data.js`:283 e o JSON-LD `index.html`:186 dizem **€38,00** | ALTO | Dir. 98/6/CE art. 6.º-A (preço anterior = mais baixo dos 30 dias) + Dir. 2005/29/CE art. 6.º. Os preços do HTML servido **contradizem os do próprio JSON-LD da mesma página**. | ver §3 — regenerar os cards estáticos a partir de `data.js` |

### 2.3 MÉDIO (32)

| Ficheiro:linha | Texto atual | Risco | Norma | Texto novo proposto |
|---|---|---|---|---|
| `index.html`:541,858 · `produto.html`:210 · 3 páginas legais | `Detox &amp; Cápsulas` (filtro + rodapé ×5) | MÉDIO | art. 10.º — ver §5 (zona cinzenta) | `Suplementos &amp; Cápsulas` |
| `index.html`:551 | `<span class="cat">Gel · anticelulite</span>` | MÉDIO | 655/2013 — "anti-" implica ação sobre a condição | `<span class="cat">Gel · aspeto da celulite</span>` |
| `index.html`:569 | `<span class="cat">Detox líquido</span>` | MÉDIO | art. 10.º | `<span class="cat">Suplemento alimentar líquido</span>` |
| `index.html`:591 | `<span class="cat">Kit · depurativo</span>` | MÉDIO | art. 10.º | `<span class="cat">Kit · rotina completa</span>` |
| `index.html`:665 | `<div class="ed">Linha Depurativa</div>` | MÉDIO | art. 10.º | `<div class="ed">Linha Depur</div>` |
| `index.html`:620 | `Leveza já nos primeiros dias; pele com aspeto mais firme e liso com o uso contínuo.` | MÉDIO | art. 10.º — a 2.ª metade está correta; a 1.ª é claim de saúde com prazo | `Um ritual simples de manhã e à noite; pele com aspeto mais firme e liso com o uso contínuo.` |
| `index.html`:398 | `alt="Barriga Fit Stop Gordura — mais controlo para uma rotina sem excessos"` | MÉDIO | art. 10.º | `alt="Barriga Fit® Stop Gordura — suplemento alimentar, 50 cápsulas"` |
| `index.html`:401 | `alt="Barriga Fit Depur — cuida por dentro para sentires diferença por fora"` | MÉDIO | art. 10.º(3) (+ registo PT-BR "sentires") | `alt="Barriga Fit Depur — suplemento alimentar em ampolas bebíveis"` |
| `index.html`:404 | `alt="Leg Fit Express Pernas Leves — para dias em que as pernas pedem alívio"` | MÉDIO | 655/2013 — "alívio" é linguagem terapêutica | `alt="Leg Fit Express® — gel corporal de efeito frio, 250 ml"` |
| `index.html`:410 | `alt="Gel Levanta Bum — cuida da zona que mais revela celulite e flacidez"` | MÉDIO | 655/2013 | `alt="Gel Levanta Bumbum® — gel corporal para o aspeto firme da pele"` |
| `index.html`:631 | `Clientes reais... fotografadas antes e depois... Resultados de uso contínuo — os seus podem variar.` | MÉDIO | O disclaimer existe e está correto, **mas não legaliza a imagem** se o carrossel misturar suplementos (ver CRÍTICO #14) | manter texto; corrigir o **mapeamento** em `proof.js` |
| `index.html`:475 | `plantas drenantes` (secção **comentada**) | MÉDIO | art. 10.º | corrigir **antes** de qualquer reativação |
| `index.html`:424,429,479,480 | `entregamos resultados reais` · `4,9/5 · milhares de clientes` · `Resultados reais, zero milagres` (secções **comentadas**) | MÉDIO | Dir. 2005/29/CE art. 6.º | corrigir **antes** de qualquer reativação |
| `data.js`:236,237 | `...para se sentir mais leve no dia a dia.` · `Cápsulas para apoiar a sua rotina de controlo e bem-estar...` | MÉDIO | art. 10.º(3) | ver §3 |
| `data.js`:410 | `"name": "Kit Seca Barriga®"` | MÉDIO | art. 12.º(b) por implicação — ver §5 | decisão humana (marca registada) |
| `data.js`:679,698 | `"catLabel": "Tratamento intensivo · profissional"` · `um protocolo de tratamento intensivo` | MÉDIO | 655/2013 — "tratamento"/"protocolo" é linguagem clínica | `"catLabel": "Rotina intensiva · pack completo"` · `um programa completo` |
| `content.js`:404 | `'Tratamento intensivo com os cuidados-chave da linha.'` | MÉDIO | 655/2013 | `'Rotina intensiva com os cuidados-chave da linha.'` |
| `content.js`:66 | `'Alívio e leveza desde a primeira aplicação; ...'` | MÉDIO | 655/2013 | `'Sensação de frescura e leveza desde a primeira aplicação; ...'` |
| `content.js`:75 | `{ name: 'Mentol', fn: 'efeito frio refrescante e sensação de alívio.' }` | MÉDIO | 655/2013 | `{ name: 'Mentol', fn: 'efeito frio refrescante e sensação de leveza.' }` |
| `content.js`:79 | `{ name: 'Castanha da Índia', fn: 'associada à sensação de leveza nas pernas.' }` (num cosmético) | MÉDIO | "sensação" é permitida em cosmética, mas a planta é venotónica → implica ação venosa | `{ name: 'Castanha da Índia', fn: 'extrato botânico da fórmula.' }` |
| `content.js`:94 | `{ name: 'L-Carnitina', fn: 'acompanha o cuidado do contorno corporal.' }` | MÉDIO | 655/2013 — cosmético só pode falar do **aspeto** do contorno | `{ name: 'L-Carnitina', fn: 'acompanha o cuidado do aspeto do contorno corporal.' }` |
| `content.js`:43 | `{ name: 'Cafeína', fn: 'ajuda a estimular a pele e a realçar o aspeto firme.' }` | MÉDIO | 655/2013 — "estimular a pele" é vago/fisiológico | `{ name: 'Cafeína', fn: 'ajuda a realçar o aspeto firme da pele.' }` |
| `content.js`:130,132,149 | Bétula `'tradicionalmente ligada à sensação de leveza.'` · Salsa & Aipo `'...que apoiam a hidratação.'` · Meliloto `'associado à sensação de leveza.'` | MÉDIO | art. 10.º — *on hold* | `'extrato vegetal da fórmula.'` (×3) |
| `content.js`:215 | `...pensado para a sensação de leveza e conforto ao longo do dia.` | MÉDIO | art. 10.º | ver §3 |
| `content.js`:264 | `...com foco na sensação de leveza e no aspeto firme e cuidado da pele.` | MÉDIO | art. 10.º | `...com foco no aspeto firme e cuidado da pele.` |
| `content.js`:274,275 | `{ name: 'Linha Detox', fn: 'cuidado de dentro para fora — sensação de leveza.' }` · `{ name: 'Suplementos', fn: 'apoio ao conforto e bem-estar diário.' }` | MÉDIO | art. 10.º(3) | `'suplementos alimentares da linha.'` · `'cápsulas e ampolas da linha.'` |
| `content.js`:303 | `'Suplemento alimentar natural'` | MÉDIO | "natural" é qualificativo não regulado e não substanciável | `'Suplemento alimentar'` |
| `content.js`:34,52,66,84,102,120,137,154,171,187,202,216,232,248,265 | `resultsTime: 'Sensação de leveza percebida a partir de 2 a 3 semanas...'` etc. | MÉDIO | Nos **cosméticos** é admissível **se houver dossiê de substanciação** (655/2013). Nos **suplementos**, cai com a alegação subjacente → **remover a linha** nos 8 slugs de suplemento/kit-de-suplementos | ver §3 |
| `content.js`:391 | `'Pack 4 em 1: detox, gordura, pernas leves e firmeza.'` | MÉDIO | art. 10.º | ver §3 |
| `proof.js`:17 | `caption: 'Pernas com sensação de leveza e contorno mais firme.'` | MÉDIO | 655/2013 | `caption: 'Pernas com sensação de leveza e aspeto do contorno mais firme.'` |
| `proof.js`:21-27 | `awards: [... { name: 'Livro de Reclamações', sub: 'Portugal' } ]` — o Livro de Reclamações é **uma obrigação legal, não uma distinção** | MÉDIO | Dir. 2005/29/CE art. 6.º(1)(c). Código morto hoje (o render usa imagens), mas presente na fonte. | remover a entrada do array |
| `proof.js`:72 | `'Imagine-se aqui. Dê hoje o primeiro passo...'` junto ao antes/depois | MÉDIO | Dir. 2005/29/CE art. 6.º — convida à expectativa do mesmo resultado | `'Comece hoje a sua rotina com a <b>' + esc(p.name) + '</b>.'` |

---

## 3. Correções prontas (procura-e-substitui)

> Aplicar **na raiz E em `site-para-cliente/`**. As strings abaixo são literais e únicas no ficheiro, salvo indicação em contrário.

### 3.1 `index.html` + `produto.html` — metatags (CRÍTICO #1)

Substituir nas **6** ocorrências (`index.html`:7,16,22 e `produto.html`:7,16,22):

```
ANTES
Cremes, géis, cápsulas e kits para emagrecimento natural, barriga fit, pernas leves e celulite. Autocuidado premium com método e constância.

DEPOIS
Cremes e géis corporais, cápsulas e kits Izabel de Paula — Barriga Fit®, Leg Fit® e o aspeto da celulite. Body Shaper Expert® há mais de 30 anos.
```

### 3.2 JSON-LD Organization (ALTO) — `index.html`:55, `produto.html`:48, `politica-privacidade.html`:48, `trocas-devolucoes.html`:48

```
ANTES
"description": "Izabel de Paula® — Body Shaper Expert, pioneira em Portugal, com mais de 30 anos de experiência e método próprio e patenteado. Cosméticos corporais, géis, detox e suplementos para leveza, firmeza e bem-estar.",

DEPOIS
"description": "Izabel de Paula® — Body Shaper Expert, pioneira em Portugal, com mais de 30 anos de experiência e método próprio e patenteado. Cosméticos corporais, géis e suplementos alimentares para uma rotina de autocuidado.",
```

### 3.3 `index.html` — JSON-LD ItemList (CRÍTICO #2)

```
ANTES
            "name": "Kit Fire Emagrecimento®",

DEPOIS
            "name": "Kit Fire®",
```

### 3.4 `index.html` — alt do hero (ALTO/MÉDIO)

```
ANTES
alt="Barriga Fit Detox — quando o inchaço pesa, a leveza faz diferença"
DEPOIS
alt="Barriga Fit® Detox — suplemento alimentar líquido, 500 ml"
```
```
ANTES
alt="Barriga Fit Stop Gordura — mais controlo para uma rotina sem excessos"
DEPOIS
alt="Barriga Fit® Stop Gordura — suplemento alimentar, 50 cápsulas"
```
```
ANTES
alt="Barriga Fit Depur — cuida por dentro para sentires diferença por fora"
DEPOIS
alt="Barriga Fit Depur — suplemento alimentar em ampolas bebíveis"
```
```
ANTES
alt="Leg Fit Express Pernas Leves — para dias em que as pernas pedem alívio"
DEPOIS
alt="Leg Fit Express® — gel corporal de efeito frio, 250 ml"
```
```
ANTES
alt="Creme Barriga Fit — cuida da zona onde a gordura localizada mais incomoda"
DEPOIS
alt="Creme Barriga Fit® — creme corporal para a zona abdominal"
```
```
ANTES
alt="Gel Levanta Bum — cuida da zona que mais revela celulite e flacidez"
DEPOIS
alt="Gel Levanta Bumbum® — gel corporal para o aspeto firme da pele"
```

### 3.5 `index.html` — intro-lede (ALTO)

```
ANTES
      <p class="intro-lede">A Izabel de Paula é pioneira do conceito <strong>Body Shaper</strong> em Portugal — mais de 30 anos a unir cosmética corporal, géis, detox e suplementos num método próprio e patenteado. Uma rotina pensada para si: <strong>leveza, firmeza e bem-estar</strong>, sem promessas de milagre e com resultados reais. Envios para toda a Europa.</p>

DEPOIS
      <p class="intro-lede">A Izabel de Paula é pioneira do conceito <strong>Body Shaper</strong> em Portugal — mais de 30 anos a unir cosmética corporal, géis e suplementos alimentares num método próprio e patenteado. Uma rotina pensada para si, com <strong>método, ritual e constância</strong>. Não prometemos milagres: ajudamos. Envios para toda a Europa.</p>
```

### 3.6 `index.html` — filtros e rodapé (MÉDIO)

```
ANTES
        <button data-filter="capsula">Detox &amp; Cápsulas</button>
DEPOIS
        <button data-filter="capsula">Suplementos &amp; Cápsulas</button>
```

Rodapé — **5 ficheiros** (`index.html`:858, `produto.html`:210, `politica-privacidade.html`:276, `trocas-devolucoes.html`:245, `entregas-portes.html`:179, `termos-uso.html`:228):

```
ANTES
<a href="index.html#loja">Detox &amp; Cápsulas</a>
DEPOIS
<a href="index.html#loja">Suplementos &amp; Cápsulas</a>
```
> (em `index.html` o `href` é `#loja`, sem prefixo — ajustar em conformidade)

### 3.7 `index.html` — cards estáticos: nomes ilegais (CRÍTICO #3,4,5)

> Estes cards são o **fallback servido no HTML** (o `cart.js`:257-258 substitui-os por `data.js` depois do JS correr). O Google indexa o HTML servido → **têm de ser corrigidos**, e devem passar a espelhar `data.js` (nomes **e** preços — ver §3.13).

```
ANTES
<h3>Kit Emagrecimento</h3>
DEPOIS
<h3>Kit Verão®</h3>
```
```
ANTES
alt="Kit Emagrecimento" loading="lazy"
DEPOIS
alt="Kit Verão®" loading="lazy"
```
```
ANTES
alt="Kit Emagrecimento em ritual de autocuidado"
DEPOIS
alt="Kit Verão® em ritual de autocuidado"
```
```
ANTES
<div class="ed">Linha Emagrecimento</div>
DEPOIS
<div class="ed">Linha Verão</div>
```
```
ANTES (2×, no .add e no .buy)
?text=Ol%C3%A1%21%20Quero%20comprar%20o%20produto%3A%20Kit%20Emagrecimento.
DEPOIS
?text=Ol%C3%A1%21%20Quero%20comprar%20o%20produto%3A%20Kit%20Ver%C3%A3o%C2%AE.
```
```
ANTES
<h3>Kit Emagrecimento Depur</h3>
DEPOIS
<h3>Kit Renovação Total</h3>
```
```
ANTES
<span class="cat">Kit · depurativo</span>
DEPOIS
<span class="cat">Kit · rotina completa</span>
```
```
ANTES
alt="Kit Emagrecimento Depur" loading="lazy"
DEPOIS
alt="Kit Renovação Total" loading="lazy"
```
```
ANTES (2×)
?text=Ol%C3%A1%21%20Quero%20comprar%20o%20produto%3A%20Kit%20Emagrecimento%20Depur.
DEPOIS
?text=Ol%C3%A1%21%20Quero%20comprar%20o%20produto%3A%20Kit%20Renova%C3%A7%C3%A3o%20Total.
```
```
ANTES
<h3>Kit Celulite &amp; Lipedema</h3>
DEPOIS
<h3>Kit Pernas Leves &amp; Celulite</h3>
```
```
ANTES (2×: no card e no exp-slide)
alt="Kit Celulite e Lipedema" loading="lazy"
DEPOIS
alt="Kit Pernas Leves e Celulite" loading="lazy"
```
```
ANTES
<h3>Celulite & Lipedema</h3>
DEPOIS
<h3>Pernas Leves & Celulite</h3>
```
```
ANTES (2×)
?text=Ol%C3%A1%21%20Quero%20comprar%20o%20produto%3A%20Kit%20Celulite%20%26%20Lipedema.
DEPOIS
?text=Ol%C3%A1%21%20Quero%20comprar%20o%20produto%3A%20Kit%20Pernas%20Leves%20%26%20Celulite.
```
```
ANTES
<span class="cat">Gel · anticelulite</span>
DEPOIS
<span class="cat">Gel · aspeto da celulite</span>
```
```
ANTES
<span class="cat">Detox líquido</span>
DEPOIS
<span class="cat">Suplemento alimentar líquido</span>
```
```
ANTES
<div class="ed">Linha Depurativa</div>
DEPOIS
<div class="ed">Linha Depur</div>
```

### 3.8 `index.html` — secção "Como funciona" + FAQ + rodapé (ALTO/MÉDIO)

```
ANTES
<div class="step3"><div class="s-n">3</div><h3>Sinta (e veja) a diferença</h3><p>Leveza já nos primeiros dias; pele com aspeto mais firme e liso com o uso contínuo. Como milhares de clientes já sentiram.</p></div>

DEPOIS
<div class="step3"><div class="s-n">3</div><h3>Sinta (e veja) a diferença</h3><p>Um ritual simples, de manhã e à noite; pele com aspeto mais firme e liso com o uso contínuo. Como milhares de clientes já sentiram.</p></div>
```

FAQ — corrigir **2×** cada (HTML visível **e** FAQPage JSON-LD):

```
ANTES
A marca Izabel de Paula® desenvolve cosméticos corporais, géis, detox e suplementos para leveza, firmeza e bem-estar.
DEPOIS
A marca Izabel de Paula® desenvolve cosméticos corporais, géis e suplementos alimentares para uma rotina de autocuidado.
```
```
ANTES
É um método próprio e patenteado de cuidado corporal que combina cosméticos, géis e uma rotina de autocuidado para promover leveza, firmeza e bem-estar — com método, constância e naturalidade.
DEPOIS
É um método próprio e patenteado de cuidado corporal que combina cosméticos, géis e uma rotina de autocuidado — com método, constância e naturalidade.
```

Rodapé:
```
ANTES
<p>Body Shaper Expert® há mais de 30 anos. Cremes, géis, cápsulas e kits para uma rotina de leveza, firmeza e bem-estar — com método, constância e resultados reais.</p>
DEPOIS
<p>Body Shaper Expert® há mais de 30 anos. Cremes e géis corporais, cápsulas e kits para uma rotina de autocuidado — com método, ritual e constância.</p>
```

### 3.9 `assets/data.js` — `catLabel` (CRÍTICO #7 / ALTO)

```
ANTES
  "catLabel": "Creme redutor",
DEPOIS
  "catLabel": "Creme corporal · 250 ml",
```
```
ANTES
  "catLabel": "Detox líquido",
DEPOIS
  "catLabel": "Suplemento alimentar líquido",
```
```
ANTES
  "catLabel": "Detox fígado · ampolas",
DEPOIS
  "catLabel": "Suplemento alimentar · 15 ampolas",
```
```
ANTES
  "catLabel": "Depur · Stop Gordura · Drenagem",
DEPOIS
  "catLabel": "Depur · Stop Gordura · Pernas Leves",
```
```
ANTES
  "catLabel": "Detox · Gordura · Pernas · Firmeza",
DEPOIS
  "catLabel": "Pack 4 produtos · suplementos e creme",
```
```
ANTES
  "catLabel": "Tratamento intensivo · profissional",
DEPOIS
  "catLabel": "Rotina intensiva · pack completo",
```

### 3.10 `assets/data.js` — `name` (CRÍTICO #2, #6)

```
ANTES
  "name": "Kit Fire Emagrecimento®",
DEPOIS
  "name": "Kit Fire®",
```
```
ANTES
  "name": "Kit Stop Lipedema & Celulite",
DEPOIS
  "name": "Kit Pernas Leves & Celulite",
```

### 3.11 `assets/data.js` — `short` e `blurb` (CRÍTICO #8 / ALTO)

> Lembrar: o `short` é a **meta description, o `og:description` e o `description` do JSON-LD Product** de cada PDP (`product.js`:32,34,48,81). É o texto mais exposto do site.

```
ANTES
  "short": "As cápsulas mais vendidas da linha Barriga Fit — um apoio diário à sua rotina de bem-estar, para se sentir mais leve no dia a dia.",
  "blurb": "Cápsulas para apoiar a sua rotina de controlo e bem-estar do dia a dia.",
DEPOIS
  "short": "As cápsulas mais vendidas da linha Barriga Fit. Suplemento alimentar com crómio, que contribui para o metabolismo normal dos macronutrientes. 50 cápsulas.",
  "blurb": "Suplemento alimentar com crómio — 50 cápsulas, para a sua rotina diária.",
```
```
ANTES
  "short": "Detox líquido saboroso para tomar todos os dias — a sua rotina de leveza, com menos sensação de inchaço e mais bem-estar.",
  "blurb": "Detox líquido saboroso para uma rotina de leveza e menos sensação de inchaço.",
DEPOIS
  "short": "Suplemento alimentar líquido de sabor agradável, para diluir em água e beber ao longo do dia. 500 ml — cerca de 25 dias de utilização.",
  "blurb": "Suplemento alimentar líquido de sabor agradável — 500 ml, para diluir em água.",
```
```
ANTES
  "short": "Cápsulas pensadas para quem passa o dia em pé — um apoio diário à sensação de pernas leves e descansadas, sem aquele peso ao fim do dia.",
  "blurb": "Cápsulas para quem passa o dia em pé — apoio à sensação de pernas leves.",
DEPOIS
  "short": "Suplemento alimentar em cápsulas com vitamina C, que contribui para a formação normal de colagénio para o normal funcionamento dos vasos sanguíneos. 60 cápsulas.",
  "blurb": "Suplemento alimentar com vitamina C — 60 cápsulas, para a sua rotina diária.",
```
```
ANTES
  "short": "Ampolas bebíveis para uma rotina detox de 15 dias — um cuidado depurativo de dentro para fora, a complementar a sua linha Barriga Fit.",
  "blurb": "Ampolas depurativas: um cuidado de dentro para fora na sua rotina detox.",
DEPOIS
  "short": "Suplemento alimentar em ampolas bebíveis, de toma prática — 15 ampolas, para as primeiras semanas da sua rotina Barriga Fit.",
  "blurb": "Suplemento alimentar em ampolas bebíveis — 15 ampolas, de toma prática.",
```
```
ANTES
  "short": "O duo que cuida da barriga de dentro para fora: cápsulas Stop Gordura + detox hepático Depur — para a sensação de leveza e menos inchaço no dia a dia.",
  "blurb": "O duo da barriga: cápsulas Stop Gordura + ampolas Depur para mais leveza.",
DEPOIS
  "short": "O duo Barriga Fit®: cápsulas Stop Gordura + ampolas Depur. Dois suplementos alimentares que se completam numa rotina diária, a par de uma alimentação equilibrada.",
  "blurb": "O duo da barriga: cápsulas Stop Gordura + ampolas Depur, numa só rotina.",
```
```
ANTES
  "short": "O trio completo Barriga Fit num só kit: creme redutor, detox líquido e cápsulas — a rotina inteira reunida, com mais vantagem no preço.",
DEPOIS
  "short": "O trio completo Barriga Fit num só kit: creme corporal, suplemento líquido e cápsulas — a rotina inteira reunida, com mais vantagem no preço.",
```
```
ANTES
  "short": "O kit mais intensivo da linha: depur, cápsulas Stop Gordura e drenagem — três passos que se completam numa rotina de bem-estar mais focada.",
  "blurb": "Kit intensivo: depur, cápsulas e drenagem para uma rotina mais completa.",
DEPOIS
  "short": "O kit mais completo da linha em suplementos alimentares: ampolas Depur, cápsulas Stop Gordura e cápsulas Pernas Leves — três passos que se completam numa só rotina.",
  "blurb": "Kit completo: ampolas Depur, cápsulas Stop Gordura e cápsulas Pernas Leves.",
```
```
ANTES
  "short": "O pack 4 em 1 para chegar ao verão a sentir-se bem consigo: detox, controlo de gordura, pernas leves e firmeza, na rotina completa.",
  "blurb": "Pack de verão 4 em 1: detox, gordura, pernas leves e firmeza num só kit.",
DEPOIS
  "short": "O pack 4 em 1 para chegar ao verão a sentir-se bem consigo: três suplementos alimentares e o creme corporal da firmeza, na rotina completa.",
  "blurb": "Pack de verão 4 em 1: três suplementos alimentares e o creme corporal.",
```
```
ANTES
  "short": "O nosso programa mais completo: um protocolo de tratamento intensivo que reúne os cuidados-chave da linha Izabel de Paula numa rotina pensada para quem quer ir mais longe.",
  "blurb": "O protocolo mais completo da casa — tratamento intensivo para uma rotina de cuidado avançada.",
DEPOIS
  "short": "O nosso programa mais completo: reúne os cuidados-chave da linha Izabel de Paula numa rotina intensiva, pensada para quem quer ir mais longe.",
  "blurb": "O programa mais completo da casa — uma rotina de cuidado avançada.",
```

### 3.12 `assets/content.js` — o ficheiro com mais correções

**Aberturas (`opening`):**

```
ANTES
      opening: 'Chega ao fim do dia com as pernas pesadas? O Gel Leg Fit Express® é um gel de efeito frio imediato, pensado para pernas cansadas e para o aspeto da celulite. Ao aplicar, refresca e proporciona uma sensação drenante de alívio e leveza instantânea. Com uso contínuo, ajuda a melhorar o aspeto da pele, deixando as pernas com toque mais firme e liso.',
DEPOIS
      opening: 'Chega ao fim do dia com as pernas pesadas? O Gel Leg Fit Express® é um gel corporal de efeito frio imediato, pensado para o conforto das pernas e para o aspeto da celulite. Ao aplicar, refresca e deixa uma sensação de frescura e leveza instantânea. Com uso contínuo, ajuda a melhorar o aspeto da pele, deixando as pernas com toque mais firme e liso.',
```
```
ANTES
      opening: 'As cápsulas mais vendidas da linha Barriga Fit, num gesto simples para o seu dia a dia. O Stop Gordura é um suplemento alimentar com fórmula natural premium que combina probióticos e ativos botânicos para acompanhar a sua rotina de bem-estar, apoiando o conforto digestivo e a sensação de leveza — a par de uma alimentação equilibrada.',
DEPOIS
      opening: 'As cápsulas mais vendidas da linha Barriga Fit, num gesto simples para o seu dia a dia. O Stop Gordura é um suplemento alimentar com culturas vivas, extratos botânicos e crómio, para acompanhar a sua rotina — a par de uma alimentação variada e equilibrada e de um estilo de vida saudável. O crómio contribui para o metabolismo normal dos macronutrientes.',
```
```
ANTES
      opening: 'A sensação de leveza começa de dentro para fora. O Barriga Fit® Detox é um drenante líquido de origem natural, com uma seleção de plantas tradicionalmente associadas ao bem-estar e à leveza. Ajuda a manter a hidratação e o cuidado diário, contribuindo para a sensação de menos inchaço e mais leveza ao longo do dia.',
DEPOIS
      opening: 'O Barriga Fit® Detox é um suplemento alimentar líquido de origem natural, com uma seleção de extratos vegetais e um sabor agradável. Dilui-se em água e bebe-se ao longo do dia — um gesto simples que acompanha a sua rotina de hidratação, a par de uma alimentação variada e equilibrada.',
```
```
ANTES
      opening: 'Passa o dia em pé ou sentada e sente as pernas a pesar? O Leg Fit® Pernas Leves é um suplemento em cápsulas com ativos botânicos tradicionalmente associados ao conforto das pernas e à sensação de leveza, para acompanhar a sua rotina de bem-estar das pernas — a par da hidratação e do movimento.',
DEPOIS
      opening: 'O Leg Fit® Pernas Leves é um suplemento alimentar em cápsulas com extratos botânicos e vitamina C, pensado para acompanhar a rotina de quem passa o dia em pé ou sentada — a par da hidratação, do movimento e de uma alimentação variada e equilibrada. A vitamina C contribui para a formação normal de colagénio para o normal funcionamento dos vasos sanguíneos.',
```
```
ANTES
      opening: 'O arranque ideal para a sua rotina detox. O Barriga Fit Depur é um detox em ampolas de toma prática, com plantas tradicionalmente associadas ao bem-estar do fígado e à sensação de leveza, ajudando-a a sentir-se mais leve e desinchada no dia a dia.',
DEPOIS
      opening: 'O Barriga Fit Depur é um suplemento alimentar em ampolas bebíveis de toma prática, com extratos vegetais de alcachofra, cardo-mariano e reishi. Uma ampola por dia, diluída em água — um gesto simples para as primeiras semanas da sua rotina, a par de uma alimentação variada e equilibrada.',
```
```
ANTES
      opening: 'O Kit Stop Gordura® reúne o ritual completo da barriga numa só rotina: cuidado interno e externo a trabalhar em conjunto. Combina o detox líquido, as cápsulas Stop Gordura e o creme corporal, para uma sensação diária de leveza e uma pele com aspeto mais firme e liso na zona abdominal.',
DEPOIS
      opening: 'O Kit Stop Gordura® reúne o ritual completo da barriga numa só rotina: cuidado interno e externo a trabalhar em conjunto. Combina o suplemento líquido, as cápsulas Stop Gordura e o creme corporal, para uma pele com aspeto mais firme e liso na zona abdominal.',
```
```
ANTES
      opening: 'O Kit Seca Barriga® reúne dois cuidados que se complementam: as cápsulas Barriga Fit® Stop Gordura e o detox hepático Barriga Fit Depur. Uma rotina de bem-estar de dentro para fora — apoia o conforto digestivo, a sensação de leveza e o cuidado do fígado, a par de uma alimentação equilibrada e de hábitos saudáveis.',
DEPOIS
      opening: 'O Kit Seca Barriga® reúne dois suplementos alimentares que se complementam: as cápsulas Barriga Fit® Stop Gordura e as ampolas Barriga Fit Depur. Uma rotina simples para as primeiras semanas, a par de uma alimentação variada e equilibrada e de hábitos saudáveis. O crómio das cápsulas contribui para o metabolismo normal dos macronutrientes.',
```
```
ANTES
      opening: 'O Kit Detox + Stop Gordura junta o drenante líquido às cápsulas Stop Gordura, numa dupla de cuidado interno para a sensação de leveza e conforto digestivo no dia a dia. Uma rotina simples para começar de dentro para fora.',
DEPOIS
      opening: 'O Kit Detox + Stop Gordura junta o suplemento líquido às cápsulas Stop Gordura, numa dupla simples para o dia a dia. A rotina certa para começar, a par de uma alimentação variada e equilibrada.',
```
```
ANTES
      opening: 'O Kit Fire é a rotina intensiva de bem-estar da Izabel de Paula, reunindo o detox em ampolas, as cápsulas Pernas Leves e as cápsulas Stop Gordura. Um ritual de cuidado de dentro para fora, pensado para a sensação de leveza e conforto ao longo do dia.',
DEPOIS
      opening: 'O Kit Fire® é a rotina mais completa da Izabel de Paula em suplementos alimentares, reunindo as ampolas Depur, as cápsulas Pernas Leves e as cápsulas Stop Gordura. Três produtos que se completam numa rotina diária, a par de uma alimentação variada e equilibrada.',
```
```
ANTES
      opening: 'O Kit Stop Lipedema & Celulite reúne cuidado externo e interno para as pernas e o aspeto da celulite: o gel de efeito frio, o drenante líquido e as cápsulas Pernas Leves. Uma rotina de bem-estar para a sensação de leveza e uma pele com toque mais firme e liso.',
DEPOIS
      opening: 'O Kit Pernas Leves & Celulite reúne cuidado externo e interno para as pernas e o aspeto da celulite: o gel corporal de efeito frio, o suplemento líquido e as cápsulas Pernas Leves. Uma rotina para uma pele com toque mais firme e liso.',
```
```
ANTES
      opening: 'O Kit Verão® é o ritual completo de bem-estar para a estação: 4 produtos premium que unem drenagem, leveza das pernas e cuidado da firmeza da pele. Uma rotina de autocuidado de dentro para fora, para se sentir leve e confiante.',
DEPOIS
      opening: 'O Kit Verão® é o ritual completo para a estação: 4 produtos premium que unem suplementos alimentares e o cuidado cosmético da firmeza e do aspeto da pele. Uma rotina de autocuidado por dentro e por fora, para se sentir confiante.',
```
```
ANTES
      opening: 'O Kit Renovação Total é o ritual mais completo da Izabel de Paula, combinando detox, suplementos e cosméticos numa rotina integrada de autocuidado. Pensado para quem quer cuidar do corpo de dentro para fora, com foco na sensação de leveza e no aspeto firme e cuidado da pele.',
DEPOIS
      opening: 'O Kit Renovação Total é o ritual mais completo da Izabel de Paula, combinando suplementos alimentares e cosméticos numa rotina integrada de autocuidado. Pensado para quem quer cuidar do corpo por dentro e por fora, com foco no aspeto firme e cuidado da pele.',
```

**`howto` (CRÍTICO/ALTO):**
```
ANTES
        'Sinta o efeito frio drenante.',
DEPOIS
        'Sinta o efeito frio imediato.',
```

**`resultsTime` — REMOVER a linha inteira nestes 8 blocos de suplemento/kit-de-suplementos** (`stop-gordura`, `detox-liquido`, `pernas-leves`, `depur`, `kit-seca-barriga`, `kit-detox-stop`, `kit-fire`, `kit-verao`), porque anuncia o prazo de um efeito que não pode ser alegado:
```
REMOVER
      resultsTime: 'Sensação de leveza percebida a partir de 2 a 3 semanas de uso contínuo.',
      resultsTime: 'Sensação de leveza percebida a partir de 2 semanas de uso contínuo.',
      resultsTime: 'Sensação de leveza percebida a partir de 3 semanas de uso contínuo.',
      resultsTime: 'Sensação de leveza percebida a partir de 15 dias de uso contínuo.',
      resultsTime: 'Sensação de leveza percebida a partir de 2 a 3 semanas de uso contínuo do ritual.',
```
> **Manter** os `resultsTime` dos **cosméticos** (`creme-barriga-fit`, `sublime-lush`, `leg-fit-express`, `levanta-bumbum`) — são legais ao abrigo do Reg. 655/2013 **desde que exista dossiê de substanciação** (PIF). Se não existir, também têm de sair.

**`actives` — o bloco "Contém ativos" (a maior concentração de infrações):**

```
ANTES
        { name: 'Cafeína', fn: 'ajuda a estimular a pele e a realçar o aspeto firme.' },
DEPOIS
        { name: 'Cafeína', fn: 'ajuda a realçar o aspeto firme da pele.' },
```
```
ANTES
        { name: 'Mentol', fn: 'efeito frio refrescante e sensação de alívio.' },
DEPOIS
        { name: 'Mentol', fn: 'efeito frio refrescante e sensação de leveza.' },
```
```
ANTES
        { name: 'Castanha da Índia', fn: 'associada à sensação de leveza nas pernas.' }
DEPOIS
        { name: 'Castanha da Índia', fn: 'extrato botânico da fórmula.' }
```
```
ANTES
        { name: 'L-Carnitina', fn: 'acompanha o cuidado do contorno corporal.' },
DEPOIS
        { name: 'L-Carnitina', fn: 'acompanha o cuidado do aspeto do contorno corporal.' },
```

`stop-gordura` (bloco completo):
```
ANTES
        { name: 'Probióticos', fn: 'ajudam a equilibrar a flora intestinal e o conforto digestivo.' },
        { name: 'Cúrcuma', fn: 'planta com propriedades antioxidantes.' },
        { name: 'Café Verde', fn: 'fonte natural de ácido clorogénico.' },
        { name: 'Pimenta Preta', fn: 'ajuda a potenciar a absorção dos nutrientes.' },
        { name: 'Crómio', fn: 'contribui para o metabolismo normal dos macronutrientes.' }
DEPOIS
        { name: 'Culturas vivas', fn: 'presentes na fórmula.' },
        { name: 'Cúrcuma', fn: 'extrato botânico da fórmula.' },
        { name: 'Café Verde', fn: 'fonte natural de ácido clorogénico.' },
        { name: 'Pimenta Preta', fn: 'extrato botânico da fórmula.' },
        { name: 'Crómio', fn: 'contribui para o metabolismo normal dos macronutrientes.' }
```

`detox-liquido` (bloco completo):
```
ANTES
        { name: 'Cardo Mariano', fn: 'planta tradicionalmente associada ao bem-estar do fígado.' },
        { name: 'Ortosifão (Chá de Java)', fn: 'associado à drenagem e à sensação de leveza.' },
        { name: 'Bétula', fn: 'tradicionalmente ligada à sensação de leveza.' },
        { name: 'Boldo', fn: 'associado ao conforto digestivo.' },
        { name: 'Salsa & Aipo', fn: 'plantas ricas em água que apoiam a hidratação.' }
DEPOIS
        { name: 'Cardo Mariano', fn: 'extrato vegetal da fórmula.' },
        { name: 'Ortosifão (Chá de Java)', fn: 'extrato vegetal da fórmula.' },
        { name: 'Bétula', fn: 'extrato vegetal da fórmula.' },
        { name: 'Boldo', fn: 'extrato vegetal da fórmula.' },
        { name: 'Salsa & Aipo', fn: 'extratos vegetais da fórmula.' }
```

`pernas-leves` (bloco completo):
```
ANTES
        { name: 'Castanha da Índia', fn: 'associada ao conforto e à leveza das pernas.' },
        { name: 'Centella Asiática', fn: 'apoia o aspeto firme da pele.' },
        { name: 'Gilbardeira', fn: 'tradicionalmente ligada ao bem-estar das pernas.' },
        { name: 'Vitamina C', fn: 'contribui para a formação normal de colagénio.' },
        { name: 'Meliloto', fn: 'associado à sensação de leveza.' }
DEPOIS
        { name: 'Castanha da Índia', fn: 'extrato botânico da fórmula.' },
        { name: 'Centella Asiática', fn: 'extrato botânico da fórmula.' },
        { name: 'Gilbardeira', fn: 'extrato botânico da fórmula.' },
        { name: 'Vitamina C', fn: 'contribui para a formação normal de colagénio para o normal funcionamento dos vasos sanguíneos.' },
        { name: 'Meliloto', fn: 'extrato botânico da fórmula.' }
```

`depur` (bloco completo):
```
ANTES
        { name: 'Alcachofra', fn: 'associada ao conforto digestivo.' },
        { name: 'Cardo Mariano', fn: 'tradicionalmente ligado ao bem-estar do fígado.' },
        { name: 'Reishi', fn: 'cogumelo com propriedades antioxidantes.' }
DEPOIS
        { name: 'Alcachofra', fn: 'extrato vegetal da fórmula.' },
        { name: 'Cardo Mariano', fn: 'extrato vegetal da fórmula.' },
        { name: 'Reishi', fn: 'cogumelo presente na fórmula.' }
```

**"O que inclui" dos kits** — substituir todas as ocorrências (várias por linha):
```
ANTES
        { name: 'Barriga Fit Detox', fn: 'drenante líquido — sensação de leveza.' },
DEPOIS
        { name: 'Barriga Fit Detox', fn: 'suplemento alimentar líquido, 500 ml.' },
```
```
ANTES
        { name: 'Stop Gordura (cápsulas)', fn: 'apoio ao conforto digestivo.' },
DEPOIS
        { name: 'Stop Gordura (cápsulas)', fn: 'suplemento alimentar com crómio, 50 cápsulas.' },
```
```
ANTES
        { name: 'Leg Fit Pernas Leves', fn: 'conforto e leveza das pernas.' },
DEPOIS
        { name: 'Leg Fit Pernas Leves', fn: 'suplemento alimentar com vitamina C, 60 cápsulas.' },
```
```
ANTES
        { name: 'Creme Barriga Fit', fn: 'creme termogénico — aspeto firme da pele.' }
DEPOIS
        { name: 'Creme Barriga Fit', fn: 'creme corporal — aspeto firme da pele.' }
```
```
ANTES
        { name: 'Barriga Fit Stop Gordura (50 cápsulas)', fn: 'apoio ao conforto digestivo e à sensação de leveza.' },
        { name: 'Barriga Fit Depur (15 ampolas)', fn: 'detox de toma prática — bem-estar do fígado e leveza.' }
DEPOIS
        { name: 'Barriga Fit Stop Gordura (50 cápsulas)', fn: 'suplemento alimentar com crómio.' },
        { name: 'Barriga Fit Depur (15 ampolas)', fn: 'suplemento alimentar em ampolas bebíveis.' }
```
```
ANTES
        { name: 'Barriga Fit Depur (ampolas)', fn: 'detox — sensação de leveza.' },
DEPOIS
        { name: 'Barriga Fit Depur (ampolas)', fn: 'suplemento alimentar, 15 ampolas.' },
```
```
ANTES
        { name: 'Gel Leg Fit Express', fn: 'gel de efeito frio — aspeto da celulite.' },
DEPOIS
        { name: 'Gel Leg Fit Express', fn: 'gel corporal de efeito frio — aspeto da celulite.' },
```
```
ANTES
        { name: 'Linha Detox', fn: 'cuidado de dentro para fora — sensação de leveza.' },
        { name: 'Suplementos', fn: 'apoio ao conforto e bem-estar diário.' },
DEPOIS
        { name: 'Linha Detox', fn: 'suplementos alimentares da linha.' },
        { name: 'Suplementos', fn: 'cápsulas e ampolas da linha.' },
```

**`BENEFITS` ("Porque vai adorar"):**
```
ANTES
      'Apoiam o conforto digestivo e a sensação de leveza no dia a dia.',
DEPOIS
      'Com crómio, que contribui para o metabolismo normal dos macronutrientes.',
```
```
ANTES
      'Drenante líquido de origem natural, com plantas associadas à leveza.',
      'Ajuda na sensação de menos inchaço ao longo do dia.',
DEPOIS
      'Suplemento alimentar líquido de origem natural, com extratos vegetais.',
      'Dilui-se em água e bebe-se ao longo do dia.',
```
```
ANTES
      'Castanha-da-índia e centella associadas ao conforto das pernas.',
      'Apoiam a sensação de pernas leves e descansadas.',
      'Com vitamina C, que contribui para a formação normal de colagénio.',
DEPOIS
      'Fórmula com castanha-da-índia, centella e gilbardeira.',
      'Toma simples: 1 cápsula ao pequeno-almoço e 1 ao jantar.',
      'Com vitamina C, que contribui para a formação normal de colagénio para o normal funcionamento dos vasos sanguíneos.',
```
```
ANTES
      'Plantas associadas ao bem-estar do fígado e à sensação de leveza.',
DEPOIS
      'Fórmula com extratos vegetais, em ampolas bebíveis.',
```
```
ANTES
      'Cuidado de dentro para fora, para mais leveza e menos inchaço.',
DEPOIS
      'Dois suplementos alimentares que se completam numa só rotina.',
```
```
ANTES
      'O kit mais intensivo: depur, cápsulas e drenagem.',
DEPOIS
      'O kit mais completo: ampolas Depur, Stop Gordura e Pernas Leves.',
```
```
ANTES
      'Pack 4 em 1: detox, gordura, pernas leves e firmeza.',
DEPOIS
      'Pack 4 em 1: três suplementos alimentares e o creme corporal.',
```
```
ANTES
      'Tratamento intensivo com os cuidados-chave da linha.',
DEPOIS
      'Rotina intensiva com os cuidados-chave da linha.',
```

**Selo de confiança — "Dermatologicamente testado" em suplementos (ALTO):**
```
ANTES
    var tag = p.cat === 'capsula' ? 'Suplemento alimentar natural' : (p.cat === 'kit' ? 'Cosméticos + suplementos' : 'Uso externo cosmético');
    h += '<div class="ds-trust-line">' + SHIELD + '<span>Dermatologicamente testado · ' + tag + ' · Fabricado em Portugal</span></div>';

DEPOIS
    var tag = p.cat === 'capsula' ? 'Suplemento alimentar' : (p.cat === 'kit' ? 'Cosméticos + suplementos' : 'Uso externo cosmético');
    var testado = (p.cat === 'creme') ? 'Dermatologicamente testado · ' : '';
    h += '<div class="ds-trust-line">' + SHIELD + '<span>' + testado + tag + ' · Fabricado em Portugal</span></div>';
```

### 3.13 `assets/proof.js`

**CRÍTICO #14 — não mostrar antes/depois de cosméticos nas PDP de suplementos:**
```
ANTES
  function pdpItems(p) {
    var order = { creme: [0, 2, 3], capsula: [1, 4, 0], kit: [2, 3, 5] };
    var idx = (p && order[p.cat]) || [0, 1, 2];
    return idx.map(function (i) { return PROOF.beforeAfter[i]; });
  }
  function pdpBlockHTML(p) {
    var cards = pdpItems(p).map(function (it) { return baCardHTML(it, false); }).join('');

DEPOIS
  function pdpItems(p) {
    var order = { creme: [0, 2, 3], kit: [2, 3, 5] };
    var idx = (p && order[p.cat]) || [0, 1, 2];
    return idx.map(function (i) { return PROOF.beforeAfter[i]; });
  }
  function pdpBlockHTML(p) {
    // Antes/depois só em cosméticos: as fotografias resultam do uso de cosméticos.
    // Exibi-las na página de um suplemento alimentar seria uma alegação de saúde
    // por imagem (Reg. 1924/2006, art. 2.º(2)(1)) e uma atribuição falsa de resultados.
    if (!p || p.cat === 'capsula') return '';
    var cards = pdpItems(p).map(function (it) { return baCardHTML(it, false); }).join('');
```

**Legendas (ALTO/MÉDIO + PT-PT):**
```
ANTES
      { img: 'images/resultados/ba-1.jpg', caption: 'Coxas e glúteos com aspecto mais firme e pele mais lisa.', dur: '≈ 6 semanas de uso contínuo', product: 'leg-fit-express' },
      { img: 'images/resultados/ba-2.jpg', caption: 'Abdómen com sensação de leveza e aspecto mais liso após rotina contínua.', dur: '≈ 8 semanas de uso contínuo', product: 'creme-barriga-fit' },
      { img: 'images/resultados/ba-3.jpg', caption: 'Glúteos com aspecto mais firme e textura de pele mais uniforme.', dur: '≈ 6 semanas de uso contínuo', product: 'levanta-bumbum' },
      { img: 'images/resultados/ba-4.jpg', caption: 'Pernas com sensação de leveza e contorno mais firme.', dur: '≈ 8 semanas de uso contínuo', product: 'leg-fit-express' },
      { img: 'images/resultados/ba-5.jpg', caption: 'Barriga com aspecto mais liso e redução da sensação de inchaço.', dur: '≈ 8 semanas de uso contínuo', product: 'creme-barriga-fit' },
      { img: 'images/resultados/ba-6.jpg', caption: 'Firmeza e melhora no aspecto da celulite na zona dos glúteos.', dur: '≈ 6 semanas de uso contínuo', product: 'levanta-bumbum' }

DEPOIS
      { img: 'images/resultados/ba-1.jpg', caption: 'Coxas e glúteos com aspeto mais firme e pele mais lisa.', dur: '≈ 6 semanas de uso contínuo', product: 'leg-fit-express' },
      { img: 'images/resultados/ba-2.jpg', caption: 'Abdómen com aspeto mais liso após rotina contínua.', dur: '≈ 8 semanas de uso contínuo', product: 'creme-barriga-fit' },
      { img: 'images/resultados/ba-3.jpg', caption: 'Glúteos com aspeto mais firme e textura de pele mais uniforme.', dur: '≈ 6 semanas de uso contínuo', product: 'levanta-bumbum' },
      { img: 'images/resultados/ba-4.jpg', caption: 'Pernas com sensação de leveza e aspeto do contorno mais firme.', dur: '≈ 8 semanas de uso contínuo', product: 'leg-fit-express' },
      { img: 'images/resultados/ba-5.jpg', caption: 'Barriga com aspeto mais liso e pele com toque mais firme.', dur: '≈ 8 semanas de uso contínuo', product: 'creme-barriga-fit' },
      { img: 'images/resultados/ba-6.jpg', caption: 'Firmeza e melhoria no aspeto da celulite na zona dos glúteos.', dur: '≈ 6 semanas de uso contínuo', product: 'levanta-bumbum' }
```

**"Cliente verificada ✓" (ALTO — Anexo I, 23-B):**
```
ANTES
      + '<div class="ba-meta"><span class="ba-dur">' + esc(item.dur) + '</span><span class="ba-client">Cliente verificada ✓</span></div></div>';
DEPOIS
      + '<div class="ba-meta"><span class="ba-dur">' + esc(item.dur) + '</span><span class="ba-client">Cliente real, com consentimento</span></div></div>';
```

**"Livro de Reclamações" listado como distinção (MÉDIO):**
```
ANTES
      { name: 'Gold Star', sub: 'Excelência' },
      { name: 'Livro de Reclamações', sub: 'Portugal' }
DEPOIS
      { name: 'Gold Star', sub: 'Excelência' }
```

**CTA junto ao antes/depois (MÉDIO):**
```
ANTES
      + '<div class="proof-cta"><p>Imagine-se aqui. Dê hoje o primeiro passo e comece a sua rotina com a <b>' + esc(p.name) + '</b>.</p>'
DEPOIS
      + '<div class="proof-cta"><p>Comece hoje a sua rotina com a <b>' + esc(p.name) + '</b>.</p>'
```

### 3.14 Avaliações e preços (ALTO — Anexo I / Dir. 98/6/CE)

Estes dois **não se resolvem com uma frase** — exigem decisão:

1. **Estrelas.** `★★★★★ 4.9` aparece 20× em `index.html` e em cada PDP (`product.js`:143, com `· avaliação das clientes`). Se **não** existir um sistema de avaliações verificadas por trás, isto é o **Anexo I, n.º 23-B** da Dir. 2005/29/CE — proibido **em qualquer circunstância**, sem teste de "consumidor médio". Duas saídas:
   - **(a)** Ligar as avaliações reais da Shopify e publicar a nota de como são verificadas; ou
   - **(b)** Remover as estrelas e a nota numérica de todo o site (`index.html`, `cart.js`:cardHTML, `product.js`:143, `data.js`:`rating`).
   A opção (b) é a única defensável enquanto (a) não existir.

2. **Preços riscados.** `index.html` anuncia `was €74,90 / now €54,90` para o Barriga Fit Detox, quando o `data.js`:283-284 e o próprio JSON-LD da página (`index.html`:186) dizem **€38,00**. Ou seja: **o preço visível, o preço estruturado e o preço real divergem**. Além disso, o Art. 6.º-A da Dir. 98/6/CE exige que o "preço anterior" seja o **mais baixo praticado nos 30 dias anteriores**.
   → **Regenerar os cards estáticos de `index.html` a partir de `data.js`** (nomes, preços, `compareAt`) e confirmar que cada `compareAt` corresponde a um preço efetivamente praticado nos últimos 30 dias. Onde não corresponder, **remover o `compareAt`**.

---

## 4. O que está BEM (não mexer)

Há trabalho sério feito aqui. Isto **passa** e deve ser preservado como padrão:

1. **`content.js`:115 — `{ name: 'Crómio', fn: 'contribui para o metabolismo normal dos macronutrientes.' }`** — alegação **autorizada** (Reg. 432/2012), redação exata, no produto certo. É o modelo a replicar.
2. **`content.js`:148,352 — Vitamina C / colagénio** — autorizada. Sugiro apenas completar com a função-alvo (`...para o normal funcionamento dos vasos sanguíneos`), que é permitida e diz **mais** do que a versão atual.
3. **`content.js`:14-29 — os blocos `CT` e `CS` de precauções** — exemplares. `CS` inclui a menção obrigatória do art. 6.º/3 do DL 118/2015 ("não substitui uma alimentação variada e equilibrada"), a dose, gravidez/amamentação e o aviso de medicação. Não tocar.
4. **`content.js`:33,83,333 — "ajuda a melhorar o aspeto da pele", "ajuda a melhorar o aspeto da celulite e da flacidez", "toque mais firme e liso"** — é **exatamente** assim que um cosmético fala ao abrigo do Reg. 655/2013. Padrão-ouro do ficheiro.
5. **`content.js`:51,320-322 — Sublime Lush inteiro** — hidratação, toque, maciez, luminosidade. Sem uma única alegação de risco. O melhor texto do site.
6. **`index.html`:881 e `produto.html`:233 — `foot-note`** — o disclaimer completo (variação de resultados + não substitui acompanhamento + caráter informativo). Correto e bem colocado.
7. **`index.html`:639 — `proof-disclaimer`** — "Resultados podem variar... clientes reais, partilhadas com consentimento." Correto.
8. **`index.html`:743 — FAQ "Os produtos substituem acompanhamento médico?"** — resposta impecável. Mantém-se e é um ativo de confiança.
9. **A ausência de `aggregateRating` no JSON-LD.** As estrelas estão no HTML mas **não** foram injetadas no schema — o que evitou uma segunda camada de risco (rich snippets falsos). Boa decisão, mantê-la.
10. **Nenhum número de kg, cm ou tamanho de roupa em lado nenhum do site.** O art. 12.º(b) — a regra mais dura de todas — nunca é violado por quantificação. Só por vocabulário ("emagrecimento"), que é reversível. É por isso que este site é **corrigível em horas**, e não um reset.
11. **`index.html`:2 `lang="pt-PT"`, morada, NIF, Livro de Reclamações e link de cookies no rodapé** — obrigações de identificação do prestador cumpridas.
12. **A voz da marca** — "método", "ritual", "constância", "30 anos", "pioneira", "Body Shaper Expert®", "patenteado". **Toda a força de venda deste site já vem de argumentos legais.** Nenhuma das correções acima lhe tira um grama de persuasão; só lhe tira o passivo.

---

## 5. Zona cinzenta — decisão humana necessária

| Item | Onde | O problema | Recomendação |
|---|---|---|---|
| **Categoria "Detox & Cápsulas"** | filtro `index.html`:541 + rodapé ×6 | "Detox" **como nome de categoria** não descreve o efeito de um produto concreto — é mais defensável do que "desintoxica o organismo". Mas está a nomear uma **prateleira de suplementos alimentares** e a ASAE pode lê-lo como alegação implícita. | **Trocar por "Suplementos & Cápsulas"** — custo SEO praticamente nulo ("cápsulas" e "suplemento alimentar" são as keywords que interessam) e elimina o risco. Se a Izabel insistir em manter "Detox", é uma decisão dela, informada. |
| **"Barriga Fit® Detox" (nome de produto)** | `data.js`:271 | Marca registada. O art. 1.º/3 do Reg. 1924/2006 permite marcas que possam ser interpretadas como alegação **desde que acompanhadas de uma alegação autorizada** na mesma comunicação. | **Manter o nome.** Garantir que a PDP passa a incluir uma alegação autorizada (o crómio/vit. C) ou a menção "suplemento alimentar". **Nunca** usar "detox" a descrever o efeito. |
| **"Kit Seca Barriga®"** | `data.js`:410 | Marca registada, mas "Seca Barriga" implica perda de volume/peso abdominal. É a marca mais exposta do catálogo ao art. 12.º(b). | **Escalar para o advogado.** Confirmar o registo do INPI. Se registada, mantém-se com a proteção do art. 1.º/3 — mas o **corpo do texto** tem de ficar limpo (já corrigido em §3.12). Se **não** estiver registada, renomear. |
| **"Stop Gordura®" / "Kit Stop Gordura®" / "Kit Fire®"** | vários | Idem. "Stop Gordura" é o mais agressivo depois de "Seca Barriga". | Mesmo tratamento: confirmar registo, manter como **nome**, nunca como descrição de efeito. |
| **"Probióticos" → "culturas vivas"** | `content.js`:101,111 | A Comissão Europeia considera **"probiótico" uma alegação de saúde** por si só. Vários Estados-Membros (IT, ES, NL, PL...) toleram-na na rotulagem; **Portugal nunca se pronunciou formalmente**. | Propus "culturas vivas" (a alternativa segura em toda a UE). Se a Izabel quiser manter "probióticos", é uma **decisão informada de risco baixo-médio** — mas a frase "equilibram a flora intestinal" tem de sair de qualquer forma. |
| **"Termogénico"** | `content.js`:21,33,44,83,88,95,182,314,331 | Num cosmético, descreve **sensação de calor na pele** — permitido (Reg. 655/2013 cobre "sensação"). Mas num contexto de emagrecimento evoca **termogénese metabólica** = fisiológico. | **Manter**, porque o texto atual já o ancora corretamente ("aquece suavemente a pele durante a massagem"). **Regra**: "termogénico" nunca aparece sem, na mesma frase, a palavra "pele" ou "massagem". Nunca sozinho. |
| **Fotografias antes/depois (as imagens em si)** | `images/resultados/ba-*.jpg` | Mesmo restritas a cosméticos (§3.13), imagens de corpo antes/depois num contexto de "barriga"/"pernas" são o formato que mais atrai fiscalização. São legais **se** substanciadas e não enganosas. | **Manter, com 3 condições:** (1) só em PDP de cosméticos; (2) consentimento escrito arquivado de cada cliente; (3) dossiê que ligue cada foto ao produto e ao período. Sem os três, retirar. |
| **`resultsTime` nos cosméticos** | `content.js`:34,52,66,84 | "Resultados a partir de 21 dias" é legal ao abrigo do Reg. 655/2013 **só com dossiê de substanciação** (o PIF do produto). | **Perguntar ao fabricante** se existe teste de eficácia/uso. Se sim, manter. Se não, remover — é a única alegação do site que depende de um documento que talvez não exista. |
| **Códigos de desconto `KITLIPEDEMA5` / `KITLIPEDEMA10`** | `data.js`:584-585 | Contêm o nome da doença, mas **não são texto visível** — são códigos da Shopify. Renomeá-los parte o checkout. | **Não tocar agora.** Renomear na Shopify **primeiro**, depois atualizar aqui. Baixa prioridade, risco quase nulo. |
| **Secções comentadas em `index.html`** (linhas 419-432, 435-444, 458-490, 691-703) | `index.html` | Contêm `plantas drenantes`, `entregamos resultados reais`, `4,9/5 · milhares de clientes`, `Resultados reais, zero milagres`. **Não são renderizadas nem indexadas** — mas estão no HTML servido e alguém as vai reativar um dia. | **Corrigir o texto dentro dos comentários agora**, ou apagar os blocos. Uma reativação futura reintroduz 4 violações de uma vez. |

---

## 6. Ordem de execução sugerida

1. **Hoje, antes de mais nada** (10 min, risco zero): §3.1 metatags + §3.2 JSON-LD + §3.3. São 10 strings e matam a exposição indexada de "emagrecimento".
2. **Nomes de produto** (§3.7, §3.10): "Lipedema" e "Emagrecimento" fora de `index.html` e `data.js`. Sincronizar com a Shopify — os nomes **têm de bater certo** nos dois sítios.
3. **`content.js` + `data.js`** (§3.9, §3.11, §3.12): o grosso do trabalho, mas é tudo procura-e-substitui.
4. **`proof.js`** (§3.13): a correção estrutural do antes/depois.
5. **Decisões humanas** (§5) + **estrelas/preços** (§3.14): levar à Izabel e, no caso das marcas registadas, ao advogado.
6. **Copiar tudo para `site-para-cliente/`** (ou regenerar a pasta) e refazer o deploy com novo cache-bust.
