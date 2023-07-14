#!/bin/sh

set -eu

echo ""
echo "==========================="
echo "Building docs"
echo "==========================="
echo ""

yarn stencil:docs
yarn tailwind:docs
yarn docs:build
