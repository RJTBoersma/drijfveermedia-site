#!/bin/sh
# Maakt een eigen werkkopie voor één schrijver, zodat builds elkaar niet in de weg zitten.
# Gebruik: sh scripts/werkplek.sh <naam>   ->  /tmp/werk/<naam>
set -e
HOOFD=/home/claude/drijfveermedia
W=/tmp/werk/$1
rm -rf "$W"; mkdir -p "$W"
cp -r $HOOFD/src $HOOFD/public $HOOFD/scripts $HOOFD/astro.config.mjs $HOOFD/package.json "$W"/
ln -s $HOOFD/node_modules "$W"/node_modules
echo "Werkplek klaar: $W"
