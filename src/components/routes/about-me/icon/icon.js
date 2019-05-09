import { Tooltip } from '@material-ui/core';
import React from 'react';
import createObjectProp from 'react-object-prop';
import withStyles from './icon-styles';

class Icon extends React.PureComponent {

  _style = createObjectProp();

  render() {
    const classNames = [ this.props.classes.root ];
    if (this.props.className) {
      classNames.push(this.props.className);
    }
    return (
      <Tooltip
        placement="top"
        title={this.props.tooltip}
      >
        <span
          className={classNames.join(' ')}
          onClick={this.props.onClick || null}
          style={this._style({
            backgroundPosition: (-64 * this.props.index) + 'px center'
          })}
        >
          <span>{this.props.children}</span>
        </span>
      </Tooltip>
    );
  }
}

export default withStyles(Icon);
