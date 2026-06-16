# TAREFA (Cowork com acesso ao Shopify Admin): Construir o funil COMPLETO de e-mail marketing — Izabel de Paula® · Body Shaper Expert

Atua como uma equipa sénior de CRM + E-mail Marketing + Copywriting de resposta direta. Padrão exigido: **10/10, voltado para conversão — zero amadorismo**. Vais construir, dentro do Shopify (Shopify Email / Flow), **todo o funil de e-mail** descrito abaixo, com a cópia já fornecida. Objetivo: **vender mais, aumentar recorrência e reduzir carrinhos abandonados — sem quebrar NADA do que já funciona.**

---

## ⛔ REGRAS INQUEBRÁVEIS (ler ANTES de qualquer ação)
1. **Não apagar NADA que esteja ativo.** Existe 1 automação ativa ("Checkout abandonado") + 1 duplicado inativo. Podes **PAUSAR** um fluxo ativo no go-live, **nunca excluí-lo**.
2. **Constrói TODOS os fluxos novos como INATIVOS (rascunho).** Só se ativa após (a) aprovação do cliente **e** (b) autenticação de e-mail verde (ver "GATE").
3. **Não tocar** em tema, preços, produtos, checkout ou qualquer elemento do site/loja. Isto é **só e-mail/automação**.
4. **Só produtos REAIS** (lista abaixo). Confirma no catálogo ao vivo. **Proibido inventar produtos, variantes, benefícios ou resultados.**
5. **Só os códigos de desconto REAIS** (lista abaixo). **Não criar códigos novos** sem aprovação explícita.
6. **Conformidade cosmética/saúde:** sem alegações médicas/terapêuticas, sem promessas de emagrecimento garantido, sem "antes/depois" enganoso. Benefícios honestos.
7. **RGPD/consentimento:** enviar só ao segmento subscrito ("Assinantes de e-mail", ~3.168). Cada e-mail com remetente identificado e link de cancelamento.
8. **Anti-duplicação:** garantir que ninguém recebe e-mails sobrepostos de fluxos diferentes (regras na secção própria).
9. **Idioma da cópia:** Português europeu (PT-PT). Mercado: Portugal (€).
10. Antes de qualquer alteração, **relê o estado atual** da automação. Em dúvida, **pára e pergunta**.

---

## 🔐 GATE DE ENTREGABILIDADE (porque tudo fica INATIVO primeiro)
O remetente `marketing@izabeldepaula.com` **não está autenticado** (DKIM/DMARC em falta). Ativar envios agora = cair no spam e queimar a reputação do domínio. Por isso: **constrói tudo já (inativo)**, mas **só ativa** quando o domínio estiver autenticado (SPF/DKIM/DMARC verde no Shopify) **e** o cliente aprovar a cópia. Reporta este bloqueio no final.

---

## 🧭 CONTEXTO DA LOJA (já auditado — não re-auditar)
- Plataforma: **Shopify Email/Messaging + Shopify Flow** (sem Klaviyo/Omnisend/Mailchimp).
- Remetente: `marketing@izabeldepaula.com` (não verificado). Lista: 4.083 clientes, **3.168 subscritos**.
- Funil de loja (30d): ~68% abandonam no checkout; AOV ≈ €46,93. Canal e-mail quase não vende (oportunidade enorme).
- Automação ATIVA: **"Checkout abandonado"** (gatilho *Customer abandons checkout*, espera 10h, template padrão SEM logótipo). Existe duplicado INATIVO "Recuperar checkout abandonado".
- Apps: **WhatsApp (canal) + WATI**; upsell Xboost Bundle / Order Bump; COD Releasit. ⚠️ Pedidos via WhatsApp/COD podem não disparar os gatilhos de abandono do Shopify.
- **Captura de e-mail (popup):** NÃO configurada → o Fluxo de Boas-vindas precisa de uma fonte de entrada (recomenda ativar Shopify Forms; não é bloqueante).
- CTA de WhatsApp nos e-mails → usar o **WhatsApp oficial atual da loja** (confirmar no Admin; não inventar número).

## 🛒 PRODUTOS REAIS (usar SÓ estes — confirmar no catálogo ao vivo)
**8 individuais:** Creme Barriga Fit · Sublime Lush · Gel Leg Fit Express · Gel Levanta Bumbum · Stop Gordura (cápsulas) · Detox Líquido · Pernas Leves · Depur
**6 kits:** Kit Stop Gordura · Kit Detox + Stop Gordura · Kit Fire · Kit Stop Lipedema & Celulite · Kit Verão · Kit Renovação Total

