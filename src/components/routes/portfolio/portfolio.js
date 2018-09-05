import React from 'react';
import github from '../../../assets/portfolio/github.png';
import medium from '../../../assets/portfolio/medium.png';
import npm from '../../../assets/portfolio/npm.png';
import withStyles from './portfolio-styles';
import Section from './section/portfolio-section';

class Portfolio extends React.PureComponent {
  render() {
    return (
      <div className={this.props.classes.root}>
        <Section
          src={github}
          title="GitHub Repositories"
          to="/portfolio/github"
        />
        <Section
          src={medium}
          title="Medium Publications"
          to="/portfolio/medium"
        />
        <Section
          src={npm}
          title="NPM Packages"
          to="/portfolio/npm"
        />
      </div>
    );
  }
}

export default withStyles(Portfolio);
