import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { reactOutputTarget } from '@stencil/react-output-target';
import { inlineSvg } from 'stencil-inline-svg';

export const config: Config = {
  namespace: 'mds-components',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    reactOutputTarget({
      componentCorePackage: '../..',
      proxiesFile: './react/src/components.ts',
      includeDefineCustomElements: true,
    }),
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  plugins: [sass(), inlineSvg()],
  testing: {
    transform: {
      // Stub in assets that jest does not know how to import
      '^.+\\.svg$': '<rootDir>/jestAssetTransform.js',
    },
  },
};
