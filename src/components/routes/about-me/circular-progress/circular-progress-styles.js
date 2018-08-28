import { withStyles } from '@material-ui/core/styles';

export default withStyles({
  circularProgress: {
    transitionDuration: '0.25s',
    transitionProperty: 'color',
    transitionTimingFunction: 'ease-in'
  },
  gray: {
    '&:not(:hover)': {
      color: '#808080'
    }
  },
  root: {
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
