const THEME_COLOR_DESCRIPTORS = [
  {
    color: '#13171a',
    media: '(prefers-color-scheme: dark)',
  },
  {
    color: '#f8f4f0',
    media: '(prefers-color-scheme: light)',
  },
];

/**
 * TODO: Validate these against the standard documented on MDN:
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
 */
export default {
  colorScheme: 'dark light',
  initialScale: 1,
  themeColor: [...THEME_COLOR_DESCRIPTORS],
  width: 'device-width',
};
