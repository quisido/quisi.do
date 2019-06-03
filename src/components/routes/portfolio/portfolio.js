import { Button } from '@material-ui/core';
import React from 'react';
import routes from './portfolio-routes';
import withStyles from './portfolio-styles';
import Sections from './sections/portfolio-sections';

const handleRouteRef = ref => {
  if (ref) {
    document.body.scrollIntoView();
  }
};

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
      <>
        <Component ref={handleRouteRef}>
          <Button
            className={this.props.classes.backToTop}
            color="secondary"
            onClick={this.handleBackToTop}
            variant="outlined"
          >
            Back to Top
          </Button>
        </Component>
      </>
    );
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <Sections
          paper
          pathname={this.props.location.pathname}
        />
        {this.route}
      </div>
    );
  }
}

export default withStyles(Portfolio);
