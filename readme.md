![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# Moxi Design System

The Moxi Design System is a framework utilizing TailwindCSS and StencilJS to provide a CSS foundational framework combined with a library of universal Javascript components to use in any project with any framework you desire.

The goal is to create this framework to the spec of our design team and committing to the continued growth of this system moving forward.

## Development

The project uses Vuepress as a means to write documentation as you develop. When the system is built, Vuepress is compiled to the `docs` directory to be accessed via Github pages. This project also uses `yarn` over `npm`.

### Installing Yarn

`npm install yarn -g`

### Cloning For Local Development

1. Fork and then clone the project locally.
2. Inside the cloned direcrory run `yarn install`.
3. After the dependencies are installed run `yarn dev` to start the development Vuepress server.

You can now access the site at [http://localhost:8080](http://localhost:8080).

### Formatting and linting

The project uses [prettier](https://github.com/prettier/prettier) to standardize code style. If you have
a prettier plugin installed in your editor, then files may be formatted automatically on save. Otherwise,
staged files will be formatted during a pre-commit hook (via [husky](https://github.com/typicode/husky)
and [lint-staged](https://github.com/okonet/lint-staged)). See the `.prettierrc` file for rules.

JavaScript and TypeScript files will also be linted prior to being committed. The commit will fail if
there are any warnings or errors per our `.eslintrc.js` ruleset, which is based on [`eslint:recommended`](https://eslint.org/docs/rules/)
and [@typescript-eslint/recommended](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/README.md).

## Vuepress Documentation Only Creation and Editing

This has been updated to where you can simply run `yarn:dev` to update documentation without the worry of unintended dynamic file changes being added to your commits.

### Where Things Live

#### Vuepress

The development site is located under the `vuepress` directory. To learn more about Vuepress and it's paradigms, please read the [documentation here](http://vuepress.vuejs.org/).

The basics are very straight forward. The site is powered by Markdown files. Add and edit folders and `.md` files as needed for documentation and development.

You can develop the component in Vuepress then write the documentation around it when ready.

#### StencilJS Components

All of the StencilJS components are located in the `src` directory. There is a generator to stub a new component: `yarn generate mx-{name of component}`. All of the components are prefixed with `mx-`. For example, the input component is called `mx-input` which is essentially the tag name `<mx-input />`.

You can read more about Stencil, it's lifecycle methods, property handling, etc at [https://stenciljs.com/docs/introduction](https://stenciljs.com/docs/introduction).

#### TailwindCSS

The TailwindCSS code is located under `src/tailwind`. The configuration file is located in the root of the directory as `tailwind.config.js`.

You can read more about [TailwindCSS here](http://tailwindcss.com/).

#### IMPORTANT :rotating_light: :rotating_light: :rotating_light:

We are not using the Shadow DOM for the Stencil components and are not using the CSS paradigm they provide. The reason is that the CSS for this project needs to also support Ruby based `view components`. You can read more about them here: [https://viewcomponent.org/](https://viewcomponent.org/).

There's no reason to write and maintain this CSS in two places so the TailwindCSS implementation will be the source of truth for our component styling.

Under `src/tailwind` you'll see directories like `mx-input` and `mx-button`. Those `SASS` directories and files are included in the `styles.css` file. SCSS is transpiled to CSS immediately thanks to PostCSS.

## Using In A Project

From your project run `yarn add @moxiworks/mds` or `npm install @moxiworks/mds` depending on your package manager.

At your entry point add the following code:

```js
import { applyPolyfills, defineCustomElements } from '@moxiworks/mds/loader';

// Bind the custom elements to the window object
applyPolyfills().then(() => {
  defineCustomElements();
});
```

StencilJS provides a loader which dynamically "tree-shakes" the code as needed. So, for example, the bundle for the mx-input won't be included in your bundle until you've written code in one of your views like:

```html
<mx-input label="Placeholder & Left Icon" left-icon="ph-apple-logo" />
```

### Framework Integrations

StencilJS has a bunch of documentation around integrating these types of components into most popular frameworks - including vanilla Javascript. You can read more about that here: [https://stenciljs.com/docs/overview](https://stenciljs.com/docs/overview)
