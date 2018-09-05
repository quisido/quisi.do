import { withStyles } from '@material-ui/core';

export default withStyles(theme => ({
  root: {
    transitionDuration: '0.25s',
    transitionProperty: 'color',
    transitionTimingFunction: 'ease-in',
    '&:hover': {
      color: theme.palette.secondary.main
    }
  },
  circleStatic: {
    transitionDuration: '1.5s'
  },
  gray: {
    '&:not(:hover)': {
      color: '#808080'
    }
  }
}));
