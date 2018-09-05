import { Tooltip } from '@material-ui/core';
import React from 'react';
import withStyles from './assessment-styles';
import CircularProgress from './circular-progress/circular-progress';

const ordinal = ((...suffixes) =>
  n =>
    n + (suffixes[(n % 100 - 20) % 10] || suffixes[n % 100] || suffixes[0])
)('th', 'st', 'nd', 'rd');

class Assessment extends React.PureComponent {

  state = {
    percentile: 0
  };

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    if (this.props.percentile !== this.state.percentile) {
      this.setState({
        percentile: this.props.percentile
      });
    }
  }

  get color() {
    return (
      this.props.off ?
      'gray' :
      this.props.selected ?
        'secondary' :
        'primary'
    );
  }

  render() {
    return (
      <span
        className={this.props.classes.root}
        onClick={this.props.onClick}
      >
        <span
          children={this.props.title}
          className={this.props.classes.title}
        />
        <Tooltip
          placement="bottom"
          title={ordinal(this.props.percentile) + ' Percentile'}
        >
          <CircularProgress
            color={this.color}
            percentile={this.state.percentile}
          />
        </Tooltip>
      </span>
    );
  }
}

export default withStyles(Assessment);
