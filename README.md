# [CharlesStover.com](https://charlesstover.com/)

The `CharlesStover.com` repository contains the professional portfolio of
[Charles Stover](https://charlesstover.com/) and all the distributable packages
used to build it.

This repository serves as a monorepo with each package living in the `packages`
directory. The fully integrated application lives in the `packages/next` and the
`packages/react-scripts` directory.

## Visual Studio Code

This repository intends to support Visual Studio Code as its primary development
environment. Its configurations in the
[`.vscode` directory](https://github.com/CharlesStover/charlesstover.com/tree/main/.vscode)
are committed, and an official Code Workspace for the repository can be found in
[`charlesstover.com.code-workspace`](https://github.com/CharlesStover/charlesstover.com/blob/main/charlesstover.com.code-workspace).

## Contributing

To install this repository to begin local development, use the following
commands in order:

- `yarn set version latest` to keep Yarn up-to-date.
- `yarn install` to synchronize Yarn's version with its dependencies.
- `yarn run up` to upgrade dependencies.
