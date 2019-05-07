import { withStyles } from '@material-ui/core/styles';

export default withStyles({
  about: {
    display: 'flex',
    flexDirection: 'row'
  },
  aboutText: {
    flexBasis: 0,
    flexGrow: 2
  },
  close: {
    color: '#C00000',
    cursor: 'pointer',
    float: 'right'
  },
  dimension: {
    width: '4em'
  },
  duration: {
    width: '4em'
  },
  file: {
    height: 1,
    marginRight: -1,
    opacity: 0,
    width: 1
  },
  list: {
    padding: 0
  },
  matte: {
    backgroundColor: '#404040',
    borderColor: '#202020',
    height: '2.5em',
    marginBottom: '1em',
    width: '100%'
  },
  paper: {
    margin: '1em',
    padding: '1em'
  },
  report: {
    borderTopColor: '#404040',
    borderTopStyle: 'solid',
    borderTopWidth: 1,
    lineHeight: '1.5em',
    marginBottom: 0,
  },
  select: {
    paddingLeft: '0.5em'
  },
  sprite: {
    textAlign: 'center'
  },
  spriteDemo: {
    opacity: 0.667,
    pointerEvents: 'none',
    position: 'absolute'
  },
  spriteDemoContainer: {
    alignItems: 'center',
    display: 'flex',
    flexBasis: 0,
    flexGrow: 1,
    justifyContent: 'flex-end',
    position: 'relative'
  },
  spriteDemoError: {
    opacity: 0.667,
    right: -52,
    pointerEvents: 'none',
    position: 'absolute',
    top: -73,
    zIndex: 1200
  },
  table: {
    width: '100%',

    '& td, & th': {
      padding: '1em',
      verticalAlign: 'top'
    },

    '& th': {
      lineHeight: '2em',
      textAlign: 'left',
      width: '1%'
    },

    '& tr:not(:first-child) td, & tr:not(:first-child) th': {
      borderTop: '1px solid #404040'
    }
  },
  tfoot: {
    textAlign: 'center'
  },
  upload: {
    marginRight: '1em'
  }
});