## 🎟️ CÓDIGOS REAIS (usar SÓ estes — já existem na loja)
| Fluxo | Código | Valor |
|---|---|---|
| Boas-vindas | `BEMVINDA5` | 5% |
| Carrinho/Checkout abandonado (incentivo tardio) | `OPORTUNIDADE10` | 10% |
| Recompra/Reposição | `RECOMPRA10` ou `REPOSICAO10` | 10% |
| Win-back | `VOLTEI15` | 15% |
| Cross-sell linha detox (opcional) | `DETOX5` | 5% |

> Variáveis dinâmicas: usa Liquid do Shopify (`{{ first_name }}`, itens do carrinho/checkout, `{{ order_name }}`, título do produto). Onde escrevo `[…]` é instrução para ti.

---

## 📧 OS 6 FLUXOS — configuração + cópia pronta

### FLUXO 1 — BOAS-VINDAS (novo subscritor) · NOVO · INATIVO
- **Gatilho:** novo subscritor de e-mail. **Exclusão:** quem já comprou.
- **E-mail 1 (imediato)**
  - Assunto: `Bem-vinda à família Izabel de Paula 💛`
  - Preview: `O teu mimo de boas-vindas está aqui dentro.`
  - Corpo:
    > Olá {{ first_name | default: "querida" }},
    > Que bom ter-te aqui. 💛
    > A Izabel de Paula existe para ajudar cada mulher a sentir-se confiante e bem no seu corpo — com produtos reais, para resultados reais.
    > Para começares, um presente: **5% na tua primeira encomenda** com o código **BEMVINDA5** (válido 7 dias).
  - CTA: `Descobrir os produtos →`
- **E-mail 2 (+48h, se não comprou)**
  - Assunto: `As nossas clientes não largam este 👀`
  - Preview: `O mais amado da casa — e porquê.`
  - Corpo: destaca o **best-seller real** (ex.: Creme Barriga Fit — confirmar o top de vendas na loja), benefício honesto (firmeza/modelagem/uso diário), 1 avaliação real (⭐️⭐️⭐️⭐️⭐️). Reforça que o **BEMVINDA5** continua ativo, mas por pouco tempo.
  - CTA: `Quero experimentar →`
- **E-mail 3 (+5 dias)**
  - Assunto: `⏳ O teu 5% termina amanhã`
  - Preview: `Não deixes o teu mimo de boas-vindas escapar.`
  - Corpo: lembrete de urgência (BEMVINDA5 a expirar). CTA: `Usar agora →`

### FLUXO 2 — CARRINHO ABANDONADO (pré-checkout) · NOVO · INATIVO
- **Gatilho:** adicionou ao carrinho e **NÃO** iniciou checkout. **Exclusão crítica:** se entrou no checkout → sai deste fluxo (passa ao Fluxo 3).
- **E-mail 1 (+1h, sem desconto)**
  - Assunto: `Esqueceste-te de algo? 🛍️`
  - Preview: `Os teus produtos continuam à tua espera.`
  - Corpo: "Olá {{ first_name }}, deixaste isto na tua sacola:" + `{{ cart_items }}` (imagem+nome+preço). "Guardámos tudo para ti." CTA: `Voltar à minha sacola →`
- **E-mail 2 (+24h, se não comprou)**
  - Assunto: `Ainda dá tempo (e com 10% 👇)`
  - Preview: `Um empurrãozinho para finalizares.`
  - Corpo: prova social + **10% com OPORTUNIDADE10**. CTA: `Finalizar com 10% →` · PS com CTA WhatsApp para dúvidas.

### FLUXO 3 — CHECKOUT ABANDONADO (MELHORIA) · cópia INATIVA da ativa
> ⚠️ **Não tocar na automação ativa.** Cria esta versão melhorada **inativa**. No go-live (após gate + aprovação): **pausa a antiga + ativa esta**. Nunca apagar.
- **E-mail 1 (espera ~10h, como a ativa)**
  - Assunto: `O teu checkout está quase pronto 🧡`
  - Preview: `Falta só um passo para ser teu.`
  - Corpo: com **logótipo/branding**, "Estavas mesmo quase!" + `{{ checkout_items }}`. CTA primário: `Concluir a compra →`. CTA secundário: `Falar no WhatsApp`.
