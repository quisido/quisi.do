import ArrowDropDownRounded from '@mui/icons-material/ArrowDropDownRounded';
import { type ThemeOptions } from '@mui/material/styles';
import SYSTEM_FONTS from './system-fonts.js';

const DEFAULT_MUI_THEME_OPTIONS: ThemeOptions = {
  spacing: 10,

  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        size: 'small',
      },
      styleOverrides: {
        sizeLarge: {
          fontWeight: 700,
          letterSpacing: 0,
          lineHeight: 1.3125,
          padding: '1rem 1.25rem',
        },
      },
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
        content: {
          maxWidth: '100%',
        },
      },
    },

    MuiCssBaseline: {
      defaultProps: {
        enableColorScheme: true,
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          '& .MuiListItemButton-root': {
            borderRadius: '0 !important',
          },
        },
      },
    },

    MuiFab: {
      defaultProps: {
        size: 'small',
      },
    },

    MuiFilledInput: {
      defaultProps: {
        margin: 'dense',
      },
    },

    MuiFormControl: {
      defaultProps: {
        margin: 'dense',
      },
    },

    MuiFormHelperText: {
      defaultProps: {
        margin: 'dense',
      },
    },

    MuiIconButton: {
      defaultProps: {
        size: 'small',
      },
    },

    MuiInputBase: {
      defaultProps: {
        margin: 'dense',
      },
    },

    MuiInputLabel: {
      defaultProps: {
        margin: 'dense',
      },
    },

    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
      styleOverrides: {
        root: {
          alignItems: 'center',
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

    MuiListItem: {
      defaultProps: {
        dense: true,
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 5,
        },
      },
    },

    MuiOutlinedInput: {
      defaultProps: {
        margin: 'dense',
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          '&[href]': {
            textDecorationLine: 'none',
          },
        },
        outlined: {
          display: 'block',
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
              transform: 'translateX(11px)',
            },
          },
        },
        switchBase: {
          height: 20,
          padding: 0,
          width: 20,
        },
        thumb: {
          flexShrink: 0,
          height: '14px',
          width: '14px',
        },
        track: {
          borderRadius: 32,
        },
      },
    },

    MuiTab: {
      defaultProps: {
        disableTouchRipple: true,
      },
    },

    MuiTable: {
      defaultProps: {
        size: 'small',
      },
    },

    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        margin: 'dense',
      },
    },

    MuiToggleButton: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          textTransform: 'none',
        },
      },
    },

    MuiToolbar: {
      defaultProps: {
        variant: 'dense',
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

  typography: {
    fontFamily: ['"IBM Plex Sans"', ...SYSTEM_FONTS].join(','),

    body1: {
      letterSpacing: 0,
      lineHeight: 1.5,
    },

    body2: {
      letterSpacing: 0,
      lineHeight: 1.5,
    },

    button: {
      fontWeight: 700,
      letterSpacing: 0,
      textTransform: 'initial',
    },

    caption: {
      display: 'inline-block',
      fontWeight: 700,
      letterSpacing: 0,
      lineHeight: 1.5,
    },

    h1: {
      fontFamily: ['"PlusJakartaSans-ExtraBold"', ...SYSTEM_FONTS].join(','),
      fontSize: 'clamp(2.625rem, 1.2857rem + 3.5714vw, 4rem)',
      fontWeight: 800,
      lineHeight: 1.114285714285714,
    },

    h2: {
      fontFamily: ['"PlusJakartaSans-ExtraBold"', ...SYSTEM_FONTS].join(','),
      fontSize: 'clamp(1.5rem, 0.9643rem + 1.4286vw, 2.25rem)',
      fontWeight: 800,
      lineHeight: 1.222222222222222,
    },

    h3: {
      fontFamily: ['"PlusJakartaSans-Bold"', ...SYSTEM_FONTS].join(','),
      letterSpacing: 0.2,
      lineHeight: 1.222222222222222,
    },

    h4: {
      fontFamily: ['"PlusJakartaSans-Bold"', ...SYSTEM_FONTS].join(','),
      letterSpacing: 0.2,
      lineHeight: 1.5,
    },

    h5: {
      fontFamily: ['"PlusJakartaSans-Bold"', ...SYSTEM_FONTS].join(','),
      letterSpacing: 0.1,
      // LineHeight: 36 / 24,
    },

    h6: {
      lineHeight: 1.5,
    },

    subtitle1: {
      fontWeight: 500,
      letterSpacing: 0,
      lineHeight: 1.333333333333333,
    },
  },
};

export default DEFAULT_MUI_THEME_OPTIONS;
