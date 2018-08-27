import { CircularProgress, Tooltip } from '@material-ui/core';
import React from 'react';
import withStyles from './circular-progress-styles';

class AboutMeCircularProgress extends React.PureComponent {
  render() {
    return (
      <div className={this.props.classes.root}>
        <span
          children={this.props.title}
          className={this.props.classes.title}
        />
        <Tooltip
          placement="bottom"
          title={this.props.percentile + ' Percentile'}
        >
          <CircularProgress
            className={this.props.classes.circularProgress}
            size="5em"
            value={this.props.percentile}
            variant="static"
          />
        </Tooltip>
      </div>
    );
  }
}

export default withStyles(AboutMeCircularProgress);
