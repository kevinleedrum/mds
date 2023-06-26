import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { inlineSvg } from 'stencil-inline-svg';
import { dist, distCustomElements, docsWww, hydrate, react } from './config/outputTargets';

// This is the baseConfig that builds everything required
export const config: Config = {
  namespace: 'mds-components', 
  outputTargets: [
    dist,
    react,
    distCustomElements,
    docsWww,
    hydrate,
  ],
  plugins: [sass(), inlineSvg()],
  testing: {
    transform: {
      // Stub in assets that jest does not know how to import
      '^.+\\.svg$': '<rootDir>/jestAssetTransform.js',
    },
  },
};
