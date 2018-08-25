import { Paper, Typography } from '@material-ui/core';
import React from 'react';
import Quotes from 'react-quotes';
import withStyles from './about-me-styles';
import quotes from './quotes';

const CURRENT_YEAR = new Date().getFullYear();
const backEndYears = CURRENT_YEAR - 2005;
const frontEndYears = CURRENT_YEAR - 2001;

class AboutMe extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <Paper className={this.props.classes.paper}>
          <Quotes
            animationDuration={2500}
            delay={12500}
            quotes={quotes}
            shuffle
          />
        </Paper>
        <Paper className={this.props.classes.paper}>
          <Typography
            children="Background"
            gutterBottom
            variant="headline"
          />
          <Typography>
            My name is Charles Stover.
            I am a senior full-stack web development consultant currently employed with a focus in React and Node.
            I've been developing front end applications for {frontEndYears} years and server-side apps in PHP and MySQL for {backEndYears}.
            My expertise is in automated content generation, performance and search engine optimization, and security.
            I strive for optimal <abbr title="User Interface">UI</abbr>/<abbr title="User Experience">UX</abbr> through{' '}
            modern design principles and optimized performance.
          </Typography>
        </Paper>
      </React.Fragment> 
    );
  }
}

export default withStyles(AboutMe);
