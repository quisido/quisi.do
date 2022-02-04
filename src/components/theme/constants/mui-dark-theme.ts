/* eslint-disable @typescript-eslint/no-magic-numbers */
import ArrowDropDownRounded from '@mui/icons-material/ArrowDropDownRounded';
import { blue, grey } from '@mui/material/colors';
import type { Theme } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
import DARK_THEME_BASE from '../constants/mui-dark-theme-base';
import DEFAULT_THEME from '../constants/mui-default-theme';

const BLUE_DARK_400 = '#265d97';
const BLUE_DARK_500 = '#1e4976';
const BLUE_DARK_600 = '#173a5e';
const BLUE_DARK_700 = '#132f4c';
// const BLUE_DARK_800 = '#004c99';
const BLUE_DARK_900 = '#0a1929';

// MUI docs dark theme
// https://github.com/mui-org/material-ui-docs/blob/e4c83e43be627ff31cdf0159645f4b63ec1e6097/docs/src/modules/brandingTheme.ts#L108

const MUI_DARK_THEME: Theme = deepmerge(DARK_THEME_BASE, {
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

    MuiCardHeader: {
      styleOverrides: {
        action: {
          marginRight: '-4px',
        },
      },
    },

    MuiContainer: {
      styleOverrides: {
        root: {
          [DARK_THEME_BASE.breakpoints.up('md')]: {
            paddingLeft: DARK_THEME_BASE.spacing(2),
            paddingRight: DARK_THEME_BASE.spacing(2),
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

    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          '& .MuiListItemButton-root': {
            borderRadius: '0 !important',
          },
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
          padding: DARK_THEME_BASE.spacing(1, 2),
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
