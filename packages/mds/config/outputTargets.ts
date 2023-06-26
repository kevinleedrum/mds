import { OutputTargetDist, OutputTargetDistCustomElementsBundle, OutputTargetHydrate, OutputTargetWww } from "@stencil/core/internal"
import { reactOutputTarget } from "@stencil/react-output-target"

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

// Outputs dist/components
export const distCustomElements: OutputTargetDistCustomElementsBundle = {
  type: 'dist-custom-elements-bundle',
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