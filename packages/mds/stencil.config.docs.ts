import { Config } from '@stencil/core';
import { config as baseConfig, docsWww } from './stencil.config'

// Only builds the docs output.
export const config: Config = {
    ...baseConfig,
  outputTargets: [
    docsWww,
  ],
};
