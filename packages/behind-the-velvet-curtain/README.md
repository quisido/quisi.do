# Behind the Velvet Curtain

A Monogatari-powered visual novel boilerplate for `quisi.do`.

## Commands

- `npm run start --workspace=packages/behind-the-velvet-curtain`
- `npm run build --workspace=packages/behind-the-velvet-curtain`
- `npm test --workspace=packages/behind-the-velvet-curtain`

## Browser Smoke Tests

The browser smoke suite uses Playwright through Vitest browser mode. If the
browser binaries are missing in your environment, run:

```sh
npx playwright install chromium firefox webkit
```
