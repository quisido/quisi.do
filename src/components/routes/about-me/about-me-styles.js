import { withStyles } from '@material-ui/core';

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
    display: 'flex',
    margin: '2em 1em',
    '@media (max-width: 66rem)': {
      flexDirection: 'column'
    },
    '@media (min-width: 66rem)': {
      flexDirection: 'row'
    }
  },
  paragraph: {
    alignSelf: 'flex-start',
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
    padding: '3em 1em',
    textAlign: 'center'
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
