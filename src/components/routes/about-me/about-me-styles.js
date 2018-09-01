import { withStyles } from '@material-ui/core';

export default withStyles({
  paper: {
    margin: '2.5em 1em',
    padding: '1em',
    position: 'relative',
    '&:first-child': {
      marginTop: '1em'
    },
    '&:last-child': {
      marginBottom: '1em'
    }
  }
});
