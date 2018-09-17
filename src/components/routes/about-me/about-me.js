import { Button, Paper, Tooltip, Typography } from '@material-ui/core';
import React from 'react';
import createObjectProp from 'react-object-prop';
import { Link } from 'react-router-dom';
import quotes from '../../../assets/quotes';
import spritesheet2gif from '../../../assets/screenshots/spritesheet2gif.png';
import rpgOverworldEngine320 from '../../../assets/screenshots/rpg-overworld-engine.gif';
import withStyles from './about-me-styles';
import Expert from './expert/expert';
import Proficient from './proficient/proficient';
import Publications from './publications/publications';
import Quotes from './quotes/quotes';
import SeeNoEvil from './see-no-evil/see-no-evil';

const CURRENT_YEAR = new Date().getFullYear();

const backEndYears = CURRENT_YEAR - 2005;
const frontEndYears = CURRENT_YEAR - 2001;

const rpgOverworldEngine = [
  [ 320, rpgOverworldEngine320 ]
];

class AboutMe extends React.PureComponent {

  _spritesheetToGifClasses = createObjectProp();

  get spritesheetToGifClasses() {
    return this._spritesheetToGifClasses({
      color: this.props.classes.projectsSpritesheet2gifColor,
      faded: this.props.classes.projectsSpritesheet2gifFaded
    });
  }

  render() {
    return (
      <React.Fragment>
        <Paper className={this.props.classes.paper + ' ' + this.props.classes.aboutMe}>
          <img
            alt="Avatar"
            className={this.props.classes.aboutMeAvatar}
            height={100}
            src="https://www.gravatar.com/avatar/4702bc684e908ea109e5a8046c71af5e.jpg"
            width={100}
          />
          <Typography className={this.props.classes.aboutMeParagraph}>
            Hi, I'm <span
              children="Charles Stover"
              className={this.props.classes.aboutMeHighlight}
            />.{' '}
            I'm a{' '}
            <span
              children="senior full-stack development consultant"
              className={this.props.classes.aboutMeHighlight}
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
          <div className={this.props.classes.aboutMeInfo}>
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
        <section className={this.props.classes.section + ' ' + this.props.classes.sectionContent}>
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
        <section className={this.props.classes.section + ' ' + this.props.classes.sectionContent}>
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
        <Paper className={this.props.classes.paper}>
          <Quotes quotes={quotes} />
        </Paper>
        <section className={this.props.classes.section}>
          <div className={this.props.classes.sectionContent}>
            <Typography
              children="Publications"
              className={this.props.classes.sectionHeadline}
              gutterBottom
              variant="headline"
            />
            <div className={this.props.classes.sectionBody}>
              <Publications />
            </div>
          </div>
          <Link
            className={this.props.classes.publicationsViewMore}
            to="/portfolio/medium"
          >
            <Button children="View more..." />
          </Link>
        </section>
        <Paper className={this.props.classes.paper + ' ' + this.props.classes.projects}>
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
          <Link
            className={this.props.classes.projectsViewMore}
            to="/portfolio/github"
          >
            <Button children="View more..." />
          </Link>
        </Paper>
      </React.Fragment> 
    );
  }
}

export default withStyles(AboutMe);
