import { withStyles } from '@material-ui/core';

const textShadow = i =>
  '-' + i + 'px -' + i + 'px ' + i + 'px #000000, ' +
  '-' + i + 'px      0       ' + i + 'px #000000, ' +
  '-' + i + 'px  ' + i + 'px ' + i + 'px #000000, ' +
  ' ' + i + 'px -' + i + 'px ' + i + 'px #000000, ' +
  '     0       -' + i + 'px ' + i + 'px #000000, ' +
  '     0        ' + i + 'px ' + i + 'px #000000, ' +
  ' ' + i + 'px      0       ' + i + 'px #000000, ' +
  ' ' + i + 'px  ' + i + 'px ' + i + 'px #000000';

const BOX_SHADOW =
  '0 2px 4px -1px rgba(0, 0, 0, 0.4) inset, ' +
  '0 4px 5px 0 rgba(0, 0, 0, 0.28) inset, ' +
  '0 1px 10px 0 rgba(0, 0, 0, 0.24) inset';
const HEIGHT = 252;

export default withStyles({
  caption: {
    fontSize: '1em'
  },
  color: {
    backgroundBlendMode: 'soft-light',
    backgroundColor: '#303030',
    backgroundPosition: 'inherit',
    backgroundRepeat: 'inherit',
    backgroundSize: 'inherit',
    height: HEIGHT,
    left: 0,
    opacity: 0,
    position: 'absolute',
    top: 0,
    transitionDuration: '0.5s',
    transitionProperty: 'opacity',
    transitionTimingFunction: 'ease',
    width: '100%'
  },
  description: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: HEIGHT,
    justifyContent: 'center',
    position: 'absolute',
    textShadow: textShadow(3),
    width: '100%'
  },
  faded: {
    backgroundBlendMode: 'multiply',
    backgroundColor: '#404040',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    color: '#F0F0F0',
    display: 'block',
    height: HEIGHT,
    width: '100%'
  },
  root: {
    height: HEIGHT,
    position: 'relative',
    width: '100%',
    '&:first-child $color, &:first-child $faded': {
      boxShadow: BOX_SHADOW
    },
    '&:hover $color': {
      opacity: 1
    }
  },
  title: {
    fontSize: '2em'
  }
});
