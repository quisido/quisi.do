/* eslint-disable @typescript-eslint/no-magic-numbers */
import { blue, grey } from '@mui/material/colors';
import type { Theme } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import DEFAULT_THEME_OPTIONS from '../constants/default-mui-theme-options';
import DEFAULT_THEME from '../constants/mui-default-theme';
import SYSTEM_FONTS from '../constants/mui-system-fonts';

const BLUE_DARK_700 = '#132f4c';
const BLUE_DARK_900 = '#0a1929';

const MUI_DARK_THEME_BASE: Theme = createTheme({
  ...DEFAULT_THEME_OPTIONS,
  spacing: 10,

  palette: {
    divider: BLUE_DARK_700,
    grey,
    mode: 'dark',

    background: {
      default: BLUE_DARK_900, // BLUE_DARK_800,
      paper: BLUE_DARK_900,
    },

    common: {
      black: '#1d1d1d',
    },

    error: {
      100: '#ffdbde',
      200: '#ffbdc2',
      300: '#ff99a2',
      400: '#ff7a86',
      50: '#fff0f1',
      500: '#ff505f',
      600: '#eb0014',
      700: '#c70011',
      800: '#94000d',
      900: '#570007',
      main: '#eb0014',
    },

    primary: {
      ...blue,
      main: blue[400],
    },

    success: {
      100: '#c6f6d9',
      200: '#9aefbc',
      300: '#6ae79c',
      400: '#3ee07f',
      50: '#e9fbf0',
      500: '#21cc66',
      600: '#1db45a',
      700: '#1aa251',
      800: '#178d46',
      900: '#0f5c2e',
      main: '#1db45a',
    },

    text: {
      primary: '#fff',
      secondary: grey[400],
    },

    warning: {
      100: '#fff3c1',
      200: '#ffeca1',
      300: '#ffdc48',
      400: '#f4c000',
      50: '#fff9eb',
      500: '#dea500',
      600: '#d18e00',
      700: '#ab6800',
      800: '#8c5800',
      900: '#5a3600',
      main: '#ab6800',
    },
  },

  shape: {
    // borderRadius: 10,
  },

  typography: {
    fontFamily: ['"IBM Plex Sans"', ...SYSTEM_FONTS].join(','),

    body1: {
      fontSize: DEFAULT_THEME.typography.pxToRem(16),
      letterSpacing: 0,
      lineHeight: 24 / 16,
    },

    body2: {
      fontSize: DEFAULT_THEME.typography.pxToRem(14),
      letterSpacing: 0,
      lineHeight: 21 / 14,
    },

    button: {
      // fontWeight: 700,
      letterSpacing: 0,
      textTransform: 'initial',
    },

    caption: {
      display: 'inline-block',
      fontSize: DEFAULT_THEME.typography.pxToRem(12),
      fontWeight: 700,
      letterSpacing: 0,
      lineHeight: 18 / 12,
    },

    h1: {
      fontFamily: ['"PlusJakartaSans-ExtraBold"', ...SYSTEM_FONTS].join(','),
      fontSize: 'clamp(2.625rem, 1.2857rem + 3.5714vw, 4rem)',
      fontWeight: 800,
      lineHeight: 78 / 70,
    },

    h2: {
      color: grey[100],
      fontFamily: ['"PlusJakartaSans-ExtraBold"', ...SYSTEM_FONTS].join(','),
      fontSize: 'clamp(1.5rem, 0.9643rem + 1.4286vw, 2.25rem)',
      fontWeight: 800,
      lineHeight: 44 / 36,
    },

    h3: {
      fontFamily: ['"PlusJakartaSans-Bold"', ...SYSTEM_FONTS].join(','),
      fontSize: DEFAULT_THEME.typography.pxToRem(36),
      letterSpacing: 0.2,
      lineHeight: 44 / 36,
    },

    h4: {
      fontFamily: ['"PlusJakartaSans-Bold"', ...SYSTEM_FONTS].join(','),
      fontSize: DEFAULT_THEME.typography.pxToRem(28),
      letterSpacing: 0.2,
      lineHeight: 42 / 28,
    },

    h5: {
      color: blue[300],
      fontFamily: ['"PlusJakartaSans-Bold"', ...SYSTEM_FONTS].join(','),
      fontSize: DEFAULT_THEME.typography.pxToRem(24),
      letterSpacing: 0.1,
      // lineHeight: 36 / 24,
    },

    h6: {
      fontSize: DEFAULT_THEME.typography.pxToRem(20),
      lineHeight: 30 / 20,
    },

    subtitle1: {
      fontSize: DEFAULT_THEME.typography.pxToRem(18),
      fontWeight: 500,
      letterSpacing: 0,
      lineHeight: 24 / 18,
    },
  },
});

export default MUI_DARK_THEME_BASE;
