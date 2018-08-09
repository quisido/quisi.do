import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import MediumLink from './medium-link/medium-link';
import withStyles from './portfolio-styles';

class Portfolio extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <Paper className={this.props.classes.paper}>
          <Typography
            children="Publications"
            gutterBottom
            variant="headline"
          />
          <ul className={this.props.classes.ul}>
            <MediumLink
              id="ae855c63e6b3"
              title="Creating a Dynamic Vertical Gradient in PHP"
            />
            <MediumLink
              id="f7c0814b152a"
              title="Establishing a Secure Password Generator for Your User Base"
            />
            <MediumLink
              id="9bb252d35aa3"
              title="How to Make a Graphical News Slider in jQuery"
            />
            <MediumLink
              id="3da9ac36d481"
              title="PHP's htmlspecialchars Implemented in JavaScript"
            />
          </ul>
        </Paper>
        <Paper className={this.props.classes.paper}>
          <Typography
            children="Section 2"
            variant="headline"
          />
          <Typography paragraph>
            Text will go here.
          </Typography>
        </Paper>
      </React.Fragment> 
    );
  }
}

export default withStyles(Portfolio);
