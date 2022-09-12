# [CharlesStover.com](https://charlesstover.com/)

[![GitHub Action](https://github.com/CharlesStover/charlesstover.com/actions/workflows/charlesstover-com.yml/badge.svg)](https://github.com/CharlesStover/charlesstover.com/actions/workflows/charlesstover-com.yml)
[![Cypress](https://img.shields.io/endpoint?label=Cypress&style=flat&url=https://dashboard.cypress.io/badge/simple/fahz48/main)](https://dashboard.cypress.io/projects/fahz48/runs)

the professional portfolio of Charles Stover

## Contributing

To install this repository to begin local development, use the following
commands in order:

- `yarn set version latest` to keep Yarn up-to-date.
- `yarn up "*" "@*/*" && yarn up -R caniuse-lite`
  to install and upgrade dependencies.
- `yarn sdks vscode` to integrate with Visual Studio Code.

To run the website locally, use `yarn start`.

### Commands

- `yarn build` to build the production application.
- `yarn cypress` to run end-to-end tests.
- `yarn jest` to run unit tests.
- `yarn jest-watch` to run unit tests in watch mode.
- `yarn start` to start the development application.

### Debugging

#### `Node Sass does not yet support your current environment: OS X 64-bit with Unsupported runtime (93)`

Downgrade from Node 16 to Node 15.
