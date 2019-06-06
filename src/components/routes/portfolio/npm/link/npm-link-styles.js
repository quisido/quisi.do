import { withStyles } from '@material-ui/core';

const DESKTOP_MEDIA_QUERY =  '@media (min-width: 66rem)';
const MOBILE_MEDIA_QUERY = '@media (max-width: 66rem)';

export default withStyles(theme => ({
  root: {
    marginBottom: 0,
    padding: 0,
    [DESKTOP_MEDIA_QUERY]: {
      width: '50%',
      '&:nth-child(n + 3)': {
        marginTop: '2em',
      },
    },
    [MOBILE_MEDIA_QUERY]: {
      width: '100%',
    },
  },
  icon: {
    fontSize: '2em',
    textAlign: 'center',
    width: '1em',
  },
  link: {
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'calc(100% - 2em) calc(100% - 2em)',
    display: 'flex',
    padding: '1.5em 2em',
    width: '100%',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
  },
  primary: {
    color: theme.palette.primary.light,
  },
  text: {
    maxWidth: '44rem',
  },
}));
