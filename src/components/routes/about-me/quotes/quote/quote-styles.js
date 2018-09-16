import { withStyles } from '@material-ui/core';

export default withStyles({
  '@keyframes quote-animate': {
    '0%': {
      opacity: 0,
      transform: 'translateY(-100%)'
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)'
    }
  },
  root: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    padding: '1em 0 2em 0',
    width: '100%',
    '&:not(:first-child)': {
      borderTopColor: '#606060',
      borderTopStyle: 'solid',
      borderTopWidth: 1,
      paddingTop: '2em'
    }
  },
  animate: {
    animationDuration: '1s',
    animationIterationCount: 1,
    animationName: 'quote-animate',
    animationTimingFunction: 'ease-in-out'
  },
  blockquote: {
    margin: 0,
    padding: 0
  },
  cite: {
    cursor: 'help',
    width: 'fit-content',
    '&:before': {
      content: '"\u2014 "'
    }
  },
  p: {
    fontSize: '1em',
    lineHeight: '1.5em'
  },
  quote: {
    display: 'flex',
    flexBasis: 0,
    flexDirection: 'column',
    flexGrow: 2,
    maxWidth: '44rem',
    padding: '0 1em'
  },
  image: {
    flexBasis: 0,
    flexGrow: 1,
    padding: '0 1em',
    textAlign: 'center'
  }
});
