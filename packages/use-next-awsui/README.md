# `useAwsuiRouter`

[![version](https://img.shields.io/npm/v/use-awsui-router.svg)](https://www.npmjs.com/package/use-awsui-router)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/use-awsui-router.svg)](https://www.npmjs.com/package/use-awsui-router)
[![downloads](https://img.shields.io/npm/dt/use-awsui-router.svg)](https://www.npmjs.com/package/use-awsui-router)

`use-awsui-router` is a collection of React hooks for the AWS UI component
library. In addition to managing the AWS UI component local state, they also
bind to React Router.

**For React Router v6**, use `use-awsui-router@^2.0.0`.
**For React Router v5**, use `use-awsui-router@^1.0.0`.

It is recommended that you use this library in tandem with
[`use-awsui`](https://www.npmjs.com/package/use-awsui).

- [Install](#install)
- [Supported components](#supported-components)
- [Contributing](#contributing)

## Install

- `npm install use-awsui-router` or
- `yarn add use-awsui-router`

## Supported components

The `use-awsui-router` library offers React hooks for the following AWS UI
components. These hooks return several of the components' value props and event
handlers in order to both instantiate and manage the components' local,
controlled state, including integration with React Router.

- [BreadcrumbGroup](https://github.com/CharlesStover/use-awsui-router/blob/master/docs/use-breadcrumb-group.md)
- [Link](https://github.com/CharlesStover/use-awsui-router/blob/master/docs/use-link.md)
- [PropertyFilter](https://github.com/CharlesStover/use-awsui-router/blob/master/docs/use-property-filter.md)
- [SideNavigation](https://github.com/CharlesStover/use-awsui-router/blob/master/docs/use-side-navigation.md)
- [Tabs](https://github.com/CharlesStover/use-awsui-router/blob/master/docs/use-tabs.md)

## Contributing

To install this repository to begin local development, use the following
commands in order:

- `yarn set version latest` to keep Yarn up-to-date.
- `yarn` to install the existing dependencies.
- `yarn up * && yarn up @*/*` to upgrade to the latest dependencies.
- `yarn dlx @yarnpkg/pnpify --sdk vscode` to integrate with VS Code.
