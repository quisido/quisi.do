import withStyles from '@material-ui/core/styles/withStyles';

export default withStyles({
  label: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1em 0'
  },
  lightness: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  lightnessBox: {
    borderStyle: 'solid',
    borderWidth: 1,
    height: '4em',
    lineHeight: '4em',
    margin: '0 1em',
    textAlign: 'center',
    width: '4em'
  },
  lightnessInput: {
    flexGrow: 1
  },
  paper: {
    margin: '1em',
    padding: '1em'
  },
  strong: {
    letterSpacing: 1
  }
});
