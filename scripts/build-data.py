# -*- coding: utf-8 -*-
# Regenera assets/data.js a partir de scripts/real-products.json
# (snapshot do catálogo real: store.izabeldepaula.com/products.json).
# Uso:  python scripts/build-data.py
import json, io, re, os, glob
from html.parser import HTMLParser

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
data = json.load(open(os.path.join(HERE, 'real-products.json'), encoding='utf-8'))
BY = {p['handle']: p for p in data['products']}

# ---------- description cleaner ----------
ALLOW = {'p','h2','h3','h4','ul','ol','li','strong','em','br'}
MAP = {'h1':'h3','h5':'h4','h6':'h4','b':'strong','i':'em'}
DROP = {'script','style','img','iframe','noscript','table','thead','tbody','tr','td','th','figure','svg','video','source','picture'}

class Clean(HTMLParser):
    def __init__(s):
        super().__init__(convert_charrefs=True); s.out=[]; s.skip=0
    def handle_starttag(s,t,a):
        t=MAP.get(t,t)
        if t in DROP: s.skip+=1; return
        if s.skip: return
        if t in ALLOW: s.out.append('\n<'+t+'>')
    def handle_startendtag(s,t,a):
        if MAP.get(t,t)=='br' and not s.skip: s.out.append('<br>')
    def handle_endtag(s,t):
        t=MAP.get(t,t)
        if t in DROP:
            if s.skip: s.skip-=1
            return
        if s.skip: return
        if t in ALLOW and t!='br': s.out.append('</'+t+'>\n')
    def handle_data(s,d):
        if s.skip: return
        s.out.append(d)

HEAD_WORDS = ('benefício','benefícios','modo de uso','ingredientes','composição','resultados',
              'perguntas','dicas','como usar','para quem','garantia','o que é','porquê',
              'transformação','depoimentos','fórmula')

def is_heading(line):
    l = line.strip()
    if not l or l.startswith('<') or l.startswith('€'): return False
    if len(l) > 66: return False
    if l[-1] in '.!?:;,•': return False
    if '€' in l or '•' in l: return False
    low = l.lower()
    if any(w in low for w in HEAD_WORDS): return True
    # Title-ish short standalone line
    words = l.split()
    if 1 <= len(words) <= 7 and l[0].isupper(): return True
    return False

def clean(h):
    p=Clean(); p.feed(h or '')
    s=''.join(p.out)
    s=re.sub(r'&nbsp;| ',' ',s)
    lines=[]
    for raw in s.split('\n'):
        line=re.sub(r'[ \t]{2,}',' ',raw).strip()
        if not line:
            continue
        up=line.upper()
        # drop offer/price artifacts
        if 'OFERTA ESPECIAL' in up: continue
        if re.search(r'€\s*[\d.,]+.*€\s*[\d.,]+', line): continue
        if re.fullmatch(r'-?\s*\d+\s*%', line): continue
        if line.startswith('<'):
            lines.append(line)
        elif is_heading(line):
            lines.append('<h3 class="ds-h">'+line+'</h3>')
        else:
            lines.append('<p>'+line+'</p>')
    out='\n'.join(lines)
    out=re.sub(r'<p>\s*</p>','',out)
    out=re.sub(r'(<br>\s*)+</','</',out)
    # strip leading list/check markers so our CSS bullets are the only marker
    out=re.sub(r'(<li>)\s*(?:[✅✓✔☑•·–▪▶➤→➔-]\s*)+', r'\1', out)
    out=re.sub(r'(<(?:p|h3|h4)[^>]*>)\s*(?:[✅✓✔☑]\s*)+', r'\1', out)
    out=re.sub(r'\n{2,}','\n',out)
    return out.strip()

def short_desc(handle, fallback):
    txt = re.sub(r'<[^>]+>',' ', clean(BY[handle].get('body_html')))
    txt = re.sub(r'\s+',' ', txt).strip()
    # first informative sentence
    for seg in re.split(r'(?<=[.!?])\s', txt):
        seg=seg.strip()
        if len(seg) > 30 and '€' not in seg and 'OFERTA' not in seg.upper():
            return seg[:160]
    return fallback

