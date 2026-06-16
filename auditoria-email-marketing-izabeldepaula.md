# Auditoria — Estado Atual do E-mail Marketing & Marketing
**Loja:** Izabel de Paula® — Body Shaper Expert (store.izabeldepaula.com)
**Data da auditoria:** 11 de junho de 2026 · **Modo:** apenas leitura (nada foi criado, editado, ativado ou apagado)
**Stack:** Shopify nativo (Messaging/Shopify Email + Flow) · GA4 (G-2WXX5512N2) + Meta Pixel · atendimento por WhatsApp

---

## 0) Resumo executivo
- **Só existe 1 fluxo de e-mail ativo:** "Checkout abandonado" (1 e-mail, espera de 10h). Está a funcionar e a gerar vendas → **NÃO TOCAR**.
- Existe um **duplicado inativo** ("Recuperar checkout abandonado") com o mesmo gatilho e o mesmo e-mail (0 envios).
- **Tudo o resto está por configurar:** boas-vindas, pós-compra, win-back, carrinho abandonado, cross-sell, campanhas e branding dos e-mails.
- **Entregabilidade fraca:** remetente não verificado, **sem SPF/DKIM (autenticação de domínio) nem DMARC** → e-mails saem pela infra de backup do Shopify.
- **Lista grande e subaproveitada:** 3.168 subscritos (77,6%) mas o canal **Email não aparece** nas vendas/tráfego.
- **GA4 da loja não acessível** por este login (os dados vão para outra conta Google).

---

## 1) Marketing → Automatizações
> Aviso do Shopify no topo: *"A partir de 1 de maio, não será mais possível acessar as automações de marketing pela seção Marketing. Gerencie-as diretamente no Shopify Messaging. As automações do Flow continuam em execução."*

**Total: 2 automações — ambas canal E-mail e ambas com o mesmo gatilho `Customer abandons checkout`.**

### A. "Checkout abandonado" — ✅ ATIVO
- **Gatilho:** Customer abandons checkout (cliente abandona o checkout)
- **Última execução:** há ~15 min (está a disparar normalmente)
- **Nº de e-mails/passos:** **1 e-mail**. Estrutura do fluxo (Flow):
  1. Gatilho: Customer abandons checkout
  2. Condição: abandonou o checkout na loja virtual = Verdadeiro
  3. Condição: preço do checkout > US$ 0,00 = Verdadeiro
  4. **Espera: 10 horas**
  5. Condição: desde o início, o cliente não comprou nem abandonou outro checkout = Verdadeiro
  6. Condição: 1+ produtos disponíveis em stock = Verdadeiro
  7. Ação: Enviar e-mail de marketing → "You left items at checkout"
- **Atraso de envio:** **10 horas** após o abandono
- **E-mail:** assunto/título "O carrinho está pronto para o checkout"; remetente "Izabel de Paula"; lista dinâmica dos itens do carrinho. **Template padrão do Shopify** em PT, com o nome da marca (sem logótipo).
- **Última alteração ao fluxo:** 29/jul/2024
- **Métricas (últimos 30 dias):** 167 enviados · 5% taxa de cliques · 2 pedidos · 20% taxa de conversão · **€56,92 em vendas** · valor médio €28,46. (Tendência: enviados ↘5%, cliques ↘27%)

### B. "Recuperar checkout abandonado" — ⏸️ INATIVO (desligado)
- **Gatilho:** Customer abandons checkout (o **mesmo** do fluxo ativo)
- **Nº de e-mails:** 1 (a mesma mensagem "You left items at checkout")
- **Métricas:** 0 enviados / 0 vendas
- **Leitura:** é essencialmente um **duplicado** do fluxo ativo, desligado. Não está a causar problemas (está off), mas convém ter consciência de que existem 2 fluxos com o mesmo gatilho.

### Existência por tipo de fluxo
| Tipo de fluxo | Estado |
|---|---|
| Checkout abandonado | ✅ ATIVO (+ 1 duplicado inativo) |
| Carrinho abandonado (cart/browse) | ❌ NÃO CONFIGURADO |
| Boas-vindas (welcome) | ❌ NÃO CONFIGURADO |
| Pós-compra / agradecimento | ❌ NÃO CONFIGURADO |
| Win-back / reativação | ❌ NÃO CONFIGURADO |
| Cross-sell / upsell por e-mail | ❌ NÃO CONFIGURADO |

> Secção "Comece com esses modelos essenciais": **1 de 5 concluídos** (concluído = Recuperar checkout abandonado; sugerido e não feito = Recuperar carrinhos abandonados, entre outros).

---

