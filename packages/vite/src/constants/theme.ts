import type Theme from '../types/theme.js';

/**
 * Cairo Play title: #e53a35
 * Cairo Play title invert(95%): #24bec3
 * Cairo Play period: #72bf80
 * Cairo Play period invert(95%): rgb(140 70 127)
 * Cloudflare infographic background color: #f6f4ef
 * Cloudflare infographic blue: #1d75bb
 * Cloudflare infographic green: #114e20
 * Cloudflare infographic red: #8c3233
 */

export const THEME: Theme = {
  background: [0xf8, 0xf4, 0xf0],
  displayFontFamily: '"Noto Sans Display", "Noto Sans", Helvetica, sans-serif',
  displayFontWeight: 700,
  foreground: [0x00, 0x00, 0x00],
  lines: false,
  primary: [0xe5, 0x3a, 0x35],
  primaryFontWeight: 700,
  secondary: [0x72, 0xbf, 0x80],
};