# ---------- curated display metadata (handle -> card attrs) ----------
META = [
 # singles
 dict(handle='creme-barriga-fit-redutor', slug='creme-barriga-fit', name='Creme Barriga Fit®',
      cat='creme', catLabel='Creme redutor', vol='250 ml', img='barriga-fit-creme.jpeg',
      rating='4.7', badges=[], bestseller=False, exp=False),
 dict(handle='body-cream-sublime-lush-com-oleo-de-sacha-inchi', slug='sublime-lush', name='Sublime Lush',
      cat='creme', catLabel='Body cream · Sacha Inchi', vol='250 ml', img='sublime-lush.jpg',
      rating='5.0', badges=[('Premium','')], bestseller=False, exp=False),
 dict(handle='gel-leg-fit-express-250-ml', slug='leg-fit-express', name='Gel Leg Fit Express®',
      cat='creme', catLabel='Gel · efeito frio', vol='250 ml', img='leg-fit-express-gel.jpeg',
      rating='4.8', badges=[('sale','sale')], bestseller=False, exp=False),
 dict(handle='gel-levanta-bumbum-250-ml', slug='levanta-bumbum', name='Gel Levanta Bumbum®',
      cat='creme', catLabel='Gel · firmeza', vol='250 ml', img='levanta-bumbum.jpeg',
      rating='4.8', badges=[], bestseller=False, exp=False),
 dict(handle='barriga-fit-stop-gordura', slug='stop-gordura', name='Barriga Fit® Stop Gordura',
      cat='capsula', catLabel='Cápsulas', vol='50 cápsulas', img='barriga-fit-stop-gordura.jpeg',
      rating='4.7', badges=[('Mais vendido','best'),('sale','sale')], bestseller=True, bsRank=3, exp=False),
 dict(handle='barriga-fit-detox-500ml', slug='detox-liquido', name='Barriga Fit® Detox',
      cat='capsula', catLabel='Detox líquido', vol='500 ml', img='barriga-fit-detox.jpeg',
      rating='4.9', badges=[('Mais vendido','best'),('sale','sale')], bestseller=True, bsRank=4, exp=False),
 dict(handle='leg-fit-pernas-leves', slug='pernas-leves', name='Leg Fit® Pernas Leves',
      cat='capsula', catLabel='Cápsulas · pernas', vol='60 cápsulas', img='leg-fit-pernas-leves.jpeg',
      rating='4.8', badges=[('sale','sale')], bestseller=False, exp=False),
 dict(handle='barriga-fit-depur', slug='depur', name='Barriga Fit Depur',
      cat='capsula', catLabel='Detox fígado · ampolas', vol='15 ampolas', img='barriga-fit-depur.jpeg',
      rating='4.8', badges=[('Mais vendido','best'),('sale','sale')], bestseller=True, bsRank=5, exp=False),
 # kits
 dict(handle='kit-seca-barriga', slug='kit-seca-barriga', name='Kit Seca Barriga®',
      cat='kit', catLabel='Stop Gordura · Depur', vol='2 produtos', img='kit-seca-barriga.jpg',
      rating='4.9', badges=[('Mais vendido','best')], bestseller=True, bsRank=2, exp=False),
 dict(handle='kit-stop-gordura', slug='kit-stop-gordura', name='Kit Stop Gordura®',
      cat='kit', catLabel='Creme · Detox · Cápsulas', vol='3 produtos', img='kit-barriga-fit.jpeg',
      rating='4.9', badges=[('Top kit','best'),('sale','sale')], bestseller=False, exp=True),
 dict(handle='kit-detox-stop-desintoxica-queima-gordura-e-acelera-o-metabolismo-pack-stop-gordura-detox-liquido',
      slug='kit-detox-stop', name='Kit Detox + Stop Gordura',
      cat='kit', catLabel='Detox · Cápsulas', vol='2 produtos', img='kit-detox-stop-gordura.jpg',
      rating='4.8', badges=[('Mais vendido','best')], bestseller=True, bsRank=1, exp=True),
 dict(handle='kit-fire', slug='kit-fire', name='Kit Fire Emagrecimento®',
      cat='kit', catLabel='Depur · Stop Gordura · Drenagem', vol='3 produtos', img='kit-fire.jpeg',
      rating='4.9', badges=[('Intensivo','best'),('sale','sale')], bestseller=False, exp=True),
 dict(handle='kit-stop-celulite-10-off', slug='kit-celulite-lipedema', name='Kit Stop Lipedema & Celulite',
      cat='kit', catLabel='Gel · Detox · Pernas Leves', vol='3 produtos', img='kit-celulite-lipedema.jpeg',
      rating='4.7', badges=[('sale','sale')], bestseller=False, exp=True),
 dict(handle='kit-verao®️-transformacao-completa-detox-queima-gordura-pernas-leves-e-firmeza-pack-4-produtos',
      slug='kit-verao', name='Kit Verão®',
      cat='kit', catLabel='Detox · Gordura · Pernas · Firmeza', vol='Pack 4 produtos', img='kit-emagrecimento.jpeg',
      rating='4.9', badges=[('Pack 4','best'),('sale','sale')], bestseller=False, exp=True),
 dict(handle='kit-renovacao-total', slug='kit-renovacao-total', name='Kit Renovação Total',
      cat='kit', catLabel='Detox · Suplementos · Cosméticos', vol='Pack completo', img='kit-emagrecimento-depur.jpeg',
      rating='4.8', badges=[('Avançado','best'),('sale','sale')], bestseller=False, exp=True),
 # ---- tratamento premium + acessórios (catálogo completo da loja) ----
 dict(handle='kit-de-tratamento-intensivo', slug='kit-tratamento-intensivo', name='Kit de Tratamento Intensivo',
      cat='kit', catLabel='Tratamento intensivo · profissional', vol='Protocolo completo', img='kit-tratamento-intensivo.jpg',
      rating='4.9', badges=[('Intensivo','best')], bestseller=False, exp=False),
 dict(handle='tonico-profissional-celulite-30ml-reduza-celulite-de-forma-eficaz-valor-normal-70', slug='tonico-celulite',
      name='Tónico Profissional Celulite 30 ml', cat='creme', catLabel='Tónico profissional', vol='30 ml', img='tonico-celulite.jpg',
      rating='4.8', badges=[('Esgotado','soldout')], bestseller=False, exp=False),
 dict(handle='bag-de-pano-izabel-de-paula', slug='bag-pano', name='Bag de Pano Izabel de Paula',
      cat='acessorio', catLabel='Acessório · 100% pano', vol='Tote bag', img='bag-pano.jpg',
      rating='4.9', badges=[], bestseller=False, exp=False),
 dict(handle='caderno-izb-a5', slug='caderno-izb', name='Caderno IZB A5',
      cat='acessorio', catLabel='Acessório · caderno A5', vol='Pautado', img='caderno-izb.jpg',
      rating='4.8', badges=[('sale','sale')], bestseller=False, exp=False),
 dict(handle='e-book-barriga-fit', slug='ebook-barriga-fit', name='E-book Barriga Fit',
      cat='acessorio', catLabel='E-book · digital (PDF)', vol='Download', img='ebook-barriga-fit.jpg',
      rating='5.0', badges=[('sale','sale')], bestseller=False, exp=False),
 dict(handle='garrafa-termica-izb-250-ml', slug='garrafa-termica-izb', name='Garrafa Térmica IZB® 250 ml',
      cat='acessorio', catLabel='Acessório · inox 250 ml', vol='250 ml', img='garrafa-termica.jpg',
      rating='4.8', badges=[], bestseller=False, exp=False),
 dict(handle='caneta-personalizada-izabel-de-paula', slug='caneta-izb', name='Caneta Personalizada IZB',
      cat='acessorio', catLabel='Acessório · edição IZB', vol='Caneta', img='logo-izb.png',
      rating='5.0', badges=[('Esgotado','soldout')], bestseller=False, exp=False),
]

