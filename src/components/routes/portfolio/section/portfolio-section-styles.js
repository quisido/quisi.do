import { withStyles } from '@material-ui/core';

const transition = {
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
  },
  disabled: {
    cursor: 'default',
    '& $headline': {
      transitionDuration: '0.417s',
      opacity: 0.25
    },
    '& $image': {
      transitionDuration: '0.417s',
      opacity: 0.167,
    }
  },
  enabled: {
    '& $headline': {
      transitionDuration: '0.25s',
      opacity: 0.75
    },
    '& $image': {
      transitionDuration: '0.25s',
      opacity: 0.5,
    },
    '&:hover $headline, &:hover $image': {
      opacity: 1
    }
  },
  headline: {
    ...transition,
    marginTop: '0.5em'
  },
  image: {
    ...transition,
    backgroundColor: 'inherit',
    backgroundPosition: 'center 1em',
    backgroundRepeat: 'no-repeat',
    height: 250,
    pointerEvents: 'none',
    userSelect: 'none',
    width: 250
  },
});
