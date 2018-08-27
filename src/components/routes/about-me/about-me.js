import { Paper, Typography } from '@material-ui/core';
import React from 'react';
import Quotes from 'react-quotes';
import withStyles from './about-me-styles';
import CircularProgress from './circular-progress/circular-progress';
import quotes from './quotes';

const CURRENT_YEAR = new Date().getFullYear();
const backEndYears = CURRENT_YEAR - 2005;
const frontEndYears = CURRENT_YEAR - 2001;

class AboutMe extends React.PureComponent {
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
                gutterBottom
                variant="subheading"
              />
              <CircularProgress
                max={5}
                title="JS 1.8"
                percentile={100}
                score={4.78}
              />
              <CircularProgress
                max={300}
                title="CSS"
                percentile={99}
                score={279}
              />
              <CircularProgress
                max={300}
                title="JS"
                percentile={97}
                score={257}
              />
              <CircularProgress
                max={300}
                title="HTML5"
                percentile={96}
                score={250}
              />
              <CircularProgress
                max={300}
                title="jQuery"
                percentile={94}
                score={240}
              />
              <CircularProgress
                max={300}
                title="Node.js"
                percentile={89}
                score={221}
              />
              <CircularProgress
                max={300}
                title="React"
                percentile={87}
                score={217}
              />
            </section>
            <section>
              <Typography
                children="Proficiencies"
                gutterBottom
                variant="subheading"
              />
              <CircularProgress
                max={5}
                title="Java 8"
                percentile={94}
                score={4}
              />
              <CircularProgress
                max={200}
                title="Docker"
                percentile={72}
                score={184}
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
            animationDuration={2500}
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
