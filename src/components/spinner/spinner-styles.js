import { withStyles } from '@material-ui/core';

export default withStyles({
  '@keyframes spinner': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
  root: {
    animationDuration: '1s',
    animationIterationCount: 'infinite',
    animationName: '$spinner',
    animationTimingFunction: 'linear',
    borderColor: 'rgba(255, 255, 255, 0.75)',
    borderRadius: '1em',
    borderStyle: 'solid',
    borderWidth: '0.125em 0 0 0',
    display: 'inline-block',
    fontSize: '1em',
    height: '1em',
    width: '1em',
  },
});