# Links de checkout Shopify (enviados pelo cliente): slug -> (variant_id, cupão 2un -5%, cupão 3un -10%)
SHOPIFY = {
 'stop-gordura':     ('45697364033803', 'STOPGORDURA5', 'STOPGORDURA10'),
 'detox-liquido':    ('45697334116619', 'DETOX5',       'DETOX10'),
 'leg-fit-express':  ('45697335296267', 'LEGFIT5',      'LEGFIT10'),
 'levanta-bumbum':   ('45697334968587', 'BUMBUM5',      'BUMBUM10'),
 'creme-barriga-fit':('45697367015691', 'BARRIGAFIT5',  'BARRIGAFIT10'),
 'sublime-lush':     ('45697366655243', 'SUBLIME5',     'SUBLIME10'),
 'depur':            ('45697366065419', 'DEPUR5',       'DEPUR10'),
 'pernas-leves':     ('45697333199115', 'LEGFITCAPS5',  'LEGFITCAPS10'),
 # kits
 # Kit Seca Barriga: card de unidades com -5%/-10% como os demais.
 # FUNCIONAL só quando estes 2 cupões existirem no Shopify (5% e 10%, aplicáveis ao produto).
 'kit-seca-barriga':     ('53166813806859', 'SECABARRIGA5',  'SECABARRIGA10'),
 'kit-stop-gordura':     ('45697366294795', 'KITSTOP5',      'KITSTOP10'),
 'kit-detox-stop':       ('52909670596875', 'DETOXSTOP5',    'DETOXSTOP10'),
 'kit-fire':             ('51884698206475', 'KITFIRE5',      'KITFIRE10'),
 'kit-celulite-lipedema':('45800051605771', 'KITLIPEDEMA5',  'KITLIPEDEMA10'),
 'kit-verao':            ('52958214390027', 'KITVERAO5',     'KITVERAO10'),
 'kit-renovacao-total':  ('46020681105675', 'KITRENOVACAO5', 'KITRENOVACAO10'),
 # tratamento premium + acessórios (sem cupões de quantidade)
 'kit-tratamento-intensivo': ('46094872117515', None, None),
 'tonico-celulite':          ('52724146274571', None, None),
 'bag-pano':                 ('53092257071371', None, None),
 'caderno-izb':              ('49543130808587', None, None),
 'ebook-barriga-fit':        ('46462955553035', None, None),
 'garrafa-termica-izb':      ('45697334411531', None, None),
 'caneta-izb':               ('53113548767499', None, None),
}

