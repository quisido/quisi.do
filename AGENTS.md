# Instructions for agents

`quisi.do` is a front end engineering playground for technologically-complex,
boundary-pushing, browser-oriented applications and the open-source libraries
that power them.

As a monorepo, it hosts a few applications (e.g. a not-for-profit
software-as-a-service and a browser-based game engine), the Cloudflare Worker
services that power those applications, and the NPM package libraries that power
both.

By keeping these technologies on the bleeding edge, it serves as an educational
and reusable tool both during development and as an open source publication.

## Architecture

`quisi.do` is a monorepo using NPM workspaces. It is composed of three types of
packages:

- **Applications** are bundled into static assets (HTML, JS, etc.) and deployed
  with aggressive caching. These serve as the primary entry point for users to
  interface with the final product.
- **Services** are the serverless functions that handle the applications'
  authentication, monitoring, persistent state, and other features that cannot
  securely be ran on the client's device.
- **Libraries** are reusable code shared by the applications and services. They
  offer value outside of the `quisi.do` ecosystem and are published publicly for
  any developer to use.

### Technologies

- **ESNext** is the target output language. Backwards compatibility is not a
  concern.
- **GitHub Actions/Workflows** define the continuously integration and
  deployment pipelines.
- **quisido** is a custom build and test tool that consolidates the
  configuration and tooling used by all packages in this repository, such as:
  - **ESLint** lints the code.
  - **Vitest** runs the test suites.
- **React** renders the majority of UIs.
- **TypeScript** is the primary language used for all packages.
- **Vite** powers the build and development servers.
- **Wrangler** powers the services on Cloudflare Workers.

## Packages

All packages are located in the `packages/` directory.

### Applications

- `game/` contains an untitled game engine.
- `vite/` contains a not-for-profit software-as-a-service that vends the very
  services that power it. By way of a Patreon subscription, all profits are
  donated charitably.

### Services

- `authn/` handles the "login with Patreon" workflow, registering users to the
  database and managing their sessions.
- `csp/` contains the Content Security Policy reporting endpoint. It logs CSP
  violations so that they may be monitored and queried.
- `dashboard/` consolidates all monitoring for the SaaS application that is safe
  to share publicly. It includes error logs, performance metrics, security
  policy violations, etc. in a single API request.

### Libraries

- `cloudflare-test-utils/` contains a collection of test utilities to simplify
  the development of serverless functions on Cloudflare Workers. It mocks
  bindings and vends an assertion API for those bindings.
- `cloudflare-utils/` contains a collection of Cloudflare types, type-guards,
  and standard path files for Cloudflare Workers. It enables type-safe code
  execution.
- `fmrs/` contains a collection of utility functions that filter/find, map,
  reduce, and sort JavaScript primitives and built-ins between each other.
- `number-format-react/` contains a React component implementation of the
  `Intl.NumberFormat` API.
- `quisido/` houses the **quisido** CLI tool.
- `use-force-update/` contains a React hook that forces a component to rerender.
- `worker/` contains utility classes for creating Cloudflare Workers. It
  preconfigures emitting errors, logs, and metrics; and it allows type-safe
  access to your bindings through a simplified API.
- `worker-test/` contains utilities for testing the aforementioned workers.

`fullstory-react/`, `react-datadog/`, and `sentry-react/` integrate React
applications with Fullstory, Datadog, and Sentry respectively.

## Workflows

- `npm install` installs all dependencies. Run this first.
- `npm run build` builds all packages in topological order.
  - `npm run build --workspace=packages/<WORKSPACE>` builds a specific package.
- `npm test` runs all test suites for all packages.
  - `npm test --workspace=packages/<WORKSPACE>` tests a specific package.
