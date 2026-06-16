---
name: mobile-ux
description: >-
  Auditoria e correção de experiência mobile / responsividade / UI-UX para o site
  estático Izabel de Paula. Use quando o pedido envolver "mobile", "celular",
  "responsivo", "scroll horizontal / barra de rolagem", "não cabe na tela",
  "ficou cortado", "zoom ao tocar no campo", "botão pequeno", "espremido no
  telemóvel", ou qualquer ajuste de layout/legibilidade/toque em telas pequenas.
  Encapsula a metodologia das melhores práticas de UI/UX mobile + o fluxo de
  build/deploy específico deste projeto.
allowed-tools: Read, Edit, Write, Grep, Glob, Bash
---

# Mobile UX — Izabel de Paula

Skill para deixar o site **impecável no telemóvel**. Você atua como um painel das
maiores referências de UI/UX e engenharia front-end mobile (Luke Wroblewski /
"Mobile First", Apple HIG, Material Design, Steve Krug / "Don't Make Me Think",
Brad Frost / Atomic Design). O objetivo: **toda visita no celular flui sem
atrito** — nada corta, nada exige zoom, todo toque acerta o alvo.

## Contexto do projeto (leia antes de editar)

Site estático, **sem framework**. Dados gerados por script; CSS é manual.

- Fonte de verdade do conteúdo: `scripts/build-data.py` → gera `assets/data.js`
  (`window.PRODUCTS` + `window.SHOP`). **Nunca** edite `data.js` à mão.
- Estilo: `assets/styles.css` (manual, ~1500 linhas, mobile-first com `clamp()`).
- Páginas: `index.html` (loja principal), `produto.html` (PDP), `politica-privacidade.html`.
- **Servido a partir de `site-para-cliente/`** (cloudflared, porta 8080). Editar a
  raiz **não** atualiza o preview — é preciso copiar o arquivo alterado para
  `site-para-cliente/assets/`. Ver memória `build-deploy-workflow`.

### Regra de deploy (sempre, ao final)
```bash
cp assets/styles.css site-para-cliente/assets/styles.css
# se mexeu em data: PYTHONIOENCODING=utf-8 python scripts/build-data.py
#   depois: cp assets/data.js assets/product.js site-para-cliente/assets/
```
Confirme com `diff` que os dois ficaram idênticos. Sem isso, o cliente continua
vendo a versão antiga.

## Viewports de referência

Teste mentalmente (e no DevTools) nestas larguras — as quebras reais do site:

| Largura | Aparelho típico        | O que checar                          |
|---------|------------------------|---------------------------------------|
| 320 px  | iPhone SE 1ª ger.      | nada pode cortar; texto não estoura   |
| 360 px  | Android base / Galaxy  | caso mais comum no Brasil/Europa      |
| 390 px  | iPhone 14/15           | espaçamento e alvos de toque          |
| 768 px  | tablet retrato         | grids de 2→1 coluna                   |

Breakpoints já usados no CSS: **1080 / 880 / 860 / 760 / 680 / 560 / 480 / 420**.
Reaproveite-os antes de inventar um novo.

## Metodologia (sempre nesta ordem)

### 1. Reproduzir e medir — nunca adivinhar
Antes de mudar CSS, **identifique o elemento exato** que causa o problema.
Cole este snippet no console do navegador (DevTools em modo mobile) — ele lista
todo elemento mais largo que a viewport, que é a causa de 95% dos scrolls
horizontais:

```js
(() => {
  const w = document.documentElement.clientWidth;
  const bad = [...document.querySelectorAll('*')].filter(el => {
    const r = el.getBoundingClientRect();
    return r.right > w + 1 || r.left < -1;
  });
  console.table(bad.map(el => ({
    tag: el.tagName, cls: el.className,
    right: Math.round(el.getBoundingClientRect().right), vw: w
  })));
  bad.forEach(el => el.style.outline = '2px solid red');
})();
```

### 2. Catálogo de causas (do mais provável ao menos)

1. **`position:fixed` fora da tela** (gaveta off-canvas, FAB, banner). Escapa do
   `overflow-x:hidden` do `body` porque é posicionado pela viewport, não pelo body.
   → Corrija com `overflow-x: clip` na **raiz (`html`)**, não só no body.
   *(Este projeto: `.cart-drawer` usa `transform:translateX(101%)` fechado.)*
2. **`100vw`** em página com scrollbar vertical → `100vw` inclui a largura da
   barra. Prefira `100%` ou `calc(100vw - <scrollbar>)`; melhor ainda, evite.
3. **Palavra longa sem quebra** (e-mails, "Emagrecimento", URLs) estoura o card.
   → `overflow-wrap:break-word; hyphens:auto`.
