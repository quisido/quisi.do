import ElectronTransitions from '@charlesstover/electron-transitions';
import PasswordGenerator from '@charlesstover/password-generator';
import Radix from '@charlesstover/radix';
import RainbowText from '@charlesstover/rainbow-text';
import SpriteSheetToGif from '@charlesstover/spritesheet2gif';
import Konami from '@gamingmedley/konami.js';
import React from 'react';
import ReactPortfolio from 'react-portfolio';
import AboutMe from '../routes/about-me/about-me';
import Portfolio from '../routes/portfolio/portfolio';

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
    path: '/',
    title: 'Charles Stover'
  },
  {
    component: ElectronTransitions,
    description: 'Calculcator for the energy, frequencies, wavelengths of electron transitions.',
    keywords: [ 'electron transition calculator' ],
    path: '/electron-transitions',
    title: 'Electron Transitions'
  },
  {
    component: PasswordGenerator,
    description: 'Generate an automated, secure password with symbols.',
    keywords: [ 'password generator', 'secure password generator', 'strong password generator' ],
    path: '/password-generator',
    title: 'Secure Password Generator'
  },
  {
    component: Portfolio,
    description: 'View the web development portfolio of Charles Stover.',
    keywords: [ 'Charles Stover', 'freelance web developer', 'freelance web development', 'web development consultant', 'web development portfolio' ],
    path: '/portfolio',
    title: 'Charles Stover\'s Portfolio'
  },
  {
    component: Radix,
    description: 'Convert between bases with this handy radix calculator.',
    keywords: [ 'base converter', 'convert base 2 to base 8', 'convert base 2 to base 10', 'convert base 2 to base 16', 'convert base 8 to base 2', 'convert base 8 to base 10', 'convert base 8 to base 16', 'convert base 10 to base 2', 'convert base 10 to base 8', 'convert base 10 to base 16', 'convert base 16 to base 2', 'convert base 16 to base 8', 'convert base 16 to base 10', 'convert bases', 'convert binary to decimal', 'convert binary to hexadecimal', 'convert binary to octal', 'convert decimal to binary', 'convert decimal to hexadecimal', 'convert decimal to octal', 'convert hexadecimal to binary', 'convert hexadecimal to decimal', 'convert hexadecimal to octal', 'convert octal to binary', 'convert octal to decimal', 'convert octal to hexadecimal', 'radix conversion' ],
    path: '/radix',
    title: 'Radix Conversion'
  },
  {
    component: RainbowText,
    description: 'Generate rainbow-colored text in HTML or BB code for forums!',
    keywords: [ 'rainbow color text generator', 'rainbow text bb code', 'rainbow text for forums', ' rainbow text generator', ' rainbow text html', ' rainbow text maker' ],
    path: '/rainbow-text',
    title: 'Rainbow Text Generator'
  },
  {
    component: SpriteSheetToGif,
    description: 'Convert a sprite sheet to an animated GIF!',
    keywords: [ 'animate sprite sheets', 'animate sprite sheets online', 'convert sprite sheets to animated gifs', 'convert sprite sheets to animated gifs online', 'online sprite sheet animator', 'online sprite sheet to animated gif converter', 'online sprite sheet to gif converter', 'online sprite sheet to gif maker', 'sprite sheet animator', 'sprite sheet to animated gif', 'sprite sheet to animated gif converter', 'sprite sheet to animated gif maker', 'sprite sheet to animated gif online', 'sprite sheet to gif', 'sprite sheet to gif converter', 'sprite sheet to gif maker', 'sprite sheet to gif online' ],
    path: '/spritesheet2gif',
    title: 'Sprite Sheet to GIF Converter'
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
