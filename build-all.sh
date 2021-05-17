#!/bin/sh

version=`jq -r '.version' package.json`

echo ""
echo "==========================="
echo "Building version ${version}"
echo "==========================="
echo ""

yarn stencil:build
yarn docs:build
cp -R vuepress/.vuepress/public/styles ./dist