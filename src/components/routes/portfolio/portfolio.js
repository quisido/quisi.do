import { Button } from '@material-ui/core';
import React from 'react';
import github from '../../../assets/portfolio/github.png';
import medium from '../../../assets/portfolio/medium.png';
import npm from '../../../assets/portfolio/npm.png';
import GitHubPortfolio from './github/github';
import MediumPortfolio from './medium/medium';
import NpmPortfolio from './npm/npm';
import withStyles from './portfolio-styles';
import Section from './section/portfolio-section';

const routes = [
  {
    component: GitHubPortfolio,
    path: 'github',
    src: github,
    title: 'GitHub Repositories'
  },
  {
    component: MediumPortfolio,
    path: 'medium',
    src: medium,
    title: 'Medium Publications'
  },
  {
    component: NpmPortfolio,
    path: 'npm',
    src: npm,
    title: 'NPM Packages'
  }
];

class Portfolio extends React.PureComponent {

  handleBackToTop = e => {
    e.preventDefault();
    document.body.scrollIntoView();
    return false;
  };

  get route() {
    const route = routes.find(route => this.props.location.pathname === '/portfolio/' + route.path);
    if (typeof route === 'undefined') {
      return null;
    }
    const Component = route.component;
    return (
      <React.Fragment>
        <Component />
        <Button
          children="Back to Top"
          className={this.props.classes.backToTop}
          onClick={this.handleBackToTop}
          variant="outlined"
        />
      </React.Fragment>
    );
  }

  mapRoutesToSection = route => {
    return (
      <Section
        disabled={this.props.location.pathname === '/portfolio/' + route.path}
        key={route.path}
        src={route.src}
        title={route.title}
        to={'/portfolio/' + route.path}
      />
    );
  };

  get sections() {
    return routes.map(this.mapRoutesToSection);
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <div
          children={this.sections}
          className={this.props.classes.sections}
        />
        {this.route}
      </div>
    );
  }
}

export default withStyles(Portfolio);
