import { Paper, Typography } from '@material-ui/core';
import React from 'react';
import Quotes from 'react-quotes';
import dota2huds320 from '../../../assets/screenshots/dota2huds-320.jpg';
import dota2huds768 from '../../../assets/screenshots/dota2huds-768.jpg';
import dota2huds800 from '../../../assets/screenshots/dota2huds-800.jpg';
import dota2huds1024 from '../../../assets/screenshots/dota2huds-1024.jpg';
import dota2huds1280 from '../../../assets/screenshots/dota2huds-1280.jpg';
import dota2huds1600 from '../../../assets/screenshots/dota2huds-1600.jpg';
import rpgOverworldEngine320 from '../../../assets/screenshots/rpg-overworld-engine.gif';
import withStyles from './about-me-styles';
import Assessments from './assessments/assessments';
import quotes from './quotes';
import SeeNoEvil from './see-no-evil/see-no-evil';

const CURRENT_YEAR = new Date().getFullYear();

const backEndYears = CURRENT_YEAR - 2005;
const frontEndYears = CURRENT_YEAR - 2001;

const dota2huds = [
  [ 320, dota2huds320 ],
  [ 768, dota2huds768 ],
  [ 800, dota2huds800 ],
  [ 1024, dota2huds1024 ],
  [ 1280, dota2huds1280 ],
  [ 1600, dota2huds1600 ],
];

const rpgOverworldEngine = [
  [ 320, rpgOverworldEngine320 ]
];

class AboutMe extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <Paper className={this.props.classes.paper}>
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
          images={dota2huds}
          title="Dota 2 HUDs"
        />
        <SeeNoEvil
          images={rpgOverworldEngine}
          title="RPG Overworld Engine"
        />
        <Paper className={this.props.classes.paper}>
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
