import { withStyles } from '@material-ui/core';

const HEIGHT = 252;

export default withStyles({
  color: {
    backgroundPosition: 'center center',
    height: HEIGHT,
    left: 0,
    opacity: 0,
    position: 'absolute',
    top: 0,
    transitionDuration: '0.5s',
    transitionProperty: 'opacity',
    transitionTimingFunction: 'ease',
    width: '100%',
    '&:hover': {
      opacity: 1
    }
  },
  description: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    height: HEIGHT,
    justifyContent: 'center'
  },
  icon: {},
  root: {
    backgroundBlendMode: 'luminosity',
    backgroundPosition: 'center center',
    height: HEIGHT,
    padding: '0 !important',
    position: 'relative'
  }
});
