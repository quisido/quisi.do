/* eslint-disable @typescript-eslint/no-magic-numbers */

export default interface Theme {
  readonly background: readonly [number, number, number];
  readonly displayFontFamily: string;
  readonly displayFontWeight: 400 | 700;
  readonly foreground: readonly [number, number, number];
  readonly primary: readonly [number, number, number];
  readonly primaryFontWeight: 400 | 700;
  readonly secondary: readonly [number, number, number];
}
