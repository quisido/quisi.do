import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Quotes from 'react-quotes';
import withStyles from './about-me-styles';

const backEndYears = new Date().getFullYear() - 2006;
const frontEndYears = new Date().getFullYear() - 2001;

class AboutMe extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <Paper className={this.props.classes.paper}>
          <Quotes />
        </Paper>
        <Paper className={this.props.classes.paper}>
          <Typography variant="headline">Coding Background</Typography>
          <Typography paragraph>
            My name is Charles Stover.
            I am a senior web development consultant currently employed with a focus in React and Node.
            I have over 15 years experience in web development languages such as JavaScript and PHP.
            My focus thus far has been in automated content generation, micro-optimization, SEO, and web security.
            All of my work strives for optimal UI/UX through modern design principles, optimized performance, and standardization.
          </Typography>
          <Typography paragraph>
            I've been developing front end applications for {frontEndYears} years and server-side apps in PHP and MySQL for {backEndYears}.
            During this time, I have released countless tools to the public and published multiple web development tutorials.
          </Typography>
          <Typography paragraph>
            This website is merely a hub for my portfolio and e-mail as well as a demonstration of the art form known as optimization.
          </Typography>
        </Paper>
      </React.Fragment> 
    );
  }
}

export default withStyles(AboutMe);
