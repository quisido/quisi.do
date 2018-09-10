import { withStyles } from '@material-ui/core';
import image from '../../../../assets/technologies.png';

const SIZE = 64;

export default withStyles({
  technology: {
    backgroundBlendMode: 'luminosity',
    backgroundColor: 'inherit',
    backgroundImage: 'url("' + image + '")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'auto 100%',
    display: 'inline-block',
    height: SIZE,
    margin: '0.5em 1em',
    width: SIZE,
    '& > span': {
      backgroundImage: 'inherit',
      backgroundPosition: 'inherit',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'auto 100%',
      display: 'inline-block',
      opacity: 0,
      height: SIZE,
      transitionDuration: '0.5s',
      transitionProperty: 'opacity',
      transitionTimingFunction: 'ease-out',
      width: SIZE,
      '& > span': {
        display: 'none'
      }
    },
    '&:hover > span': {
      opacity: 1
    }
  }
});
