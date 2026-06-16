# Gera favicon.png e apple-touch-icon.png a partir de images/logo-izb.png
# Uso: python scripts/make-favicon.py
import os
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
IMG = os.path.join(os.path.dirname(HERE), 'images')
logo = Image.open(os.path.join(IMG, 'logo-izb.png')).convert('RGBA')
W, H = logo.size
S = max(W, H)

# favicon: logo centrada num quadrado transparente (à largura máxima)
canv = Image.new('RGBA', (S, S), (0, 0, 0, 0))
canv.paste(logo, ((S - W) // 2, (S - H) // 2), logo)
canv.resize((256, 256), Image.LANCZOS).save(os.path.join(IMG, 'favicon.png'))

# apple-touch: fundo espresso da marca + logo com margem (iOS preenche transparências)
A = 180
m = int(A * 0.14)
apple = Image.new('RGBA', (A, A), (18, 13, 8, 255))
tw = A - 2 * m
th = int(tw * H / W)
apple.paste(logo.resize((tw, th), Image.LANCZOS), (m, (A - th) // 2), logo.resize((tw, th), Image.LANCZOS))
apple.convert('RGB').save(os.path.join(IMG, 'apple-touch-icon.png'))

print('OK: images/favicon.png (256) + images/apple-touch-icon.png (180)')
