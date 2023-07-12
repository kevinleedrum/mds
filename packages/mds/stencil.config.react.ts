import { Config } from '@stencil/core';
import { config as baseConfig, dist, react } from './stencil.config'

// Only builds the outputs requireed for react
// React needs the dist for the loader export
export const config: Config = {
    ...baseConfig,
  outputTargets: [
    dist,
    react,
  ],
};
