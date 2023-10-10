# [quisi.do](https://quisi.do/)

The `quisi.do` repository contains the professional portfolio of
[Charles Quisido](https://quisi.do/) and all the distributable packages used to
build it.

This repository serves as a monorepo with each package living in the `packages`
directory. The fully integrated application lives in the `packages/next`
directory.

## Visual Studio Code

This repository intends to support Visual Studio Code as its primary development
environment. Its configurations in the
[`.vscode` directory](https://github.com/CharlesStover/quisi.do/tree/main/.vscode)
are committed, and an official Code Workspace for the repository can be found in
[`quisi.do.code-workspace`](https://github.com/CharlesStover/quisi.do/blob/main/quisi.do.code-workspace).

## Contributing

To install this repository to begin local development, use the following
commands in order:

- `yarn set version latest` to keep Yarn up-to-date.
- `yarn install` to synchronize Yarn's version with its dependencies.
- `yarn run up` to upgrade dependencies.
