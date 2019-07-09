import React from 'react';
import withStyles from './spinner-styles';

export default withStyles(
  function Spinner({ classes, className, size }) {

    const classNames = [ classes.root ];
    if (className) {
      classNames.push(className);
    }

    let style;
    if (size) {
      style = {
        fontSize: typeof size === 'number' ? `${size}em` : size,
      };
    }

    return (
      <div
        className={classNames.join(' ')}
        style={style}
      />
    );
  }
);
