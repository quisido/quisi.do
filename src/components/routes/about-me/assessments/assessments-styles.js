import { withStyles } from '@material-ui/core';

export default withStyles({
  root: {
    textAlign: 'center',
    '& > section:not(:first-child)': {
      paddingTop: '1em'
    }
  }
});
