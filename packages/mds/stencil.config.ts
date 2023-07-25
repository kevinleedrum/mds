import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { inlineSvg } from 'stencil-inline-svg';
import { OutputTargetDist, OutputTargetDistCustomElements, OutputTargetHydrate, OutputTargetWww } from "@stencil/core/internal"
import { reactOutputTarget } from "@stencil/react-output-target"
import { angularOutputTarget } from '@stencil/angular-output-target';

// Outputs  loader
//          dist/cjs (common js)
//          dist/collection (allow lazy loading in other Stencil applications.)
//          dist/esm (es module)
//          dist/mds-component (unpkg)
//          dist/types (component types)

export const dist: OutputTargetDist = {
  type: 'dist',
  esmLoaderPath: '../loader'
}

// Outputs ../mds-react/lib/components
export const react = reactOutputTarget({
  componentCorePackage: '@moxiworks/mds',
  proxiesFile: '../mds-react/lib/components/stencil-generated/index.ts',
  includeDefineCustomElements: true,
  loaderDir: 'loader'
})

export const angular = angularOutputTarget({
  componentCorePackage: '@moxiworks/mds',
  directivesProxyFile: '../mds-angular/component-library/lib/stencil-generated/components.ts',
  directivesArrayFile: '../mds-angular/component-library/lib/stencil-generated/index.ts',
})

// Outputs dist/components
export const distCustomElements: OutputTargetDistCustomElements = {
  type: 'dist-custom-elements',
}

// Identical to the `dist/mds-component` output, just with a module input
// Outputs to the docs
export const docsWww: OutputTargetWww = {
  type: 'www',
  serviceWorker: null, // disable service workers
  dir: 'vuepress/.vuepress/public/components',
  // We don't want it in a build directory
  buildDir: '',
  // We don't need an index file generated
  indexHtml: '',
}

// Outputs hydrate
export const hydrate: OutputTargetHydrate = {
  type: 'dist-hydrate-script',
}

// This is the baseConfig that builds everything required
export const config: Config = {
  namespace: 'mds-components', 
  outputTargets: [
    dist,
    react,
    angular,
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
