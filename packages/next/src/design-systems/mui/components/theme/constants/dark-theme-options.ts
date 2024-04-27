/* eslint-disable @typescript-eslint/no-magic-numbers */
import { blue, grey } from '@mui/material/colors';
import { type ThemeOptions } from '@mui/material/styles';

/*
 * MUI docs dark theme
 * https://github.com/mui-org/material-ui-docs/blob/e4c83e43be627ff31cdf0159645f4b63ec1e6097/docs/src/modules/brandingTheme.ts#L108
 */

const BLUE_DARK_400 = '#265d97';
const BLUE_DARK_500 = '#1e4976';
const BLUE_DARK_600 = '#173a5e';
const BLUE_DARK_700 = '#132f4c';
// Const BLUE_DARK_800 = '#004c99';
const BLUE_DARK_900 = '#0a1929';

const MUI_DARK_THEME_OPTIONS: ThemeOptions = {
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: blue[500],
          color: '#fff',
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: BLUE_DARK_700,
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(255 255 255 / 5%)',
        },
      },
    },

    MuiLink: {
      styleOverrides: {
        root: {
          color: blue[400],
        },
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
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
        },
        outlined: {
          backgroundColor: BLUE_DARK_700,
          borderColor: BLUE_DARK_400,
          'a&, button&': {
            '&:hover': {
              boxShadow: '1px 1px 20px 0 rgb(90 105 120 / 20%)',
            },
          },
        },
      },
    },

    MuiSwitch: {
      styleOverrides: {
        root: {
          '& .MuiSwitch-switchBase': {
            '&.Mui-checked': {
              color: '#fff',
            },
          },
        },
        switchBase: {
          color: '#fff',
          '&.Mui-checked + .MuiSwitch-track': {
            opacity: 1,
          },
        },
        track: {
          backgroundColor: grey[800],
          opacity: 1,
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        body: {
          color: grey[400],
        },
        head: {
          // Color: blue,
        },
        root: {
          borderColor: BLUE_DARK_700,
        },
      },
    },

    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderColor: BLUE_DARK_500,
          color: grey[300],
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
  },

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

  typography: {
    h2: {
      color: grey[100],
    },

    h5: {
      color: blue[300],
    },
  },
};

export default MUI_DARK_THEME_OPTIONS;
