import { Paper, Typography } from '@material-ui/core';
import React from 'react';
import createObjectProp from 'react-object-prop';
import Quotes from 'react-quotes';
import dota2huds from '../../../assets/screenshots/dota2huds.jpg';
import rpgOverworldEngine from '../../../assets/screenshots/rpg-overworld-engine.gif';
import withStyles from './about-me-styles';
import Assessments from './assessments/assessments';
import quotes from './quotes';
import SeeNoEvil from './see-no-evil/see-no-evil';

const CURRENT_YEAR = new Date().getFullYear();

const backEndYears = CURRENT_YEAR - 2005;
const frontEndYears = CURRENT_YEAR - 2001;

class AboutMe extends React.PureComponent {

  _seeNoEvilClasses = createObjectProp();

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
          <Assessments />
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
