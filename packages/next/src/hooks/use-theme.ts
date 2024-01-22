'use client';

import { useContext } from 'react';
import Theme from '../contexts/theme.js';
import type ThemeType from '../types/theme.js';
import mapRgbToHex from '../utils/map-rgb-to-hex.js';

interface State extends ThemeType {
  readonly primaryHex: string;
  readonly secondaryHex: string;
}

export default function useTheme(): State {
  const theme: ThemeType | null = useContext(Theme);

  if (theme === null) {
    throw new Error('Expected a theme to be provided.');
  }

  return {
    ...theme,
    primaryHex: mapRgbToHex(theme.primary),
    secondaryHex: mapRgbToHex(theme.secondary),
  };
}
