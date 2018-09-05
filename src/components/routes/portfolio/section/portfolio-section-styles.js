import { withStyles } from '@material-ui/core';

const transition = {
  transitionDuration: '0.25s',
  transitionProperty: 'opacity',
  transitionTimingFunction: 'ease-in'
};

export default withStyles({
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    flexBasis: 0,
    flexGrow: 1,
    justifyContent: 'center',
    margin: '0.5em',
    maxWidth: '100%',
    padding: '1em',
    textAlign: 'center',
    '&:hover $headline, &:hover $img': {
      opacity: 1
    }
  },
  headline: {
    ...transition,
    marginTop: '0.5em',
    opacity: 0.75
  },
  img: {
    ...transition,
    maxHeight: 250,
    minHeight: 250,
    opacity: 0.5,
    maxWidth: 250,
    minWidth: 250
  },
  imgWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  }
});
