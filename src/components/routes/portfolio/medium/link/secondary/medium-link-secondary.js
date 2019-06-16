import { Typography } from '@material-ui/core';
import React from 'react';
import withStyles from './medium-link-secondary-styles';

const numberFormat = n =>
  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export default withStyles(
  function MediumLinkSecondary({
    children,
    claps,
    classes,
    readingTime,
    reads,
    views
  }) {
    if (typeof views === 'undefined') {
      return children;
    }
    return (
      <>
        {children}
        <Typography
          className={classes.root}
          variant="caption"
        >
          <span>👁️ {numberFormat(views)} Views</span>
          <span>📖 {numberFormat(reads)} Reads</span>
          <span>👏 {numberFormat(claps)} Claps</span>
          <span>⏲ {numberFormat(readingTime)} minute read</span>
        </Typography>
      </>
    );
  }
);
