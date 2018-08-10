import withStyles from '@material-ui/core/styles/withStyles';

export default withStyles({
  body: {
    overflow: 'auto',
    padding: '1em'
  },
  form: {
    textAlign: 'center'
  },
  input: {
    width: '5em'
  },
  paper: {
    margin: '1em',
    padding: '1em'
  },
  table: {
    '& td, & th': {
      padding: '0.5em 1em',
      whiteSpace: 'nowrap'
    },
    '& th': {
      fontWeight: 'normal',
      textAlign: 'left',
      verticalAlign: 'bottom'
    }
  }
});
