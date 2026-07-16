# Go-live — landing da Clínica em `izabeldepaula.com/clinica`

> Atualizado 16/jul/2026. **Nada está publicado.** Tudo o que falta está listado aqui.

## 1. Estado real (sondado ao vivo, read-only)

| Facto | Evidência |
|---|---|
| O apex serve o **site estático deste repo** | `/produto.html`, `/assets/styles.css` → **200**; `<title>` da home == `index.html` do repo |
| Publica-se por **GitHub Actions → FTP** | `.github/workflows/deploy.yml` (FTP-Deploy-Action), gatilho: push para `main` |
| **www é o canónico** | a home declara `<link rel="canonical" href="https://www.izabeldepaula.com/">` |
| **Já existe** `/clinica.html` | **200**, 6.775 bytes, 05/jun — página-ponte que só remete para `clinicaizabeldepaula.com` |
| Essa página tem **canonical morto** | aponta para `izabeldepaula.pt` → **não resolve** (`curl` = `000`) |
| `/clinica` está **ocupado** | **301** → post `/clinica-izabel-de-paula-chega-ao-porto/` (a clínica do Porto **já não existe**) |
| O action gere **194 ficheiros** | não inclui `assets/css/*` nem `clinica.html` → **não os apaga** (foram postos à mão, fora do pipeline) |

**Porque é que `termos-uso.html` e `entregas-portes.html` dão 404 ao vivo:** não estão na *allowlist* do workflow. Nunca foram publicados. Não é bug de sincronização.

---

## 2. ⛔ BLOQUEADOR — 2 linhas no CI (Squad Guard impediu-me de as fazer)

`.github/workflows/deploy.yml` é zona de alto risco (detém os segredos FTP). **`clinica.html` não está na allowlist**, por isso um push **não publica nada**.

**a) no gatilho `paths:`**
```yaml
      - 'produto.html'
      - 'clinica.html'          # ← ADICIONAR
      - 'politica-privacidade.html'
```

**b) no passo "Preparar pasta de publicação"**
```bash
for f in index.html produto.html clinica.html politica-privacidade.html trocas-devolucoes.html sitemap.xml; do
  [ -f "$f" ] && cp "$f" dist/ || true
done
# a landing também em /clinica/ (URL definitivo; /clinica.html fica com canonical para cá)
if [ -f clinica.html ]; then
  mkdir -p dist/clinica
  cp clinica.html dist/clinica/index.html
fi
```

Aplicar à mão, **ou** relançar a sessão com `SQUAD_GUARD=off` e eu faço.

---

## 3. Ordem de merge (há fila)

A clínica depende do `assets/consent.js`, que vem no **PR #7**. Sem ele o pixel **nunca dispara** (falha segura: sem consentimento, sem tracking).

1. **PR #7** — consentimento de cookies, páginas legais, identificação da empresa
2. **PR #8** — conversão esgotados / PT-PT
3. **PR #9** — conformidade do copy
4. **PR da clínica** (este trabalho) ← só depois

Cada merge para `main` dispara o deploy. **O merge é humano.**

---

## 4. O que acontece quando publicar

| URL | Resultado |
|---|---|
| `/clinica/` | a landing. **Canonical, URL definitivo** (anúncios, bio, imprensa) |
| `/clinica.html` | mesma página, canonical → `/clinica/`. Substitui a ponte partida; o URL já indexado não dá 404 e o Google consolida |
| `/clinica` | LiteSpeed vê a **pasta** e faz 301 → `/clinica/` **antes** de o WordPress ver o pedido (a regra do WP salta diretórios existentes) → **o redirect do Porto deixa de disparar sozinho** |

---

## 5. WordPress (higiene, não bloqueante)

1. Apagar a regra `/clinica` → post do Porto *(o 301 é gerado por PHP → é do WP, não do `.htaccess`)*
2. Criar 301: `/clinica-izabel-de-paula-chega-ao-porto/` → `/clinica/`
3. Despublicar o post do Porto
4. **Purgar a cache LiteSpeed** (senão o 301 antigo continua a ser servido)

---

## 6. Verificação (colar depois do deploy)

```bash
for u in "https://www.izabeldepaula.com/clinica/" \
         "https://www.izabeldepaula.com/clinica" \
         "https://www.izabeldepaula.com/clinica.html" \
         "https://www.izabeldepaula.com/" \
         "https://www.izabeldepaula.com/produto.html"; do
  echo "$(curl -s -o /dev/null -w '%{http_code} -> %{redirect_url}' -A 'Mozilla/5.0' "$u")  $u"
done
```
Esperado: `/clinica/` → **200** · `/clinica` e `/clinica.html` → **301 → /clinica/** · home e `/produto.html` → **200 intactos**.
Depois: um post real do blog tem de continuar **200**; submeter `/clinica/` no Search Console.

## 7. Rollback (1 minuto)
Reverter o merge → o push para `main` republica a versão anterior. `/clinica.html` antigo volta a ser reposto? **Não** — fazer backup do ficheiro antes (descarregar `/clinica.html`), porque o pipeline passa a geri-lo.

---

## 8. Medição — ✅ pronta

```js
var META_PIXEL_ID = '576120678880705';        // pixel DA CLÍNICA
var GOOGLE_ADS_ID = 'AW-688762442';
var GOOGLE_LABEL  = 'D6DHCJnEu9MaEMrctsgC';   // ação "Whatsapp-Lead"
```
- Dispara `fbq('track','Contact')` + `gtag('event','conversion')` nos cliques de **WhatsApp** e **telefone**.
- **Só nesta página** — o site-mãe mantém o pixel do e-commerce no header global. Não juntar.
- Carrega **após consentimento**, não no `<head>`: a página tem banner de cookies e disparar antes do "Aceitar" tornaria o banner inválido (RGPD). Mesmo ID, mesma etiqueta — só o momento respeita a escolha.

## 9. ⚠️ Vídeo de depoimento — RETIDO (não publicar)

`IMG_3914.mov` foi convertido (`assets/video/depoimento-1.mp4`, 7,1 MB, HEVC→H.264 + HDR→SDR) mas **está fora do commit e fora da página**.

Legendas extraídas: *"diabetes muito descontrolados"* → *"o meu estado geral tava péssimo"* → *"Os Produtos"* (mostra **Barriga Fit Stop Gordura**) → *"ao fim de quinze dias"* → *"o meu médico notou"* → *"voltei ao que era"*.

**Alegação de doença com endosso médico para um suplemento alimentar** — proibida pelo Reg. (CE) 1924/2006 e art. 7.º do Reg. 1169/2011. O que conta é a impressão transmitida, e é inequívoca. Acresce que é sobre **cápsulas da loja**, não sobre os tratamentos manuais da clínica — página errada.

**Precisa de:** outro depoimento, sobre os tratamentos da clínica, sem menção a doenças nem a médicos.
O carrossel de depoimentos já está pronto (desktop + mobile) para o receber.
