import { withStyles } from '@material-ui/core';

const DESKTOP_MEDIA_QUERY =  '@media (min-width: 66rem)';
const MOBILE_MEDIA_QUERY = '@media (max-width: 66rem)';

export default withStyles({
  '@keyframes spritesheet2gif': {
    '0%': {
      backgroundPosition: '0 center'
    },
    '100%': {
      backgroundPosition: '-20664px center'
    }
  },
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
  quotes: { },
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
  spritesheet2gifColor: { },
  spritesheet2gifFaded: {
    backgroundBlendMode: 'soft-light',
    backgroundColor: '#303030',
    backgroundPosition: '0 center',
    backgroundRepeat: 'repeat-x',
    backgroundSize: 'auto 126px',
    '&:hover $spritesheet2gifColor': {
      animationDuration: '10s',
      animationIterationCount: 'infinite',
      animationName: 'spritesheet2gif',
      animationTimingFunction: 'steps(123)'
    }
  },
  viewMore: {
    margin: '1em'
  }
});
