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
      componentCorePackage: '@moxiworks/mds',
      proxiesFile: '../mds-react/lib/components/stencil-generated/index.ts',
      includeDefineCustomElements: true,
    }),
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      empty: true,
      serviceWorker: null, // disable service workers
      dir: 'www'
    },
    // Same as above but compiles into vuepress to be used
    {
      type: 'www',
      empty: true,
      serviceWorker: null, // disable service workers
      dir: 'vuepress/.vuepress/public/components',
      // We don't want it in a build directory
      buildDir: '',
      // We don't need an index file generated
      indexHtml: ''
    },
    {
      type: 'dist-hydrate-script',
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
