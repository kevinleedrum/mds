# Mercury Design System

The Mercury Design System is a Monorepo containing two packages: mds and mds-react. It is the design system for Moxiworks.

## Packages 

### mds

The mds package is a Stencil.js library that outputs a range of styled web components. It utilizes Tailwind CSS for styling and VuePress for documentation.

You can view the documentation for the mds package [here](./packages/mds/README.md)

### mds-react

The mds-react package contains the React output from the mds repository. It is hosted separately to be imported directly by React applications.

You can view the documentation for the mds package [here](./packages/mds-react/README.md)

## Installation
The repo is setup as a yarn monorepo, allowing you to link the packages locally with ease via `yarn install`. Each repo has it's own package.json which can be used for individual installs and script runs.