# Frase curta e chamativa para o card da vitrine (1 linha, "o que é + o que faz").
# Tom alinhado ao site (aspecto/sensação/rotina) — sem promessas médicas.
BLURB = {
 'creme-barriga-fit': 'Creme corporal para a barriga: textura sequinha e aspecto mais firme e liso.',
 'sublime-lush':      'Hidratação intensa com óleo de Sacha Inchi — pele macia, nutrida e aveludada.',
 'leg-fit-express':   'Gel de efeito frio: leveza imediata e alívio para pernas cansadas.',
 'levanta-bumbum':    'Gel reafirmante para os glúteos — mais firmeza e pele uniforme.',
 'stop-gordura':      'Cápsulas para apoiar a sua rotina de controlo e bem-estar do dia a dia.',
 'detox-liquido':     'Detox líquido saboroso para uma rotina de leveza e menos sensação de inchaço.',
 'pernas-leves':      'Cápsulas para quem passa o dia em pé — apoio à sensação de pernas leves.',
 'depur':             'Ampolas depurativas: um cuidado de dentro para fora na sua rotina detox.',
 'kit-seca-barriga':  'O duo da barriga: cápsulas Stop Gordura + ampolas Depur para mais leveza.',
 'kit-stop-gordura':  'Trio Barriga Fit completo: creme, detox e cápsulas para uma rotina constante.',
 'kit-detox-stop':    'A dupla mais vendida: detox líquido + cápsulas para começar com leveza.',
 'kit-fire':          'Kit intensivo: depur, cápsulas e drenagem para uma rotina mais completa.',
 'kit-celulite-lipedema': 'Foco em pernas e celulite: gel, detox e cápsulas para firmeza e leveza.',
 'kit-verao':         'Pack de verão 4 em 1: detox, gordura, pernas leves e firmeza num só kit.',
 'kit-renovacao-total': 'Rotina completa de renovação: detox, suplementos e cosméticos num só pack.',
 'kit-tratamento-intensivo': 'O protocolo mais completo da casa — tratamento intensivo para uma rotina de cuidado avançada.',
 'tonico-celulite':   'Tónico profissional concentrado para um cuidado direcionado às zonas com celulite.',
 'bag-pano':          'Tote bag de pano Izabel de Paula — leve, resistente e reutilizável.',
 'caderno-izb':       'Caderno A5 Izabel de Paula para organizar a sua rotina e as suas metas.',
 'ebook-barriga-fit': 'Guia digital Barriga Fit — comece a sua rotina com método, em PDF.',
 'garrafa-termica-izb':'Garrafa térmica em inox (250 ml) — hidratação com estilo o dia todo.',
 'caneta-izb':        'A caneta oficial Izabel de Paula — o detalhe de marca no seu dia a dia.',
}

