#!/bin/sh

version=`jq -r '.version' package.json`

echo ""
echo "==========================="
echo "Building version ${version}"
echo "==========================="
echo ""

yarn docs:build
rm -rf ./docs
mv vuepress/.vuepress/dist ./docs