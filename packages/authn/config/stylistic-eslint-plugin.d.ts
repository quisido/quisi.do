/**
 * `@stylistic/eslint-plugin` 6.0.0 has an incorrect `package.json`
 * `exports['.'].types` path.
 * @see https://github.com/eslint-stylistic/eslint-stylistic/issues/1331
 * @see https://github.com/eslint-stylistic/eslint-stylistic/pull/1332
 */

declare module "@stylistic/eslint-plugin" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports -- import() is required for modules aren't included in their `package.json`'s `exports`.
  const plugin: typeof import("../../../node_modules/@stylistic/eslint-plugin/dist/dts/index.d.mts")["default"];
  export default plugin;
}
