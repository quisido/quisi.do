import React from 'react';
import CircularProgress from './circular-progress/circular-progress';

const style = {
  cursor: 'pointer'
};

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
        onClick={this.props.onClick}
        style={style}
      >
        <CircularProgress
          color={this.color}
          percentile={this.state.percentile}
          title={this.props.title}
        />
      </span>
    );
  }
}

export default Assessment;