## 2) Definições → Notificações
- **E-mail de "Checkout abandonado" como notificação separada:** não existe como toggle aqui. No Shopify atual é gerido **pela automação** (ponto 1A). Conclusão prática: o checkout abandonado **está LIGADO** via automação, **atraso 10h**, **template padrão** apenas com o nome da marca.
- **Confirmação de encomenda:** existe (padrão). **Confirmação de envio:** existe (padrão). Restantes transacionais padrão presentes (cancelamento, reembolso, fatura, etc.).
- **Personalização dos modelos** (botão "Personalizar modelos de e-mail"):
  - **Logótipo: ❌ NÃO CONFIGURADO** (campo vazio "Adicionar imagem")
  - Cor de destaque: azul padrão (não é cor de marca)
  - Cabeçalho usa só o **texto** "Izabel de Paula"
  - → As notificações transacionais estão **praticamente no template padrão, sem branding visual**.

---

## 3) Shopify Email / Campanhas
- **App:** "Messaging" (Shopify nativo = Shopify Email + Inbox + automações) **instalado e em uso**; motor **"Flow"** instalado (corre as automações).
- **Campanhas de marketing** (Marketing → Campanhas): **❌ NENHUMA campanha criada** (estado vazio). As "50+ atividades não atribuídas" são **anúncios Facebook/Instagram** (IDs numéricos), não e-mails.
- **Atividades de apps de marketing:** Messaging com "Enviando (2)", última atividade 4/abr/2026.
- **Remetente:** marketing@izabeldepaula.com (ver ponto 6).
- **Sem Klaviyo / Omnisend / Mailchimp** — confirmado (só nativo).

---

## 4) Clientes
- **Total: 4.083 clientes**
- **Com consentimento de marketing (subscritos): 3.168 (77,59%)** — segmento "Assinantes de e-mail" (`email_subscription_status = SUBSCRIBED`)
- **Segmentos:** 8 listados, quase todos **predefinidos do Shopify**:
  - Assinantes de e-mail — 78%
  - Compraram pelo menos 1x — 54% · Não fizeram compras — 46% · Compraram >1x — 11%
  - Checkouts abandonados (30d) — 4% · Adicionados a empresas — 0% / não adicionados — 100%
  - **Único segmento personalizado (criado pelo admin):** "Pedidos feitos Últimos 30 dias" — 5% (criado 18/nov/2025)
- **Tags de cliente:** sem uso evidente.
- **Crescimento:** base ativa (838 pedidos; aquisição contínua via FB/IG/orgânico). Curva exata de crescimento da lista não medida nesta auditoria.

---

## 5) Descontos
**~17 descontos** (maioria códigos de % no pedido inteiro, ativos). **Há 1 desconto automático.**

| Código/Nome | Tipo | Método | Estado | Usos |
|---|---|---|---|---|
| XBoost Bundle | desconto de produto | **Automático** | Ativo | 39 |
| XBoost Bundle Code | desconto de produto | Código | Ativo | 0 |
| DETOX5 | 5% no Detox Líquido | Código | Ativo | 6 |
| VOLTEI15 | 15% no pedido | Código | Ativo | 0 |
| COMBO10 | 10% no pedido | Código | Ativo | 0 |
| REPOSICAO10 | 10% no pedido | Código | Ativo | 0 |
| BEMVINDA5 | 5% no pedido (boas-vindas) | Código | Ativo | 0 |
| 3 Unidades -10% | 10% no pedido | Código | Ativo | 2 |
| 3 Unidades -5% | 5% no pedido | Código | Ativo | — |
| 2 Unidades -5% | 5% no pedido | Código | Ativo | 25 |
| IZB70% | 95% no e-book Barriga Fit | Código | Ativo | 4 |
| OPORTUNIDADE10 | 10% no pedido | Código | Ativo | 27 |
| PATRICIADIOGO10 | 10% (influencer) | Código | Ativo | 0 |
| PAULASANTOS10 | 10% (influencer) | Código | Ativo | 6 |
| RECOMPRA10 | 10% (recompra) | Código | Ativo | 0 |
| REVIEW5 | 5% no pedido | Código | Expirado | 0 |
| GORDURA10 | 10% em Gordura | Código | Expirado | 4 |
| CELULITE10 | 10% em Celulite | Código | Expirado | 3 |

> Nota útil: já existem códigos **BEMVINDA5** (boas-vindas) e **RECOMPRA10** (recompra), mas **sem nenhuma automação de e-mail a usá-los**.

---

