import { withStyles } from '@material-ui/core';

export default withStyles(theme => ({
  circleStatic: {
    transitionDuration: '1.5s'
  },
  circularProgress: {
    transitionDuration: '0.25s',
    transitionProperty: 'color',
    transitionTimingFunction: 'ease-in',
    '&:hover': {
      color: theme.palette.secondary.main
    }
  },
  gray: {
    '&:not(:hover)': {
      color: '#808080'
    }
  },
  root: {
    display: 'inline-block',
    margin: '0.5em',
    position: 'relative'
  },
  title: {
    lineHeight: '1em',
    marginTop: '-0.5em',
    position: 'absolute',
    textAlign: 'center',
    top: '50%',
    width: '100%'
  }
}));
