# Izabel de Paula — Loja

Loja oficial (e-commerce) da marca **Izabel de Paula · Body Shaper Expert®**.
Site estático, premium e cinematográfico (fundo branco, acentos dourados, Cormorant
Garamond + Jost), totalmente responsivo — agora com **páginas de produto**,
**carrinho de compras** e **checkout por WhatsApp**.

Os produtos, preços e descrições são **reais**, extraídos da loja oficial
([store.izabeldepaula.com](https://store.izabeldepaula.com/)).

## Estrutura

```
.
├── index.html              # vitrine (home): hero, mais vendidos, catálogo, experiência
├── produto.html            # página de produto (template único, via ?produto=<slug>)
├── assets/
│   ├── styles.css          # sistema de design + componentes de loja, carrinho e PDP
│   ├── data.js             # ⟵ FONTE DE DADOS: todos os produtos (gerado, ver scripts/)
│   ├── cart.js             # vitrines + carrinho (localStorage) + gaveta + checkout WhatsApp
│   ├── product.js          # render da página de produto + relacionados
│   └── script.js           # interações da home (hero, filtros, carrosséis, reveal)
├── images/                 # banners do hero (images/hero/) + fotos de produtos/kits
├── scripts/
│   ├── build-data.py       # gera assets/data.js a partir do snapshot abaixo
│   └── real-products.json  # snapshot do catálogo real (store.izabeldepaula.com)
├── design-source/          # proveniência: README do bundle + transcrição do chat de design
└── README.md
```

## Funcionalidades de e-commerce

- **Catálogo data-driven** — `index.html` (mais vendidos, grade filtrável e experiência)
  é renderizado a partir de `assets/data.js`, então preços e links ficam sempre consistentes.
- **Páginas de produto** (`produto.html?produto=<slug>`) — galeria, preço real + preço
  "antes" e % de desconto, seletor de quantidade, **Adicionar à sacola**, **Comprar agora
  pelo WhatsApp**, descrição detalhada real (benefícios, modo de uso, ingredientes,
  resultados, FAQ) e produtos relacionados.
- **Carrinho** — gaveta lateral persistente (`localStorage`), com quantidades, remoção,
  subtotal e barra de progresso de **frete grátis acima de €50**. O contador aparece no
  ícone da sacola no header.
- **Checkout Shopify** (pagamento real: cartão, MB WAY, etc.) para **todos os 14 produtos**
  (8 individuais + 6 kits), com **desconto por quantidade** (2 un. −5% / 3+ un. −10%)
  aplicado via cupão. Na página de produto, o seletor de quantidade leva direto ao checkout
  Shopify (`/cart/{variant}:{qty}?discount=CODE`); no carrinho, vários itens vão num único
  link `/cart/v1:q1,v2:q2`. Os IDs de variante e cupões ficam no dicionário `SHOPIFY` em
  `scripts/build-data.py`.
- **Checkout WhatsApp** (+351 912 976 633) — opção secundária ("Prefere encomendar pelo
  WhatsApp?") no carrinho, e fallback automático caso algum item não tenha link Shopify.

### Produtos incluídos (14)

8 individuais — Creme Barriga Fit, Sublime Lush, Gel Leg Fit Express, Gel Levanta Bumbum,
Stop Gordura (cápsulas), Detox Líquido, Pernas Leves, Depur — e 6 kits — Stop Gordura,
Detox + Stop Gordura, Fire, Stop Lipedema & Celulite, Verão e Renovação Total.

## Atualizar o catálogo (preços / descrições / novos produtos)

`assets/data.js` é **gerado** — não edite à mão. Para atualizar:

```bash
# 1) (opcional) baixar de novo o catálogo real
curl "https://store.izabeldepaula.com/products.json?limit=250" -o scripts/real-products.json

# 2) regenerar assets/data.js
python scripts/build-data.py
```

O mapeamento de exibição (quais produtos entram, imagem, categoria, selos, ordem) está no
dicionário `META` em `scripts/build-data.py`. Para trocar uma imagem ou um selo, edite ali
e rode o script de novo.

## Como rodar localmente

Sirva por HTTP (necessário para o carrinho e a navegação entre páginas funcionarem bem):

```bash
python -m http.server 8000
# acesse http://localhost:8000
```

Ou use a extensão **Live Server** do VS Code.

## Deploy

Site estático — publique a raiz em qualquer host estático (Netlify, Vercel, Cloudflare
Pages, GitHub Pages). Nenhum backend necessário.

## Pendências / próximos passos

- **Galeria de produto** — hoje cada produto usa 1 imagem. A loja real tem várias fotos
  por produto (estão em `scripts/real-products.json`); dá para baixá-las e montar uma
  galeria com miniaturas.
- **Links sociais** — Instagram e TikTok no footer estão como `#`.
- **Produtos extra disponíveis** — o cliente também tem links de checkout para kits que não
  estão no catálogo atual (ex.: Tratamento Intensivo €287, Detox Pós Férias €215, Kit
  Emagrecimento Detox Líquido €108, Celulite Lipedema €70). Para adicioná-los, crie a
  entrada em `META` + `SHOPIFY` em `scripts/build-data.py` (precisam de imagem) e rode o
  gerador.
- **Snapshot de preços** — `scripts/real-products.json` é uma fotografia do catálogo
  (capturada em 2026-06-07). Rode o passo de atualização acima quando os preços mudarem.

## Notas técnicas

- **Imagens do hero** são PNGs grandes (~3 MB cada). Para produção, otimizar/converter
  para WebP/AVIF acelera bastante o carregamento — sem alterar o visual.
- Fontes carregadas via `@import` no CSS, com `preconnect` no HTML para reduzir latência.
- Animações respeitam `prefers-reduced-motion` e só são armadas em aba visível.
