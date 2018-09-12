import { withStyles } from '@material-ui/core';

const DESKTOP_MEDIA_QUERY =  '@media (min-width: 66rem)';
const MOBILE_MEDIA_QUERY = '@media (max-width: 66rem)';

const spritesheet2gifKeyframes = [{}, {}];
for (let x = 0; x < 12; x++) {
  const p = Math.round(x / 11 * 100) + '%';
  spritesheet2gifKeyframes[0][p] = {
    backgroundPosition: x * -64 + 'px center'
  };
  spritesheet2gifKeyframes[1][p] = {
    backgroundPosition: x * -128 + 'px center'
  };
}

export default withStyles({
  '@keyframes spritesheet2gif-mobile': spritesheet2gifKeyframes[0],
  '@keyframes spritesheet2gif-desktop': spritesheet2gifKeyframes[1],
  aboutMe: {
    alignItems: 'center',
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    width: '100%',
    '& > $avatar': {
      [DESKTOP_MEDIA_QUERY]: {
        marginRight: 0
      },
      [MOBILE_MEDIA_QUERY]: {
        marginBottom: 0
      }
    },
    [DESKTOP_MEDIA_QUERY]: {
      flexDirection: 'row'
    },
    [MOBILE_MEDIA_QUERY]: {
      flexDirection: 'column'
    }
  },
  avatar: {
    borderRadius: 50,
    boxShadow:
      '0 1px 5px 0 rgba(0, 0, 0, 0.2), ' +
      '0 2px 2px 0 rgba(0, 0, 0, 0.14), ' +
      '0 3px 1px -2px rgba(0, 0, 0, 0.12)',
    margin: '1em'
  },
  email: {
    padding: '1em 1em 0 1em'
  },
  highlight: {
    color: '#FFFFFF'
  },
  info: {
    alignSelf: 'center',
    flexBasis: 0,
    flexGrow: 1,
    lineHeight: '2em',
    padding: '1em',
    textAlign: 'center'
  },
  paper: {
    margin: '2em 1em'
  },
  paragraph: {
    flexBasis: 0,
    flexGrow: 2,
    fontSize: 16,
    lineHeight: '2em',
    textIndent: '1em',
    maxWidth: '44rem',
    padding: '1em',
    '@media (max-width: 66rem)': {
      paddingBottom: '1em'
    }
  },
  quotes: {
    padding: '1.5em 1em'
  },
  section: {
    backgroundColor: 'inherit',
    display: 'flex',
    padding: '3em 1em',
    [DESKTOP_MEDIA_QUERY]: {
      alignItems: 'flex-start',
      flexDirection: 'row'
    },
    [MOBILE_MEDIA_QUERY]: {
      alignItems: 'center',
      flexDirection: 'column'
    },
    '& + $section': {
      paddingTop: '2em'
    }
  },
  sectionBody: {
    backgroundColor: 'inherit',
    flexBasis: 0,
    flexGrow: 2,
    maxWidth: '44rem'
  },
  sectionHeadline: {
    boxSizing: 'border-box',
    flexBasis: 0,
    flexGrow: 1,
    lineHeight: '64px',
    [DESKTOP_MEDIA_QUERY]: {
      marginLeft: '3em',
      marginRight: '-3em',
      textAlign: 'left'
    },
    [MOBILE_MEDIA_QUERY]: {
      textAlign: 'center'
    }
  },
  seeNoEvil: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '3em',
    overflow: 'hidden',
    padding: 0,
    textAlign: 'center'
  },
  spritesheet2gifColor: {
    backgroundPosition: '0 center',
    backgroundRepeat: 'repeat-x'
  },
  spritesheet2gifFaded: {
    backgroundPosition: '0 center',
    '&:hover $spritesheet2gifColor': {
      animationDuration: '1.25s',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'step-start',
      '@media (max-width: 320px)': {
        animationName: 'spritesheet2gif-mobile'
      },
      '@media (min-width: 321px)': {
        animationName: 'spritesheet2gif-desktop'
      }
    }
  }
});
