#!/bin/sh

version=`jq -r '.version' package.json`

echo ""
echo "==========================="
echo "Removing the builds"
echo "==========================="
echo ""

rm -rf dist docs hydrate loader www vuepress/.vuepress/public/*
