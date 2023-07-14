import { Config } from '@stencil/core';
import { config as baseConfig, dist, distCustomElements, hydrate, react } from './stencil.config'

// Only builds the outputs requireed for react
// React needs the dist for the loader export, and hydrate for the build
export const config: Config = {
    ...baseConfig,
  outputTargets: [
    // This will be required until we change the package.json from
    // "module": "dist/custom-elements/index.js", to "./dist/index.js"
    distCustomElements,
    hydrate,
    dist,
    react,
  ],
};
