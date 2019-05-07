import { List, Paper, Typography } from '@material-ui/core';
import React from 'react';
import medium from '../../../../assets/medium';
import Link from './link/medium-link';
import withStyles from './medium-styles';

const mapLinks = link =>
  <Link
    key={link.id}
    {...link}
  />;

class Medium extends React.PureComponent {
  render() {
    return (
      <Paper className={this.props.classes.root}>
        <Typography
          children="Medium Publications"
          className={this.props.classes.title}
          variant="h5"
        />
        <List
          children={medium.map(mapLinks)}
          className={this.props.classes.list}
        />
      </Paper>
    );
  }
}

export default withStyles(Medium);
