import { Typography } from '@material-ui/core';
import delimiter from 'delimiter';
import PluralsightScore from 'pluralsight-score';
import React from 'react';
import Assessment from './assessment/assessment';
import withStyles from './assessments-styles';

const PLURALSIGHT =
  <a
    children="Pluralsight"
    href="https://app.pluralsight.com/profile/CharlesStover"
    rel="nofollow noopener noreferrer"
    target="_blank"
  />;

const assessments = [
  // [ 'JS 1.8', 100, 'SHL® Online' ],
  [ 'JavaScript', 100, 'SHL® Online' ],
  [ 'CSS', 99, PLURALSIGHT ],
  // [ 'JS', 97, PLURALSIGHT ],
  [ 'HTML5', 96, PLURALSIGHT ],
  // [ 'Java 8', 94, 'SHL® Online' ],
  // [ 'jQuery', 94, PLURALSIGHT ],
  [ 'Node.js', 89, PLURALSIGHT ],
  [ 'React', 87, PLURALSIGHT ],
  [ 'Docker', 72, PLURALSIGHT ]
];

class Assessments extends React.PureComponent {

  assessmentClickHandlers = {};
  scoreRef = null;

  state = {
    percentile: 0,
    source: null,
    title: null
  };

  handleAssessmentClick = (title, percentile, source) => {
    if (!Object.prototype.hasOwnProperty.call(this.assessmentClickHandlers, title)) {
      this.assessmentClickHandlers[title] = () => {
        if (this.state.title === title) {
          this.setState({
            percentile: 0,
            source: null,
            title: null
          });
        }
        else {
          this.setState({ percentile, source, title });
          if (this.scoreRef) {
            this.scoreRef.scrollIntoViewIfNeeded();
          }
        }
      };
    }
    return this.assessmentClickHandlers[title];
  };

  handleScoreRef = ref => {
    this.scoreRef = ref;
  };

  isOff(title) {
    return (
      this.state.title !== null &&
      this.state.title !== title
    );
  }

  get source() {
    if (this.state.source === null) {
      return null;
    }
    return (
      <Typography
        className={this.props.classes.source}
        variant="caption"
      >
        Source:{' '}
        {this.state.source}
      </Typography>
    );
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <div>
          Expert in{' '}
          {delimiter(
            assessments.map(([ title, percentile, source ]) =>
              <Assessment
                key={title}
                onClick={this.handleAssessmentClick(title, percentile, source)}
                percentile={percentile}
                selected={this.state.title === title}
                title={title}
              />
          ))}.
        </div>
        <PluralsightScore
          hidden={this.state.title === null}
          onRef={this.handleScoreRef}
          percentile={this.state.percentile}
        />
        {this.source}
      </div>
    );
  }
}

export default withStyles(Assessments);
