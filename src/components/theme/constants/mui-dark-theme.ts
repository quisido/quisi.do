/* eslint-disable @typescript-eslint/no-magic-numbers */
import ArrowDropDownRounded from '@mui/icons-material/ArrowDropDownRounded';
import { blue, grey } from '@mui/material/colors';
import type { Theme } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
import DEFAULT_THEME_OPTIONS from './default-mui-theme-options';

const BLUE_DARK_400 = '#265d97';
const BLUE_DARK_500 = '#1e4976';
const BLUE_DARK_600 = '#173a5e';
const BLUE_DARK_700 = '#132f4c';
const BLUE_DARK_800 = '#004c99';
const BLUE_DARK_900 = '#0a1929';
const DEFAULT_THEME: Theme = createTheme();

const SYSTEM_FONTS: string[] = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
];

// MUI docs dark theme
// https://github.com/mui-org/material-ui-docs/blob/e4c83e43be627ff31cdf0159645f4b63ec1e6097/docs/src/modules/brandingTheme.ts#L108

const MUI_DARK_THEME_BASE: Theme = createTheme({
  ...DEFAULT_THEME_OPTIONS,
  spacing: 10,
  palette: {
    divider: BLUE_DARK_700,
    grey,
    mode: 'dark',
    background: {
      default: BLUE_DARK_800,
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
    borderRadius: 10,
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
      fontWeight: 700,
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
      lineHeight: 36 / 24,
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

const MUI_DARK_THEME: Theme = deepmerge(MUI_DARK_THEME_BASE, {
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        containedPrimary: {
          backgroundColor: blue[500],
          color: '#fff',
        },
        sizeLarge: {
          fontSize: DEFAULT_THEME.typography.pxToRem(16),
          fontWeight: 700,
          letterSpacing: 0,
          lineHeight: 21 / 16,
          padding: '1rem 1.25rem',
        },
      },
      variants: [
        {
          props: {
            variant: 'code',
          },
          style: {
            WebkitFontSmoothing: 'subpixel-antialiased',
            backgroundColor: BLUE_DARK_700,
            borderColor: BLUE_DARK_400,
            borderStyle: 'solid',
            borderWidth: '1px',
            color: grey[400],
            fontSize: DEFAULT_THEME.typography.pxToRem(14),
            fontWeight: 600,
            letterSpacing: 0,
            lineHeight: 21 / 14,
            fontFamily:
              'Consolas, Menlo, Monaco, Andale Mono, Ubuntu Mono, monospace',
            '&:hover, &.Mui-focusVisible': {
              borderColor: blue[400],
              backgroundColor: BLUE_DARK_600,
              '& .MuiButton-endIcon': {
                color: blue[300],
              },
            },
            '& .MuiButton-endIcon': {
              color: grey[400],
            },
            '& .MuiButton-startIcon': {
              color: grey[400],
            },
          },
        },
      ],
    },
    MuiButtonBase: {
      defaultProps: {
        disableTouchRipple: true,
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          [MUI_DARK_THEME_BASE.breakpoints.up('md')]: {
            paddingLeft: MUI_DARK_THEME_BASE.spacing(2),
            paddingRight: MUI_DARK_THEME_BASE.spacing(2),
          },
        },
      },
    },
    MuiCssBaseline: {
      defaultProps: {
        enableColorScheme: true,
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: BLUE_DARK_700,
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
      styleOverrides: {
        root: {
          alignItems: 'center',
          color: blue[400],
          display: 'inline-flex',
          fontWeight: 700,
          '&.MuiTypography-body1 > svg': {
            marginTop: 2,
          },
          '& svg:last-child': {
            marginLeft: 2,
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 5,
          '&:focus, &:hover': {
            backgroundColor: '',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: BLUE_DARK_900,
          '&[href]': {
            textDecorationLine: 'none',
          },
        },
        outlined: {
          backgroundColor: BLUE_DARK_700,
          borderColor: BLUE_DARK_400,
          display: 'block',
          'a&, button&': {
            '&:hover': {
              boxShadow: '1px 1px 20px 0 rgb(90 105 120 / 20%)',
            },
          },
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        IconComponent: ArrowDropDownRounded,
      },
      styleOverrides: {
        iconFilled: {
          top: 'calc(50% - 0.25em)',
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          height: 20,
          width: 32,
          padding: 0,
          '& .MuiSwitch-switchBase': {
            '&.Mui-checked': {
              color: '#fff',
              transform: 'translateX(11px)',
            },
          },
        },
        switchBase: {
          color: '#fff',
          height: 20,
          padding: 0,
          width: 20,
          '&.Mui-checked + .MuiSwitch-track': {
            opacity: 1,
          },
        },
        thumb: {
          flexShrink: 0,
          height: '14px',
          width: '14px',
        },
        track: {
          backgroundColor: grey[800],
          borderRadius: 32,
          opacity: 1,
        },
      },
    },
    MuiTab: {
      defaultProps: {
        disableTouchRipple: true,
      },
    },
    MuiTableCell: {
      styleOverrides: {
        body: {
          color: grey[400],
        },
        head: {
          color: blue,
          fontWeight: 700,
        },
        root: {
          borderColor: BLUE_DARK_700,
          padding: MUI_DARK_THEME_BASE.spacing(1, 2),
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderColor: BLUE_DARK_500,
          color: grey[300],
          fontWeight: 700,
          textTransform: 'none',
          '&.Mui-selected': {
            backgroundColor: BLUE_DARK_700,
            borderColor: `${blue[700]} !important`,
            color: '#fff',
            '&:hover': {
              backgroundColor: BLUE_DARK_600,
            },
          },
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          backgroundColor: BLUE_DARK_900,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          paddingBottom: 7,
          paddingTop: 7,
        },
      },
    },
  },
});

export default MUI_DARK_THEME;
