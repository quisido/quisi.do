import { Typography } from '@material-ui/core';
import React from 'react';
import createObjectProp from 'react-object-prop';
import { Link } from 'react-router-dom';
import withStyles from './see-no-evil-styles';

class SeeNoEvil extends React.PureComponent {

  _backgroundImageStyle = createObjectProp();
  state = {
    width: null
  };

  get backgroundImageStyle() {
    if (this.state.width === null) {
      return null;
    }

    // Find the smallest image that is larger than the viewport.
    for (const [ width, url ] of this.props.images) {
      if (width >= this.state.width) {
        return this.createBackgroundImageStyle(url);
      }
    }

    // If none are larger than the viewport, use the largest one available.
    return this.createBackgroundImageStyle(this.props.images[this.props.images.length - 1][1]);
  }

  createBackgroundImageStyle(url) {
    return this._backgroundImageStyle({
      backgroundImage: 'url("' + url + '")'
    });
  }

  handleWidthRef = ref => {
    if (ref) {
      this.setState({
        width: ref.getBoundingClientRect().width
      });
    }
  };

  render() {
    const Component =
      this.props.href ?
        'a' :
        Link;
    return (
      <div className={this.props.classes.root}>
        <Component
          className={this.props.classes.faded}
          href={this.props.href || null}
          rel={this.props.rel}
          style={this.backgroundImageStyle}
          target={this.props.target}
          to={this.props.to || null}
          title=""
        >
          <div
            className={this.props.classes.color}
            ref={this.handleWidthRef}
            style={this.backgroundImageStyle}
          />
          <div className={this.props.classes.description}>
            <Typography
              children={this.props.title}
              className={this.props.classes.title}
              gutterBottom
              variant="title"
            />
            <Typography
              children={this.props.description}
              className={this.props.classes.caption}
              variant="caption"
            />
          </div>
        </Component>
      </div>
    );
  }
}

export default withStyles(SeeNoEvil);
