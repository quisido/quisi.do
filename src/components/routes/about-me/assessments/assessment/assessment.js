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

  render() {
    return (
      <span
        onClick={this.props.onClick(this.props.title, this.props.percentile, this.props.width, this.props.height)}
        style={style}
      >
        <CircularProgress
          color={
            this.props.off ?
              'gray' :
              this.props.selected ?
                'secondary' :
                'primary'
          }
          title={this.props.title}
          percentile={this.state.percentile}
          score={this.props.score}
        />
      </span>
    );
  }
}

export default Assessment;
