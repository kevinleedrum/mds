#!/bin/sh

echo ""
echo "==========================="
echo "Building react"
echo "==========================="
echo ""

yarn stencil:react
yarn tailwind:react
