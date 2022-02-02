# Getting Started

The Moxi Design System leverages the cross-framework capabilities of [Stencil](https://stenciljs.com/) and the convenience and composability of [Tailwind CSS](https://tailwindcss.com/)
to produce scalable, easy-to-use components and design tokens for our organization.

<section class="mds">
  <div class="flex h-128 overflow-hidden mb-40">
    <a class="flex items-center w-1/2 bg-white" href="https://stenciljs.com/" target="_blank"><img src="./assets/stencil.png" class="object-contain" alt="Stencil"></a>
    <div class="w-20"></div>
    <a class="flex items-center w-1/2 bg-white" href="https://tailwindcss.com/" target="_blank"><img src="./assets/tailwind.png" class="object-contain" alt="Tailwind CSS"></a>
  </div>
</section>

## Adding The Mx Design System via Yarn or NPM

From your project run `yarn add @moxiworks/mds` or `npm install @moxiworks/mds` depending on your package manager. Once added to your project, you can start using the system by looking at the example below.

StencilJS gives us a basic `loader` which does all of the heavy lifting/tree shaking for us. There's no need to `import` a specific component. Components only get added to your projects bundle if the tag is used in your project. In the example below, the only component added would be the `mx-button` component.

For more information around including StencilJS components into specific frame works visit [https://stenciljs.com/docs/overview](https://stenciljs.com/docs/overview)

```js
import '@moxiworks/mds/dist/styles/mds-core.css';
import { applyPolyfills, defineCustomElements } from '@moxiworks/mds/loader';

applyPolyfills().then(() => {
  defineCustomElements();
});

document.getElementById('app').innerHTML = `
<div class="mds">
  <div class="container mt-24 p-40">
    <h1 class="mb-24">Hello Moxi!</h1>
    <div>
      This is an example of how to include the system in your Javascript project.
    </div>
    <div class="mt-24">
      <mx-button href="https://moxiworks.com" target="_blank">
        Go to Moxiworks
      </mx-button>
    </div>
  </div>
</div>
`;
```

[![Edit moxi-design-system-import-example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/moxi-design-system-import-example-1ppbe?autoresize=1&fontsize=12&hidenavigation=1&theme=dark)

## Adding the Mx Design System via Unpkg

If you prefer to use the system as a modern ESModule you can do so via UNPKG or JSDelivr. This example uses UNPKG.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Moxi Design System as ESModule</title>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="https://unpkg.com/@moxiworks/mds/dist/styles/mds-core.css" />
    <script type="module">
      import { defineCustomElements } from 'https://unpkg.com/@moxiworks/mds/loader/index.es2017.js';
      defineCustomElements();
    </script>
  </head>

  <body class="mds">
    <div class="container mt-24 p-40">
      <h1 class="mb-24">Hello Moxi!</h1>
      <div>
        This is an example of how to include the system in your Javascript project.
      </div>
      <div class="mt-24">
        <mx-button href="https://moxiworks.com" target="_blank">
          Go to Moxiworks
        </mx-button>
      </div>
    </div>
  </body>
</html>
```

[![Edit moxi-design-system-esmodule-example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/agitated-cannon-tw60n?fontsize=14&hidenavigation=1&theme=dark)

## Phosphor Icons

Any icon system will work but the design team at Moxi has put an emphasis on Phosphor Icons. If you plan to use icons in your collaberation with this framework, please visit [https://phosphoricons.com/](https://phosphoricons.com/) for more information.

To add Phosphor Icons to your project, simply add the following script tag:

```html
<script src="https://unpkg.com/phosphor-icons"></script>
```

We purposly do not internally add this icon system as it's prefered to keep the icon libraries flexible. This way if you prefer Font Awesome feel free to use it.
