import { type FontWeight } from '../constants/font-weight.js';

export default interface Theme {
  readonly background: readonly [number, number, number];
  readonly displayFontFamily: string;
  readonly displayFontWeight: FontWeight.Bold | FontWeight.Normal;
  readonly foreground: readonly [number, number, number];
  readonly lines: boolean;
  readonly primary: readonly [number, number, number];
  readonly primaryFontWeight: FontWeight.Bold | FontWeight.Normal;
  readonly secondary: readonly [number, number, number];
}
