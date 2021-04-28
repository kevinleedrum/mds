# Getting Started

## Adding Core CSS To Your Project

### CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@moxiworks/mds@latest/dist/styles/mds-core.css" />
```

## Using Stencil Javascript Components

From your project run `yarn add @moxiworks/mds` or `npm install @moxiworks/mds` depending on your package manager.

At your entry point add the following code:

```js
import { applyPolyfills, defineCustomElements } from '@moxiworks/mds/loader';

// Bind the custom elements to the window object
applyPolyfills().then(() => {
  defineCustomElements();
});
```

That's it. Once you've executed the loader, Stencil will intelligently "tree shake" the neccessary components by only adding tags you use.

For more information around including StencilJS components into specific frame works visit [https://stenciljs.com/docs/overview](https://stenciljs.com/docs/overview)
