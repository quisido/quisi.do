import { Paper, Typography } from '@material-ui/core';
import React from 'react';
import createObjectProp from 'react-object-prop';
import Quotes from 'react-quotes';
import dota2huds from '../../../assets/screenshots/dota2huds.jpg';
import rpgOverworldEngine from '../../../assets/screenshots/rpg-overworld-engine.gif';
import withStyles from './about-me-styles';
import Assessment from './assessment/assessment';
import PluralsightAssessment from './pluralsight-assessment/pluralsight-assessment';
import quotes from './quotes';
import SeeNoEvil from './see-no-evil/see-no-evil';

const CURRENT_YEAR = new Date().getFullYear();

const backEndYears = CURRENT_YEAR - 2005;
const frontEndYears = CURRENT_YEAR - 2001;

class AboutMe extends React.PureComponent {

  _seeNoEvilClasses = createObjectProp();
  assessmentClickHandlers = {};
  assessmentRef = null;

  state = {
    testPercentile: 0,
    testTitle: null
  };

  handleAssessmentClick = (title, percentile) => {
    if (!Object.prototype.hasOwnProperty.call(this.assessmentClickHandlers, title)) {
      this.assessmentClickHandlers[title] = () => {
        if (this.state.testTitle === title) {
          this.setState({
            testPercentile: 0,
            testTitle: null
          });
        }
        else {
          this.setState({
            testPercentile: percentile,
            testTitle: title
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

  get seeNoEvilClasses() {
    return this._seeNoEvilClasses({
      icon: this.props.classes.icon,
      root: this.props.classes.paper
    });
  }

  render() {
    return (
      <React.Fragment>
        <Paper className={this.props.classes.paper}>
          <span
            children="🙉"
            className={this.props.classes.icon}
          />
          <Typography paragraph>
            Hi, I'm Charles Stover.
            I am a senior full-stack web development consultant currently employed with a focus in React and Node.
            I've been developing front end applications for {frontEndYears} years and full-stack apps for {backEndYears}.
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
                onClick={this.handleAssessmentClick}
                percentile={100}
                selected={this.state.testTitle === 'JS 1.8'}
                title="JS 1.8"
              />
              <Assessment
                onClick={this.handleAssessmentClick}
                percentile={99}
                selected={this.state.testTitle === 'CSS'}
                title="CSS"
              />
              <Assessment
                onClick={this.handleAssessmentClick}
                percentile={97}
                selected={this.state.testTitle === 'JS'}
                title="JS"
              />
              <Assessment
                onClick={this.handleAssessmentClick}
                percentile={96}
                selected={this.state.testTitle === 'HTML5'}
                title="HTML5"
              />
              <Assessment
                onClick={this.handleAssessmentClick}
                percentile={94}
                selected={this.state.testTitle === 'jQuery'}
                title="jQuery"
              />
              <Assessment
                onClick={this.handleAssessmentClick}
                percentile={89}
                selected={this.state.testTitle === 'Node.js'}
                title="Node.js"
              />
              <Assessment
                onClick={this.handleAssessmentClick}
                percentile={87}
                selected={this.state.testTitle === 'React'}
                title="React"
              />
            </section>
            <PluralsightAssessment
              onRef={this.handleAssessmentRef}
              percentile={this.state.testPercentile}
              title={this.state.testTitle}
            />
            <section>
              <Typography
                children="Proficiencies"
                variant="subheading"
              />
              <Assessment
                onClick={this.handleAssessmentClick}
                percentile={94}
                selected={this.state.testTitle === 'Java 8'}
                title="Java 8"
              />
              <Assessment
                onClick={this.handleAssessmentClick}
                percentile={72}
                selected={this.state.testTitle === 'Docker'}
                title="Docker"
              />
            </section>
          </div>
        </Paper>
        <SeeNoEvil
          classes={this.seeNoEvilClasses}
          image={dota2huds}
          title="Dota 2 HUDs"
        />
        <SeeNoEvil
          classes={this.seeNoEvilClasses}
          image={rpgOverworldEngine}
          title="RPG Overworld Engine"
        />
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
