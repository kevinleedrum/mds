import { Config } from '@stencil/core';
import { config as baseConfig, dist, distCustomElements, hydrate } from './stencil.config'

// Only builds the outputs required for the mds package export
export const config: Config = {
    ...baseConfig,
  outputTargets: [
    dist,
    distCustomElements,
    hydrate,
  ],
};
