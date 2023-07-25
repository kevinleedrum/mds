# @moxiworks/mds-angular

This package in the monorepo serves as the Angular integration for the Stencil-generated components. The `lib` directory within this package contains the Stencil-generated components, which are built to be consumed by Angular applications.

# MdsAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.5, following the [stencil-js integration docs](https://stenciljs.com/docs/angular).

The docs suggested a complex structure deeply nested, seemingly a monorepo within a monorepo. Instead, we've chosen to keep things simple and structure it as a single application. Additionally, the `ng` tooling used to build Angular applications would normally build the `package.json` in with the dist. We've chosen to ignore this for simplicity, and to seemlessly work with lerna.

## Generating the `lib` Directory

The `lib` directory holds the Stencil-generated components, which serve as the foundation for the Angular library. These components are defined using web standards and can be used seamlessly within Angular applications. To generate the `lib` directory, run the build script in the `mds` package. In the `packages/mds/stencil.config.ts`, you can see the config for outputting this.

## Building the `lib` Directory

The `yarn build` script handles the tsc build. The output is stored in the `dist` directory. Only run this command after successfully completing the previous step.
