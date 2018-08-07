import Konami from '@gamingmedley/konami.js';
import React from 'react';
import Portfolio from 'react-portfolio';
import AboutMe from '../routes/about-me/about-me';

const UPDATE_HUE_DELAY = 1000;

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

  constructor(props) {
    super(props);
    this.state = {
      hue: 0.5
    };
    this.handleKonami = this.handleKonami.bind(this);
    this.unsubscribeKonami = null;
    this.updateHue = this.updateHue.bind(this);
    this.updateHueInterval = null;
  }

  componentDidMount() {
    this.unsubscribeKonami = Konami.add(this.handleKonami);
  }

  componentWillUnmount() {
    this.unsubscribeKonami();
    window.clearInterval(this.updateHueInterval);
  }

  handleKonami() {
    if (this.updateHueInterval === null) {
      this.updateHueInterval = window.setInterval(this.updateHue, UPDATE_HUE_DELAY);
    }
    else {
      window.clearInterval(this.updateHueInterval);
    }
  }

  updateHue() {
    this.setState(state => ({
      hue: (state.hue + 0.01) % 1
    }));
  }

  render() {
    return (
      <Portfolio
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
