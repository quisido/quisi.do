import { withStyles } from '@material-ui/core';

const DESKTOP_MEDIA_QUERY =  '@media (min-width: 66rem)';
const MOBILE_MEDIA_QUERY = '@media (max-width: 66rem)';
const MONOSPACE = 'Menlo, Monaco, "Courier New", Courier, monospace';
const SANS_SERIF = '"Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Arial, sans-serif';
const SERIF = 'Georgia, Cambria, "Times New Roman", Times, serif';

const HEADING = {
  position: 'relative',

  '&:hover > a': {
    opacity: 0.5,
  },

  '& > a': {
    alignItems: 'center',
    display: 'inline-flex',
    height: '100%',
    left: -32,
    opacity: 0,
    paddingRight: 16,
    position: 'absolute',
    textDecoration: 'none',
    top: 0,

    '& > span': {
      fontSize: 16,
    },
  },
};

export default withStyles({
  root: {
    fontSmoothing: 'antialiased',
    margin: '2em auto',
    padding: '2em 1em',
    textRendering: 'optimizeLegibility',

    [DESKTOP_MEDIA_QUERY]: {
      paddingLeft: '11rem',
      paddingRight: '11rem',
    },

    '& a': {
      textDecoration: 'underline',
    },

    '& blockquote': {
      borderLeftColor: 'rgba(255, 255, 255, 0.84)',
      borderLeftStyle: 'solid',
      borderLeftWidth: 3,
      paddingBottom: 2,

      [DESKTOP_MEDIA_QUERY]: {
        marginLeft: 'calc(10rem - 23px)',
        marginRight: '10rem',
        marginTop: 38,
        paddingLeft: 20,
      },

      [MOBILE_MEDIA_QUERY]: {

        // This discrepency is probably due to the fact that we are 4px wider
        //   than Medium.
        marginLeft: -20 + 4,
        marginRight: 0,
        marginTop: 30,
        paddingLeft: 17,
      },

      '& > p': {
        fontStyle: 'italic',
        paddingLeft: 0,
        paddingRight: 0,

        [DESKTOP_MEDIA_QUERY]: {
          fontSize: 21,
        },

        [MOBILE_MEDIA_QUERY]: {
          fontSize: 18,
        },
      },
    },

    '& code': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      fontFamily: MONOSPACE,
      margin: '0 2px',
      padding: '3px 4px',
    },

    '& h1': {
      fontFamily: SERIF,
      fontSize: 42,
      fontWeight: 400,
      letterSpacing: 0,
      lineHeight: 1.25,
      margin: 0,
      marginBottom: 16,
      textAlign: 'left',
      ...HEADING,

      '& + p': {
        marginTop: 8,
      },
    },

    '& h2': {
      fontFamily: SANS_SERIF,
      fontWeight: 600,
      letterSpacing: '-0.015em',
      lineHeight: 1.15,
      margin: 0,
      marginTop: 56,
      ...HEADING,

      [DESKTOP_MEDIA_QUERY]: {
        fontSize: 34,
      },

      [MOBILE_MEDIA_QUERY]: {
        fontSize: 30,
      },

      '& + h3': {

        [DESKTOP_MEDIA_QUERY]: {
          marginTop: 23,
        },

        [MOBILE_MEDIA_QUERY]: {
          marginTop: 31,
        },
      },

      '& + p': {
        marginTop: 8,

        '& > img': {
          marginTop: 44 - 8,
        },
      },
    },

    '& h3': {
      fontFamily: SANS_SERIF,
      fontSize: 26,
      fontWeight: 600,
      letterSpacing: '-0.012em',
      lineHeight: 1.22,
      margin: 0,
      ...HEADING,

      [DESKTOP_MEDIA_QUERY]: {
        marginTop: 39,
      },

      [MOBILE_MEDIA_QUERY]: {
        marginTop: 31,
      },

      '& + p': {
        marginTop: 6,
      },
    },

    '& h4': {
      fontFamily: SANS_SERIF,
      margin: 0,
      ...HEADING,
    },

    '& h5': {
      fontFamily: SANS_SERIF,
      margin: 0,
      ...HEADING,
    },

    '& h6': {
      fontFamily: SANS_SERIF,
      margin: 0,
      ...HEADING,
    },

    '& p': {
      fontFamily: SERIF,
      fontWeight: 400,
      lineHeight: 1.58,
      marginBottom: 0,

      [DESKTOP_MEDIA_QUERY]: {
        fontSize: 21,
        letterSpacing: '-0.003em',
        marginTop: 38,
      },

      [MOBILE_MEDIA_QUERY]: {
        fontSize: 18,
        letterSpacing: '-0.004em',
        marginTop: 30,
      },

      '& + blockquote': {

        [DESKTOP_MEDIA_QUERY]: {
          marginTop: 29,
        },

        [MOBILE_MEDIA_QUERY]: {
          marginTop: 21,
        },
      },

      '& + h2': {

        [DESKTOP_MEDIA_QUERY]: {
          marginTop: 56,
        },

        [MOBILE_MEDIA_QUERY]: {
          marginTop: 28,
        },
      },
    },

    '& ul': {
      paddingLeft: 0,

      [DESKTOP_MEDIA_QUERY]: {
        marginTop: 29,
      },

      [MOBILE_MEDIA_QUERY]: {
        marginTop: 21,
      },

      '& > li': {
        fontFamily: SERIF,
        lineHeight: 1.58,
        marginBottom: 14,
        marginLeft: 24,
        paddingLeft: 6,

        [DESKTOP_MEDIA_QUERY]: {
          fontSize: 21,
          letterSpacing: '-0.003em',
        },

        [MOBILE_MEDIA_QUERY]: {
          fontSize: 18,
          letterSpacing: '-0.004em',
        },
      },

      '& > p': {

        [DESKTOP_MEDIA_QUERY]: {
          marginTop: 29,
        },

        [MOBILE_MEDIA_QUERY]: {
          marginTop: 21,
        },
      },
    },
  },
});
