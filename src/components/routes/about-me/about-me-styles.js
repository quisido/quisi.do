import { withStyles } from '@material-ui/core';

export default withStyles({
  icon: {
    fontSize: '2em',
    left: '-1.75em',
    lineHeight: '1em',
    marginTop: '-0.5em',
    opacity: 0.15,
    position: 'absolute',
    top: '50%',
    transitionDuration: '0.125s',
    transitionProperty: 'opacity',
    transitionTimingFunction: 'ease-in',
    userSelect: 'none'
  },
  paper: {
    margin: '2.5em 1em',
    padding: '1em',
    position: 'relative',
    '&:first-child': {
      marginTop: '1em'
    },
    '&:hover $icon': {
      opacity: 0.5
    },
    '&:last-child': {
      marginBottom: '1em'
    }
  }
});
