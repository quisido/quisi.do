import { Paper } from '@material-ui/core';
import React from 'react';
import withStyles from './about-styles';

class AboutDota2Huds extends React.PureComponent {
  render() {
    return (
      <Paper className={this.props.classes.root}>
        Dota 2 HUDs
      </Paper>
    );
  }
}

export default withStyles(AboutDota2Huds);
