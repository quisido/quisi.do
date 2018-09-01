import { withStyles } from '@material-ui/core';

const BOX_SHADOW =
  '0 2px 4px -1px rgba(0, 0, 0, 0.4) inset, ' +
  '0 4px 5px 0 rgba(0, 0, 0, 0.28) inset, ' +
  '0 1px 10px 0 rgba(0, 0, 0, 0.24) inset';
const HEIGHT = 252;

export default withStyles({
  color: {
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    boxShadow: BOX_SHADOW,
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
  faded: {
    backgroundBlendMode: 'soft-light',
    backgroundColor: '#303030',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    boxShadow: BOX_SHADOW,
    height: HEIGHT,
    left: 0,
    position: 'absolute',
    width: '100%'
  },
  root: {
    height: HEIGHT,
    margin: '1.25em 1em'
  }
});
