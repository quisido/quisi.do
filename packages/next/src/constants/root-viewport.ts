import { type Viewport } from 'next';
import { THEME_COLOR_DESCRIPTORS } from './theme-color-descriptors.js';

/**
 * TODO: Validate these against the standard documented on MDN:
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
 */
export default {
  colorScheme: 'dark light',
  initialScale: 1,
  themeColor: [...THEME_COLOR_DESCRIPTORS],
  width: 'device-width',
} satisfies Viewport;