# Sub-título da página de produto (sob o título, acima do preço). 1-2 frases curadas,
# ~100-160 caracteres (encaixa no max-width:46ch do .pdp-short). Mesmo tom do BLURB
# (aspecto/sensação/rotina) — SEM promessas médicas / de cura. Sobrepõe-se ao texto
# raspado por short_desc(): este é a fonte de verdade, não o body_html da loja.
SHORT = {
 'creme-barriga-fit': 'A barriga é a zona que mais a incomoda? Creme de toque seco para massajar todos os dias, por uma pele com aspecto mais firme, liso e cuidado.',
 'sublime-lush':      'Creme corporal premium com óleo amazónico de Sacha Inchi, rico em ómega — hidratação profunda e um toque sedoso e aveludado na pele.',
 'leg-fit-express':   'Pernas pesadas ao fim do dia? Gel de efeito frio com alívio imediato e sensação de leveza. Absorve depressa e não deixa a pele pegajosa.',
 'levanta-bumbum':    'O cuidado que os seus glúteos merecem: gel reafirmante para massajar diariamente, por uma pele com aspecto mais firme, tonificado e uniforme.',
 'stop-gordura':      'As cápsulas mais vendidas da linha Barriga Fit — um apoio diário à sua rotina de bem-estar, para se sentir mais leve no dia a dia.',
 'detox-liquido':     'Detox líquido saboroso para tomar todos os dias — a sua rotina de leveza, com menos sensação de inchaço e mais bem-estar.',
 'pernas-leves':      'Cápsulas pensadas para quem passa o dia em pé — um apoio diário à sensação de pernas leves e descansadas, sem aquele peso ao fim do dia.',
 'depur':             'Ampolas bebíveis para uma rotina detox de 15 dias — um cuidado depurativo de dentro para fora, a complementar a sua linha Barriga Fit.',
 'kit-seca-barriga':  'O duo que cuida da barriga de dentro para fora: cápsulas Stop Gordura + detox hepático Depur — para a sensação de leveza e menos inchaço no dia a dia.',
 'kit-stop-gordura':  'O trio completo Barriga Fit num só kit: creme redutor, detox líquido e cápsulas — a rotina inteira reunida, com mais vantagem no preço.',
 'kit-detox-stop':    'A nossa dupla mais vendida: detox líquido + cápsulas Stop Gordura — a combinação perfeita para começar a rotina com leveza e bem-estar.',
 'kit-fire':          'O kit mais intensivo da linha: depur, cápsulas Stop Gordura e drenagem — três passos que se completam numa rotina de bem-estar mais focada.',
 'kit-celulite-lipedema': 'Rotina de cuidado para as pernas: gel reafirmante, detox e cápsulas Pernas Leves — por uma pele com aspecto mais liso e firme e mais leveza.',
 'kit-verao':         'O pack 4 em 1 para chegar ao verão a sentir-se bem consigo: detox, controlo de gordura, pernas leves e firmeza, na rotina completa.',
 'kit-renovacao-total': 'O nosso pack mais completo: detox, suplementos e cosméticos que trabalham juntos para cuidar de si por dentro e por fora, em cada fase.',
 'kit-tratamento-intensivo': 'O nosso programa mais completo: um protocolo de tratamento intensivo que reúne os cuidados-chave da linha Izabel de Paula numa rotina pensada para quem quer ir mais longe.',
 'tonico-celulite':   'Tónico profissional concentrado (30 ml) para um cuidado direcionado às zonas com tendência a celulite, a integrar na sua rotina de pele.',
 'bag-pano':          'A tote bag de pano Izabel de Paula: leve, resistente e reutilizável, para levar consigo todos os dias.',
 'caderno-izb':       'Caderno A5 Izabel de Paula para registar a sua rotina, hábitos e metas de bem-estar, com o cuidado de marca em cada detalhe.',
 'ebook-barriga-fit': 'E-book Barriga Fit (PDF digital): um guia prático para organizar a sua rotina de autocuidado com método, constância e naturalidade.',
 'garrafa-termica-izb':'Garrafa térmica Izabel de Paula em inox (250 ml) — mantém a temperatura e acompanha a sua rotina de hidratação ao longo do dia.',
 'caneta-izb':        'A caneta oficial Izabel de Paula — um pequeno detalhe de marca para o seu dia a dia.',
}

