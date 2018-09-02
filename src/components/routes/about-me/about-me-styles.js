import { withStyles } from '@material-ui/core';

export default withStyles({
  highlight: {
    color: '#FFFFFF'
  },
  info: {
    alignSelf: 'center',
    flexBasis: 0,
    flexGrow: 1,
    lineHeight: '2em',
    padding: '1em',
    textAlign: 'center'
  },
  paper: {
    display: 'flex',
    margin: '2em 1em',
    '@media (max-width: 66rem)': {
      flexDirection: 'column'
    },
    '@media (min-width: 66rem)': {
      flexDirection: 'row'
    }
  },
  paragraph: {
    alignSelf: 'flex-start',
    flexBasis: 0,
    flexGrow: 2,
    fontSize: 16,
    lineHeight: '2em',
    textIndent: '1em',
    maxWidth: '44rem',
    padding: '1em',
    '@media (max-width: 66rem)': {
      paddingBottom: '1em'
    }
  },
  section: {
    padding: '3em 1em',
    textAlign: 'center'
  },
  viewPortfolio: {
    display: 'inline-block',
    marginTop: '1em'
  }
});
