import { Config } from '@stencil/core';
import { dist, distCustomElements, hydrate } from './config/outputTargets';
import { config as baseConfig } from './stencil.config'

// Only builds the outputs required for the mds package export
export const config: Config = {
    ...baseConfig,
  outputTargets: [
    dist,
    distCustomElements,
    hydrate,
  ],
};