def eur(v):
    if v is None: return None
    return round(float(v), 2)

products=[]
for m in META:
    p = BY[m['handle']]
    v = p['variants'][0]
    sh = SHOPIFY.get(m['slug'])
    price = eur(v['price'])
    comp = eur(v.get('compare_at_price'))
    if comp is not None and comp <= price:  # ignore broken/невalid compare-at
        comp = None
    products.append(dict(
        slug=m['slug'], name=m['name'], cat=m['cat'], catLabel=m['catLabel'],
        vol=m['vol'], img='images/'+m['img'], rating=m['rating'],
        badges=[{'t':t,'cls':c} for (t,c) in m['badges'] if c!='sale'],
        price=price, compareAt=comp,
        bestseller=m['bestseller'], bsRank=m.get('bsRank', 99), exp=m['exp'],
        available=v.get('available', True),
        variant=(sh[0] if sh else None),
        d2=(sh[1] if sh else None),
        d3=(sh[2] if sh else None),
        short=SHORT.get(m['slug']) or m.get('short') or short_desc(m['handle'], m['name']),
        blurb=BLURB.get(m['slug'], ''),
        # descHtml (body_html da loja) removido do output: não é renderizado em
        # lado nenhum (a PDP usa content.js) e continha claims não-conformes
        # (emagrecimento / perda de peso / queima de gordura). Fonte preservada
        # em real-products.json; a descrição curada vive em assets/content.js.
    ))

# galeria de cada produto: foto limpa (p.img) + slides do carrossel em images/gallery/<slug>/
# cada item: {full (imagem grande), thumb (miniatura leve 160px)}.
# a miniatura 0 reutiliza a foto limpa (ja carregada como imagem principal -> custo zero).
for p in products:
    g = sorted(glob.glob(os.path.join(ROOT, 'images', 'gallery', p['slug'], '*.jpg')))
    gallery = [{'full': p['img'], 'thumb': p['img']}]
    for f in g:
        n = os.path.basename(f)
        gallery.append({
            'full': 'images/gallery/%s/%s' % (p['slug'], n),
            'thumb': 'images/gallery/%s/thumbs/%s' % (p['slug'], n),
        })
    p['gallery'] = gallery

SHOP=dict(whatsapp='351912976633', phoneDisplay='+351 912 976 633',
          email='izabeldepaula.geral@gmail.com', freeShip=100, freeShipNote='Portugal Continental', currency='€',
          storeUrl='https://store.izabeldepaula.com')

js = ('/* AUTO-GENERATED from the live store (store.izabeldepaula.com). Real prices & descriptions. */\n'
      'window.SHOP=' + json.dumps(SHOP, ensure_ascii=False) + ';\n'
      'window.PRODUCTS=' + json.dumps(products, ensure_ascii=False, indent=1) + ';\n')
io.open(os.path.join(ROOT, 'assets', 'data.js'), 'w', encoding='utf-8').write(js)
print('products:', len(products))
print('singles:', sum(1 for p in products if p['cat']!='kit'), '| kits:', sum(1 for p in products if p['cat']=='kit'))
print('data.js bytes:', len(js))
for p in products:
    print(' -', p['slug'], '| €%.2f'%p['price'], ('(was €%.2f)'%p['compareAt']) if p['compareAt'] else '')
