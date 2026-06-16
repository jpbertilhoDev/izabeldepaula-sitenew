# Como editar o site da Izabel de Paula

Guia prático de como alterar o site depois de publicado.
Resumo: **é tranquilo e seguro** — nada vai ao ar de surpresa, tudo passa por
preview antes, e dá para reverter num clique.

> **Este site é feito à medida** (custom). É rápido e bonito, mas tem uma
> diferença importante face a um tema "normal" do Shopify: **descrições e fotos
> dos produtos são curadas em código** (não nos campos padrão do admin). Os
> **preços e o stock**, esses sim, vêm ao vivo do Shopify. Veja a tabela abaixo.

---

## 1. O que MUDA SOZINHO (você faz no admin do Shopify)

Sem precisar de ninguém mexer no código, sem republicar — reflete no site:

| O quê | Onde, no admin |
|---|---|
| **Preços** e preço "antes" (compare-at) | Produtos → (produto) → Preço |
| **Stock / disponibilidade** | Produtos → (produto) → Inventário |
| **Cupões / descontos** (ex.: `SECABARRIGA5`, `SECABARRIGA10`) | Descontos → Criar desconto |
| **Páginas legais** (privacidade, termos, entregas, trocas) | Loja online → Páginas |
| **Texto do anúncio do topo, nº de WhatsApp, valor de portes grátis** | Loja online → Temas → **Personalizar** |

> ⚠️ Os cupões de 2/3 unidades só aplicam no checkout **se existirem no admin**
> com o código certo. Sem eles, o desconto aparece no carrinho mas cobra o valor cheio.

---

## 2. O que passa POR MIM (alteração no código + republicar)

Estas coisas vivem no código curado do site. É só me dizer o que quer:

- **Descrições** dos produtos — a pequena (sob o título) e a grande (modo de uso, etc.)
- **Textos, frases de vitrine (blurbs), títulos de secções**
- **Fotos dos produtos / galerias**
- **Adicionar ou remover produtos** da vitrine
- **Design, layout, secções, menu/navegação**
- A secção de **avaliações de clientes** (hoje está oculta — reativável)
- Qualquer ajuste visual / responsivo / novo bloco

Turnaround costuma ser rápido. Exemplo de pedido:
> *"Claudinho, muda a descrição pequena do Stop Gordura para … e troca a 1ª foto."*

---

## 3. ⚠️ O detalhe que evita frustração

Por ser à medida:

- **Editar a descrição de um produto no admin do Shopify NÃO muda o site.**
  A página de produto lê de um ficheiro curado (`theme-meta.js`), não do campo
  do Shopify. → Para mudar descrição/foto, **fale comigo**.
- **O preço, esse muda.** É lido ao vivo do Shopify. Mudou no admin → muda no site.

| Item | De onde o site lê | Como mudar |
|---|---|---|
| Preço / compare-at / stock | **Ao vivo do Shopify** | Você, no admin |
| Descrição pequena e grande | Código curado (`theme-meta.js`) | Comigo |
| Fotos / galeria | Assets curados do tema | Comigo |
| Quais produtos aparecem | Lista curada de produtos | Comigo |
| Anúncio / WhatsApp / portes | Definições do tema | Você, em Personalizar |

---

## 4. O processo, sempre seguro

Quando você me pede uma alteração, o caminho é sempre este:

1. Altero localmente e corro a verificação (`theme check`).
2. Subo para um tema **invisível** (não-publicado) → você revê no **preview**.
3. **Só publico com o seu "OK" explícito.**
4. O tema anterior fica guardado → **rollback num clique** se não gostar.

Ou seja: **o site ao vivo nunca quebra de surpresa.**

---

## 5. Rollback (voltar atrás)

Se algo publicado não agradar:

- **No admin:** Loja online → Temas → no tema anterior, **Ações → Publicar**.
- Existe também uma cópia de segurança local da versão anterior em
  `_work/backup-live-180543848715/`.

---

## Apêndice técnico (para quem mexe no código)

**Loja:** `64d0d9-cd.myshopify.com` · domínio público `store.izabeldepaula.com`
**Tema live atual:** `181405417739` ("Izabel de Paula - site novo (staging)")
**Tema anterior (backup, unpublished):** `180543848715`
**Pasta do tema:** `shopify-theme/`
**Shopify CLI:** instalada em `%APPDATA%\npm\shopify.cmd` (login via device-code, no navegador)

### Onde vivem as coisas
- **Metadados curados** (descrição pequena `short`, blurb, categoria, rating, galeria):
  `scripts/build-data.py` → dicionários `SHORT`, `BLURB` e a lista `META`.
- **Descrição grande:** gerada de `scripts/real-products.json` (snapshot da loja) por `build-data.py`.
- **Regenerar os dados do tema** depois de editar `build-data.py`:
  ```
  python _work/gen-theme-meta.py
  ```
  (gera `shopify-theme/assets/theme-meta.js` e também `assets/data.js`)
- **Dados ao vivo** (preço/stock/variante): `shopify-theme/snippets/product-data.liquid`.
- **Junção** dos dois (curado + ao vivo): `shopify-theme/assets/bootstrap.js` → `window.PRODUCTS`.
- **Navegação/header:** `shopify-theme/layout/theme.liquid`.
- **Avaliações (ocultas):** `shopify-theme/assets/reviews.js`. Para reativar,
  descomente a linha indicada em `shopify-theme/assets/product.js`.

### Comandos úteis (PowerShell)
```powershell
$sh = "$env:APPDATA\npm\shopify.cmd"
$theme = "C:\Users\LIVESTREAM\documents\izabeldepaula-site\shopify-theme"

# Verificar erros de Liquid
& $sh theme check --path $theme

# Subir para um tema NOVO invisível (staging)
& $sh theme push --store 64d0d9-cd.myshopify.com --path $theme --unpublished --theme "Staging"

# Subir para o tema staging existente
& $sh theme push --store 64d0d9-cd.myshopify.com --path $theme --theme 181405417739

# Listar temas (ver qual é o live)
& $sh theme list --store 64d0d9-cd.myshopify.com

# PUBLICAR (tornar live) — só com OK do cliente
& $sh theme publish --store 64d0d9-cd.myshopify.com --theme 181405417739 --force

# Backup: baixar o tema live para uma pasta
& $sh theme pull --store 64d0d9-cd.myshopify.com --theme <ID> --path <pasta>
```

> **Regra de ouro:** nunca `theme push` direto ao tema live. Sempre staging →
> preview → `theme publish` com o OK do cliente.
