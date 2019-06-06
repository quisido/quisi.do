import { withStyles } from '@material-ui/core';

export default withStyles({
  root: {
    margin: '2em 1em',
    overflow: 'hidden',
    padding: 0,
  },
  error: {
    padding: '2em 1em',
    textAlign: 'center',
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 0,
    padding: 0,
  },
  title: {
    padding: '1em',
    textAlign: 'center',
  },
});
