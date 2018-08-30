import React from 'react';
import CircularProgress from './circular-progress/circular-progress';

const style = {
  cursor: 'pointer'
};

class Assessment extends React.PureComponent {
  render() {
    return (
      <span
        onClick={this.props.onClick(this.props.title, this.props.percentile, this.props.width, this.props.height)}
        style={style}
      >
        <CircularProgress
          color={this.props.selected ? 'secondary' : 'gray'}
          title={this.props.title}
          percentile={this.props.percentile}
          score={this.props.score}
        />
      </span>
    );
  }
}

export default Assessment;
