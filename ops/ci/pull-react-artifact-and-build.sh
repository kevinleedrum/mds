#!/bin/bash

set -eu

buildkite-agent artifact download "packages/mds-react/lib/components/**/*" packages/mds-react/lib/components --step mds-build-react
buildkite-agent artifact download "packages/mds-react/dist/styles/**/*" packages/mds-react/dist/styles --step mds-build-react

yarn mds-react:build

