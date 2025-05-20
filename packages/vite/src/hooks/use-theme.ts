import { useCustomTheme } from '../contexts/custom-theme.js';
import type CustomTheme from '../types/custom-theme.js';
import type ThemeType from '../types/theme.js';
import mapRgbToHex from '../utils/map-rgb-to-hex.js';
import useThemeAlpha from './use-theme-alpha.js';

interface State extends ThemeType {
  readonly backgroundHex: string;
  readonly foregroundAlpha: (opacity: number) => string;
  readonly foregroundHex: string;
  readonly primaryAlpha: (opacity: number) => string;
  readonly primaryHex: string;
  readonly secondaryAlpha: (opacity: number) => string;
  readonly secondaryHex: string;
}

export default function useTheme(): State {
  const theme: CustomTheme = useCustomTheme();

  const { foreground, primary, secondary } = theme;
  return {
    ...theme,
    backgroundHex: mapRgbToHex(theme.background),
    foregroundAlpha: useThemeAlpha(...foreground),
    foregroundHex: mapRgbToHex(foreground),
    primaryAlpha: useThemeAlpha(...primary),
    primaryHex: mapRgbToHex(primary),
    secondaryAlpha: useThemeAlpha(...secondary),
    secondaryHex: mapRgbToHex(secondary),
  };
}
