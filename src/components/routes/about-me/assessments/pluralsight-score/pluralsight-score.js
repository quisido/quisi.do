import React from 'react';
import createObjectProp from 'react-object-prop';
import background from './background';
import foreground from './foreground';
import withStyles from './pluralsight-score-styles';

const MAIN_VISIBLE = {
  height: 190,
  marginTop: '1em'
};

const percentile2height = percentile =>
  (1 - Math.acos(percentile / 50 - 1) / Math.PI) * 190 - 1;

// Dimension: 530x190
class PluralsightScore extends React.PureComponent {

  _graphStyle = createObjectProp();
  animationFrame = null;

  state = {
    percentile: 0
  };

  componentDidMount() {
    this.componentDidUpdate({ percentile: 0 });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.percentile !== this.props.percentile) {
      this.speed = (this.props.percentile - prevProps.percentile) / 30;
    }
    window.cancelAnimationFrame(this.animationFrame);
    if (this.props.percentile !== this.state.percentile) {
      this.animationFrame = window.requestAnimationFrame(this.animate);
    }
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationFrame);
  }

  animate = () => {
    this.setState(state => ({
      percentile:
        Math[state.percentile > this.props.percentile ? 'max' : 'min'](
          this.props.percentile,
          state.percentile + this.speed
        )
    }));
  }

  get backgroundViewBox() {
    return '0 0 ' + Math.round(this.state.percentile * 5.3) + ' 190';
  }

  get graphStyle() {
    return this._graphStyle({
      height: percentile2height(this.state.percentile),
      width: 'calc(' + this.state.percentile + '% - 9px)'
    });
  }

  get mainStyle() {
    if (this.props.title === null) {
      return null;
    }
    return MAIN_VISIBLE;
  }

  render() {
    return (
      <div
        className={this.props.classes.main}
        ref={this.props.onRef}
        style={this.mainStyle}
      >
        <div
          aria-hidden
          className={this.props.classes.levels}
        >
          <dl>
            <dt>Expert</dt>
            <dd>201-300</dd>
          </dl>
          <dl>
            <dt>Proficient</dt>
            <dd>101-200</dd>
          </dl>
          <dl>
            <dt>Novice</dt>
            <dd>0-100</dd>
          </dl>
        </div>
        <div className={this.props.classes.chart}>
          <div
            className={this.props.classes.graph}
            style={this.graphStyle}
          >
            <svg
              className={this.props.classes.background}
              preserveAspectRatio="none"
              viewBox={this.backgroundViewBox}
            >
              <path
                d={background.novice}
                fill="#FFC200"
              />
              <path
                d={background.proficient}
                fill="#86CE21"
              />
              <path
                d={background.expert}
                fill="#26C1FB"
              />
            </svg>
          </div>
          <svg
            aria-hidden
            className={this.props.classes.foreground}
            preserveAspectRatio="none"
            viewBox="0 0 530 190"
          >
            <path
              d={foreground.novice}
              stroke="#FFC200"
              strokeWidth={2}
            />
            <path
              d={foreground.proficient}
              stroke="#86CE21"
              strokeWidth={2}
            />
            <path
              d={foreground.expert}
              stroke="#26C1FB"
              strokeWidth={2}
            />
          </svg>
        </div>
      </div>
    );
  }
}

export default withStyles(PluralsightScore);
