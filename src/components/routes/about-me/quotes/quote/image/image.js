import React from 'react';
import withStyles from './image-styles';

class Image extends React.PureComponent {
  render() {
    return (
      <img
        alt={this.props.alt}
        className={this.props.classes.root}
        height={100}
        src={this.props.src}
        width={100}
      />
    );
  }
}

export default withStyles(Image);