import { Paper, Typography } from '@material-ui/core';
import React from 'react';
import createObjectProp from 'react-object-prop';
import Link from 'react-router-dom/Link';
import withStyles from './see-no-evil-styles';

class SeeNoEvil extends React.PureComponent {

  _backgroundImageStyle = createObjectProp();

  get backgroundImageStyle() {
    return this._backgroundImageStyle({
      backgroundImage: 'url("' + this.props.image + '")'
    });
  }

  render() {
    return (
      <Paper
        className={this.props.classes.root}
        style={this.backgroundImageStyle}
      >
        <span
          children="🙈"
          className={this.props.classes.icon}
        />
        <div className={this.props.classes.description}>
          <Typography
            children={this.props.title}
            variant="headline"
          />
        </div>
        <Link
          className={this.props.classes.color}
          style={this.backgroundImageStyle}
          to={this.props.to}
        />
      </Paper>
    );
  }
}

export default withStyles(SeeNoEvil);
