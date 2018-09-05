import React from 'react';
import Link from 'react-router-dom/Link';
import withStyles from './view-portfolio-styles.js';

class ViewPortfolio extends React.PureComponent {
  render() {
    return (
      <Link
        children="View more..."
        className={this.props.classes.root}
        to="/portfolio"
      />
    );
  }
}

export default withStyles(ViewPortfolio);
