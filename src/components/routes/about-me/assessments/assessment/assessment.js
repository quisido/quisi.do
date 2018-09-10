import { Tooltip } from '@material-ui/core';
import React from 'react';
import withStyles from './assessment-styles';

const ordinal = ((...suffixes) =>
  n =>
    n + (suffixes[(n % 100 - 20) % 10] || suffixes[n % 100] || suffixes[0])
)('th', 'st', 'nd', 'rd');

class Assessment extends React.PureComponent {

  get className() {
    if (this.props.selected) {
      return (
        this.props.classes.root + ' ' +
        this.props.classes.selected
      );
    }
    return this.props.classes.root;
  }

  render() {
    return (
      <Tooltip
        placement="top"
        title={ordinal(this.props.percentile) + ' Percentile'}
      >
        <span
          children={this.props.title}
          className={this.className}
          onClick={this.props.onClick}
        />
      </Tooltip>
    );
  }
}

export default withStyles(Assessment);
