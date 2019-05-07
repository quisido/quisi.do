import Konami from '@gamingmedley/konami.js';
import React from 'react';
import ReactPortfolio from 'react-portfolio';
import withStyles from './app-styles';
import AboutMe from '../routes/about-me';
import Donate from '../routes/donate';
import Portfolio from '../routes/portfolio';
import SpriteSheetToGif from '../routes/spritesheet2gif';

const UPDATE_HUE_DELAY = 250;

const routes = [
  {
    component: AboutMe,
    description: 'Portfolio of senior full-stack JavaScript developer Charles Stover.',
    keywords: [ 'Charles Stover', 'Charles Stover\'s portfolio', 'full-stack JavaScript developer', 'JavaScript developer', 'senior full-stack JavaScript developer', 'senior JavaScript developer' ],
    path: '/',
    title: 'Charles Stover'
  },
  {
    component: Donate,
    description: 'Make a donation to Charles Stover, keeping his free web services operational.',
    keywords: [ 'Charles Stover,', 'donate to Charles Stover' ],
    path: '/donate',
    title: 'Donate to Charles Stover'
  },
  {
    component: Portfolio,
    description: 'View the web development portfolio of Charles Stover.',
    keywords: [ 'Charles Stover', 'freelance web developer', 'freelance web development', 'web development consultant', 'web development portfolio' ],
    path: '/portfolio',
    title: 'Portfolio - Charles Stover'
  },
  {
    component: Portfolio,
    description: 'View the GitHub repositories of Charles Stover.',
    keywords: [ 'Charles Stover GitHub', 'Charles Stover repositories' ],
    path: '/portfolio/github',
    title: 'GitHub Repositories - Charles Stover'
  },
  {
    component: Portfolio,
    description: 'View the Medium publications of Charles Stover.',
    keywords: [ 'Charles Stover Medium', 'Charles Stover publications' ],
    path: '/portfolio/medium',
    title: 'Medium Publications - Charles Stover'
  },
  {
    component: Portfolio,
    description: 'View the NPM packages of Charles Stover.',
    keywords: [ 'Charles Stover NPM', 'Charles Stover packages' ],
    path: '/portfolio/npm',
    title: 'NPM Packages - Charles Stover'
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

class App extends React.PureComponent {

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
        routes={routes}
        social={social}
        title={
          <React.Fragment>
            Charles Stover
            <span className={this.props.classes.dot}> . </span>
            com
          </React.Fragment>
        }
      />
    );
  }
}

export default withStyles(App);
