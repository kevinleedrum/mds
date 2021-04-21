#!/bin/sh

mv vuepress/.vuepress/public/components vuepress/.vuepress/public/components.BAK 
mkdir vuepress/.vuepress/public/components
copyfiles -u 2 www/build/*.js vuepress/.vuepress/public/components
rm -rf vuepress/.vuepress/public/components.BAK