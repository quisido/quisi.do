import React from 'react';
import Icon from '../../icon/icon';
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

  get tooltip() {
    return (
      <React.Fragment>
        <div
          children={this.props.title}
          className={this.props.classes.title}
        />
        {ordinal(this.props.percentile)} Percentile
      </React.Fragment>
    );
  }

  render() {
    return (
      <Icon
        children={this.props.title}
        className={this.className}
        index={this.props.index}
        onClick={this.props.onClick}
        tooltip={this.tooltip}
      />
    );
  }
}

export default withStyles(Assessment);
