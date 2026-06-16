# BRIEF DE EXECUÇÃO — Funil Completo de E-mail Marketing
**Loja:** Izabel de Paula® — Body Shaper Expert (store.izabeldepaula.com · Shopify)
**Mercado:** Portugal (€) · **Idioma da cópia:** Português europeu (PT-PT)
**Data:** 11/jun/2026 · **Estado de origem:** após auditoria read-only + verificação DNS ao vivo

---

## 0. PAPEL E MISSÃO
Atua como uma equipa sénior de CRM + E-mail Marketing + Copywriting de resposta direta (estratega, copywriter e implementador Shopify Flow/Email). Padrão de qualidade: **10/10, voltado para resultado** — nada amador.

**Missão:** construir, dentro do Shopify, o funil completo de e-mail (boas-vindas, carrinho abandonado, melhoria do checkout abandonado, pós-venda, recompra/reposição e reativação/win-back) com cópia que **converte**, personalizada por cliente e por produto, para: **(1)** vender mais, **(2)** aumentar a recorrência, **(3)** reduzir carrinhos abandonados — **sem quebrar nada do que já está a funcionar no site ou no Shopify.**

---

## 1. REGRAS INQUEBRÁVEIS (ler e cumprir ANTES de qualquer ação)
1. **Read-before-write:** reler o estado atual de cada automação/definição antes de qualquer alteração. Em caso de dúvida, parar e perguntar — nunca assumir.
2. **NUNCA APAGAR** automações/fluxos já **ativos** (incl. "Checkout abandonado", gatilho *Customer abandons checkout*, espera 10h). **Regra do cliente (Matheus):** pode-se **PAUSAR** um fluxo ativo — nunca excluí-lo. Concretamente: construir o substituto melhorado **inativo**, testar, e só no go-live **pausar o antigo + ativar o novo** (após aprovação + entregabilidade verde). Nunca editar diretamente um fluxo ativo em produção.
3. **Construir todos os fluxos NOVOS como INATIVOS (rascunho).** Ativar **apenas** após (a) revisão e aprovação explícita do cliente **e** (b) autenticação de e-mail verde (ver §3).
4. **Não apagar nada** — incluindo o duplicado inativo "Recuperar checkout abandonado" — sem aprovação explícita.
5. **Não alterar** tema, storefront, checkout, produtos, preços, coleções, apps ou qualquer elemento do site. Este brief é **só e-mail/automação**.
6. **DNS:** apenas registos **aditivos** (os CNAMEs de autenticação da Shopify + DMARC `p=none`). **Nunca** alterar/remover registos **A, AAAA, MX** nem o **SPF existente** (serve Orion + Amazon SES). 
7. **Só produtos REAIS do catálogo.** Puxar o catálogo ao vivo do Shopify e referenciar apenas SKUs existentes. **Proibido inventar produtos, variantes, benefícios ou resultados.**
8. **Conformidade publicitária (cosmética/shapewear):** sem alegações médicas/terapêuticas falsas, sem promessas de "cura", emagrecimento garantido ou antes/depois enganosos. Linguagem de benefício real e honesto.
9. **Consentimento + RGPD:** enviar apenas para contactos **subscritos** (segmento "Assinantes de e-mail", 3.168). Cada e-mail com identificação do remetente e link de cancelamento. Respeitar limites de frequência (anti-spam).
10. **Anti-duplicação de envios:** garantir que um mesmo contacto não recebe e-mails sobrepostos de fluxos diferentes (ex.: carrinho abandonado vs. checkout abandonado). Definir exclusões mútuas.
11. **Rollback:** documentar como reverter cada fluxo criado (ficam inativos = reversível por design).

---

## 2. CONTEXTO DA LOJA (já auditado — NÃO re-descobrir)
- **Plataforma de e-mail:** Shopify Email/Messaging + Shopify Flow (instalados, em uso). **Sem** Klaviyo/Omnisend/Mailchimp.
- **Remetente:** `marketing@izabeldepaula.com` — **não verificado**. Envios saem via backup `@shopifyemail.com`.
- **Lista:** 4.083 clientes · **3.168 subscritos (77,6%)**. Canal e-mail praticamente não aparece nas vendas (oportunidade enorme).
- **Funil de loja (30d):** 3.310 sessões → 14,9% ao carrinho → 21,4% ao checkout → **6,76% convertem**; **~68% abandonam no checkout**. AOV ≈ €46,93.
- **Automação ativa:** "Checkout abandonado" (30d): 167 enviados, 5% cliques, 2 pedidos, €56,92. Template padrão PT, **sem logótipo**, sem branding.
- **Apps relevantes:** WhatsApp (canal) + WATI; upsell Xboost Bundle / Order Bump; COD Releasit. **Checkout duplo** (Shopify nativo + WhatsApp/COD) — *atenção: pedidos via WhatsApp/COD podem não disparar os gatilhos de abandono do Shopify.*
- **Captura de e-mail (popup/form):** **NÃO configurada** — o fluxo de boas-vindas precisa de uma fonte de entrada (recomendar ativar Shopify Forms; tratar como item à parte, não bloqueante).
- **Códigos de desconto REAIS existentes** (usar estes — não criar novos sem aprovação):
  | Código | Valor | Uso pretendido |
  |---|---|---|
  | `BEMVINDA5` | 5% | Boas-vindas |
  | `OPORTUNIDADE10` | 10% (já 27 usos, comprovado) | Recuperação carrinho/checkout (e-mail tardio) |
  | `RECOMPRA10` | 10% | Recompra |
  | `REPOSICAO10` | 10% | Reposição/recompra |
  | `VOLTEI15` | 15% | Win-back/reativação |
  | `DETOX5` | 5% | Cross-sell linha detox |
  - *Expirados (não usar sem reativar):* `REVIEW5`, `GORDURA10`, `CELULITE10`.

