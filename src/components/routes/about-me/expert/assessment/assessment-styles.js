import { withStyles } from '@material-ui/core';
import backgroundImage from '../../../../../assets/portfolio/expert.png';

export default withStyles({
  root: {
    backgroundImage: 'url("' + backgroundImage + '")',
  },
  selected: {
    filter: 'saturate(100%)'
  },
});
