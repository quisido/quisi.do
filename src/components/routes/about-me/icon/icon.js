import { Tooltip } from '@material-ui/core';
import React from 'react';
import createObjectProp from 'react-object-prop';
import withStyles from './icon-styles';

class Icon extends React.PureComponent {

  _style = createObjectProp();

  get className() {
    const classNames = [ this.props.classes.root ];
    if (this.props.className) {
      classNames.push(this.props.className);
    }
    return classNames.join(' ');
  }

  get style() {
    return this._style({
      backgroundPosition: (-64 * this.props.index) + 'px center'
    });
  }

  render() {
    return (
      <Tooltip
        placement="top"
        title={this.props.tooltip}
      >
        <span
          className={this.className}
          onClick={this.props.onClick || null}
          style={this.style}
        >
          <span children={this.props.children} />
        </span>
      </Tooltip>
    );
  }
}

export default withStyles(Icon);
