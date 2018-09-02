import { withStyles } from '@material-ui/core';
import image from '../../../../assets/technologies.png';

const SIZE = 64;

export default withStyles({
  technology: {
    backgroundImage: 'url("' + image + '")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'auto 100%',
    display: 'inline-block',
    height: SIZE,
    margin: '0.5em 1em',
    width: SIZE
  }
});
