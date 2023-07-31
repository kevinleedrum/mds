#!/bin/sh

set -eu

echo ""
echo "==========================="
echo "Building all tailwind"
echo "==========================="
echo ""

# mds
yarn build:mds
# docs (only needs a development build)
yarn build:docs
# (Re-use exsting mds build)
# react
mkdir -p ../mds-react/dist/styles
cp dist/styles/* ../mds-react/dist/styles
# angular
mkdir -p ../mds-angular/dist/styles
cp dist/styles/* ../mds-angular/dist/styles
# vue
mkdir -p ../mds-vue/dist/styles
cp dist/styles/* ../mds-vue/dist/styles
