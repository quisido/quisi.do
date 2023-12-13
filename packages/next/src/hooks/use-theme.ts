'use client';

import { useContext } from 'react';
import Theme from '../contexts/theme';
import type ThemeType from '../types/theme';
import mapRgbToHex from '../utils/map-rgb-to-hex';

interface State extends ThemeType {
  readonly primaryHex: string;
}

export default function useTheme(): State {
  const theme: ThemeType | null = useContext(Theme);

  if (theme === null) {
    throw new Error('Expected a theme to be provided.');
  }

  return {
    ...theme,
    primaryHex: mapRgbToHex(theme.primary),
  };
}
