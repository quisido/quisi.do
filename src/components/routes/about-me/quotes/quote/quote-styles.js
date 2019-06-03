import { withStyles } from '@material-ui/core';

const DESKTOP_MEDIA_QUERY =  '@media (min-width: 66rem)';
const MOBILE_MEDIA_QUERY = '@media (max-width: 66rem)';

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
    padding: '1.5em 0',
    width: '100%',
    '&:not(:first-child)': {
      borderTopColor: '#606060',
      borderTopStyle: 'solid',
      borderTopWidth: 1
    },
    [DESKTOP_MEDIA_QUERY]: {
      flexDirection: 'row',
    },
    [MOBILE_MEDIA_QUERY]: {
      alignItems: 'center',
      flexDirection: 'column'
    }
  },
  animate: {
    animationDuration: '1s',
    animationIterationCount: 1,
    animationName: '$quote-animate',
    animationTimingFunction: 'ease-in-out'
  },
  blockquote: {
    margin: 0,
    padding: 0
  },
  cite: {
    '&:before': {
      content: '"\u2014 "'
    }
  },
  company: {
    cursor: 'help',
    width: 'fit-content'
  },
  image: {
    flexGrow: 1,
    padding: '0 1em 1em 1em',
    textAlign: 'center'
  },
  p: {
    fontSize: '1em',
    lineHeight: '1.5em'
  },
  quote: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 2,
    maxWidth: '44rem',
    padding: '0 1.5em'
  }
});
