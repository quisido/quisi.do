# [quisi.do](https://quisi.do/)

`quisi.do` is a playground for boundary-pushing, browser-oriented, open-source
front-end software.

As a monorepo, it composes three types of packages:
- **Applications** are bundled into static assets (HTML, JS, etc.) and deployed
  with aggressive caching. They serve as the primary entry point for users to
  interface with the final products. For example, **quisi.do**
  (`packages/saas/`) is a not-for-profit software-as-a-service,
  **Behind the Velvet Curtain** (`packages/behind-the-velvet-curtain/`) is a
  game, and there is an untitled game engine.
- **Services** are the Cloudflare Worker serverless functions handling
  application features that cannot securely run on the client's device.
  - `authn/` handles the "login with Patreon" workflow, registering users to the
    database and managing their sessions.
  - `csp/` contains the Content Security Policy reporting endpoint. It logs CSP
    violations so that they may be monitored and queried.
  - `dashboard/` consolidates all monitoring for the SaaS application that is
    safe to share publicly. It includes error logs, performance metrics,
    security policy violations, etc. in a single API request.
- **Libraries** are reusable code shared by the applications and services. They
  offer value outside the `quisi.do` ecosystem and are published publicly to NPM
  for any developer to use.
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
  - `use-force-update/` contains a React hook that forces a component to
    rerender.
  - `worker/` contains utility classes for creating Cloudflare Workers. It
    preconfigures emitting errors, logs, and metrics; and it allows type-safe
    access to your bindings through a simplified API.
  - `worker-test/` contains utilities for testing the aforementioned workers.
  - `fullstory-react/`, `react-datadog/`, and `sentry-react/` integrate React
    applications with Fullstory, Datadog, and Sentry respectively.

By keeping these technologies bleeding-edge, the monorepo serves as an
educational and reusable tool both during development and as an open-source
publication.

## Technologies

- **ESNext** is the target output language. Backwards compatibility is not a
  concern.
- **GitHub Actions/Workflows** define the continuous integration and deployment
  pipelines.
- **Hono** is the framework for the **Cloudflare Workers** services.
- **quisido** is a custom build and test tool that consolidates the
  configuration and tooling used by all packages in this repository, such as:
  - **ESLint** lints the code.
  - **Vitest** runs the test suites.
- **React** renders the majority of UIs.
- **React Router DOM** handles the browser navigation/routing.
- **TypeScript** is the primary language used for all packages.
- **Vite** powers the build and development servers.
- **Visual Studio Code** is the intended development environment. Its
  [`settings`](https://github.com/quisido/quisi.do/tree/main/.vscode) are
  committed alongside an official
  [`workspace`](https://github.com/quisido/quisi.do/blob/main/quisido.code-workspace).
- **Wrangler** powers the services on Cloudflare Workers.

## Commands

- `npm run build` builds all packages in topological order.
  - `npm run build --workspace=packages/<PATH>` builds a specific package.
- `npm run clean` removes all build and cache artifacts.
  - `npm run clean --workspace=packages/<PATH>` removes the build and cache
    artifacts from a specific package.
- `npm run update` upgrades all dependencies.
- `npm start` runs all applications, services, and dependencies locally.
- `npm test` runs all test suites for all packages.
  - `npm test --workspace=packages/<PATH>` tests a specific package.
- `npx --workspace=packages/<PATH> eslint .` lints a specific package.
- `npx --workspace=packages/<PATH> vitest run` unit tests a specific package.
