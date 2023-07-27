import { Config } from '@stencil/core';
import { config as baseConfig, dist, hydrate, react } from './stencil.config'

export const config: Config = {
    ...baseConfig,
  outputTargets: [
    // This is a temporary solution to resolve a validation issue on the package.json.
    // As the `hydrate` dir is exposed, it needs to exist at build time.
    hydrate,
    // dist contains the `loader` that is used by the react package
    dist,
    react,
  ],
};
