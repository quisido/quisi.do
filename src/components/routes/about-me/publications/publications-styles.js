import { withStyles } from '@material-ui/core';

export default withStyles({
  caption: {
    display: 'inline'
  },
  help: {
    alignItems: 'center',
    backgroundColor: '#303030',
    border: '1px solid #404040',
    borderRadius: '0.75em',
    cursor: 'help',
    display: 'flex',
    fontSize: '1em',
    height: '1.5em',
    justifyContent: 'center',
    opacity: 0.5,
    width: '1.5em'
  },
  link: {
    flexGrow: 1
  },
  list: {
    paddingBottom: 0,
    paddingTop: 0
  },
  listItem: {
    '&:not(:first-child)': {
      borderTop: '1px solid #282828'
    }
  },
  listItemTextPrimary: {
    display: 'flex',
    flexDirection: 'row'
  }
});
