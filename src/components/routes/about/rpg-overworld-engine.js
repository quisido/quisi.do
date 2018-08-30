import { Paper } from '@material-ui/core';
import React from 'react';
import withStyles from './about-styles';

class AboutRpgOverworldEngine extends React.PureComponent {
  render() {
    return (
      <Paper className={this.props.classes.root}>
        RPG Overworld Engine
      </Paper>
    );
  }
}

export default withStyles(AboutRpgOverworldEngine);
