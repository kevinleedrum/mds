import { Config } from '@stencil/core';
import { config as baseConfig, dist, vue } from './stencil.config'

// Only builds the outputs required for vue
// Vue needs the dist for the loader export
export const config: Config = {
    ...baseConfig,
  outputTargets: [
    dist,
    vue,
  ],
};
