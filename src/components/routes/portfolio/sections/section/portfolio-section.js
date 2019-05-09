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

  get imageStyle() {
    return this._imageStyle({
      backgroundImage: 'url("' + this.props.src + '")'
    });
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

  get rootComponent() {
    return this.props.paper ? Paper : Link;
  }

  get rootProps() {
    if (this.props.paper) {
      return {
        component: Link
      };
    }
    return Object.create(null);
  }

  render() {
    const RootComponent = this.rootComponent;
    return (
      <RootComponent
        className={this.rootClassName}
        onClick={this.handleLinkClick}
        to={this.props.to}
        {...this.rootProps}
      >
        <div
          className={this.props.classes.image}
          style={this.imageStyle}
        />
        <Typography
          className={this.props.classes.headline}
          variant="h5"
        >
          {this.props.title}
        </Typography>
      </RootComponent>
    );
  }
}

export default withStyles(PortfolioSection);
