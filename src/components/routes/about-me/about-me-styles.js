import { withStyles } from '@material-ui/core';

const DESKTOP_MEDIA_QUERY =  '@media (min-width: 66rem)';
const MOBILE_MEDIA_QUERY = '@media (max-width: 66rem)';

export default withStyles({
  '@keyframes projects-spritesheet2gif': {
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
    [DESKTOP_MEDIA_QUERY]: {
      flexDirection: 'row'
    },
    [MOBILE_MEDIA_QUERY]: {
      flexDirection: 'column'
    }
  },
  aboutMeAvatar: {
    borderRadius: 50,
    boxShadow:
      '0 1px 5px 0 rgba(0, 0, 0, 0.2), ' +
      '0 2px 2px 0 rgba(0, 0, 0, 0.14), ' +
      '0 3px 1px -2px rgba(0, 0, 0, 0.12)',
    margin: '1em',
    [DESKTOP_MEDIA_QUERY]: {
      marginRight: 0
    },
    [MOBILE_MEDIA_QUERY]: {
      marginBottom: 0
    }
  },
  aboutMeHighlight: {
    color: '#FFFFFF'
  },
  aboutMeInfo: {
    alignSelf: 'center',
    flexBasis: 0,
    flexGrow: 1,
    lineHeight: '2em',
    padding: '1em',
    textAlign: 'center'
  },
  aboutMeParagraph: {
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
  paper: {
    margin: '2em 1em'
  },
  projects: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '3em',
    overflow: 'hidden',
    padding: 0,
    textAlign: 'center'
  },
  projectsSpritesheet2gifColor: { },
  projectsSpritesheet2gifFaded: {
    backgroundBlendMode: 'soft-light',
    backgroundColor: '#303030',
    backgroundPosition: '0 center',
    backgroundRepeat: 'repeat-x',
    backgroundSize: 'auto 126px',
    '&:hover $projectsSpritesheet2gifColor': {
      animationDuration: '10s',
      animationIterationCount: 'infinite',
      animationName: '$projects-spritesheet2gif',
      animationTimingFunction: 'steps(123)'
    }
  },
  projectsViewMore: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '1em'
  },
  projectsViewMoreLink: {
    margin: '0 1em',
  },
  publicationsViewMore: {
    display: 'inline-block',
    marginTop: '1.5em'
  },
  section: {
    padding: '3em 1em',
    textAlign: 'center',
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
  sectionContent: {
    backgroundColor: 'inherit',
    display: 'flex',
    [DESKTOP_MEDIA_QUERY]: {
      alignItems: 'flex-start',
      flexDirection: 'row'
    },
    [MOBILE_MEDIA_QUERY]: {
      alignItems: 'center',
      flexDirection: 'column'
    }
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
  }
});
