import { Paper, Typography } from '@material-ui/core';
import React from 'react';
import createObjectProp from 'react-object-prop';
import { Link } from 'react-router-dom';
import withStyles from './portfolio-section-styles';

class PortfolioSection extends React.PureComponent {

  _imageStyle = createObjectProp();

  get handleLinkClick() {
    if (this.props.disabled) {
      return this.preventDefault;
    }
    return null;
  }

  preventDefault = e => {
    e.preventDefault();
  };

  get rootClassName() {
    return (
      this.props.classes.root + ' ' +
      (
        this.props.disabled ?
          this.props.classes.disabled :
          this.props.classes.enabled
      )
    );
  }

  get imageStyle() {
    return this._imageStyle({
      backgroundImage: 'url("' + this.props.src + '")'
    });
  }

  render() {
    return (
      <Paper
        className={this.rootClassName}
        component={Link}
        onClick={this.handleLinkClick}
        to={this.props.to}
      >
        <div
          className={this.props.classes.image}
          style={this.imageStyle}
        />
        <Typography
          children={this.props.title}
          className={this.props.classes.headline}
          variant="headline"
        />
      </Paper>
    );
  }
}

export default withStyles(PortfolioSection);
