import { Config } from '@stencil/core';
import { dist, react } from './config/outputTargets';
import { config as baseConfig } from './stencil.config'

// Only builds the outputs requireed for react
// React needs the dist for the loader export
export const config: Config = {
    ...baseConfig,
  outputTargets: [
    dist,
    react,
  ],
};
