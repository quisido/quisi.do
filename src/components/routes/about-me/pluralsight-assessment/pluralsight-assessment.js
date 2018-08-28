import React from 'react';
import createObjectProp from 'react-object-prop';
import background from './background';
import foreground from './foreground';
import withStyles from './pluralsight-assessment-styles';

const BACKGROUND_INVISIBLE = {
  width: 'calc(100% - 9px)'
};

const MAIN_VISIBLE = {
  height: 190,
  marginTop: '1em'
};

class PluralsightAssessment extends React.PureComponent {

  _backgroundStyle = createObjectProp();
  _graphStyle = createObjectProp();

  get backgroundStyle() {
    if (this.props.title === null) {
      return BACKGROUND_INVISIBLE;
    }
    return this._backgroundStyle({
      width: 'calc(' + (10000 / this.props.width) + '% - 9px)'
    });
  }

  get graphStyle() {
    return this._graphStyle({
      height: this.props.height, // 190
      width: this.props.width + '%' // 530
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
              style={this.backgroundStyle}
              viewBox="0 0 530 190"
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

export default withStyles(PluralsightAssessment);
