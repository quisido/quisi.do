# Behind the Velvet Curtain

A Monogatari-powered visual novel boilerplate for `quisi.do`.

## Commands

- `npm --workspace=packages/behind-the-velvet-curtain run build`
- `npm --workspace=packages/behind-the-velvet-curtain start`
- `npm --workspace=packages/behind-the-velvet-curtain test`

## Browser Smoke Tests

The browser smoke suite uses Playwright through Vitest browser mode. If the
browser binaries are missing in your environment, run:

```sh
npx playwright install
```
