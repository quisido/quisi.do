import { type ThemeColorDescriptor } from 'next/dist/lib/metadata/types/metadata-types';

export const THEME_COLOR_DESCRIPTORS: readonly ThemeColorDescriptor[] = [
  {
    color: '#161616',
    media: '(prefers-color-scheme: dark)',
  },
  {
    color: '#f0f0f0',
    media: '(prefers-color-scheme: light)',
  },
];
