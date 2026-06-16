# Otimiza imagens para a web (SEO/LCP): hero -> WebP+JPEG, PNGs pesados -> JPEG, reduz o resto.
# Uso: python scripts/optimize-images.py
import os, time
from PIL import Image
HERE = os.path.dirname(os.path.abspath(__file__))
IMG = os.path.join(os.path.dirname(HERE), 'images')

def kb(p): return os.path.getsize(p) // 1024
def load(path, mode='RGB'):
    with Image.open(path) as im: return im.convert(mode)
def rm(path):
    for _ in range(3):
        try: os.remove(path); return True
        except PermissionError: time.sleep(0.2)
    print('  aviso: nao removi %s (bloqueado) — fica orfao, nao sera usado' % os.path.basename(path))
    return False
def save_jpg(im, path, q=82): im.convert('RGB').save(path, 'JPEG', quality=q, optimize=True, progressive=True)
def save_webp(im, path, q=80): im.convert('RGB').save(path, 'WEBP', quality=q, method=6)

before = sum(os.path.getsize(os.path.join(dp, f)) for dp, _, fs in os.walk(IMG) for f in fs)

# 1) HERO: gera webp+jpg para TODOS, depois remove os png (best-effort)
hero = os.path.join(IMG, 'hero')
pngs = [f for f in sorted(os.listdir(hero)) if f.lower().endswith('.png')]
for f in pngs:
    im = load(os.path.join(hero, f)); base = f[:-4]
    save_webp(im, os.path.join(hero, base + '.webp'), 80)
    save_jpg(im, os.path.join(hero, base + '.jpg'), 82)
    print('hero %-22s -> webp %dKB + jpg %dKB' % (base, kb(os.path.join(hero, base+'.webp')), kb(os.path.join(hero, base+'.jpg'))))
for f in pngs: rm(os.path.join(hero, f))

# 2) PNGs de produto pesados -> JPEG (1000px)
for f in ['sublime-lush.png', 'kit-detox-stop-gordura.png']:
    p = os.path.join(IMG, f)
    if os.path.exists(p):
        im = load(p); im.thumbnail((1000, 1000), Image.LANCZOS)
        save_jpg(im, os.path.join(IMG, f[:-4] + '.jpg'), 82); rm(p)
        print('produto %-24s -> %s.jpg %dKB' % (f, f[:-4], kb(os.path.join(IMG, f[:-4]+'.jpg'))))

# 3) JPEGs de produto (root) -> 1000px
for f in os.listdir(IMG):
    if f.lower().endswith(('.jpeg', '.jpg')):
        p = os.path.join(IMG, f); b = kb(p)
        im = load(p); im.thumbnail((1000, 1000), Image.LANCZOS); save_jpg(im, p, 82)
        if b - kb(p) > 4: print('jpeg %-28s %dKB -> %dKB' % (f, b, kb(p)))

# 4) Antes/Depois -> 1000px
res = os.path.join(IMG, 'resultados')
for f in os.listdir(res):
    if f.lower().endswith('.jpg'):
        p = os.path.join(res, f); im = load(p); im.thumbnail((1000, 1000), Image.LANCZOS); save_jpg(im, p, 80)

# 5) logo-izb -> 360px (mantém transparência)
p = os.path.join(IMG, 'logo-izb.png')
im = load(p, 'RGBA'); w, h = im.size; nw = 360
im.resize((nw, round(h * nw / w)), Image.LANCZOS).save(p, 'PNG', optimize=True)
print('logo-izb.png -> 360px %dKB' % kb(p))

# limpeza final de png orfaos do hero
for f in os.listdir(hero):
    if f.lower().endswith('.png'): rm(os.path.join(hero, f))

after = sum(os.path.getsize(os.path.join(dp, f)) for dp, _, fs in os.walk(IMG) for f in fs)
print('=== TOTAL imagens: %.1f MB -> %.1f MB (%.0f%% menor) ===' % (before/1048576, after/1048576, (1-after/before)*100))
