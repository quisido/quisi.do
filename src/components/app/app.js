import Konami from '@gamingmedley/konami.js';
import React from 'react';
import ReactPortfolio from 'react-portfolio';
import withStyles from './app-styles';
import ROUTES from '../../utils/routes';

const RESUME_VERSION = '2019-05';

const SOCIAL = {
  email: 'charlesstover@charlesstover.com',
  github: 'CharlesStover',
  linkedin: 'charles-stover',
  medium: 'Charles_Stover',
  npmjs: 'charlesstover',
  reddit: 'Charles_Stover',
  skype: 'charles-stover',
  stackoverflow: '4856301/charles-stover',
  twitter: 'CharlesStover'
};

const THEME = {
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: '#303030',
      },
    },
  },
  palette: {
    background: {
      default: '#202020',
    },
  },
};

const UPDATE_HUE_DELAY = 250;

class App extends React.PureComponent {

  state = {
    hue: 0.5,
  };

  unsubscribeKonami = null;

  updateHueInterval = null;

  componentDidMount() {
    this.unsubscribeKonami = Konami.add(this.handleKonami);
  }

  componentWillUnmount() {
    this.unsubscribeKonami();
    window.clearInterval(this.updateHueInterval);
  }

  handleKonami = () => {
    if (this.updateHueInterval === null) {
      this.updateHueInterval = window.setInterval(this.updateHue, UPDATE_HUE_DELAY);
    }
    else {
      window.clearInterval(this.updateHueInterval);
      this.updateHueInterval = null;
    }
  };

  updateHue = () => {
    this.setState(state => ({
      hue: (state.hue + 0.01) % 1,
    }));
  };

  render() {
    return (
      <ReactPortfolio
        copyright={2009}
        lightness={0.5}
        primary={this.state.hue}
        resume={`/resume/${RESUME_VERSION}/charles-stover-resume.pdf`}
        routes={ROUTES}
        saturation={0.5}
        secondary={this.state.hue}
        social={SOCIAL}
        theme={THEME}
        title={
          <>
            Charles Stover
            <span className={this.props.classes.dot}> . </span>
            com
          </>
        }
      />
    );
  }
}

export default withStyles(App);
