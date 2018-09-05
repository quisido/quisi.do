import { withStyles } from '@material-ui/core';

export default withStyles(theme => ({
  root: {
    display: 'inline-block',
    padding: '1em',
    transitionDuration: '0.125s',
    transitionProperty: 'color',
    transitionTimingFunction: 'ease-out',
    '&:hover': {
      color: theme.palette.primary.main
    }
  }
}));
