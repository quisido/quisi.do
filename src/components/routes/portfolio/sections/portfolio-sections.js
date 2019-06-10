import React from 'react';
import routes from '../portfolio-routes';
import withStyles from './portfolio-sections-styles';
import Section from './section/portfolio-section';

class PortfolioSections extends React.PureComponent {

  mapRoutesToSection = route => {
    return (
      <Section
        disabled={
          this.props.pathname &&
          this.props.pathname === `/portfolio/${route.path}/`
        }
        key={route.path}
        paper={this.props.paper || false}
        src={route.src}
        title={route.title}
        to={`/portfolio/${route.path}/`}
      />
    );
  };

  get sections() {
    return routes.map(this.mapRoutesToSection);
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        {this.sections}
      </div>
    )
  }
}

export default withStyles(PortfolioSections);
