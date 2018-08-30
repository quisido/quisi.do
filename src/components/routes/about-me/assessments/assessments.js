import { Typography } from '@material-ui/core';
import React from 'react';
import Assessment from './assessment/assessment';
import PluralsightScore from './pluralsight-score/pluralsight-score';
import withStyles from './assessments-styles';

class Assessments extends React.PureComponent {

  assessmentClickHandlers = {};
  scoreRef = null;

  state = {
    percentile: 0,
    title: null
  };

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
        <section>
          <Typography
            children="Expertises"
            variant="subheading"
          />
          <Assessment
            onClick={this.handleAssessmentClick}
            percentile={100}
            selected={this.state.title === 'JS 1.8'}
            title="JS 1.8"
          />
          <Assessment
            onClick={this.handleAssessmentClick}
            percentile={99}
            selected={this.state.title === 'CSS'}
            title="CSS"
          />
          <Assessment
            onClick={this.handleAssessmentClick}
            percentile={97}
            selected={this.state.title === 'JS'}
            title="JS"
          />
          <Assessment
            onClick={this.handleAssessmentClick}
            percentile={96}
            selected={this.state.title === 'HTML5'}
            title="HTML5"
          />
          <Assessment
            onClick={this.handleAssessmentClick}
            percentile={94}
            selected={this.state.title === 'jQuery'}
            title="jQuery"
          />
          <Assessment
            onClick={this.handleAssessmentClick}
            percentile={89}
            selected={this.state.title === 'Node.js'}
            title="Node.js"
          />
          <Assessment
            onClick={this.handleAssessmentClick}
            percentile={87}
            selected={this.state.title === 'React'}
            title="React"
          />
        </section>
        <PluralsightScore
          onRef={this.handleScoreRef}
          percentile={this.state.percentile}
          title={this.state.title}
        />
        <section>
          <Typography
            children="Proficiencies"
            variant="subheading"
          />
          <Assessment
            onClick={this.handleAssessmentClick}
            percentile={94}
            selected={this.state.title === 'Java 8'}
            title="Java 8"
          />
          <Assessment
            onClick={this.handleAssessmentClick}
            percentile={72}
            selected={this.state.title === 'Docker'}
            title="Docker"
          />
        </section>
      </div>
    );
  }
}

export default withStyles(Assessments);