- **E-mail 2 (+24h, se não comprou)**
  - Assunto: `Guardámos o teu carrinho + 10% 🎁`
  - Corpo: **10% com OPORTUNIDADE10**, urgência honesta. CTA: `Finalizar com 10% →`

### FLUXO 4 — PÓS-VENDA · NOVO · INATIVO
- **Gatilho:** encomenda paga/expedida.
- **E-mail 1 (na expedição)**
  - Assunto: `A tua encomenda está a caminho 🚚`
  - Preview: `Como tirar o máximo do teu produto.`
  - Corpo: agradecimento + `{{ order_name }}` + **modo de uso REAL do produto comprado** (dinâmico; a constância é o segredo) + CTA WhatsApp para dúvidas.
- **E-mail 2 (+7–10 dias)**
  - Assunto: `Como está a correr? 💛`
  - Preview: `A tua opinião vale ouro.`
  - Corpo: pedido de avaliação + **cross-sell suave** de produto complementar **real**. CTA: `Deixar a minha avaliação →`

### FLUXO 5 — RECOMPRA / REPOSIÇÃO · NOVO · INATIVO
- **Gatilho:** X dias após entrega, conforme ciclo do produto (cosmética/detox ≈ 30–45 dias; shapewear → 2.ª peça/cor).
  - Assunto: `Está quase a acabar? Repõe com 10% 🔁`
  - Preview: `Não interrompas os teus resultados.`
  - Corpo: "Olá {{ first_name }}, esta é a altura certa de repores o teu {{ produto comprado }}." + **10% com RECOMPRA10** (ou REPOSICAO10). CTA: `Repor agora →`

### FLUXO 6 — WIN-BACK / REATIVAÇÃO · NOVO · INATIVO
- **Gatilho:** sem compra há 60–90 dias.
- **E-mail 1**
  - Assunto: `Sentimos a tua falta 💛 (15% para ti)`
  - Preview: `Voltar nunca foi tão bom.`
  - Corpo: reconquista + **15% com VOLTEI15**. CTA: `Voltar com 15% →`
- **E-mail 2 (+5 dias)**
  - Assunto: `⏳ Última chamada: 15% terminam hoje`
  - Corpo: urgência final. CTA: `Usar o meu 15% →`

---

## 🧩 ANTI-DUPLICAÇÃO (condições obrigatórias)
- **Boas-vindas**: excluir quem já comprou.
- **Carrinho abandonado (F2)** vs **Checkout abandonado (F3)**: se o contacto chegou ao checkout, só recebe F3 (sai de F2).
- **Win-back (F6)**: excluir quem está em fluxo de Pós-venda/Recompra recente.
- Definir limite de frequência sensato por contacto (evitar fadiga → queixas de spam).

---

## ✅ ORDEM DE EXECUÇÃO NO SHOPIFY
1. Reler as automações atuais; confirmar a ativa "Checkout abandonado" + o duplicado inativo. **Não modificar a ativa.**
2. Confirmar o estado de **autenticação do remetente** (provavelmente "Requer configuração") e registar como bloqueio de ativação.
3. Confirmar os **produtos** (catálogo ao vivo) e os **códigos** (já existentes). Não criar nada novo.
4. Construir **Fluxos 1 a 6 como INATIVOS**.
5. Ligar variáveis dinâmicas (nome, itens do carrinho/checkout, encomenda, produto) e condições de exclusão (anti-duplicação).
6. **Teste seed**: enviar cada e-mail para um endereço interno; validar render, links, código e variáveis.
7. Exportar/print de cada fluxo para revisão do cliente.
8. **NÃO ativar.** Reportar de volta (ver abaixo) e aguardar: aprovação da cópia + autenticação verde.
9. **Go-live (só depois):** pausar a "Checkout abandonado" antiga + ativar a nova (F3); ativar F1, F2, F4, F5, F6.

## 📦 REPORTAR DE VOLTA (entregáveis)
- Lista dos 6 fluxos criados, cada um com **estado = INATIVO**, gatilho, tempos, segmento, exclusões e código.
- Prints/exports de cada fluxo + resultados dos testes seed.
- Confirmação explícita: **só foram usados produtos e códigos reais**; **nenhuma automação ativa foi apagada/editada**.
- Lista do que falta para ativar: (1) autenticação SPF/DKIM/DMARC verde, (2) aprovação da cópia, (3) fonte de captura para o Fluxo de Boas-vindas.
