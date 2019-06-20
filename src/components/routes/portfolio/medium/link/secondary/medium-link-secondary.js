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
          <span>
            <span aria-label="View Count" role="img">
              👁️
            </span>{' '}
            {numberFormat(views)} Views
          </span>
          <span>
            <span aria-label="Read Count" role="img">
              📖
            </span>{' '}
            {numberFormat(reads)} Reads
          </span>
          <span>
            <span aria-label="Reader Applause" role="img">
              👏
            </span>{' '}
            {numberFormat(claps)} Claps
          </span>
          <span>
            <span aria-label="Reading Time" role="img">
              ⏲
            </span>{' '}
            {numberFormat(readingTime)} minute read
          </span>
        </Typography>
      </>
    );
  }
);
