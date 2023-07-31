# @moxiworks/mds-vue
![npm](https://img.shields.io/npm/v/%40moxiworks%2Fmds-vu)

This package in the monorepo serves as the Vue integration for the Stencil-generated components. The `lib` directory within this package contains the Stencil-generated components, which are built to be consumed by Vue applications.

## Generating the `lib` Directory

The `lib` directory holds the Stencil-generated components, which serve as the foundation for the Vue library. These components are defined using web standards and can be used seamlessly within Vue applications. To generate the `lib` directory, run the build script in the `stencil-library` package. In the `packages/stencil-library/stencil.config.ts`, you can see the config for outputting this.

## Building the `lib` Directory

The `yarn build` script handles the tsc build. The output is stored in the `dist` directory. Only run this command after successfully completing the previous step.

## Usage
1. In your vue application, add the `@moxiworks/mds-vue` package to your dependancies.

    Make sure you replace the `x.x.x` with the latest version, we can be found in the badge at the top of this doc. Avoid using `^` or `~`, as we want to be using the exact value.

```json
"dependencies": {
  "@moxiworks/mds-vue": "x.x.x"
}
```

2. Install the package

```
yarn install
// or
npm install
```

3. Define the custom components in the `vite.config.ts` file.
```jsx
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // treat all tags with a `mx-` as custom elements
          isCustomElement: (tag) => tag.includes('mx-'),
        },
      },
    }),
    vueJsx(),
  ],
})
```

4. Import the component library plugin in the `main.js` file.
```jsx
// src/main.js
import { ComponentLibrary } from '@moxiworks/mds-vue';

createApp(App).use(ComponentLibrary).mount('#app');
```

5. Use the components.
```jsx
<template>
  <mx-button icon="mds-check">It works!</mx-button>
</template>
```