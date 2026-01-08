# Project: quisi.do

## Overview

This is a monorepo containing various packages for a web application, including
authentication services, UI components, and Cloudflare workers.

## Tech Stack

* **Languages:** TypeScript
* **Libraries:** React
* **Formatting and linting:** ESLint
* **Package manager:** npm (with workspaces)
* **Testing:** Vitest

## Architecture

The project is a monorepo managed by `npm` workspaces, located in the `packages`
directory. The primary applications are (1) a still-being-developed,
browser-based video game and engine located in `packages/game` and (2) a
front-end oriented software-as-a-service provider located in `packages/vite`.
The next most important services are those that power the front end
infrastructure: `packages/authn`, `packages/csp`, and `packages/dashboard`.

## Development

* **Building:** `npm run build`
* **Installation:** `npm install`
* **Linting:** `npm run eslint`
* **Running locally:** `npm start`
* **Testing:** `npm test`

## Conventions

All code should be written in TypeScript. Changes should be accompanied by
tests. Follow the existing code instructions located in `.github/instructions/`.
