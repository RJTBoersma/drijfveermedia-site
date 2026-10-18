#!/bin/sh
# Zet nieuwe pagina's en scènes uit een werkplek terug in het hoofdproject. Overschrijft geen gedeelde bestanden.
# Gebruik: sh scripts/terugzetten.sh <naam> <pagina-map> [<pagina-map> ...]   (pagina-map relatief aan src/pages, bv. kennisbank/gidsen/backlinks)
set -e
HOOFD=/home/claude/drijfveermedia
W=/tmp/werk/$1; shift
for p in "$@"; do
  mkdir -p "$HOOFD/src/pages/$p"
  cp -r "$W/src/pages/$p/." "$HOOFD/src/pages/$p/"
  s=$(echo "$p" | sed 's#/#--#g')
  [ -f "$W/src/components/scenes/$s.astro" ] && cp "$W/src/components/scenes/$s.astro" "$HOOFD/src/components/scenes/"
  echo "teruggezet: $p"
done
