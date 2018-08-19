import React from 'react';
import { Link } from 'react-router-dom';
import withStyles from './portfolio-link-styles';

class PortfolioLink extends React.PureComponent {

  get description() {
    if (!this.props.description) {
      return null;
    }
    return (
      <p
        children={this.props.description}
        className={this.props.classes.description}
      />
    );
  }

  render() {
    const Component =
      this.props.internal ?
        Link :
        'a';
    const props = {...this.props};
    delete props.classes;
    delete props.description;
    delete props.flair;
    delete props.internal;
    if (!this.props.internal) {
      props.rel = 'nofollow noopener noreferrer';
    }
    return (
      <li className={this.props.classes.root}>
        <Component
          children="[1]"
          {...props}
        />
        {this.description}
      </li>
    );
  }
}

export default withStyles(PortfolioLink);
