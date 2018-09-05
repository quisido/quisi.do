import { withStyles } from '@material-ui/core';

export default withStyles(theme => ({
  root: {
    marginBottom: 0,
    padding: 0
  },
  icon: {
    fontSize: '2em',
    textAlign: 'center',
    width: '1em'
  },
  link: {
    display: 'flex',
    padding: '1.5em 2em',
    width: '100%',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)'
    }
  },
  primary: {
    color: theme.palette.primary.light
  },
  text: {
    maxWidth: '44rem'
  }
}));
