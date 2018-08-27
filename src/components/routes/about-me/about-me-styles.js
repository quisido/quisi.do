import { withStyles } from '@material-ui/core/styles';

export default withStyles({
  icon: {
    fontSize: '2em',
    left: '-1.75em',
    lineHeight: '1em',
    marginTop: '-0.5em',
    opacity: 0.15,
    position: 'absolute',
    top: '50%'
  },
  paper: {
    margin: '1em',
    padding: '1em',
    position: 'relative',
    '&:hover $icon': {
      opacity: 0.5
    }
  },
  tests: {
    textAlign: 'center',
    '& > section:not(:first-child)': {
      paddingTop: '1em'
    }
  }
});
