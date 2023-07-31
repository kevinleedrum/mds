# @moxiworks/mds-angular
![npm](https://img.shields.io/npm/v/%40moxiworks%2Fmds-angular)

This package in the monorepo serves as the Angular integration for the Stencil-generated components. The `lib` directory within this package contains the Stencil-generated components, which are built to be consumed by Angular applications.

# MdsAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.5, following the [stencil-js integration docs](https://stenciljs.com/docs/angular).

The docs suggested a complex structure deeply nested, seemingly a monorepo within a monorepo. Instead, we've chosen to keep things simple and structure it as a single application. Additionally, the `ng` tooling used to build Angular applications would normally build the `package.json` in with the dist. We've chosen to ignore this for simplicity, and to seemlessly work with lerna.

## Generating the `lib` Directory

The `lib` directory holds the Stencil-generated components, which serve as the foundation for the Angular library. These components are defined using web standards and can be used seamlessly within Angular applications. To generate the `lib` directory, run the build script in the `mds` package. In the `packages/mds/stencil.config.ts`, you can see the config for outputting this.

## Building the `lib` Directory

The `yarn build` script handles the tsc build. The output is stored in the `dist` directory. Only run this command after successfully completing the previous step.

## Usage
1. In your angular application, add the `@moxiworks/mds-angular` package to your dependancies.

    Make sure you replace the `x.x.x` with the latest version, we can be found in the badge at the top of this doc. Avoid using `^` or `~`, as we want to be using the exact value.

```json
"dependencies": {
  "@moxiworks/mds-angular": "x.x.x"
}
```

2. Install the package

```
yarn install
// or
npm install
```

3. Setup the custom components
```jsx
// app.module.ts

import { ComponentLibraryModule } from '@moxiworks/mds-angular';

@NgModule({
  imports: [ComponentLibraryModule],
})
export class AppModule {}
```

4. Use the components in the app
```tsx
<!-- app.component.html -->

<mx-button type="button" href="https://google.com"></mx-button>
```