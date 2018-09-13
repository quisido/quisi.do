import { Paper, Tooltip, Typography } from '@material-ui/core';
import React from 'react';
import spritesheet2gif320 from '../../../assets/screenshots/spritesheet2gif-320.png';
import spritesheet2gif1536 from '../../../assets/screenshots/spritesheet2gif-1536.png';
import rpgOverworldEngine320 from '../../../assets/screenshots/rpg-overworld-engine.gif';
import withStyles from './about-me-styles';
import Expert from './expert/expert';
import Proficient from './proficient/proficient';
import quotes from './quotes';
import Quotes from './quotes/quotes';
import SeeNoEvil from './see-no-evil/see-no-evil';
import ViewPortfolio from './view-portfolio/view-portfolio';

const CURRENT_YEAR = new Date().getFullYear();

const backEndYears = CURRENT_YEAR - 2005;
const frontEndYears = CURRENT_YEAR - 2001;

const rpgOverworldEngine = [
  [ 320, rpgOverworldEngine320 ]
];

const spritesheet2gif = [
  [ 320, spritesheet2gif320 ],
  [ 1538, spritesheet2gif1536 ],
];

class AboutMe extends React.PureComponent {

  __spritesheetToGifClasses = [ null, null ];
  _spritesheetToGifClasses = {};

  get spritesheetToGifClasses() {
    if (
      this.__spritesheetToGifClasses[0] !== this.props.classes.spritesheet2gifColor ||
      this.__spritesheetToGifClasses[1] !== this.props.classes.spritesheet2gifFaded
    ) {
      this.__spritesheetToGifClasses = [
        this.props.classes.spritesheet2gifColor,
        this.props.classes.spritesheet2gifFaded
      ];
      this._spritesheetToGifClasses = {
        color: this.props.classes.spritesheet2gifColor,
        faded: this.props.classes.spritesheet2gifFaded
      };
    }
    return this._spritesheetToGifClasses;
  }

  render() {
    return (
      <React.Fragment>
        <Paper className={this.props.classes.paper + ' ' + this.props.classes.aboutMe}>
          <img
            alt="Avatar"
            className={this.props.classes.avatar}
            height={100}
            src="https://www.gravatar.com/avatar/4702bc684e908ea109e5a8046c71af5e.jpg"
            width={100}
          />
          <Typography className={this.props.classes.paragraph}>
            Hi, I'm <span
              children="Charles Stover"
              className={this.props.classes.highlight}
            />.{' '}
            I'm a{' '}
            <span
              children="senior full-stack development consultant"
              className={this.props.classes.highlight}
            />{' '}
            with a focus in React and Node.
            My expertise is in automation, optimization, security, and{' '}
            <Tooltip title="User Interface">
              <abbr children="UI" />
            </Tooltip>/
            <Tooltip title="User Experience">
              <abbr children="UX" />
            </Tooltip>.
          </Typography>
          <div className={this.props.classes.info}>
            <Typography
              children={'Front End: ' + frontEndYears + ' years'}
              gutterBottom
              variant="subheading"
            />
            <Typography
              children={'Full-Stack: ' + backEndYears + ' years'}
              variant="subheading"
            />
          </div>
        </Paper>
        <section className={this.props.classes.section}>
          <Typography
            children="Expert"
            className={this.props.classes.sectionHeadline}
            gutterBottom
            variant="headline"
          />
          <div className={this.props.classes.sectionBody}>
            <Expert />
          </div>
        </section>
        <section className={this.props.classes.section}>
          <Typography
            children="Proficient"
            className={this.props.classes.sectionHeadline}
            gutterBottom
            variant="headline"
          />
          <div className={this.props.classes.sectionBody}>
            <Proficient />
          </div>
        </section>
        <Paper className={this.props.classes.paper + ' ' + this.props.classes.quotes}>
          <Quotes
            animationDuration={1500}
            delay={12500}
            quotes={quotes}
            shuffle
          />
        </Paper>
        <Paper className={this.props.classes.paper + ' ' + this.props.classes.seeNoEvil}>
          <SeeNoEvil
            description="IE6-compatible HTML and CSS animations."
            href="https://gamingmedley.github.io/rpg-overworld-engine/"
            images={rpgOverworldEngine}
            rel="nofollow noopener noreferrer"
            target="_blank"
            title="RPG Overworld Engine"
          />
          <SeeNoEvil
            classes={this.spritesheetToGifClasses}
            description="Dynamic image manipulation."
            images={spritesheet2gif}
            title="Sprite Sheet to GIF Converter"
            to="/spritesheet2gif"
          />
          <ViewPortfolio />
        </Paper>
      </React.Fragment> 
    );
  }
}

export default withStyles(AboutMe);
