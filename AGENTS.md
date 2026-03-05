# Instructions for agents

## Overview

`quisi.do` is a monorepo using NPM workspaces that contain web-oriented packages
that can be grouped into 3 categories: front end applications (e.g. HTML, SPAs),
back end services (Cloudflare workers), and libraries (Node modules).

`packages/quisido` contains a custom build and test tool used by all other
packages in this repository. It ensures a consistent standard across every
package in the monorepo, including ESLint, publint, and Vitest.

## Development

* `npm install` installs the monorepo's dependencies.
* `npm run build` builds all packages for deployment.
* `npm start` runs the packages locally in watch mode.
* `npm test` tests all packages.

## Conventions

All code should be written in TypeScript. Changes should be accompanied by
tests. Follow the existing code instructions located in `.github/instructions/`.
