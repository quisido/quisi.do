import { withStyles } from '@material-ui/core';

const SIZE = 64;

export default withStyles({
  root: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'auto 100%',
    display: 'inline-block',
    filter: 'saturate(0%)',
    height: SIZE,
    margin: '0.5em 1em',
    transitionDuration: '0.5s',
    transitionProperty: 'filter',
    transitionTimingFunction: 'ease-out',
    width: SIZE,
    '&:not($selected):hover': {
      filter: 'saturate(100%)'
    },
    '& > span': {
      display: 'none'
    }
  },
  selected: {
    filter: 'saturate(100%)'
  }
});
