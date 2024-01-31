/* eslint-disable @typescript-eslint/no-magic-numbers */
import type Theme from '../types/theme.js';

export default {
  backgroundColor: '#fffcf0',
  displayFontWeight: 700,
  foreground: [0x00, 0x00, 0x00],
  primary: [0xf0, 0xa0, 0xc8],
  primaryDark: '#604050',
  primaryFontWeight: 700,
  secondary: [0xb0, 0xc0, 0x90], // [0xc0, 0xe0, 0xa0],
  // secondaryDark: '#0a3442',
  displayFontFamily: '"Noto Sans Display", "Noto Sans", Helvetica, sans-serif',
} satisfies Theme;
