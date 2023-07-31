#!/bin/sh

set -eu

# ng-packagr outputs a custom package.json and README.md.
# Since we are using lerna workspaces, I want to use my own customised package.json.
# I can't stop ng from creating one, so I just delete the file
rm -f dist/package.json
rm -f dist/README.md