import { Config } from '@stencil/core';
import { config as baseConfig, dist, hydrate, react } from './stencil.config'

// Only builds the outputs requireed for react
// React needs the dist for the loader export, and hydrate for the build
export const config: Config = {
    ...baseConfig,
  outputTargets: [
    hydrate,
    dist,
    react,
  ],
};
