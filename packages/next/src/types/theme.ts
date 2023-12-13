/* eslint-disable @typescript-eslint/no-magic-numbers */

export default interface Theme {
  readonly backgroundColor: string;
  readonly displayFontFamily: string;
  readonly displayFontWeight: 400 | 700;
  readonly foregroundColor: string;
  readonly primary: readonly [number, number, number];
  readonly primaryDark: string;
  readonly primaryFontWeight: 400 | 700;
}
