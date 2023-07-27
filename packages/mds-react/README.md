# @moxiworks/mds-react
![npm](https://img.shields.io/npm/v/%40moxiworks%2Fmds-react)

This package in the monorepo serves as the React integration for the Stencil-generated components. The `lib` directory within this package contains the Stencil-generated components, which are built to be consumed by React applications.

## Generating the `lib` Directory

The `lib` directory holds the Stencil-generated components, which serve as the foundation for the React library. These components are defined using web standards and can be used seamlessly within React applications. To generate the `lib` directory, run the build script in the `stencil-library` package. In the `packages/stencil-library/stencil.config.ts`, you can see the config for outputting this.

## Building the `lib` Directory

The `yarn build` script handles the tsc build. The output is stored in the `dist` directory. Only run this command after successfully completing the previous step.

## Usage
1. In your react application, add the `@moxiworks/mds-react` package to your dependancies.

    Make sure you replace the `x.x.x` with the latest version, we can be found in the badge at the top of this doc. Avoid using `^` or `~`, as we want to be using the exact value.

```json
"dependencies": {
  "@moxiworks/mds-react": "x.x.x"
}
```

2. Install the package

```
yarn install
// or
npm install
```

3. Setup the custom components and utilise in the app.
```jsx
// App.tsx
import './App.css';
import { MxButton, defineCustomElements } from '@moxiworks/mds-react';

defineCustomElements();

function App() {
  return (
    <div className="App">
      <MxButton first="Your" last="Name" />
    </div>
  );
}

export default App;
```