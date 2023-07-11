# Mercury Design System

This project is a Monorepo containing the multiple packages that make up the Mercury Design System.
## Packages 

### mds

The mds package is a Stencil.js library that outputs a range of styled web components. It utilizes Tailwind CSS for styling and VuePress for documentation.

You can view the documentation for the mds package [here](./packages/mds/README.md)

### mds-react

The mds-react package contains the React output from the mds repository. It is hosted separately to be imported directly by React applications.

You can view the documentation for the mds package [here](./packages/mds-react/README.md)

## Contributing

### Prerequisites

Before proceeding with the setup, please ensure that you have followed the below prerequisites:

1. Node Version Manager (nvm): nvm allows you to manage multiple versions of Node.js on your machine. If you don't have nvm installed, follow the [installation instructions](https://github.com/nvm-sh/nvm) at nvm's GitHub repository for your operating system.

2. Yarn: yarn is a replacement package manager for npm. It has a powerful workspaces feature that is ideal for a monorepo project such as this. 

We are using the `berry` version of yarn which is `Yarn 3`. Follow the [installation instructions](https://yarnpkg.com/getting-started/install) on yarn's official website. Since our nvm version is above 16.10, we recommend the `corepack` approach for installation. Ensure you've run `yarn set version berry` to be on the same version as other developers.

We have chosen to disable the "Zero-Installs" feature of yarn for now until we have done more research into the benefits.

#### Setup Instructions:
1. Clone the repository to your local machine using the following command. Ensure you have ssh access to the repo:
```shell
git clone git@github.com:moxiworks/mds.git
```
2. Navigate to the root level of the cloned repository:
```shell
cd <repository-directory>
```
3. Ensure that nvm is being used by running the following command:
```shell
nvm install
```
This will install the Node.js version specified in the .nvmrc file located in the root directory of the repository.

4. Set the installed Node.js version as the active version by running:
```shell
nvm use
```
This will ensure that the correct Node.js version is used for the project.

5. Install the project dependencies using Yarn:
```shell
yarn install
```
This command will install all the required packages and their dependencies for the monorepo.

### Development
The root package.json can mostly stay untouched. The scripts inside are used by the CI environment to test and build the project.

It is best practise to run commands from the package you are developing. 
```shell
cd packages/{package}
```

But you can run commands from the root. Just preface them with the workspace name like below:
```shell
yarn workspace @moxiworks/mds {command}
```
Notice that it's not the package directory name used, but instead the package.json name.

### Troubleshooting

- If you encounter any issues during the setup process, please refer to the documentation or support channels for the specific packages or libraries within the monorepo.

- If you encounter the `Unsupported engine` error, it most likely means you are either trying to use `npm`, or you're version of `yarn` is below `3.0.0`

- Ensure that you have a stable internet connection during the setup process to download the required packages and dependencies.

- If you need to switch to a different Node.js version in the future, you can use the nvm use <node-version> command, replacing <node-version> with the desired version number.

- For further assistance or troubleshooting, please reach out to the project maintainers or the community support channels.

Happy coding!