4. **Margens negativas / `width:` em px** maiores que a coluna.
5. **Imagem sem `max-width:100%`** (aqui `img{max-width:100%}` já existe — mantenha).
6. **Grid/flex sem `min-width:0`** nos filhos: o `min-content` de um filho (texto,
   botão `width:100%`, descrição) força a coluna `1fr` a crescer além da tela e tudo
   dentro (incl. botões) vaza. → `.grid > *`, `.pdp-wrap > * { min-width:0; }`.
   *(Este projeto: o rótulo longo do `.pdp-buy` estava forçando a coluna do PDP.)*
7. **`gap` + padding** somando mais que a largura em 2 colunas estreitas.
8. **Rótulo de CTA longo numa linha** dentro de `.btn{overflow:hidden}`: não quebra e
   é clipado em telas estreitas (≤375px). → encurte no mobile via `<span class="btn-sub">`
   escondido por media query (ex.: "Comprar agora · pagamento seguro" → "Comprar agora").

> ⚠️ **`overflow-x:clip` esconde a barra MAS corta conteúdo que realmente transborda.**
> Ele é a rede de segurança para elementos `fixed` fora da tela — **não** substitui
> consertar o overflow real. Se algo ficou *cortado* depois do clip, há um elemento
> largo demais: ache-o (passo 1) e faça-o caber. Meta: nada transborda → nada é cortado.

### 3. Toque, legibilidade e segurança (checklist de qualidade)

- **Alvos de toque ≥ 44×44 px** (Apple HIG) / 48 px (Material). Botões, ícones do
  header, setas de carrossel, links de rodapé. Aumente a área clicável, não só o ícone.
- **Inputs com `font-size ≥ 16px`** — abaixo disso o iOS dá *zoom automático* ao
  focar, deslocando o layout. Regra crítica para formulários (newsletter).
- **Safe-area (notch / barra inferior do iPhone):** elementos `fixed` colados nas
  bordas devem respeitar `env(safe-area-inset-*)`. Aqui: `.wa`, `.frete`.
- **Sem hover como única via:** estados que dependem de `:hover` (ex.: botão
  "Adicionar à sacola" que aparece no hover do card) precisam de alternativa
  tocável no mobile, ou devem ficar sempre visíveis.
- **Contraste** texto/fundo ≥ 4.5:1; dourado claro sobre claro é risco.
- **Carrosséis** devem ter swipe nativo (já há `scroll-snap`) e as setas não
  podem vazar a viewport.

### 4. Verificar antes de fechar
- Re-rode o snippet do passo 1: a tabela tem de ficar **vazia**.
- Confira em 320 / 360 / 390 px que nada corta e nada exige zoom.
- Toque (não clique) nos principais CTAs no DevTools mobile.
- Garanta que `position:sticky` do header e o smooth-scroll de âncoras continuam
  funcionando — `overflow:hidden` na raiz quebra ambos; por isso preferimos
  `overflow-x: clip`, que clipa **sem** criar contêiner de rolagem.
- Copie para `site-para-cliente/assets/` e confirme com `diff`.

#### Verificação headless (sem celular à mão)
Edge/Chrome headless renderiza o site servido (localhost:8080) numa largura de
celular e tira screenshot — depois é só abrir a imagem:
```powershell
$edge="C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
& $edge --headless --disable-gpu --no-sandbox --force-device-scale-factor=2 `
  --window-size=360,1280 --virtual-time-budget=11000 --run-all-compositor-stages-before-draw `
  --user-data-dir=_work\edge-prof --screenshot=_work\check.png `
  "http://localhost:8080/produto.html?produto=depur"
```
- O **carrossel do hero some (preto)** em headless por causa do fade de 1.1s sob
  *virtual-time* — **não é bug**; confirme congelando o slide (1ª foto opaca, sem
  transição) ou medindo `img.naturalWidth>0 && img.complete`.
- Para métricas exatas (overflow real), carregue a página num `<iframe>` de 360px
  dentro de uma página servida na MESMA origem e leia
  `documentElement.scrollWidth` vs `clientWidth` e `el.scrollWidth` vs `el.clientWidth`
  do elemento suspeito (`scrollWidth>clientWidth` ⇒ está sendo cortado). Apague a
  página-sonda do `site-para-cliente/` quando terminar.

## Princípios (o "porquê")

- **Mobile-first, não mobile-também.** A maioria das clientes chega pelo Instagram
  no celular. O desktop é o caso secundário.
- **`clamp()` > breakpoints isolados.** Escale fluido; use media query só para
  reordenar/recompor, não para cada tamanho de fonte.
- **Conserte a causa, não o sintoma.** `overflow:hidden` que esconde um elemento
  vazando mascara o bug — ache o elemento e contenha-o na origem.
- **Nada de regressão no desktop.** Toda mudança mobile tem de ser inerte acima
  do breakpoint correspondente.

## Anti-padrões a recusar

- `overflow-x:hidden` no `html` (vira contêiner de rolagem → quebra sticky/anchor).
  Use `overflow-x: clip`.
- Desativar zoom com `user-scalable=no` / `maximum-scale=1` — fere acessibilidade.
- Esconder conteúdo só para "caber" sem repensar a hierarquia.
- Fontes < 16px em inputs.
