import React from 'react';
import withStyles from './gray-styles';

class Gray extends React.PureComponent {

  get children() {
    return (
      this.props.off ?
        '(31, 32, 33)' :
        '(32, 32, 32)'
    );
  }

  get className() {
    const classNames = [ this.props.classes.root ];
    if (this.props.off) {
      classNames.push(this.props.classes.off);
    }
    return classNames.join(' ');
  }

  render() {
    return (
      <span className={this.className}>
        {this.children}
      </span>
    );
  }
}

export default withStyles(Gray);