## 6) Entregabilidade & Remetente
- **E-mail do remetente:** marketing@izabeldepaula.com — **⚠️ NÃO VERIFICADO** ("Confirme que você tem acesso a este e-mail")
- **Autenticação de domínio (SPF/DKIM): ❌ NÃO CONFIGURADO** — estado "Requer configuração". O Shopify mostra **6 registos CNAME** por adicionar ao DNS de izabeldepaula.com (ex.: `fpr._domainkey → dkim1.906653f2e996.p347.email.myshopify.com`).
- **DMARC: ❌ NÃO CONFIGURADO** (Shopify oferece "Ver etapas").
- **Como saem os e-mails na prática:** como o domínio não está autenticado, o Shopify usa o endereço de backup **store+75406999819@shopifyemail.com**. Ou seja, o envio é pela infraestrutura **shopifyemail.com** com um "From" `marketing@izabeldepaula.com` não autenticado → **risco real de spam/entregabilidade reduzida**.
- **Domínio de envio próprio:** ❌ NÃO CONFIGURADO. Sem indício de Google Workspace/Gmail para envio aos clientes — todo o envio é via Shopify Email.

---

## 7) Apps instaladas (14)
- **E-mail/automação (nativo):** Messaging · Flow
- **WhatsApp:** WhatsApp (canal Shopify) · WATI: Whatsapp Chat (€4,90/30 dias)
- **Upsell/bundle:** Xboost Bundle · Addon Checkbox Order Bump
- **COD:** Releasit COD Form
- **SEO/conteúdo/tradução:** Avada SEO Suite · Search & Discovery · Lookfy Gallery · Translate & Adapt
- **Importação:** Ablestar Woo Import
- **Personalizadas/dev:** "claude code" · "Batch - Izabel de Paula"
- **App de POPUP / captura de e-mail:** ❌ NÃO CONFIGURADO (nenhuma app tipo Privy/Justuno)
- **E-mail de terceiros (Klaviyo/Omnisend/Mailchimp):** ❌ NÃO (confirmado)

---

## 8) GA4 / Google
- A loja usa o ID GA4 **G-2WXX5512N2** (conforme indicado).
- **⚠️ A conta Google ligada ao Admin (matheusgustavo36@gmail.com) NÃO tem acesso a essa propriedade.** Só tem acesso à conta "Default Account for Firebase" com 2 propriedades **não relacionadas**:
  - "construware-system" (ID **G-P1YJ04XMS3** — **VAZIA**, "Nenhum dado foi recebido do seu site ainda")
  - "walletwawe"
- **Conclusão:** os dados GA4 da loja (G-2WXX5512N2) estão a ir para **outra conta Google**, inacessível por este login. Não foi possível analisar o GA4 da loja por aqui. (Recomenda-se confirmar quem é o proprietário da propriedade G-2WXX5512N2.)

### Em alternativa — Análises NATIVAS do Shopify (autoritativas), últimos 30 dias (12 mai–11 jun 2026)
- **Sessões: 3.310** (↘17%)
- **Taxa de conversão: 6,76%** (↗14%)
- **Funil:** 3.310 sessões → 492 adicionaram ao carrinho (14,86%) → 708 chegaram ao checkout (21,38%) → **224 converteram (6,76%)** → ou seja, **~68% abandonam no checkout** (reforça a prioridade nº1).
- **Total de vendas: €14.103,55** (líquidas €10.560,37) · **AOV €46,93**
- **Vendas por canal:** Loja Online €8,5 mil · "Lovable" €5,5 mil
- **Tráfego (sessões por referenciador):** Facebook (Lisboa 233 · Porto 185 · n/d 106) · Instagram (Lisboa 167) · Direto (Lisboa 185)
- **Vendas por referenciador:** Direto/Nenhum €5,7 mil · izabeldepaula (orgânico) €3,8 mil (↗145%) · Facebook €1,8 mil · Instagram €1 mil · Google search €929
- **Canal "Email": ❌ NÃO APARECE** nas fontes nem nas vendas → o e-mail tem peso ~nulo (exceto os €56,92 da automação de checkout abandonado).
- (Painel Marketing 30d, para referência: 3.296 sessões · €6.357 vendas atribuídas · 122 pedidos · conversão 6,76%; canais FB pago, IG pago, Direto, orgânico — orgânico "izabeldepaula" com 15,25% de conversão. Sem canal Email.)

---

## 9) Mapa "Não Tocar" vs "Oportunidades"
**✅ Funciona — NÃO TOCAR:** automação "Checkout abandonado" (ativa, a disparar, 10h, gera vendas).

**ℹ️ A ter em conta:** duplicado inativo "Recuperar checkout abandonado" (mesmo gatilho, off).

**🚀 Por configurar (NÃO CONFIGURADO):**
- Branding dos e-mails (logótipo + cor de marca)
- **Autenticação de domínio (SPF/DKIM) + DMARC** — crítico para entregabilidade
- Verificar o remetente marketing@izabeldepaula.com
- Fluxos: carrinho abandonado, boas-vindas, pós-compra, win-back, cross-sell
- Campanhas de e-mail (nunca foi enviada nenhuma)
- Popup de captura de e-mail
- Clarificar acesso ao GA4 da loja (G-2WXX5512N2)
