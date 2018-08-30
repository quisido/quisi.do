import { withStyles } from '@material-ui/core';

export default withStyles({
  amount: {
    flexGrow: 1,
    marginBottom: '1em'
  },
  form: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    flexBasis: 0,
    flexGrow: 1
  },
  paper: {
    display: 'flex',
    flexDirection: 'row',
    margin: '1em',
    padding: '1em'
  },
  paragraph: {
    flexBasis: 0,
    flexGrow: 2,
    lineHeight: '1.5em'
  },
  textField: {
    marginLeft: 4
  }
});
