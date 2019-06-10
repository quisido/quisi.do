import React from 'react';
import { Link } from 'react-router-dom';
import withStyles from './view-portfolio-styles.js';

class ViewPortfolio extends React.PureComponent {
  render() {
    return (
      <Link
        className={this.props.classes.root}
        to="/portfolio/"
      >
        View more
      </Link>
    );
  }
}

export default withStyles(ViewPortfolio);
