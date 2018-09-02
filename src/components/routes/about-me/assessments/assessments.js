import React from 'react';
import Assessment from './assessment/assessment';
import withStyles from './assessments-styles';
import PluralsightScore from './pluralsight-score/pluralsight-score';

class Assessments extends React.PureComponent {

  assessmentClickHandlers = {};
  scoreRef = null;

  state = {
    percentile: 0,
    title: null
  };

  assessmentProps(title) {
    return {
      off:
        this.state.title !== null &&
        this.state.title !== title,
      selected: this.state.title === title,
      title
    };
  }

  handleAssessmentClick = (title, percentile) => {
    if (!Object.prototype.hasOwnProperty.call(this.assessmentClickHandlers, title)) {
      this.assessmentClickHandlers[title] = () => {
        if (this.state.title === title) {
          this.setState({
            percentile: 0,
            title: null
          });
        }
        else {
          this.setState({ percentile, title });
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

  render() {
    return (
      <div className={this.props.classes.root}>
        <div>
          <Assessment
            onClick={this.handleAssessmentClick}
            percentile={100}
            {...this.assessmentProps('JS 1.8')}
          />
          <Assessment
            onClick={this.handleAssessmentClick}
            percentile={99}
            {...this.assessmentProps('CSS')}
          />
          <Assessment
            onClick={this.handleAssessmentClick}
            percentile={97}
            {...this.assessmentProps('JS')}
          />
          <Assessment
            onClick={this.handleAssessmentClick}
            percentile={96}
            {...this.assessmentProps('HTML5')}
          />
          <Assessment
            onClick={this.handleAssessmentClick}
            percentile={94}
            {...this.assessmentProps('Java 8')}
          />
          <Assessment
            onClick={this.handleAssessmentClick}
            percentile={94}
            {...this.assessmentProps('jQuery')}
          />
          <Assessment
            onClick={this.handleAssessmentClick}
            percentile={89}
            {...this.assessmentProps('Node.js')}
          />
          <Assessment
            onClick={this.handleAssessmentClick}
            percentile={87}
            {...this.assessmentProps('React')}
          />
          <Assessment
            onClick={this.handleAssessmentClick}
            percentile={72}
            {...this.assessmentProps('Docker')}
          />
        </div>
        <PluralsightScore
          onRef={this.handleScoreRef}
          percentile={this.state.percentile}
          title={this.state.title}
        />
      </div>
    );
  }
}

export default withStyles(Assessments);
