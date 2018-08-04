import React from 'react';
import Portfolio from 'react-portfolio';

const nav = [
  {
    path: '/',
    title: 'About Me'
  },
  {
    path: '/contact',
    title: 'Contact'
  },
  {
    path: '/donate',
    title: 'Donate'
  },
  {
    path: '/portfolio',
    title: 'Portfolio'
  }
];

const social = {
  email: 'charlesstover@charlesstover.com',
  github: 'CharlesStover',
  linkedIn: 'charles-stover',
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
      hue: 0
    };
    this.updateHue = this.updateHue.bind(this);
  }

  componentDidMount() {
    this.updateHue();
  }

  updateHue() {
    this.setState((state) => ({
      hue: (state.hue + 0.01) % 1
    }));
    setTimeout(this.updateHue, 100);
  }

  render() {
    return (
      <Portfolio
        copyright={2009}
        hue={this.state.hue}
        nav={nav}
        social={social}
        title="Charles Stover"
      />
    );
  }
}
