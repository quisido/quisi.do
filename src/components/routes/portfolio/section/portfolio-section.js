import { Paper, Typography } from '@material-ui/core';
import React from 'react';
import withStyles from './portfolio-section-styles';

class PortfolioSection extends React.PureComponent {
  render() {
    return (
      <Paper className={this.props.classes.paper}>
        <Typography
          children={this.props.title}
          gutterBottom
          variant="headline"
        />
        <ul
          children={this.props.children}
          className={this.props.classes.ul}
        />
      </Paper>
    );
  }
}

export default withStyles(PortfolioSection);
