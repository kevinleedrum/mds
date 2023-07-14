#!/bin/sh

set -eu

echo ""
echo "==========================="
echo "Building tailwind"
echo "==========================="
echo ""

export NODE_ENV=production

npx postcss src/tailwind/styles.css -o "$1/mds-core.css"
npx minify "$1/mds-core.css" > "$1/mds-core.min.css"
