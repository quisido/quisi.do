import React from 'react';
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
    const props = {...this.props};
    delete props.classes;
    delete props.description;
    delete props.flair;
    return (
      <li className={this.props.classes.root}>
        <a
          children="[1]"
          rel="nofollow noopener noreferrer"
          {...this.props}
        />
        {this.description}
      </li>
    );
  }
}

export default withStyles(PortfolioLink);
