import { withStyles } from '@material-ui/core';
import backgroundImage from '../../../../assets/portfolio/proficient.png';

export default withStyles({
  proficiency: {
    backgroundImage: 'url("' + backgroundImage + '")'
  },
  root: {
    textAlign: 'center'
  }
});
