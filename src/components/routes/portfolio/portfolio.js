import { Button } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';
import routes from './portfolio-routes';
import withStyles from './portfolio-styles';
import Sections from './sections/portfolio-sections';

class Portfolio extends React.PureComponent {

  handleBackToTop = e => {
    e.preventDefault();
    document.body.scrollIntoView();
    return false;
  };

  handleRouteRef = ref => {
    if (ref) {
      ReactDOM.findDOMNode(ref).scrollIntoView();
    }
  };

  get route() {
    const route = routes.find(route => this.props.location.pathname === '/portfolio/' + route.path);
    if (typeof route === 'undefined') {
      return null;
    }
    const Component = route.component;
    return (
      <React.Fragment>
        <Component ref={this.handleRouteRef} />
        <Button
          children="Back to Top"
          className={this.props.classes.backToTop}
          onClick={this.handleBackToTop}
          variant="outlined"
        />
      </React.Fragment>
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
