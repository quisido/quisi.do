import { CircularProgress, Tooltip } from '@material-ui/core';
import React from 'react';
import withStyles from './circular-progress-styles';

const ordinal = ((...suffixes) =>
  n =>
    n + (suffixes[(n % 100 - 20) % 10] || suffixes[n % 100] || suffixes[0])
)('th', 'st', 'nd', 'rd');

class AboutMeCircularProgress extends React.PureComponent {

  get circularProgressClassName() {
    const classNames = [ this.props.classes.circularProgress ];
    if (this.props.color === 'gray') {
      classNames.push(this.props.classes.gray);
    }
    return classNames.join(' ');
  }

  get color() {
    if (this.props.color === 'gray') {
      return 'primary';
    }
    return this.props.color;
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <span
          children={this.props.title}
          className={this.props.classes.title}
        />
        <Tooltip
          placement="bottom"
          title={ordinal(this.props.percentile) + ' Percentile'}
        >
          <CircularProgress
            className={this.circularProgressClassName}
            color={this.color}
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
