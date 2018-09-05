import { Paper, Typography } from '@material-ui/core';
import React from 'react';
import Link from 'react-router-dom/Link';
import withStyles from './portfolio-section-styles';

class PortfolioSection extends React.PureComponent {
  render() {
    return (
      <Paper
        className={this.props.classes.root}
        component={Link}
        to={this.props.to}
      >
        <span className={this.props.classes.imgWrapper}>
          <img
            alt=""
            className={this.props.classes.img}
            src={this.props.src}
          />
        </span>
        <Typography
          children={this.props.title}
          className={this.props.classes.headline}
          variant="headline"
        />
      </Paper>
    );
  }
}

export default withStyles(PortfolioSection);
