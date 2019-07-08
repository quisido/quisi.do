import { withStyles } from '@material-ui/core';

const DESKTOP_MEDIA_QUERY =  '@media (min-width: 66rem)';
// const MOBILE_MEDIA_QUERY = '@media (max-width: 66rem)';
const MONOSPACE = 'Menlo, Monaco, "Courier New", Courier, monospace';
const SANS_SERIF = '"Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Arial, sans-serif';
const SERIF = 'Georgia, Cambria, "Times New Roman", Times, serif';

const readingWidth = {
  [DESKTOP_MEDIA_QUERY]: {
    paddingLeft: '10rem',
    paddingRight: '10rem',
  },
};

export default withStyles({
  root: {
    fontSmoothing: 'antialiased',
    margin: '2em auto',
    padding: '2em 1em',
    textRendering: 'optimizeLegibility',

    '& a': {
      textDecoration: 'underline',
    },

    '& blockquote': {
      borderLeftColor: 'rgba(255, 255, 255, 0.84)',
      borderLeftStyle: 'solid',
      borderLeftWidth: 3,
      paddingBottom: 2,
      paddingLeft: 20,

      [DESKTOP_MEDIA_QUERY]: {
        marginLeft: 'calc(10rem - 23px)',
        marginRight: '10rem',
      },

      '& > p': {
        fontStyle: 'italic',
        marginTop: 29,
        paddingLeft: 0,
        paddingRight: 0,
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
      fontWeight: 400,
      letterSpacing: 0,
      lineHeight: 1.25,
      margin: 0,
      marginBottom: 16,
      textAlign: 'center',
      '& + p': {
        marginTop: 8,
      },
    },

    '& h2': {
      fontFamily: SANS_SERIF,
      fontSize: 34,
      fontWeight: 600,
      letterSpacing: '-0.015em',
      lineHeight: 1.15,
      margin: 0,
      marginTop: 56,
      ...readingWidth,
      '& + h3': {
        marginTop: 31,
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
      marginTop: 30,
      ...readingWidth,
      '& + p': {
        marginTop: 6,
      },
    },

    '& h4': {
      fontFamily: SANS_SERIF,
      margin: 0,
      ...readingWidth,
    },

    '& h5': {
      fontFamily: SANS_SERIF,
      margin: 0,
      ...readingWidth,
    },

    '& h6': {
      fontFamily: SANS_SERIF,
      margin: 0,
      ...readingWidth,
    },

    '& p': {
      fontFamily: SERIF,
      fontSize: 21,
      fontWeight: 400,
      letterSpacing: '-0.003em',
      lineHeight: 1.58,
      marginBottom: 0,
      marginTop: 38,
      ...readingWidth,
    },

    '& ul': {
      marginTop: 29,
      paddingLeft: 0,
      ...readingWidth,

      '& > li': {
        fontFamily: SERIF,
        fontSize: 21,
        letterSpacing: '-0.003em',
        lineHeight: 1.58,
        marginBottom: 14,
        marginLeft: 24,
        paddingLeft: 6,
      },
    },
  },
});
