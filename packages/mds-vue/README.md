# @moxiworks/mds-vue

This package in the monorepo serves as the Vue integration for the Stencil-generated components. The `lib` directory within this package contains the Stencil-generated components, which are built to be consumed by Vue applications.

## Generating the `lib` Directory

The `lib` directory holds the Stencil-generated components, which serve as the foundation for the Vue library. These components are defined using web standards and can be used seamlessly within Vue applications. To generate the `lib` directory, run the build script in the `stencil-library` package. In the `packages/stencil-library/stencil.config.ts`, you can see the config for outputting this.

## Building the `lib` Directory

The `yarn build` script handles the tsc build. The output is stored in the `dist` directory. Only run this command after successfully completing the previous step.