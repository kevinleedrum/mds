import { Config } from '@stencil/core';
import { docsWww } from './config/outputTargets';
import { config as baseConfig } from './stencil.config'

// Only builds the docs output.
export const config: Config = {
    ...baseConfig,
  outputTargets: [
    docsWww,
  ],
};
