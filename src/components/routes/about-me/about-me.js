import { Paper, Typography } from '@material-ui/core';
import React from 'react';
import Quotes from 'react-quotes';
import withStyles from './about-me-styles';
import Assessment from './assessment/assessment';
import PluralsightAssessment from './pluralsight-assessment/pluralsight-assessment';
import quotes from './quotes';

const CURRENT_YEAR = new Date().getFullYear();
const DEFAULT_TEST_STATE = {
  height: 0,
  title: null,
  width: 0
};

const backEndYears = CURRENT_YEAR - 2005;
const frontEndYears = CURRENT_YEAR - 2001;

class AboutMe extends React.PureComponent {

  assessmentClickHandlers = {};

  assessmentRef = null;

  state = {
    test: DEFAULT_TEST_STATE
  };

  handleAssessmentClick = (title, width, height) => {
    if (!Object.prototype.hasOwnProperty.call(this.assessmentClickHandlers, title)) {
      this.assessmentClickHandlers[title] = () => {
        if (this.state.test.title === title) {
          this.setState({
            test: DEFAULT_TEST_STATE
          });
        }
        else {
          this.setState({
            test: { height, title, width }
          });
          if (this.assessmentRef) {
            this.assessmentRef.scrollIntoViewIfNeeded();
          }
        }
      };
    }
    return this.assessmentClickHandlers[title];
  };

  handleAssessmentRef = ref => {
    this.assessmentRef = ref;
  };

  render() {
    return (
      <React.Fragment>
        <Paper className={this.props.classes.paper}>
          <span
            children="🙈"
            className={this.props.classes.icon}
          />
          <Typography>
            Dota 2 HUDs
          </Typography>
        </Paper>
        <Paper className={this.props.classes.paper}>
          <span
            children="🙉"
            className={this.props.classes.icon}
          />
          <Typography paragraph>
            My name is Charles Stover.
            I am a senior full-stack web development consultant currently employed with a focus in React and Node.
            I've been developing front end applications for {frontEndYears} years and server-side apps in PHP and MySQL for {backEndYears}.
            My expertise is in automated content generation, performance and search engine optimization, and security.
            I strive for optimal <abbr title="User Interface">UI</abbr>/<abbr title="User Experience">UX</abbr> through{' '}
            modern design principles and optimized performance.
          </Typography>
          <div className={this.props.classes.tests}>
            <section>
              <Typography
                children="Expertises"
                variant="subheading"
              />
              <Assessment
                height={189}
                onClick={this.handleAssessmentClick}
                percentile={100}
                selected={this.state.test.title === 'JS 1.8'}
                title="JS 1.8"
                width={100}
              />
              <Assessment
                height={177}
                onClick={this.handleAssessmentClick}
                percentile={99}
                selected={this.state.test.title === 'CSS'}
                title="CSS"
                width={99.057}
              />
              <Assessment
                height={163}
                onClick={this.handleAssessmentClick}
                percentile={97}
                selected={this.state.test.title === 'JS'}
                title="JS"
                width={96.792}
              />
              <Assessment
                height={158}
                onClick={this.handleAssessmentClick}
                percentile={96}
                selected={this.state.test.title === 'HTML5'}
                title="HTML5"
                width={95.849}
              />
              <Assessment
                height={152}
                onClick={this.handleAssessmentClick}
                percentile={94}
                selected={this.state.test.title === 'jQuery'}
                title="jQuery"
                width={93.774}
              />
              <Assessment
                height={140}
                onClick={this.handleAssessmentClick}
                percentile={89}
                selected={this.state.test.title === 'Node.js'}
                title="Node.js"
                width={88.679}
              />
              <Assessment
                height={137}
                onClick={this.handleAssessmentClick}
                percentile={87}
                selected={this.state.test.title === 'React'}
                title="React"
                width={87.17}
              />
            </section>
            <PluralsightAssessment
              {...this.state.test}
              onRef={this.handleAssessmentRef}
            />
            <section>
              <Typography
                children="Proficiencies"
                variant="subheading"
              />
              <Assessment
                height={152}
                onClick={this.handleAssessmentClick}
                percentile={94}
                selected={this.state.test.title === 'Java 8'}
                title="Java 8"
                width={93.774}
              />
              <Assessment
                height={117}
                onClick={this.handleAssessmentClick}
                percentile={72}
                selected={this.state.test.title === 'Docker'}
                title="Docker"
                width={71.698}
              />
            </section>
          </div>
        </Paper>
        <Paper className={this.props.classes.paper}>
          <span
            children="🙊"
            className={this.props.classes.icon}
          />
          <Quotes
            animationDuration={1500}
            delay={12500}
            quotes={quotes}
            shuffle
          />
        </Paper>
      </React.Fragment> 
    );
  }
}

export default withStyles(AboutMe);
