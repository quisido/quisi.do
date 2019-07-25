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
      <>
        <Paper className={this.props.classes.paper + ' ' + this.props.classes.aboutMe}>
          <img
            alt="Avatar"
            className={this.props.classes.aboutMeAvatar}
            height={100}
            src="https://www.gravatar.com/avatar/4702bc684e908ea109e5a8046c71af5e.jpg?s=100"
            width={100}
          />
          <Typography className={this.props.classes.aboutMeParagraph}>
            Hi, I'm{' '}
            <span className={this.props.classes.aboutMeHighlight}>
              Charles Stover
            </span>.{' '}
            I'm a{' '}
            <span className={this.props.classes.aboutMeHighlight}>
              senior full-stack JavaScript developer
            </span>{' '}
            with a focus in React and Node.{' '}
            My expertise is in automation, optimization, security, and{' '}
            <Tooltip title="User Interface">
              <abbr>UI</abbr>
            </Tooltip>/
            <Tooltip title="User Experience">
              <abbr>UX</abbr>
            </Tooltip>.
          </Typography>
          <div className={this.props.classes.aboutMeInfo}>
            <Typography
              gutterBottom
              variant="subtitle1"
            >
              Front End: {frontEndYears} years
            </Typography>
            <Typography variant="subtitle1">
              Full-Stack: {backEndYears} years
            </Typography>
          </div>
        </Paper>
        <section className={this.props.classes.section + ' ' + this.props.classes.sectionContent}>
          <Typography
            className={this.props.classes.sectionHeadline}
            gutterBottom
            variant="h5"
          >
            Expert
          </Typography>
          <div className={this.props.classes.sectionBody}>
            <Expert />
          </div>
        </section>
        <section className={this.props.classes.section + ' ' + this.props.classes.sectionContent}>
          <Typography
            className={this.props.classes.sectionHeadline}
            gutterBottom
            variant="h5"
          >
            Proficient
          </Typography>
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
              className={this.props.classes.sectionHeadline}
              gutterBottom
              variant="h5"
            >
              Publications
            </Typography>
            <div className={this.props.classes.sectionBody}>
              <Publications />
            </div>
          </div>
          <Link
            className={this.props.classes.publicationsViewMore}
            to="/portfolio/articles/"
          >
            <Button
              color="secondary"
              variant="outlined"
            >
              View more
            </Button>
          </Link>
        </section>
        <Paper className={this.props.classes.paper + ' ' + this.props.classes.projects}>
          <SeeNoEvil
            description="Global state management, baked into React."
            href="https://github.com/CharlesStover/reactn/"
            images="https://user-images.githubusercontent.com/343837/53267742-fe3f4900-3698-11e9-82fd-3c3a1decb7fd.png"
            rel="nofollow noopener noreferrer"
            target="_blank"
            title="ReactN"
          />
          <SeeNoEvil
            description="IE6-compatible HTML and CSS animations."
            href="https://charlesstover.github.io/rpg-overworld-engine/"
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
          <div className={this.props.classes.projectsViewMore}>
            <Link
              className={this.props.classes.projectsViewMoreLink}
              to="/portfolio/github/"
            >
              <Button
                color="secondary"
                variant="outlined"
              >
                View GitHub repositories
              </Button>
            </Link>
            <Link
              className={this.props.classes.projectsViewMoreLink}
              to="/portfolio/npm/"
            >
              <Button
                color="secondary"
                variant="outlined"
              >
                View NPM packages
              </Button>
            </Link>
          </div>
        </Paper>
      </> 
    );
  }
}

export default withStyles(AboutMe);
