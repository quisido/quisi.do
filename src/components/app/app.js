import Konami from '@gamingmedley/konami.js';
import React from 'react';
import ReactPortfolio from 'react-portfolio';
import AboutMe from '../routes/about-me/about-me';
import ElectronTransitions from '../routes/electron-transitions/electron-transitions';
import Portfolio from '../routes/portfolio/portfolio';
import Radix from '../routes/radix/radix';

const UPDATE_HUE_DELAY = 250;

const nav = [
  {
    path: '/',
    title: 'About Me'
  },
  {
    path: '/portfolio',
    title: 'Portfolio'
  }
];

const routes = [
  {
    component: AboutMe,
    path: '/'
  },
  {
    component: ElectronTransitions,
    path: '/electron-transitions',
    title: 'Electron Transitions'
  },
  {
    component: Portfolio,
    path: '/portfolio',
    title: 'Portfolio'
  },
  {
    component: Radix,
    path: '/radix',
    title: 'Radix Conversion'
  }
];

const social = {
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

export default class App extends React.PureComponent {

  state = {
    hue: 0.5
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
    }
  }

  updateHue = () => {
    this.setState(state => ({
      hue: (state.hue + 0.01) % 1
    }));
  }

  render() {
    return (
      <ReactPortfolio
        copyright={2009}
        hue={this.state.hue}
        nav={nav}
        routes={routes}
        social={social}
        title="Charles Stover"
      />
    );
  }
}
