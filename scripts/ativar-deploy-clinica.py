#!/usr/bin/env python
"""Liga a clinica.html ao pipeline de deploy (.github/workflows/deploy.yml).

Porque existe: o workflow so publica ficheiros que estao na sua allowlist.
A clinica.html nao esta la, por isso um push nao publica nada. (E tambem por
isso que termos-uso.html e entregas-portes.html dao 404 ao vivo.)

Porque nao foi o agente a faze-lo: .github/workflows/ e zona de alto risco
(detem os segredos de FTP) e o Squad Guard bloqueia o agente. Este script
existe para a alteracao ser um ato deliberado e visivel de um humano.

Faz 3 coisas, todas idempotentes:
  1. adiciona 'clinica.html' ao gatilho paths:
  2. adiciona clinica.html ao loop que copia para dist/
  3. copia clinica.html tambem para dist/clinica/index.html  -> URL /clinica/

Correr:  python scripts/ativar-deploy-clinica.py
"""
import sys, pathlib, difflib

P = pathlib.Path('.github/workflows/deploy.yml')

if not P.exists():
    sys.exit('ERRO: nao encontrei %s (correr a partir da raiz do repo)' % P)

orig = P.read_text(encoding='utf-8')
s = orig

if 'clinica.html' in s:
    print('Ja estava aplicado. Nada a fazer.')
    sys.exit(0)

# 1) gatilho
old_trigger = "      - 'produto.html'\n"
if old_trigger not in s:
    sys.exit("ERRO: nao encontrei o gatilho 'produto.html'. O workflow mudou — aplicar a mao (ver CLINICA-go-live.md #2).")
s = s.replace(old_trigger, old_trigger + "      - 'clinica.html'\n", 1)

# 2) loop de copia
old_loop = 'for f in index.html produto.html politica-privacidade.html'
if old_loop not in s:
    sys.exit('ERRO: nao encontrei o loop de copia. O workflow mudou — aplicar a mao (ver CLINICA-go-live.md #2).')
s = s.replace(old_loop, 'for f in index.html produto.html clinica.html politica-privacidade.html', 1)

# 3) pasta /clinica/ (URL definitivo; /clinica.html fica com canonical para ca)
old_cp = '          cp -r assets dist/'
if old_cp not in s:
    sys.exit('ERRO: nao encontrei "cp -r assets dist/". Aplicar a mao (ver CLINICA-go-live.md #2).')
s = s.replace(old_cp,
    '          # a landing tambem em /clinica/ (URL definitivo)\n'
    '          if [ -f clinica.html ]; then\n'
    '            mkdir -p dist/clinica\n'
    '            cp clinica.html dist/clinica/index.html\n'
    '          fi\n'
    + old_cp, 1)

print('--- alteracoes a aplicar em %s ---' % P)
for line in difflib.unified_diff(orig.splitlines(), s.splitlines(),
                                 fromfile='antes', tofile='depois', lineterm='', n=2):
    print(line)
print('-' * 46)

P.write_text(s, encoding='utf-8')
print('APLICADO. Rever com:  git diff .github/workflows/deploy.yml')
print('Isto so muda O QUE se publica. Nao toca em segredos, servidor nem credenciais.')
