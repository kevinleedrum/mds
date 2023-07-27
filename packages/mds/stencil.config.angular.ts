import { Config } from '@stencil/core';
import { config as baseConfig, dist, angular, hydrate } from './stencil.config'

// Only builds the outputs required for angular
// Angular needs the dist for the loader export
export const config: Config = {
    ...baseConfig,
  outputTargets: [
    // This is a temporary solution to resolve a validation issue on the package.json.
    // As the `hydrate` dir is exposed, it needs to exist at build time.
    hydrate,
    // dist contains the `loader` that is used by the angular package
    dist,
    angular,
  ],
};
