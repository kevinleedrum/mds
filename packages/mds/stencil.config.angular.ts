import { Config } from '@stencil/core';
import { config as baseConfig, dist, angular } from './stencil.config'

// Only builds the outputs required for angular
// Angular needs the dist for the loader export
export const config: Config = {
    ...baseConfig,
  outputTargets: [
    dist,
    angular,
  ],
};
