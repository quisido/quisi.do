import { withStyles } from '@material-ui/core';

export default withStyles(theme => ({
  root: {
    cursor: 'pointer',
    transitionDuration: '0.25s',
    transitionProperty: 'color',
    transitionTimingFunction: 'ease-out',
    '&:not($selected):hover': {
      color: theme.palette.primary.light
    }
  },
  selected: {
    color: theme.palette.primary.main
  }
}));
