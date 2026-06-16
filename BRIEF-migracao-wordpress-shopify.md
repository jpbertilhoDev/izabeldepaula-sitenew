# BRIEF DE EXECUÇÃO — Migração WordPress → Shopify + Troca de Template (com preservação de SEO)
**Marca:** Izabel de Paula® — Body Shaper Expert · **Data:** 11/jun/2026
**Modo de origem:** auditoria read-only + sondagem HTTP ao vivo
**Padrão:** profissional, com cautela e backup — **proibido amadorismo, proibido quebrar a pegada digital.**

---

## 0. OBJETIVO
Consolidar a presença digital na **Shopify** sem perder **nada** do histórico/SEO acumulado:
1. Preservar **toda a pegada digital** do site antigo (blog WordPress, conteúdos, posições no Google, links e redirecionamentos).
2. **Migrar o blog antigo (WordPress/WooCommerce) → blog do Shopify.**
3. **Trocar o template** do domínio principal `izabeldepaula.com` para o novo design (tema Shopify deste repositório).
4. Fazer a **migração de hospedagem com cautela, backup total e plano de rollback.**

---

## 1. ACHADOS AO VIVO (evidência — 11/jun/2026)
- **`izabeldepaula.com` (apex)** → `Server: LiteSpeed`, host em **servidor.net.br / Orion** (IP `23.227.176.186`). É o **site ANTIGO (WordPress/WooCommerce)**, 200 OK, ~210 KB, `Last-Modified` 05/jun/2026. **Aqui está a pegada digital + redirecionamentos.**
- **`store.izabeldepaula.com`** → **Shopify** (Cloudflare/GCP), 200 OK. Loja **nova**, viva. Tem `sitemap_blogs_1.xml` (existe blog Shopify), mas o handle `/blogs/news` dá **404** (handle diferente do default).
- **DNS** gerido em `ns1/ns2.orion.servidor.net.br`. **SPF já existe** (não mexer). MX aponta para o próprio host LiteSpeed.
- **Repositório local** contém: `shopify-theme/` (tema Shopify a publicar) + site estático premium (`index.html`, `site-para-cliente/`) usado como design de referência.
- **Conclusão:** apex (WordPress) e loja (Shopify) são **dois sistemas distintos**. Trocar o apex para a Shopify **sem 301** destrói SEO. O risco é real e alto (orgânico em crescimento: +145%).

---

## 2. REGRAS INQUEBRÁVEIS
1. **Backup ANTES de tudo.** Nada é alterado/apagado sem backup verificado e restaurável (ver §3, B0).
2. **Não apagar** conteúdo, posts, páginas, media ou redirecionamentos do site antigo.
3. **Preservar SEO:** cada URL antiga indexada precisa de **301** para o destino equivalente, ou de conteúdo equivalente no Shopify. Zero 404 órfãos.
4. **Cutover isolado:** a troca do apex (passo de risco) é feita **numa janela controlada, sozinha**, com rollback pronto — nunca no mesmo momento que outras alterações (ex.: ativação de e-mails).
5. **DNS:** alterações mínimas e reversíveis; documentar a zona DNS atual antes de mudar. Não tocar em SPF/registos de e-mail.
6. **WooCommerce:** confirmar se ainda processa encomendas. Se sim, **não interromper vendas** sem plano.
7. **Tema/preços/produtos:** não alterar nada na loja Shopify viva fora do âmbito desta migração (publicação de tema é controlada e reversível: tema novo fica como cópia, publica-se só após QA, tema antigo mantido como backup).

---

## 3. METODOLOGIA FASEADA (ordem segura)

**B0 — Auditoria read-only + BACKUP TOTAL** *(sem risco; faz-se já, em paralelo com o e-mail)*
- Crawl completo do apex antigo (todas as URLs, blog, páginas, media).
- Exportar WordPress (conteúdo, posts, páginas, media) + dados WooCommerce.
- Inventariar **todos os redirecionamentos** existentes (`.htaccess` / regras LiteSpeed / plugins de redirect).
- Puxar **URLs indexadas** do Google Search Console (+ sitemaps antigos).
- Backup da **zona DNS** atual.
- **Entregável:** pasta de backup + inventário de URLs + inventário de redirects.

**B1 — Mapa de redirecionamentos 301** (URL antiga → URL nova Shopify). Validar cobertura total das URLs indexadas.

**B2 — Migração do blog** WordPress → blog Shopify (posts, imagens, metadados, datas, autores; canonical correto).

**B3 — Preparar tema novo (staging)** na Shopify como cópia **não publicada**; QA completo (desktop/mobile, PDP, carrinho, checkout) em preview. **Não publicar ainda.**

**B4 — Cutover (janela única, com rollback)**
- Importar os 301 na Shopify (URL Redirects).
- Apontar `izabeldepaula.com` → Shopify (decisão de estratégia, ver §5) **ou** publicar o tema novo, conforme a arquitetura escolhida.
- Manter o site/host antigo intacto como backup durante o período de observação.

**B5 — Verificação** — crawl pós-cutover (0 erros 404 órfãos), redirects resolvem, Search Console (cobertura/erros), monitorizar orgânico ~2–4 semanas. Rollback imediato se houver queda anómala.

---

## 4. O QUE O CLIENTE PRECISA DE ENVIAR (acessos/ativos)
**Para começar B0 (auditoria + backup):**
- [ ] Login do **painel de hospedagem** do apex (LiteSpeed @ servidor.net.br — confirmar nome comercial; soou como "Info"). cPanel/hPanel/Plesk.
- [ ] Login **WordPress admin** (`/wp-admin`) do site antigo.
- [ ] Acesso ao **Google Search Console** da propriedade `izabeldepaula.com` (conta Google correta — a `matheusgustavo36@gmail.com` não tinha acesso ao GA4).
- [ ] Confirmar estado do **WooCommerce** (ainda vende? quantas encomendas/mês?).
- [ ] Export dos **redirecionamentos** atuais (ou acesso ao `.htaccess`/plugin).

**Para B3/B4 (tema + cutover):**
- [ ] Acesso **Shopify Admin** (o cowork já tem) + confirmar que `shopify-theme/` é o design final.
- [ ] Login do **painel DNS** (servidor.net.br / Orion).
- [ ] Decisão de estratégia do apex (ver §5).

---

## 5. DECISÃO PENDENTE — arquitetura do domínio
Como fica `izabeldepaula.com` no final?
- **(A) Recomendado:** apex `izabeldepaula.com` passa a ser a **loja Shopify canónica** (apex → Shopify, `store.` faz 301 → apex, ou vice-versa). Domínio único, autoridade SEO concentrada.
- **(B)** Manter `store.izabeldepaula.com` como canónico e o apex faz 301 → store.
> Recomendação: **(A)** — concentra a autoridade de SEO histórica no domínio principal. Requer 301 completos do WordPress.

---

## 6. FORA DE ÂMBITO (não fazer agora)
- Ativar envios de e-mail (Track A, brief separado — só após entregabilidade verde).
- Redesenho de conteúdo do blog (migrar primeiro, otimizar depois).
- Correção do MX / receção de e-mail no domínio (item separado).
