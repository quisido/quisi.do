import { List, Paper, Typography } from '@material-ui/core';
import React from 'react';
import medium from '../../../../assets/medium';
import Link from './link';
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
          className={this.props.classes.title}
          variant="h5"
        >
          Medium Publications
        </Typography>
        <List className={this.props.classes.list}>
          {medium.map(mapLinks)}
        </List>
        {this.props.children}
      </Paper>
    );
  }
}

export default withStyles(Medium);
