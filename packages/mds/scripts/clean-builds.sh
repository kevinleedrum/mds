#!/bin/sh

set -eu

echo ""
echo "==========================="
echo "Removing the builds"
echo "==========================="
echo ""

rm -rf dist \
  docs \
  hydrate \
  loader \
  www \
  vuepress/.vuepress/public/components \
  vuepress/.vuepress/public/styles \
  vuepress/.vuepress/public/host.config.json
