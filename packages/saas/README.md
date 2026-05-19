# [quisi.do](https://quisi.do/)

[![GitHub Action](https://github.com/quisido/quisi.do/actions/workflows/cd.yml/badge.svg)](https://github.com/quisido/quisi.do/actions/workflows/cd.yml)

## Commands

- Unit test a design system by setting the `VITE_TESTED_DESIGN_SYSTEM`
  environment variable to the design system's slug, then run
  `npx vitest run src/design-systems/core-test/`; e.g.
  `VITE_TESTED_DESIGN_SYSTEM=template npx vitest run src/design-systems/core-test/`
  tests the `template` design system.
- Unit test a single design system component by setting the
  `VITE_TESTED_DESIGN_SYSTEM` environment variable to the target design system's
  slug, then run
  `npx vitest run src/design-systems/core-test/${component-name}`; e.g.
  `VITE_TESTED_DESIGN_SYSTEM=template npx vitest run src/design-systems/core-test/block-quote`
  tests the `template` design system's `BlockQuote` component.
