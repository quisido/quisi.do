import { withStyles } from '@material-ui/core/styles';

const BORDER_COLOR = 'rgba(255, 255, 255, 0.1)'; // #303030
const HEIGHT = 190;
const LEVELS_WIDTH = 80;
const TRANSITION_TIMING_FUNCTION = 'ease-out';

export default withStyles({
  background: {
    bottom: 0,
    height: HEIGHT,
    left: 9,
    opacity: 0.15,
    position: 'absolute',
    transitionDuration: '0.5s',
    transitionProperty: 'width',
    transitionTimingFunction: TRANSITION_TIMING_FUNCTION,
    width: 0
  },
  graph: {
    borderTopColor: BORDER_COLOR,
    borderTopStyle: 'dashed',
    borderTopWidth: 1,
    bottom: 0,
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    transitionDuration: '0.5s',
    transitionProperty: 'height, width',
    transitionTimingFunction: TRANSITION_TIMING_FUNCTION
  },
  chart: {
    borderBottomColor: BORDER_COLOR,
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    height: HEIGHT,
    paddingLeft: 6,
    position: 'relative',
    width: 'calc(100% - ' + LEVELS_WIDTH + 'px)'
  },
  foreground: {
    backgroundColor: 'transparent',
    height: HEIGHT,
    width: '100%',
    '& > path': {
      fill: 'none'
    }
  },
  levels: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: LEVELS_WIDTH,
    '& > dl': {
      borderRightStyle: 'solid',
      borderRightWidth: 2,
      flexBasis: 0,
      flexGrow: 1,
      fontSize: 14,
      fontWight: 400,
      lineHeight: '18px',
      marginBottom: 1,
      marginLeft: 0,
      marginRight: 0,
      marginTop: 1,
      paddingBottom: 14,
      paddingRight: 10,
      paddingTop: 12,
      textAlign: 'right',
      '&:first-child': {
        color: '#26C1FB',
        marginTop: 0
      },
      '&:nth-child(2)': {
        color: '#86CE21'
      },
      '&:last-child': {
        color: '#FFC200',
        marginBottom: 0
      },
      '& > dd': {
        color: '#A0A0A0',
        fontSize: 12,
        fontWeight: 200,
        margin: 0
      }
    }
  },
  main: {
    display: 'flex',
    flexDirection: 'row',
    fontFamily: '"Gotham SSm A", "Gotham SSm B", sans-serif',
    height: 0,
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 0,
    maxWidth: 530 + LEVELS_WIDTH,
    overflow: 'hidden',
    transitionDuration: '0.5s',
    transitionProperty: 'height, margin-top',
    transitionTimingFunction: 'ease'
  }
});
