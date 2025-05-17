import type Theme from '../types/theme.js';

/**
 * Cairo Play title: #e53a35
 * Cairo Play period: #72bf80
 * Cloudflare infographic background color: #f6f4ef
 * Cloudflare infographic blue: #1d75bb
 * Cloudflare infographic green: #114e20
 * Cloudflare infographic red: #8c3233
 */

export default {
  background: [0xf8, 0xf4, 0xf0],
  displayFontFamily: '"Noto Sans Display", "Noto Sans", Helvetica, sans-serif',
  displayFontWeight: 700,
  foreground: [0x00, 0x00, 0x00],
  lines: false,
  primary: [0x1c, 0x78, 0xbc],
  primaryFontWeight: 700,
  secondary: [0xf0, 0xc8, 0xa0],
} satisfies Theme;
