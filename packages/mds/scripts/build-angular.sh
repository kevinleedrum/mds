#!/bin/sh

set -eu

echo ""
echo "==========================="
echo "Building angular"
echo "==========================="
echo ""

yarn stencil:angular
yarn tailwind:angular
