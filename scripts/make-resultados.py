# Otimiza as imagens de antes/depois para a web -> images/resultados/ba-N.jpg
# Origem: pasta de imagens do cliente (ajuste SRC se necessário). Uso: python scripts/make-resultados.py
import os
from PIL import Image

SRC = r'C:\Users\LIVESTREAM\Pictures\IzabelDePaula'
FILES = ['ANTESXDEPOIS01.jpeg', 'ANTEXDEPOIS02.jpeg', 'ANTESXDEPOIS03.jpeg',
         'ANTESXDEPOIS04.jpeg', 'ANTESXDEPOIS05.jpeg', 'ANTESXDEPOIS06.PNG']
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(os.path.dirname(HERE), 'images', 'resultados')
os.makedirs(OUT, exist_ok=True)
MAX = 1100

for i, f in enumerate(FILES, 1):
    im = Image.open(os.path.join(SRC, f)).convert('RGB')
    w, h = im.size
    s = min(1.0, MAX / max(w, h))
    if s < 1.0:
        im = im.resize((round(w * s), round(h * s)), Image.LANCZOS)
    outp = os.path.join(OUT, f'ba-{i}.jpg')
    im.save(outp, 'JPEG', quality=82, optimize=True, progressive=True)
    print(f'ba-{i}.jpg  orig {w}x{h} ({w/h:.2f}:1) -> {im.size[0]}x{im.size[1]}  {os.path.getsize(outp)//1024}KB')
