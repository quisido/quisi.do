import { withStyles } from '@material-ui/core';

export const ANIMATION_DURATION = 2;

export default withStyles(theme => ({
  '@keyframes letter': {
    '0%': {
      top: '0.0625em',
    },
    '80%': {
      top: '0.0625em',
    },
    '90%': {
      top: '-0.0625em',
    },
    '100%': {
      top: '0.0625em',
    },
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    margin: '2em auto',
  },
  spinner: {
    borderColor: theme.palette.secondary.main,
    marginRight: '0.5em',
    opacity: 0.25,
  },
  letter: {
    animationDuration: `${ANIMATION_DURATION}s`,
    animationIterationCount: 'infinite',
    animationName: '$letter',
    animationTimingFunction: 'linear',
    color: 'rgba(255, 255, 255, 0.5)',
    position: 'relative',
    whiteSpace: 'pre',
  },
}));
