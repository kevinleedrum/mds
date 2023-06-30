#!/bin/sh

set -eu

echo ""
echo "==========================="
echo "Building all"
echo "==========================="
echo ""

yarn stencil:build
yarn tailwind:build
yarn docs:build
