#!/bin/sh

set -eu

echo ""
echo "==========================="
echo "Building vue"
echo "==========================="
echo ""

yarn stencil:vue
yarn tailwind:vue