---

## 3. PRÉ-REQUISITO CRÍTICO — ENTREGABILIDADE (gate de ativação)
Estado DNS verificado (11/jun) em `izabeldepaula.com` (DNS gerido em **servidor.net.br / Orion**):
- **SPF:** ✅ já existe (`v=spf1 ... include:spf.orion.servidor.net.br +include:amazonses.com ~all`) — **NÃO mexer**.
- **DKIM (Shopify):** ❌ em falta. **DMARC:** ❌ em falta.
- Sem alinhamento → e-mails do funil iriam para **spam** e queimariam a reputação do domínio.

**Regra:** construir todos os fluxos **agora** (inativos), mas **só ativar envios** depois de:
1. Adicionar os **CNAMEs de autenticação da Shopify** (Definições → Notificações → Autenticar remetente) no DNS da Orion.
2. Adicionar **DMARC de monitorização:** `v=DMARC1; p=none; rua=mailto:dmarc@izabeldepaula.com; fo=1`.
3. Confirmar **remetente verificado / domínio autenticado** verde no Shopify.

---

## 4. FLUXOS A CONSTRUIR (especificação)
> Todos **inativos** até ao gate da §3. Cópia em PT-PT, tom da marca: feminino, confiante, próximo, especialista em "body shaper". Estrutura de copy: **PAS / AIDA**, com prova social, urgência honesta, CTA único e claro, e (quando fizer sentido) CTA secundário de **WhatsApp**.

### 4.1 Boas-vindas (novo subscritor) — NOVO
- **Gatilho:** novo subscritor de e-mail (depende de captura — ver §2).
- **E-mail 1 (imediato):** boas-vindas + história da marca + `BEMVINDA5` (validade 7 dias, urgência).
- **E-mail 2 (+48h, se não comprou):** best-seller + prova social.
- **E-mail 3 (+5 dias):** lembrete "BEMVINDA5 a expirar".
- **Exclusão:** quem já comprou.

### 4.2 Carrinho abandonado (pré-checkout) — NOVO
- **Gatilho:** adicionou ao carrinho, **não** iniciou checkout, +1h.
- **E-mail 1 (+1h):** lembrete com imagem do produto, sem desconto.
- **E-mail 2 (+24h):** prova social + incentivo leve (`OPORTUNIDADE10`) **se** ainda não comprou.
- **Exclusão crítica:** se entrou no checkout → sai deste fluxo (passa a ser tratado pelo "Checkout abandonado" ativo). Sem sobreposição.

### 4.3 Checkout abandonado — MELHORIA (cópia INATIVA, não tocar na ativa)
- Criar **cópia inativa** da ativa, melhorada: **logótipo + branding**, copy mais forte, CTA WhatsApp, e **2.º e-mail (+24h)** com `OPORTUNIDADE10` se ainda não comprou.
- **Não substituir a ativa** — propor swap só após teste + gate §3 + aprovação.

### 4.4 Pós-venda — NOVO
- **Gatilho:** pedido pago/expedido.
- **E-mail 1 (na expedição):** agradecimento + **como usar/cuidar do produto específico** (ex.: shapewear) + expectativas de entrega.
- **E-mail 2 (+7–10 dias):** pedido de avaliação + cross-sell suave de produto complementar real.

### 4.5 Recompra / Reposição — NOVO
- **Gatilho:** X dias após entrega, conforme ciclo do produto (ex.: cosmética/detox ≈ 30–45 dias; shapewear → 2.ª peça/cor).
- **Cópia agressiva mas profissional** + `RECOMPRA10` / `REPOSICAO10`.

### 4.6 Win-back / Reativação — NOVO
- **Gatilho:** sem compra há 60–90 dias.
- 1–2 e-mails tom "última oportunidade" + `VOLTEI15` (15%).

---

## 5. DIREÇÃO DE COPYWRITING
- **Personalização:** primeiro nome, produto(s) específico(s) do carrinho/compra, variante/cor quando aplicável. Tokens dinâmicos do Shopify.
- **Por produto:** ângulo de benefício real e honesto (conforto, modelagem, confiança), nunca alegação médica.
- **Cada e-mail:** assunto (≤ ~45 caract.) + preview text + corpo + **1 CTA primário** + (opcional) CTA WhatsApp.
- **Prova social** sempre que possível (avaliações reais, nº de clientes).
- **Urgência honesta** (validade real do código), nunca falsa escassez.

---

## 6. ENTREGÁVEIS E CRITÉRIOS DE ACEITAÇÃO
1. Todos os fluxos da §4 construídos **inativos** no Shopify, documentados (gatilho, condições, tempos, segmento, exclusões, código).
2. Cópia completa de cada e-mail (assunto + preview + corpo + CTA), em PT-PT, pronta a rever.
3. **Teste de envio (seed)** para um endereço interno antes de qualquer ativação.
4. Mapa de **exclusões mútuas** entre fluxos (prova de não-duplicação).
5. Checklist do **gate de entregabilidade (§3)** e nota de **rollback**.
6. Confirmação explícita de que **só foram usados produtos e códigos reais** do catálogo.

---

## 7. FORA DE ÂMBITO (próximas fases)
- Cross-sell avançado / pós-venda multi-toque alargado.
- Popup/Forms de captura (recomendado, mas decisão à parte).
- Campanhas pontuais (newsletter/promoções) — só depois do funil + autenticação.
- Correção do MX (respostas a `marketing@izabeldepaula.com` não são recebidas — item separado).
