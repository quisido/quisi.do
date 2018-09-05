import { CircularProgress } from '@material-ui/core';
import React from 'react';
import createObjectProp from 'react-object-prop';
import withStyles from './circular-progress-styles';

class AboutMeCircularProgress extends React.PureComponent {

  _circularProgressClasses = createObjectProp();

  get circularProgressClasses() {
    return this._circularProgressClasses({
      circleStatic: this.props.classes.circleStatic
    });
  }

  get circularProgressClassName() {
    const classNames = [ this.props.classes.root ];
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
      <CircularProgress
        classes={this.circularProgressClasses}
        className={this.circularProgressClassName}
        color={this.color}
        size="5em"
        value={this.props.percentile}
        variant="static"
      />
    );
  }
}

export default withStyles(AboutMeCircularProgress);
