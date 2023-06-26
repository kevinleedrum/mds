#!/bin/sh

echo ""
echo "==========================="
echo "Building mds library"
echo "==========================="
echo ""

yarn stencil:mds
yarn tailwind:mds
