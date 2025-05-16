# [quisi.do](https://quisi.do/)

This repository serves as a monorepo with each package living in the `packages/`
directory. The fully integrated application lives in the `packages/vite`
directory.

## Visual Studio Code

This repository intends to support Visual Studio Code as its primary development
environment. Its configurations in the
[`.vscode` directory](https://github.com/quisido/quisi.do/tree/main/.vscode)
are committed, and an official Code Workspace for the repository can be found in
[`quisido.code-workspace`](https://github.com/quisido/quisi.do/blob/main/quisido.code-workspace).

## Contributing

To install this repository and begin local development, use the following
commands in order:

- `npm install npm@latest --global` to keep NPM up-to-date.
- `npm install --legacy-peer-deps` to install dependencies.
- `npm run up` to upgrade dependencies.

## Commands

- `npm start` to run the application and its dependencies.
