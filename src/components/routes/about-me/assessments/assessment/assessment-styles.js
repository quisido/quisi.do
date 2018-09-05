import { withStyles } from '@material-ui/core';

export default withStyles({
  root: {
    cursor: 'pointer',
    display: 'inline-block',
    margin: '0.5em',
    position: 'relative'
  },
  title: {
    lineHeight: '1em',
    marginTop: '-0.5em',
    position: 'absolute',
    textAlign: 'center',
    top: '50%',
    width: '100%'
  }
});
